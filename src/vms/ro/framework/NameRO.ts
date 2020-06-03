/**
 * @author arvin 2017-12-11
 */

import { IRO } from "../IRO";

/**
 * @backend ytd.framework.param.NameParam
 */
class NameRO implements IRO {
  public name: string = "";

  constructor(name: string) {
    this.name = name;
  }
}

export { NameRO };
