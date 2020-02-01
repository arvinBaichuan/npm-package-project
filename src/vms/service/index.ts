/**
 * 服务
 * @author arvin 2016-10-08
 */

import { Message } from "element-ui";
import { AuthService, HttpClient, PubsubService } from "@ytd/fe-core";
import store from "../../store/index";
/* pdnms/ip */
/*import { StoreModuleWebSocket } from "@ytd/fe-vue";*/

/**
 * 实例化 @ytd/fe-core 模块提供的公共服务
 * --------------------------------------------------
 */

const isProduction: boolean = process.env.NODE_ENV === "production";

const authService: any = new AuthService(
  isProduction,
  () => store.getters.PERMISSIONS
);

const httpClient: HttpClient = new HttpClient(
  isProduction,
  authService,
  (statusCode: number, message: string) => {
    Message.error(message);
  }
);

const pubsubService: any = new PubsubService(httpClient, authService);

/*
 * 因为 vuex store 和 AuthService 相互依赖，
 * 为了避免依赖问题，在 authService 创建成功之后，
 * 手动注册 websocket 的 vuex store 模块
 */
/*store.registerModule(
  "StoreModuleWebSocket",
  new StoreModuleWebSocket(
    authService,
    pubsubService,
    process.env.NODE_ENV === "production",
    "192.168.199.23:2187"
  ).getModule()
);*/
/*
`ws://192.168.199.23:2187/api/pubsub/1.0/connect`  开发环境
`ws://${window.location.host}/api/pubsub/1.0/connect`  生产环境
*/

export { httpClient, authService, pubsubService };

export * from "./OdnToolService";
