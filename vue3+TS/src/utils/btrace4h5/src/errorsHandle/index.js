/**
 * @Author visupervi
 * @Description
 * @Date 3:45 下午 2021/11/16
 * @Param
 * @return
 */
// import {fetchErrorsHandler} from "./fetchErrorsHandler";
import { fetchInterceptorHandler } from "../interceptors/fetchInterceptorHandler";
import { ajaxInterceptorHandler } from "../interceptors/ajaxInterceptorHandler";
import { resourceErrorsHandler } from "./resourceErrorsHandler";
import { globalPromiseHandler } from "./promiseErrorsHandler";
import { jsErrorsHandler } from "./jsErrorsHandler";
export { fetchInterceptorHandler, ajaxInterceptorHandler, resourceErrorsHandler, globalPromiseHandler, jsErrorsHandler };
