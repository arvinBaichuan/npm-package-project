/**
 * @author arvin 2017-03-29
 */

import _ from "lodash";
import { IdNameDTO } from "../../index";
import { implementStatic } from "../../../decorator/index";
import { IDTO } from "../../IDTO";

/**
 * @backend hy.pdnms.gis.dto.GeoAttribute
 */
@implementStatic<IDTO>()
class GeoAttributeDTO extends IdNameDTO {
  public static readonly className: string = GeoAttributeDTO.name;

  /** 表名 */
  public tableName: string = "";
  public layerName: string = "";
  /** 工程ID */
  public projectId: string = "";
  /** 工程阶段 */
  public stage: string = "";

  constructor(
    dto: {
      id?: string | null;
      name?: string | null;
      tableName?: string | null;
      layerName?: string | null;
      projectId?: string | null;
      stage?: string | null;
    } | null = {}
  ) {
    super(dto);

    if (!_.isNull(dto)) {
      const { layerName, projectId, stage, tableName } = dto;

      if (!_.isNil(layerName)) {
        this.layerName = layerName;
      }
      if (!_.isNil(projectId)) {
        this.projectId = projectId;
      }
      if (!_.isNil(stage)) {
        this.stage = stage;
      }
      if (!_.isNil(tableName)) {
        this.tableName = tableName;
      }
    }
  }
}

export { GeoAttributeDTO };
