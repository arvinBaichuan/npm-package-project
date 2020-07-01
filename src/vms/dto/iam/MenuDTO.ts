/**
 * @author arvin 2017-12-11
 */
import _ from "lodash";
import { IdNameCodeNoteStatusDTO } from "../index";
import { implementStatic } from "../../decorator/index";
import { StatusEnum } from "../../enum/index";
import { IDTO } from "../IDTO";
import { DTOUtil } from "../../util/index";

/**
 * 菜单
 * @backend hy.iam.admin.dto.MenuDto
 */
@implementStatic<IDTO>()
class MenuDTO extends IdNameCodeNoteStatusDTO {
  public static readonly className: string = MenuDTO.name;

  /** 对应路由名称 */
  url: string = "";
  /** 排序序号 */
  order: number = 0;
  /** 上级菜单ID */
  parentId: string = "";
  /** 应用ID */
  appId: string = "";
  /** 下级菜单 */
  child: Array<MenuDTO> = [];
  /** 菜单图标 */
  icon: string = "";
  /** 点击菜单后，是否响应路由的激活状态 */
  canActive: boolean = true;

  constructor(
    dto: {
      id?: string | null;
      name?: string | null;
      code?: string | null;
      note?: string | null;
      status?: StatusEnum | null;
      url?: string | null;
      order?: number | null;
      parentId?: string | null;
      appId?: string | null;
      child?: Array<MenuDTO> | null;
      icon?: string | null;
    } | null = {}
  ) {
    super(dto);
    if (!_.isNull(dto)) {
      const { parentId, appId, child, icon, order, url } = dto;

      if (!_.isNil(parentId)) {
        this.parentId = parentId;
      }
      if (!_.isNil(appId)) {
        this.appId = appId;
      }
      if (!_.isNil(child)) {
        this.child = DTOUtil.fromArray(MenuDTO, child);
      }
      if (!_.isNil(icon)) {
        this.icon = icon;
      }
      if (!_.isNil(order)) {
        this.order = order;
      }
      if (!_.isNil(url)) {
        this.url = url;
      }
    }
  }
}

export { MenuDTO };
