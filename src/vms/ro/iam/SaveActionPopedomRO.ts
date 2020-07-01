/**
 * @author arvin 2017-12-16
 */

import { IRO } from "../IRO";

/**
 * 保存操作权限
 * @backend ytd.iam.admin.param.AddActionPopedomParam
 */
class SaveActionPopedomRO implements IRO {
  /**
   * 角色ID
   */
  roleId: string = "";

  /**
   * 操作ID
   */
  actionId: string = "";

  /**
   * 授权
   */
  allow: boolean = false;

  constructor(roleId: string, actionId: string, allow: boolean) {
    this.roleId = roleId;
    this.actionId = actionId;
    this.allow = allow;
  }
}

export { SaveActionPopedomRO };
