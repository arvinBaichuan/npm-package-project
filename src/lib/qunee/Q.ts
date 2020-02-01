/**
 * @version 2.6.0.4
 */

/* tslint:disable */
export declare namespace Q {
  /** 软件名称 */
  export const name: string;
  /** 版本号 */
  export const version: string;
  /** 关于Qunee for HTML5的说明信息 */
  export const about: string;
  /** 软件版权说明 */
  export const copyright: string;
  /** 是否支持触控事件 */
  export const isTouchSupport: boolean;
  /** 是否为iOS系统 */
  export const isIOS: boolean;
  /** 是否是Mac OS X操作系统 */
  export const isMac: boolean;
  /** 是否是Safari浏览器 */
  export const isSafari: boolean;
  /** 是否是IE浏览器 */
  export const isIE: boolean;
  /** 是否是Firefox浏览器 */
  export const isFirefox: boolean;
  /** 是否是Google Chrome浏览器 */
  export const isChrome: boolean;
  /** 是否是Opera浏览器 */
  export const isOpera: boolean;
  /** 是否为webkit内核的浏览器 */
  export const isWebkit: boolean;
  /** 是否为gecko内核的浏览器，比如firefox */
  export const isGecko: boolean;

  /**
   * 继承，子类继承父类，并重写属性或者函数
   * @param subClass 子类
   * @param superClass 父类
   * @param overrides 重写方法
   */
  export function extend(
    subClass: Function,
    superClass: Function,
    overrides?: object
  ): void;

  /**
   * 调用父类的构造函数，相当于java的super()
   * @param object 对象
   * @param type 对象类型
   * @param args 调用参数
   */
  export function doSuperConstructor(
    object: object,
    type: Function,
    args: Array<string>
  ): void;

  /**
   * 调用父类的构造函数，相当于java的super.method***()
   * @param object 对象
   * @param type 对象类型
   * @param method 调用方法
   * @param args 调用参数，通常使用arguments
   */
  export function doSuper(
    object: object,
    type: Function,
    method: string,
    args: Array<string>
  ): void;

  /**
   * 生成函数，指定函数作用域
   * @param scope 函数作用域
   * @param f 函数
   * @returns {Function}
   */
  export function createFunction(scope: object, f: Function): Function;

  /**
   * 设置样式类名
   * @param element HTML元素对象
   * @param className 样式类名
   */
  export function setClass(element: HTMLElement, className: string): void;

  /**
   * 追加样式类名
   * @param element HTML元素对象
   * @param className 样式类名
   */
  export function appendClass(element: HTMLElement, className: string): void;

  /**
   * 删除样式类名
   * @param element HTML元素对象
   * @param className 样式类名
   */
  export function removeClass(element: HTMLElement, className: string): void;

  /**
   * 遍历数组，在指定的作用域内调用回调函数
   * @param array 数组
   * @param call 回调函数，如果回调函数结果返回false，则终止遍历
   * @param scope 函数作用域
   * @returns {boolean} 如果返回false，表示没有遍历完整个数组
   */
  export function forEach(
    array: Array<any>,
    call: Function,
    scope?: object
  ): boolean;

  /**
   * 反向遍历数组，在指定的作用域内调用回调函数
   * @param array 数组
   * @param call 回调函数，如果回调函数结果返回false，则终止遍历
   * @param scope 函数作用域
   * @returns {boolean} 如果返回false，表示没有遍历完整个数组
   */
  export function forEachReverse(
    array: Array<any>,
    call: Function,
    scope?: object
  ): boolean;

  /**
   * 是否为数字类型
   * @param n 对象
   * @returns {boolean}
   */
  export function isNumber(n: object): boolean;

  /**
   * 是否为字符串类型
   * @param n 对象
   * @returns {boolean}
   */
  export function isString(n: object): boolean;

  /**
   * 是否为布尔类型
   * @param n 对象
   * @returns {boolean}
   */
  export function isBoolean(n: object): boolean;

  /**
   * 是否为数组类型
   * @param n 对象
   * @returns {boolean}
   */
  export function isArray(n: object): boolean;

  /**
   * 判断键盘按键是否为：macOS 下的 Command 键或者其他操作系统下的 Ctrl 键
   * @param e
   * @returns
   */
  export function isMetaKey(e: any): boolean;

  /**
   * 阻止浏览器对于事件的默认响应动作
   * @param e 鼠标，键盘或者触控事件
   */
  export function eventPreventDefault(e: Event): void;

  /**
   * 停止事件传递给其他元素对象
   * @param e 鼠标，键盘或者触控事件
   */
  export function eventStopPropagation(e: Event): void;

  /**
   * 阻止浏览器对于事件的默认响应动作，并停止事件传递给其他元素对象
   * @see Q.eventPreventDefault
   * @see Q.eventStopPropagation
   * @param e 鼠标，键盘或者触控事件
   */
  export function stopEvent(e: Event): void;

  /**
   * 延迟运行，可以指定延迟时间，回调函数，以及函数作用域
   * @param call 回调函数
   * @param scope 函数作用域
   * @param time 延迟时间
   */
  export function callLater(
    call: Function,
    scope?: object,
    time?: number
  ): void;

  /**
   * 下一次绘制帧时，调用回调函数
   * @param call 回调函数
   * @param scope 函数作用域
   */
  export function nextFrame(call: Function, scope?: object): void;

  /**
   * 遍历所有的孩子
   * @param parent 父节点
   * @param call 回调函数， 如果函数结果返回false，则终止遍历
   * @param scope 函数作用域
   */
  export function forEachChild(
    parent: HTMLElement,
    call: Function,
    scope?: object
  ): void;

  /**
   * 深度优先遍历
   * @param array 集合
   * @param call 回调函数
   * @param scope 函数作用域
   * @param postOrder 是否后序遍历
   */
  export function forEachByDepthFirst(
    array: Array<any>,
    call: Function,
    scope?: object,
    postOrder?: boolean
  ): void;

  /**
   * 深度优先反向遍历
   * @param array 集合
   * @param call 回调函数
   * @param scope 函数作用域
   * @param postOrder 是否后序遍历
   */
  export function forEachByDepthFirstReverse(
    array: Array<any>,
    call: Function,
    scope?: object,
    postOrder?: boolean
  ): void;

  /**
   * 广度优先遍历
   * @param array 集合
   * @param call 回调函数
   * @param scope 函数作用域
   */
  export function forEachByBreadthFirst(
    array: Array<any>,
    call: Function,
    scope?: object
  ): void;

  /**
   * 判断图片是否被注册
   * @see Q.registerImage
   * @param key
   * @returns {boolean}
   */
  export function hasImage(key: string): boolean;

  /**
   * 绘制图片到画布，支持png, svg, gif（除IE），支持内置图形，Q.Path, 以及自定义绘制函数
   *
   * @param key 图片注册名称、图片链接或者图片绘制对象
   * @param canvas 画布，图片将绘制在此对象上
   * @param styles 绘制样式参数，包括填充色，阴影效果等
   * @see Q.registerImage
   */
  export function drawImage(
    key: string | object,
    canvas: HTMLCanvasElement,
    styles?: any
  ): void;

  /**
   * 获取所有注册的图片
   * @returns {Array<object>}
   */
  export function getAllImages(): Array<object>;

  /**
   * 注册图片
   * 支持png, svg, gif（除IE）
   * 支持内置图形，Q.Path, 以及自定义绘制函数
   * @param key
   * @param data
   * @param width
   * @param height
   */
  export function registerImage(
    key: string,
    data: object,
    width?: number,
    height?: number
  ): void;

  /**
   * 随机整型数值
   * @param i 数值范围
   * @returns {number}
   */
  export function randomInt(i: number): number;

  /**
   * 随机布尔值
   * @returns {boolean}
   */
  export function randomBool(): boolean;

  /**
   * 随机颜色
   * @param alpha 透明度，0到1
   * @returns {string}
   */
  export function randomColor(alpha: number): string;

  /**
   * 对HTMLElement添加事件监听，并指定监听函数运行作用域
   * @see HTMLElement#addEventListener
   * @param eventTarget 事件监听对象
   * @param type 事件类型
   * @param listener 监听器
   * @param useCapture 是否拦截事件，网页交互事件监听有两个阶段：拦截、冒泡，在拦截阶段事件先派发给父元素，冒泡阶段，事件会先派发给事件所在的元素，然后向上冒泡
   * @param scope 函数作用域
   * @returns {Function} 如果没有指定函数作用域，返回传入的listener对象，如果指定了作用域，则会创建一个新的闭包函数，在其内调用listener，返回这个新创建的函数对象
   */
  export function addEventListener(
    eventTarget: HTMLElement | Window,
    type: string,
    listener: Function,
    useCapture?: boolean,
    scope?: object | null
  ): Function;

  /**
   * 获取第一个标签名为指定名称的孩子节点
   * @param parentNode 父节点
   * @param tagName 标签名
   * @returns {HTMLElement}
   */
  export function getFirstElementChildByTagName(
    parentNode: HTMLElement,
    tagName: string
  ): HTMLElement;

  /**
   * 是否在指定的矩形范围
   * @param x 矩形x位置
   * @param y 矩形y位置
   * @param width 矩形宽度th
   * @param height 矩形高ght
   * @param px 点x坐标
   * @param py 点y坐标
   * @returns {boolean} 是否相交
   */
  export function intersectsPoint(
    x: number,
    y: number,
    width: number,
    height: number,
    px: number,
    py: number
  ): boolean;

  /**
   * 是否包含在矩形内
   * @param tx 范围x坐标
   * @param ty 范围y坐标
   * @param tw 范围宽度
   * @param th 范围高度
   * @param rx 矩形x位置
   * @param ry 矩形y位置
   * @param rw 矩形宽度
   * @param rh 矩形高度
   * @returns {boolean} 是否包含
   */
  export function containsRect(
    tx: number,
    ty: number,
    tw: number,
    th: number,
    rx: number,
    ry: number,
    rw: number,
    rh: number
  ): boolean;

  /**
   * 解析 JSON 数据
   * @param json
   * @returns {object}
   */
  export function parseJSON(json: string): object;

  /**
   * 创建<canvas>，并指定宽高
   * @param w 宽
   * @param h 高
   * @param withRatio
   */
  export function createCanvas(
    w: number,
    h: number,
    withRatio?: boolean
  ): HTMLCanvasElement;

  /**
   * 创建<canvas>，并指定宽高
   * @param withRatio
   */
  export function createCanvas(withRatio?: boolean): HTMLCanvasElement;

  /**
   * 提示框，参见window#alert
   * @param text
   */
  export function alert(text: string): void;

  /**
   * 输入框
   * @param message
   * @param value
   * @param callback
   * @param scope
   */
  export function prompt(
    message: string,
    value: any,
    callback: Function,
    scope?: any
  ): void;

  /**
   * 确认框
   * @param message
   * @param callback
   * @param scope
   */
  export function confirm(
    message: string,
    callback: Function,
    scope?: any
  ): void;

  /**
   * 添加新的CSS规则
   * @param selector
   * @param rulesStr
   */
  export function addCSSRule(selector: string, rulesStr: string): void;

  /**
   * 通过AJAX请求链接
   * @example
   Q.loadURL(jsfile, function (req) {
             var code = req.responseText;
             ...
         }, showError)
   * @param url 请求链接
   * @param callback 回调函数，传入参数为XMLHttpRequest实例
   * @param onError 请求异常时回调此函数
   * @param params 请求参数，参见XMLHttpRequest#send(...);
   * @param addTime
   */
  export function loadURL(
    url: string,
    callback: Function,
    onError: Function,
    params: any,
    addTime: any
  ): void;

  /**
   * 请求XML资源
   * @example
   Q.loadXML('map.svg', function(doc){
        var paths = doc.getElementsByTagName("path");
     }, showError);
   * @param url 请求链接
   * @param callback 回调函数，传入参数为XMLHttpRequest实例
   * @param onError 请求异常时回调此函数
   * @param params 请求参数，参见XMLHttpRequest#send(...);
   * @param addTime
   */
  export function loadXML(
    url: string,
    callback: Function,
    onError: Function,
    params: any,
    addTime: any
  ): void;

  /**
   * 请求JSON资源
   * @example
   Q.loadJSON('map.json', function(json){
        for(var d in json){

        }
     }, showError);
   * @param url 请求链接
   * @param callback 回调函数，传入参数为XMLHttpRequest实例
   * @param onError 请求异常时回调此函数
   * @param params 请求参数，参见XMLHttpRequest#send(...);
   * @param addTime
   */
  export function loadJSON(
    url: string,
    callback: Function,
    onError: Function,
    params: any,
    addTime: any
  ): void;

