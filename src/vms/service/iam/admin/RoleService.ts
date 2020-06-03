/**
 * @author arvin 2016-12-11
 */

import { IService } from "../../IService";
import { HttpClient } from "../../HttpClient";
import { SYSTEM_CTX_IAM } from "../../../const/index";
import {
  PageDTO,
  RestResultDTO,
  RoleDTO,
  ToggleStatusDTO
} from "../../../dto/index";
import { SaveRoleRO } from "../../../ro/index";
import { DTOUtil } from "../../../util/index";

/**
 * 角色
 * @backend hy.iam.admin.api.RoleService
 */
class RoleService implements IService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 分页查询角色
   * @backend hy.iam.admin.api.RoleService#findAll
   *
   * @param appId 应用ID
   * @param key
   * @param pageIndex
   * @param pageSize
   * @returns {Promise<PageDTO<RoleDTO>>}
   */
  async pageRole(
    appId: string,
    key: string,
    pageIndex: number,
    pageSize: number
  ): Promise<PageDTO<RoleDTO>> {
    const restResultDTO: RestResultDTO<
      PageDTO<RoleDTO>
    > = await this.httpClient.get<PageDTO<RoleDTO>>(
      `${SYSTEM_CTX_IAM}/admin/1.0/roles/app/${appId}?key=${this.httpClient.encode(
        key
      )}&pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
    const pageDTO: PageDTO<RoleDTO> = DTOUtil.from<PageDTO<RoleDTO>>(
      PageDTO,
      restResultDTO.data
    );
    pageDTO.data = DTOUtil.fromArray(RoleDTO, pageDTO.data);
    return pageDTO;
  }

  /**
   * 查询角色
   * @backend hy.iam.admin.api.RoleService#findDetail
   *
   * @param roleId 角色ID
   * @returns {Promise<RoleDTO>}
   */
  async getRole(roleId: string): Promise<RoleDTO> {
    const restResultDTO: RestResultDTO<RoleDTO> = await this.httpClient.get<
      RoleDTO
    >(`${SYSTEM_CTX_IAM}/admin/1.0/roles/${roleId}`);
    return DTOUtil.from(RoleDTO, restResultDTO.data);
  }

  /**
   * 添加角色
   * @backend hy.iam.admin.api.RoleService#add
   *
   * @param {SaveRoleRO} saveRoleRO
   * @returns {Promise<RoleDTO>}
   */
  async addRole(saveRoleRO: SaveRoleRO): Promise<RoleDTO> {
    const restResultDTO: RestResultDTO<RoleDTO> = await this.httpClient.post<
      RoleDTO
    >(`${SYSTEM_CTX_IAM}/admin/1.0/roles`, saveRoleRO);
    return restResultDTO.data;
  }

  /**
   * 编辑角色
   * @backend hy.iam.admin.api.RoleService#update
   *
   * @param roleId 角色ID
   * @param {SaveRoleRO} saveRoleRO
   */
  async updateRole(roleId: string, saveRoleRO: SaveRoleRO): Promise<RoleDTO> {
    const restResultDTO: RestResultDTO<RoleDTO> = await this.httpClient.post<
      RoleDTO
    >(`${SYSTEM_CTX_IAM}/admin/1.0/roles/${roleId}`, saveRoleRO);
    return restResultDTO.data;
  }

  /**
   * 启用&禁用角色
   * @backend hy.iam.admin.api.RoleService#enabled
   *
   * @param roleId 角色ID
   * @returns {Promise<ToggleStatusDTO>}
   */
  async toggleRole(roleId: string): Promise<ToggleStatusDTO> {
    const restResultDTO: RestResultDTO<
      ToggleStatusDTO
    > = await this.httpClient.post<ToggleStatusDTO>(
      `${SYSTEM_CTX_IAM}/admin/1.0/roles/${roleId}/enabled`
    );
    return DTOUtil.from(ToggleStatusDTO, restResultDTO.data);
  }

  /**
   * 删除角色
   * @backend hy.iam.admin.api.RoleService#delete
   *
   * @param roleId 角色ID
   * @returns {Promise<string>}
   */
  async removeRole(roleId: string): Promise<string> {
    const restResultDTO: RestResultDTO<string> = await this.httpClient.del<
      string
    >(`${SYSTEM_CTX_IAM}/admin/1.0/roles/${roleId}`);
    return restResultDTO.data;
  }
}

export { RoleService };
