/**
 * @author arvin 2017-12-08
 */

import _ from "lodash";
import { IdNameCodeNoteStatusDTO } from "../../index";
import { implementStatic } from "../../../decorator/index";
import { StatusEnum } from "../../../enum/index";
import { IDTO } from "../../IDTO";
import { ExtMetaDTO } from "./ExtMetaDTO";
import { DTOUtil } from "../../../util/index";

/**
 * 应用
 * @backend hy.iam.admin.dto.AppDetailDto
 */
@implementStatic<IDTO>()
class AppDTO extends IdNameCodeNoteStatusDTO {
  public static readonly className: string = AppDTO.name;

  icon: string = "";
  protocol: string = "";
  callUrl: string = "";
  userExp: string = "";
  extExp: string = "";
  extMeta: Array<ExtMetaDTO> = [];
  /** 标题 */
  title: string = "";
  /** 图标 */
  image: string = "";
  /** 版本 */
  releaseVersion: string = "";
  /** 说明 */
  releaseNote: string = "";

  constructor(
    dto: {
      id?: string | null;
      name?: string | null;
      code?: string | null;
      note?: string | null;
      status?: StatusEnum | null;
      icon?: string | null;
      protocol?: string | null;
      callUrl?: string | null;
      extExp?: string | null;
      userExp?: string | null;
      extMeta?: Array<ExtMetaDTO> | null;
      title?: string | null;
      image?: string | null;
      releaseVersion?: string | null;
      releaseNote?: string | null;
    } | null = {}
  ) {
    super(dto);
    if (!_.isNull(dto)) {
      const {
        image,
        icon,
        title,
        callUrl,
        extExp,
        extMeta,
        protocol,
        releaseNote,
        releaseVersion,
        userExp
      } = dto;

      if (!_.isNil(image)) {
        this.image = image;
      }
      if (!_.isNil(icon)) {
        this.icon = icon;
      }
      if (!_.isNil(title)) {
        this.title = title;
      }
      if (!_.isNil(callUrl)) {
        this.callUrl = callUrl;
      }
      if (!_.isNil(extExp)) {
        this.extExp = extExp;
      }
      if (!_.isNil(extMeta)) {
        this.extMeta = DTOUtil.fromArray(ExtMetaDTO, extMeta);
      }
      if (!_.isNil(protocol)) {
        this.protocol = protocol;
      }
      if (!_.isNil(releaseNote)) {
        this.releaseNote = releaseNote;
      }
      if (!_.isNil(releaseVersion)) {
        this.releaseVersion = releaseVersion;
      }
      if (!_.isNil(userExp)) {
        this.userExp = userExp;
      }
    }
  }
}

export { AppDTO };
