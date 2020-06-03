/**
 * @author arvin 2017-12-11
 */

import _ from "lodash";
import { implementStatic } from "../../decorator/index";
import { IDTO } from "../IDTO";

/**
 * 状态启用&禁用
 * @backend hy.framework.dto.EnableStatusDto
 */
@implementStatic<IDTO>()
class ToggleStatusDTO {
  public static readonly className: string = ToggleStatusDTO.name;

  /** 是否启用 */
  public enable: boolean = true;
  public message: string = "";

  constructor(
    dto: {
      enable?: boolean | null;
      message?: string | null;
    } | null = {}
  ) {
    if (!_.isNull(dto)) {
      const { enable, message } = dto;
      if (!_.isNil(enable)) {
        this.enable = enable;
      }
      if (!_.isNil(message)) {
        this.message = message;
      }
    }
  }
}

export { ToggleStatusDTO };
