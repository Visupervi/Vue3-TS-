/**
 * @Author visupervi
 * @Description 劫持fetch请求
 * @Date 3:18 下午 2021/8/12
 * @Param
 * @return
 */
import { createApiMsgData, getReqParams, isCludeUrl } from "../utils/tools";
import { ERROR_TYPE, HEADERS } from "../types";
import { needReport } from "../utils/needReport";
import { getCookie } from "../utils/cookiesHandler";
export const fetchInterceptorHandler = (options) => {
    try {
        let nativeFetch = null;
        if (!window.fetch) {
            return;
        }
        nativeFetch = window.fetch;
        window.fetch = function (input, init) {
            let sendTime = Date.now(); // 发送时间
            let reqParam; // 请求参数
            if (isCludeUrl(String(input), options)) {
                if (init.headers && init) {
                    init.headers[HEADERS.XB3SESSIONId] = getCookie(HEADERS.XB3SESSIONId);
                }
                else {
                    let _customHeader = {
                        "headers": {
                            [HEADERS.XB3SESSIONId]: getCookie(HEADERS.XB3SESSIONId)
                        }
                    };
                    init = Object.assign({}, _customHeader);
                }
                if (init && init.body) {
                    reqParam = init.body;
                }
                else {
                    reqParam = getReqParams(String(input));
                }
            }
            else {
                init.headers[HEADERS.XSPDBCCCAUTHTOKEN] = HEADERS.TOKENVALUE;
            }
            if (input) {
                return nativeFetch(input, init)
                    .then(res => {
                    res["_resTime"] = Date.now(); // 响应时间
                    res["_sendTime"] = sendTime;
                    res["_reqParam"] = reqParam;
                    // TODO
                    // if (1) {
                    //   if (input !== options.logContextReportUrl && input !== options.apiContextReportUrl) {
                    //     const msg = createApiMsgData(res, res, options, ERROR_TYPE.FETCH);
                    //     apiInfoReport(options.apiContextReportUrl, msg);
                    //   }
                    // }
                    if (options.apiRequestIsEnable) {
                        if (input !== options.logContextReportUrl && input !== options.apiContextReportUrl) {
                            createApiMsgData(res, res, options, ERROR_TYPE.FETCH);
                            // msg.sendTime = Date.now()
                            // apiInfoReport(options.apiContextReportUrl, msg);
                        }
                        // TODO 请求拦截上报
                        if (needReport(options.sampleRate || 10)) {
                            // TODO 调用上报接口
                        }
                    }
                }).catch(e => {
                    if (options.apiRequestIsEnable) {
                        if (isCludeUrl(String(input), options)) {
                            e["_resTime"] = Date.now();
                            e["_sendTime"] = sendTime;
                            e["_reqParam"] = reqParam;
                            e["status"] = 0;
                            createApiMsgData(e, e, options, ERROR_TYPE.FETCH);
                            // apiInfoReport(options.apiContextReportUrl, msg);
                        }
                    }
                });
            }
        };
    }
    catch (e) {
    }
};
