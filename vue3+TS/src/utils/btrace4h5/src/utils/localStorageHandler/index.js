export const setLocalStorage = (key, value) => {
    if (!key)
        return;
    if (typeof value !== "string") {
        value = JSON.stringify(value);
    }
    window.localStorage.setItem(key, value);
};
export const getLocalStorage = (key) => {
    if (!key)
        return;
    // return window.localStorage.getItem(key);
    return window.localStorage.getItem(key);
};
export const removeLocalStorage = (key) => {
    if (!key)
        return;
    window.localStorage.removeItem(key);
};
export const initLogArr = () => {
    setLocalStorage("apiArr", "[]");
    setLocalStorage("logArr", "[]");
    window.bufferMemory = [];
};
