import { ERRORTYPE, VERSION } from "../../types";
import { fieldValueIntercep } from "../msgValueIntercep";
import { getLocalStorage, setLocalStorage } from "../localStorageHandler";
import { apiInfoReport, exceptionReport } from "../exceptionReport";
export function isFunction(param) {
    return typeof param === 'function';
}
export function isString(param) {
    return typeof param === 'string';
}
export function isObject(param) {
    return Object.prototype.toString.call(param) === "[object Object]";
}
export function isError(param) {
    return Object.prototype.toString.call(param).indexOf('Error') > -1;
}
// 格式化日期
export const formatTimeTool = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return [year, month, day].map(formatNumber).join('-') + " " + [hour, minute, second].map(formatNumber).join(":");
};
//十位补零
export const formatNumber = (n) => {
    n = n.toString();
    return n[1] ? n : '0' + n;
};
// 生成uuid
export function uuid() {
    return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, c => {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
// 使用闭包存储数据
export function getOptions(options) {
    return function () {
        return options;
    };
}
// 构造上报数据格式
export function createMsgData(error, opts, type) {
    try {
        let logArray = [];
        switch (type) {
            case "vue":
                if (error) {
                    const errorArr = error.stack.split("/n")[0].split("    ");
                    logArray.push(createVueErrorMsg(opts, errorArr));
                }
                break;
            case "fetch":
                const res = error;
                if (!res.ok) {
                    logArray.push(createFetchErrorMsg(opts, res));
                }
                break;
            case "ajax":
                const e = error;
                logArray.push(ajaxErrorMsg(opts, e));
                break;
            case "promise":
                const event = error;
                if (event && event.reason && JSON.stringify(event.reason) !== "{}") {
                    logArray.push(promiseErrorMsg(opts, event));
                }
                else {
                    return false;
                }
                break;
            case "resource":
                const ev = error;
                const htmlElement = ev.target;
                logArray.push(resourceErrorMsg(opts, ev, htmlElement));
                break;
            case "exception":
                const ex = error;
                logArray.push(exceptionMsg(opts, ex));
                break;
            case "js":
                logArray.push(createJsErrorMsg(opts, error));
        }
        exceptionReport(opts.logContextReportUrl, {
            sendTime: Date.now(),
            logContexts: logArray
        });
    }
    catch (e) {
        console.error(`Error while triggering instrumentation handler.\nType: ${type}\nName:
      createLogMsgData\nError: ${e}`);
    }
}
/**
 *构造vue错误生成函数
 */
function createVueErrorMsg(opts, errorArr) {
    let vueMsg = {
        version: VERSION.VERSION,
        globalSessionId: opts.globalSessionId,
        uniqueVisitorId: opts.uniqueVisitorId,
        systemName: opts.systemName,
        serviceName: opts.serviceName,
        referer: document.referrer,
        userAgent: window.navigator.userAgent,
        generateTime: Date.now(),
        url: getUrl(),
        page: getPageUrl(),
        domain: getCookieDomain(),
        title: document.title,
        level: "ERROR",
        errorType: ERRORTYPE.JSERROR,
        message: errorArr.join(" "),
        logCreatTime: "",
        logCode: "",
        logGenerateTime: Date.now()
    };
    return fieldValueIntercep(vueMsg, "message");
}
/**
 * 构造fetch错误日志生成函数
 */
function createFetchErrorMsg(opts, res) {
    let fetchMsg = {
        version: VERSION.VERSION,
        globalSessionId: opts.globalSessionId,
        uniqueVisitorId: opts.uniqueVisitorId,
        systemName: opts.systemName,
        serviceName: opts.serviceName,
        referer: document.referrer,
        userAgent: window.navigator.userAgent,
        ip: "",
        generateTime: Date.now(),
        url: getUrl(),
        page: getPageUrl(),
        domain: getCookieDomain(),
        title: document.title,
        level: "ERROR",
        errorType: ERRORTYPE.PROMISEERROR,
        message: JSON.stringify({
            code: res.status,
            msg: res.statusText,
            error_native: res
        }),
        logCode: "",
        logGenerateTime: Date.now()
    };
    return fieldValueIntercep(fetchMsg, "message");
}
/**
 * 构造ajax错误日志生成函数
 */
function ajaxErrorMsg(opts, e) {
    let ajaxErrorMsg = {
        version: VERSION.VERSION,
        globalSessionId: opts.globalSessionId,
        uniqueVisitorId: opts.uniqueVisitorId,
        systemName: opts.systemName,
        serviceName: opts.serviceName,
        referer: document.referrer,
        userAgent: window.navigator.userAgent,
        ip: "",
        generateTime: Date.now(),
        url: getUrl(),
        page: getPageUrl(),
        domain: document.domain,
        title: document.title,
        level: "ERROR",
        errorType: ERRORTYPE.JSERROR,
        message: JSON.stringify({
            status: e.target.status,
            statusText: e.target.statusText,
        }),
        logCode: "",
        logGenerateTime: Date.now()
    };
    return fieldValueIntercep(ajaxErrorMsg, "message");
}
/**
 * 构造promise错误message生成函数
 */
function promiseErrorMsg(opts, event) {
    let promiseMsg = {
        version: VERSION.VERSION,
        globalSessionId: opts.globalSessionId,
        uniqueVisitorId: opts.uniqueVisitorId,
        systemName: opts.systemName,
        serviceName: opts.serviceName,
        referer: document.referrer,
        userAgent: window.navigator.userAgent,
        ip: "",
        generateTime: Date.now(),
        logGenerateTime: Date.now(),
        url: getUrl(),
        page: getPageUrl(),
        domain: document.domain,
        title: document.title,
        level: "ERROR",
        errorType: ERRORTYPE.PROMISEERROR,
        message: event.reason,
        logCode: ""
    };
    return fieldValueIntercep(promiseMsg, "message");
}
/**
 * 构造静态资源错误message生成函数
 */
function resourceErrorMsg(opts, ev, htmlElement) {
    let resourceMsg = {
        version: VERSION.VERSION,
        globalSessionId: opts.globalSessionId,
        uniqueVisitorId: opts.uniqueVisitorId,
        systemName: opts.systemName,
        serviceName: opts.serviceName,
        referer: document.referrer,
        userAgent: window.navigator.userAgent,
        ip: "",
        generateTime: Date.now(),
        url: getUrl(),
        page: getPageUrl(),
        logGenerateTime: Date.now(),
        domain: document.domain,
        title: document.title,
        level: "ERROR",
        errorType: ERRORTYPE.RESOURCEERROR,
        message: JSON.stringify({
            type: ev.type,
            DOM: htmlElement.outerHTML
        }),
    };
    return fieldValueIntercep(resourceMsg, "message");
}
/**
 * 构造exception日志函数
 */
function exceptionMsg(opts, ex) {
    let exceptMsg = {
        version: VERSION.VERSION,
        globalSessionId: opts.globalSessionId,
        uniqueVisitorId: opts.uniqueVisitorId,
        systemName: opts.systemName,
        serviceName: opts.serviceName,
        referer: document.referrer,
        userAgent: window.navigator.userAgent,
        generateTime: Date.now(),
        url: getUrl(),
        page: getPageUrl(),
        domain: getCookieDomain(),
        title: document.title,
        level: "ERROR",
        errorType: ERRORTYPE.JSERROR,
        message: JSON.stringify({
            error_msg: ex.message || '',
            error_stack: ex.stack || '',
            error_native: ex
        }),
        logCode: "",
        logGenerateTime: Date.now(),
    };
    return fieldValueIntercep(exceptMsg, "message");
}
/**
 * 构造js错误日志生成函数
 */
function createJsErrorMsg(options, error) {
    let jsErrorMsg = {
        version: VERSION.VERSION,
        globalSessionId: options.globalSessionId,
        uniqueVisitorId: options.uniqueVisitorId,
        systemName: options.systemName,
        serviceName: options.serviceName,
        referer: document.referrer,
        userAgent: window.navigator.userAgent,
        generateTime: Date.now(),
        url: getUrl(),
        page: getPageUrl(),
        logGenerateTime: Date.now(),
        domain: getCookieDomain(),
        title: document.title,
        level: "ERROR",
        errorType: ERRORTYPE.JSERROR,
        message: JSON.stringify({
            "Message": error.message,
            "URL": error.source,
            "Line": error.lineno,
            "Column": error.colno,
            "Error": JSON.stringify(error.error)
        }),
        logCode: ""
    };
    return fieldValueIntercep(jsErrorMsg, "message");
}
// 接口日志数据上报格式
/**
 * 参数 req, res, opts, type
 * 用来创建api上报message
 */
export function createApiMsgData(req, res, opts, type) {
    try {
        // getLocalStorage("apiArr").then(result => {
        let apiArray = JSON.parse(getLocalStorage("apiArr")) || [];
        if (apiArray.length < 5) {
            switch (type) {
                case "fetch":
                    apiArray.push(createFetchContext(req, res, opts));
                    // setLocalStorage("apiArr", JSON.stringify(apiArray));
                    break;
                case "ajax":
                    apiArray.push(createAjaxContext(req, res, opts));
                // setLocalStorage("apiArr", JSON.stringify(apiArray));
            }
        }
        else if (apiArray.length === 5) {
            apiInfoReport(opts.apiContextReportUrl, {
                sendTime: Date.now(),
                apiContexts: apiArray
            }).then(res => {
                setLocalStorage("apiArr", "[]");
            }).catch(err => {
                setLocalStorage("apiArr", "[]");
            });
        }
        else {
            // (window as any).bufferMemory.push("1111");
        }
        apiInfoReport(opts.apiContextReportUrl, {
            apiContexts: apiArray,
            sendTime: Date.now()
        });
        // })
        // return {
        //   apiContexts: apiArray,
        //   sendTime: ""
        // };
    }
    catch (e) {
        console.error(`Error while triggering instrumentation handler.\nType: ${type}\nName:
      createApiMessage\nError: ${e}`);
    }
}
/**
 * @description 创建fetch请求上报参数
 * @param req
 * @param res
 * @param opts
 */
function createFetchContext(req, res, opts) {
    return {
        version: VERSION.VERSION,
        globalSessionId: opts.globalSessionId,
        uniqueVisitorId: opts.uniqueVisitorId,
        systemName: opts.systemName,
        serviceName: opts.serviceName,
        referer: document.referrer,
        userAgent: window.navigator.userAgent,
        generateTime: Date.now(),
        url: getUrl(),
        page: getPageUrl(),
        domain: getCookieDomain(),
        title: document.title,
        reqURL: res.url,
        reqParam: opts.apiRequestIsDetail ? req._reqParam : "",
        reqMsg: "",
        reqTime: req._sendTime,
        respMsg: opts.apiRequestIsDetail ? res.statusText : "",
        respTime: opts.apiRequestIsDetail ? req._resTime : "",
        httpStatusCode: opts.apiRequestIsDetail ? res.status : ""
    };
}
/**
 * @description 创建ajax上报参数
 * @param req
 * @param res
 * @param opts
 */
function createAjaxContext(req, res, opts) {
    return {
        version: VERSION.VERSION,
        globalSessionId: opts.globalSessionId,
        uniqueVisitorId: opts.uniqueVisitorId,
        systemName: opts.systemName,
        serviceName: opts.serviceName,
        referer: document.referrer,
        userAgent: window.navigator.userAgent,
        generateTime: Date.now(),
        url: getUrl(),
        page: getPageUrl(),
        domain: getCookieDomain(),
        title: document.title,
        reqURL: req._url,
        reqParam: req._reqParam,
        reqMsg: "",
        reqTime: req._sendTime,
        respMsg: opts.apiRequestIsDetail ? req.responseText : "",
        respTime: opts.apiRequestIsDetail ? req._resTime : "",
        httpStatusCode: opts.apiRequestIsDetail ? res.status : ""
    };
}
// 获取行号
export function getColNum(str) {
    let colNum = 0;
    if (str.indexOf("(") !== -1) {
        colNum = Number(str.match(/\((.+?)\)/g)[0].split("(")[1].split(")")[0].split(".js")[1].split(":")[1]);
    }
    else {
        colNum = Number(str.split(".js")[1].split(":")[1]);
    }
    return colNum;
}
// 获取列号
export function getRowNum(str) {
    let rowNum = 0;
    if (str.indexOf("(") !== -1) {
        rowNum = Number(str.match(/\((.+?)\)/g)[0].split("(")[1].split(")")[0].split(".js")[1].split(":")[2]);
    }
    else {
        rowNum = Number(str.split(".js")[1].split(":")[2]);
    }
    return rowNum;
}
// 获取文件名
export function getFileName(str) {
    let fileName = "";
    if (str.indexOf("(") !== -1) {
        fileName = str.match(/\((.+?)\)/g)[0].split("(")[1].split(")")[0].match(/.*(?=(?::[^:]*){2}$)/g)[0];
    }
    else {
        fileName = str.split(" ")[1].match(/.*(?=(?::[^:]*){2}$)/g)[0];
    }
    return fileName;
}
// 判断是否为promise
export const isPromise = (ret) => {
    return (ret && typeof ret.then === 'function' && typeof ret.catch === "function");
};
// 获取顶级domain
export const getCookieDomain = () => {
    let host = location.hostname;
    let str = "";
    const ip = /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
    if (ip.test(host) === true || host === 'localhost')
        return `${host}`;
    const regex = /([^]*).*/;
    const match = host.match(regex);
    if (typeof match !== "undefined" && null !== match)
        str = match[1];
    if (typeof host !== "undefined" && null !== host) {
        const strAry = host.split(".");
        if (strAry.length > 1) {
            if (strAry.length === 2)
                str = `${host}`;
            if (str.length > 2) {
                str = strAry[strAry.length - 2] + "." + strAry[strAry.length - 1];
            }
        }
        str = str === "com.cn" ? strAry[strAry.length - 3] + "." + str : str;
    }
    return '.' + str;
};
// 获取url
export const getPageUrl = () => {
    if (window.location.hash !== "" && window.location.pathname === "/") {
        return window.location.origin + window.location.hash;
    }
    else {
        return window.location.origin + window.location.pathname;
    }
};
export const getUrl = () => {
    return window.location.href;
};
/**
 * @Description 获取请求参数
 * @Param method:请求类型, url:请求地址, body: post请求会用到
 * @return
 */
export const getReqParams = (url, body) => {
    let paramsJsonStr;
    let theRequest = new Object();
    if (url.indexOf("?") !== -1) {
        let search = url.split("?")[1];
        paramsJsonStr = search;
    }
    else {
        paramsJsonStr = "";
    }
    return paramsJsonStr;
};
/**
 * @description 获取请求uri
 * @param url
 */
export const getUrlBody = (url) => {
    if (url && url.indexOf("?") !== -1) {
        return url.split("?")[0];
    }
    else {
        return url;
    }
};
export const getSplitUrl = (url) => {
    let splitUrl = "";
    if (url) {
        return getUrlBody(url).split("//")[1].substring(getUrlBody(url).split("//")[1].indexOf("/"));
    }
};
/**
 * @description 判断是否包含上报地址
 * @param url
 * @param options
 */
export const isCludeUrl = (url, options) => {
    if (url) {
        return url.indexOf(options.logContextReportUrl) === -1 && url.indexOf(options.apiContextReportUrl) === -1;
    }
    else {
        return false;
    }
};
/**
 * @description url工具函数
 */
export const reqUrlTool = (url) => {
    if (url) {
        return url.indexOf("//") !== -1 ? url : window.location.origin + url;
    }
    else {
        return "";
    }
};
