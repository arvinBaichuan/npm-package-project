/**
 * @author arvin 2017-12-11
 */

import { NameRO } from "./NameRO";

/**
 * @backend ytd.framework.param.NameCodeParam
 */
class NameCodeRO extends NameRO {
  public code: string = "";

  constructor(name: string, code: string) {
    super(name);
    this.code = code;
  }
}

export { NameCodeRO };
