/**
 * @author arvin 2017-12-11
 */

import { StatusEnum } from "../../enum/index";
import { NameRO } from "./NameRO";

/**
 *
 */
class NameStatusRO extends NameRO {
  /**
   * 状态
   */
  public status: StatusEnum = StatusEnum.CREATED;

  constructor(name: string, status: number) {
    super(name);
    this.status = status;
  }
}

export { NameStatusRO };
