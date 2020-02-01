/**
 * 指令：只读的 InputNumber
 *
 * 在 InputNumber 上应用了该指令之后，InputNumber 不能手动输入数字，
 * 只能通过点击加减控制按钮更改数字
 *
 * @example
 *     <InputNumber v-readonly-input-number>
 *
 * @author arvin 2019-01-29
 */

import Vue from "vue";
import { IDirective } from "./IDirective";

/**
 * 禁用输入标签
 * @param el InputNumber 组件对应的 DOM 元素
 */
function disableInput(el: HTMLElement) {
  const inputEl = el.querySelector<HTMLInputElement>(".el-input__inner");
  if (inputEl) {
    inputEl.disabled = true;
    inputEl.style.textAlign = "left";
  }
}

/**
 * 安装
 * @param vue
 */
function install(vue: typeof Vue) {
  vue.directive("readonly-input-number", {
    bind(el: HTMLElement) {
      disableInput(el);
    },
    async update(el: HTMLElement) {
      await Vue.nextTick();
      disableInput(el);
    },
    async componentUpdated(el: HTMLElement) {
      await Vue.nextTick();
      disableInput(el);
    }
  });
}

const VReadonlyInputNumber: IDirective = { install };

export { VReadonlyInputNumber };
