import {
  BreadcrumbItem,
  Menu as ElMenu,
  MenuItem,
  MenuItem as ElMenuItem,
  MenuItemGroup as ElMenuItemGroup,
  Submenu as ElSubmenu
} from "element-ui";
import { MenuDTO } from "../../vms/dto/index";
import { Component, Prop, Vue } from "vue-property-decorator";
import { HyLayoutHead } from "./HyLayoutHead";
import { HyLayoutAside } from "./HyLayoutAside";
import { HyLayoutBreadcrumb } from "./HyLayoutBreadcrumb";
import { HyLayoutTab } from "./HyLayoutTab";
import { HyLayoutLoading } from "./HyLayoutLoading";
import { CreateElement } from "vue";
import { TabItem } from "../../store";
import { Action } from "vuex-class";

/** 事件 */
export const EVENTS = {
  /** 点击菜单 */
  CLICK_MENU_ITEM: "click-menu-item",
  /** 点击面包屑 */
  CLICK_BREADCRUMB: "click-breadcrumb",
  /** 展开 & 关闭菜单栏 */
  TOGGLE_MENU_BAR: "toggle-menu-bar",
  /** 打开标签 */
  OPEN_TAB: "open-tab",
  /** 关闭标签 */
  CLOSE_TAB: "close-tab",
  /** 关闭所有标签 */
  CLOSE_ALL_TAB: "close-all-tab",
  /** 关闭其他标签 */
  CLOSE_OTHER_TAB: "close-other-tab"
};

/**
 * 布局
 */
@Component<HyLayout>({
  components: {
    ElMenu,
    ElSubmenu,
    ElMenuItem,
    ElMenuItemGroup,
    HyLayoutHeader: HyLayoutHead,
    HyLayoutAside: HyLayoutAside,
    HyLayoutBreadcrumb: HyLayoutBreadcrumb
  }
})
export class HyLayout extends Vue {
  /** 自定义属性名称 */
  @Prop({
    default() {
      return {
        children: "children"
      };
    }
  })
  public props!: { children: string };

  /** 所有菜单 */
  @Prop({
    required: true,
    default() {
      return [];
    }
  })
  public menus!: Array<MenuDTO>;

  /** 当前激活的菜单ID */
  @Prop({
    required: true,
    default: "home"
  })
  public activeMenuId!: string;

  /** 是否禁用面包屑导航 */
  @Prop({
    type: Boolean,
    default: false
  })
  public breadcrumbDisabled!: string;

  /** 是否禁用标签导航 */
  @Prop({
    type: Boolean,
    default: false
  })
  public tabDisabled!: string;

  public $refs!: {
    refHyLayoutAside: HyLayoutAside;
  };

  @Action
  private SET_NAV_MENU_COLLAPSED!: (collapsed: boolean) => void;

  /** 菜单是否折叠 */
  private collapse: boolean = false;

  /**
   * 供外部调用，初始化当前打开的菜单
   */
  public initOpenedMenu() {
    this.$refs.refHyLayoutAside.initOpenedMenu();
  }

  /**
   * 展开 & 关闭菜单栏
   */
  private toggleMenuBar() {
    const vm = this;
    vm.collapse = !vm.collapse;
    vm.SET_NAV_MENU_COLLAPSED(vm.collapse);
    vm.$emit(EVENTS.TOGGLE_MENU_BAR, vm.collapse);
  }

  // tslint:disable-next-line:member-ordering
  public render(h: CreateElement) {
    const vm = this;

    return (
      <section
        class={["hy-layout", vm.collapse ? "hy-layout--collapse" : ""]}
      >
        <HyLayoutLoading />
        <HyLayoutHead>{vm.$slots.header}</HyLayoutHead>
        <a
          href="javascript:void(0)"
          class="hy-layout__toggle"
          on-click={vm.toggleMenuBar}
        >
          <span class="hy-layout__toggle__content">
            <i
              class={[
                vm.collapse ? "el-icon-d-arrow-left" : "el-icon-d-arrow-right"
              ]}
            />
          </span>
        </a>
        <HyLayoutAside
          ref="refHyLayoutAside"
          {...{
            props: {
              props: vm.props
            }
          }}
          collapse={vm.collapse}
          menus={vm.menus}
          active-menu-id={vm.activeMenuId}
          on-click-menu-item={(menuItem: MenuItem) => {
            vm.$emit(EVENTS.CLICK_MENU_ITEM, menuItem);
          }}
        />
        {!vm.breadcrumbDisabled && (
          <HyLayoutBreadcrumb
            on-click={(breadcrumbItem: BreadcrumbItem) => {
              vm.$emit(EVENTS.CLICK_BREADCRUMB, breadcrumbItem);
            }}
          />
        )}
        {!vm.tabDisabled && (
          <HyLayoutTab
            style={{ marginTop: vm.breadcrumbDisabled ? "50px" : "96px" }}
            on-open={(tabItem: TabItem) => {
              vm.$emit(EVENTS.OPEN_TAB, tabItem);
            }}
            on-close={(tabItem: TabItem) => {
              vm.$emit(EVENTS.CLOSE_TAB, tabItem);
            }}
            on-close-all={() => {
              vm.$emit(EVENTS.CLOSE_ALL_TAB);
            }}
            on-close-other={() => {
              vm.$emit(EVENTS.CLOSE_OTHER_TAB);
            }}
          />
        )}
        <section
          class={[
            "hy-layout__content",
            vm.breadcrumbDisabled ? "hy-layout__content--no-breadcrumb" : "",
            vm.tabDisabled ? "hy-layout__content--no-tab" : ""
          ]}
        >
          {vm.$slots.content}
        </section>
        {vm.$slots.default}
      </section>
    );
  }
}
