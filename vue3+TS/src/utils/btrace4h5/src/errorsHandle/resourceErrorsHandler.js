/**
 * @Author visupervi
 * @Description 监听资源加载错误
 * @Date 2:36 下午 2021/8/11
 * @Param
 * @return
 */
import { exceptionReport } from "../utils/exceptionReport";
import { createMsgData } from "../utils/tools";
import { ERROR_TYPE } from "../types";
// 监听静态资源加载错误
export const resourceErrorsHandler = (options) => {
    window.addEventListener("error", function (ev) {
        // 过滤js error
        let target = ev.target || ev.srcElement;
        let isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement;
        if (!isElementTarget)
            return false;
        const msg = createMsgData(ev, options, ERROR_TYPE.RESOURCE);
        exceptionReport(options.logContextReportUrl, msg);
    }, true);
};
// class ResourceErrorsHandler {
//   public options: IParams
//
//   constructor(options:IParams) {
//     this.options = options;
//   }
//
//   private resourceErrorsHandler(options:IParams) {
//     window.addEventListener("error", function (ev: ErrorEvent) {
//       // 过滤js error
//       let target = ev.target || ev.srcElement;
//       let isElementTarget = target instanceof HTMLScriptElement || target instanceof HTMLLinkElement || target instanceof HTMLImageElement;
//       if (!isElementTarget) return false;
//       const msg = createMsgData(ev, options, ERROR_TYPE.RESOURCE)
//       exceptionReport(options.logContextReportUrl, msg);
//
//     }, true);
//   }
// }
