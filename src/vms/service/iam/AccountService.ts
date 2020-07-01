/**
 * @author arvin 2018-07-05
 */

import { SYSTEM_CTX_IAM } from "../../const/index";
import { RestResultDTO } from "../../dto/index";
import { HttpClient } from "../HttpClient";
import { IService } from "../IService";

/**
 * 账户
 * @backend hy.iam.admin.api.AccountService
 */
class AccountService implements IService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 解锁账户
   * @backend hy.iam.admin.api.AccountService#unlockAccount
   * @param accountId 账户ID
   * @returns {Promise<boolean>}
   */
  async unlockAccount(accountId: string): Promise<boolean> {
    const { data }: RestResultDTO<boolean> = await this.httpClient.post<
      boolean
    >(`${SYSTEM_CTX_IAM}/admin/1.0/accounts/${accountId}/unlock`);
    return data;
  }
}

export { AccountService };
