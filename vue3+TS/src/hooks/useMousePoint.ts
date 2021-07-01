
/**
 * @Author visupervi
 * @Description
 * @Date 11:37 上午 2021/7/1
 * @Param
 * @return
 */

/**
 * 使用Vue3的组合API封装的可复用的功能函数

 * 自定义hook的作用类似于vue2中的mixin技术

 * 自定义Hook的优势: 很清楚复用功能代码的来源, 更清楚易懂

 * 需求1: 收集用户鼠标点击的页面坐标
 */
import {onMounted, onBeforeMount, ref} from "vue";

export default function (): any {
  const x = ref(-1);
  const y = ref(-1);

  const clickHandler = (event: MouseEvent) => {
    x.value = event.pageX;
    y.value = event.pageY;
  };

  onMounted(() => {
    document.addEventListener("click", clickHandler);
  });

  onBeforeMount(() => {
    document.removeEventListener("click", clickHandler);
  });

  return {
    x,
    y
  };
}
