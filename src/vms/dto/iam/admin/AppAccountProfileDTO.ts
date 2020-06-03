/**
 * @author arvin 2018-07-13
 */

import _ from "lodash";
import { implementStatic } from "../../../decorator/index";
import { IDTO } from "../../IDTO";

/**
 * 应用账户配置
 * @backend hy.iam.admin.dto.AppAccountProfile
 */
@implementStatic<IDTO>()
class AppAccountProfileDTO {
  public static readonly className: string = AppAccountProfileDTO.name;

  /** 配置的KEY */
  public key: string = "";
  /** 配置的值 (JSON字符串) */
  public value: string = "";
  /** 更新时间 */
  public updateTs: number = 0;
  /** 工作空间 */
  public workspace: string = "default";

  constructor(
    dto: {
      key?: string | null;
      value?: string | null;
      updateTs?: number | null;
      workspace?: string | null;
    } | null = {}
  ) {
    if (!_.isNull(dto)) {
      const { value, key, updateTs, workspace } = dto;

      if (!_.isNil(value)) {
        this.value = value;
      }
      if (!_.isNil(key)) {
        this.key = key;
      }
      if (!_.isNil(updateTs)) {
        this.updateTs = updateTs;
      }
      if (!_.isNil(workspace)) {
        this.workspace = workspace;
      }
    }
  }
}

export { AppAccountProfileDTO };
