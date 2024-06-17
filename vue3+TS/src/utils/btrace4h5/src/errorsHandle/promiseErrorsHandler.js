/**
 * 主要是没有经过reject的错误
 * 如果是try/catch的代码需要自己手动调用上传
 */
import { createMsgData } from "../utils/tools";
import { exceptionReport } from "../utils/exceptionReport";
import { ERROR_TYPE } from "../types";
export const globalPromiseHandler = (options) => {
    window.addEventListener("unhandledrejection", event => {
        const msg = createMsgData(event, options, ERROR_TYPE.PROMISE);
        exceptionReport(options.logContextReportUrl, msg);
    });
};
// class GlobalPromiseHandler{
//   private options:IParams;
//   constructor(options) {
//     this.options = options;
//   }
//
//   private globalPromiseHandler(options){
//     window.addEventListener("unhandledrejection", event => {
//       const msg = createMsgData(event, options, ERROR_TYPE.PROMISE)
//       exceptionReport(options.logContextReportUrl, msg);
//     })
//   }
// }
