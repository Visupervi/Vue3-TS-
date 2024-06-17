/**
 * @Author visupervi
 * @Description 参数类型
 * @Date 3:49 下午 2021/11/22
 * @Param
 * @return
 */
export interface IParams {
    systemName: string;
    serviceName: string;
    uniqueVisitorId?: string;
    globalSessionId?: string;
    frameworkName?: any;
    apiRequestIsDetail?: boolean;
    apiRequestIsEnable?: boolean;
    errorMsgIsEnable?: boolean;
    sampleRate?: string | number;
    logContextReportUrl?: string;
    apiContextReportUrl?: string;
}
export interface ICookieParams {
    domain: string;
    expires?: string | Date;
    secure?: string | boolean;
}
export interface IErrorMsgParams {
    sendTime: string | number;
    logContexts: Array<ILogContext>;
}
export interface ILogContext {
    level: string;
    errorType: string;
    message: string;
    logCreatTime?: string;
    logCode?: string;
    version: string;
    globalSessionId: string;
    uniqueVisitorId: string;
    systemName: string;
    serviceName: string;
    referer?: string;
    userAgent: string;
    ip?: string;
    generateTime: string | number;
    url: string;
    page: string;
    domain: string;
    title: string;
    logGenerateTime: string | number;
}
export interface IAPIMsgParams {
    sendTime: string | number;
    apiContexts: Array<IApiContext>;
}
export interface IApiContext {
    version: string;
    globalSessionId: string;
    uniqueVisitorId: string;
    systemName: string;
    serviceName: string;
    referer?: string;
    userAgent: string;
    ip?: string;
    generateTime: string | number;
    url: string;
    domain: string;
    page: string;
    title: string;
    reqURL: string;
    reqParam?: string;
    reqMsg?: string;
    reqTime: string | number;
    httpStatusCode?: string | number;
    respCode?: string;
    respDesc?: string;
    respMsg?: string;
    respTime?: string | number;
}
/**
 *
 */
