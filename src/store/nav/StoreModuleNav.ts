/**
 * 状态管理：导航&菜单
 * @author arvin 2018-07-20
 */

import { ActionContext, Module } from "vuex";
import {
  IStoreModuleNavState,
  NavBreadcrumb,
  NavBreadcrumbItem,
  NavMenu
} from "./StoreModuleNavState";
import { MenuDTO } from "@ytd/fe-core";

const StoreModuleNav: Module<IStoreModuleNavState, any> = {
  state: {
    /** 当前菜单 */
    menu: new NavMenu(),
    /** 所有菜单 */
    menus: [],
    /** 面包屑导航栏 */
    breadcrumb: new NavBreadcrumb("首页", [
      new NavBreadcrumbItem("", "", "home", false)
    ]),
    /** 左侧菜单是否收起 */
    menuCollapsed: false
  },
  getters: {
    NAV_MENU: (state: IStoreModuleNavState): NavMenu => state.menu,
    NAV_MENUS: (state: IStoreModuleNavState): Array<MenuDTO> => state.menus,
    NAV_BREADCRUMB: (state: IStoreModuleNavState): NavBreadcrumb =>
      state.breadcrumb,
    NAV_MENU_COLLAPSED: (state: IStoreModuleNavState): boolean =>
      state.menuCollapsed
  },
  mutations: {
    _NAV_MENU_SET(state: IStoreModuleNavState, payload: any) {
      state.menu.id = payload.menu.id;
      state.menu.name = payload.menu.name;
      state.menu.url = payload.menu.url;
      state.menu.child.id = payload.childMenu.id;
      state.menu.child.name = payload.childMenu.name;
      state.menu.child.url = payload.childMenu.url;
    },
    _NAV_MENU_RESET(state: IStoreModuleNavState) {
      state.menu = new NavMenu();
    },
    _NAV_MENUS_SET(state: IStoreModuleNavState, payload: Array<MenuDTO>) {
      state.menus = payload;
    },
    _NAV_BREADCRUMB_SET(
      state: IStoreModuleNavState,
      payload: Array<NavBreadcrumbItem>
    ) {
      state.breadcrumb.title = state.menu.child.name;
      state.breadcrumb.items = payload;
    },
    _NAV_BREADCRUMB_TITLE_SET(state: IStoreModuleNavState, payload: string) {
      state.breadcrumb.title = payload;
    },
    _NAV_BREADCRUMB_RESET(state: IStoreModuleNavState) {
      state.breadcrumb = new NavBreadcrumb("首页", [
        new NavBreadcrumbItem("", "首页", "home", false)
      ]);
    },
    _SET_NAV_MENU_COLLAPSED(state, collapsed: boolean) {
      state.menuCollapsed = collapsed;
    }
  },
  actions: {
    NAV_MENU_SET: (
      { commit }: ActionContext<IStoreModuleNavState, any>,
      payload: any
    ) => commit("_NAV_MENU_SET", payload),
    NAV_MENU_RESET: ({ commit }: ActionContext<IStoreModuleNavState, any>) =>
      commit("_NAV_MENU_RESET"),
    NAV_MENUS_SET: (
      { commit }: ActionContext<IStoreModuleNavState, any>,
      payload: Array<MenuDTO>
    ) => commit("_NAV_MENUS_SET", payload),
    NAV_BREADCRUMB_SET: (
      { commit }: ActionContext<IStoreModuleNavState, any>,
      payload: Array<NavBreadcrumbItem>
    ) => commit("_NAV_BREADCRUMB_SET", payload),
    NAV_BREADCRUMB_TITLE_SET: (
      { commit }: ActionContext<IStoreModuleNavState, any>,
      payload: string
    ) => commit("_NAV_BREADCRUMB_TITLE_SET", payload),
    NAV_BREADCRUMB_RESET: ({
      commit
    }: ActionContext<IStoreModuleNavState, any>) =>
      commit("_NAV_BREADCRUMB_RESET"),
    SET_NAV_MENU_COLLAPSED: ({ commit }, collapsed: boolean) =>
      commit("_SET_NAV_MENU_COLLAPSED", collapsed)
  }
};

export { StoreModuleNav };
