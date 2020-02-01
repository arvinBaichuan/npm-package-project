import { Store } from "vuex";

/**
 * 安装配置选项
 */
export interface IInstallOption {
  /**
   * 部分组件需要依赖vuex，需要传入store
   */
  store?: Store<any>; // tslint:disable-line:no-any
}
