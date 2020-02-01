/**
 * @author arvin 2018-03-13
 */

/**
 * 拓扑: 事件
 */
const enum HyQuneeEventEnum {
  /** 初始化完成 */
  READY = "ready",
  /** 加载 */
  LOAD = "load",
  /** 重新加载 */
  RELOAD = "reload",
  /** 右键菜单 */
  CONTEXTMENU = "contextmenu",
  /** 左键单击 */
  ON_CLICK = "click",
  /** 左键双击 */
  ON_DOUBLE_CLICK = "double-click",
  /** 鼠标移动 */
  ON_MOUSE_MOVE = "mousemove",
  /** 拖拽中 */
  ON_DRAG = "ondrag",
  /** 鼠标进入 */
  MOUSE_ENTER = "mouse-enter",
  /** 鼠标移出 */
  MOUSE_LEAVE = "mouse-leave",
  /** 开始拖拽 */
  START_DRAG = "startdrag",
  /** 停止拖拽 */
  END_DRAG = "enddrag",
  /** 创建图元 */
  ELEMENT_CREATED = "element-created",
  /** 复制图元 */
  ELEMENTS_COPIED = "elements-copied",
  /** 拖拽 */
  DROP = "drop",
  /** 图元属性变更 */
  DATA_PROPERTY_CHANGE = "data-property-change",
  /** 选中变更 */
  SELECTION_CHANGE = "selection-change",
  /** 选中 */
  SELECT = "select",
  /** 取消选中 */
  UNSELECT = "unselect",
  /** 缩放 */
  ZOOM = "zoom",
  /** 全屏变更 */
  FULLSCREEN_CHANGE = "fullscreenChange",
  /** 调整大小 */
  RESIZE = "resize"
}

export { HyQuneeEventEnum };
