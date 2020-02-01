import { Getter } from "vuex-class";
import _ from "lodash";
import { Bind, Debounce } from "lodash-decorators";
import screenfull from "screenfull";
import { Q } from "../../lib/qunee";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Message,
  Tooltip
} from "element-ui";
import { HySearch } from "../HySearch";
import { HyQuneeWindow } from "./HyQuneeWindow";
import { HyQuneeToolbarView } from "./HyQuneeToolbarView";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { IHyContextMenu, HyQuneeToolbarCodeEnum } from "../../vms";
import { HyQuneeTooltip } from "./HyQuneeTooltip";
import { HyQuneeEventEnum } from "./vms/HyQuneeEventEnum";
import { HyContextMenu } from "../context-menu/HyContextMenu";
import { CreateElement } from "vue";

/**
 * 拓扑图
 */
@Component<HyQunee>({})
export class HyQunee extends Vue {
  /** 图元右键菜单 */
  @Prop({ type: Array })
  public menus!: Array<IHyContextMenu>;

  /**
   * 顶部工具栏；
   * false: 隐藏工具栏；
   * 否则为要显示的工具栏按钮的名称列表；
   * @example
   *   :toolbar="false"
   *   :toolbar="['view', 'fullscreen']"
   */
  @Prop({
    type: [Boolean, Array],
    default() {
      return [HyQuneeToolbarCodeEnum.VIEW, HyQuneeToolbarCodeEnum.FULLSCREEN];
    }
  })
  public toolbar!: boolean | Array<string>;

  /**
   * 附加的默认右键菜单；
   * 右键点击空白处，默认会弹出一组菜单（导出图片，重新加载，等等），通过此参数可以在默认菜单前面添加额外的菜单；
   */
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  public prependDefaultMenus!: Array<IHyContextMenu>;

  /** 是否可以编辑 */
  @Prop({ type: Boolean, default: false })
  public isEditable!: boolean;

  /** 是否启用网格背景 */
  @Prop({ type: Boolean, default: false })
  public gridBackground!: boolean;

  /**
   * 查找节点时要进行关键字匹配的属性路径
   * @example
   *   :search-paths="['x', 'x.y']"
   */
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  public searchPaths!: Array<string>;

  /** 默认选中的图元ID */
  @Prop({ type: [String, Number] })
  public selectId!: string | number;

  /** 导出的图片的标题 */
  @Prop({ type: String, default: "图片" })
  public exportPictureTitle!: string;

  /** 是否可以拖动底部边缘调整组件高度 */
  @Prop({ type: Boolean, default: false })
  public resizable!: boolean;

  /** 是否启用'预览'面板 */
  @Prop({ type: Boolean, default: true })
  public enableWindowOverview!: boolean;

  /** 提示信息：延迟 */
  @Prop({ type: Number, default: 270 })
  public tooltipDelay!: number;

  /** 提示信息：距离拓扑图边框的距离（单位：px） */
  @Prop({ type: Number, default: 5 })
  public tooltipOffset!: number;

  /** 加载中的提示文本 */
  @Prop({ type: String, default: "" })
  public loadingText!: string;

  public $refs!: {
    HyQuneeTooltipRef: HyQuneeTooltip;
    HyQuneeContextMenuRef: HyContextMenu;
    HyQuneeWindowOverviewRef: HyQuneeWindow;
  };

  @Getter
  NAV_MENU_COLLAPSED!: boolean;

  /** 酷利元素ID */
  private eid: string = `hy-qunee-${_.uniqueId()}`;
  private graph: Q.Graph | null = null;
  private loading: boolean = false;
  private isFullscreen: boolean = false;
  /** 复制的图元 */
  private copiedElements: Array<
    Q.Node | Q.Edge | Q.Group | Q.Text | Q.ShapeNode
  > = [];
  private filter: { key: string } = { key: "" };
  private searchInfo: {
    key: string;
    ids: Array<string | number>;
    index: number | undefined;
  } = {
    key: "",
    ids: [],
    index: 0
  };
  private leftWindows: Array<HyQuneeWindow> = [];
  private rightWindows: Array<HyQuneeWindow> = [];
  private bottomWindows: Array<HyQuneeWindow> = [];
  private visibleLeftWindows: Array<string> = [];
  private visibleRightWindows: Array<string> = [];
  private visibleBottomWindows: Array<string> = [];
  private HyQuneeWindowOverviewProp: {
    visible: boolean;
    overview: Q.Overview | null;
  } = {
    visible: false,
    overview: null
  };
  private HyQuneeTooltipProp: {
    element: Q.Element | null;
    mouseCoordinate: { x: number; y: number };
  } = {
    element: null,
    mouseCoordinate: { x: 0, y: 0 }
  };

  /**
   * 默认菜单（右键点击空白处）
   */
  get defaultMenus(): Array<IHyContextMenu> {
    const vm = this;

    return [
      ...vm.prependDefaultMenus,
      {
        name: "原始比例",
        code: HyQuneeToolbarCodeEnum.ZOOM_TO_ORIGINAL,
        icon: '<i class="fa fa-arrows fa-fw"></i>',
        handler: vm.zoomToOriginal
      },
      {
        name: "纵览比例",
        code: HyQuneeToolbarCodeEnum.ZOOM_TO_OVERVIEW,
        icon: '<i class="fa fa-arrows-alt fa-fw"></i>',
        handler(graph: Q.Graph) {
          graph.zoomToOverview(false);
        }
      },
      {
        divide: true
      },
      {
        name: "导出图片",
        code: HyQuneeToolbarCodeEnum.EXPORT,
        icon: '<i class="fa fa-picture-o fa-fw"/>',
        handler: vm.exportImage
      },
      {
        name: "重新加载",
        code: HyQuneeToolbarCodeEnum.RELOAD,
        icon: '<i class="fa fa-refresh fa-fw"/>',
        handler: vm.reload
      }
    ];
  }

