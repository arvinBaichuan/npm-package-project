/**
 * @author arvin 2017-12-16
 */

import _ from "lodash";
import { IdDTO } from "../index";
import { implementStatic } from "../../decorator/index";
import { DTOUtil } from "../../util/index";
import { IDTO } from "../IDTO";
import { ActionDTO } from "./ActionDTO";

/**
 * 操作权限
 * @backend hy.iam.admin.dto.ActionPopedomDto
 */
@implementStatic<IDTO>()
class ActionPopedomDTO extends IdDTO {
  public static readonly className: string = ActionPopedomDTO.name;

  /** 角色ID */
  roleId: string = "";
  /** 操作 */
  action: ActionDTO = new ActionDTO();
  /** 授权 */
  allow: boolean = false;

  constructor(
    dto: {
      id?: string | null;
      roleId?: string | null;
      action?: ActionDTO | null;
      allow?: boolean | null;
    } | null = {}
  ) {
    super(dto);
    if (!_.isNull(dto)) {
      const { roleId, action, allow } = dto;
      if (!_.isNil(roleId)) {
        this.roleId = roleId;
      }
      if (!_.isNil(action)) {
        this.action = DTOUtil.from(ActionDTO, action);
      }
      if (!_.isNil(allow)) {
        this.allow = allow;
      }
    }
  }

  /**
   * @deprecated
   */
  static from(tb: ActionPopedomDTO | null): ActionPopedomDTO {
    console.warn("[DEPRECATED]: ActionPopedomDTO.from()");
    const t: ActionPopedomDTO = DTOUtil.from(IdDTO, tb) as ActionPopedomDTO;

    if (tb) {
      t.roleId = tb.roleId;
      t.action = DTOUtil.from(ActionDTO, tb.action);
      t.allow = tb.allow;
    }

    return t;
  }

  /**
   * @deprecated
   */
  static fromArray(tbs: ActionPopedomDTO[]): ActionPopedomDTO[] {
    console.warn("[DEPRECATED]: ActionPopedomDTO.fromArray()");
    const ts: ActionPopedomDTO[] = [];

    _.forEach(tbs, tb => {
      if (tb) {
        ts.push(DTOUtil.from(ActionPopedomDTO, tb));
      }
    });

    return ts;
  }
}

export { ActionPopedomDTO };
