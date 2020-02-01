import _ from "lodash";
import Vue, { CreateElement } from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { Q } from "../../lib/qunee";

/**
 * 拓扑图：提示信息
 */
@Component<HyQuneeTooltip>({})
export class HyQuneeTooltip extends Vue {
  /** Q.Graph 实例 */
  @Prop({})
  public graph!: Q.Graph | null;

  /** 图元 */
  @Prop({})
  public element!: Q.Element | null;

  /** 延迟显示 */
  @Prop({
    type: Number,
    default: 200
  })
  public delay!: number;

  /**
   * 提示信息距离拓扑图边框的距离；
   * 单位：px；
   */
  @Prop({
    type: Number,
    default: 5
  })
  public offset!: number;

  /** 鼠标坐标 */
  @Prop({
    type: Object,
    default() {
      return { x: 0, y: 0 };
    }
  })
  public mouseCoordinate!: { x: number; y: number };

  /** 是否显示 */
  private visible: boolean = false;
  /** 延迟显示的计时器ID */
  private timer: number | null = null;
  /** 提示信息距离鼠标光标的距离 */
  private mouseOffset: number = 5;

  @Watch("element")
  public onElementChanged(element: Q.Element | null) {
    const vm = this;

    if (!element) {
      vm.hide();
    } else {
      if (vm.graph) {
        vm.timer = _.delay(() => {
          vm.show(element);
        }, vm.delay);
      }
    }
  }

  @Watch("mouseCoordinate")
  public onMouseCoordinateChanged(mouseCoordinate: { x: number; y: number }) {
    const vm = this;
    if ((mouseCoordinate.x === 0 && mouseCoordinate.y === 0) || !vm.visible) {
      return;
    }

    (vm.$el as HTMLDivElement).style.left = `${mouseCoordinate.x +
      vm.mouseOffset}px`;
    (vm.$el as HTMLDivElement).style.top = `${mouseCoordinate.y +
      vm.mouseOffset}px`;
    vm.fixCoordinate(mouseCoordinate);
  }

  /**
   * 隐藏组件
   */
  public hide() {
    const vm = this;
    if (!_.isNull(vm.timer)) {
      clearTimeout(vm.timer);
      vm.timer = null;
    }

    vm.visible = false;
  }

  /**
   * 修复坐标；
   * 当组件超出画布范围时，调整坐标，使组件始终处于画布之内；
   *
   * @param coordinate 默认坐标
   */
  private fixCoordinate(coordinate: { x: number; y: number }): void {
    const vm = this;
    const width = (vm.$el as HTMLDivElement).offsetWidth;
    const height = (vm.$el as HTMLDivElement).offsetHeight;

    if (vm.graph!.width - coordinate.x < width + vm.offset + vm.mouseOffset) {
      /* 如果组件右边超出画布 */
      if (coordinate.x < width + vm.offset + vm.mouseOffset) {
        /* 左边也放不下，不作处理 */
        return;
      }

      coordinate.x = coordinate.x - (width + vm.mouseOffset);
      (vm.$el as HTMLDivElement).style.left = `${coordinate.x}px`;
    }

    if (vm.graph!.height - coordinate.y < height + vm.offset + vm.mouseOffset) {
      /* 如果组件下边超出画布 */
      if (coordinate.y < height + vm.offset + vm.mouseOffset) {
        /* 上边也放不下，不做处理 */
        return;
      }

      coordinate.y = coordinate.y - (height + vm.mouseOffset);
      (vm.$el as HTMLDivElement).style.top = `${coordinate.y}px`;
    }
  }

  private async show(element: Q.Element) {
    const vm = this;
    /*
     * 每个图元可以通过设置用户属性 'enableTooltip' 来启用提示信息；
     */
    if (_.get(element, "properties.enableTooltip")) {
      (vm.$el as HTMLDivElement).style.left = `${vm.mouseCoordinate.x +
        vm.mouseOffset}px`;
      (vm.$el as HTMLDivElement).style.top = `${vm.mouseCoordinate.y +
        vm.mouseOffset}px`;
      vm.visible = true;
      await vm.$nextTick();
      vm.fixCoordinate(vm.mouseCoordinate);
    }
  }

  // tslint:disable-next-line:member-ordering
  public render(h: CreateElement) {
    const vm = this;

    return (
      <div
        class="hy-qunee-tooltip"
        style={{ display: vm.visible ? "block" : "none" }}
      >
        {vm.$slots.default}
      </div>
    );
  }
}
