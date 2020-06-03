/**
 * @author arvin 2018-02-23
 */

import _ from "lodash";
import { implementStatic } from "../../decorator/index";
import { DTOUtil } from "../../util/index";
import { IDTO } from "../IDTO";

/**
 * @backend hy.framework.vo.ChildValue
 */
@implementStatic<IDTO>()
class ChildValueDTO<V = string, F = string> {
  public static readonly className: string = ChildValueDTO.name;

  public value: V = ("" as any) as V;
  public fullValue: F = ("" as any) as F;
  public child: Array<ChildValueDTO<V, F>> = [];

  constructor(
    dto: {
      value?: V | null;
      fullValue?: F | null;
      child?: Array<ChildValueDTO<V, F>> | null;
    } | null = {}
  ) {
    if (!_.isNull(dto)) {
      const { value, child, fullValue } = dto;

      if (!_.isNil(value)) {
        this.value = value;
      }
      if (!_.isNil(fullValue)) {
        this.fullValue = fullValue;
      }
      if (!_.isNil(child)) {
        this.child = DTOUtil.fromArray<ChildValueDTO<V, F>>(
          ChildValueDTO,
          child
        );
      }
    }
  }
}

export { ChildValueDTO };