  get reverseDefaultMenus(): Array<IHyContextMenu> {
    return _.clone(this.defaultMenus).reverse();
  }

  /**
   * 右键菜单列表
   */
  get hyContextMenuMenus(): Array<IHyContextMenu> {
    const vm = this;

    if (vm.menus && vm.menus.length > 0) {
      return vm.menus;
    } else {
      return vm.defaultMenus;
    }
  }

  @Watch("HyQuneeWindowOverviewProp.visible")
  public onOvervieweWindowVisibleChanged(visible: boolean) {
    const vm = this;
    if (vm.enableWindowOverview && vm.HyQuneeWindowOverviewProp.overview) {
      vm.HyQuneeWindowOverviewProp.overview.setVisible(visible);
    }
  }

  @Watch("visibleBottomWindows")
  public onVisibleBottomWindowsChanged(
    visibleBottomWindows: Array<HyQuneeWindow>
  ) {
    const vm = this;

    _.forEach(
      [...vm.leftWindows, ...vm.rightWindows],
      (HyQuneeWindow: HyQuneeWindow) => {
        HyQuneeWindow.style =
          (HyQuneeWindow.style || "") +
          (_.isEmpty(visibleBottomWindows)
            ? `height: calc(100% - 45px);`
            : "height: calc(100% - 247px);");
      }
    );
    if (vm.enableWindowOverview && vm.HyQuneeWindowOverviewProp.overview) {
      vm.HyQuneeWindowOverviewProp.overview.setVisible(
        vm.HyQuneeWindowOverviewProp.visible
      );
    }
  }

  @Watch("selectId")
  public onSelectIdChanged(selectId: string | number) {
    const vm = this;
    if (vm.graph) {
      if (selectId) {
        vm.selectElement(selectId);
      } else {
        vm.graph.unSelectAll();
      }
    }
  }

  @Watch("isEditable")
  public onIsEditableChanged() {
    const vm = this;
    if (vm.graph) {
      vm.graph.editable = vm.isEditable;
    }
  }

  @Watch("NAV_MENU_COLLAPSED")
  public async onMenuCollapsedChanged() {
    const vm = this;

    if (vm.graph) {
      await vm.$nextTick();
      vm.graph.updateViewport();
    }
  }

  public activated() {
    const vm = this;
    if (vm.graph) {
      vm.graph.updateViewport();
    }
  }

  public mounted() {
    this.init();
  }

  public beforeDestroy() {
    const vm = this;

    if (vm.graph) {
      vm.graph.destroy();
      vm.graph = null;
    }
  }

  /**
   * 加载
   */
  public load(): void {
    this.$emit(HyQuneeEventEnum.LOAD, this, this.graph);
  }

  /**
   * 显示加载提示
   */
  public async showLoading(): Promise<void> {
    const vm = this;
    vm.loading = true;
    await vm.$nextTick();
  }

  /**
   * 隐藏加载提示
   */
  public async hideLoading(): Promise<void> {
    const vm = this;
    vm.loading = false;
  }

  /**
   * 隐藏鼠标提示信息
   */
  public hideTooltip(): void {
    const vm = this;
    if (vm.$refs.HyQuneeTooltipRef) {
      vm.$refs.HyQuneeTooltipRef.hide();
    }
  }

  /**
   * 关闭所有面板
   */
  public closeAllWindows(): void {
    const vm = this;

    _.forEach(
      [...vm.leftWindows, ...vm.rightWindows, ...vm.bottomWindows],
      (window: HyQuneeWindow) => {
        window.close();
      }
    );
  }

  /**
   * 获取 graph 对象
   */
  public getGraph(): Q.Graph | null {
    return this.graph;
  }

