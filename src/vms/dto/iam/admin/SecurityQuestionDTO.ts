/**
 * @author arvin 2017-12-08
 */

import _ from "lodash";
import { IdDTO } from "../../index";
import { implementStatic } from "../../../decorator/index";
import { IDTO } from "../../IDTO";
import { DTOUtil } from "../../../util/index";

/**
 * 安全问题
 * @backend hy.iam.admin.dto.SecurityDto
 */
@implementStatic<IDTO>()
class SecurityQuestionDTO extends IdDTO {
  public static readonly className: string = SecurityQuestionDTO.name;

  /** 问题 */
  question: string = "";
  /** 答案 */
  answer: string = "";

  constructor(
    dto: {
      id?: string | null;
      question?: string | null;
      answer?: string | null;
    } | null = {}
  ) {
    super(dto);
    if (!_.isNull(dto)) {
      const { question, answer } = dto;
      if (!_.isNil(question)) {
        this.question = question;
      }
      if (!_.isNil(answer)) {
        this.answer = answer;
      }
    }
  }

  /**
   * @deprecated
   */
  static from(tb: SecurityQuestionDTO | null): SecurityQuestionDTO {
    console.warn("[DEPRECATED]: SecurityQuestionDTO.from()");
    const t: SecurityQuestionDTO = DTOUtil.from(
      IdDTO,
      tb
    ) as SecurityQuestionDTO;

    if (tb) {
      t.question = tb.question;
      t.answer = tb.answer;
    }

    return t;
  }

  /**
   * @deprecated
   */
  static fromArray(tbs: SecurityQuestionDTO[]): SecurityQuestionDTO[] {
    console.warn("[DEPRECATED]: SecurityQuestionDTO.fromArray()");
    const ts: SecurityQuestionDTO[] = [];

    _.forEach(tbs, tb => {
      if (tb) {
        ts.push(DTOUtil.from(SecurityQuestionDTO, tb));
      }
    });

    return ts;
  }
}

export { SecurityQuestionDTO };
