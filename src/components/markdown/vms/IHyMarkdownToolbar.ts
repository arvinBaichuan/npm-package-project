export interface IHyMarkdownToolbar {
  /* 粗体 */
  bold: boolean;
  /* 斜体 */
  italic: boolean;
  /* 标题 */
  header: boolean;
  /* 下划线 */
  underline: boolean;
  /* 中划线 */
  strikethrough: boolean;
  /* 标记 */
  mark: boolean;
  /* 上角标 */
  superscript: boolean;
  /* 下角标 */
  subscript: boolean;
  /* 引用 */
  quote: boolean;
  /* 有序列表 */
  ol: boolean;
  /* 无序列表 */
  ul: boolean;
  /* 链接 */
  link: boolean;
  /* 图片链接 */
  imagelink: boolean;
  /* 代码 */
  code: boolean;
  /* 表格 */
  table: boolean;
  /* 全屏编辑 */
  fullscreen: boolean;
  /* 沉浸式阅读 */
  readmodel: boolean;
  /* 展示HTML源码 */
  htmlcode: boolean;
  /* 帮助 */
  help: boolean;
  /* 上一步 */
  undo: boolean;
  /* 下一步 */
  redo: boolean;
  /* 清空 */
  trash: boolean;
  /* 保存 */
  save: boolean;
  /* 导航目录 */
  navigation: boolean;
  /* 左对齐 */
  alignleft: boolean;
  /* 居中 */
  aligncenter: boolean;
  /* 右对齐 */
  alignright: boolean;
  /* 单双栏模式 */
  subfield: boolean;
  /* 预览 */
  preview: boolean;
}
