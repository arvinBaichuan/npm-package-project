/**
 * @author lbc 2019-12-19
 */

import { RO } from "./RO";

/**
 * @backend hy.fiber.tool.model.StationMoveParam
 */
class StationMoveRO extends RO {
  public stationId: string; //站点ID
  public geomJson: string; //站点坐标
  public oldGeomJson: string; //站点原坐标
}

export { StationMoveRO };
