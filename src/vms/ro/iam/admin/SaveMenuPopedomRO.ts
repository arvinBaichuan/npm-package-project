/**
 * @author arvin 2017-12-11
 */

import { IRO } from "../../IRO";

/**
 * 保存菜单权限
 * @backend ytd.iam.admin.param.AddMenuPopedomParam
 */
class SaveMenuPopedomRO implements IRO {
  /**
   * 角色ID
   */
  roleId: string = "";

  /**
   * 菜单ID
   */
  menuId: string = "";

  /**
   * 授权
   */
  allow: boolean = false;

  constructor(roleId: string, menuId: string, allow: boolean) {
    this.roleId = roleId;
    this.menuId = menuId;
    this.allow = allow;
  }
}

export { SaveMenuPopedomRO };
