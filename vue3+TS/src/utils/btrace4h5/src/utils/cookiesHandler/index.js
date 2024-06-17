/**
 * @Author visupervi
 * @Description 对cookie进行封装
 * @Date 8:49 上午 2021/10/13
 * @Param
 * @return
 */
// const stamp1 = new Date(new Date().setHours(0, 0, 0, 0)); 设置零点
import { getCookieDomain, uuid } from "../tools";
import { HEADERS } from "../../types";
// 设置cookie，允许跨域访问
const stamp = "Tue, 19 Jan 2038 03:14:07 GMT"; // 世界末日时间
export const setCookie = (key, value, options) => {
    document.cookie = `${key}=${value};domain=${options.domain};expires=${options.expires ? options.expires : ''};secure=${options.secure ? options.secure : ''}`;
};
// 获取cookie
export const getCookie = (key) => {
    let arr = document.cookie.split(";");
    for (let i = 0; i < arr.length; i++) {
        let arr2 = arr[i].split("=");
        if (arr2[0].trim() === key) {
            return arr2[1].trim();
        }
    }
    const sessionId = uuid();
    key !== HEADERS.XB3UNIQUEVISITORID ?
        setCookie(key, sessionId, { domain: getCookieDomain() }) :
        setCookie(key, `${sessionId}`, { domain: getCookieDomain(), secure: true, expires: stamp });
    return sessionId;
};
/**
 * @description 初始化cookie
 * @param sessionKey
 * @param uniqueVisiKey
 */
export function initCookie(sessionKey, uniqueVisiKey) {
    // X-B3-UniqueVisitorId
    let cookie = {
        sessionId: uuid(),
        uniqueVisiId: uuid()
    };
    if (!getCookie(sessionKey)) {
        setCookie(sessionKey, `${cookie.sessionId}`, { domain: getCookieDomain() });
    }
    else {
        cookie.sessionId = getCookie(sessionKey);
    }
    if (!getCookie(uniqueVisiKey)) {
        // const stamp = new Date(new Date().setHours(0, 0, 0, 0)+ 24 * 60 * 60 * 1000 - 1).toUTCString();
        setCookie(uniqueVisiKey, `${cookie.uniqueVisiId}`, { domain: getCookieDomain(), secure: true, expires: stamp });
    }
    else {
        cookie.uniqueVisiId = getCookie(uniqueVisiKey);
    }
    return cookie;
}
