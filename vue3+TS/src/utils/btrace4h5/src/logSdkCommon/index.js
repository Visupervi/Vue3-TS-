/**
 * @Author visupervi
 * @Description 入口文件
 * @Date 6:30 下午 2021/11/16
 * @Param
 * @return
 */
import * as exceptionHandler from "../errorsHandle";
import { initCookie } from "../utils/cookiesHandler";
import vueErrorHandler from "../logSdkVue";
import { HEADERS } from "../types";
import { initLogArr } from "../utils/localStorageHandler";
function btrace4h5(options) {
    const cookies = initCookie(HEADERS.XB3SESSIONId, HEADERS.XB3UNIQUEVISITORID);
    initLogArr();
    let tempObj = Object.assign({ globalSessionId: cookies.sessionId, uniqueVisitorId: cookies.uniqueVisiId, frameworkName: options.frameworkName ? options.frameworkName : "", apiRequestIsDetail: options.apiRequestIsDetail ? options.apiRequestIsDetail : true, apiRequestIsEnable: options.apiRequestIsEnable !== undefined ? options.apiRequestIsEnable : true, errorMsgIsEnable: options.errorMsgIsEnable !== undefined ? options.errorMsgIsEnable : true, sampleRate: 0, logContextReportUrl: options.logContextReportUrl, apiContextReportUrl: options.apiContextReportUrl }, options);
    // console.log("temObj", tempObj);
    // 遍历工具函数并调用
    Object.keys(exceptionHandler).map((item, key) => {
        exceptionHandler[item](tempObj);
    });
    // 判断是不是Vue环境
    // @ts-ignore
    if (tempObj.frameworkName && typeof tempObj.frameworkName === "function" && new tempObj.frameworkName()._isVue) {
        vueErrorHandler(tempObj);
    }
    else if (tempObj.frameworkName &&
        typeof tempObj.frameworkName === "object" &&
        typeof tempObj.frameworkName.Fragment === "symbol" &&
        tempObj.frameworkName.memo &&
        typeof tempObj.frameworkName.memo === "function") {
        // TODO react
    }
}
window.btrace4h5 = btrace4h5;
export default btrace4h5;
