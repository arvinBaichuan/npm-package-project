/**
 * @author arvin 2018-06-08
 */

import { HttpClient } from "../../HttpClient";
import { IService } from "../../IService";
import {RestResultDTO} from "../../../dto";
import {SYSTEM_CTX_IAM} from "../../../const";

/**
 * 个人
 * @backend hy.iam.auth.api.MyService
 */
class MeService implements IService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 修改密码
   * TODO
   * @backend hy.iam.auth.api.MyService#updatePassword
   *
   * @param appId 应用ID
   * @returns {Promise<MenuDTO[]>}
   */
  /*
    async changePassword(appId: string): {
      const restResultDTO: RestResultDTO<MenuDTO[]> = await this.httpClient.get<
        MenuDTO[]
      >(`${SYSTEM_CTX_IAM}/admin/1.0/menus/app/${appId}`);
      return MenuDTO.fromArray(restResultDTO.data);
    }
  */


  /**
   * 获取服务器IAM登录地址
   * @returns {Promise<string>}
   */
  async getSsoUrl(): Promise<string> {
    const { data }: RestResultDTO<string> = await this.httpClient.get<string>(
      `${SYSTEM_CTX_IAM}/admin/1.0/commons/sso-url`
    );
    return data;
  }
}

export { MeService };
