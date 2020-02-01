/**
 * 指令：内联弹窗
 *
 * 项目添加了多标签导航栏组件（HyLayoutTab）之后，所有的弹窗都应该使用该指令，
 * 从而使得弹窗的遮罩层只会遮盖标签内容区域，不影响其他标签的切换；
 *
 * @example
 *     <Dialog v-inline-modal>
 *
 * @author arvin 2018-08-27
 */

import Vue, { VNode, VNodeDirective } from "vue";
import { IDirective } from "./IDirective";
import { Dialog } from "element-ui";

function install(vue: typeof Vue) {
  vue.directive("inline-modal", {
    bind(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
      if (vnode.componentInstance) {
        /*
         * FIXME 此处直接修改了 props 的值，
         *   并通过覆写 console.error() 方法，屏蔽此处的报错信息
         */
        const consoleErrorFn = console.error;
        console.error = () => {}; // tslint:disable-line:no-empty
        (vnode.componentInstance as Dialog).modal = false;
        console.error = consoleErrorFn;
      }

      el.classList.toggle("el-dialog--inline", binding.value !== false);
    },
    async update(el: HTMLElement, binding: VNodeDirective) {
      await Vue.nextTick();
      el.classList.toggle("el-dialog--inline", binding.value !== false);
    },
    async componentUpdated(el: HTMLElement, binding: VNodeDirective) {
      await Vue.nextTick();
      el.classList.toggle("el-dialog--inline", binding.value !== false);
    }
  });
}

const VInlineModal: IDirective = { install };

export { VInlineModal };
