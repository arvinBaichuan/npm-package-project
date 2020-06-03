/**
 * @author arvin 2017-12-08
 */

import _ from "lodash";
import { IDTO } from "../IDTO";
import { implementStatic } from "../../decorator/index";
import { IdNameDTO } from "./IdNameDTO";

/**
 * @backend hy.framework.dto.IdNameCodeDto
 */
@implementStatic<IDTO>()
class IdNameCodeDTO extends IdNameDTO {
  public static readonly className: string = IdNameCodeDTO.name;

  /** 编码 */
  public code: string = "";

  constructor(
    dto: {
      id?: string | null;
      name?: string | null;
      code?: string | null;
    } | null = {}
  ) {
    super(dto);
    if (!_.isNull(dto)) {
      const { code } = dto;
      if (!_.isNil(code)) {
        this.code = code;
      }
    }
  }
}

export { IdNameCodeDTO };
