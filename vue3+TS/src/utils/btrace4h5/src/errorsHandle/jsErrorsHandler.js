/**
 * @Author visupervi
 * @Description 捕获常规的脚本错误
 * @Date 4:41 下午 2021/11/16
 * @Param
 * @return
 */
import { createMsgData } from "../utils/tools";
import { exceptionReport } from "../utils/exceptionReport";
import { ERROR_TYPE } from "../types";
export const jsErrorsHandler = (options) => {
    window.onerror = (message, source, lineno, colno, error) => {
        let msg = createMsgData({
            source: source,
            message: message,
            lineno: lineno,
            colno: colno,
            error: error
        }, options, ERROR_TYPE.JS);
        exceptionReport(options.logContextReportUrl, msg);
    };
};
// class JsErrorsHandler{
//   public options:IParams;
//   constructor(options) {
//     this.options = options
//   }
//
//   public jsErrorHandler(options){
//     window.onerror = (message, source, lineno, colno, error) => {
//       let msg = createMsgData({
//         source: source,
//         message: message,
//         lineno: lineno,
//         colno: colno,
//         error: error
//       }, options, ERROR_TYPE.JS)
//       exceptionReport(options.logContextReportUrl, msg);
//     }
//   }
// }
