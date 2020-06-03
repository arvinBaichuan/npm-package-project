/**
 * @author arvin 2017-12-11
 */

import _ from "lodash";
import { implementStatic } from "../../../decorator/index";
import { DTOUtil } from "../../../util/index";
import { IDTO } from "../../IDTO";
import { AppAccountDTO } from "./AppAccountDTO";
import { RoleDTO } from "./RoleDTO";

/**
 * 应用账户角色
 * @backend hy.iam.admin.dto.AppAccountRoleDto
 */
@implementStatic<IDTO>()
class AppAccountRoleDTO {
  public static readonly className: string = AppAccountRoleDTO.name;

  /** 角色列表 */
  role: Array<RoleDTO> = [];
  /** 应用账户 */
  appAccount: AppAccountDTO = new AppAccountDTO();

  constructor(
    dto: {
      role?: Array<RoleDTO> | null;
      appAccount?: AppAccountDTO | null;
    } | null = {}
  ) {
    if (!_.isNull(dto)) {
      const { role, appAccount } = dto;
      if (!_.isNil(role)) {
        this.role = DTOUtil.fromArray(RoleDTO, role);
      }
      if (!_.isNil(appAccount)) {
        this.appAccount = DTOUtil.from(AppAccountDTO, appAccount);
      }
    }
  }

  /**
   * @deprecated
   */
  static from(tb: AppAccountRoleDTO | null): AppAccountRoleDTO {
    console.warn("[DEPRECATED]: AppAccountRoleDTO.from()");
    const t: AppAccountRoleDTO = new AppAccountRoleDTO();

    if (tb) {
      t.role = DTOUtil.fromArray(RoleDTO, tb.role);
      t.appAccount = DTOUtil.from(AppAccountDTO, tb.appAccount);
    }

    return t;
  }

  /**
   * @deprecated
   */
  static fromArray(tbs: AppAccountRoleDTO[]): AppAccountRoleDTO[] {
    console.warn("[DEPRECATED]: AppAccountRoleDTO.fromArray()");
    const ts: AppAccountRoleDTO[] = [];

    _.forEach(tbs, tb => {
      if (tb) {
        ts.push(DTOUtil.from(AppAccountRoleDTO, tb));
      }
    });

    return ts;
  }
}

export { AppAccountRoleDTO };
