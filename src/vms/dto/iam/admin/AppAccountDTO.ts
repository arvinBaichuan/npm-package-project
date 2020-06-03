/**
 * @author arvin 2017-12-08
 */

import _ from "lodash";
import { IdNameCodeDTO, IdNameDTO, KeyValueDTO } from "../../index";
import { implementStatic } from "../../../decorator/index";
import { DTOUtil } from "../../../util/index";
import { IDTO } from "../../IDTO";
import { AccountDTO } from "./AccountDTO";
import { AppDTO } from "./AppDTO";

/**
 * 应用账户
 * @backend hy.iam.admin.dto.AppAccountDto
 */
@implementStatic<IDTO>()
class AppAccountDTO extends IdNameDTO {
  public static readonly className: string = AppAccountDTO.name;

  /** 应用 */
  app: AppDTO = new AppDTO();
  /** 组织机构 */
  org: IdNameDTO = new IdNameDTO();
  /** 用户 */
  user: IdNameDTO = new IdNameDTO();
  /** 帐号 */
  account: IdNameDTO = new IdNameDTO();
  /** 是否是超级管理员 */
  admin: boolean = false;
  /** 电话号码 */
  mobile: string = "";
  fmt: string = "";
  fullName: string = "";
  /** 标签 */
  tags: Array<string> = [];
  /** 账户信息 */
  accountDetailDto: AccountDTO = new AccountDTO();
  /** 角色列表 */
  roles: Array<IdNameCodeDTO> = [];
  /** 扩展属性 */
  extProperty: Array<KeyValueDTO<string, string>> = [];
  checked: boolean = false;

  constructor(
    dto: {
      id?: string | null;
      name?: string | null;
      app?: AppDTO | null;
      org?: IdNameDTO | null;
      user?: IdNameDTO | null;
      account?: IdNameDTO | null;
      admin?: boolean | null;
      mobile?: string | null;
      fmt?: string | null;
      fullName?: string | null;
      tags?: Array<string> | null;
      roles?: Array<IdNameCodeDTO> | null;
      accountDetailDto?: AccountDTO | null;
      extProperty?: Array<KeyValueDTO<string, string>> | null;
      checked?: boolean | null;
    } | null = {}
  ) {
    super(dto);
    if (!_.isNull(dto)) {
      const {
        account,
        accountDetailDto,
        admin,
        app,
        extProperty,
        mobile,
        fmt,
        fullName,
        org,
        tags,
        roles,
        user,
        checked
      } = dto;

      if (!_.isNil(account)) {
        this.account = DTOUtil.from(IdNameDTO, account);
      }
      if (!_.isNil(accountDetailDto)) {
        this.accountDetailDto = DTOUtil.from(AccountDTO, accountDetailDto);
      }
      if (!_.isNil(admin)) {
        this.admin = admin;
      }
      if (!_.isNil(app)) {
        this.app = DTOUtil.from(AppDTO, app);
      }
      if (!_.isNil(extProperty)) {
        this.extProperty = DTOUtil.fromArray<KeyValueDTO<string, string>>(
          KeyValueDTO,
          extProperty
        );
      }
      if (!_.isNil(mobile)) {
        this.mobile = mobile;
      }
      if (!_.isNil(fmt)) {
        this.fmt = fmt;
      }
      if (!_.isNil(fullName)) {
        this.fullName = fullName;
      }
      if (!_.isNil(org)) {
        this.org = DTOUtil.from(IdNameDTO, org);
      }
      if (!_.isNil(tags)) {
        this.tags = tags;
      }
      if (!_.isNil(roles)) {
        this.roles = DTOUtil.fromArray(IdNameCodeDTO, roles);
      }
      if (!_.isNil(user)) {
        this.user = DTOUtil.from(IdNameDTO, user);
      }
      if (!_.isNil(checked)) {
        this.checked = checked;
      }
    }
  }
}

export { AppAccountDTO };
