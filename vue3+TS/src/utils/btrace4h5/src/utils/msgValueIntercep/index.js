/**
 * 截取value值
 */
import { sizeIsCorrect, subStrEndPosition } from "../bytesToSizeHandler";
export const msgValueIntercep = (msg, field) => {
    let message;
    Object.keys(msg).map(key => {
        if (key === "logContexts") {
            msg[key].map((v, i) => {
                Object.keys(v).map(k => {
                    if (key === field) {
                        if (sizeIsCorrect(msg[key][i][k], 1)) {
                        }
                        else {
                            msg[key][i][k] = msg[key][i][k].substring(0, subStrEndPosition(msg[key][i][k], "utf16", 1));
                        }
                    }
                });
            });
        }
    });
    message = msg;
    return message;
};
/**
 * @description 计算message长度
 * @param msg
 * @param field
 */
export const fieldValueIntercep = (msg, field) => {

  console.log("msg", msg);
    Object.keys(msg).map(key => {
        if (key === field) {
            if (sizeIsCorrect(msg[key], 1)) {
            }
            else {
                msg[key] = msg[key].substring(0, subStrEndPosition(msg[key], "utf16", 1));
            }
        }
    });
    return msg;
};