  /**
   * 计算长度
   * @static
   * @param x1
   * @param y1
   * @param x2
   * @param y2
   * @returns {number}
   */
  export function calculateDistance(
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number;

  /**
   * 将整型数值转换成网页支持的颜色字符串，支持 半透明颜色
   * @param  int16 整型数值，比如0xFFFFFF表示白色，或者0x77000000表示半透明黑色
   * @returns 返回颜色字符串，比如"#FFFFFF"，如果是半透明颜色，返回如："rgba(0,0,0,0.4)"
   */
  export function toColor(int16: number): string;

  /**
   * 控制台打印信息
   * @param text
   */
  export function log(text: string): void;

  /**
   * 在控制台中输出异常信息
   * @param error
   */
  export function error(error: any): void;

  /**
   * 控制台中打印对象详细信息
   * @param o
   */
  export function trace(o: any): void;

  /**
   * 设置css样式
   * @example
   * Q.css(document.body, {
   *  "background-color": Q.toColor(0xEE2898E0),
   *  "border": "1px solid #222222"
   *  "border-radius": "5px",
   * });
   * @static
   * @param el
   * @param props 样式属性
   */
  export function css(el: HTMLElement, props: any): void;

  /*
   * ####################################################################################################
   * 类型
   * ####################################################################################################
   */

  /** 图形生成器 */
  type ShapeGenerator = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => void;

  /*
   * ####################################################################################################
   * 接口
   * ####################################################################################################
   */

  /** 图形绘制接口 */
  export interface IDrawable {
    /**
     * 绘制函数
     * @param g
     * @param scale
     */
    draw(g: CanvasRenderingContext2D, scale?: number): void;
  }

  /** 监听器接口 */
  export interface IListener {
    /**
     * 事件发生之前调用
     * @param e
     * @returns {boolean} 如果返回false，则停止事件的执行
     */
    beforeEvent?: (e: Event) => boolean;

    /**
     * 事件发生时调用
     * @param e
     */
    onEvent?: (e: Event) => void;
  }

  /*
   * ####################################################################################################
   * 类
   * ####################################################################################################
   */

  /**
   * 可绘制交互器的原型类；
   * 在交互过程中，通常需要绘制一些临时的图形或者辅助线，这些图形可以在 {@link Q.Graph#topCanvas} 顶层画布中绘制，并在交互结束时清除:
   * 自定义交互时，可以继承此类，重写 {@link Q.DrawableInteraction}
   */
  export class DrawableInteraction {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);
  }

