/**
 * @author arvin 2017-12-08
 */
import { IRO } from "../IRO";

/**
 * 保存应用账户角色
 * @backend ytd.iam.admin.param.AddAppAccountRoleParam
 */
class SaveAppAccountRoleRO implements IRO {
  /**
   * 应用账户ID
   */
  appAccountId: string = "";

  /**
   * 角色ID
   */
  roleIds: Array<string> = [];

  constructor(appAccountId: string, roleIds: Array<string>) {
    this.appAccountId = appAccountId;
    this.roleIds = roleIds;
  }
}

export { SaveAppAccountRoleRO };
