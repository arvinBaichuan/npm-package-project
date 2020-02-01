/**
 * element-ui 的 Menu 组件没有暴露 initOpenedMenu() 方法，
 * 通过组件增强的方式，自定义该方法的类型定义
 */

import "element-ui";
import Vue from "vue";

declare module "element-ui" {
  class Menu extends Vue {
    initOpenedMenu(): void;
  }
}
