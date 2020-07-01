/**
 * @author arvin 2017-12-11
 */

import _ from "lodash";
import { implementStatic } from "../../decorator/index";
import { RoleTypeEnum, StatusEnum } from "../../enum/index";
import { IDTO } from "../IDTO";
import { IdNameCodeNoteStatusDTO } from "../index";

/**
 * 角色
 * @backend hy.iam.admin.dto.RoleDto
 */
@implementStatic<IDTO>()
class RoleDTO extends IdNameCodeNoteStatusDTO {
  public static readonly className: string = RoleDTO.name;

  /** 应用ID */
  public appId: string = "";
  /** 是否是管理员角色 */
  public admin: boolean = false;
  /** 角色类型 */
  public type: RoleTypeEnum = RoleTypeEnum.MENU_ROLE;

  constructor(
    dto: {
      id?: string | null;
      name?: string | null;
      code?: string | null;
      note?: string | null;
      status?: StatusEnum | null;
      appId?: string | null;
      admin?: boolean | null;
      type?: RoleTypeEnum | null;
    } | null = {}
  ) {
    super(dto);
    if (!_.isNull(dto)) {
      const { type, appId, admin } = dto;
      if (!_.isNil(type)) {
        this.type = type;
      }
      if (!_.isNil(appId)) {
        this.appId = appId;
      }
      if (!_.isNil(admin)) {
        this.admin = admin;
      }
    }
  }
}

export { RoleDTO };
