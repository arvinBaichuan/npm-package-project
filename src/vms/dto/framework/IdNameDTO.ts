/**
 * @author arvin 2017-12-08
 */

import _ from "lodash";
import { implementStatic } from "../../decorator/index";
import { IDTO } from "../IDTO";
import { IdDTO } from "./IdDTO";

/**
 * @backend hy.framework.dto.IdNameDto
 */
@implementStatic<IDTO>()
class IdNameDTO extends IdDTO {
  public static readonly className: string = IdNameDTO.name;

  /** 名称 */
  public name: string = "";

  constructor(dto: { id?: string | null; name?: string | null } | null = {}) {
    super(dto);
    if (!_.isNull(dto)) {
      const { name } = dto;
      if (!_.isNil(name)) {
        this.name = name;
      }
    }
  }
}

export { IdNameDTO };
