/**
 * 比较的文件
 * @author arvin 2018-03-13
 */
export class DiffFile {
  /** 文件名称 */
  public name: string;
  /** 文件内容 */
  public content: string;

  constructor(name: string, content: string) {
    this.name = name;
    this.content = content;
  }
}
