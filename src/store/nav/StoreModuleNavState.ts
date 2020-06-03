/**
 * 状态数据
 * @author arvin 2018-07-23
 */

import { IdNameDTO, MenuDTO } from "../../vms/dto/index";

/**
 * 二级菜单
 * @constructor
 */
class NavChildMenu extends IdNameDTO {
  /** 对应的路由的 name 属性 */
  url: string = "";
}

/**
 * 一级菜单
 * @constructor
 */
class NavMenu extends NavChildMenu {
  /** 二级菜单 */
  child: NavChildMenu = new NavChildMenu();
}

/**
 * 面包屑导航栏：面包屑
 */
class NavBreadcrumbItem extends IdNameDTO {
  /** 对应的路由的 name 属性 */
  url: string = "";

  /** 是否是链接，否则是文本 */
  isLink: boolean = false;

  /** 额外的查询参数 */
  query?: object;

  constructor(
    id: string,
    name: string,
    url: string,
    isLink: boolean,
    query?: object
  ) {
    super({ id, name });
    this.url = url;
    this.isLink = isLink;
    this.query = query;
  }
}

/**
 * 面包屑导航栏
 */
class NavBreadcrumb {
  /** 标题 */
  title: string = "";
  /** 面包屑列表 */
  items: Array<NavBreadcrumbItem> = [];

  constructor(title: string, items: Array<NavBreadcrumbItem>) {
    this.title = title;
    this.items = items;
  }
}

/**
 * 状态
 */
interface IStoreModuleNavState {
  menu: NavMenu;
  menus: Array<MenuDTO>;
  breadcrumb: NavBreadcrumb;
  /** 左侧菜单是否收起 */
  menuCollapsed: boolean;
}

export {
  IStoreModuleNavState,
  NavMenu,
  NavBreadcrumb,
  NavBreadcrumbItem,
  NavChildMenu
};
