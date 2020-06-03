/**
 * 服务
 * @author arvin 2016-10-08
 */

import { Message } from "element-ui";
import { AuthService, HttpClient, PubsubService } from ".";
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
export * from "./IService";

export * from "./AuthService";
export * from "./HttpClient";

/*
 * iam/admin
 */
export * from "./iam/admin/AccountService";
export * from "./iam/admin/ActionPopedomService";
export * from "./iam/admin/ActionService";
export * from "./iam/admin/AppAccountRoleService";
export * from "./iam/admin/AppAccountService";
export * from "./iam/admin/CommonService";
export * from "./iam/admin/DomainPopedomService";
export * from "./iam/admin/MenuPopedomService";
export * from "./iam/admin/MenuService";
export * from "./iam/admin/StartService";
export * from "./iam/admin/OrgService";
export * from "./iam/admin/RoleService";
export * from "./iam/admin/PartnersService";

/*
 * iam/auth
 */
export * from "./iam/auth/MeService";

/*
 * pdnms/gis
 */
export * from "./hy/gis/GeomService";
export * from "./hy/gis/LayerService";

/*
 * pdnms/pubsub
 */
export * from "./hy/pubsub/PubsubService";