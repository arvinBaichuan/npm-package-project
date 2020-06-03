/**
 * @author arvin 2017-12-08
 */

import _ from "lodash";
import { implementStatic } from "../../decorator/index";
import { IDTO } from "../IDTO";

/**
 * @see hy.framework.dto.IdDto
 */
@implementStatic<IDTO>()
class IdDTO {
  public static readonly className: string = IdDTO.name;
  public id: string = "";

  constructor(dto: { id?: string | null } | null = {}) {
    if (!_.isNull(dto)) {
      const { id } = dto;
      if (!_.isNil(id)) {
        this.id = id;
      }
    }
  }
}

export { IdDTO };
