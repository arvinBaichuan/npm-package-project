/**
 * @author arvin 2017-12-08
 */

import { IDTO } from "../IDTO";
import { implementStatic } from "../../decorator/index";
import { ErrorData } from "./ErrorData";
import _ from "lodash";
import { DTOUtil } from "../../util/index";

/**
 * 后端请求返回结果
 * @backend hy.framework.dto.RestResult
 */
@implementStatic<IDTO>()
export class RestResultDTO<T> {
  public static readonly className: string = RestResultDTO.name;

  /** 请求是否成功 */
  public success: boolean = false;
  /** 请求成功时返回的数据对象 */
  public data: T = {} as T;
  /** 请求失败时返回的错误消息 */
  public error: ErrorData = new ErrorData();

  constructor(
    dto: {
      success?: boolean | null;
      data?: T | null;
      error?: ErrorData | null;
    } | null = {}
  ) {
    if (!_.isNull(dto)) {
      const { data, error, success } = dto;

      if (!_.isNil(success)) {
        this.success = success;
      }
      if (!_.isNil(data)) {
        this.data = data;
      }
      if (!_.isNil(error)) {
        this.error = DTOUtil.from(ErrorData, error);
      }
    }
  }
}
