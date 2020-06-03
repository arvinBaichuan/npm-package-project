/**
 * @author arvin 2018-07-26
 */

import { RestResultDTO } from "../../../dto/index";
import { AuthService } from "../../AuthService";
import { HttpClient } from "../../HttpClient";
import { IService } from "../../IService";

/**
 * 发布订阅
 * @backend hy.pndms.pubsub.api.PubSubService
 */
class PubsubService implements IService {
  httpClient: HttpClient;
  authService: AuthService;

  constructor(httpClient: HttpClient, authService: AuthService) {
    this.httpClient = httpClient;
    this.authService = authService;
  }

  /**
   * 订阅频道
   * @param id 频道
   */
  async subscribe(id: string): Promise<string> {
    const { data }: RestResultDTO<string> = await this.httpClient.post<string>(
      `/api/pubsub/1.0/subscribe/${id}`,
      {
        id: this.authService.getToken()
      }
    );
    return data;
  }

  /**
   * 取消订阅频道
   * @param id 频道
   */
  async unsubscribe(id: string): Promise<string> {
    const { data }: RestResultDTO<string> = await this.httpClient.post<string>(
      `/api/pubsub/1.0/unSubscribe/${id}`,
      {
        id: this.authService.getToken()
      }
    );

    return data;
  }
}

export { PubsubService };
