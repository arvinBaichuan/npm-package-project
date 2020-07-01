/**
 * @author arvin 2017-12-11
 */

import { DTOUtil } from "../../util/index";
import { HttpClient } from "../HttpClient";
import { RestResultDTO, StartupDTO } from "../../dto/index";
import { SYSTEM_CTX_IAM } from "../../const/index";
import { IService } from "../IService";

/**
 * 公共
 * @backend hy.iam.admin.api.CommonService
 */
class CommonService implements IService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 启动应用
   * @backend hy.iam.admin.api.CommonService#startup
   *
   * @param token
   * @param url 请求地址；不同的应用启动的接口地址可能会有变化，需要可以配置；
   * @returns {Promise<StartupDTO>}
   */
  async startup(
    token: string,
    url: string = `${SYSTEM_CTX_IAM}/admin/1.0/startup`
  ): Promise<StartupDTO> {
    const restResultDTO: RestResultDTO<StartupDTO> = await this.httpClient.get<
      StartupDTO
    >(`${url}?token=${token}`);
    return DTOUtil.from(StartupDTO, restResultDTO.data);
  }
}

export { CommonService };