  private init() {
    const vm = this;
    vm.graph = new Q.Graph(vm.eid);

    if (vm.gridBackground) {
      // tslint:disable-next-line:no-unused-expression
      new Q.GridBackground(vm.graph);
    }

    /*
     * 拦截 vm.graph.zoomToOverview() 方法调用，
     * 触发缩放事件
     */
    vm.graph.zoomToOverview = new Proxy(vm.graph.zoomToOverview, {
      apply(
        target: (byAnimate?: boolean, maxScale?: number, f?: boolean) => void,
        thisArg: Q.Graph,
        argArray: [
          (boolean | undefined)?,
          (number | undefined)?,
          (boolean | undefined)?
        ]
      ): void {
        const result = target.apply(thisArg, argArray);

        if (vm.graph) {
          vm.$emit(HyQuneeEventEnum.ZOOM, vm.graph.scale);
        }

        return result;
      }
    });

    vm.graph.styles = {
      [Q.Styles.LABEL_FONT_FAMILY]: '"微软雅黑","Microsoft YaHei","宋体"',
      [Q.Styles.PADDING]: new Q.Insets(10, 10),
      [Q.Styles.SELECTION_TYPE]: Q.Consts.SELECTION_TYPE_SHADOW,
      [Q.Styles.SELECTION_COLOR]: "#00FF00",
      [Q.Styles.SELECTION_SHADOW_BLUR]: 5,
      [Q.Styles.SELECTION_SHADOW_OFFSET_X]: 0,
      [Q.Styles.SELECTION_SHADOW_OFFSET_Y]: 0
    };
    vm.graph.enableTooltip = false;
    vm.graph.zoomAnimation = false;
    vm.graph.enableDoubleClickToOverview = false;
    vm.graph.editable = vm.isEditable;

    /* 屏蔽通过 DEL 键删除选中的图元 */
    vm.graph.removeSelectionByInteraction = () => false;
    vm.graph.startLabelEdit = () => false;

    vm.graph.onElementCreated = (
      element: Q.Element,
      e: MouseEvent,
      dragInfo: any
    ) => {
      vm.$emit(HyQuneeEventEnum.ELEMENT_CREATED, element, e, dragInfo);
    };

    vm.graph.addCustomInteraction({
      onmousewheel: (e: WheelEvent, graph: Q.Graph) => {
        vm.$emit(HyQuneeEventEnum.ZOOM, graph.scale);
        if (vm.$refs.HyQuneeContextMenuRef) {
          if (!e.composedPath().includes(vm.$refs.HyQuneeContextMenuRef.$el)) {
            vm.$refs.HyQuneeContextMenuRef.close();
          }
        }
      },
      onrelease2: (e: MouseEvent, graph: Q.Graph) => {
        e.preventDefault();
        const element = graph.getElementByMouseEvent(e);
        const elementUI = graph.getUIByMouseEvent(e);
        const ui = graph.hitTest(e);

        /* 触发'右键菜单'事件，外部组件监听此事件，设置菜单数据，然后本组件弹出右键菜单 */
        vm.$emit(
          HyQuneeEventEnum.CONTEXTMENU,
          vm,
          graph,
          element,
          elementUI,
          ui,
          e
        );
        vm.$nextTick(() => {
          vm.$refs.HyQuneeContextMenuRef.open(e);
        });
      },
      onclick: (e: MouseEvent, graph: Q.Graph) => {
        const element = graph.getElementByMouseEvent(e);
        const elementUI = graph.getUIByMouseEvent(e);
        const ui = graph.hitTest(e);

        vm.$emit(
          HyQuneeEventEnum.ON_CLICK,
          vm,
          graph,
          element,
          elementUI,
          ui,
          e
        );
      },
      ondblclick: (e: MouseEvent, graph: Q.Graph) => {
        const element = graph.getElementByMouseEvent(e);
        const elementUI = graph.getUIByMouseEvent(e);
        const ui = graph.hitTest(e);

        vm.$emit(
          HyQuneeEventEnum.ON_DOUBLE_CLICK,
          vm,
          graph,
          element,
          elementUI,
          ui,
          e
        );
      },
      onmousemove: (e: MouseEvent, graph: Q.Graph) => {
        const element: Q.Element = graph.getElementByMouseEvent(e);
        const elementUI: Q.ElementUI = graph.getUIByMouseEvent(e);
        const ui: Q.BaseUI = graph.hitTest(e);

        /**
         * 鼠标离开图元
         * @param el
         */
        const handleMouseLeaveElement = (el: Q.Element) => {
          if (!vm.HyQuneeTooltipProp.element) {
            return;
          }

          if (el) {
            vm.$emit(HyQuneeEventEnum.MOUSE_LEAVE, el);
          }

          vm.HyQuneeTooltipProp.element = null;
        };

        /**
         * 鼠标进入图元
         * @param el
         */
        const handleMouseEnterElement = (el: Q.Element) => {
          vm.HyQuneeTooltipProp.mouseCoordinate = {
            x: e.offsetX,
            y: e.offsetY
          };

          if (vm.HyQuneeTooltipProp.element === el) {
            return;
          }

          if (vm.HyQuneeTooltipProp.element) {
            handleMouseLeaveElement(vm.HyQuneeTooltipProp.element);
            return;
          }

          if (el) {
            vm.$emit(HyQuneeEventEnum.MOUSE_ENTER, el);
            vm.HyQuneeTooltipProp.element = el;
          }
        };

        handleMouseEnterElement(element);

        vm.$emit(
          HyQuneeEventEnum.ON_MOUSE_MOVE,
          vm,
          graph,
          element,
          elementUI,
          ui,
          e
        );
      },
      startdrag: (e: MouseEvent, graph: Q.Graph) => {
        const element = graph.getElementByMouseEvent(e);
        const elementUI = graph.getUIByMouseEvent(e);
        const ui = graph.hitTest(e);

        vm.$emit(
          HyQuneeEventEnum.START_DRAG,
          vm,
          graph,
          element,
          elementUI,
          ui,
          e
        );
      },
      ondrag: (e: MouseEvent, graph: Q.Graph) => {
        const element = graph.getElementByMouseEvent(e);
        const elementUI = graph.getUIByMouseEvent(e);
        const ui = graph.hitTest(e);

        vm.$emit(
          HyQuneeEventEnum.ON_DRAG,
          vm,
          graph,
          element,
          elementUI,
          ui,
          e
        );
      },
      enddrag: (e: MouseEvent, graph: Q.Graph) => {
        const element = graph.getElementByMouseEvent(e);
        const elementUI = graph.getUIByMouseEvent(e);
        const ui = graph.hitTest(e);

        vm.$emit(
          HyQuneeEventEnum.END_DRAG,
          vm,
          graph,
          element,
          elementUI,
          ui,
          e
        );
      },
      onkeydown: (e: KeyboardEvent) => {
        if (!vm.graph) {
          return;
        }

        if (!vm.graph.editable) {
          return;
        }

        const keyCode = e.keyCode;
        if (!Q.isMetaKey(e)) {
          return;
        }

        if (keyCode === 67) {
          vm.copyElements();
        } else if (keyCode === 86) {
          vm.pasteElements(50, 50);
        } else {
          return;
        }

        Q.stopEvent(e as any);
      }
    });

    vm.graph.dataPropertyChangeDispatcher.addListener({
      onEvent: (e: Q.Event) => {
        vm.$emit(HyQuneeEventEnum.DATA_PROPERTY_CHANGE, e);
      }
    });

    vm.graph.selectionChangeDispatcher.addListener((e: Q.ListEvent) => {
      const data: Array<Q.Node | Q.Edge> | Q.Node | Q.Edge = e.data;

      let elements: Array<Q.Node | Q.Edge>;
      if (_.isArray(data)) {
        elements = data;
      } else {
        elements = [data];
      }

      vm.$emit(HyQuneeEventEnum.SELECTION_CHANGE, elements);
      vm.$emit(
        HyQuneeEventEnum.SELECT,
        _.filter(elements, item => vm.graph!.isSelected(item))
      );
      vm.$emit(
        HyQuneeEventEnum.UNSELECT,
        _.filter(elements, item => !vm.graph!.isSelected(item))
      );
    });

    vm.initDomEvent();
    vm.initWindows();
    if (vm.enableWindowOverview) {
      vm.initOverviewWindow();
    }

    vm.$emit(HyQuneeEventEnum.READY, vm.graph);
  }

