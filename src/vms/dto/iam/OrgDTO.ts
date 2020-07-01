/**
 * @author arvin 2018-09-10
 */

import { StatusEnum } from "../../enum/index";
import _ from "lodash";
import { implementStatic } from "../../decorator/index";
import { IdNameCodeStatusDTO } from "../framework/IdNameCodeStatusDTO";
import { IDTO } from "../IDTO";

/**
 * 组织机构
 * @backend hy.iam.admin.dto.OrgDto
 */
@implementStatic<IDTO>()
class OrgDTO extends IdNameCodeStatusDTO {
  public static readonly className: string = OrgDTO.name;

  childs: Array<OrgDTO> = [];

  constructor(
    dto: {
      id?: string | null;
      name?: string | null;
      code?: string | null;
      status?: StatusEnum | null;
      childs?: Array<OrgDTO> | null;
    } | null = {}
  ) {
    super(dto);

    if (!_.isNull(dto)) {
      const { childs } = dto;

      if (!_.isNil(childs)) {
        this.childs = childs;
      }
    }
  }
}

export { OrgDTO };
