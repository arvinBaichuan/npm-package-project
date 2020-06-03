/**
 * @author arvin 2017-12-08
 */

import _ from "lodash";
import { IDTO } from "../IDTO";
import { implementStatic } from "../../decorator/index";
import { DTOUtil } from "../../util/index";
import { ValidationError } from "./ValidationError";

/**
 * @backend hy.framework.dto.ErrorData
 */
@implementStatic<IDTO>()
class ErrorData {
  public static readonly className: string = ErrorData.name;

  public shortStack: string = "";

  /** 错误堆栈信息 */
  public exStack: string = "";
  /** 错误消息 */
  public errorMsg: string = "";
  /** 错误编码 */
  public errorCode: string = "";
  /** 系统错误ID */
  public systemErrorId: string = "";
  /** 表单验证错误 */
  public validErrors: Array<ValidationError> = [];

  public code: string = "";

  constructor(
    errorData: {
      shortStack?: string | null;
      exStack?: string | null;
      errorMsg?: string | null;
      errorCode?: string | null;
      systemErrorId?: string | null;
      validErrors?: Array<ValidationError> | null;
      code?: string | null;
    } | null = {}
  ) {
    if (!_.isNull(errorData)) {
      const {
        shortStack,
        exStack,
        errorMsg,
        errorCode,
        systemErrorId,
        validErrors,
        code
      } = errorData;

      if (!_.isNil(shortStack)) {
        this.shortStack = shortStack;
      }
      if (!_.isNil(exStack)) {
        this.exStack = exStack;
      }
      if (!_.isNil(errorMsg)) {
        this.errorMsg = errorMsg;
      }
      if (!_.isNil(errorCode)) {
        this.errorCode = errorCode;
      }
      if (!_.isNil(systemErrorId)) {
        this.systemErrorId = systemErrorId;
      }
      if (!_.isNil(validErrors)) {
        this.validErrors = DTOUtil.fromArray(ValidationError, validErrors);
      }
      if (!_.isNil(code)) {
        this.code = code;
      }
    }
  }
}

export { ErrorData };
