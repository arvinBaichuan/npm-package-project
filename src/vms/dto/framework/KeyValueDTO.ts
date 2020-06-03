/**
 * @author arvin 2017-12-08
 */

import _ from "lodash";
import { implementStatic } from "../../decorator/index";
import { IDTO } from "../IDTO";

/**
 * @backend hy.framework.vo.KeyValue
 */
@implementStatic<IDTO>()
class KeyValueDTO<K, V> {
  public static readonly className: string = KeyValueDTO.name;

  public k: K = ("" as unknown) as K;
  public v: V = ("" as unknown) as V;

  constructor(
    dto: {
      k?: K | null;
      v?: V | null;
    } | null = {}
  ) {
    if (!_.isNull(dto)) {
      const { k, v } = dto;
      if (!_.isNil(k)) {
        this.k = k;
      }
      if (!_.isNil(v)) {
        this.v = v;
      }
    }
  }
}

export { KeyValueDTO };
