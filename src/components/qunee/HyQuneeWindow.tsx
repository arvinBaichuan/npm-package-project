import { Col, Row } from "element-ui";
import { Component, Prop } from "vue-property-decorator";
import Vue, { CreateElement } from "vue";
import { HyQuneeWindowPlacementEnum } from "../../vms/index";

/** 拓扑图：窗口 */
@Component<HyQuneeWindow>({})
export class HyQuneeWindow extends Vue {
  readonly name: string = "HyQuneeWindow";

  /** 是否显示 */
  @Prop({
    type: Boolean,
    required: true
  })
  visible!: boolean;

  /** 标题 */
  @Prop({
    type: String,
    required: true
  })
  title!: string;

  /** 位置 */
  @Prop({
    type: String,
    default() {
      return HyQuneeWindowPlacementEnum.LEFT;
    }
  })
  placement!: HyQuneeWindowPlacementEnum;

  /** 是否可以手动关闭 */
  @Prop({
    type: Boolean,
    default: true
  })
  closable!: boolean;

  /** 图标类名 */
  @Prop({
    type: String,
    default: "fa-circle-o"
  })
  iconClass!: string;

  style: string = "";

  /**
   * 关闭
   */
  public close() {
    this.$emit("update:visible", false);
  }

  // tslint:disable-next-line:member-ordering
  render(h: CreateElement) {
    const vm = this;

    return (
      <div
        class={["hy-qunee-window", `hy-qunee-window--${vm.placement}`]}
        style={`${vm.style};${
          vm.visible ? "display: block;" : "display: none;"
        }`}
      >
        <div class="hy-qunee-window__heading">
          <Row>
            <Col span={18}>
              <div class="hy-qunee-window__title">{vm.title}</div>
            </Col>
            <Col span={6}>
              <div class="action">
                {vm.$slots.action}
                {vm.closable && (
                  <i class="fa fa-times fa-fw" onClick={vm.close} />
                )}
              </div>
            </Col>
          </Row>
        </div>
        <div class="hy-qunee-window__body">{vm.$slots.default}</div>
      </div>
    );
  }
}
