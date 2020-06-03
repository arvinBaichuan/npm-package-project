/**
 * 资源
 * @author arvin 2017-12-11
 */

import { IKV } from "./IKV";

/** 资源类型枚举 */
enum ResourceTypeEnum {
  /** 点 */
  STATION = 5,
  FIBER_SEGMENT = 8
}

/** 资源类型 */
const RESOURCE_TYPE: {
  [K in Exclude<keyof typeof ResourceTypeEnum, "prototype">]: IKV<
    ResourceTypeEnum
  >
} = {
  STATION: {
    V: ResourceTypeEnum.STATION,
    K: "点"
  },
  FIBER_SEGMENT: {
    V: ResourceTypeEnum.FIBER_SEGMENT,
    K: "线"
  }
};

export { RESOURCE_TYPE, ResourceTypeEnum };
