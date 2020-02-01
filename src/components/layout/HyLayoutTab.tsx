import _ from "lodash";
import { Component, Vue, Watch } from "vue-property-decorator";
import { Action, Getter } from "vuex-class";
import { TabItem } from "../../store/tab";
import { Button, Dropdown, DropdownItem, DropdownMenu, Tag } from "element-ui";
import { CreateElement } from "vue";

enum EVENTS {
  /** 打开标签 */
  OPEN = "open"
}

/**
 * 标签栏
 */
@Component<HyLayoutTab>({})
export class HyLayoutTab extends Vue {
  public $refs!: {
    tabContainerRef: HTMLDivElement;
    tabBodyRef: HTMLDivElement;
    tagRefs: Array<Tag>;
  };

  /** 标签栏 style.left 属性的值 */
  private tabBodyLeft: number = 0;

  @Getter
  TABS!: Array<TabItem>;
  @Getter
  CURRENT_TAB!: TabItem;
  @Action
  TAB_OPEN!: (tab: TabItem) => any;
  @Action
  TAB_CLOSE!: (tab: TabItem) => Promise<TabItem | undefined>;
  @Action
  TAB_CLOSE_ALL!: () => any;
  @Action
  TAB_CLOSE_OTHER!: () => any;

  @Watch("CURRENT_TAB", {
    immediate: true
  })
  async onCurrentTabChanged() {
    const vm = this;
    await vm.$nextTick();
    let tagVm = _.find(vm.$refs.tagRefs, i => !i.type);
    if (tagVm) {
      vm.moveToView(tagVm.$el as HTMLSpanElement);
    } else {
      setTimeout(() => {
        tagVm = _.find(vm.$refs.tagRefs, i => !i.type);
        if (tagVm) {
          vm.moveToView(tagVm.$el as HTMLSpanElement);
        }
      }, 0);
    }
  }

  /**
   *
   * @param e
   */
  handleScroll(e: WheelEvent) {
    const vm = this;
    const type = e.type;
    let delta = 0;
    if (type === "DOMMouseScroll" || type === "mousewheel") {
      delta = e.deltaY ? e.deltaY : -(e.detail || 0) * 40;
    }
    let left = 0;
    if (delta > 0) {
      left = Math.min(0, vm.tabBodyLeft + delta);
    } else {
      if (
        vm.$refs.tabContainerRef.offsetWidth - 49 <
        vm.$refs.tabBodyRef.offsetWidth
      ) {
        if (
          vm.tabBodyLeft <
          -(
            vm.$refs.tabBodyRef.offsetWidth -
            vm.$refs.tabContainerRef.offsetWidth +
            49
          )
        ) {
          left = vm.tabBodyLeft;
        } else {
          left = Math.max(
            vm.tabBodyLeft + delta,
            vm.$refs.tabContainerRef.offsetWidth -
              vm.$refs.tabBodyRef.offsetWidth -
              49
          );
        }
      } else {
        vm.tabBodyLeft = 0;
      }
    }
    vm.tabBodyLeft = left;
  }

  /**
   * 点击标签
   * @param tab 标签
   */
  handleTabClick(tab: TabItem) {
    const vm = this;

    if (tab.name === vm.CURRENT_TAB.name && tab.name !== "home") {
      return;
    }

    vm.TAB_OPEN(tab);
    vm.$emit(EVENTS.OPEN, tab);
  }

  /**hahan
   * 关闭标签
   * @param e
   * @param tab 标签
   */
  async handleTabClose(tab: TabItem, e: MouseEvent) {
    const vm = this;
    const nextTab: TabItem | undefined = await vm.TAB_CLOSE(tab);
    if (nextTab) {
      vm.handleTabClick(nextTab);
    } else {
      vm.tabBodyLeft = Math.min(
        vm.tabBodyLeft +
          ((e.target as HTMLSpanElement).parentNode as HTMLSpanElement)
            .offsetWidth,
        0
      );
    }
  }

