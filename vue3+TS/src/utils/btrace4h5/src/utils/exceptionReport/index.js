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
 * @Description 错误上报函数
 * @Date 2:10 下午 2021/8/11
 * @Param
 * @return
 */
import { $fetch } from "../request";
import { sizeIsCorrect } from "../bytesToSizeHandler";
export const exceptionReport = (url = "", data) => __awaiter(void 0, void 0, void 0, function* () {
    if (sizeIsCorrect(JSON.stringify(data)))
        return yield $fetch(url, data, "post");
});
export const apiInfoReport = (url = "", data) => __awaiter(void 0, void 0, void 0, function* () {
    if (sizeIsCorrect(JSON.stringify(data)))
        return yield $fetch(url, data, "post", "fetch");
});
