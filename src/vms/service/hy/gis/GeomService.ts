/**
 * @author arvin 2018-06-19
 */

import { Geometry } from "geojson";
import { SYSTEM_CTX_GIS } from "../../../const/index";
import { GeoAttributeDTO, IdDTO, PageDTO, RestResultDTO } from "../../../dto/index";
import { GeomRO, UpdateGeomRO } from "../../../ro/index";
import { DTOUtil } from "../../../util/index";
import { HttpClient } from "../../HttpClient";
import { IService } from "../../IService";

/**
 * GIS
 * @backend hy.pdnms.gis.api.GeomService
 */
class GeomService implements IService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 根据关键字查询资源
   * @backend hy.pdnms.gis.api.GeomService#query
   * @param pageIndex
   * @param pageSize
   * @param app 应用编码
   * @param key 关键字
   * @param isProject 是否是'配网工程项目'
   */
  async query(
    pageIndex: number,
    pageSize: number,
    app: string,
    key: string,
    isProject: number = 0
  ): Promise<PageDTO<GeoAttributeDTO>> {
    const {
      data
    }: RestResultDTO<PageDTO<GeoAttributeDTO>> = await this.httpClient.get<
      PageDTO<GeoAttributeDTO>
    >(
      `${SYSTEM_CTX_GIS}/1.0/geom/query?app=${app}&name=${this.httpClient.encode(
        key
      )}&isProject=${isProject}&pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
    const pageDTO: PageDTO<GeoAttributeDTO> = DTOUtil.from<
      PageDTO<GeoAttributeDTO>
    >(PageDTO, data);
    pageDTO.data = DTOUtil.fromArray(GeoAttributeDTO, (data as any).dataList);
    return pageDTO;
  }

  /**
   * 查询GeoJSON
   * @backend hy.pdnms.gis.api.GeomService#location
   *
   * @param id 资源ID
   * @param tableName 表名
   */
  async getGeoJSON(id: string, tableName: string): Promise<Geometry> {
    const { data }: RestResultDTO<Geometry> = await this.httpClient.post<
      Geometry
    >(`${SYSTEM_CTX_GIS}/1.0/geom/location?id=${id}&tableName=${tableName}`);

    return data;
  }

  /**
   * 添加GeoJSON
   * @backend hy.pdnms.gis.api.GeomService#insert
   *
   * @param geomRO
   */
  async addGeoJSON(geomRO: GeomRO): Promise<IdDTO> {
    const { data }: RestResultDTO<IdDTO> = await this.httpClient.post<IdDTO>(
      `${SYSTEM_CTX_GIS}/1.0/geom/insert`,
      geomRO
    );

    return DTOUtil.from(IdDTO, data);
  }

  /**
   * 编辑GeoJSON
   * @backend hy.pdnms.gis.api.GeomService#update
   *
   * @param geomRO
   */
  async updateGeoJSON(geomRO: GeomRO): Promise<IdDTO> {
    const { data }: RestResultDTO<IdDTO> = await this.httpClient.post<IdDTO>(
      `${SYSTEM_CTX_GIS}/1.0/geom/update`,
      geomRO
    );

    return DTOUtil.from(IdDTO, data);
  }

  /**
   * 编辑GeoJSON坐标
   * @backend hy.pdnms.gis.api.GeomService#updateGeom
   *
   * @param updateGeomRO
   */
  async updateGeometry(updateGeomRO: UpdateGeomRO): Promise<IdDTO> {
    const { data }: RestResultDTO<IdDTO> = await this.httpClient.post<IdDTO>(
      `${SYSTEM_CTX_GIS}/1.0/geom/updateGeom`,
      updateGeomRO
    );

    return DTOUtil.from(IdDTO, data);
  }

  /**
   * 删除GeoJSON
   * @backend hy.pdnms.gis.api.GeomService#delete
   *
   * @param id
   * @param tableName
   */
  async deleteGeoJSON(id: string, tableName: string): Promise<IdDTO> {
    const { data }: RestResultDTO<IdDTO> = await this.httpClient.del<IdDTO>(
      `${SYSTEM_CTX_GIS}/1.0/geom/${id}?tableName=${tableName}`
    );

    return DTOUtil.from(IdDTO, data);
  }
}

export { GeomService };
