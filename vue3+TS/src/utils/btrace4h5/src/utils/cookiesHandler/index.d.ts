/**
 * @Author visupervi
 * @Description 对cookie进行封装
 * @Date 8:49 上午 2021/10/13
 * @Param
 * @return
 */
import { ICookieParams } from "../../interface/paramsInterface";
export declare const setCookie: (key: string, value: string, options: ICookieParams) => void;
export declare const getCookie: (key: string) => string;
/**
 * @description 初始化cookie
 * @param sessionKey
 * @param uniqueVisiKey
 */
export declare function initCookie(sessionKey: any, uniqueVisiKey: any): {
    sessionId: string;
    uniqueVisiId: string;
};
