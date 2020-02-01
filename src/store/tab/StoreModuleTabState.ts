/**
 * 状态数据
 * @author arvin 2018-07-23
 */

import { Dictionary } from "vue-router/types/router";

/**
 * 标签页项
 */
class TabItem {
  /** 标题 */
  title: string;
  /** 路由名称 */
  name: string;
  /** 路径参数 */
  params: Dictionary<string> = {};
  /** 查询参数 */
  query: Dictionary<string | Array<string>> = {};

  constructor(
    title: string,
    name: string,
    params?: Dictionary<string>,
    query?: Dictionary<string | Array<string>>
  ) {
    this.title = title;
    this.name = name;
    if (params) {
      this.params = params;
    }
    if (query) {
      this.query = query;
    }
  }
}

/**
 * 状态
 */
interface IStoreModuleTabState {
  /** 所有标签 */
  tabs: Array<TabItem>;
  /** 当前打开的标签 */
  currentTab: TabItem;
}

export { IStoreModuleTabState, TabItem };
