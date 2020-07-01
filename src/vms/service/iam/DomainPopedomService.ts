/**
 * @author arvin 2016-12-16
 */

import { DTOUtil } from "../../util/index";
import { IService } from "../IService";
import { HttpClient } from "../HttpClient";
import { SYSTEM_CTX_IAM } from "../../const/index";
import { DomainPopedomDTO, RestResultDTO } from "../../dto/index";
import { SaveDomainPopedomRO } from "../../ro/index";

/**
 * 领域权限
 * @backend hy.iam.admin.api.DomainPopedomService
 */
class DomainPopedomService implements IService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 添加领域权限
   * @backend hy.iam.admin.api.DomainPopedomService#add
   *
   * @param {SaveDomainPopedomRO} saveDomainPopedomRO
   */
  async addDomainPopedom(
    saveDomainPopedomRO: SaveDomainPopedomRO
  ): Promise<DomainPopedomDTO> {
    const restResultDTO: RestResultDTO<
      DomainPopedomDTO
    > = await this.httpClient.post<DomainPopedomDTO>(
      `${SYSTEM_CTX_IAM}/admin/1.0/domainPopedoms`,
      saveDomainPopedomRO
    );
    return DTOUtil.from(DomainPopedomDTO, restResultDTO.data);
  }

  /**
   * 编辑领域权限
   * @backend hy.iam.admin.api.DomainPopedomService#update
   *
   * @param domainPopedomId 领域权限ID
   * @param {SaveDomainPopedomRO} saveDomainPopedomRO
   */
  async updateDomainPopedom(
    domainPopedomId: string,
    saveDomainPopedomRO: SaveDomainPopedomRO
  ): Promise<DomainPopedomDTO> {
    const restResultDTO: RestResultDTO<
      DomainPopedomDTO
    > = await this.httpClient.post<DomainPopedomDTO>(
      `${SYSTEM_CTX_IAM}/admin/1.0/domainPopedoms/${domainPopedomId}`,
      saveDomainPopedomRO
    );
    return DTOUtil.from(DomainPopedomDTO, restResultDTO.data);
  }

  /**
   * 删除领域权限
   * @backend hy.iam.admin.api.DomainPopedomService#delete
   *
   * @param domainPopedomId 领域权限ID
   */
  async deleteDomainPopedom(domainPopedomId: string): Promise<string> {
    const restResultDTO: RestResultDTO<string> = await this.httpClient.del<
      string
    >(`${SYSTEM_CTX_IAM}/admin/1.0/domainPopedoms/${domainPopedomId}`);
    return restResultDTO.data;
  }

  /**
   * 根据角色查询领域权限
   * @backend hy.iam.admin.api.DomainPopedomService#findAll
   *
   * @param roleId 角色ID
   * @returns {Promise<DomainPopedomDTO[]>}
   */
  async listDomainPopedomByRoleId(roleId: string): Promise<DomainPopedomDTO[]> {
    const restResultDTO: RestResultDTO<
      DomainPopedomDTO[]
    > = await this.httpClient.get<DomainPopedomDTO[]>(
      `${SYSTEM_CTX_IAM}/admin/1.0/domainPopedoms/${roleId}`
    );
    return DTOUtil.fromArray(DomainPopedomDTO, restResultDTO.data);
  }

  /**
   * 根据应用ID和应用账户ID查询领域权限
   * @backend hy.iam.admin.api.DomainPopedomService#findDomain2
   *
   * @param appId 应用ID
   * @param appAccountId 应用账户ID
   * @returns {Promise<Array<string>>}
   */
  async listDomainPopedom(
    appId: string,
    appAccountId: string
  ): Promise<Array<string>> {
    const restResultDTO: RestResultDTO<
      Array<string>
    > = await this.httpClient.get<Array<string>>(
      `${SYSTEM_CTX_IAM}/admin/1.0/domainPopedoms/app/${appId}/appAccount/${appAccountId}`
    );
    return restResultDTO.data;
  }
}

export { DomainPopedomService };
