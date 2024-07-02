// 文件命名规范要与使用的组件名对应

import { defineStore } from "pinia"

// 规范要用hooks这种方式的命名规范
export const useSumStore = defineStore("sum", {
  // 操作函数
  actions: {
    increment(val: number) {
      this.sum += val
    },
    sub(val: number) {
      this.sum -= val
    }
  },
  state() {
    return {
      sum: 6
    }
  },
  getters: {
    bigSum: state => state.sum * 10
    
  }
})