/**
 * @author arvin 2017-12-16
 */

import { DTOUtil } from "../../util/index";
import { IService } from "../IService";
import { HttpClient } from "../HttpClient";
import { SYSTEM_CTX_IAM } from "../../const/index";
import { ActionDTO, RestResultDTO, ToggleStatusDTO } from "../../dto/index";
import { SaveActionRO } from "../../ro/index";

/**
 * 操作
 * @backend hy.iam.admin.api.ActionService
 */
class ActionService implements IService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 列表查询操作，根据应用ID
   * @backend hy.iam.admin.api.ActionService#findAll
   *
   * @param appId 应用ID
   * @returns {Promise<ActionDTO[]>}
   */
  async listActionByAppId(appId: string): Promise<ActionDTO[]> {
    const restResultDTO: RestResultDTO<ActionDTO[]> = await this.httpClient.get<
      ActionDTO[]
    >(`${SYSTEM_CTX_IAM}/admin/1.0/actions/app/${appId}`);
    return DTOUtil.fromArray(ActionDTO, restResultDTO.data);
  }

  /**
   * 列表查询操作，根据应用ID和资源类型
   * @backend hy.iam.admin.api.ActionService#findAll2
   *
   * @param appId 应用ID
   * @param resourceType 资源类型
   * @returns {Promise<ActionDTO[]>}
   */
  async listActionByAppIdAndResourceType(
    appId: string,
    resourceType: number
  ): Promise<ActionDTO[]> {
    const restResultDTO: RestResultDTO<ActionDTO[]> = await this.httpClient.get<
      ActionDTO[]
    >(
      `${SYSTEM_CTX_IAM}/admin/1.0/actions/app/${appId}/resourceType/${resourceType}`
    );
    return DTOUtil.fromArray(ActionDTO, restResultDTO.data);
  }

  /**
   * 查询操作
   * @backend hy.iam.admin.api.ActionService#findDetail
   *
   * @param actionId 操作ID
   * @returns {Promise<ActionDTO>}
   */
  async getAction(actionId: string): Promise<ActionDTO> {
    const restResultDTO: RestResultDTO<ActionDTO> = await this.httpClient.get<
      ActionDTO
    >(`${SYSTEM_CTX_IAM}/admin/1.0/actions/${actionId}`);
    return DTOUtil.from(ActionDTO, restResultDTO.data);
  }

  /**
   * 添加操作
   * @backend hy.iam.admin.api.ActionService#add
   *
   * @param {SaveActionRO} saveActionRO
   * @returns {Promise<ActionDTO>}
   */
  async addAction(saveActionRO: SaveActionRO): Promise<ActionDTO> {
    const restResultDTO: RestResultDTO<ActionDTO> = await this.httpClient.post<
      ActionDTO
    >(`${SYSTEM_CTX_IAM}/admin/1.0/actions`, saveActionRO);
    return DTOUtil.from(ActionDTO, restResultDTO.data);
  }

  /**
   * 编辑操作
   * @backend hy.iam.admin.api.ActionService#update
   *
   * @param actionId 操作ID
   * @param {SaveActionRO} saveActionRO
   * @returns {Promise<ActionDTO>}
   */
  async updateAction(
    actionId: string,
    saveActionRO: SaveActionRO
  ): Promise<ActionDTO> {
    const restResultDTO: RestResultDTO<ActionDTO> = await this.httpClient.post<
      ActionDTO
    >(`${SYSTEM_CTX_IAM}/admin/1.0/actions/${actionId}`, saveActionRO);
    return DTOUtil.from(ActionDTO, restResultDTO.data);
  }

  /**
   * 启用&禁用操作
   * @backend hy.iam.admin.api.ActionService#enabled
   *
   * @param actionId 操作ID
   * @returns {Promise<ToggleStatusDTO>}
   */
  async toggleAction(actionId: string): Promise<ToggleStatusDTO> {
    const restResultDTO: RestResultDTO<
      ToggleStatusDTO
    > = await this.httpClient.post<ToggleStatusDTO>(
      `${SYSTEM_CTX_IAM}/admin/1.0/actions/${actionId}/enabled`
    );
    return DTOUtil.from(ToggleStatusDTO, restResultDTO.data);
  }

  /**
   * 删除操作
   * @backend hy.iam.admin.api.ActionService#delete
   *
   * @param actionId 操作ID
   * @returns {Promise<string>}
   */
  async deleteAction(actionId: string): Promise<string> {
    const restResultDTO: RestResultDTO<string> = await this.httpClient.del<
      string
    >(`${SYSTEM_CTX_IAM}/admin/1.0/actions/${actionId}`);
    return restResultDTO.data;
  }
}

export { ActionService };