  /**
   * 点击下拉菜单
   * @param command
   */
  async handleCommand(command: string | TabItem) {
    const vm = this;
    if (_.isString(command)) {
      if (command === "close-all") {
        await vm.TAB_CLOSE_ALL();
        vm.handleTabClick(vm.CURRENT_TAB);
      } else if (command === "close-other") {
        vm.TAB_CLOSE_OTHER();
      }
      vm.tabBodyLeft = 0;
    } else {
      vm.handleTabClick(command);
    }
  }

  /**
   * 将标签移到可视区域；
   * 49 表示右侧下拉菜单按钮的宽度；
   * @param tagEl 标签元素
   */
  moveToView(tagEl: HTMLSpanElement) {
    const vm = this;
    if (tagEl.offsetLeft < -vm.tabBodyLeft) {
      /* 标签在可视区域左侧 */
      vm.tabBodyLeft = Math.min(-tagEl.offsetLeft + 5, 0);
    } else if (
      tagEl.offsetLeft + 10 > -vm.tabBodyLeft &&
      tagEl.offsetLeft + tagEl.offsetWidth <
        -vm.tabBodyLeft + vm.$refs.tabContainerRef.offsetWidth - 49
    ) {
      /* 标签在可视区域中间 */
      vm.tabBodyLeft = Math.min(
        0,
        vm.$refs.tabContainerRef.offsetWidth -
          49 -
          tagEl.offsetWidth -
          tagEl.offsetLeft -
          20
      );
    } else {
      /* 标签在可视区域右侧 */
      vm.tabBodyLeft = -(
        tagEl.offsetLeft +
        tagEl.offsetWidth -
        (vm.$refs.tabContainerRef.offsetWidth - 49) +
        5
      );
    }
  }

  // tslint:disable-next-line:member-ordering
  public render(h: CreateElement) {
    const vm = this;

    return (
      <section class="hy-layout__tab">
        <div
          ref="tabContainerRef"
          class="hy-layout__tab__container"
          on-DOMMouseScroll={vm.handleScroll}
          on-mousewheel={vm.handleScroll}
        >
          <div class="hy-layout__tab__dropdown">
            <Dropdown
              trigger="click"
              placement="bottom-end"
              on-command={vm.handleCommand}
            >
              <Button
                type="text"
                style={{ padding: "5px 15px", height: "42px" }}
              >
                <i class="fa fa-fw fa-bars" />
              </Button>
              <DropdownMenu
                slot="dropdown"
                style={{ maxHeight: "600px", overflowY: "auto" }}
              >
                <DropdownItem
                  command="close-other"
                  style={{ fontSize: "12px", borderRadius: "2px" }}
                >
                  关闭其他
                </DropdownItem>
                <DropdownItem
                  command="close-all"
                  style={{ fontSize: "12px", borderRadius: "2px" }}
                >
                  关闭所有
                </DropdownItem>
                {vm.TABS.map((tab: TabItem, tabIndex: number) => (
                  <DropdownItem
                    key={"tab_" + tabIndex}
                    command={tab}
                    divided={tabIndex === 0}
                    class={[
                      tab.name === vm.CURRENT_TAB.name
                        ? "hy-layout__tab__dropdown-menu__item-active"
                        : ""
                    ]}
                    style={{ fontSize: "12px", borderRadius: "2px" }}
                  >
                    {tab.title}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
          <div
            ref="tabBodyRef"
            class="hy-layout__tab__body"
            style={{ left: `${vm.tabBodyLeft}px` }}
          >
            <transition-group name="hy-layout-tab-animation">
              {vm.TABS.map((tab: TabItem, tabIndex: number) => (
                <Tag
                  ref="tagRefs"
                  refInFor={true}
                  key={"tab_" + tabIndex}
                  type={tab.name === vm.CURRENT_TAB.name ? "" : "info"}
                  closable={tabIndex !== 0}
                  on-close={vm.handleTabClose.bind(vm, tab)}
                  nativeOnMousedown={(e: MouseEvent) => {
                    if (e.button === 0) {
                      vm.handleTabClick(tab);
                    } else if (e.button === 1) {
                      vm.handleTabClose(tab, e);
                    }
                  }}
                >
                  {tab.title}
                </Tag>
              ))}
            </transition-group>
          </div>
        </div>
      </section>
    );
  }
}
