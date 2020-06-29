/**
 * @author arvin 2018-01-05
 */

import { SaveRoleRO } from "../ro/index";
import { RoleTypeEnum } from "../enum/index";

/**
 * 添加&编辑角色VO
 */
export class SaveRoleVO implements SaveRoleRO {
  public id: string;
  public name: string;
  public code: string;
  public note: string;
  public appId: string;
  public admin: boolean;
  public type: RoleTypeEnum;

  constructor(
    id: string = "",
    name: string = "",
    code: string = "",
    note: string = "",
    appId: string = "",
    admin: boolean = false,
    type: RoleTypeEnum = RoleTypeEnum.MENU_ROLE
  ) {
    this.id = id;
    this.name = name;
    this.code = code;
    this.note = note;
    this.appId = appId;
    this.admin = admin;
    this.type = type;
  }
}
