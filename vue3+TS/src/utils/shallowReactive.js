const reactiveHandler = {
    get(target, prop, receiver) {
        return Reflect.get(target, prop);
    },
    set(target, prop, value, receiver) {
        console.log("设置属性");
        return Reflect.set(target, prop, value);
    },
    deleteProperty(target, prop) {
        console.log("调用函数");
        return true;
    }
};
export const shallowReactive = (target) => {
    if (target && typeof target === 'object') {
        return new Proxy(target, reactiveHandler);
    }
    return target;
};
function reactive(target) {
    if (target && typeof target === "object") {
        if (Array.isArray(target)) {
            target.map((item, index) => {
                target[index] = item;
            });
        }
        else {
            Object.keys(target).forEach(key => {
                // target[key] = target[key]
            });
        }
    }
}
//# sourceMappingURL=shallowReactive.js.map