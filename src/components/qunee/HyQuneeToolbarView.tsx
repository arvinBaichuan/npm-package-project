import _ from "lodash";
import Vue, { CreateElement } from "vue";
import { Component, Prop } from "vue-property-decorator";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Tooltip
} from "element-ui";
import { HyQuneeWindow } from "./HyQuneeWindow";

enum HyQuneeToolbarItemViewEventEnum {
  /* 左边窗口显示或隐藏 */
  TOGGLE_LEFT_WINDOW = "toggle-left-window",
  /* 右边窗口显示或隐藏 */
  TOGGLE_RIGHT_WINDOW = "toggle-right-window",
  /* 底部窗口显示或隐藏 */
  TOGGLE_BOTTOM_WINDOW = "toggle-bottom-window"
}

/**
 * 拓扑图：工具栏：查看窗口
 */
@Component<HyQuneeToolbarView>({})
export class HyQuneeToolbarView extends Vue {
  /** 左侧窗口 */
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  public leftWindows!: Array<HyQuneeWindow>;

  /** 右侧窗口 */
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  public rightWindows!: Array<HyQuneeWindow>;

  /** 底侧窗口 */
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  public bottomWindows!: Array<HyQuneeWindow>;

  /** 当前显示的左侧窗口 */
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  public visibleLeftWindows!: Array<string>;

  /** 当前显示的右侧窗口 */
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  public visibleRightWindows!: Array<string>;

  /** 当前显示的底部窗口 */
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  public visibleBottomWindows!: Array<string>;

  get visibleLeftWindow(): Array<string> {
    return this.visibleLeftWindows;
  }

  set visibleLeftWindow(visibleLeftWindows: Array<string>) {
    this.$emit("update:visibleLeftWindows", visibleLeftWindows);
  }

  get visibleRightWindow(): Array<string> {
    return this.visibleRightWindows;
  }

  set visibleRightWindow(visibleRightWindows: Array<string>) {
    this.$emit("update:visibleRightWindows", visibleRightWindows);
  }

  get visibleBottomWindow(): Array<string> {
    return this.visibleBottomWindows;
  }

  set visibleBottomWindow(visibleBottomWindows: Array<string>) {
    this.$emit("update:visibleBottomWindows", visibleBottomWindows);
  }

  /**
   * 可以关闭的左边窗口
   */
  get closeableLeftWindows(): Array<HyQuneeWindow> {
    return _.filter(this.leftWindows, (item: HyQuneeWindow) => item.closable);
  }

  /**
   * 可以关闭的右边窗口
   */
  get closeableRightWindows(): Array<HyQuneeWindow> {
    return _.filter(this.rightWindows, (item: HyQuneeWindow) => item.closable);
  }

  /**
   * 可以关闭的底部窗口
   */
  get closeableBottomWindows(): Array<HyQuneeWindow> {
    return _.filter(
      this.bottomWindows,
      (item: HyQuneeWindow) => item.closable
    );
  }

  /**
   * 切换左侧窗口的显示或隐藏
   * @param HyQuneeWindow 窗口
   * @param visible 是否显示
   */
  private handleToggleLeftWindow(
    HyQuneeWindow: HyQuneeWindow,
    visible: boolean
  ) {
    const vm = this;
    vm.$emit(
      HyQuneeToolbarItemViewEventEnum.TOGGLE_LEFT_WINDOW,
      visible,
      HyQuneeWindow
    );
  }

  /**
   * 切换右侧窗口的显示或隐藏
   * @param HyQuneeWindow 窗口
   * @param visible 是否显示
   */
  private handleToggleRightWindow(
    HyQuneeWindow: HyQuneeWindow,
    visible: boolean
  ) {
    const vm = this;
    vm.$emit(
      HyQuneeToolbarItemViewEventEnum.TOGGLE_RIGHT_WINDOW,
      visible,
      HyQuneeWindow
    );
  }

  /**
   * 切换底部窗口的显示或隐藏
   * @param HyQuneeWindow 窗口
   * @param visible 是否显示
   */
  private handleToggleBottomWindow(
    HyQuneeWindow: HyQuneeWindow,
    visible: boolean
  ) {
    const vm = this;
    vm.$emit(
      HyQuneeToolbarItemViewEventEnum.TOGGLE_BOTTOM_WINDOW,
      visible,
      HyQuneeWindow
    );
  }

  // tslint:disable-next-line:member-ordering
  public render(h: CreateElement) {
    const vm = this;

    return (
      <Dropdown
        trigger="click"
        placement="bottom-start"
        style={{ marginRight: "3px" }}
      >
        <Tooltip
          enterable={false}
          placement="bottom-start"
          effect="light"
          content="查看窗口"
        >
          <Button type="primary" class="hy-qunee__toolbar-button">
            <i class="fa fa-fw fa-clone" />
          </Button>
        </Tooltip>
        <DropdownMenu slot="dropdown" class="hy-qunee__toolbar__view-dropdown">
          {vm.closeableLeftWindows && vm.closeableLeftWindows.length > 0 && (
            <CheckboxGroup vModel={vm.visibleLeftWindow}>
              {vm.closeableLeftWindows.map((win, index) => (
                <DropdownItem key={`left-window-${index}`}>
                  <Checkbox
                    label={win.title}
                    onChange={vm.handleToggleLeftWindow.bind(vm, win)}
                  />
                </DropdownItem>
              ))}
            </CheckboxGroup>
          )}
          {vm.closeableRightWindows && vm.closeableRightWindows.length > 0 && (
            <CheckboxGroup vModel={vm.visibleRightWindow}>
              {vm.closeableRightWindows.map((win, index) => (
                <DropdownItem
                  key={`right-window-${index}`}
                  divided={
                    index === 0 &&
                    vm.closeableLeftWindows &&
                    vm.closeableLeftWindows.length > 0
                  }
                >
                  <Checkbox
                    label={win.title}
                    onChange={vm.handleToggleRightWindow.bind(vm, win)}
                  />
                </DropdownItem>
              ))}
            </CheckboxGroup>
          )}
          {vm.closeableBottomWindows && vm.closeableBottomWindows.length > 0 && (
            <CheckboxGroup vModel={vm.visibleBottomWindow}>
              {vm.closeableBottomWindows.map((win, index) => (
                <DropdownItem
                  key={`bottom-window-${index}`}
                  divided={
                    index === 0 &&
                    ((vm.closeableLeftWindows &&
                      vm.closeableLeftWindows.length > 0) ||
                      (vm.closeableRightWindows &&
                        vm.closeableRightWindows.length > 0))
                  }
                >
                  <Checkbox
                    label={win.title}
                    onChange={vm.handleToggleBottomWindow.bind(vm, win)}
                  />
                </DropdownItem>
              ))}
            </CheckboxGroup>
          )}
        </DropdownMenu>
      </Dropdown>
    );
  }
}
