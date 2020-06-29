import { RoleService } from "../service/index";
import { SaveRoleVO } from "../vo/index";

/**
 * RolePageSaveRoleDialog 组件属性（props)
 */
export interface IRolePageSaveRoleDialogProp {
  /**
   * 弹窗（ElDialog）属性
   */
  dialogProp: {
    visible: boolean;
  };
  /**
   * 表单模型
   */
  formModel: SaveRoleVO;
  roleService: RoleService;
}