  /**
   * 更新视图
   */
  private updateViewport() {
    const vm = this;
    if (vm.graph && vm.$el) {
      const canvasEl = vm.$el.querySelector(".Q-Canvas");
      if (canvasEl) {
        if (canvasEl.clientWidth > 0 && canvasEl.clientHeight > 0) {
          vm.graph.updateViewport();
        }
      }
    }
  }

  /**
   * DOM 事件绑定
   */
  private initDomEvent() {
    const vm = this;

    if (screenfull && screenfull.enabled) {
      if (screenfull) {
        screenfull.on("change", vm.handleFullscreenChange);
      }
      vm.$once("hook:beforeDestroy", () => {
        if (screenfull) {
          screenfull.off("change", vm.handleFullscreenChange);
        }
      });
    }

    window.addEventListener("resize", vm.handleWindowResize);
    vm.$once("hook:beforeDestroy", () => {
      window.removeEventListener("resize", vm.handleWindowResize);
    });

    /*
     * 可以拖动手柄，调整高度
     * --------------------------------------------------
     */
    if (vm.resizable) {
      let startY: number;
      let startHeight: number;

      const resizeWrapper = $(vm.$el);

      /**
       * 开始拖拽
       * @param e
       */
      const startDrag = (e: MouseEvent) => {
        resizeWrapper.css({ height: `${startHeight + e.clientY - startY}px` });
      };

      /**
       * 停止拖拽
       */
      const stopDrag = () => {
        document.documentElement!.removeEventListener(
          "mousemove",
          startDrag,
          false
        );
        document.documentElement!.removeEventListener(
          "mouseup",
          stopDrag,
          false
        );
        vm.updateViewport();
        vm.$emit(
          HyQuneeEventEnum.RESIZE,
          parseInt(String(resizeWrapper.height()), 10)
        );
      };

      /**
       * 缩放手柄的 mousedown 事件回调
       * @param e
       */
      const handleResizeHandleMousedown = (e: MouseEvent) => {
        startY = e.clientY || 0;
        startHeight = parseInt(String(resizeWrapper.height()), 10);
        document.documentElement!.addEventListener(
          "mousemove",
          startDrag,
          false
        );
        document.documentElement!.addEventListener("mouseup", stopDrag, false);
      };

      const resizeHandle: HTMLElement | null = document.getElementById(
        `${vm.eid}-resize-handler`
      );
      if (resizeHandle) {
        resizeHandle.addEventListener("mousedown", handleResizeHandleMousedown);
        vm.$once("hook:beforeDestroy", () => {
          resizeHandle.removeEventListener(
            "mousedown",
            handleResizeHandleMousedown
          );
        });
      }
    }
  }

  /**
   * window 的 resize 事件回调
   */
  @Bind()
  @Debounce(250, {
    leading: true
  })
  private handleWindowResize() {
    const vm = this;
    if (vm.graph) {
      vm.graph.callLater(
        () => {
          vm.updateViewport();
        },
        vm.graph,
        100
      );
    }
  }

  /**
   * fullscreenchange 事件回调
   */
  private handleFullscreenChange() {
    const vm = this;

    if (!screenfull || !screenfull.enabled) {
      return;
    }

    if (
      screenfull &&
      screenfull.element &&
      screenfull &&
      screenfull.element !== vm.$el
    ) {
      return;
    }

    if (!screenfull || (!screenfull.element && !vm.isFullscreen)) {
      return;
    }

    vm.isFullscreen = screenfull && screenfull.isFullscreen;
    if (screenfull && screenfull.isFullscreen) {
      $("body").addClass("fullscreen");
    } else {
      $("body").removeClass("fullscreen");
    }

    setTimeout(() => {
      vm.$emit(
        HyQuneeEventEnum.FULLSCREEN_CHANGE,
        screenfull && screenfull.isFullscreen
      );

      if (vm.graph && vm.$el.clientWidth > 0 && vm.$el.clientHeight > 0) {
        vm.updateViewport();
        vm.graph.zoomToOverview(false);
      }
    }, 200);
  }

