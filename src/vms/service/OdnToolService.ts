/**
 * @author lbc 2019-12-10
 */
import { DTOUtil, PageDTO } from "@ytd/fe-core";
import { httpClient } from ".";
import { SYSTEM_CTX_FIBER_TOOL } from "../const";
import { FiberBindRO, StationMoveRO } from "../ro";
import { FiberToolStationDTO, FiberToolPoleDTO } from "../dto";
import { FiberStationMinDTO } from "../dto/FiberStationMinDTO";

/**
 * 操作接口
 */
export class OdnToolService {
  /**
   * 按名称模糊查询站点
   */
  public static async stationQueryByName(
    stationName = "NULL",
    pageIndex = 1,
    pageSize = 10
  ) {
    const restResultDTO: any = await httpClient.get(
      `${SYSTEM_CTX_FIBER_TOOL}/1.0/query/stationQuery/${stationName}/${pageIndex}/${pageSize}`
    );
    const pageDTO: any = DTOUtil.from(PageDTO, restResultDTO.data);
    pageDTO.data = FiberToolStationDTO.fromArray(pageDTO.data);
    return pageDTO;
  }

  /**
   * 通过输电线路查询杆塔
   * @param {string} lineName
   * @param {number} pageIndex
   * @param {number} pageSize
   * @returns {Promise<any>}
   */
  public static async poleQueryByLine(
    lineName = "",
    pageIndex = 1,
    pageSize = 10
  ) {
    const restResultDTO: any = await httpClient.get(
      `${SYSTEM_CTX_FIBER_TOOL}/1.0/query/poleQueryByLine/${lineName}/${pageIndex}/${pageSize}`
    );
    const pageDTO: any = DTOUtil.from(PageDTO, restResultDTO.data);
    pageDTO.data = FiberToolPoleDTO.fromArray(pageDTO.data);
    return pageDTO;
  }

  /**
   * 按坐标和半径范围查询站点
   */
  public static async stationQueryByGeom(
    geom = "",
    radius = 1,
    pageIndex = 1,
    pageSize = 10
  ) {
    const restResultDTO: any = await httpClient.get(
      `${SYSTEM_CTX_FIBER_TOOL}/1.0/query/stationQuery/${geom}/${radius}/${pageIndex}/${pageSize}`
    );
    const pageDTO: any = DTOUtil.from(PageDTO, restResultDTO.data);
    pageDTO.data = FiberToolStationDTO.fromArray(pageDTO.data);
    return pageDTO;
  }

  /**
   * 查询路由上的节点信息
   */
  public static async resNodeQuery(
    nodeId = "",
    nodeType = "",
    pageIndex = 1,
    pageSize = 10
  ) {
    const restResultDTO: any = await httpClient.get(
      `${SYSTEM_CTX_FIBER_TOOL}/1.0/query/resNodeQuery/${nodeId}/${nodeType}/${pageIndex}/${pageSize}`
    );
    const pageDTO: any = DTOUtil.from(PageDTO, restResultDTO.data);
    pageDTO.data = FiberBindRO.fromArray(pageDTO.data);
    return pageDTO;
  }

  /**
   * 查询路由上的节点信息(确定两边node)
   */
  public static async resNodeQuery2Side(
    nodeId1 = "",
    nodeType1 = "",
    nodeId2 = "",
    nodeType2 = "",
    pageIndex = 1,
    pageSize = 10
  ) {
    const restResultDTO: any = await httpClient.get(
      `${SYSTEM_CTX_FIBER_TOOL}/1.0/query/resNodeQuery/${nodeId1}/${nodeType1}/${nodeId2}/${nodeType2}/${pageIndex}/${pageSize}`
    );
    const pageDTO: any = DTOUtil.from(PageDTO, restResultDTO.data);
    pageDTO.data = FiberBindRO.fromArray(pageDTO.data);
    return pageDTO;
  }

  /**
   * 资源绑定：站点
   */
  public static stationDoBind(param: any) {
    return httpClient.post(
      `${SYSTEM_CTX_FIBER_TOOL}/1.0/bind/stationDoBind`,
      param
    );
  }

  /**
   * 资源取消绑定：站点
   * 解绑的话，会将输电线起止端关联的站点和中间节点关联的杆塔、关联的光缆段 都取消
   */
  public static stationUndoBind(param: FiberBindRO) {
    return httpClient.post(
      `${SYSTEM_CTX_FIBER_TOOL}/1.0/bind/stationUndoBind`,
      param
    );
  }

  /**
   * 资源绑定：杆塔
   */
  public static poleDoBind(param: FiberBindRO) {
    return httpClient.post(
      `${SYSTEM_CTX_FIBER_TOOL}/1.0/bind/poleDoBind`,
      param
    );
  }

  /**
   * 资源取消绑定：杆塔
   */
  public static poleUndoBind(param: FiberBindRO) {
    return httpClient.post(
      `${SYSTEM_CTX_FIBER_TOOL}/1.0/bind/poleUndoBind`,
      param
    );
  }

  /**
   * 按对端资源查询站点
   * @param {string} resId
   * @param {string} nodeType
   * @param {number} pageIndex
   * @param {number} pageSize
   * @returns {Promise<any>}
   */
  public static async stationQueryByFiber(
    resId = "",
    resType = "",
    pageIndex = 1,
    pageSize = 10
  ) {
    const restResultDTO: any = await httpClient.get(
      `${SYSTEM_CTX_FIBER_TOOL}/1.0/query/stationQueryByFiber/${resId}/${resType}/${pageIndex}/${pageSize}`
    );
    const pageDTO: any = DTOUtil.from(PageDTO, restResultDTO.data);
    pageDTO.data = FiberStationMinDTO.fromArray(pageDTO.data);
    return pageDTO;
  }

  /**
   * 按名称模糊匹配站点2
   * @param {string} stationName
   * @param {string} coordinate
   * @param {number} pageIndex
   * @param {number} pageSize
   * @returns {Promise<any>}
   */
  public static async stationQueryByName2(
    stationName = "NULL",
    coordinate = false,
    pageIndex = 1,
    pageSize = 10
  ) {
    const restResultDTO: any = await httpClient.get(
      `${SYSTEM_CTX_FIBER_TOOL}/1.0/query/stationQuery/name/${stationName}/${coordinate}/${pageIndex}/${pageSize}`
    );
    const pageDTO: any = DTOUtil.from(PageDTO, restResultDTO.data);
    pageDTO.data = FiberToolStationDTO.fromArray(pageDTO.data);
    return pageDTO;
  }

  /**
   * 站点坐标保存
   * @param {StationMoveRO} param
   * @returns {Promise<RestResultDTO<any>>}
   */
  public static stationMove(param: StationMoveRO) {
    return httpClient.post(
      `${SYSTEM_CTX_FIBER_TOOL}/1.0/move/stationMove`,
      param
    );
  }
}
