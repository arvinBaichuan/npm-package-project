import { SelectDomainVO } from "../vo/index";

/**
 * PopedomPageSaveDomainPopedomSelectDomainDialog 组件属性（props)
 */
export interface IPopedomPageSaveDomainPopedomSelectDomainDialogProp {
  /** 弹窗（ElDialog）属性 */
  dialogProp: {
    visible: boolean;
  };
  /** 表单模型 */
  formModel: SelectDomainVO;
}
