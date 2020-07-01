/**
 * @author arvin 2020-03-31
 */

import { HttpClient } from "../HttpClient";
import { IService } from "../IService";
import { RestResultDTO, PartnersDTO} from "../../dto/index";
import {SYSTEM_CTX_IAM} from "../../const/index";
import {DTOUtil} from "../../util/index";

/**
 * 合作伙伴
 */
class PartnersService implements IService {
  httpClient: HttpClient;

  constructor(httpClient: HttpClient) {
    this.httpClient = httpClient;
  }

  /**
   * 查询合作伙伴列表
   * @returns {Promise<Array<PartnersDTO>>}
   */
  async listPartner(): Promise<Array<PartnersDTO>> {
    const {
      data
    }: RestResultDTO<Array<PartnersDTO>> = await this.httpClient.get<
      Array<PartnersDTO>
      >(`${SYSTEM_CTX_IAM}/admin/1.0/accounts/es`);
    return DTOUtil.fromArray(PartnersDTO, data);
  }

  /**
   * 查询单条
   * @param id 合作伙伴ID
   */
  async getPartner(id: string): Promise<PartnersDTO> {
    const restResultDTO: RestResultDTO<PartnersDTO> = await this.httpClient.get<
      PartnersDTO
      >(`${SYSTEM_CTX_IAM}/admin/1.0/accounts/es/${id}`);
    return DTOUtil.from(PartnersDTO, restResultDTO.data);
  }

  /**
   * 重置
   * @param appKey
   * @returns {Promise<string>}
   */
  async resetMasterSecret(appKey: {
    appKey: string;
    masterSecret: string;
  }): Promise<string> {
    const restResultDTO: RestResultDTO<string> = await this.httpClient.post<
      string
      >(`${SYSTEM_CTX_IAM}/admin/1.0/accounts/es/master-secret`, appKey);
    return restResultDTO.data;
  }

  /**
   * 启用&禁用合作伙伴
   * @param id 合作伙伴ID
   * @param obj
   * @returns {Promise<string>}
   */
  async togglePartner(
    id: string,
    obj: {
      value: boolean;
    }
  ): Promise<string> {
    const restResultDTO: RestResultDTO<string> = await this.httpClient.post<
      string
      >(`${SYSTEM_CTX_IAM}/admin/1.0/accounts/es/${id}/enabled`, obj);
    return restResultDTO.data;
  }

  /**
   * 删除合作伙伴
   * @param id 合作伙伴ID
   * @returns {Promise<string>}
   */
  async deletePartner(id: string): Promise<string> {
    const restResultDTO: RestResultDTO<string> = await this.httpClient.del<
      string
      >(`${SYSTEM_CTX_IAM}/admin/1.0/accounts/es/${id}`);
    return restResultDTO.data;
  }

  /**
   * 注册/添加
   * @param partnersDto PartnersDTO
   * @returns {Promise<string>}
   */
  async register(partnersDto: PartnersDTO): Promise<string> {
    const restResultDTO: RestResultDTO<string> = await this.httpClient.post<
      string
      >(`${SYSTEM_CTX_IAM}/admin/1.0/accounts/es`, partnersDto);
    return restResultDTO.data;
  }

  /**
   * 保存
   * @param id 合作伙伴 ID
   * @param partnersDto PartnersDTO
   * @returns {Promise<string>}
   */
  async savePartner(id: string, partnersDto: PartnersDTO): Promise<string> {
    const restResultDTO: RestResultDTO<string> = await this.httpClient.post<
      string
      >(`${SYSTEM_CTX_IAM}/admin/1.0/accounts/es/${id}`, partnersDto);
    return restResultDTO.data;
  }

  /**
   * *************************** 授权管理 ********************************
   */
  /**
   * 查询授权列表
   * id 合作伙伴 ID
   * @returns {Promise<Array<PartnersDTO.AuthorizeDTO>>}
   */
  async listAuthorize(id: string): Promise<Array<PartnersDTO.AuthorizeDTO>> {
    const {
      data
    }: RestResultDTO<
      Array<PartnersDTO.AuthorizeDTO>
      > = await this.httpClient.get<Array<PartnersDTO.AuthorizeDTO>>(
      `${SYSTEM_CTX_IAM}/admin/1.0/accounts/es/${id}/acl`
    );
    return DTOUtil.fromArray(PartnersDTO.AuthorizeDTO, (data as any).items);
  }

  /**
   * 查询单条
   * @param id 授权ID
   */
  async getPartnerAuthorize(id: string): Promise<PartnersDTO.AuthorizeDTO> {
    const restResultDTO: RestResultDTO<
      PartnersDTO.AuthorizeDTO
      > = await this.httpClient.get<PartnersDTO.AuthorizeDTO>(
      `${SYSTEM_CTX_IAM}/admin/1.0/accounts/es/acl/${id}`
    );
    return DTOUtil.from(PartnersDTO.AuthorizeDTO, restResultDTO.data);
  }

  /**
   * 启用&禁用合作伙伴
   * @param id 授权ID
   * @param obj
   * @returns {Promise<string>}
   */
  async togglePartnerAuthorize(
    id: string,
    obj: {
      value: boolean;
    }
  ): Promise<string> {
    const restResultDTO: RestResultDTO<string> = await this.httpClient.post<
      string
      >(`${SYSTEM_CTX_IAM}/admin/1.0/accounts/es/acl/${id}/enabled`, obj);
    return restResultDTO.data;
  }

  /**
   * 删除合作伙伴
   * @param id 授权ID
   * @returns {Promise<string>}
   */
  async deletePartnerAuthorize(id: string): Promise<string> {
    const restResultDTO: RestResultDTO<string> = await this.httpClient.del<
      string
      >(`${SYSTEM_CTX_IAM}/admin/1.0/accounts/es/acl/${id}`);
    return restResultDTO.data;
  }

  /**
   * 添加
   * @param id 合作伙伴 ID
   * @param authorizeDto  PartnersDTO.AuthorizeDTO
   * @returns {Promise<string>}
   */
  async addPartnerAuthorize(
    id: string,
    authorizeDto: PartnersDTO.AuthorizeDTO
  ): Promise<string> {
    const restResultDTO: RestResultDTO<string> = await this.httpClient.post<
      string
      >(`${SYSTEM_CTX_IAM}/admin/1.0/accounts/es/${id}/acl`, authorizeDto);
    return restResultDTO.data;
  }

  /**
   * 保存
   * @param id 授权ID
   * @param authorizeDto  PartnersDTO.AuthorizeDTO
   * @returns {Promise<string>}
   */
  async savePartnerAuthorize(
    id: string,
    authorizeDto: PartnersDTO.AuthorizeDTO
  ): Promise<string> {
    const restResultDTO: RestResultDTO<string> = await this.httpClient.post<
      string
      >(`${SYSTEM_CTX_IAM}/admin/1.0/accounts/es/acl/${id}`, authorizeDto);
    return restResultDTO.data;
  }
}

export { PartnersService };
