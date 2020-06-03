/**
 * @author arvin 2017-12-16
 */

import _ from "lodash";
import { implementStatic } from "../../../decorator/index";
import { StatusEnum } from "../../../enum/index";
import { IDTO } from "../../IDTO";
import { IdNameCodeNoteStatusDTO } from "../../index";

/**
 * 操作
 * @backend hy.iam.admin.dto.ActionDto
 */
@implementStatic<IDTO>()
class ActionDTO extends IdNameCodeNoteStatusDTO {
  public static readonly className: string = ActionDTO.name;

  /** 序号 */
  public order: number = 0;
  /** 资源类型 */
  public resourceType: number = 0;
  /** 应用ID */
  public appId: string = "";

  constructor(
    dto: {
      id?: string | null;
      name?: string | null;
      code?: string | null;
      note?: string | null;
      status?: StatusEnum | null;
      order?: number | null;
      resourceType?: number | null;
      appId?: string | null;
    } | null = {}
  ) {
    super(dto);
    if (!_.isNull(dto)) {
      const { order, resourceType, appId } = dto;
      if (!_.isNil(order)) {
        this.order = order;
      }
      if (!_.isNil(resourceType)) {
        this.resourceType = resourceType;
      }
      if (!_.isNil(appId)) {
        this.appId = appId;
      }
    }
  }
}

export { ActionDTO };
