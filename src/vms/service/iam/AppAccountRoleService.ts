/**
 * @author arvin 2017-12-11
 */

import { SYSTEM_CTX_IAM } from "../../const/index";
import {
  AppAccountDTO,
  AppAccountRoleDTO,
  PageDTO,
  RestResultDTO
} from "../../dto/index";
import { SaveAppAccountRoleRO } from "../../ro/index";
import { DTOUtil } from "../../util/index";
import { HttpClient } from "../HttpClient";
import { IService } from "../IService";

/**
 * 应用账户角色
 * @backend hy.iam.admin.api.AppAccountRoleService
 */
class AppAccountRoleService implements IService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 分页查询应用账户角色
   * @backend hy.iam.admin.api.AppAccountRoleService#findAll
   *
   * @param appId 应用ID
   * @param pageIndex
   * @param pageSize
   * @returns {Promise<PageDTO<AppAccountRoleDTO>>}
   */
  async pageAppAccountRole(
    appId: string,
    pageIndex: number,
    pageSize: number
  ): Promise<PageDTO<AppAccountRoleDTO>> {
    const restResultDTO: RestResultDTO<
      PageDTO<AppAccountRoleDTO>
    > = await this.httpClient.get<PageDTO<AppAccountRoleDTO>>(
      `${SYSTEM_CTX_IAM}/admin/1.0/appAccountRoles/${appId}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
    const pageDTO: PageDTO<AppAccountRoleDTO> = DTOUtil.from<
      PageDTO<AppAccountRoleDTO>
    >(PageDTO, restResultDTO.data);
    pageDTO.data = DTOUtil.fromArray(AppAccountRoleDTO, pageDTO.data);
    return pageDTO;
  }

  /**
   * 分页查询应用账户角色：根据组织机构和用户名称
   * @backend hy.iam.admin.api.AppAccountRoleService#findByKey
   *
   * @param appId 应用ID
   * @param pageIndex
   * @param pageSize
   * @param orgId 组织机构ID
   * @param key
   * @returns {Promise<PageDTO<AppAccountRoleDTO>>}
   */
  async pageAppAccountRoleByOrgAndKey(
    appId: string,
    pageIndex: number,
    pageSize: number,
    orgId: string,
    key: string
  ): Promise<PageDTO<AppAccountRoleDTO>> {
    const restResultDTO: RestResultDTO<
      PageDTO<AppAccountRoleDTO>
    > = await this.httpClient.get<PageDTO<AppAccountRoleDTO>>(
      `${SYSTEM_CTX_IAM}/admin/1.0/appAccountRolesByKey/${appId}?pageIndex=${pageIndex}&pageSize=${pageSize}&key=${this.httpClient.encode(
        key
      )}&orgId=${orgId}`
    );
    const pageDTO: PageDTO<AppAccountRoleDTO> = DTOUtil.from<
      PageDTO<AppAccountRoleDTO>
    >(PageDTO, restResultDTO.data);
    pageDTO.data = DTOUtil.fromArray(AppAccountRoleDTO, pageDTO.data);
    return pageDTO;
  }

  /**
   * 根据应用账户角色ID列表分页查询应用账户
   * @backend hy.iam.admin.api.AppAccountRoleService#findAllByRoleIds
   *
   * @param roleIds
   * @param pageIndex
   * @param pageSize
   * @returns {Promise<PageDTO<AppAccountDTO>>}
   */
  async pageAppAccount(
    roleIds: Array<string>,
    pageIndex: number,
    pageSize: number
  ): Promise<PageDTO<AppAccountDTO>> {
    const restResultDTO: RestResultDTO<
      PageDTO<AppAccountDTO>
    > = await this.httpClient.post<PageDTO<AppAccountDTO>>(
      `${SYSTEM_CTX_IAM}/admin/1.0/appAccountRoles/appAccounts/roles?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      roleIds
    );
    const pageDTO: PageDTO<AppAccountDTO> = DTOUtil.from<
      PageDTO<AppAccountDTO>
    >(PageDTO, restResultDTO.data);
    pageDTO.data = DTOUtil.fromArray(AppAccountDTO, pageDTO.data);
    return pageDTO;
  }

  /**
   * 保存应用账户角色
   * @backend hy.iam.admin.api.AppAccountRoleService#save
   *
   * @param {SaveAppAccountRoleRO} saveAppAccountRoleRO
   * @returns {Promise<string>}
   */
  async updateAppAccountRole(
    saveAppAccountRoleRO: SaveAppAccountRoleRO
  ): Promise<string> {
    const restResultDTO: RestResultDTO<string> = await this.httpClient.post<
      string
    >(`${SYSTEM_CTX_IAM}/admin/1.0/appAccountRoles`, saveAppAccountRoleRO);
    return restResultDTO.data;
  }
}

export { AppAccountRoleService };
