export default function globalOnHttpXHRHandler(oldXHR, cb) {
    return () => {
        const realXHR = new oldXHR();
        let requestObj = {};
        const xhr_open = realXHR.open;
        const xhr_send = realXHR.send;
        const headers = {};
        const setRequestHeader = realXHR.setRequestHeader;
        realXHR.open = function (...args) {
            requestObj = Object.assign({}, requestObj, {
                method: args[0],
                url: args[1],
            });
            xhr_open.apply(this, args);
        };
        realXHR.send = function (...args) {
            requestObj = Object.assign({}, requestObj, {
                body: args[0]
            });
            xhr_send.apply(this, args);
        };
        realXHR.setRequestHeader = function (...args) {
            // 在这里，我们加入自己的获取逻辑
            headers[args[0]] = args[1];
            setRequestHeader.apply(this, args);
        };
        realXHR.addEventListener('loadend', (ev) => {
            var _a, _b, _c, _d;
            const status = (_a = ev === null || ev === void 0 ? void 0 : ev.target) === null || _a === void 0 ? void 0 : _a.status;
            if (status === 200)
                return;
            if (((_b = ev === null || ev === void 0 ? void 0 : ev.target) === null || _b === void 0 ? void 0 : _b.readyState) !== 4)
                return;
            if (!((_c = ev === null || ev === void 0 ? void 0 : ev.target) === null || _c === void 0 ? void 0 : _c.responseURL))
                return;
            const headerString = JSON.stringify(headers);
            const request = JSON.stringify(requestObj);
            const url = requestObj.url;
            const responseText = (_d = ev === null || ev === void 0 ? void 0 : ev.target) === null || _d === void 0 ? void 0 : _d.responseText;
            const requestTime = +new Date();
            cb({
                status,
                headers: headerString,
                request,
                url,
                response: responseText,
                request_time: requestTime,
            });
        }, false);
        return realXHR;
    };
}