  /**
   * 切换全屏
   */
  private toggleFullScreen() {
    const vm = this;

    if (!screenfull || !screenfull.enabled) {
      return;
    }

    screenfull.toggle(vm.$el);
  }

  /**
   * 原始比例
   * @param graph
   */
  private zoomToOriginal(graph: Q.Graph) {
    const vm = this;

    const scale = Math.min(graph.maxScale, 1);
    graph.moveToCenter(scale, false);
    vm.$emit(HyQuneeEventEnum.ZOOM, scale);
  }

  /**
   * 导出图片
   * @param graph
   */
  private exportImage(graph: Q.Graph) {
    /* 新标签页打开图片 */
    const win = window.open();
    if (win && graph) {
      win.document.write(
        `<p style="font-weight: bold;">右键：图片另存为</p><img src="${
          graph.exportImage(graph.ratio).data
        }" alt="${this.exportPictureTitle}"/>`
      );
      win.document.location!.href = "#";
      win.document.title = this.exportPictureTitle;
    }
  }

  /**
   * 重新加载
   * @param graph
   */
  private reload(graph: Q.Graph) {
    const vm = this;

    vm.$emit(HyQuneeEventEnum.RELOAD, vm, graph);
  }

  /**
   * 初始化'预览'面板
   */
  private initOverviewWindow() {
    const vm = this;
    vm.HyQuneeWindowOverviewProp.overview = new Q.Overview(
      $(`#${vm.eid}-window-overview`)[0],
      vm.graph!
    );
  }

  /**
   * 初始化面板
   */
  private initWindows() {
    const vm = this;
    vm.leftWindows = vm.enableWindowOverview
      ? [vm.$refs.HyQuneeWindowOverviewRef]
      : [];

    if (vm.$slots.default) {
      /* 左侧 */
      vm.leftWindows = [
        ...vm.leftWindows,
        ...vm.$slots.default
          .filter(
            vnode =>
              vnode.componentInstance &&
              vnode.componentInstance.$data["name"] === "HyQuneeWindow" &&
              vnode.componentInstance.$props["placement"] === "left"
          )
          .map(vnode => vnode.componentInstance! as HyQuneeWindow)
      ];

      /* 右侧 */
      vm.rightWindows = [
        ...vm.rightWindows,
        ...vm.$slots.default
          .filter(
            vnode =>
              vnode.componentInstance &&
              vnode.componentInstance.$data["name"] === "HyQuneeWindow" &&
              vnode.componentInstance.$props["placement"] === "right"
          )
          .map(vnode => vnode.componentInstance! as HyQuneeWindow)
      ];

      /* 底侧 */
      vm.bottomWindows = [
        ...vm.bottomWindows,
        ...vm.$slots.default
          .filter(
            vnode =>
              vnode.componentInstance &&
              vnode.componentInstance.$data["name"] === "HyQuneeWindow" &&
              vnode.componentInstance.$props["placement"] === "bottom"
          )
          .map(vnode => vnode.componentInstance! as HyQuneeWindow)
      ];
    }

    vm.leftWindows.forEach((window: HyQuneeWindow) => {
      window.$watch(
        "visible",
        (visible: boolean) => {
          vm.visibleLeftWindows = visible
            ? [window.title]
            : _.without(vm.visibleLeftWindows, window.title);
        },
        { immediate: true }
      );
    });

    vm.rightWindows.forEach((window: HyQuneeWindow) => {
      window.$watch(
        "visible",
        (visible: boolean) => {
          vm.visibleRightWindows = visible
            ? [window.title]
            : _.without(vm.visibleRightWindows, window.title);
        },
        { immediate: true }
      );
    });

    vm.bottomWindows.forEach((window: HyQuneeWindow) => {
      window.$watch(
        "visible",
        (visible: boolean) => {
          vm.visibleBottomWindows = visible
            ? [window.title]
            : _.without(vm.visibleBottomWindows, window.title);
        },
        { immediate: true }
      );
    });
  }

  /**
   * 切换左侧面板
   * @param visible 是否显示
   * @param leftWindow 面板
   */
  private handleToggleLeftWindow(visible: boolean, leftWindow: HyQuneeWindow) {
    const vm = this;

    vm.leftWindows.forEach((window: HyQuneeWindow) => {
      window.$emit("update:visible", window === leftWindow ? visible : false);
    });
    vm.visibleLeftWindows = visible ? [leftWindow.title] : [];
  }

  /**
   * 切换右侧面板
   * @param visible 是否显示
   * @param rightWindow 面板
   */
  private handleToggleRightWindow(
    visible: boolean,
    rightWindow: HyQuneeWindow
  ) {
    const vm = this;

    vm.visibleRightWindows = [];
    vm.rightWindows.forEach((window: HyQuneeWindow) => {
      if (window.name === "HyQuneeWindowProperty") {
        window.visible =
          window === rightWindow ? visible : !window.closable && window.visible;
      } else {
        window.$emit(
          "update:visible",
          window === rightWindow ? visible : !window.closable && window.visible
        );
      }

      if ((window === rightWindow && visible) || !window.closable) {
        vm.visibleRightWindows.push(window.title);
      }
    });
  }

  /**
   * 切换底部面板
   * @param visible 是否显示
   * @param bottomWindow 面板
   */
  private handleToggleBottomWindow(
    visible: boolean,
    bottomWindow: HyQuneeWindow
  ) {
    this.bottomWindows.forEach((window: HyQuneeWindow) => {
      window.$emit("update:visible", window === bottomWindow ? visible : false);
    });
    this.visibleBottomWindows = visible ? [bottomWindow.title] : [];
  }

