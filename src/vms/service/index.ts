/**
 * 服务
 * @author arvin 2016-10-08
 */

import { Message } from "element-ui";
import { AuthService, HttpClient } from ".";
import store from "../../store/index";
/* pdnms/ip */
/*import { StoreModuleWebSocket } from "../store/index";*/

/**
 * 实例化 @hy/fe-core 模块提供的公共服务
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

export { httpClient, authService };

export * from "./IService";

export * from "./AuthService";
export * from "./HttpClient";

/*
 * iam
 */
export * from "./iam/AccountService";
export * from "./iam/ActionPopedomService";
export * from "./iam/ActionService";
export * from "./iam/AppAccountRoleService";
export * from "./iam/AppAccountService";
export * from "./iam/CommonService";
export * from "./iam/DomainPopedomService";
export * from "./iam/MenuPopedomService";
export * from "./iam/MenuService";
export * from "./iam/StartService";
export * from "./iam/OrgService";
export * from "./iam/RoleService";
export * from "./iam/PartnersService";


/*
 * pdnms/gis
 */
export * from "./hy/gis/GeomService";
export * from "./hy/gis/LayerService";

/*
 * pdnms/pubsub
 */
export * from "./hy/pubsub/PubsubService";