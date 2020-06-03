/**
 * @author arvin 2020-03-31
 */
import _ from "lodash";
import { IDTO } from "../../IDTO";
import { IdNameDTO } from "../../index";
import { implementStatic } from "../../../decorator/index";

/**
 * 合作伙伴DTO
 */
@implementStatic<IDTO>()
class PartnersDTO<T extends string | number = string> extends IdNameDTO {
  public static readonly className: string = PartnersDTO.name;

    public appKey: {
        appKey: string;
        masterSecret: string;
    } = {
        appKey: "",
        masterSecret:""
    };
    public serviceLife: {
        longTerm: boolean;
        startTs: number;
        endTs: number;
        valid: boolean;
        fmt: string;
    } = {
        longTerm: false,
        startTs: new Date().getTime() - 24 * 60 * 60 * 1000,
        endTs: new Date().getTime(),
        valid: false,
        fmt: ""
    };
    public enabled: boolean = false;
    public applicant: {
        name: string;
        mobile: string;
        telephone: string;
        qq: string;
        wx: string;
    } = {
        name: "",
        mobile: "",
        telephone: "",
        qq: "",
        wx: ""
    };
    public notes: string = "";
    public createTs: number = new Date().getTime();
    public valid: boolean = false;
    public createTsFmt: string = "";


  constructor(
    dto: {
      id?: string | null;
      name?: string | null;
        appKey?: {
            appKey: string;
            masterSecret: string;
        } | null;
        serviceLife?: {
            longTerm: boolean;
            startTs: number;
            endTs: number;
            valid: boolean;
            fmt: string;
        } | null;
        enabled?: boolean | null;
        applicant?: {
            name: string;
            mobile: string;
            telephone: string;
            qq: string;
            wx: string;
        } | null;
        notes?: string | null;
        createTs?: number | null;
        valid?: boolean | null;
        createTsFmt?: string | null;
    } | null = {}
  ) {
    super(dto);
    if (!_.isNull(dto)) {
      const {
          appKey,
          serviceLife,
          enabled,
          applicant,
          notes,
          createTs,
          valid,
          createTsFmt
      } = dto;
      if (!_.isNil(appKey)) {
        this.appKey = appKey;
      }
      if (!_.isNil(serviceLife)) {
        this.serviceLife = serviceLife;
      }
      if (!_.isNil(enabled)) {
        this.enabled = enabled;
      }
      if (!_.isNil(applicant)) {
        this.applicant = applicant;
      }
      if (!_.isNil(notes)) {
        this.notes = notes;
      }
      if (!_.isNil(createTs)) {
        this.createTs = createTs;
      }
      if (!_.isNil(valid)) {
        this.valid = valid;
      }
      if (!_.isNil(createTsFmt)) {
        this.createTsFmt = createTsFmt;
      }
    }
  }
}

namespace PartnersDTO {
  @implementStatic<IDTO>()
  export class AuthorizeDTO extends IdNameDTO {
    public static readonly className: string = AuthorizeDTO.name;

    public method: string = "";
    public url: string = "";
    public permit: boolean = false;
    public enabled: boolean = false;
    public sn: number = 0;
    public buildIn: boolean = false;

    constructor(
      dto: {
        id?: string | null;
        name?: string | null;
        method?: string | null;
        url?: string | null;
        permit?: boolean | null;
        enabled?: boolean | null;
        sn?: number | null;
        buildIn?: boolean | null;
      } | null = {}
    ) {
      super(dto);
      if (!_.isNull(dto)) {
        const { method, url, permit, enabled, sn, buildIn } = dto;
        if (!_.isNil(method)) {
          this.method = method;
        }
        if (!_.isNil(url)) {
          this.url = url;
        }
        if (!_.isNil(permit)) {
          this.permit = permit;
        }
        if (!_.isNil(enabled)) {
          this.enabled = enabled;
        }
        if (!_.isNil(sn)) {
          this.sn = sn;
        }
        if (!_.isNil(buildIn)) {
          this.buildIn = buildIn;
        }
      }
    }
  }
}

export { PartnersDTO };
