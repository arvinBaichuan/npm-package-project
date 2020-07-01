/**
 * @author arvin 2017-12-11
 */

import { NameCodeNoteRO } from "../index";
import { RoleTypeEnum } from "../../enum/index";

/**
 * 保存角色
 * @backend ytd.iam.admin.param.AddRoleParam
 */
class SaveRoleRO extends NameCodeNoteRO {
  /**
   * 应用ID
   */
  appId: string = "";

  /**
   * 是否是系统角色
   */
  admin: boolean = false;

  /**
   * 角色类型
   */
  type: RoleTypeEnum = RoleTypeEnum.MENU_ROLE;

  constructor(
    name: string,
    code: string,
    note: string,
    appId: string,
    admin: boolean,
    type: RoleTypeEnum
  ) {
    super(name, code, note);
    this.appId = appId;
    this.admin = admin;
    this.type = type;
  }
}

export { SaveRoleRO };
