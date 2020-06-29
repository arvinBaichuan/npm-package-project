/**
 * 领域树节点
 */
export class DomainTreeNode {
  public id: string;

  public name: string;

  /**
   *
   */
  public scope: string;

  public children: DomainTreeNode[];

  constructor(
    id: string = "",
    name: string = "",
    scope: string = "",
    children: DomainTreeNode[] = []
  ) {
    this.id = id;
    this.name = name;
    this.scope = scope;
    this.children = children;
  }
}
