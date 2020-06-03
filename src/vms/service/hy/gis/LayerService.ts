/**
 * @author arvin 2017-12-16
 */

import { FeatureCollection } from "geojson";
import { SYSTEM_CTX_GIS } from "../../../const/index";
import { LayerDTO, RestResultDTO } from "../../../dto/index";
import { DTOUtil } from "../../../util/index";
import { HttpClient } from "../../HttpClient";
import { IService } from "../../IService";

/**
 * 图层
 * @backend hy.pdnms.gis.api.LayerService
 */
class LayerService implements IService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 查询业务图层数据
   * @backend hy.pdnms.gis.api.LayerService#geoJson
   *
   * @param layerId 图层ID
   * @param box 坐标范围
   * @param zoom 缩放比例
   */
  async getBusinessLayerData(
    layerId: string | number,
    box: string,
    zoom: number
  ): Promise<FeatureCollection> {
    const {
      data
    }: RestResultDTO<FeatureCollection> = await this.httpClient.get<
      FeatureCollection
    >(`${SYSTEM_CTX_GIS}/1.0/layers/${layerId}?box=${box}&zoom=${zoom}`);
    return data;
  }

  /**
   * 查询背景图层列表
   *
   * @backend hy.pdnms.gis.api.LayerService#background
   */
  async listBackgroundLayer(): Promise<Array<LayerDTO>> {
    const { data }: RestResultDTO<Array<LayerDTO>> = await this.httpClient.get<
      Array<LayerDTO>
    >(`${SYSTEM_CTX_GIS}/1.0/layers/background`);
    return DTOUtil.fromArray(LayerDTO, data);
  }

  /**
   * 查询业务图层列表
   *
   * @backend hy.pdnms.gis.api.LayerService#operation
   */
  async listBusinessLayer(): Promise<Array<LayerDTO>> {
    const { data }: RestResultDTO<Array<LayerDTO>> = await this.httpClient.get<
      Array<LayerDTO>
    >(`${SYSTEM_CTX_GIS}/1.0/layers/operation`);
    return DTOUtil.fromArray(LayerDTO, data);
  }

  /**
   * 查询背景图层列表
   *
   * @backend hy.pdnms.gis.api.LayerService#background
   */
  async listBackgroundLayerApp(app: string): Promise<Array<LayerDTO>> {
    const { data }: RestResultDTO<Array<LayerDTO>> = await this.httpClient.get<
      Array<LayerDTO>
    >(`${SYSTEM_CTX_GIS}/1.0/layers/background/app?app=${app}`);
    return DTOUtil.fromArray(LayerDTO, data);
  }

  /**
   * 查询业务图层列表
   *
   * @backend hy.pdnms.gis.api.LayerService#operation
   */
  async listBusinessLayerApp(app: string): Promise<Array<LayerDTO>> {
    const { data }: RestResultDTO<Array<LayerDTO>> = await this.httpClient.get<
      Array<LayerDTO>
    >(`${SYSTEM_CTX_GIS}/1.0/layers/operation/app?app=${app}`);
    return DTOUtil.fromArray(LayerDTO, data);
  }
}

export { LayerService };
