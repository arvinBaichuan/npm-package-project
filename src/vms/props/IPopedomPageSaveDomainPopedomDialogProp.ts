import { DomainPopedomService } from "../service/index";
import { DomainTreeNode } from "../model/index";
import { SaveDomainPopedomVO } from "../vo/index";

/**
 * PopedomPageSaveDomainPopedomDialog 组件属性（props)
 */
export interface IPopedomPageSaveDomainPopedomDialogProp {
  domainPopedomService: DomainPopedomService;
  /** 弹窗（ElDialog）属性 */
  dialogProp: {
    visible: boolean;
  };
  /** 表单模型 */
  formModel: SaveDomainPopedomVO;
  domainNodes: DomainTreeNode[];
}
