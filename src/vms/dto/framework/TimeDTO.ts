/**
 * @author arvin 2018-04-09
 */
import _ from "lodash";
import { implementStatic } from "../../decorator/index";
import { IDTO } from "../IDTO";

/**
 * 时间DTO
 * @backend hy.framework.dto.TimeDto
 */
@implementStatic<IDTO>()
class TimeDTO {
  public static readonly className: string = TimeDTO.name;

  /** 字符串格式的日期 */
  public time: string = "";
  /** 数字格式的日期，毫秒数 */
  public ltime: number = 0;

  constructor(
    dto: { time?: string | null; ltime?: number | null } | null = {}
  ) {
    if (!_.isNull(dto)) {
      const { ltime, time } = dto;

      if (!_.isNil(time)) {
        this.time = time;
      }
      if (!_.isNil(ltime)) {
        this.ltime = ltime;
      }
    }
  }
}

export { TimeDTO };
