/**
 * @author arvin 2017-12-11
 */

import { DTOUtil } from "../../util/index";
import { IService } from "../IService";
import { HttpClient } from "../HttpClient";
import { SYSTEM_CTX_IAM } from "../../const/index";
import { MenuDTO, RestResultDTO, ToggleStatusDTO } from "../../dto/index";
import { SaveMenuRO } from "../../ro/index";

/**
 * 菜单
 * @backend hy.iam.admin.api.MenuService
 */
class MenuService implements IService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 查询菜单树
   * @backend hy.iam.admin.api.MenuService#findAll
   *
   * @param appId 应用ID
   * @returns {Promise<MenuDTO[]>}
   */
  async listMenuByAppId(appId: string): Promise<MenuDTO[]> {
    const restResultDTO: RestResultDTO<MenuDTO[]> = await this.httpClient.get<
      MenuDTO[]
    >(`${SYSTEM_CTX_IAM}/admin/1.0/menus/app/${appId}`);
    return DTOUtil.fromArray(MenuDTO, restResultDTO.data);
  }

  /**
   * 查询菜单
   * @backend hy.iam.admin.api.MenuService#findDetail
   *
   * @param menuId 菜单ID
   * @returns {Promise<MenuDTO>}
   */
  async getMenu(menuId: string): Promise<MenuDTO> {
    const restResultDTO: RestResultDTO<MenuDTO> = await this.httpClient.get<
      MenuDTO
    >(`${SYSTEM_CTX_IAM}/admin/1.0/menus/${menuId}`);
    return DTOUtil.from(MenuDTO, restResultDTO.data);
  }

  /**
   * 添加菜单
   * @backend hy.iam.admin.api.MenuService#add
   *
   * @param {SaveMenuRO} saveMenuRO
   * @returns {Promise<MenuDTO>}
   */
  async addMenu(saveMenuRO: SaveMenuRO): Promise<MenuDTO> {
    const restResultDTO: RestResultDTO<MenuDTO> = await this.httpClient.post<
      MenuDTO
    >(`${SYSTEM_CTX_IAM}/admin/1.0/menus`, saveMenuRO);
    return DTOUtil.from(MenuDTO, restResultDTO.data);
  }

  /**
   * 编辑菜单
   * @backend hy.iam.admin.api.MenuService#update
   *
   * @param menuId 菜单ID
   * @param {SaveMenuRO} saveMenuRO
   * @returns {Promise<MenuDTO>}
   */
  async updateMenu(menuId: string, saveMenuRO: SaveMenuRO): Promise<MenuDTO> {
    const restResultDTO: RestResultDTO<MenuDTO> = await this.httpClient.post<
      MenuDTO
    >(`${SYSTEM_CTX_IAM}/admin/1.0/menus/${menuId}`, saveMenuRO);
    return DTOUtil.from(MenuDTO, restResultDTO.data);
  }

  /**
   * 启用&禁用菜单
   * @backend hy.iam.admin.api.MenuService#enabled
   *
   * @param menuId 菜单ID
   * @returns {Promise<ToggleStatusDTO>}
   */
  async toggleMenu(menuId: string): Promise<ToggleStatusDTO> {
    const restResultDTO: RestResultDTO<
      ToggleStatusDTO
    > = await this.httpClient.post<ToggleStatusDTO>(
      `${SYSTEM_CTX_IAM}/admin/1.0/menus/${menuId}/enabled`
    );
    return DTOUtil.from(ToggleStatusDTO, restResultDTO.data);
  }

  /**
   * 删除菜单
   * @backend hy.iam.admin.api.MenuService#delete
   *
   * @param menuId 菜单ID
   * @returns {Promise<string>}
   */
  async removeMenu(menuId: string): Promise<string> {
    const restResultDTO: RestResultDTO<string> = await this.httpClient.del<
      string
    >(`${SYSTEM_CTX_IAM}/admin/1.0/menus/${menuId}`);
    return restResultDTO.data;
  }
}

export { MenuService };
