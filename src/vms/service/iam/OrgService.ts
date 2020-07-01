/**
 * @author arvin 2018-09-10
 */

import { DTOUtil } from "../../util/index";
import { SYSTEM_CTX_IAM } from "../../const/index";
import { OrgDTO, RestResultDTO } from "../../dto/index";
import { HttpClient } from "../HttpClient";
import { IService } from "../IService";

/**
 * 组织机构
 * @backend hy.iam.admin.api.OrgService
 */
class OrgService implements IService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 列表查询组织机构
   * @backend hy.iam.admin.api.OrgService#findAllAsTree
   */
  async listOrg(): Promise<Array<OrgDTO>> {
    const { data }: RestResultDTO<Array<OrgDTO>> = await this.httpClient.get<
      Array<OrgDTO>
    >(`${SYSTEM_CTX_IAM}/admin/1.0/orgs`);

    return DTOUtil.fromArray(OrgDTO, data);
  }
}

export { OrgService };
