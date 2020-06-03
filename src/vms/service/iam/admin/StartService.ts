/**
 * @author arvin 2018-07-06
 */

import { SYSTEM_CTX_IAM } from "../../../const/index";
import { RestResultDTO } from "../../../dto/index";
import { HttpClient } from "../../HttpClient";
import { IService } from "../../IService";

/**
 * 启动
 * @backend hy.iam.admin.api.StartupService
 */
class StartService implements IService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 刷新 TOKEN
   * @backend hy.iam.admin.api.StartupService#exchangeToken
   * @returns {Promise<string>}
   */
  async refreshToken(): Promise<string> {
    const { data }: RestResultDTO<string> = await this.httpClient.get<string>(
      `${SYSTEM_CTX_IAM}/admin/1.0/startup/exchangeToken`
    );
    return data;
  }
}

export { StartService };
