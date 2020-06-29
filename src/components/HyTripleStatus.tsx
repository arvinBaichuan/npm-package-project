import { Component, Prop, Vue } from "vue-property-decorator";
import { MessageBox, Switch, Tooltip } from "element-ui";
import { CreateElement } from "vue";
import { StatusEnum } from "../vms/enum/index";

/**
 * 资源状态
 */
@Component<HyTripleStatus>({})
export class HyTripleStatus extends Vue {
  /** 状态 */
  @Prop({
    required: true,
    default: StatusEnum.CREATED
  })
  public value: StatusEnum;

  /** 按钮尺寸 */
  @Prop({
    default: "small"
  })
  public size?: "small" | "large";

  /** 是否禁用 */
  @Prop({
    default: false
  })
  public disabled?: boolean;

  public $refs!: {
    hyTripleStatusTooltipRef: Tooltip & { hide(): void };
  };

  private get booleanValue() {
    return this.value === StatusEnum.ENABLED;
  }

  /**
   * 切换'启用'和'禁用'
   * @param value
   */
  private async handleChange(value: boolean) {
    const vm = this;
    if (vm.value === StatusEnum.CREATED) {
      vm.$refs.hyTripleStatusTooltipRef.hide();
      /*
       * 从'新建'切换为'启用'
       */
      try {
        await MessageBox.confirm(
          "启用后将无法删除，只能切换启用或禁用状态，确认启用？",
          "确认",
          {
            closeOnClickModal: false,
            confirmButtonText: "确认",
            cancelButtonText: "取消"
          }
        );
        vm.$emit("input", StatusEnum.ENABLED);
        vm.$emit(EVENTS.CHANGE);
      } catch (e) {
        if (e !== "cancel") {
          throw e;
        }

        vm.$emit("input", StatusEnum.CREATED);
      }
    } else {
      if (value) {
        vm.$emit("input", StatusEnum.ENABLED);
        vm.$emit(EVENTS.CHANGE);
      } else {
        vm.$emit("input", StatusEnum.DISABLED);
        vm.$emit(EVENTS.CHANGE);
      }
    }
  }

  // tslint:disable-next-line:member-ordering
  public render(h: CreateElement) {
    const vm = this;

    return (
      <section
        class={[
          "hy-triple-status",
          vm.size ? `hy-triple-status--${vm.size}` : ""
        ]}
      >
        {[StatusEnum.CREATED, StatusEnum.ENABLED, StatusEnum.DISABLED].includes(
          vm.value
        ) && (
          <Tooltip
            ref="hyTripleStatusTooltipRef"
            enterable={false}
            placement="top-start"
            effect="light"
            content={vm.value === StatusEnum.ENABLED ? "禁用" : "启用"}
            popperClass={"hy-triple-status__tooltip"}
          >
            <Switch
              value={vm.booleanValue}
              onInput={vm.handleChange}
              activeColor="#67c23a"
              inactiveColor={
                vm.value === StatusEnum.CREATED ? "#dcdfe6" : "#f56c6c"
              }
              width={vm.size === "small" ? 40 : 60}
              disabled={vm.disabled}
            />
          </Tooltip>
        )}
      </section>
    );
  }
}

enum EVENTS {
  CHANGE = "change"
}
