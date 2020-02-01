/**
 * 指令：权限控制
 *
 * @example
 *   <button v-permission="'USER_ADD'">添加用户</button>
 *
 * @author arvin 2018-08-24
 */
import Vue, { VNode, VNodeDirective } from "vue";
import _ from "lodash";
import { IInstallOption } from "../vms";
import { IDirective } from "./IDirective";

/**
 * 隐藏组件元素
 * @param el
 * @param vnode
 */
function $destroyElement(el: HTMLElement, vnode: VNode) {
  const vm = vnode.componentInstance;
  const comment = document.createComment(" ");

  Object.defineProperty(comment, "setAttribute", {
    value: () => undefined
  });

  vnode.text = " ";
  vnode.elm = comment;
  vnode.isComment = true;
  vnode.context = undefined;
  vnode.tag = undefined;
  if (vnode.data) {
    vnode.data.directives = undefined;
  }

  if (vm) {
    // @ts-ignore: TS2540: Cannot assign to '$el' because it is a constant or a read-only property.
    vm.$el = comment;
  }

  if (el.parentNode) {
    el.parentNode.replaceChild(comment, el);
  }
}

/**
 * 禁用组件元素
 * @param el
 * @param vnode
 */
function $disableElement(el: HTMLElement, vnode: VNode) {
  const vm = vnode.componentInstance;

  el.setAttribute("disabled", "disabled");
  if (!el.className.includes("is-disabled")) {
    el.className += " is-disabled";
  }

  if (vm) {
    // @ts-ignore: TS2540: Cannot assign to '$el' because it is a constant or a read-only property.
    vm.$el = $(el.outerHTML)[0];

    vnode.elm = vm.$el;
    if (el.parentNode) {
      el.parentNode.replaceChild(vm.$el, el);
    }
  }
}

function install(vue: typeof Vue, options: IInstallOption = {}) {
  vue.directive("permission", {
    bind(el: HTMLElement, binding: VNodeDirective, vnode: VNode) {
      const vm = vnode.componentInstance;

      if (!vm) {
        return;
      }

      /* 动作标识 */
      const actionCode: string = binding.value;
      /* 是否禁用元素，否则为移除元素 */
      const disable: boolean = binding.modifiers
        ? binding.modifiers.disable
        : false;

      if (options.store) {
        const permissions: Array<string> = options.store.getters.PERMISSIONS;
        /* 权限数据中包含当前动作权限，销毁组件 */
        const permission = _.find(permissions, (i: string) => i === actionCode);

        if (permission) {
          if (disable) {
            $disableElement(el, vnode);
          } else {
            $destroyElement(el, vnode);
          }
        }
      }
    }
  });
}

const VPermission: IDirective = { install };

export { VPermission };
