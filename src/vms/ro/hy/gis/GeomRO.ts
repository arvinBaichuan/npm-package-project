/**
 * @author arvin 2018-09-28
 */

import { IRO } from "../../IRO";

/**
 *
 * @backend ytd.pdnms.gis.param.GeomParam
 */
class GeomRO implements IRO {
  id: string = "";
  name: string = "";
  tableName: string = "";
  geom: string = "";
  resourceId: string = "";
  resourceType: number = 0;
  minzoom: number = 0;
  maxzoom: number = 0;
  scene: number = 0;
  styles: Array<GemoRO.Item> = [];
}

namespace GemoRO {
  export class Item {
    key: string = "";
    value: string = "";
  }
}

export { GeomRO };
