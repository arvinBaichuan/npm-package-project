import { implementStatic } from "../../decorator";
import { IDTO } from "../IDTO";
import _ from "lodash";

/**
 * 表单验证错误
 * @backend hy.framework.dto.ErrorData.ValidationError
 */
@implementStatic<IDTO>()
export class ValidationError {
  public static readonly className: string = ValidationError.name;

  public key: string = "";
  public message: string = "";

  constructor(
    dto: {
      message?: string | null;
      key?: string | null;
    } | null = {}
  ) {
    if (!_.isNull(dto)) {
      const { key, message } = dto;

      if (!_.isNil(message)) {
        this.message = message;
      }
      if (!_.isNil(key)) {
        this.key = key;
      }
    }
  }
}
