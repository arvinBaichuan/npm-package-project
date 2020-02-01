/**
 * @author lbc 2019-12-10
 */

import { RO } from "./RO";

/**
 * @backend ytd.framework.param.NameParam
 */
class NamedRO extends RO {
  id: string = "";
  name: string = "";
  type: string = "";
  geom: string = "";
}

export { NamedRO };
