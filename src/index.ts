/**
 * @author arvin 2017-11-13
 */

import _ from "lodash";
import Vue, { VueConstructor } from "vue";
import "./assets/styles/index.scss";
import { IInstallOption } from "./vms";
/*
 * 指令
 */
import * as directives from "./directive";
import { IDirective } from "./directive/IDirective";
/*
 * 类型定义
 */
import "./types/jquery-slimscroll";
/*
 * 组件
 */
import * as components from "./components";

/*
 * 安装
 */
const install = (vue: typeof Vue, options: IInstallOption = {}) => {
  _.forEach(components, (component: VueConstructor, key: string) => {
    vue.component(key, component);
  });

  _.forEach(directives, (directive: IDirective) => {
    directive.install(vue, options);
  });
};

export * from "./vms";
export * from "./store";
export { Q } from "./lib/qunee";

/**
 * 此处输出的组件可以单独引用
 * @example
 *
 */
export * from "./components";

/**
 * 默认输出，用于安装插件
 * @example
 *
 *   Vue.use(HyVue, {});
 */
export default { install };
