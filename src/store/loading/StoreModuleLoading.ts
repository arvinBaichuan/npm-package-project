/**
 * 状态管理：全局加载指示
 * @author arvin 2019-01-21
 */

import { ActionContext, Module } from "vuex";
import { IStoreModuleLoadingState } from "./StoreModuleLoadingState";
import { IInstallOption } from "../../vms";
import Vue from "vue";

const StoreModuleLoading: Module<IStoreModuleLoadingState, {}> = {
  state: {
    visible: false,
    message: "正在请求 …"
  },
  getters: {
    LOADING_VISIBLE: (state: IStoreModuleLoadingState): boolean =>
      state.visible,
    LOADING_MESSAGE: (state: IStoreModuleLoadingState): string => state.message
  },
  mutations: {
    /**
     * 显示提示
     * @param state
     * @param message 提示信息
     */
    SHOW_LOADING(state: IStoreModuleLoadingState, message?: string) {
      if (message) {
        state.message = message;
      }
      state.visible = true;
    },
    /**
     * 隐藏提示
     * @param state
     */
    HIDE_LOADING(state: IStoreModuleLoadingState) {
      state.visible = false;
      state.message = "正在请求 …";
    }
  },
  actions: {
    SHOW_LOADING(
      { commit }: ActionContext<IStoreModuleLoadingState, {}>,
      message?: string
    ) {
      commit("SHOW_LOADING", message);
    },
    HIDE_LOADING({ commit }: ActionContext<IStoreModuleLoadingState, {}>) {
      commit("HIDE_LOADING");
    }
  }
};

function install(vue: typeof Vue, options: IInstallOption = {}) {
  Object.defineProperties(vue.prototype, {
    $showLoading: {
      value(message?: string) {
        if (options.store) {
          options.store.dispatch("SHOW_LOADING", message);
        }
      },
      enumerable: false,
      writable: false,
      configurable: false
    },
    $hideLoading: {
      value() {
        if (options.store) {
          options.store.dispatch("HIDE_LOADING");
        }
      },
      enumerable: false,
      writable: false,
      configurable: false
    }
  });
}

declare module "vue/types/vue" {
  // tslint:disable-next-line:interface-name
  interface Vue {
    /**
     * 显示全局加载指示
     * @param message 提示消息
     */
    $showLoading(message?: string): void;

    /**
     * 隐藏全局加载指示
     */
    $hideLoading(): void;
  }
}

export { StoreModuleLoading, install };
