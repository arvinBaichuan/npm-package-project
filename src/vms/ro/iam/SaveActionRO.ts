/**
 * @author arvin 2017-12-16
 */

import { NameCodeNoteRO } from "../index";

/**
 * 保存操作
 * @backend ytd.iam.admin.param.AddActionParam
 */
class SaveActionRO extends NameCodeNoteRO {
  /**
   * 序号
   */
  order: number = 0;

  /**
   * 资源类型
   */
  resourceType: number = 0;

  /**
   * 应用ID
   */
  appId: string = "";

  constructor(
    name: string,
    code: string,
    note: string,
    order: number,
    resourceType: number,
    appId: string
  ) {
    super(name, code, note);
    this.order = order;
    this.resourceType = resourceType;
    this.appId = appId;
  }
}

export { SaveActionRO };
