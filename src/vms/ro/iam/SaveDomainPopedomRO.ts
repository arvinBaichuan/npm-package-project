/**
 * @author arvin 2017-12-16
 */

import { IRO } from "../IRO";

/**
 * 保存领域权限
 * @backend ytd.iam.admin.param.AddDomainPopedomParam
 */
class SaveDomainPopedomRO implements IRO {
  /**
   * 角色ID
   */
  roleId: string = "";

  /**
   */
  domain: string = "";

  constructor(roleId: string, domain: string) {
    this.roleId = roleId;
    this.domain = domain;
  }
}

export { SaveDomainPopedomRO };
