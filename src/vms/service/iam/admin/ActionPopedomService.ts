/**
 * @author arvin 2016-12-16
 */

import { DTOUtil } from "../../../util/index";
import { IService } from "../../IService";
import { HttpClient } from "../../HttpClient";
import { SYSTEM_CTX_IAM } from "../../../const/index";
import { ActionDTO, ActionPopedomDTO, RestResultDTO } from "../../../dto/index";
import { SaveActionPopedomRO } from "../../../ro/index";

/**
 * 操作权限
 * @backend hy.iam.admin.api.ActionPopedomService
 */
class ActionPopedomService implements IService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 保存操作权限
   * @backend hy.iam.admin.api.ActionPopedomService#save
   *
   * @param {SaveActionPopedomRO} saveActionPopedomRO
   */
  async updateActionPopedom(
    saveActionPopedomRO: SaveActionPopedomRO
  ): Promise<ActionPopedomDTO> {
    const restResultDTO: RestResultDTO<
      ActionPopedomDTO
    > = await this.httpClient.post<ActionPopedomDTO>(
      `${SYSTEM_CTX_IAM}/admin/1.0/actionPopedoms`,
      saveActionPopedomRO
    );
    return DTOUtil.from(ActionPopedomDTO, restResultDTO.data);
  }

  /**
   * 列表查询操作权限，根据角色ID
   * @backend hy.iam.admin.api.ActionPopedomService#findAll
   *
   * @param roleId 角色ID
   * @returns {Promise<Array<ActionPopedomDTO>>}
   */
  async listActionPopedomByRoleId(
    roleId: string
  ): Promise<Array<ActionPopedomDTO>> {
    const restResultDTO: RestResultDTO<
      Array<ActionPopedomDTO>
    > = await this.httpClient.get<Array<ActionPopedomDTO>>(
      `${SYSTEM_CTX_IAM}/admin/1.0/actionPopedoms/${roleId}`
    );
    return DTOUtil.fromArray(ActionPopedomDTO, restResultDTO.data);
  }

  /**
   * 列表查询操作，根据应用ID和应用账户ID
   * @backend hy.iam.admin.api.ActionPopedomService#findAction2
   *
   * @param appId 应用ID
   * @param appAccountId 应用账户ID
   * @returns {Promise<Array<ActionDTO>>}
   */
  async listAction(
    appId: string,
    appAccountId: string
  ): Promise<Array<ActionDTO>> {
    const restResultDTO: RestResultDTO<
      Array<ActionDTO>
    > = await this.httpClient.get<Array<ActionDTO>>(
      `${SYSTEM_CTX_IAM}/admin/1.0/actionPopedoms/app/${appId}/appAccount/${appAccountId}`
    );
    return DTOUtil.fromArray(ActionDTO, restResultDTO.data);
  }

  /**
   * 列表查询未授权的动作权限
   * @backend hy.iam.admin.api.ActionPopedomService#findDisableAction
   *
   * @returns {Promise<Array<ActionDTO>>}
   */
  async listUnauthorizedAction(): Promise<Array<ActionDTO>> {
    const restResultDTO: RestResultDTO<
      Array<ActionDTO>
    > = await this.httpClient.get<Array<ActionDTO>>(
      `${SYSTEM_CTX_IAM}/admin/1.0/actionPopedoms/findDisableAction`,
      {
        /* 该接口需要在未登录时调用，为了不影响用户体验，不提示错误信息 */
        suppressErrorMessage: true
      }
    );
    return DTOUtil.fromArray(ActionDTO, restResultDTO.data);
  }
}

export { ActionPopedomService };