  /**
   * 选中图元
   * @param id 图元ID
   */
  private selectElement(id: string | number) {
    const vm = this;
    /* 未初始化 */
    if (!vm.graph) {
      return false;
    }

    /* 未找到图元 */
    const element = vm.graph.getElement(id);
    if (!element) {
      return false;
    }

    /* 关闭其他分组，只展开图元所在分组 */
    vm.graph.forEach((element: Q.Element) => {
      if (element instanceof Q.Group) {
        (element as Q.Group).expanded = false;
      }
    });
    let parentElement = element.parent;
    while (parentElement) {
      if (parentElement instanceof Q.Group) {
        (parentElement as Q.Group).expanded = true;
      }

      parentElement = parentElement.parent;
    }

    /* 选中，居中，置顶 */
    vm.graph.setSelection(element);
    vm.graph.sendToTop(element);

    const isEdge = (element: Q.Element | Q.Edge): element is Q.Edge => {
      return element instanceof Q.Edge;
    };

    /* 展开链路所在分组 */
    if (isEdge(element)) {
      if (
        element.from &&
        element.from.parent &&
        element.from.parent instanceof Q.Group
      ) {
        element.from.parent.expanded = true;
      }
      if (
        element.to &&
        element.to.parent &&
        element.to.parent instanceof Q.Group
      ) {
        element.to.parent.expanded = true;
      }
    }
    setTimeout(() => {
      if (vm.graph) {
        const bounds = vm.graph.getUIBounds(element);
        if (bounds) {
          vm.graph.scale = 1;
          vm.graph.centerTo(bounds.cx, bounds.cy, vm.graph.scale, true);
        }
      }
    }, 0);

    return true;
  }

  /**
   * 查找图元
   * @param key 关键字
   * @param showEmptyMessasge 是否显示'搜索结果为空'的提示消息
   */
  private searchElement(key: string, showEmptyMessasge: boolean = true) {
    const vm = this;

    /**
     * 查找下一个图元
     */
    const searchNextElement = () => {
      if (vm.searchInfo.ids.length) {
        if (vm.searchInfo.ids.length === 1) {
          vm.selectElement(vm.searchInfo.ids[0]);
          return;
        }

        if (vm.searchInfo.index === undefined) {
          vm.searchInfo.index = 0;
        } else {
          vm.searchInfo.index += 1;
          if (vm.searchInfo.index < 0) {
            vm.searchInfo.index += vm.searchInfo.ids.length;
          }
          vm.searchInfo.index %= vm.searchInfo.ids.length;
        }

        if (!vm.selectElement(vm.searchInfo.ids[vm.searchInfo.index])) {
          vm.searchInfo.ids = [];
          vm.searchInfo.key = "";
          vm.searchInfo.index = 0;
          search();
        }
      } else {
        vm.graph!.unSelectAll();
        throw new Error("no result");
      }
    };

    /**
     * 查找图元
     */
    const search = () => {
      if (!vm.searchInfo.ids.length || vm.searchInfo.key !== key) {
        vm.searchInfo.key = _.cloneDeep(key);
        vm.searchInfo.ids = [];
        const regExp = new RegExp(vm.searchInfo.key, "i");

        if (vm.graph) {
          vm.graph.forEach((element: Q.Element) => {
            let propertiesTestResult = false;
            if (vm.searchPaths && vm.searchPaths.length) {
              vm.searchPaths.forEach(path => {
                const paths = path.split(".");

                let tempResult = true;
                if (paths && paths.length) {
                  let tempProperty = element.properties;
                  paths.forEach(p => {
                    if (tempResult) {
                      if (tempProperty) {
                        tempProperty = tempProperty[p];
                        if (_.isString(tempProperty)) {
                          tempResult = tempResult && regExp.test(tempProperty);
                        } else if (_.isNil(tempProperty)) {
                          tempResult = false;
                        }
                      } else {
                        tempResult = false;
                      }
                    }
                  });
                }

                propertiesTestResult = propertiesTestResult || tempResult;
              });
            }

            if (element instanceof Q.Node && propertiesTestResult) {
              vm.searchInfo.ids.push(element.id);
            }
          });
        }
      }

      try {
        searchNextElement();
      } catch (e) {
        if (showEmptyMessasge) {
          Message.warning("搜索结果为空");
        } else {
          throw e;
        }
      }
    };

    search();
  }

  /**
   * 复制图元
   */
  private copyElements() {
    const vm = this;
    if (vm.graph) {
      if (!vm.graph.editable) {
        console.warn("非编辑模式，不支持复制操作");
        return;
      }

      vm.copiedElements = vm.graph.selectionModel.toDatas();
    }
  }

  /**
   * 粘贴图元
   * @param dx 横坐标偏移
   * @param dy 纵坐标偏移
   */
  private pasteElements(dx: number = 10, dy: number = 10) {
    const vm = this;
    if (!vm.graph) {
      return;
    }

    if (!vm.graph.editable) {
      console.warn("非编辑模式，不支持粘贴操作");
      return;
    }

    _.forEach(vm.copiedElements, srcElement => {
      if (srcElement instanceof Q.Group) {
        return;
      }

      if (srcElement instanceof Q.Node) {
        const element = new Q.Node("");
        element.id = Number(_.uniqueId());
        element.name = srcElement.name;
        element.x = srcElement.x + dx;
        element.y = srcElement.y + dy;
        element.rotate = srcElement.rotate;
        element.image = srcElement.image;
        element.size = srcElement.size;
        element.parent = srcElement.parent;
        element.host = srcElement.host;
        element.zIndex = srcElement.zIndex;
        element.styles = srcElement.styles;

        vm.graph!.addElement(element);

        vm.$emit(HyQuneeEventEnum.ELEMENTS_COPIED, srcElement, element);
      }
    });
  }

