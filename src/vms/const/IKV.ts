/*
 * 字典常量类型接口
 */
export interface IKV<T> {
  /** 名称标识 */
  K: string;
  /** 数据 */
  V: T;
}
