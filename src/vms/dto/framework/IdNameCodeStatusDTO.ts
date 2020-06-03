/**
 * @author arvin 2017-12-08
 */

import _ from "lodash";
import { IDTO } from "../IDTO";
import { implementStatic } from "../../decorator/index";
import { IdNameCodeDTO } from "./IdNameCodeDTO";
import { StatusEnum } from "../../enum/index";

/**
 * @backend hy.framework.dto.IdNameCodeStatusDto
 */
@implementStatic<IDTO>()
class IdNameCodeStatusDTO extends IdNameCodeDTO {
  public static readonly className: string = IdNameCodeStatusDTO.name;

  /** 状态 */
  public status: StatusEnum = StatusEnum.CREATED;

  constructor(
    dto: {
      id?: string | null;
      name?: string | null;
      code?: string | null;
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

export { IdNameCodeStatusDTO };
