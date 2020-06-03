/**
 * @author arvin 2017-12-08
 */

import _ from "lodash";
import { IdNameDTO, IdNameStatusDTO } from "../../index";
import { implementStatic } from "../../../decorator/index";
import { StatusEnum } from "../../../enum/index";
import { DTOUtil } from "../../../util/index";
import { IDTO } from "../../IDTO";
import { SecurityQuestionDTO } from "./SecurityQuestionDTO";

/**
 * 账户
 * @backend hy.iam.admin.dto.AccountDetailDto
 */
@implementStatic<IDTO>()
class AccountDTO extends IdNameStatusDTO {
  public static readonly className: string = AccountDTO.name;

  /** 应用 */
  app: Array<IdNameDTO> = [];
  /** 安全问题 */
  security: Array<SecurityQuestionDTO> = [];
  /** 角色列表 */
  role: Array<string> = [];
  main: boolean = false;
  mobile: string = "";
  email: string = "";
  longest: boolean = false;
  comeTime: number = 0;
  loseTime: number = 0;
  /** 是否是系统管理员 */
  admin: boolean = false;

  constructor(
    dto: {
      id?: string | null;
      name?: string | null;
      status?: StatusEnum | null;
      app?: Array<IdNameDTO> | null;
      security?: Array<SecurityQuestionDTO> | null;
      role?: Array<string> | null;
      main?: boolean | null;
      mobile?: string | null;
      email?: string | null;
      longest?: boolean | null;
      comeTime?: number | null;
      loseTime?: number | null;
      admin?: boolean | null;
    } | null = {}
  ) {
    super(dto);
    if (!_.isNull(dto)) {
      const {
        admin,
        mobile,
        app,
        comeTime,
        email,
        longest,
        loseTime,
        main,
        role,
        security
      } = dto;
      if (!_.isNil(admin)) {
        this.admin = admin;
      }
      if (!_.isNil(mobile)) {
        this.mobile = mobile;
      }
      if (!_.isNil(app)) {
        this.app = DTOUtil.fromArray(IdNameDTO, app);
      }
      if (!_.isNil(comeTime)) {
        this.comeTime = comeTime;
      }
      if (!_.isNil(email)) {
        this.email = email;
      }
      if (!_.isNil(longest)) {
        this.longest = longest;
      }
      if (!_.isNil(loseTime)) {
        this.loseTime = loseTime;
      }
      if (!_.isNil(main)) {
        this.main = main;
      }
      if (!_.isNil(role)) {
        this.role = role;
      }
      if (!_.isNil(security)) {
        this.security = DTOUtil.fromArray(SecurityQuestionDTO, security);
      }
    }
  }

  /**
   * @deprecated
   */
  static from(tb: AccountDTO | null): AccountDTO {
    console.warn("[DEPRECATED]: AccountDTO.from()");
    const t: AccountDTO = DTOUtil.from(IdNameStatusDTO, tb) as AccountDTO;

    if (tb) {
      t.app = DTOUtil.fromArray(IdNameDTO, tb.app);
      t.security = DTOUtil.fromArray(SecurityQuestionDTO, tb.security);
      t.role = tb.role;
      t.main = tb.main;
      t.mobile = tb.mobile;
      t.email = tb.email;
      t.longest = tb.longest;
      t.comeTime = tb.comeTime;
      t.loseTime = tb.loseTime;
      t.admin = tb.admin;
    }

    return t;
  }

  /**
   * @deprecated
   */
  static fromArray(tbs: AccountDTO[]): AccountDTO[] {
    console.warn("[DEPRECATED]: AccountDTO.fromArray()");
    const ts: AccountDTO[] = [];

    _.forEach(tbs, tb => {
      if (tb) {
        ts.push(DTOUtil.from(AccountDTO, tb));
      }
    });

    return ts;
  }
}

export { AccountDTO };
