/*
 * @author arvin 2018-07-26
 */
import _ from "lodash";
import { implementStatic } from "../../../decorator/index";
import { IDTO } from "../../IDTO";

/**
 * 发布订阅
 * @backend hy.pndms.pubsub.dto.PubSubDto
 */
@implementStatic<IDTO>()
class PubSubDTO {
  public static readonly className: string = PubSubDTO.name;
  /** 消息类型 */
  type: number = 0;
  /** 消息 */
  data: object = {};

  constructor(
    dto: {
      type?: number | null;
      data?: object | null;
    } | null = {}
  ) {
    if (!_.isNull(dto)) {
      const { data, type } = dto;

      if (!_.isNil(type)) {
        this.type = type;
      }
      if (!_.isNil(data)) {
        this.data = data;
      }
    }
  }
}

export { PubSubDTO };
