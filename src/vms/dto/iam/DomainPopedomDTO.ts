/**
 * @author arvin 2017-12-16
 */

import _ from "lodash";
import { implementStatic } from "../../decorator/index";
import { IDTO } from "../IDTO";
import { IdDTO } from "../index";
import { DTOUtil } from "../../util/index";

/**
 * 领域权限
 * @backend hy.iam.admin.dto.DomainPopedomDto
 */
@implementStatic<IDTO>()
class DomainPopedomDTO extends IdDTO {
  public static readonly className: string = DomainPopedomDTO.name;

  /** 角色ID */
  roleId: string = "";
  domain: string = "";

  constructor(
    dto: {
      id?: string | null;
      roleId?: string | null;
      domain?: string | null;
    } | null = {}
  ) {
    super(dto);
    if (!_.isNull(dto)) {
      const { roleId, domain } = dto;
      if (!_.isNil(roleId)) {
        this.roleId = roleId;
      }
      if (!_.isNil(domain)) {
        this.domain = domain;
      }
    }
  }

  /**
   * @deprecated
   */
  static from(tb: DomainPopedomDTO | null): DomainPopedomDTO {
    console.warn("[DEPRECATED]: DomainPopedomDTO.from()");
    const t: DomainPopedomDTO = DTOUtil.from(IdDTO, tb) as DomainPopedomDTO;

    if (tb) {
      t.roleId = tb.roleId;
      t.domain = tb.domain;
    }

    return t;
  }

  /**
   * @deprecated
   */
  static fromArray(tbs: DomainPopedomDTO[]): DomainPopedomDTO[] {
    console.warn("[DEPRECATED]: DomainPopedomDTO.fromArray()");
    const ts: DomainPopedomDTO[] = [];

    _.forEach(tbs, tb => {
      if (tb) {
        ts.push(DTOUtil.from(DomainPopedomDTO, tb));
      }
    });

    return ts;
  }
}

export { DomainPopedomDTO };
