/**
 * @author arvin 2016-11-17
 */

import { DTOUtil } from "../../util/index";
import { IService } from "../IService";
import { HttpClient } from "../HttpClient";
import { SYSTEM_CTX_IAM } from "../../const/index";
import { MenuDTO, MenuPopedomDTO, RestResultDTO } from "../../dto/index";
import { SaveMenuPopedomRO } from "../../ro/index";

/**
 * 菜单权限
 * @backend hy.iam.admin.api.MenuPopedomService
 */
class MenuPopedomService implements IService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 保存菜单权限
   * @backend hy.iam.admin.api.MenuPopedomService#save
   *
   * @param {SaveDomainPopedomRO} saveMenuPopedomRO
   */
  async updateMenuPopedom(
    saveMenuPopedomRO: SaveMenuPopedomRO
  ): Promise<MenuPopedomDTO | null> {
    const restResultDTO: RestResultDTO<
      MenuPopedomDTO
    > = await this.httpClient.post<MenuPopedomDTO>(
      `${SYSTEM_CTX_IAM}/admin/1.0/menuPopedoms`,
      saveMenuPopedomRO
    );
    return DTOUtil.from(MenuPopedomDTO, restResultDTO.data);
  }

  /**
   * 根据角色查询菜单权限树
   * @backend hy.iam.admin.api.MenuPopedomService#findAll
   *
   * @param roleId 角色ID
   * @returns {Promise<MenuPopedomDTO[]>}
   */
  async listMenuPopedomByRoleId(roleId: string): Promise<MenuPopedomDTO[]> {
    const restResultDTO: RestResultDTO<
      MenuPopedomDTO[]
    > = await this.httpClient.get<MenuPopedomDTO[]>(
      `${SYSTEM_CTX_IAM}/admin/1.0/menuPopedoms/${roleId}`
    );
    return DTOUtil.fromArray(MenuPopedomDTO, restResultDTO.data);
  }

  /**
   * 根据应用ID和应用账户ID查询菜单
   * @backend hy.iam.admin.api.MenuPopedomService#findMenu2
   *
   * @param appId 应用ID
   * @param appAccountId 应用账户ID
   * @returns {Promise<MenuDTO[]>}
   */
  async listMenu(appId: string, appAccountId: string): Promise<MenuDTO[]> {
    const restResultDTO: RestResultDTO<MenuDTO[]> = await this.httpClient.get<
      MenuDTO[]
    >(
      `${SYSTEM_CTX_IAM}/admin/1.0/menuPopedoms/app/${appId}/appAccount/${appAccountId}`
    );
    return DTOUtil.fromArray(MenuDTO, restResultDTO.data);
  }
}

export { MenuPopedomService };
