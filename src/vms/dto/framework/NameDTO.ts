/**
 * @author arvin 2017-12-08
 */

import _ from "lodash";
import { implementStatic } from "../../decorator/index";
import { DTOUtil } from "../../util/index";
import { IDTO } from "../IDTO";
import { IdNameDTO } from "./IdNameDTO";

/**
 * @backend hy.framework.base.Named
 */
@implementStatic<IDTO>()
class NameDTO extends IdNameDTO {
  public static readonly className: string = NameDTO.name;

  public type: number = 0;
  public fullName: string = "";

  constructor(
    dto: {
      id?: string | null;
      name?: string | null;
      type?: number | null;
      fullName?: string | null;
    } | null = {}
  ) {
    super(dto);
    if (!_.isNull(dto)) {
      const { type, fullName } = dto;
      if (!_.isNil(type)) {
        this.type = type;
      }
      if (!_.isNil(fullName)) {
        this.fullName = fullName;
      }
    }
  }

  /**
   * @deprecated
   */
  static from(tb: NameDTO | null): NameDTO {
    console.warn("[DEPRECATED]: NameDTO.from()");
    const t: NameDTO = DTOUtil.from(IdNameDTO, tb) as NameDTO;

    if (tb) {
      t.type = tb.type;
      t.fullName = tb.fullName;
    }

    return t;
  }

  /**
   * @deprecated
   */
  static fromArray(tbs: NameDTO[]): NameDTO[] {
    console.warn("[DEPRECATED]: NameDTO.fromArray()");
    const ts: NameDTO[] = [];

    _.forEach(tbs, tb => {
      if (tb) {
        ts.push(DTOUtil.from(NameDTO, tb));
      }
    });

    return ts;
  }
}

export { NameDTO };