  /**
   * 创建路径交互器；
   * 实现交互过程中绘制路径，创建连线交互 {@link Q.CreateEdgeInteraction} 以及创建路径交互 {@link Q.CreateShapeInteraction} 都继承自此类
   */
  export class DrawPathInteraction extends Q.DrawableInteraction {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);
  }

  /** 创建连线交互器 */
  export class CreateEdgeInteraction extends Q.DrawPathInteraction {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);
  }

  /** 创建图形交互监听器 */
  export class CreateShapeInteraction extends Q.DrawPathInteraction {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);
  }

  /** 创建线条交互监听器 */
  export class CreateLineInteraction extends Q.CreateShapeInteraction {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);
  }

  /** 简单连线交互监听器 */
  export class CreateSimpleEdgeInteraction extends Q.DrawPathInteraction {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);
  }

  /** 文本编辑器 */
  export class LabelEditor {}

  /** 编辑交互器，默认实现了快捷键删除图元的功能 */
  export class EditInteraction {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);
  }

  /** 调整大小交互器 */
  export class ResizeInteraction {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);
  }

  /** 平移交互器 */
  export class PanInteraction {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);
  }

  /** 点选交互器 */
  export class SelectionInteraction {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);
  }

  /** 节点移动交互器 */
  export class MoveInteraction {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);
  }

  /** 滚轮缩放交互器 */
  export class WheelZoomInteraction {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);
  }

  /** 双击交互器 */
  export class DoubleClickInteraction {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);
  }

  /** 图片导出交互器 */
  export class ExportInteraction {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);
  }

  /** 文本提示框交互器 */
  export class TooltipInteraction {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);

    destroy(): void;
  }

  /** 框选交互器 */
  export class RectangleSelectionInteraction {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);
  }

  /** 拐点编辑交互监听器 */
  export class PointsInteraction {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);
  }

  /**
   * 自动布局；
   * 根据节点的拓扑关系，父子关系或者其他关系，自动计算元素位置信息，实现图元的自动分布；
   */
  export class Layouter {
    /**
     *
     * @param graph
     */
    constructor(graph: Graph);

    /**
     * 获取节点范围
     * @param node 节点
     * @returns
     */
    getNodeBounds(node: Q.Node): Q.Rect;

    /**
     * 是否可以参与布局
     * @param node 节点
     * @param from
     * @returns
     */
    isLayoutable(node: Q.Node, from: any): boolean;

    /**
     * 获取布局结果；
     * 布局结果的格式为：{id: {x, y, node}}
     * @param params
     * @returns
     */
    getLayoutResult(params: object): object;

    /**
     * 设置节点坐标；
     * @returns
     * @param locations key 为节点 id，value 为节点位置信息；
     *     参考：{"10": {node: nodeA, x: 100, y: 100}}
     * @param byAnimate 是否使用动画
     * @param duration 动画时间
     * @param animationType 动画类型
     * @param callback 回调函数
     */
    updateLocations(
      locations: any,
      byAnimate?: boolean,
      duration?: number,
      animationType?: string,
      callback?: Function
    ): void;

    /**
     * 开始布局；
     * @param params
     * @param immediate
     * @returns
     */
    doLayout(params?: object, immediate?: boolean): any;
  }

  /**
   * 气泡布局器；
   * 气泡布局与树布局类似，适用于树图的展现，布局以圆形分布，是一种高效的布局类型；
   */
  export class BalloonLayouter extends Q.Layouter {
    /**
     *
     * @param graph
     * @param radius
     * @param gap
     * @param startAngle
     */
    constructor(graph: Graph, radius: number, gap: number, startAngle: number);
  }

  /**
   * 弹簧布局；
   * 静电斥力，弹簧拉力以及中心引力三力平衡，使得节点分离，达到一种动态分布效果；
   */
  export class SpringLayouter extends Layouter {
    /**
     * 每次模拟运动计算中的时间间隙数值；
     * 时间间隙越短模拟计算越准确，但递归次数也越多，默认值为：0.15；
     */
    timeStep: number;

    /**
     * 静电斥力系数；
     * 系数越大节点间距越大，默认值为 50；
     */
    repulsion: number;

    /**
     * 中心吸引力系数；
     * 系数越大，节点间距越小，默认值为 0.1；
     */
    attractive: number;

    /**
     * 弹性系数；
     * 系数越大弹性越强，默认值为 3；
     */
    elastic: number;

    /**
     *
     * @param graph
     */
    constructor(graph: Graph);

    /**
     * 设置布局节点初始信息，比如静电大小和初始速度；
     * @param node 节点图元
     * @param nodeInfo 布局节点初始信息
     */
    appendNodeInfo(node: Q.Node, nodeInfo: object): void;

    /**
     * 设置布局连线初始信息，比如弹性系数或者初始速度；
     * @param edge 连线图元
     * @param edgeInfo 布局连线初始信息
     */
    appendEdgeInfo(edge: Q.Node, edgeInfo: object): void;

    /**
     * 设置节点质量（质量越大，斥力越大）
     * @param node 节点图元
     * @param mass 质量，默认为 1；
     */
    setMass(node: Q.Node, mass?: number): void;

    /**
     * 设置弹性系数
     * @param edge 连线图元
     * @param k 弹性系数
     */
    setElasticity(edge: Q.Edge, k?: number): void;
  }

  /** 大小，尺寸 */
  export class Size {
    /** 宽度 */
    width: number;
    /** 高度 */
    height: number;

    /**
     *
     * @param width 宽度
     * @param height 高度
     */
    constructor(width: number, height: number);

    /**
     * 是否为空
     * @returns {boolean}
     */
    isEmpty(): boolean;

    /**
     * 克隆对象
     * @returns {Q.Size}
     */
    clone(): Size;
  }

  /** 坐标点对象 */
  export class Point {
    x: number;
    y: number;
    /** 旋转弧度 */
    rotate: number;

    /**
     *
     * @param x x坐标值
     * @param y y坐标值
     * @param rotate 旋转角度，弧度值
     */
    constructor(x: number, y: number, rotate: number);

    /**
     * 设置坐标数值
     * @param x
     * @param y
     * @param rotate
     */
    set(x: number, y: number, rotate: number): void;

    /** 坐标求反，x = -x, y = -y; */
    negate(): void;

    /**
     * 坐标偏移
     * @param dx
     * @param dy
     */
    offset(dx: number, dy: number): void;

    /**
     * 坐标是否相同
     * @param point
     * @returns {boolean}
     */
    equals(point: Point): boolean;

    /**
     * 两点间距
     * @param point
     * @returns {number}
     */
    distanceTo(point: Point): number;

    /**
     * 克隆坐标点对象
     * @returns {Q.Point}
     */
    clone(): Q.Point;
  }

  /**
   * 位置；
   * 用于描述相对位置信息，包含水平和垂直两个方向的位置属性，每个方向各有三种位置，组合成上下左右等九种位置；
   */
  export class Position {
    /** 垂直方向位置：上，中，下 */
    verticalPosition: string;
    /** 水平方向位置：左，中，右 */
    horizontalPosition: string;
    /** 缩写名 */
    sortName: string;
    /** 左上 */
    static readonly LEFT_TOP: Position;
    /** 左上 */
    static readonly LEFT_MIDDLE: Position;
    /** 左中 */
    static readonly LEFT_BOTTOM: Position;
    /** 上中 */
    static readonly CENTER_TOP: Position;
    /** 居中 */
    static readonly CENTER_MIDDLE: Position;
    /** 下中 */
    static readonly CENTER_BOTTOM: Position;
    /** 右上 */
    static readonly RIGHT_TOP: Position;
    /** 右中 */
    static readonly RIGHT_MIDDLE: Position;
    /** 右下 */
    static readonly RIGHT_BOTTOM: Position;
    /** 随机位置 */
    static readonly random: Position;

    constructor(h: string, v: string);
  }

  /** 矩形 */
  export class Rect extends Size {
    /** x位置 */
    x: number;
    /** y位置 */
    y: number;
    /** 左侧距离，同 {@link Q.Rect#x} */
    readonly left: number;
    /** 上方距离，同 {@link Q.Rect#y} */
    readonly top: number;
    /** 底部距离，等于top + height */
    readonly bottom: number;
    /** 右边距离，等于left + width */
    readonly right: number;
    /** 中心点x位置 */
    readonly cx: number;
    /** 中心点y位置 */
    readonly cy: number;
    /** 中心点坐标 */
    readonly center: object;

    /**
     *
     * @param x x位置
     * @param y y位置
     * @param w 宽度
     * @param h 高度
     */
    constructor(x: number, y: number, w: number, h: number);

    /**
     *
     * @param rect
     */
    constructor(rect: Q.Rect);

    /**
     *
     */
    constructor();

    /**
     * 根据传入的矩形对象，设置矩形的x, y, width, height
     * @param rect
     */
    setByRect(rect: Q.Rect): void;

    /**
     * 设置矩形的x, y, width, height
     * @param x
     * @param y
     * @param width
     * @param height
     */
    set(x: number, y: number, width: number, height: number): void;

    /**
     * 对矩形作偏移
     * @param dx x偏移量
     * @param dy y偏移量
     */
    offset(dx: number, dy: number): void;

    /**
     * 坐标点是否在矩形范围内
     * @param x
     * @param y
     * @returns {boolean}
     */
    contains(x: number, y: number): boolean;

    /**
     * 坐标点是否在矩形范围内
     * @param x
     * @param y
     * @param tolerance 容差值
     * @returns {boolean}
     */
    intersectsPoint(x: number, y: number, tolerance: number): boolean;

    /**
     * 两个矩形是否相交
     * @param x2 矩形x坐标
     * @param y2 矩形y坐标
     * @param width2 矩形宽度
     * @param height2 矩形高度
     * @returns {boolean}
     */
    intersectsRect(
      x2: number,
      y2: number,
      width2: number,
      height2: number
    ): boolean;

    /**
     * 坐标点是否在矩形范围内
     * @param x
     * @param y
     * @returns {boolean}
     */
    intersects(x: number, y: number): boolean;

    /**
     * 两个矩形的相交范围
     * @param x
     * @param y
     * @param w
     * @param h
     * @returns {Q.Rect} 相交范围
     */
    intersection(x: number, y: number, w: number, h: number): Q.Rect;

    /**
     * 增加矩形范围，使得矩形包含这个坐标点
     * @param point
     */
    addPoint(point: Point): void;

    /**
     * 增加矩形范围，使得矩形包含这个坐标点
     * @param newx
     * @param newy
     */
    add(newx: number, newy: number): void;
    /**
     * 增加矩形范围，使得矩形包含这个坐标点
     * @param rect
     */
    add(rect: Q.Rect): void;

    /**
     * 增加矩形范围，使得矩形包含传入的矩形范围
     * @param x
     * @param y
     * @param width
     * @param height
     */
    addRect(x: number, y: number, width: number, height: number): void;

    /**
     * 沿上左下右方向缩小矩形范围
     * @see Q.Rect#grow
     * @param top
     * @param left
     * @param bottom
     * @param right
     */
    shrink(top: number, left: number, bottom: number, right: number): void;

    /**
     * 沿上左下右方向扩展矩形范围，如果数值为负数，则表示矩形范围缩小
     * @param top
     * @param left
     * @param bottom
     * @param right
     */
    grow(top: number, left: number, bottom: number, right: number): void;

    /**
     * 合并矩形，返回一个新的矩形范围
     * @param rect 另一个矩形
     * @returns {Q.Rect} 合并后的新的矩形范围
     */
    union(rect: Q.Rect): Q.Rect;

    /** 清除矩形范围，宽高重置为-1 */
    clear(): void;

    /**
     * 判断两个矩形范围是否相同
     * @param rect 另一个矩形
     * @returns {boolean}
     */
    equals(rect: Q.Rect): boolean;

    /**
     * 获取线段与矩形的相交点
     * @param inX 矩形内线段端点
     * @param inY 矩形内线段端点
     * @param outX 矩形外线段端点
     * @param outY 矩形外线段端点
     * @returns {Q.Point}
     */
    getIntersectionPoint(
      inX: number,
      inY: number,
      outX: number,
      outY: number
    ): Q.Point;
  }

  /**
   * 间隙；
   * 包含上下左右四个数值，可用于描述内间距，外间距，扩展量；
   */
  export class Insets {
    /**
     *
     * @param top 上间距
     * @param left 左间距
     * @param bottom 下间距
     * @param right 右间距
     */
    constructor(top: number, left?: number, bottom?: number, right?: number);

    /** 上间距 */
    top: number;
    /** 下间距 */
    bottom: number;
    /** 左间距 */
    left: number;
    /** 右间距 */
    right: number;

    /**
     * 设置上左下右间距数值
     * @param top 上间距
     * @param left 左间距
     * @param bottom 下间距
     * @param right 右间距
     */
    set(top: number, left: number, bottom: number, right: number): void;

    /**
     * 克隆间距对象
     */
    clone(): Q.Insets;

    /**
     * 间距是否相同
     * @param o
     */
    equals(o: Q.Insets): boolean;
  }

  /** 事件 */
  export class Event {
    /** 事件派发对象 */
    source: any;

    /** 事件种类，比如属性变化事件中的属性名称 */
    kind: string;

    /** 事件类型，属性变化事件，或者集合变化事件 */
    type: string;

    /** 事件相关的数据对象，比如属性变化事件中的属性值 */
    value: any;

    /**
     *
     * @param source
     * @param type
     * @param kind
     * @param value
     */
    constructor(source: object, type: object, kind: object, value: object);
  }

  /** 属性变化事件 */
  export class PropertyChangeEvent extends Event {
    /**
     * 属性类型，对于{@link Q.Element}元素，属性默认分三种：accessor, style, client
     * @see Q.Consts.PROPERTY_TYPE_ACCESSOR
     * @see Q.Consts.PROPERTY_TYPE_STYLE
     * @see Q.Consts.PROPERTY_TYPE_CLIENT
     */
    propertyType?: number;
    /**
     * 属性名称，与 kind 属性相同
     * @see {@link Q.Event#kind}
     */
    propertyName: string;

    /**
     *
     * @param source 事件派发者
     * @param propertyName 属性名称
     * @param value 新的属性值
     * @param oldValue 修改前的属性值
     */
    constructor(
      source: object,
      propertyName: string,
      value: object,
      oldValue: object
    );
  }

  /**
   * 集合变化事件；
   * 添加，删除元素，调整元素次序或者清空集合时，派发该类事件；
   */
  export class ListEvent extends Event {
    /**
     * 元素添加事件
     * @see Q.Event.kind
     */
    static KIND_ADD: string;

    /**
     * 元素删除事件
     * @see Q.Event.kind
     */
    static KIND_REMOVE: string;

    /**
     * 清空集合事件
     * @see Q.Event.kind
     */
    static KIND_CLEAR: string;

    /**
     * 元素次序变化事件
     * @see Q.Event.kind
     */
    static KIND_INDEX_CHANGE: string;

    /** 序号，比如元素添加事件时，插入的位置 */
    index: number;

    /** 之前的序号，更改元素次序事件时，此参数表示元素原来的位置 */
    oldIndex: number;

    /** 事件对象 */
    data?: any;

    /**
     *
     * @param source 集合对象
     * @param kind 事件种类：
     * {@link Q.ListEvent.KIND_ADD}，
     * {@link Q.ListEvent.KIND_REMOVE}，
     * {@link Q.ListEvent.KIND_CLEAR}，
     * {@link Q.ListEvent.KIND_INDEX_CHANGE}
     * @param data 事件数据，比如元素添加事件时，这个参数为新添加的元素或者元素集合
     * @param index 序号，比如元素添加事件时，插入的位置
     * @param oldIndex 之前的序号，更改元素次序事件时，此参数表示元素原来的位置
     */
    constructor(
      source: object,
      kind: object,
      data: object,
      index: number,
      oldIndex: number
    );
  }

  /**
   * 事件处理器
   * 可以设置一个监听器，响应事件；
   */
  export class Handler {
    /** 监听器 */
    listener: Q.IListener | null;

    /**
     * 操作之前派发事件
     * @param e
     * @returns {boolean} 返回flase表示停止后面的操作
     */
    beforeEvent(e: Q.Event): boolean;

    /**
     * 派发事件
     * @param e
     */
    onEvent(e: Q.Event): void;
  }

  /**
   * 事件派发器
   * 相比 {@link Q.Handler}，可以添加和删除多个监听器；
   */
  export class Dispatcher extends Q.Handler {
    /** 监听器集合 */
    listeners: Array<Q.IListener> | null;

    /**
     * 添加监听器
     * @param listener
     * @param scope 作用域
     * @returns {Object} 返回内部生成的监听器对象（包含了作用域相关信息）
     */
    addListener(listener: Function | IListener, scope?: object): object;

    /**
     * 添加监听器
     * @param listener
     * @param scope 作用域
     * @returns {Object} 返回内部生成的监听器对象（包含了作用域相关信息）
     */
    on(listener: Function | IListener, scope?: object): object;

    /**
     * 删除监听器
     * @param listener
     * @param scope 作用域
     * @param keepScope 是否保留作用于对象，如果为false则delete 作用域对象
     */
    removeListener(
      listener: Function | IListener,
      scope?: object,
      keepScope?: boolean
    ): void;

    /**
     * 删除监听器
     * @param listener
     * @param scope 作用域
     * @param keepScope 是否保留作用于对象，如果为false则delete 作用域对象
     */
    un(
      listener: Function | IListener,
      scope?: object,
      keepScope?: boolean
    ): void;

    /**
     * 是否包含监听器
     * @param fn 监听器
     * @param scope 作用域
     * @returns {boolean}
     */
    contains(fn: Q.IListener, scope?: any): boolean;

    /**
     * 清除监听器
     */
    clear(): void;

    /**
     * 销毁，默认会清除所有监听器
     */
    destroy(): void;
  }

  /**
   * 扩展数组
   * 融合了hashmap与list的功能:
   */
  export class HashList {
    /** 数据集合 */
    datas: Array<any>;
    /** 元素数量 */
    length: number;
    /** 随机元素 */
    random: Q.Data;

    /**
     *
     * @param values
     */
    constructor(values: Array<any>);

    /**
     * 获取元素集合
     * @returns
     */
    toDatas(): Array<any>;

    /**
     * 遍历容器内的元素
     * @param call 回调函数
     * @param [scope] 函数作用域
     * @param [params] 其他传入参数
     */
    forEach(call: (item: any) => void, scope?: any, params?: any): void;

    /**
     * 反向遍历容器内的元素
     * @param call 回调函数
     * @param [scope] 函数作用域
     * @param [params] 其他传入参数
     */
    forEachReverse(call: (item: any) => void, scope?: any, params?: any): void;

    /**
     * 通过序号获取容器中的元素
     * @param index
     * @returns {Q.Data}
     */
    get(index: number): Q.Data;

    /**
     * 通过id获取容器内的元素
     * @param id
     * @returns {Q.Data}
     */
    getById(id: number): Q.Data;

    /**
     * 通过序号获取容器内的元素
     * @param index
     * @returns {Q.Data}
     */
    getByIndex(index: number): Q.Data;

    /** 获取容器内元素的数量 */
    size(): number;

    /** 清除所有元素 */
    clear(): void;
  }

  /**
   * 拖拽支持类；
   * 为HTML元素提供拖拽交互支持，支持鼠标和触摸事件；
   */
  export class DragSupport {
    /**
     *
     * @param html
     * @param listener 监听器
     * @param scope
     */
    constructor(html: HTMLElement, listener: object, scope?: object);
  }

  /** 路径片段 */
  export class PathSegment {
    /**
     *
     * @param type
     * @param points
     */
    constructor(type: object, points: object);
  }

  /**
   * 数据类
   * 用于描述数据元素，包含ID，父子关系，属性设置，事件派发等功能，是图元对象的基类
   */
  export class Data<P = any> extends Q.Handler {
    /** ID */
    id: number;
    /** 父节点 */
    parent: Q.Data;
    /** 孩子集合 */
    children: Q.HashList;
    /** 用户属性 */
    properties: P;
    /** 孩子数量 */
    childrenCount: number;

    /**
     * 设置属性，并派发属性变化事件
     * @see {@link Q.Data#get}
     * @param key
     * @param value
     * @returns {boolean} 如果新属性与原来的属性相同，或者属性设置失败，返回false
     */
    set(key: string, value: any): boolean;

    /**
     * 获取属性
     * @see {@link Q.Data#set}
     * @param key
     * @returns {object}
     */
    get(key: string): any;

    /**
     * 添加孩子，指定孩子序号
     * @see {@link Q.Data#onChildAdd}
     * @param child
     * @param index
     * @returns 如果添加失败，返回 false
     */
    addChild(child: Q.Data, index?: number): boolean;

    /**
     * 删除孩子
     * @see {@link Q.Data#onChildRemove}
     * @param child
     */
    removeChild(child: Q.Data): any;

    /**
     * 遍历孩子
     * @param call 回调函数
     * @param scope
     */
    forEachChild(call: Function, scope?: any): void;

    /**
     * 删除属性，从属性列表中删除某个属性
     * @param key
     */
    remove(key: string): void;

    /**
     * 添加孩子成功时，调用此方法
     * @param child
     * @param index
     */
    onChildAdd(child: Q.Data, index: number): void;

    /**
     * 孩子被删除时，调用此方法
     * @param child
     */
    onChildRemove(child: Q.Data): void;

    /**
     * 获取孩子集合
     */
    toChildren(): Array<Q.Data>;

    /**
     * 清除所有孩子元素
     * @see {@link Q.Data#onChildrenClear}
     */
    clearChildren(): void;

    /**
     * 清空孩子时，调用此方法
     * @param children 被清除的孩子集合
     */
    onChildrenClear(children: Array<Q.Data>): void;

    /**
     * 获取孩子的序号
     * @see {@link Q.Data#setChildIndex}
     * @param child
     * @returns 序号
     */
    getChildIndex(child: Q.Data): number;

    /**
     * 设置孩子序号
     * @see {@link Q.Data#setChildIndex}
     * @param child
     * @param index
     */
    setChildIndex(child: Q.Data, index: number): void;

    /**
     * 是否有孩子
     */
    hasChildren(): boolean;

    /**
     * 根据序号获取孩子
     * @param index 序号
     */
    getChildAt(index: number): Q.Data;

    /**
     * 是否是传入参数的孩子或者子孙节点
     * @param parent 父节点
     * @returns 是否子孙节点
     */
    isDescendantOf(parent: Q.Data): boolean;

    /**
     * 更换父节点时，调用此方法
     * @param oldParent 原来的父节点
     * @param newParent 新的父节点
     */
    onParentChanged(oldParent: Q.Data, newParent: Q.Data): void;

    /**
     * 派发属性变化事件
     * @param propertyName
     * @param value
     * @param oldValue
     * @param propertyType
     */
    firePropertyChangeEvent(
      propertyName: string,
      value: any,
      oldValue: any,
      propertyType: any
    ): any;
  }

  /** 数据容器 */
  export class DataModel extends Q.HashList {}

  /**
   * 图元容器
   * 用于存放和管理图形元素
   */
  export class GraphModel extends Q.DataModel {}

  /**
   * 选中容器
   * 用于存放和管理被选中的图元
   */
  export class SelectionModel extends Q.HashList {
    /**
     *
     * @param box 数据容器，选中容器中的元素都必须属于这个数据容器
     */
    constructor(box: Q.DataModel);

    /** 数据容器，选中容器中的元素都必须属于这个数据容器 */
    readonly box: Q.DataModel;

    /**
     * 是否被选中
     * @param data
     */
    isSelected(data: Q.Data): boolean;

    /**
     * 选中元素
     * @param data
     */
    select(data: Q.Data): void;

    /**
     * 取消选中
     * @param data
     */
    unselect(data: Q.Data): void;

    /**
     * 更改元素选中状态
     * @param data
     */
    reverseSelect(data: Q.Data): void;
  }

  /** 图元对象 */
  export class Element<P = any> extends Data<P> {
    /** 图元名称 */
    name: string;
    /** 类型 */
    type: string;
    /** 网元层次 */
    zIndex: number;
    /** 图元样式表 */
    styles: any;
    /** 图元绑定的所有子 UI 对象 */
    bindingUIs: Q.HashList;
    /** 提示文本，支持HTML文本内容 */
    tooltip: boolean | string;
    visible: boolean;

    /**
     *
     * @param name
     */
    constructor(name: string);

    /**
     * 获取样式属性
     * @param name 样式名称
     */
    getStyle(name: string): any;

    /**
     * 设置样式属性
     * @param name 样式名称
     * @param value 样式
     */
    setStyle(name: string, value: any): void;

    /**
     * 一次性设置多个样式属性
     * @param styles 样式属性对象
     * @param silent 不派发属性变化事件
     */
    putStyles(styles: any, silent?: boolean): void;

    /**
     * 挂载UI组件到图元组件{@link Q.ElementUI}
     *
     * @param ui
     * @param bindingProperties
     */
    addUI(ui: BaseUI, bindingProperties?: object): void;

    /**
     * 删除UI组件
     *
     * @param ui
     */
    removeUI(ui: BaseUI): any;

    /** 设置图元无效，用于刷新界面 */
    invalidate(): void;

    /**
     * 无效可见状态
     * @param onlySelf 是否只对自己无效，默认会对下面的孩子设置无效
     */
    invalidateVisibility(onlySelf?: boolean): void;
  }

  /**
   * 节点图元；
   * 可以设置图片，图形，挂载其他UI组件，对应的UI类为 {@link Q.NodeUI}；
   */
  export class Node<P = any> extends Element<P> {
    /** X坐标 */
    x: number;

    /** Y坐标 */
    y: number;

    /**
     * 节点图片
     * @see Q.ImageUI
     * @see Q.NodeUI
     */
    image: object | string;

    /** 节点旋转弧度 */
    rotate: number;

    /** 节点大小 */
    size: Size;

    /** 节点位置 */
    location: Q.Point;

    /** 挂载点位置，默认为居中 */
    anchorPosition: Position;

    /** 宿主节点 */
    host: Q.Node;

    /**
     *
     * @param name 名称
     * @param x
     * @param y
     */
    constructor(name: string, x?: number, y?: number);

    /**
     * 添加跟随者，节点拖动时，跟随者会随着宿主节点的移动而移动
     * @see {@link Q.Graph#moveElements}
     * @param follower
     */
    addFollower(follower: Q.Node): void;
  }

  /** 多边形图元 */
  export class ShapeNode<P = any> extends Q.Node<P> {
    constructor(name: object, path: Path);

    /**
     * 画线
     * @param x
     * @param y
     */
    lineTo(x: number, y: number): void;
  }

  /** 总线图元 */
  export class Bus extends ShapeNode {
    constructor(name: object, path: Path);
  }

  /** 分组图元类型 */
  export class Group<P = any> extends Q.Node<P> {
    /** 展开合并属性 */
    expanded: boolean;
    /** 分组内间隙 */
    padding: Q.Insets;

    /**
     *
     * @param name 名称
     * @param x
     * @param y
     */
    constructor(name: string, x?: number, y?: number);
  }

  /** 文本图元 */
  export class Text<P = any> extends Q.Node<P> {
    /**
     *
     * @param label 名称
     * @param x
     * @param y
     */
    constructor(label: string, x: number, y: number);
  }

  /** 连线图元 */
  export class Edge<P = any> extends Element<P> {
    /**
     * 连线类型
     * @see Q.Consts.EDGE_TYPE_
     */
    edgeType: string;

    /**
     * 是否允许捆绑
     * 默认为true
     */
    bundleEnabled: boolean;

    /**
     * 连线角度，
     * 在连线与总线相连时，连线可根据指定角度走向
     */
    angle: number;

    /** 起始端节点 */
    from: Node;

    /** 起始端代理节点 */
    fromAgent: Node;

    /** 结束端节点 */
    to: Node;

    /** 结束端代理节点 */
    toAgent: Node;

    /** 连线路径片段 */
    pathSegments: HashList;

    /**
     *
     * @param name 名称
     */
    constructor(name: string);

    /**
     *
     * @param from 起始节点
     * @param to 结束节点
     * @param name 名称
     */
    constructor(from: Node, to: Node, name: string);

    /**
     * 获取另一个节点
     * @param node 节点
     * @returns {Q.Node} 另一个节点
     */
    otherNode(node: Node): Node;

    /** 连接连线 */
    connect(): void;

    /** 断开连线 */
    disconnect(): void;

    /** 连线是否连接 */
    isConnected(): boolean;

    /** 连线是否可用 */
    isInvalid(): boolean;

    /**
     * 是否允许捆绑
     * @see {@link Q.Edge#hasPathSegments}
     * @see {@link Q.Edge#bundleEnabled}
     * @returns {boolean} 是否允许捆绑，如果#hasPathSegments()返回false，#bundleEnabled属性为true，则返回true
     */
    isBundleEnabled(): boolean;

    /** 是否是自环（起始和结束端为同一节点） */
    isLooped(): boolean;

    /**
     * 是否存在连线捆绑
     * @returns {boolean}
     */
    hasEdgeBundle(): boolean;

    /**
     * 获取连线捆绑
     * @param byAgentNode 代理节点的连线捆绑
     * @returns {Q.EdgeBundle}
     */
    getEdgeBundle(byAgentNode?: boolean): EdgeBundle;

    /**
     * 是否有路径片段，如果设置路径，连线将按路径走向
     * @returns {boolean}
     */
    hasPathSegments(): boolean;

    /**
     * 添加路径片段
     * @param points
     * @param type
     * @param index
     * @returns {boolean}
     */
    addPathSegment(points: Array<Point>, type: string, index: number): void;

    /**
     * 删除路径片段
     * @param pathSegment
     * @returns {object}
     */
    removePathSegment(pathSegment: PathSegment): object;

    /**
     * 移动路径片段
     * @param dx
     * @param dy
     * @param index
     */
    movePathSegment(dx: number, dy: number, index: number): void;

    /**
     * 移动连线拐点
     * @param dx
     * @param dy
     * @returns {object}
     */
    move(dx: number, dy: number): void;

    /**
     * 根据片段位置，删除路径片段
     * @param index
     */
    removePathSegmentByIndex(index: number): void;

    /**
     * 连线拐点发生了变化
     * @param pathSegment
     */
    firePathChange(pathSegment: PathSegment): void;

    /**
     * 生效连线捆绑状态
     * @returns {object}
     */
    validateEdgeBundle(): object;
  }

  /**
   * 连线捆绑；
   * 包含所有两节点之间相连的连线；
   */
  export class EdgeBundle {
    /**
     *
     * @param node1 一个节点
     * @param node2 另一个节点
     */
    constructor(node1: Node, node2: Node);
  }

  /** 图形组件类，可以添加各种图形元素（节点，连线，分组等），以及图形元素上挂载图形，实现丰富的图形展示效果，可以实现拓扑图，组织图，流程图，机房图等 */
  export class Graph {
    /**
     * 画布导航类型，图形组件的默认导航类型；
     * 支持三种导航模式：滚动条，导航按钮，无；
     * @see {@link Q.Consts.NAVIGATION_BUTTON}
     * @see {@link Q.Consts.NAVIGATION_SCROLLBAR}
     */
    navigationType: string;
    /** 样式列表 */
    styles: any;
    /** 默认缩放动画 */
    zoomAnimation: any;
    /**
     * 是否启用提示信息；
     * 默认为true；
     */
    enableTooltip: boolean;
    /**
     * 是否激活双击空白画布纵览显示功能；
     * 默认为true；
     */
    enableDoubleClickToOverview: boolean;
    /** 是否启用鼠标右键框选交互； */
    enableRectangleSelectionByRightButton: boolean;
    /** 画布当前缩放比例 */
    scale: number;
    /** 画布的ratio值,在retina屏幕等高分辨率屏幕下,屏幕上一点可能有几个像素绘制而成,这时候qunee会对画布相应的缩放,以适应高分屏的显示 */
    ratio: number;
    /**
     * 初始坐标原点位于屏幕中心
     * 默认为true，如果希望延续传统的左上角为坐标原点，可设置该属性为false
     */
    originAtCenter: boolean;
    /** 能否编辑 */
    editable: boolean;
    /** 是否使用惯性动画 */
    enableInertia: boolean;
    /**
     * 是否启用鼠标滚轮缩放
     * 默认为true，对于移动平台无效
     */
    enableWheelZoom: boolean;
    /**
     * 交互动画时,是否延迟绘制画布
     * 默认为true,在缩放交互时,画布并不会立即绘制,而是先响应画布交互,等交互结束时重新绘制界面,此属性可以提高缩放操作时画布的响应效率;
     * 但是在某些浏览器下或者是Qunee与其他组件叠合时,可能出现交互过程中坐标不一致或者闪烁的问题,这时候可以将此属性设置为false
     */
    delayedRendering: boolean;
    /**
     * 全刷新模式
     * 特殊情况下使用
     */
    fullRefresh: boolean;
    /** 画布鼠标手势 */
    cursor: string;
    /** 交互模式名称 */
    interactionMode: string;
    /** 画布的最大缩放比例 */
    maxScale: number;
    /** 画布最小缩放比例 */
    minScale: number;
    /** 画布变换矩阵的x坐标偏移量 */
    tx: number;
    /** 画布变换矩阵的y坐标偏移量 */
    ty: number;
    /** 图元数量 */
    readonly count: number;
    /** 中心点逻辑坐标 */
    readonly center: object;
    /** 画布组件宽度，使用屏幕坐标 */
    width: number;
    /** 画布组件高度，使用屏幕坐标 */
    height: number;
    /** 鼠标滚轮缩放时的缩放步进倍数 */
    scaleStep: number;
    /**
     * 画布的HTML元素
     * @see {@link Q.Graph#html}
     */
    canvasPanel: HTMLElement;
    /**
     * 画布所在HTML元素的父节点
     * 即{@link Q.Graph#canvasPanel}的父节点
     * @see {@link Q.Graph#html}
     */
    html: HTMLElement;
    /** 图元管理容器 */
    graphModel: GraphModel;
    /** 选中图元管理容器 */
    selectionModel: SelectionModel;
    /**
     * 画布中图元的范围，采用画布逻辑坐标
     * @see {Q.Graph#toLogical}
     */
    bounds: Q.Rect;
    /** 限制画布显示范围，画布视口不会超出这个范围 */
    limitedBounds: Q.Rect;
    /**
     * 画布视口范围
     * 采用画布逻辑坐标
     */
    viewportBounds: Q.Rect;
    /** 拓扑图属性变化事件派发器 */
    propertyChangeDispatcher: Dispatcher;
    /** 网元集合变化事件派发器 */
    listChangeDispatcher: Dispatcher;
    /** 网元属性变化事件派发器 */
    dataPropertyChangeDispatcher: Dispatcher;
    /** 元素选中状态变化事件派发器 */
    selectionChangeDispatcher: Dispatcher;
    /** 父亲节点变化事件派发器 */
    parentChangeDispatcher: Dispatcher;
    /** 孩子节点层次变化事件派发器 */
    childIndexChangeDispatcher: Dispatcher;
    /**
     * 交互事件派发器
     * 通过这个派发器可以监听交互事件
     */
    interactionDispatcher: Dispatcher;

    /** 图元是否可以拖动，默认返回true */
    isMovable: (element: Q.Element) => boolean;

    /** 元素是否可以编辑 */
    isEditable: (element: Q.Element) => boolean;

    /** 元素是否可以选中 */
    isSelectable: (element: Q.Element) => boolean;

    /** 元素是否可以调整大小 */
    isResizable: (element: Q.Element) => boolean;

    /** 元素是否可以旋转 */
    isRotatable: (element: Q.Element) => boolean;

    /** 元素是否可见，默认返回 true； */
    isVisible: (element: Q.Element) => boolean;

    /** 可见过滤器 */
    visibleFilter: (element: Q.Element) => boolean;

    /**
     *
     * @param el 图形组件所在的HTML节点，或者HTML元素的id属性
     * @param graphModel
     */
    constructor(el: HTMLElement | string, graphModel?: GraphModel);

    /**
     * 添加图元
     * @param element
     * @param withChildren
     */
    addElement(element: Q.Element, withChildren?: boolean): void;

    /**
     * 通过界面交互删除选中图元
     * @para e
     */
    removeSelectionByInteraction(e: MouseEvent): void;

    /**
     * 开始文本编辑
     * @param element 当前编辑的图元
     * @param label 当前点击的文本组件（LabelUI）
     * @param labelEditor 文本编辑器
     * @param xy 当前鼠标点位置
     */
    startLabelEdit(
      element: object,
      label: object,
      labelEditor: object,
      xy: object
    ): void;

    /** 交互动画结束时，会回调此函数 */
    onAnimationEnd(): void;

    /**
     * 图元通过界面交互被创建时，会回调此函数
     * @param element
     * @param e
     * @param dragInfo
     */
    onElementCreated(element: Q.Element, e: MouseEvent, dragInfo: any): void;

    /**
     * 画布属性发生变化
     * @param type 属性类型
     * @param listener
     * @param scope
     */
    onPropertyChange(type: string, listener: any, scope?: any): void;

    /**
     * 编辑状态时，响应元素拖入事件，实现拖拽创建节点
     * @param e
     */
    ondrop(e: MouseEvent): void;

    /** 清除图元的选中状态 */
    unSelectAll(): void;

    /**
     * 添加用户交互
     * @param interaction 交互监听器
     */
    addCustomInteraction(interaction: object): void;

    /** 更新画布视口，当画布所在的HTML元素尺寸发生变化时，通常画布大小也需要做调整，以布满整个容器，这时可以调用此方法，默认在网页窗口变化时会自动调用此方法 */
    updateViewport(): void;

    /**
     * 移动到中心，设置会在下次绘制时生效
     * @param scale 缩放比例
     * @param byAnimate 动画参数
     */
    moveToCenter(scale?: number, byAnimate?: boolean): void;

    /**
     * 指定缩放点为中心缩小
     * @param px 缩放中心点x坐标
     * @param py 缩放中心点y坐标
     * @param byAnimate 动画参数
     * @param callback
     */
    zoomOut(
      px?: number,
      py?: number,
      byAnimate?: object,
      callback?: Function
    ): void;

    /**
     * 指定缩放点为中心放大
     * @param px 缩放中心点x坐标
     * @param py 缩放中心点y坐标
     * @param byAnimate 动画参数
     * @param callback
     */
    zoomIn(
      px?: number,
      py?: number,
      byAnimate?: object,
      callback?: Function
    ): void;

    /**
     * 通过缩放和平移画布，使得图元全部显示在画布内，如果此时缩放比例小于图的最小缩放比例，则取最小缩放比例，居中显示，设置结果会在下次绘制时生效
     * @param byAnimate 是否使用动画
     * @param maxScale 最大缩放比例
     * @param f
     */
    zoomToOverview(byAnimate?: boolean, maxScale?: number, f?: boolean): void;

    /**
     * 通过id获取图元
     * @param id
     * @returns {Q.Element}
     */
    getElement(id: number | string): Q.Element;

    /**
     * 获取拖拽信息，默认使用JSON.parse(...)解析传入的数据，但是这只支持基本数据对象，如果需要拖拽复杂的信息，比如渐变对象（Q.Gradient），可以通过自定义解析
     * @param e 拖拽鼠标事件
     * @param text 拖拽字符串
     * @returns {Object} 返回拖拽信息对象，默认使用JSON.parse(...)解析传入的数据
     */
    getDropInfo(e: MouseEvent, text: string): object | string;

    /**
     * 获取图元样式属性
     * @param element 图元
     * @param name 样式名称
     * @returns 样式值
     */
    getStyle(element: Q.Element, name: string): any;

    /**
     * 获取默认样式
     * @param name 样式名称
     * @returns 样式值
     */
    getDefaultStyle(name: string): any;

    /**
     * 遍历所有网元
     * @param call
     * @param scope
     */
    forEach(call: Function, scope?: object): void;

    /**
     * 设置当前选中图元，原来的选中信息会被清除
     * @param data 图元或者图元集合
     */
    setSelection(data: object): void;

    /**
     * 将图元移到上层显示，默认点击选中图元时会调用此方法
     * @param element
     */
    sendToTop(element: Q.Element): void;

    /**
     * 获取图元UI的范围
     * @param element 图元对象
     * @returns {Q.Rect}
     */
    getUIBounds(element: Q.Element): Q.Rect;

    /**
     * 以指定位置为中心
     * @param cx 中心点x坐标
     * @param cy 中心点y坐标
     * @param scale 缩放比例
     * @param byAnimate 动画参数
     * @param callback
     */
    centerTo(
      cx: number,
      cy: number,
      scale?: number,
      byAnimate?: boolean,
      callback?: Function
    ): void;

    /**
     * 获取鼠标点位置的图元对象
     * @param e
     * @returns {Q.Element}
     */
    getElementByMouseEvent(e: MouseEvent): Q.Element;

    /**
     * 获取鼠标点位置的图元UI对象
     * @see Q.Graph#getElementByMouseEvent
     * @see Q.Graph#hitTest
     * @para e
     * @returns {Q.Element}
     */
    getUIByMouseEvent(e: MouseEvent): Q.ElementUI;

    /**
     * 获取图元的提示文本，支持 HTML 格式，默认取图元的 tooltip 或者 name 属性
     * @see Q.Graph#enableTooltip
     * @param element
     * @returns {Q.Element}
     */
    getTooltip(element: Q.Element): string;

    /**
     * 获取鼠标点位置的UI对象
     * @param e
     * @returns {Q.BaseUI}
     */
    hitTest(e: MouseEvent): Q.BaseUI;

    /**
     * 将画布导出成图片，返回图片数据（字符串）和图片宽高
     * @param scale 缩放比例
     * @param clipBounds 导出范围
     * @returns {Object} {data: imageData, width: imageWidth, height: imageHeight}
     */
    exportImage(
      scale?: number,
      clipBounds?: Q.Rect
    ): { data: string; width: number; height: number };

    /** 清除图元集合 */
    clear(): void;

    /**
     * 销毁画布；
     * 删除组件时，调用此方法可以移除鼠标键盘或者触控监听，移除孩子节点等，释放内存；
     */
    destroy(): void;

    /**
     * 延迟调用，在画布下次绘制时调用
     * @param call 回调函数
     * @param scope 作用域
     * @param delay 延迟时间
     */
    callLater(call: Function, scope?: object, delay?: number): void;

    /**
     * 创建连线图元
     * @param name 连线名称
     * @param from 连线起始端
     * @param to 连线结束端
     * @returns {Q.Edge}
     */
    createEdge(name?: string | null, from?: Node, to?: Node): Edge;

    /**
     * 创建节点对象
     * @param name 节点名称
     * @param x 节点X位置
     * @param y 节点Y位置
     * @returns {Q.Node}
     */
    createNode(name?: string | null, x?: number, y?: number): Node;

    /**
     * 创建文本节点
     * @param name 节点名称
     * @param x 节点X位置
     * @param y 节点Y位置
     * @returns {Q.Node}
     */
    createText(name?: string | null, x?: number, y?: number): Node;

    /**
     * 创建分组节点
     * @param name 节点名称
     * @param x 节点X位置
     * @param y 节点Y位置
     * @returns {Q.Group}
     */
    createGroup(name?: string | null, x?: number, y?: number): Group;

    /**
     * 创建多边形
     * @param name 节点名称
     * @param path
     * @param x 节点X位置
     * @param y 节点Y位置
     * @returns
     */
    createShapeNode(
      name?: string | null,
      path?: string,
      x?: number,
      y?: number
    ): Q.ShapeNode;

    /**
     * 画布屏幕坐标转换成画布逻辑坐标
     * @param e 鼠标事件
     * @returns {Q.Point} 逻辑坐标
     */
    globalToLocal(e: MouseEvent): Q.Point;

    /**
     * 逻辑坐标转换为画布坐标
     * @param x
     * @param y
     * @returns {Q.Point}
     */
    toCanvas(x: number, y: number): Q.Point;

    /**
     * 画布坐标转换成逻辑坐标
     * @param x
     * @param y
     * @returns {Q.Point}
     */
    toLogical(x: number, y: number): Q.Point;

    /** 使画布无效，重新绘制 */
    invalidate(): void;

    /**
     * 删除网元
     * @param element
     * @returns {Q.Element}
     */
    removeElement(element: Q.Element): Q.Element;

    /**
     * 解析 JSON 数据
     * @param json
     * @returns {object}
     */
    parseJSON(json: any): any;

    /**
     * 导出 JSON
     * @param obj
     * @param toString
     * @returns {object}
     */
    exportJSON(obj?: object, toString?: Function): object;

    /**
     * 无效图元，用于刷新图元显示状态
     * @returns
     */
    invalidateElement(element: Q.Element): void;

    /**
     * 无效图元的可见状态，切换子网时，系统内部会调用此方法，以便重新确定图元的可见状态
     * @returns
     */
    invalidateVisibility(): any;

    /**
     * 判断图元是否被选中
     * @param element 图元
     */
    isSelected(element: Q.Element): boolean;

    /**
     * 是否可以作为连线的起始节点
     * @param node
     */
    canLinkFrom(node: Q.Node): boolean;

    /**
     * 是否可以作为连线的结束节点
     * @param node
     */
    canLinkTo(node: Q.Node): boolean;

    /**
     * 平移
     * @param tx x方向平移量
     * @param ty y方向平移量
     * @param byAnimate 动画参数
     */
    translate(tx: number, ty: number, byAnimate?: boolean): void;

    /**
     * 平移到指定位置
     * @param tx x方向平移量
     * @param ty y方向平移量
     * @param scale 缩放比例
     * @param byAnimate 动画参数
     * @param callback
     */
    translateTo(
      tx: number,
      ty: number,
      scale: number,
      byAnimate?: object,
      callback?: Function
    ): void;

    /**
     * 按指定位置缩放
     * @param scale
     * @param px
     * @param py
     * @param byAnimate
     * @param callback
     */
    zoomAt(
      scale: number,
      px: number,
      py: number,
      byAnimate?: object,
      callback?: Function
    ): void;

    /** 停止平移或者缩放动画 */
    stopAnimation(): object;

    /**
     * 根据图元获取对应的图元UI对象
     * @param element 图元
     */
    getUI(element: Q.Element): Q.ElementUI;

    /**
     * 获取鼠标点位置的图元UI对象
     * @see Q.Graph#getElementByMouseEvent
     * @see Q.Graph#hitTest
     *
     * @param e 鼠标事件
     */
    getUIByMouseEvent(e: MouseEvent): Q.ElementUI;

    /**
     * 无效图元 UI
     * @param ui
     */
    invalidateUI(ui: object): object;

    /**
     * 遍历所有可见的图元 UI 对象
     * @param call 回调函数
     * @param scope
     */
    forEachVisibleUI(call: Function, scope?: object): void;

    /**
     * 反向遍历所有可见的图元 UI 对象
     * @param call 回调函数
     * @param scope
     */
    forEachReverseVisibleUI(call: Function, scope?: object): object;

    /**
     * 遍历所有的图元 UI 对象
     * @param call 回调函数
     * @param scope
     */
    forEachUI(call: Function, scope?: object): object;

    /**
     * 反向遍历所有的图元 UI 对象
     * @param call 回调函数
     * @param scope
     */
    forEachReverseUI(call: Function, scope?: object): object;

    /**
     * 根据图元名称获取第一个找到的图元对象
     * @param name
     */
    getElementByName(name: string): Q.Element;

    /**
     * 画布获取焦点
     * @param withoutScroll 网页中，元素获取焦点时会自动移动到可见范围，设置该选项可以避免自动滚动
     */
    focus(withoutScroll?: boolean): void;

    /**
     * 增加选中图元
     * @param data 图元或者图元集合
     */
    select(data: object): void;

    /**
     * 取消图元的选中状态
     * @param data 图元或者图元集合
     */
    unselect(data: object): void;

    /**
     * 更改图元的选中状态，原来被选中的取消选中，原来不被选中的设置为被选中
     * @param data 图元
     */
    reverseSelect(data: Q.Element): void;

    /** 全选 */
    selectAll(): void;

    /** 清除图元的选中状态 */
    unselectAll(): void;

    /**
     * 置底显示
     * @param element
     */
    sendToBottom(element: Q.Element): void;

    /**
     * 移动图元，以及相关的图元，比如跟随节点，分组下面的连线，或者连线两端都移动时该连线也会被移动，保证相对位置的正确
     * @param elements 图元集合
     * @param dx x方向移动距离
     * @param dy y方向移动距离
     */
    moveElements(elements: Array<Q.Element>, dx: number, dy: number): void;

    /** 删除选中图元 */
    removeSelection(): void;

    /**
     * 通过界面交互创建多边形，在创建多边形交互模式下时，会回调此函数
     * @see Q.Consts.INTERACTION_MODE_CREATE_SHAPE
     *
     * @param e
     * @param pathSegments
     * @param x
     * @param y
     *
     * @returns
     */
    createShapeByInteraction(
      e: object,
      pathSegments: Array<any>,
      x: number,
      y: number
    ): Q.ShapeNode;

    /**
     * 通过界面交互创建线条，在创建多线段交互模式下时，会回调此函数
     * @see Q.Consts.INTERACTION_MODE_CREATE_LINE
     *
     * @param e
     * @param pathSegments
     * @param x
     * @param y
     *
     * @returns
     */
    createLineByInteraction(
      e: object,
      pathSegments: Array<any>,
      x: number,
      y: number
    ): Q.ShapeNode;

    /**
     * 通过界面交互创建连线
     *
     * @param start
     * @param end
     * @param e
     * @param pathSegments
     *
     * @returns
     */
    createEdgeByInteraction(
      start: Q.Point,
      end: Q.Point,
      e: MouseEvent,
      pathSegments: Array<any>
    ): Q.ShapeNode;

    /**
     * 设置当前交互模式，并传递定制的交互参数，
     * 在交互监听器中可以通过 graph.interactionProperties 来获取
     *
     * @param mode
     * @param interactionProperties
     */
    setInteractionMode(mode: string, interactionProperties: Array<any>): void;
  }

  export class GridBackground {
    constructor(graph: Q.Graph);
  }

  export class Overview {
    constructor(element: HTMLElement, graph: Q.Graph);

    public setVisible(visible: boolean): void;

    public setGraph(graph: Q.Graph): void;
  }

  /** 图形路径 */
  export class Path {
    /** 线条端点样式 */
    lineCap: string;
    /** 线条连接点样式 */
    lineJoin: string;

    /**
     *
     * @param segments 路径片段集合
     */
    constructor(segments?: Array<any>);

    /**
     * 移动画笔
     * @see CanvasRenderingContext2D#moveTo
     * @param x
     * @param y
     */
    moveTo(x: number, y: number): void;

    /**
     * 画线
     * @see CanvasRenderingContext2D#lineTo
     * @param x
     * @param y
     */
    lineTo(x: number, y: number): void;

    /**
     * 二次贝塞尔曲线
     * @see CanvasRenderingContext2D#quadraticCurveTo
     * @param cpx
     * @param cpy
     * @param x
     * @param y
     */
    quadTo(cpx: number, cpy: number, x: number, y: number): void;

    /**
     * 三次贝塞尔曲线
     * @see CanvasRenderingContext2D#bezierCurveTo
     * @param cpx1
     * @param cpy1
     * @param cpx2
     * @param cpy2
     * @param x
     * @param y
     */
    curveTo(
      cpx1: number,
      cpy1: number,
      cpx2: number,
      cpy2: number,
      x: number,
      y: number
    ): void;

    /**
     * 弧线
     * @param x1
     * @param y1
     * @param x2
     * @param y2
     * @param radius
     */
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;

    /**
     * 闭合路径
     * @see CanvasRenderingContext2D#closePath
     */
    closePath(): void;
  }

  /** 基本UI类，是其他UI类的基类 */
  export class BaseUI {
    /** UI组件对应的数据对象 */
    data: object | string;
    /** 标签编码 */
    code: string;
    /** 边框宽度 */
    border: number;
    /** 是否显示 */
    visible: boolean;
    /** 边框颜色 */
    borderColor: string;
    /** 背景颜色 */
    backgroundColor: object | string;
    /** 边框圆角 */
    borderRadius: number;
    /** 边框虚线样式 */
    borderLineDash: Array<number>;
    /** 边框虚线偏移量 */
    borderLineDashOffset: number;
    /** 是否同步选中状态，既父容器被选中则自己也被选中，默认为：同步 */
    syncSelection: boolean;
    /** 置顶显示 */
    showOnTop: boolean;
    /** 是否显示箭头 */
    showPointer: boolean;
    /** 是否同步选中样式，与父容器的选中样式相同，默认为：同步 */
    syncSelectionStyles: boolean;
    /** 原始范围 */
    originalBounds: Q.Rect;
    /** 父节点 */
    parent: BaseUI;
    /** 箭头大小 */
    pointerWidth: number;
    /** 停靠位置 */
    position: Position;
    /**  锚点位置 */
    anchorPosition: Position;
    /** 横坐标偏移 */
    offsetX: number;
    /** 纵坐标偏移 */
    offsetY: number;
    /** 内边距 */
    padding: number | Rect;
    /** 是否旋转 */
    rotatable: boolean;
    /** 旋转弧度 */
    rotate: number;
    /** 阴影颜色 */
    shadowColor: string;
    /** 阴影模糊距离 */
    shadowBlur: number;

    /**
     *
     * @param data 对应的数据元素对象，比如一个NodeUI对象对应一个Node对象，这个Node对象就是这个UI类的数据对象
     */
    constructor(data: object);

    /** 无效UI组件 */
    invalidate(): void;

    /** 获取组件范围 */
    getBounds(): Q.Rect;
  }

  /** 图元组件，对应的数据对象为 {@link Q.Element} */
  export class ElementUI extends BaseUI {
    /**
     * 图元UI组件范围,该属性与{@link Q.ElementUI#uiBounds}类似,两者都能反映UI组件的范围大小,区别是后者为相对坐标,前者为绝对坐标
     * @see {@link Q.ElementUI#uiBounds}
     * @example
     *   var hello = graph.createNode("Hello", 100, 100);
     *     hello.image = Q.Graphs.server;
     *     hello.rotate = 0.4;
     *     graph.callLater(function(){
     *       var bounds = graph.getUI(hello).bounds;
     *       Q.log(bounds.toString())
     *    })
     * 输出结果: 65.70861828586547 , 70.79394504440262 , 66.97513929902449 , 75.67538822483633
     * @type Q.Rect
     */
    bounds: Q.Rect;

    /** 图元组件主体 */
    body: Q.BaseUI;

    /** 图元组件所在的画布容器 */
    graph: Q.Graph;

    /**
     *
     * @param data 对应的数据元素对象
     * @param graph
     */
    constructor(data: Q.Element, graph: Graph);
  }

  /** 节点组件 */
  export class NodeUI extends ElementUI {
    /**
     *
     * @param node
     * @param graph
     */
    constructor(node: Node, graph: Graph);
  }

  /** 连线组件 */
  export class EdgeUI extends Q.ElementUI {
    /**
     *
     * @param edge
     * @param graph
     */
    constructor(edge: Edge, graph: Graph);
  }

  /** 文本标签组件 */
  export class LabelUI<P = any> extends Q.BaseUI {
    /** 字体颜色 */
    color: string;
    /** 字体大小 */
    fontSize: number;
    /** 字体名称 */
    fontFamily: string;
    /** 字体样式 */
    fontStyle: string;
    /** 文本对齐方式 */
    alignPosition: Q.Position;
    /** 字体 */
    font: string;
    /** 尺寸 */
    size: Q.Size;
    /** 用户属性 */
    properties: P;

    /**
     *
     * @param data
     */
    constructor(data?: object);
  }

  /**
   * 图片组件；
   * 支持栅格图片如：png, jpg, gif(不支持动画)，或者图形对象 {@link Q.Path}，或者是任意实现了 {@link Q.IDrawable} 接口的对象；
   */
  export class ImageUI extends Q.BaseUI {
    /**
     *
     * @param data
     */
    constructor(data: object);
  }

  export class TableUI extends Q.BaseUI {}

  /*
   * ####################################################################################################
   * 命名空间
   * ####################################################################################################
   */

  /** 常量 */
  export namespace Consts {
    /** 线条端点（线帽）样式，圆形边缘 */
    export const LINE_CAP_TYPE_ROUND: string;
    /** 角度按需分布，适用于{Q.BalloonLayouter} */
    export const ANGLE_SPACING_PROPORTIONAL: any;
    /**
     * 导航按钮模式
     * @see {@link Q.Graph#navigationType}
     */
    export const NAVIGATION_BUTTON: any;
    /**
     * 滚动条导航模式
     * @see {@link Q.Graph#navigationType}
     */
    export const NAVIGATION_SCROLLBAR: any;
    /**
     * 无导航模式
     * @see {@link Q.Graph#navigationType}
     */
    export const NAVIGATION_NONE: any;
    /**
     * 阴影选中类型
     * @see Q.Styles.SELECTION_TYPE
     */
    export const SELECTION_TYPE_SHADOW: any;
    /** 统一半径模式，适用于 {@link Q.BalloonLayouter} */
    export const RADIUS_MODE_UNIFORM: any;
    /** 混合模式，正片叠底 */
    export const BLEND_MODE_MULTIPLY: any;
    /** 混合模式，变暗 */
    export const BLEND_MODE_DARKEN: any;
    /** 混合模式，颜色叠加 */
    export const BLEND_MODE_COLOR_BURN: any;
    /** 混合模式，线性叠加 */
    export const BLEND_MODE_LINEAR_BURN: any;
    /** 混合模式，变亮 */
    export const BLEND_MODE_LIGHTEN: any;
    /** 混合模式，屏幕 */
    export const BLEND_MODE_SCREEN: any;
    /** 混合模式，灰度染色 */
    export const BLEND_MODE_GRAY: any;
    /** 用户属性 */
    export const PROPERTY_TYPE_CLIENT: any;

    /** 创建连线模式 */
    export const INTERACTION_MODE_CREATE_EDGE: string;

    /** 交互模式：默认 */
    export const INTERACTION_MODE_DEFAULT: string;

    /** 三角形 */
    export const SHAPE_TRIANGLE: string;
    /** 开放箭头 */
    export const SHAPE_ARROW_OPEN: string;
    /** 圆形 */
    export const SHAPE_CIRCLE: string;
    /** 矩形 */
    export const SHAPE_RECT: string;
    /** 圆角矩形 */
    export const SHAPE_ROUNDRECT: string;
    /** 星形 */
    export const SHAPE_STAR: string;
    /** 六边形 */
    export const SHAPE_HEXAGON: string;
    /** 五边形 */
    export const SHAPE_PENTAGON: string;
    /** 斜方形 */
    export const SHAPE_TRAPEZIUM: string;
    /** 斜平行四边形 */
    export const SHAPE_RHOMBUS: string;
    /** 平行四边形 */
    export const SHAPE_PARALLELOGRAM: string;
    /** 心形 */
    export const SHAPE_HEART: string;
    /** 菱形 */
    export const SHAPE_DIAMOND: string;
    /** 十字形 */
    export const SHAPE_CROSS: string;
    /** 标准箭头 */
    export const SHAPE_ARROW_STANDARD: string;
    export const SHAPE_ARROW_1: string;
    export const SHAPE_ARROW_2: string;
    export const SHAPE_ARROW_3: string;
    export const SHAPE_ARROW_4: string;
    export const SHAPE_ARROW_5: string;
    export const SHAPE_ARROW_6: string;
    export const SHAPE_ARROW_7: string;
    export const SHAPE_ARROW_8: string;

    /**
     * 图片调整类型之垂直翻转
     * @example
     *     node.setStyle(Q.Styles.IMAGE_ADJUST, Q.Consts.IMAGE_ADJUST_FLIP);
     * @see Q.Styles.IMAGE_ADJUST
     */
    export const IMAGE_ADJUST_FLIP: string;

    /**
     * 图片调整类型之水平翻转
     * @example
     *     node.setStyle(Q.Styles.IMAGE_ADJUST, Q.Consts.IMAGE_ADJUST_MIRROR);
     * @see Q.Styles.IMAGE_ADJUST
     */
    export const IMAGE_ADJUST_MIRROR: string;

    /**
     * 矩形边框选中类型
     * @see Q.Styles.SELECTION_TYPE
     */
    export const SELECTION_TYPE_BORDER_RECT: string;

    /**
     * 边框选中类型
     * @see Q.Styles.SELECTION_TYPE
     */
    export const SELECTION_TYPE_BORDER: string;
    /** SVG名称空间，用于创建SVG元素 */
    export const NS_SVG: any;
    /**
     * 直接属性
     * @example
     *     node.name = "hello";
     */
    export const PROPERTY_TYPE_ACCESSOR: any;
    /**
     * 样式属性
     * @example
     *     node.setStyle(Q.Styles.LABEL_OFFSET_X, 10);
     */
    export const PROPERTY_TYPE_STYLE: any;
    /**
     * 默认连线类型
     * @see Q.Edge#edgeType
     */
    export const EDGE_TYPE_DEFAULT: any;
    /**
     * 肘形连线类型
     * @see Q.Edge#edgeType
     */
    export const EDGE_TYPE_ELBOW: any;
    /** 水平方向肘形连线类型 */
    export const EDGE_TYPE_ELBOW_HORIZONTAL: any;
    /** 垂直方向肘形连线类型 */
    export const EDGE_TYPE_ELBOW_VERTICAL: any;
    /** 正交连线类型 */
    export const EDGE_TYPE_ORTHOGONAL: any;
    /** 水平方向正交连线类型 */
    export const EDGE_TYPE_ORTHOGONAL_HORIZONTAL: any;
    /** 垂直方向正交连线类型 */
    export const EDGE_TYPE_ORTHOGONAL_VERTICAL: any;
    /** 水平L形连线类型 */
    export const EDGE_TYPE_HORIZONTAL_VERTICAL: any;
    /** 垂直L形连线类型 */
    export const EDGE_TYPE_VERTICAL_HORIZONTAL: any;
    /** 弓形连线类型，方向向上 */
    export const EDGE_TYPE_EXTEND_TOP: any;
    /** 弓形连线类型，方向向左 */
    export const EDGE_TYPE_EXTEND_LEFT: any;
    /** 弓形连线类型，方向向下 */
    export const EDGE_TYPE_EXTEND_BOTTOM: any;
    /** 弓形连线类型，方向向右 */
    export const EDGE_TYPE_EXTEND_RIGHT: any;
    /** Z形连线类型 */
    export const EDGE_TYPE_ZIGZAG: any;
    /**
     * 无连线拐角，适用于Consts.EDGE_TYPE_ORTHOGONAL***类型的连线
     * @see Q.Edge#edgeType
     * @see Q.Styles.EDGE_CORNER
     */
    export const EDGE_CORNER_NONE: any;
    /**
     * 圆角样式，适用于Consts.EDGE_TYPE_ORTHOGONAL***类型的连线
     * @see Q.Edge#edgeType
     * @see Q.Styles.EDGE_CORNER
     */
    export const EDGE_CORNER_ROUND: string;
    /**
     * 斜面样式，适用于Consts.EDGE_TYPE_ORTHOGONAL***类型的连线
     * @see Q.Edge#edgeType
     * @see Q.Styles.EDGE_CORNER
     */
    export const EDGE_CORNER_BEVEL: string;
    /** 矩形分组类型 */
    export const GROUP_TYPE_RECT: string;
    /** 圆形分组类型 */
    export const GROUP_TYPE_CIRCLE: string;
    /** 椭圆分组类型 */
    export const GROUP_TYPE_ELLIPSE: string;
    /** 线条端点（线帽）样式，平直边缘 */
    export const LINE_CAP_TYPE_BUTT: string;
    /** 线条端点（线帽）样式，正方形边缘 */
    export const LINE_CAP_TYPE_SQUARE: string;
    /** 线条连接点样式，斜角 */
    export const LINE_JOIN_TYPE_BEVEL: string;
    /** 线条连接点样式，圆角 */
    export const LINE_JOIN_TYPE_ROUND: string;
    /** 线条连接点样式，斜接 */
    export const LINE_JOIN_TYPE_MITER: string;
    /** 渐变类型：径向渐变 */
    export const GRADIENT_TYPE_RADIAL: string;
    /** 渐变类型：线性渐变 */
    export const GRADIENT_TYPE_LINEAR: string;
    /**
     * 路径片段类型：moveTo
     * @see Q.Path
     * @see CanvasRenderingContext2D
     */
    export const SEGMENT_MOVE_TO: string;
    /**
     * 路径片段类型：lineTo
     * @see Q.Path
     * @see CanvasRenderingContext2D
     */
    export const SEGMENT_LINE_TO: string;
    /**
     * 路径片段类型：quadraticCurveTo
     * @see Q.Path
     * @see CanvasRenderingContext2D
     */
    export const SEGMENT_QUAD_TO: string;
    /**
     * 路径片段类型：bezierCurveTo
     * @see Q.Path
     * @see CanvasRenderingContext2D
     */
    export const SEGMENT_CURVE_TO: string;
    /**
     * 路径片段类型：arcTo
     * @see Q.Path
     * @see CanvasRenderingContext2D
     */
    export const SEGMENT_ARC_TO: string;
    /**
     * 路径片段类型：closePath
     * @see Q.Path
     * @see CanvasRenderingContext2D
     */
    export const SEGMENT_CLOSE: string;
    /** 交互模式：浏览模式 */
    export const INTERACTION_MODE_VIEW: string;
    /** 框选交互模式 */
    export const INTERACTION_MODE_SELECTION: string;
    /** 交互模式：放大 */
    export const INTERACTION_MODE_ZOOMIN: string;
    /** 交互模式：缩小 */
    export const INTERACTION_MODE_ZOOMOUT: string;
    /** 创建连线交互模式，简单模式 */
    export const INTERACTION_MODE_CREATE_SIMPLE_EDGE: string;
    /** 创建多边形交互模式 */
    export const INTERACTION_MODE_CREATE_SHAPE: string;
    /** 创建多线条交互模式 */
    export const INTERACTION_MODE_CREATE_LINE: string;
    /** 布局方向：从左往右 */
    export const DIRECTION_RIGHT: number;
    /** 布局方向：从右向左 */
    export const DIRECTION_LEFT: number;
    /** 布局方向：水平居中分布，只用于Q.Consts.LAYOUT_TYPE_TWO_SIDE布局类型 */
    export const DIRECTION_CENTER: number;
    /** 布局方向：从上往下 */
    export const DIRECTION_BOTTOM: number;
    /** 布局方向：从下往上 */
    export const DIRECTION_TOP: number;
    /** 布局方向：垂直居中分布，只用于Q.Consts.LAYOUT_TYPE_TWO_SIDE布局类型 */
    export const DIRECTION_MIDDLE: number;
    /** 布局类型：水平平均分布 */
    export const LAYOUT_TYPE_EVEN: string;
    /** 布局类型：垂直平均分布 */
    export const LAYOUT_TYPE_EVEN_VERTICAL: string;
    /** 布局类型：两侧分布 */
    export const LAYOUT_TYPE_TWO_SIDE: string;
    /** 角度均匀分布 */
    export const ANGLE_SPACING_REGULAR: string;
    /** 可变半径模式，适用于{Q.BalloonLayouter} */
    export const RADIUS_MODE_VARIABLE: string;
  }

  /** 默认属性列表 */
  export namespace Defaults {
    /**
     * 选取像素容差，设置选取容差可以改善点选交互；
     * 当线条特别细时，通常不容易直接点击在图元上面，如果设置选取容差为两个像素，则在距离线条两个像素范围内都可以点击到图元；
     * 选取像素容差不随画布缩放而变化；
     */
    export let SELECTION_TOLERANCE: number;
    /**
     * 是否使用双canvas缓存机制；
     * 此选项用于处理部分浏览器的bug，不建议用户设置；
     */
    export let DOUBLE_BUFFER: boolean;
    /** 默认文字颜色 */
    export let LABEL_COLOR: string;
    /** 默认字体样式 */
    export let FONT_STYLE: string;
    /** 默认字体大小 */
    export let FONT_SIZE: number;
    /** 默认字体家族名称 */
    export let FONT_FAMILY: string;
    /** 默认字体，等于 {@link Q.Defaults.FONT_STYLE} + {@link Q.Defaults.FONT_SIZE} + {@link Q.Defaults.FONT_FAMILY} */
    export let FONT: string;
    /**
     * 双击间隔时间；
     * 单位为毫秒；
     */
    export let DOUBLE_CLICK_INTERVAL_TIME: number;
    /**
     * 长按时间间隔；
     * 单位为毫秒；
     */
    export let LONG_PRESS_INTERVAL: number;
    /**
     * 默认选中类型，支持三种模式
     * @see Q.Consts.SELECTION_TYPE_BORDER_RECT
     * @see Q.Consts.SELECTION_TYPE_BORDER
     * @see Q.Consts.SELECTION_TYPE_SHADOW
     */
    export let SELECTION_TYPE: string;
    /** 默认选中边框宽度 */
    export let SELECTION_BORDER: number;
    /** 默认选中阴影大小 */
    export let SELECTION_SHADOW_BLUR: number;
    /** 默认选中颜色 */
    export let SELECTION_COLOR: string;
    /** 默认边框圆角半径 */
    export let BORDER_RADIUS: number;
    /** 默认冒泡指针宽度 */
    export let POINTER_WIDTH: number;
    /** 默认箭头大小 */
    export let ARROW_SIZE: number;
    /** 默认图片最大大小 */
    export let IMAGE_MAX_SIZE: number;
    /** 默认文字行高 */
    export let LINE_HEIGHT: number;
    /** 默认图片宽度 */
    export let IMAGE_WIDTH: number;
    /** 默认图片高度 */
    export let IMAGE_HEIGHT: number;
    /**
     * 单个图片的最大缓存像素数，为了提高显示效果和绘制效率，qunee内部图片按不同的缩放级别进行了缓存；
     * 如果超出最大像素数，因为qunee支持无极缩放和矢量图形，缩放比例很大时图片尺寸会变得很大，超出最大缓存像素时，qunee将不做缓存，而是直接绘制，同时停止染色渲染；
     * 默认值为：1000px * 1000px = 1000,000
     */
    export let MAX_CACHE_PIXELS: number;
    /** 默认颜色混合模式 */
    export let BLEND_MODE: string;
    /**
     * 图形组件的默认导航类型；
     * 支持三种导航模式：滚动条，导航按钮，无
     * @see {@link Q.Graph#navigationType}
     * @see {@link Q.Consts.NAVIGATION_BUTTON}
     * @see {@link Q.Consts.NAVIGATION_SCROLLBAR}
     */
    export let NAVIGATION_TYPE: string;
    /** 默认分组类型 */
    export let GROUP_TYPE: string;
    /** 默认分组内间距 */
    export let GROUP_PADDING: number;
    /** 分组是否默认展开显示 */
    export let GROUP_EXPANDED: boolean;
    /** 分组展开状态时的默认最小尺寸 */
    export let GROUP_MIN_SIZE: { width: number; height: number };
    /**
     * 图元UI范围扩展量；
     * 组件的显示范围往往会超出组件的计算范围，所以组件边界的计算通常需要留出余量，以避免被剪切；
     * 默认值为1；
     */
    export let UI_BOUNDS_GROW: number;
    /** 默认文字对齐方式 */
    export let ALIGN_POSITION: Position;
    /**
     * 连线端点容差:
     * qunee中连线端点默认连接到节点的边缘，为了提升性能，边缘的追踪并不追求百分百贴合，会存在一定的误差；
     * 默认2像素；
     */
    export let LOOKING_EDGE_ENDPOINT_TOLERANCE: number;
    /** Group的默认最小宽度 */
    export let GROUP_MIN_WIDTH: number;
    /** Group的默认最小高度 */
    export let GROUP_MIN_HEIGHT: number;
    /** 导航面板向左图标 */
    export let NAVIGATION_IMAGE_LEFT: string;
    /** 导航面板向上图标 */
    export let NAVIGATION_IMAGE_TOP: string;
    /** 默认交互缩放动画 */
    export let ZOOM_ANIMATE: object;
    /** 默认动画最长持续时间 */
    export let ANIMATION_MAXTIME: number;

    /**
     * 默认动画类型
     * @param t
     * @returns {Object}
     */
    export function ANIMATION_TYPE(t: object): object;

    /**
     * 注册默认交互模式
     * @param name 模式名称
     * @param interactions 交互监听器集合
     * @param cursor 默认光标
     */
    export function registerInteractions(
      name: string,
      interactions: Array<any>,
      cursor: string
    ): void;

    /** 触控交互时，交互手柄的默认尺寸 */
    export let INTERACTION_HANDLER_SIZE_TOUCH: number;
    /** 触控交互时，旋转手柄的半径大小 */
    export let INTERACTION_ROTATE_HANDLER_SIZE_TOUCH: number;
    /** 桌面交互时，交互手柄的默认尺寸 */
    export let INTERACTION_HANDLER_SIZE_DESKTOP: number;
    /** 桌面交互时，旋转手柄的半径大小 */
    export let INTERACTION_ROTATE_HANDLER_SIZE_DESKTOP: number;
    /** 文本输入框失去焦点时是否提交编辑内容 */
    export let LABEL_EDITOR_SUBMIT_WHEN_LOST_FOCUS: boolean;
    /** 框选状态时，框选矩形的边框样式（线宽） */
    export let SELECTION_RECTANGLE_STROKE: number;
    /** 框选状态时，框选矩形的边框颜色 */
    export let SELECTION_RECTANGLE_STROKE_COLOR: string;
    /** 框选状态时，框选矩形的填充颜色 */
    export let SELECTION_RECTANGLE_FILL_COLOR: string;
    /** 提示文本持续显示时间 */
    export let TOOLTIP_DURATION: number;
    /** 提示文本初始出现的时间 */
    export let TOOLTIP_DELAY: number;
    /** 连线捆绑是否默认展开 */
    export let EDGE_BUNDLE_EXPANDED: boolean;
    /** 是否延迟绘制 */
    export let DELAYED_RENDERING: boolean;
  }

  /**
   * 默认样式列表
   * @see Q.Styles
   * @see Q.Graph#styles
   */
  export namespace DefaultStyles {}

  /**
   *
   */
  export namespace Shapes {
    /**
     * 创建正多边形
     * @param number 多边形数量
     * @param cx
     * @param cy
     * @param r
     * @param angle
     * @returns {Q.Path}
     */
    export function createRegularShape(
      number: number,
      cx: number,
      cy: number,
      r: number,
      angle: number
    ): Path;

    /**
     * 获取所有的图形
     * @param x
     * @param y
     * @param width
     * @param height
     * @param lineWidth
     * @returns
     */
    export function getAllShapes(
      x: number,
      y: number,
      width?: number,
      height?: number,
      lineWidth?: number
    ): Array<object>;

    /**
     * 获取矩形
     * @param x
     * @param y
     * @param width
     * @param height
     * @param rx
     * @param ry
     * @returns {Q.Path}
     */
    export function getRect(
      x: number,
      y: number,
      width: number,
      height: number,
      rx: number,
      ry: number
    ): Path;

    /**
     * 给定范围和描边宽度，获取图形对象
     * @param name
     * @param x
     * @param y
     * @param width
     * @param height
     * @param lineWidth
     * @returns {Q.Path}
     */
    export function getShape(
      name: string,
      x: number,
      y: number,
      width: number,
      height: number,
      lineWidth: number
    ): Path;

    /**
     * 注册图形
     * @param name
     * @param shapeGenerator 图形对象或者图形生成器
     */
    export function register(
      name: string,
      shapeGenerator: ShapeGenerator | Path
    ): void;
  }

  /**
   * 样式名称列表
   * @see Element#setStyle
   */
  export namespace Styles {
    /** 图元透明度 */
    export const ALPHA: string;
    /**
     * 内间距，设置背景或者边框时，背景或边框与UI组件之间的间隙
     * @see Q.Insets
     */
    export const PADDING: string;
    /** 显示起始端箭头，适用于连线和Shape图形 */
    export const ARROW_FROM: string;
    /** 起始端箭头填充颜色 */
    export const ARROW_FROM_FILL_COLOR: string;
    /** 起始端箭头填充颜色 */
    export const ARROW_FROM_FILL_GRADIENT: string;
    /** 文本标签字体名称 */
    export const LABEL_FONT_FAMILY: string;
    /**
     * 选中类型，支持三种模式
     * @see Q.Consts.SELECTION_TYPE_BORDER_RECT
     * @see Q.Consts.SELECTION_TYPE_BORDER
     * @see Q.Consts.SELECTION_TYPE_SHADOW
     */
    export const SELECTION_TYPE: string;
    /** 选中颜色 */
    export const SELECTION_COLOR: string;
    /** 选中边框宽度 */
    export const SELECTION_BORDER: string;
    /** 选中阴影模糊距离 */
    export const SELECTION_SHADOW_BLUR: string;
    /** 选中阴影x偏移量 */
    export const SELECTION_SHADOW_OFFSET_X: string;
    /** 选中阴影y偏移量 */
    export const SELECTION_SHADOW_OFFSET_Y: string;
    /** 渲染颜色 */
    export const RENDER_COLOR: string;
    /** 颜色渲染模式 */
    export const RENDER_COLOR_BLEND_MODE: string;
    /** 阴影模糊距离 */
    export const SHADOW_BLUR: string;
    /** 阴影颜色 */
    export const SHADOW_COLOR: string;
    /** 阴影x偏移量 */
    export const SHADOW_OFFSET_X: string;
    /** 阴影y偏移量 */
    export const SHADOW_OFFSET_Y: string;
    /** 图形描边宽度 */
    export const SHAPE_STROKE: string;
    /**
     * 图形描边样式，可以用于设置描边颜色
     * SHAPE_***样式只有在图元图片（image）为图形（Shape）时起作用，比如设置节点图片为圆角矩形: node.image = Q.Shapes.getRect(0, 0, 90, 50, 10);
     * @see Q.Node#image
     */
    export const SHAPE_STROKE_STYLE: string;
    /**
     * 矢量图形，虚线样式，属性值为数值或者数值集合，例如：[5, 2]
     * @example
     * var shape = Q.Shapes.getShape(Q.Consts.SHAPE_CIRCLE, -30, -5, 60, 25);
     * var line = graph.createNode(null, 0, 0);
     * line.setStyle(Q.Styles.SHAPE_STROKE, 1);
     * line.setStyle(Q.Styles.SHAPE_STROKE_STYLE, Colors.yellow);
     * line.setStyle(Q.Styles.SHAPE_LINE_DASH, [5, 2]);
     * line.image = shape;
     */
    export const SHAPE_LINE_DASH: string;
    /**
     * 矢量图形，虚线样式，虚线偏移量，定时增加偏移量，可实现线条的流动效果，不支持IE
     * @example
     * var offset = 0;
     * var timer = setInterval(function() {
     * &nbsp;&nbsp;offset += -1;
     * &nbsp;&nbsp;shape.setStyle(Q.Styles.SHAPE_LINE_DASH_OFFSET, offset);
     * }, 150);
     */
    export const SHAPE_LINE_DASH_OFFSET: string;
    /** 图形填充颜色 */
    export const SHAPE_FILL_COLOR: string;
    /** 图形填充渐变 */
    export const SHAPE_FILL_GRADIENT: string;
    /** 多边形边线外框 */
    export const SHAPE_OUTLINE: string;
    /** 多边形边线外框样式 */
    export const SHAPE_OUTLINE_STYLE: string;
    /** 线条端点样式，适用于Edge, 以及以图形（Shape）为主体的Node */
    export const LINE_CAP: string;
    /** 线条连接点样式 */
    export const LINE_JOIN: string;
    /**
     * 设置附件沿图形路径布局，Qunee中每个图元由多个UI组件组合而成，其中有一个称为主体UI，其他的称为附件，主体UI的位置图元坐标属性计算得来，
     * 而附件UI的位置则相对主体UI或者另一个附件组件。
     * 比如一个Node图元由一个image和一个label组成，label相对image布局，image的位置为该图元的location坐标，而label位置则相对image，
     * 默认位于image之下，可以设置上下左右等九个位置，如果这个image不是图片，而是一个图形(shape)，比如一条折线，
     * 这时可以通过设置Q.Styles.LAYOUT_BY_PATH样式属性，使得label沿着折线布局，并按折线方向旋转
     * 只对Node起作用
     * @see Q.Styles.LABEL_ROTATABLE
     */
    export const LAYOUT_BY_PATH: string;
    /** 文本标签是否允许旋转 */
    export const LABEL_ROTATABLE: string;
    /** 背景颜色 */
    export const BACKGROUND_COLOR: string;
    /** 背景渐变 */
    export const BACKGROUND_GRADIENT: string;
    /** 边框宽度 */
    export const BORDER: string;
    /** 边框颜色 */
    export const BORDER_COLOR: string;
    /** 边框虚线样式，属性值为数值或者数值集合，例如：[5, 2] */
    export const BORDER_LINE_DASH: string;
    /** 边框虚线偏移量，属性值为数值，定时更改该样式，可实现线条的流动效果 */
    export const BORDER_LINE_DASH_OFFSET: string;
    /** 边框圆角值，可以设置数值，或者：{x: 10, y: 20} */
    export const BORDER_RADIUS: string;
    /** 图片背景颜色 */
    export const IMAGE_BACKGROUND_COLOR: string;
    /** 图片背景渐变 */
    export const IMAGE_BACKGROUND_GRADIENT: string;
    /** 图片边框 */
    export const IMAGE_BORDER: string;
    /** 图片边框样式 */
    export const IMAGE_BORDER_STYLE: string;
    /** 图片边框虚线样式 */
    export const IMAGE_BORDER_LINE_DASH: string;
    /** 图片边框虚线偏移量 */
    export const IMAGE_BORDER_LINE_DASH_OFFSET: string;
    /** 图片边框圆角半径 */
    export const IMAGE_BORDER_RADIUS: string;
    /** 图片边框圆角半径，与 {@link Q.Styles.IMAGE_BORDER_RADIUS} 相同 */
    export const IMAGE_RADIUS: string;
    /** 图片内间距 */
    export const IMAGE_PADDING: string;
    /** 节点图片的显示层次，可用于调整图片与文本标签以及其他子UI的显示层次 */
    export const IMAGE_Z_INDEX: string;
    /** 节点图片调整，支持镜像翻转和垂直翻转 */
    export const IMAGE_ADJUST: string;
    /** 节点图片透明度 */
    export const IMAGE_ALPHA: string;
    /** 文本标签旋转角度，属性值为弧度 */
    export const LABEL_ROTATE: string;
    /** 文本标签位置，与 {@link Q.Styles.LABEL_ANCHOR_POSITION} 结合使用，确定文本标签的位置 */
    export const LABEL_POSITION: string;
    /** 文本标签挂载点位置，与 {@link Q.Styles.LABEL_POSITION} 结合使用，确定文本标签的位置 */
    export const LABEL_ANCHOR_POSITION: string;
    /** 文本标签是否可见 */
    export const LABEL_VISIBLE: string;
    /** 文本标签文字颜色 */
    export const LABEL_COLOR: string;
    /** 文本标签字体大小 */
    export const LABEL_FONT_SIZE: string;
    /**
     * 文本标签字体样式
     * @example
     * node.setStyle(Q.Styles.LABEL_FONT_STYLE, "lighter");
     */
    export const LABEL_FONT_STYLE: string;
    /** 文本标签内间距 */
    export const LABEL_PADDING: string;
    /** 文本标签冒泡指针宽度 */
    export const LABEL_POINTER_WIDTH: string;
    /**
     * 是否显示文本标签冒泡指针
     * @see Q.Styles.LABEL_POINTER_WIDTH
     */
    export const LABEL_POINTER: string;
    /** 文本标签圆角宽度，支持数值或者这样的对象：{x: 10, y: 10} */
    export const LABEL_RADIUS: string;
    /** 文本标签x方向偏移量 */
    export const LABEL_OFFSET_X: string;
    /** 文本标签y方向偏移量 */
    export const LABEL_OFFSET_Y: string;
    /**
     * 文本尺寸大小样式，可以设置为{width: 100, height: 80}
     * @example
     * var text = graph.createText("Text");
     * text.setStyle(Q.Styles.LABEL_SIZE, new Q.Size(100, 80));
     */
    export const LABEL_SIZE: string;
    /** 文本对齐方式 */
    export const LABEL_ALIGN_POSITION: string;
    /**
     * 文本标签边框宽度
     * @see Q.Styles.LABEL_BORDER_STYLE
     */
    export const LABEL_BORDER: string;
    /**
     * 文本标签边框颜色
     * @see Q.Styles.LABEL_BORDER
     */
    export const LABEL_BORDER_STYLE: string;
    /** 文本标签背景颜色 */
    export const LABEL_BACKGROUND_COLOR: string;
    /** 文本标签背景渐变 */
    export const LABEL_BACKGROUND_GRADIENT: string;
    /** 文本标签的阴影模糊距离 */
    export const LABEL_SHADOW_BLUR: string;
    /** 文本标签的阴影颜色 */
    export const LABEL_SHADOW_COLOR: string;
    /** 文本标签的阴影x偏移量 */
    export const LABEL_SHADOW_OFFSET_X: string;
    /** 文本标签的阴影y偏移量 */
    export const LABEL_SHADOW_OFFSET_Y: string;
    /** 文本标签的显示次序 */
    export const LABEL_Z_INDEX: string;
    /** 文本标签是否置顶显示，此样式在地图应用中经常用到，以避免地块遮挡住文本标签 */
    export const LABEL_ON_TOP: string;
    /** 分组背景颜色 */
    export const GROUP_BACKGROUND_COLOR: string;
    /** 分组背景渐变 */
    export const GROUP_BACKGROUND_GRADIENT: string;
    /** 分组描边宽度 */
    export const GROUP_STROKE: string;
    /**
     * 分组描边样式
     * @see Q.Styles.GROUP_STROKE
     */
    export const GROUP_STROKE_STYLE: string;
    /** 分组边线虚线样式 */
    export const GROUP_STROKE_LINE_DASH: string;
    /** 分组边线虚线偏移量 */
    export const GROUP_STROKE_LINE_DASH_OFFSET: string;
    /** 连线捆绑文本旋转角度 */
    export const EDGE_BUNDLE_LABEL_ROTATE: string;
    /** 连线捆绑文本位置 */
    export const EDGE_BUNDLE_LABEL_POSITION: string;
    /** 连线捆绑文本挂载点位置 */
    export const EDGE_BUNDLE_LABEL_ANCHOR_POSITION: string;
    /** 连线捆绑文字颜色 */
    export const EDGE_BUNDLE_LABEL_COLOR: string;
    /** 连线捆绑文本字体大小 */
    export const EDGE_BUNDLE_LABEL_FONT_SIZE: string;
    /** 连线捆绑文本字体家族 */
    export const EDGE_BUNDLE_LABEL_FONT_FAMILY: string;
    /** 连线捆绑文本字体样式 */
    export const EDGE_BUNDLE_LABEL_FONT_STYLE: string;
    /** 连线捆绑文本内间距 */
    export const EDGE_BUNDLE_LABEL_PADDING: string;
    /** 连线捆绑文本冒泡指针宽度 */
    export const EDGE_BUNDLE_LABEL_POINTER_WIDTH: string;
    /** 连线捆绑文本冒泡 */
    export const EDGE_BUNDLE_LABEL_POINTER: string;
    /** 连线捆绑文本圆角 */
    export const EDGE_BUNDLE_LABEL_RADIUS: string;
    /** 连线捆绑文本x偏移量 */
    export const EDGE_BUNDLE_LABEL_OFFSET_X: string;
    /** 连线捆绑文本y偏移量 */
    export const EDGE_BUNDLE_LABEL_OFFSET_Y: string;
    /** 连线捆绑文本边框 */
    export const EDGE_BUNDLE_LABEL_BORDER: string;
    /** 连线捆绑文本边框样式 */
    export const EDGE_BUNDLE_LABEL_BORDER_STYLE: string;
    /** 连线捆绑文本背景颜色 */
    export const EDGE_BUNDLE_LABEL_BACKGROUND_COLOR: string;
    /** 连线捆绑文本边框背景渐变 */
    export const EDGE_BUNDLE_LABEL_BACKGROUND_GRADIENT: string;
    /** 连线捆绑文本能否旋转 */
    export const EDGE_BUNDLE_LABEL_ROTATABLE: string;
    /**
     * 连线宽度
     * @see Q.Edge
     */
    export const EDGE_WIDTH: string;
    /**
     * 连线颜色
     * @see Q.Edge
     */
    export const EDGE_COLOR: string;
    /** 连线外边框 */
    export const EDGE_OUTLINE: string;
    /** 连线外边框样式 */
    export const EDGE_OUTLINE_STYLE: string;
    /**
     * 连线虚线样式，属性值为数值或者数值集合，例如：[5, 2]
     * @example
     *  edge1.setStyle(export const EDGE_LINE_DASH, [8, 4, 0.01, 4]);
     */
    export const EDGE_LINE_DASH: string;
    /** 连线虚线偏移量，可用于实现连线流动效果 */
    export const EDGE_LINE_DASH_OFFSET: string;
    /** 连线起始端偏移量 */
    export const EDGE_FROM_OFFSET: string;
    /** 连线结束端偏移量 */
    export const EDGE_TO_OFFSET: string;
    /** 连线捆绑间距 */
    export const EDGE_BUNDLE_GAP: string;
    /** 连线自环捆绑间距 */
    export const EDGE_LOOPED_EXTAND: string;
    /** 连线延伸量，适用于Consts.EDGE_TYPE_ELBOW***类型的连线 */
    export const EDGE_EXTEND: string;
    /** 连线控制点，适用于Consts.EDGE_TYPE_ORTHOGONAL***类型的连线 */
    export const EDGE_CONTROL_POINT: string;
    /** 按百分比劈分，适用于Consts.EDGE_TYPE_ORTHOGONAL***类型的连线 */
    export const EDGE_SPLIT_BY_PERCENT: string;
    /**
     * 劈分百分比数值，0 - 1，适用于类型为Consts.EDGE_TYPE_ORTHOGONAL***，并且按百分比劈分的连线
     * @see Q.Styles.EDGE_SPLIT_BY_PERCENT
     */
    export const EDGE_SPLIT_PERCENT: string;
    /** 连线劈分位置数值，适用于类型为Consts.EDGE_TYPE_ORTHOGONAL***，并且不按百分比劈分的连线 */
    export const EDGE_SPLIT_VALUE: string;
    /**
     * 连线拐角类型，适用于Consts.EDGE_TYPE_ORTHOGONAL***类型的连线，支持三种：
     * @see Q.Consts.EDGE_CORNER_NONE
     * @see Q.Consts.EDGE_CORNER_ROUND
     * @see Q.Consts.EDGE_CORNER_BEVEL
     */
    export const EDGE_CORNER: string;
    /** 连线拐角圆角 */
    export const EDGE_CORNER_RADIUS: string;
    /** 连线起始端点连接到节点边缘 */
    export const EDGE_FROM_AT_EDGE: string;
    /** 连线结束端点连接到节点边缘 */
    export const EDGE_TO_AT_EDGE: string;
    /** 起始端箭头大小 */
    export const ARROW_FROM_SIZE: string;
    /** 起始端箭头偏移量 */
    export const ARROW_FROM_OFFSET: string;
    /** 起始端箭头边线宽度 */
    export const ARROW_FROM_STROKE: string;
    /** 起始端箭头边线样式 */
    export const ARROW_FROM_STROKE_STYLE: string;
    /** 起始箭头的外边框粗细 */
    export const ARROW_FROM_OUTLINE: string;
    /** 起始箭头外边框颜色 */
    export const ARROW_FROM_OUTLINE_STYLE: string;
    /** 起始端箭头边线虚线 */
    export const ARROW_FROM_LINE_DASH: string;
    /** 起始端箭头边线虚线偏移量 */
    export const ARROW_FROM_LINE_DASH_OFFSET: string;
    /** 起始端箭头边线端点样式 */
    export const ARROW_FROM_LINE_CAP: string;
    /** 起始端箭头边线连接点样式 */
    export const ARROW_FROM_LINE_JOIN: string;
    /** 显示结束端箭头，适用于连线和Shape图形 */
    export const ARROW_TO: string;
    /** 结束端箭头大小 */
    export const ARROW_TO_SIZE: string;
    /** 结束端箭头偏移量 */
    export const ARROW_TO_OFFSET: string;
    /** 结束端箭头边线宽度 */
    export const ARROW_TO_STROKE: string;
    /** 结束端箭头边线样式 */
    export const ARROW_TO_STROKE_STYLE: string;
    /** 结束箭头外边框粗细 */
    export const ARROW_TO_OUTLINE: string;
    /** 结束箭头外边框颜色 */
    export const ARROW_TO_OUTLINE_STYLE: string;
    /** 结束端箭头边线虚线 */
    export const ARROW_TO_LINE_DASH: string;
    /** 结束端箭头边线虚线偏移量 */
    export const ARROW_TO_LINE_DASH_OFFSET: string;
    /** 结束端箭头填充颜色 */
    export const ARROW_TO_FILL_COLOR: string;
    /** 结束端箭头填充渐变 */
    export const ARROW_TO_FILL_GRADIENT: string;
    /** 结束端箭头边线端点样式 */
    export const ARROW_TO_LINE_CAP: string;
    /** 结束端箭头边线连接点样式 */
    export const ARROW_TO_LINE_JOIN: string;
  }
}
