/**
 * @author arvin 2018-01-04
 */

import { DomainTreeNode } from "../model/index";

export class SelectDomainVO {
  public domainNodes: DomainTreeNode[];

  /**
   * 选中的节点ID
   */
  public selectId: string;

  constructor(domainNodes: DomainTreeNode[] = [], selectId: string = "") {
    this.domainNodes = domainNodes;
    this.selectId = selectId;
  }
}
