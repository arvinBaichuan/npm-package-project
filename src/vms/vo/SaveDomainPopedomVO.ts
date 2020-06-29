/**
 * @author arvin 2018-01-03
 */

import { RoleDTO } from "../dto/index";

/**
 * 添加&编辑领域权限VO
 */
export class SaveDomainPopedomVO {
  public id: string;
  public role: RoleDTO;
  public domain: string;

  constructor(
    id: string = "",
    role: RoleDTO = new RoleDTO(),
    domain: string = ""
  ) {
    this.id = id;
    this.role = role;
    this.domain = domain;
  }
}