  /**
   * 点击右键菜单
   * @param menu 右键菜单
   */
  private handleContextMenuClick(menu: IHyContextMenu) {
    const vm = this;

    if (!vm.graph) {
      return;
    }

    if (menu.disabled) {
      return;
    }

    if (_.isFunction(menu.handler)) {
      menu.handler.call(menu, vm.graph);
    }
  }

  // tslint:disable-next-line:member-ordering
  public render(h: CreateElement) {
    const vm = this;

    return (
      <section
        class="hy-qunee"
        id={`${vm.eid}-wrapper`}
        v-loading={vm.loading}
        element-loading-text={vm.loadingText}
      >
        <div class="hy-qunee__container" id={vm.eid} />
        {typeof vm.toolbar === "object" && vm.toolbar.length > 0 && (
          <div
            class="hy-qunee__toolbar"
            nativeOnContextmenu={(e: MouseEvent) => {
              e.preventDefault();
            }}
          >
            {/* 屏幕尺寸较小时显示 */}
            <div class="hy-qunee__toolbar--narrow">
              {/* 查看面板 */}
              {typeof vm.toolbar === "object" &&
                vm.toolbar.includes(HyQuneeToolbarCodeEnum.VIEW) &&
                (vm.leftWindows.length ||
                  vm.rightWindows.length ||
                  vm.bottomWindows.length) && (
                  <HyQuneeToolbarView
                    leftWindows={vm.leftWindows}
                    rightWindows={vm.rightWindows}
                    bottomWindows={vm.bottomWindows}
                    visibleLeftWindows={vm.visibleLeftWindows}
                    {...{
                      on: {
                        "update:visibleLeftWindows": (value: Array<string>) => {
                          vm.visibleLeftWindows = value;
                        }
                      }
                    }}
                    visibleRightWindows={vm.visibleRightWindows}
                    {...{
                      on: {
                        "update:visibleRightWindows": (
                          value: Array<string>
                        ) => {
                          vm.visibleRightWindows = value;
                        }
                      }
                    }}
                    visibleBottomWindows={vm.visibleBottomWindows}
                    {...{
                      on: {
                        "update:visibleBottomWindows": (
                          value: Array<string>
                        ) => {
                          vm.visibleBottomWindows = value;
                        }
                      }
                    }}
                    on-toggle-left-window={vm.handleToggleLeftWindow}
                    on-toggle-right-window={vm.handleToggleRightWindow}
                    on-toggle-bottom-window={vm.handleToggleBottomWindow}
                  />
                )}
            </div>
            {/* 屏幕尺寸较大时显示 */}
            <div class="hy-qunee__toolbar--wide">
              {vm.leftWindows
                .filter(i => i.closable)
                .map((win, index) => (
                  <Tooltip
                    transition="none"
                    enterable={false}
                    placement="bottom-start"
                    effect="light"
                    content={win.title}
                    key={`left-window-${index}`}
                  >
                    <Button
                      type="primary"
                      class={[
                        "hy-qunee__toolbar-button",
                        "hy-qunee__toolbar-button--left",
                        vm.visibleLeftWindows.includes(win.title)
                          ? "hy-qunee__toolbar-button--active"
                          : ""
                      ]}
                      onClick={vm.handleToggleLeftWindow.bind(
                        vm,
                        !vm.visibleLeftWindows.includes(win.title),
                        win
                      )}
                    >
                      <i class={["fa", "fa-fw", win.iconClass]} />
                    </Button>
                  </Tooltip>
                ))}
              {vm.bottomWindows
                .filter(i => i.closable)
                .map((win, index) => (
                  <Tooltip
                    transition="none"
                    enterable={false}
                    placement="bottom-start"
                    effect="light"
                    content={win.title}
                    key={`bottom-window-${index}`}
                  >
                    <Button
                      type="primary"
                      class={[
                        "hy-qunee__toolbar-button",
                        "hy-qunee__toolbar-button--left",
                        vm.visibleBottomWindows.includes(win.title)
                          ? "hy-qunee__toolbar-button--active"
                          : ""
                      ]}
                      onClick={vm.handleToggleBottomWindow.bind(
                        vm,
                        !vm.visibleBottomWindows.includes(win.title),
                        win
                      )}
                    >
                      <i class={["fa", "fa-fw", win.iconClass]} />
                    </Button>
                  </Tooltip>
                ))}
              {vm.rightWindows
                .filter(i => i.closable)
                .map((win, index) => (
                  <Tooltip
                    transition="none"
                    enterable={false}
                    placement="bottom-start"
                    effect="light"
                    content={win.title}
                    key={`right-window-${index}`}
                  >
                    <Button
                      type="primary"
                      class={[
                        "hy-qunee__toolbar-button",
                        "hy-qunee__toolbar-button--left",
                        vm.visibleRightWindows.includes(win.title)
                          ? "hy-qunee__toolbar-button--active"
                          : ""
                      ]}
                      onClick={vm.handleToggleRightWindow.bind(
                        vm,
                        !vm.visibleRightWindows.includes(win.title),
                        win
                      )}
                    >
                      <i class={["fa", "fa-fw", win.iconClass]} />
                    </Button>
                  </Tooltip>
                ))}
            </div>
            {vm.$slots["toolbar-left"]}
            {((typeof vm.toolbar === "boolean" && vm.toolbar) ||
              (typeof vm.toolbar === "object" && vm.toolbar.length > 0)) && (
              <Tooltip
                transition="none"
                enterable={false}
                placement="bottom-end"
                effect="light"
                content={
                  screenfull && screenfull.isFullscreen ? "退出全屏" : "全屏"
                }
              >
                <Button
                  type="primary"
                  class="hy-qunee__toolbar-button hy-qunee__toolbar-button--right"
                  onClick={vm.toggleFullScreen}
                >
                  <i
                    class={[
                      "fa",
                      "fa-fw",
                      screenfull && screenfull.isFullscreen
                        ? "fa-window-restore"
                        : "fa-window-maximize"
                    ]}
                  />
                </Button>
              </Tooltip>
            )}
            <div class="hy-qunee__toolbar--narrow" style={{ float: "right" }}>
              {/* 操作 */}
              <Dropdown trigger="click">
                <Tooltip
                  transition="none"
                  enterable={false}
                  placement="bottom-start"
                  effect="light"
                  content="操作"
                >
                  <Button
                    type="primary"
                    class="hy-qunee__toolbar-button hy-qunee__toolbar-button--right"
                  >
                    <i class="fa fa-align-justify fa-fw" />
                  </Button>
                </Tooltip>
                <DropdownMenu
                  slot="dropdown"
                  class="hy-qunee__toolbar__action-dropdown-menu"
                >
                  {_.map(
                    _.filter(
                      vm.defaultMenus,
                      i =>
                        !i.divide &&
                        typeof vm.toolbar === "object" &&
                        vm.toolbar.includes(i.code || "")
                    ),
                    menu => (
                      <DropdownItem>
                        <a onClick={vm.handleContextMenuClick.bind(vm, menu)}>
                          {menu.icon ? (
                            <span domPropsInnerHTML={menu.icon} />
                          ) : (
                            <i class="fa fa-circle-o fa-fw" />
                          )}
                          {menu.name}
                        </a>
                      </DropdownItem>
                    )
                  )}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div class="hy-qunee__toolbar--wide" style={{ float: "right" }}>
              {_.map(
                _.filter(
                  vm.reverseDefaultMenus,
                  i =>
                    !i.divide &&
                    typeof vm.toolbar === "object" &&
                    vm.toolbar.includes(i.code || "")
                ),
                menu => (
                  <Tooltip
                    transition="none"
                    enterable={false}
                    placement="bottom-end"
                    effect="light"
                    content={menu.name}
                  >
                    <Button
                      type="primary"
                      class="hy-qunee__toolbar-button hy-qunee__toolbar-button--right"
                      onClick={vm.handleContextMenuClick.bind(vm, menu)}
                    >
                      {!!menu.icon ? (
                        <span domPropsInnerHTML={menu.icon} />
                      ) : (
                        <i class="fa fa-circle-o fa-fw" />
                      )}
                    </Button>
                  </Tooltip>
                )
              )}
            </div>
            {vm.$slots["toolbar-right"]}
            {typeof vm.toolbar === "object" &&
              vm.toolbar.includes(HyQuneeToolbarCodeEnum.SEARCH) && (
                <Tooltip
                  transition="none"
                  enterable={false}
                  placement="bottom-end"
                  effect="light"
                  content="查找"
                  class="hy-qunee__toolbar-button--right"
                  style={{ maxWidth: "200px", minWidth: "150px" }}
                >
                  <HySearch
                    vModel={vm.filter.key}
                    onSearch={vm.searchElement.bind(vm, vm.filter.key)}
                  />
                </Tooltip>
              )}
          </div>
        )}
        {/* 左侧面板：预览 */}
        {vm.enableWindowOverview && (
          <HyQuneeWindow
            ref="HyQuneeWindowOverviewRef"
            visible={vm.HyQuneeWindowOverviewProp.visible}
            {...{
              on: {
                "update:visible": (value: boolean) => {
                  vm.HyQuneeWindowOverviewProp.visible = value;
                }
              }
            }}
            title="预览"
            iconClass="fa-square-o"
            placement="left"
          >
            <div id={`${vm.eid}-window-overview`} style={{ height: "100%" }} />
          </HyQuneeWindow>
        )}
        {vm.$slots.default}
        <HyContextMenu
          ref="HyQuneeContextMenuRef"
          menus={vm.hyContextMenuMenus}
          onClick={vm.handleContextMenuClick}
        />
        <HyQuneeTooltip
          ref="HyQuneeTooltipRef"
          graph={vm.graph}
          delay={vm.tooltipDelay}
          offset={vm.tooltipOffset}
          element={vm.HyQuneeTooltipProp.element}
          mouseCoordinate={vm.HyQuneeTooltipProp.mouseCoordinate}
          nativeOnContextmenu={(e: MouseEvent) => {
            e.preventDefault();
          }}
        >
          {vm.$slots.tooltip}
        </HyQuneeTooltip>
        {vm.resizable && (
          <div
            id={`${vm.eid}-resize-handler`}
            class="hy-qunee__resize-handler"
          >
            <span class="hy-qunee__resize-handler-indicator hy-qunee__resize-handler-indicator--top" />
            <span class="hy-qunee__resize-handler-indicator hy-qunee__resize-handler-indicator--bottom" />
          </div>
        )}
      </section>
    );
  }
}
