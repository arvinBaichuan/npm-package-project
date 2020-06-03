/**
 * @author arvin 2018-09-28
 */

import { IRO } from "../../IRO";

/**
 * 更新GeoJSON
 * @backend ytd.pdnms.gis.dto.GeoInfo
 */
class UpdateGeomRO implements IRO {
  id: string = "";
  tableName: string = "";
  /** geometry 属性的字符串形式 */
  geom: string = "";
}

export { UpdateGeomRO };
