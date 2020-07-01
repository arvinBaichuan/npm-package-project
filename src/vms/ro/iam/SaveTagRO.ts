/**
 * @author arvin 2018-05-17
 */

/**
 * 保存标签
 * @backend ytd.iam.admin.param.TagParam
 */
class SaveTagRO {
  /**
   * 标签
   */
  tag: string = "";

  constructor(tag: string) {
    this.tag = tag;
  }
}

export { SaveTagRO };
