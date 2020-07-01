/**
 * @author arvin 2017-12-19
 */

import { SYSTEM_CTX_IAM } from "../../const/index";
import {
  AppAccountDTO,
  AppAccountProfileDTO,
  PageDTO
} from "../../dto/index";
import { SaveAppAccountProfileRO, SaveTagRO } from "../../ro/index";
import { DTOUtil } from "../../util/index";
import { HttpClient } from "../HttpClient";
import { IService } from "../IService";

/**
 * 应用账户
 * @backend hy.iam.admin.api.AppAccountService
 */
class AppAccountService implements IService {
  public httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 查询应用账户
   * @backend hy.iam.admin.api.AppAccountService#find
   */
  public async getAppAccount(appAccountId: string): Promise<AppAccountDTO> {
    const { data } = await this.httpClient.get<AppAccountDTO>(
      `${SYSTEM_CTX_IAM}/admin/1.0/appAccounts/${appAccountId}`
    );
    return DTOUtil.from(AppAccountDTO, data);
  }

  /**
   * 分页查询应用账户
   * @backend hy.iam.admin.api.AppAccountService#findAll2
   *
   * @param pageIndex
   * @param pageSize
   * @param appId 应用ID
   * @param key 关键字
   */
  public async pageAppAccount(
    pageIndex: number,
    pageSize: number,
    appId: string,
    key: string
  ): Promise<PageDTO<AppAccountDTO>> {
    const { data } = await this.httpClient.get<PageDTO<AppAccountDTO>>(
      `${SYSTEM_CTX_IAM}/admin/1.0/appAccounts/app/all?appId=${appId}&key=${key}&pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
    const pageDTO: PageDTO<AppAccountDTO> = DTOUtil.from<
      PageDTO<AppAccountDTO>
    >(PageDTO, data);
    pageDTO.data = DTOUtil.fromArray(AppAccountDTO, pageDTO.data);
    return pageDTO;
  }

  /**
   * 查询所有标签
   * @backend hy.iam.admin.api.AppAccountService#findAllTags
   */
  public async listTags(): Promise<Array<string>> {
    const { data } = await this.httpClient.get<Array<string>>(
      `${SYSTEM_CTX_IAM}/admin/1.0/appAccounts/tags/all`
    );

    return data;
  }

  /**
   * 添加标签
   * @backend hy.iam.admin.api.AppAccountService#addTag
   *
   * @param id 账户ID
   * @param saveTagRO
   */
  public async addTag(id: string, saveTagRO: SaveTagRO): Promise<string> {
    const { data } = await this.httpClient.post<string>(
      `${SYSTEM_CTX_IAM}/admin/1.0/appAccounts/${id}/tag`,
      saveTagRO
    );

    return data;
  }

  /**
   * 删除标签
   * @backend hy.iam.admin.api.AppAccountService#deleteTag
   *
   * @param id 账户ID
   * @param tag 标签
   */
  public async deleteTag(id: string, tag: string): Promise<string> {
    const { data } = await this.httpClient.del<string>(
      `${SYSTEM_CTX_IAM}/admin/1.0/appAccounts/${id}/tag?tag=${tag}`
    );

    return data;
  }

  /**
   * 获取应用账户配置
   * @backend hy.iam.admin.api.AppAccountService#findProfile
   *
   * @param key KEY
   * @param workspace 工作空间
   */
  public async getProfile(
    key: string,
    workspace: string = "default"
  ): Promise<AppAccountProfileDTO> {
    const { data } = await this.httpClient.get<AppAccountProfileDTO>(
      `${SYSTEM_CTX_IAM}/admin/1.0/appAccounts/profile?key=${key}&w=${workspace}`
    );

    return DTOUtil.from(AppAccountProfileDTO, data);
  }

  /**
   * 保存应用账户配置
   * @backend hy.iam.admin.api.AppAccountService#addOrUpdateProfile
   *
   * @param saveAppAccountProfileRO
   */
  public async saveProfile(
    saveAppAccountProfileRO: SaveAppAccountProfileRO
  ): Promise<string> {
    const { data } = await this.httpClient.post<string>(
      `${SYSTEM_CTX_IAM}/admin/1.0/appAccounts/profile`,
      saveAppAccountProfileRO
    );

    return data;
  }
}

export { AppAccountService };
