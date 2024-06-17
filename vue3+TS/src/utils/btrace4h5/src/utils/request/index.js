var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @Author visupervi
 * @Description   请求封装
 * @Date 10:58 上午 2021/11/12
 * @Param
 * @return
 */
export const $fetch = (url = "", data = {}, type = "POST", method = "fetch") => __awaiter(void 0, void 0, void 0, function* () {
    if (type.toLocaleLowerCase() === "get") {
        let str = "";
        Object.keys(data).map((item, index) => {
            str += item + '=' + data[item] + '&';
        });
        if (str !== "") {
            str = str.substr(0, str.lastIndexOf("&"));
            url = url + "?" + str;
        }
    }
    if (window.fetch && method === "fetch") {
        let requestConfig = {
            // credentials: 'include',
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            mode: "cors",
        };
        // let data = {"1": 2, "3": 4};
        if (type.toLocaleLowerCase() === "post") {
            Object.defineProperty(requestConfig, 'body', {
                value: JSON.stringify(data)
            });
        }
        try {
            const response = yield fetch(url, requestConfig);
            if (response)
                return yield response.json();
        }
        catch (e) {
            throw new Error(e);
        }
    }
    else {
        return new Promise(((resolve, reject) => {
            let reqObj = !window.XMLHttpRequest ? new ActiveXObject("Microsoft.XMLHTTP") : new XMLHttpRequest();
            let sendData = "";
            if (type.toLowerCase() === "post") {
                sendData = JSON.stringify(data);
            }
            reqObj.open(type, url, true);
            reqObj.setRequestHeader("Content-type", "application/json");
            reqObj.send(sendData);
            reqObj.onreadystatechange = () => {
                if (reqObj.readyState === 4) {
                    if (reqObj.status === 200) {
                        resolve(JSON.parse(reqObj.response));
                    }
                }
                else {
                    reject(reqObj.response);
                }
            };
        }));
    }
});
