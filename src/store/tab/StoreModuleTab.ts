/**
 * 状态管理：标签页面
 * @author arvin 2018-07-23
 */

import { ActionContext, Module } from "vuex";
import { IStoreModuleTabState, TabItem } from "./StoreModuleTabState";
import _ from "lodash";
import store from "store";

/** 本地存储属性名称 */
const STORE_MODULE_TAB_STORE_KEY = {
  /** 所有标签 */
  TABS: "TABS",
  /** 当前标签 */
  CURRENT_TAB: "CURRENT_TAB"
};

const StoreModuleTab: Module<IStoreModuleTabState, any> = {
  state: {
    tabs: [new TabItem("首页", "home", {}, {})],
    currentTab: new TabItem("首页", "home", {}, {})
  },
  getters: {
    TABS: (state: IStoreModuleTabState): Array<TabItem> => state.tabs,
    CURRENT_TAB: (state: IStoreModuleTabState): TabItem => state.currentTab
  },
  mutations: {
    /**
     * 初始化标签，从本地存储中恢复上次打开的标签列表；
     * @param state
     * @private
     */
    _TAB_INIT(state: IStoreModuleTabState) {
      const tabs = store.get(STORE_MODULE_TAB_STORE_KEY.TABS);
      if (tabs) {
        state.tabs = tabs;
      } else {
        store.set(STORE_MODULE_TAB_STORE_KEY.TABS, state.tabs);
      }

      const currentTab = store.get(STORE_MODULE_TAB_STORE_KEY.CURRENT_TAB);
      if (currentTab) {
        state.currentTab = currentTab;
      } else {
        store.set(STORE_MODULE_TAB_STORE_KEY.CURRENT_TAB, state.currentTab);
      }
    },
    _TAB_OPEN(state: IStoreModuleTabState, tab: TabItem) {
      /* 如果要打开的是当前标签页，则不做处理 */
      if (tab.name === state.currentTab.name) {
        return;
      }

      const existentTab = _.find(
        state.tabs,
        (i: TabItem) => i.name === tab.name
      );
      if (!existentTab) {
        /* 如果要打开的标签页当前尚未添加到标签列表，则先添加 */
        state.tabs.push(tab);
        store.set(STORE_MODULE_TAB_STORE_KEY.TABS, state.tabs);
        state.currentTab = tab;
      } else {
        /* 如果要打开的标签页当前已经添加到标签列表，则更新参数 */
        existentTab.params = tab.params;
        existentTab.query = tab.query;
        state.currentTab = existentTab;
      }

      store.set(STORE_MODULE_TAB_STORE_KEY.CURRENT_TAB, state.currentTab);
    },
    _TAB_CLOSE(state: IStoreModuleTabState, tab: TabItem) {
      state.tabs = _.without(state.tabs, tab);
      store.set(STORE_MODULE_TAB_STORE_KEY.TABS, state.tabs);
    },
    _TAB_CLOSE_ALL(state: IStoreModuleTabState) {
      state.currentTab = state.tabs[0];
      store.set(STORE_MODULE_TAB_STORE_KEY.CURRENT_TAB, state.currentTab);
      state.tabs = [state.currentTab];
      store.set(STORE_MODULE_TAB_STORE_KEY.TABS, state.tabs);
    },
    _TAB_CLOSE_OTHER(state: IStoreModuleTabState) {
      state.tabs = _.filter(
        state.tabs,
        i => i.name === "home" || i.name === state.currentTab.name
      );
      store.set(STORE_MODULE_TAB_STORE_KEY.TABS, state.tabs);
    },
    _TAB_UPDATE(state: IStoreModuleTabState, tabs: Array<TabItem>) {
      state.tabs = tabs;
      store.set(STORE_MODULE_TAB_STORE_KEY.TABS, state.tabs);
    }
  },
  actions: {
    /**
     * 初始化标签
     * @param commit
     * @param state
     * @param tab
     */
    TAB_INIT({ commit, state }: ActionContext<IStoreModuleTabState, any>) {
      commit("_TAB_INIT");
    },
    /**
     * 打开标签
     * @param commit
     * @param state
     * @param tab
     */
    TAB_OPEN(
      { commit, state }: ActionContext<IStoreModuleTabState, any>,
      tab: TabItem
    ) {
      commit("_TAB_OPEN", tab);
    },
    /**
     * 关闭标签
     * @param commit
     * @param state
     * @param tab
     */
    TAB_CLOSE(
      { commit, state }: ActionContext<IStoreModuleTabState, any>,
      tab: TabItem
    ): TabItem | undefined {
      let nextTab: TabItem | undefined;
      /*
       * 如果关闭的是当前打开的标签，
       *     如果当前打开的标签是最后一个标签，则跳转到上一个标签；
       *     如果当前打开的标签不是最后一个标签，则跳转到下一个标签；
       */
      if (tab.name === state.currentTab.name) {
        const index: number = _.findIndex(state.tabs, i => i.name === tab.name);
        if (index < state.tabs.length - 1) {
          nextTab = state.tabs[index + 1];
        } else {
          nextTab = state.tabs[index - 1];
        }
      }

      commit("_TAB_CLOSE", tab);
      return nextTab;
    },
    /**
     * 关闭所有标签
     * @param commit
     */
    TAB_CLOSE_ALL({ commit }: ActionContext<IStoreModuleTabState, any>) {
      commit("_TAB_CLOSE_ALL");
    },
    /**
     * 关闭其他标签
     * @param commit
     */
    TAB_CLOSE_OTHER({ commit }: ActionContext<IStoreModuleTabState, any>) {
      commit("_TAB_CLOSE_OTHER");
    },
    /**
     * 更新标签
     * @param commit
     * @param tabs
     */
    TAB_UPDATE(
      { commit }: ActionContext<IStoreModuleTabState, any>,
      tabs: Array<TabItem>
    ) {
      commit("_TAB_UPDATE", tabs);
    }
  }
};

export { StoreModuleTab, STORE_MODULE_TAB_STORE_KEY };
