/**
 * @author arvin 2017-12-11
 */
import _ from "lodash";
import { implementStatic } from "../../../decorator/index";
import { StatusEnum } from "../../../enum/index";
import { DTOUtil } from "../../../util/index";
import { IDTO } from "../../IDTO";
import { MenuDTO } from "./MenuDTO";

/**
 * 菜单权限
 * @backend hy.iam.admin.dto.MenuPopedomDto
 */
@implementStatic<IDTO>()
class MenuPopedomDTO extends MenuDTO {
  public static readonly className: string = MenuPopedomDTO.name;

  /** 允许读 */
  public read: boolean = false;
  /** 允许写 */
  public write: boolean = false;
  /** 角色ID */
  public roleId: string = "";
  /** 菜单ID */
  public menuId: string = "";
  /** 允许访问 */
  public allow: boolean = false;
  /** 下级菜单 */
  public child: Array<MenuPopedomDTO> = [];

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
      icon?: string | null;
      read?: boolean | null;
      write?: boolean | null;
      roleId?: string | null;
      menuId?: string | null;
      allow?: boolean | null;
      child?: Array<MenuPopedomDTO> | null;
    } | null = {}
  ) {
    super(dto);
    if (!_.isNull(dto)) {
      const { read, write, roleId, menuId, allow, child } = dto;
      if (!_.isNil(read)) {
        this.read = read;
      }
      if (!_.isNil(write)) {
        this.write = write;
      }
      if (!_.isNil(roleId)) {
        this.roleId = roleId;
      }
      if (!_.isNil(menuId)) {
        this.menuId = menuId;
      }
      if (!_.isNil(allow)) {
        this.allow = allow;
      }
      if (!_.isNil(child)) {
        this.child = DTOUtil.fromArray(MenuPopedomDTO, child);
      }
    }
  }
}

export { MenuPopedomDTO };
