/**
 * @author arvin 2018-03-13
 */

/**
 * 右键菜单
 */
export interface IHyContextMenu {
  /** 菜单名称 */
  name?: string;
  /** 菜单编码 */
  code?: string;
  /** 菜单图标 */
  icon?: string;
  /** 是否是分割线 */
  divide?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 菜单回调方法 */
  handler?: (...args: Array<any>) => void; // tslint:disable-line:no-any
}
