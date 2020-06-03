/**
 * @author arvin 2017-06-20
 */

import { NameCodeRO } from "./NameCodeRO";

/**
 * @backend ytd.framework.param.NameCodeNoteParam
 */
class NameCodeNoteRO extends NameCodeRO {
  public note: string = "";

  constructor(name: string, code: string, note: string) {
    super(name, code);
    this.note = note;
  }
}

export { NameCodeNoteRO };
