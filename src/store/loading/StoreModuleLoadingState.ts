/**
 * 状态数据
 * @author arvin 2019-01-21
 */

/**
 * 状态
 */
interface IStoreModuleLoadingState {
  /** 是否显示加载提示 */
  visible: boolean;
  /** 提示信息 */
  message: string;
}

export { IStoreModuleLoadingState };
