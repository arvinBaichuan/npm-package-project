/**
 * @author arvin 2017-12-11
 */

import { NameCodeNoteRO } from "../index";

/**
 * 保存菜单
 * @backend ytd.iam.admin.param.AddMenuParam
 */
class SaveMenuRO extends NameCodeNoteRO {
  /**
   * URL
   */
  url: string = "";

  /**
   * 上级ID
   */
  parentId: string = "";

  /**
   * 序号
   */
  order: number = 0;

  /**
   * 应用ID
   */
  appId: string = "";

  constructor(
    name: string,
    code: string,
    note: string,
    url: string,
    parentId: string,
    order: number,
    appId: string
  ) {
    super(name, code, note);
    this.url = url;
    this.parentId = parentId;
    this.order = order;
    this.appId = appId;
  }
}

export { SaveMenuRO };
