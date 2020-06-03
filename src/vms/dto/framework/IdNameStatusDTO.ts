/**
 * @author arvin 2017-12-08
 */

import _ from "lodash";
import { IDTO } from "../IDTO";
import { implementStatic } from "../../decorator/index";
import { IdNameDTO } from "./IdNameDTO";
import { StatusEnum } from "../../enum/index";

/**
 * @backend hy.framework.dto.IdNameStatusDto
 */
@implementStatic<IDTO>()
class IdNameStatusDTO extends IdNameDTO {
  public static readonly className: string = IdNameStatusDTO.name;

  /** 状态 */
  public status: StatusEnum = StatusEnum.CREATED;

  constructor(
    dto: {
      id?: string | null;
      name?: string | null;
      status?: StatusEnum | null;
    } | null = {}
  ) {
    super(dto);
    if (!_.isNull(dto)) {
      const { status } = dto;
      if (!_.isNil(status)) {
        this.status = status;
      }
    }
  }
}

export { IdNameStatusDTO };
