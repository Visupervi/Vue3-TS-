/**
 * @Author visupervi
 * @Description 工具函数
 * @Date 8:56 上午 2021/10/13
 * @Param
 * @return
 */
import { IParams } from "../../interface/paramsInterface";
export declare function isFunction(param: any): boolean;
export declare function isString(param: any): boolean;
export declare function isObject(param: any): boolean;
export declare function isError(param: any): boolean;
export declare const formatTimeTool: (date: Date) => string;
export declare const formatNumber: (n: any) => any;
export declare function uuid(): string;
export declare function getOptions(options: IParams): () => IParams;
export declare function createMsgData(error: any, opts: IParams, type: string): void;
/**
 * 参数 req, res, opts, type
 * 用来创建api上报message
 */
export declare function createApiMsgData(req: any, res: Response, opts: IParams, type: string): void;
export declare function getColNum(str: string): number;
export declare function getRowNum(str: string): number;
export declare function getFileName(str: string): string;
export declare const isPromise: (ret: any) => boolean;
export declare const getCookieDomain: () => string;
export declare const getPageUrl: () => string;
export declare const getUrl: () => string;
/**
 * @Description 获取请求参数
 * @Param method:请求类型, url:请求地址, body: post请求会用到
 * @return
 */
export declare const getReqParams: (url?: string, body?: string) => string;
/**
 * @description 获取请求uri
 * @param url
 */
export declare const getUrlBody: (url: string) => string;
export declare const getSplitUrl: <T>(url: string) => string;
/**
 * @description 判断是否包含上报地址
 * @param url
 * @param options
 */
export declare const isCludeUrl: (url: string, options: IParams) => boolean;
/**
 * @description url工具函数
 */
export declare const reqUrlTool: (url: string) => string;
