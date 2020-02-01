import _ from "lodash";
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { CreateElement } from "vue";

/** 事件 */
const EVENTS = {
  /** 清空 */
  CLEAR: "clear",
  /** 搜索 */
  SEARCH: "search"
};

/**
 * 搜索
 */
@Component<HySearch>({})
export class HySearch extends Vue {
  @Prop({
    type: String,
    required: true,
    default: ""
  })
  public value!: string;

  @Prop({
    type: String,
    default: "关键字 …"
  })
  public placeholder!: string;

  /** 是否禁用 */
  @Prop({ type: Boolean, default: false })
  public disabled!: boolean;

  /**
   * 是否在触发 'clear' 事件的时候，同时触发 'search' 事件；
   */
  @Prop({ type: Boolean, default: true })
  public triggerSearchOnClear!: boolean;

  /**
   * 是否在 value 改变时实时触发 'search' 事件，
   * 而不需要'回车'或者'点击搜索按钮'
   */
  @Prop({ type: Boolean, default: false })
  public realTime!: boolean;

  @Watch("value")
  public onValueChanged(value: string, oldValue: string) {
    const vm = this;

    if (_.isEmpty(_.trim(value)) && !_.isEmpty(_.trim(oldValue))) {
      vm.$emit(EVENTS.CLEAR);
      if (vm.triggerSearchOnClear) {
        vm.$emit(EVENTS.SEARCH);
      } else if (vm.realTime) {
        vm.$emit(EVENTS.SEARCH);
      }
    } else if (vm.realTime) {
      vm.$emit(EVENTS.SEARCH);
    }
  }

  private handleValueChange(e: Event) {
    const vm = this;
    if (vm.disabled) {
      return;
    }

    vm.$emit("input", (e.target as HTMLInputElement).value);
  }

  /**
   * 点击清除按钮
   */
  private handleClearButtonClick() {
    const vm = this;
    if (vm.disabled) {
      return;
    }

    vm.$emit("input", "");
  }

  /**
   * 点击搜索按钮
   */
  private handleSearchButtonClick(e: KeyboardEvent | MouseEvent) {
    const vm = this;

    if (e instanceof KeyboardEvent && e.key !== "Enter") {
      return;
    }

    if (vm.disabled) {
      return;
    }

    vm.$emit(EVENTS.SEARCH);
  }

  // tslint:disable-next-line:member-ordering
  public render(h: CreateElement) {
    const vm = this;

    return (
      <section
        class={[
          "hy-search",
          "el-input",
          "el-input--small",
          vm.disabled ? "is-disabled" : ""
        ]}
      >
        <div class="el-input--small el-input--suffix">
          <input
            class={["el-input__inner", vm.disabled ? "is-disabled" : ""]}
            disabled={vm.disabled}
            value={vm.value}
            onInput={vm.handleValueChange}
            placeholder={vm.placeholder}
            autocomplete="off"
            on-keyup={vm.handleSearchButtonClick}
          />
          {!vm.realTime && (
            <span
              class="el-input__suffix hy-search__suffix__search"
              on-click={vm.handleSearchButtonClick}
            >
              <span class="el-input__suffix-inner">
                <i class="el-input__icon el-icon-search" />
              </span>
            </span>
          )}
          {!vm.realTime && (
            <span
              class="el-input__suffix hy-search__suffix__close"
              on-click={vm.handleClearButtonClick}
            >
              <span class="el-input__suffix-inner">
                <i class="el-input__icon el-icon-close" />
              </span>
            </span>
          )}
        </div>
      </section>
    );
  }
}
