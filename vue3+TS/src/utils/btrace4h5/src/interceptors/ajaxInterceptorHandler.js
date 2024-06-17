/**
 * @Author visupervi
 * @Description 对ajax进行劫持并重写test
 * @Date 1:36 下午 2021/8/12
 * @Param
 * @return
 */
import { getCookie } from "../utils/cookiesHandler";
import { createApiMsgData, getReqParams, isCludeUrl, reqUrlTool } from "../utils/tools";
import { ERROR_TYPE, HEADERS } from "../types";
export const ajaxInterceptorHandler = (options) => {
    try {
        if (!XMLHttpRequest) {
            return;
        }
        let nativeAjaxSend = XMLHttpRequest.prototype.send;
        let nativeAjaxOpen = XMLHttpRequest.prototype.open;
        let reqUrl = "";
        let xhrInstance = null;
        // @ts-ignore
        // 可以拿到请求信息
        XMLHttpRequest.prototype.open = function (method, url, sync, useName, passWord) {
            xhrInstance = this || null;
            xhrInstance._url = url;
            let tempArr = [sync, passWord, useName];
            reqUrl = reqUrlTool(url);
            // @ts-ignore
            return nativeAjaxOpen.apply(this, [method, url].concat(tempArr));
        };
        XMLHttpRequest.prototype.send = function () {
            let args = Array.prototype.slice.call(arguments, this.length);
            xhrInstance = this;
            // xhrInstance._sendTime = Date.now();
            xhrInstance["_sendTime"] = Date.now(); // 发送时间
            // const oldCb = this.onreadystatechange;
            // @ts-ignore
            // 只有是业务请求才会添加自定义header
            isCludeUrl(this._url, options) ? xhrInstance.setRequestHeader(HEADERS.XB3SESSIONId, getCookie(HEADERS.XB3SESSIONId)) : "";
            const onLoadend = (e) => {
                if (options.apiRequestIsEnable) {
                    if (isCludeUrl(this._url, options) && !xhrInstance._timeout) {
                        if (!window.performance)
                            return;
                        const perf = window.performance.getEntriesByName(reqUrlTool(e.target._url))[window.performance.getEntriesByName(reqUrlTool(e.target._url)).length - 1];
                        if (perf) {
                            const timeConsuming = Math.ceil(perf.responseEnd - perf.requestStart);
                            xhrInstance._resTime = xhrInstance._sendTime + timeConsuming;
                        }
                        else {
                            xhrInstance._resTime = Date.now();
                        }
                        xhrInstance._url = e && e.currentTarget ? e.currentTarget.responseURL : xhrInstance._url;
                        xhrInstance._reqParam = getReqParams(xhrInstance._url);
                        createApiMsgData(xhrInstance, xhrInstance, options, ERROR_TYPE.AJAX);
                    }
                }
                xhrInstance.removeEventListener("loadend", onLoadend, true);
            };
            const onTimeOut = (e) => {
                xhrInstance._resTime = Date.now();
                if (e.type === "timeout") {
                    xhrInstance._timeout = true;
                    xhrInstance._url = reqUrl;
                    if (isCludeUrl(this._url, options)) {
                        xhrInstance._reqParam = getReqParams(xhrInstance._url);
                        createApiMsgData(xhrInstance, xhrInstance, options, ERROR_TYPE.AJAX);
                    }
                }
                xhrInstance.removeEventListener("timeout", onTimeOut, true);
            };
            xhrInstance.addEventListener("timeout", onTimeOut, true);
            xhrInstance.addEventListener("loadend", onLoadend, true);
            return nativeAjaxSend.apply(this, [args]);
        };
    }
    catch (e) {
        console.warn("btrace:" + e);
    }
};
