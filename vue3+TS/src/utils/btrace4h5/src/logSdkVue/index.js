/**
 * @Author visupervi
 * @Description 针对Vue项目
 * @Date 3:50 下午 2021/11/22
 * @Param
 * @return
 */
import { exceptionReport } from "../utils/exceptionReport";
import { createMsgData, isPromise } from "../utils/tools";
import { ERROR_TYPE } from "../types";
const vueErrorHandler = (options) => {
    // @ts-ignore
    let Vue = options.frameworkName;
    // @ts-ignore
    if (!Vue || !Vue.config)
        return;
    let _oldOnError = Vue.config.errorHandler;
    Vue.config.errorHandler = function VueErrorHandler(error, vm, info) {
        // 上报
        const msg = createMsgData(error, {
            globalSessionId: options.globalSessionId,
            uniqueVisitorId: options.uniqueVisitorId,
            systemName: options.systemName,
            serviceName: options.serviceName,
            apiRequestIsEnable: options.apiRequestIsEnable ? options.apiRequestIsEnable : true,
            errorMsgIsEnable: options.errorMsgIsEnable ? options.errorMsgIsEnable : true,
            sampleRate: options.sampleRate || 10,
        }, ERROR_TYPE.VUE);
        exceptionReport(options.logContextReportUrl, msg);
        // TODO 待测试
        if (typeof _oldOnError === 'function') {
            // 拦截Vue.config.errorHandler
            // @ts-ignore
            _oldOnError.call(this, error, vm, info);
        }
        Vue.mixin({
            beforeCreate() {
                registerVue(this);
                registerVuex(this);
            }
        });
    };
};
const registerActionHandle = actions => {
    Object.keys(actions).forEach(key => {
        let fn = actions[key];
        actions[key] = function () {
            let args = Array.prototype.slice.call(arguments, this.length);
            let ret = fn.apply(this, args);
            if (isPromise(ret)) {
                return ret.catch(vueErrorHandler);
            }
            else { // 默认错误处理
                return ret;
            }
        };
    });
};
// 对vuex的错误处理
const registerVuex = (instance) => {
    if (instance.$options['store']) {
        let actions = instance.$options['store']['_actions'] || {};
        if (actions) {
            let tempActions = {};
            Object.keys(actions).forEach(key => {
                tempActions[key] = actions[key][0];
            });
            registerActionHandle(tempActions);
        }
    }
};
// 对vue的错误处理
const registerVue = (instance) => {
    if (instance.$options.methods) {
        let actions = instance.$options.methods || {};
        if (actions) {
            registerActionHandle(actions);
        }
    }
};
export default vueErrorHandler;
