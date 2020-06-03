/**
 * @author arvin 2017-12-08
 */

import _ from "lodash";
import store from "store";
import { LOCAL_STORE_ACCOUNT, LOCAL_STORE_TOKEN } from "../const/index";
import { AppAccountDTO, RestResultDTO } from "../dto/index";
import { DTOUtil } from "../util/index";
import { HttpClient } from "./HttpClient";
import { IService } from "./IService";

/**
 * 认证 & 授权
 */
class AuthService implements IService {
  public httpClient?: HttpClient;
  /** 应用编码 */
  public appCode: string = "";
  /** 是否是生产环境 */
  public readonly isProduction: boolean = true;
  /**
   * 未授权的动作权限编码列表获取方法
   * 为了增加扩展性，由调用者提供列表的获取方法；
   */
  public unauthorizedPermissionCodesGetter: () => Array<string> = () => [];

  // tslint:disable-next-line:member-ordering
  constructor(
    isProduction: boolean,
    unauthorizedPermissionCodesGetter?: () => Array<string>
  ) {
    this.isProduction = isProduction;
    if (!_.isUndefined(unauthorizedPermissionCodesGetter)) {
      this.unauthorizedPermissionCodesGetter = unauthorizedPermissionCodesGetter;
    }
  }

  /**
   * 动作权限是否已经授权
   * @param actionCode 动作权限编码
   */
  public isActionAuthorized(actionCode: string): boolean {
    return !_.find(
      this.unauthorizedPermissionCodesGetter(),
      (item: string) => item === actionCode
    );
  }

  /**
   * 获取本地保存的登录 token
   */
  public getToken(): string {
    return store.get(LOCAL_STORE_TOKEN);
  }

  /**
   * 设置本地保存的登录 token
   * @param token
   */
  public setToken(token: string): void {
    store.set(LOCAL_STORE_TOKEN, token);
  }

  /**
   * 删除本地保存的登录 token
   */
  public removeToken(): void {
    store.remove(LOCAL_STORE_TOKEN);
  }

  /**
   * 获取本地保存的应用账户
   * @returns 应用账户
   */
  public getUser(): AppAccountDTO {
    let appAccount: AppAccountDTO = new AppAccountDTO();

    const appAccountJSON = store.get(LOCAL_STORE_ACCOUNT);
    if (appAccountJSON) {
      appAccount = DTOUtil.from(AppAccountDTO, appAccountJSON);
    }

    if (this.appCode) {
      this.appCode = appAccount.app.code;
    }

    return appAccount;
  }

  /**
   * 设置本地保存的应用账户
   * @param appAccount 应用账户
   */
  public async setUser(appAccount: AppAccountDTO): Promise<AppAccountDTO> {
    this.appCode = appAccount.app.code;
    store.set(LOCAL_STORE_ACCOUNT, appAccount);
    return appAccount;
  }

  /**
   * 删除本地保存的应用账户
   */
  public removeUser(): void {
    store.remove(LOCAL_STORE_ACCOUNT);
  }

  /**
   * 检查是否已经认证
   */
  public async isAuthenticated(): Promise<RestResultDTO<boolean>> {
    /* 检查本地存储中是否有 token 信息 */
    if (!this.getToken()) {
      return new RestResultDTO({ success: true, data: false });
    } else {
      return new RestResultDTO({ success: true, data: true });
    }
  }

  /**
   * 退出登录
   *
   * @param op 操作码；SSO 根据该操作码执行相应的操作；
   */
  public logout(op: string = ""): void {
    this.removeToken();
    this.removeUser();

    const protocol = window.location.protocol;
    let host = `${protocol}//${window.location.hostname}:`;

    if (protocol === "http:") {
      host += this.isProduction ? "80" : "8080";
    } else if (protocol === "https:") {
      host += this.isProduction ? "443" : "443";
    }

    window.location.replace(
      `${host}/#!/apps?app_code=${this.appCode}&op=${op}`
    );
  }
}

export { AuthService };
