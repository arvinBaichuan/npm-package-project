/**
 * @author arvin 2017-12-08
 */

import _ from "lodash";
import { IdDTO } from "../index";
import { implementStatic } from "../../decorator/index";
import { IDTO } from "../IDTO";

/**
 * 扩展属性
 * @backend hy.iam.admin.dto.ExtMetaDto
 */
@implementStatic<IDTO>()
class ExtMetaDTO extends IdDTO {
  public static readonly className: string = ExtMetaDTO.name;

  appId: string = "";
  property: string = "";
  des: string = "";
  type: number = 0;
  empty: boolean = false;

  constructor(
    dto: {
      id?: string | null;
      appId?: string | null;
      property?: string | null;
      des?: string | null;
      type?: number | null;
      empty?: boolean | null;
    } | null = {}
  ) {
    super(dto);

    if (!_.isNull(dto)) {
      const { type, appId, des, empty, property } = dto;

      if (!_.isNil(type)) {
        this.type = type;
      }
      if (!_.isNil(appId)) {
        this.appId = appId;
      }
      if (!_.isNil(des)) {
        this.des = des;
      }
      if (!_.isNil(empty)) {
        this.empty = empty;
      }
      if (!_.isNil(property)) {
        this.property = property;
      }
    }
  }
}

export { ExtMetaDTO };
