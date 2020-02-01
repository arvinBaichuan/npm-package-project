import "jquery-slimscroll";
import { Menu, MenuItem, MenuItemGroup, Submenu } from "element-ui";
import "../../types/element-ui";
import { Component, Prop, Vue } from "vue-property-decorator";
import { MenuDTO } from "@ytd/fe-core";
import { CreateElement } from "vue";

/** 事件 */
enum EVENTS {
  /** 点击菜单 */
  CLICK_MENU_ITEM = "click-menu-item"
}

/**
 * 左侧菜单
 */
@Component<HyLayoutAside>({})
export class HyLayoutAside extends Vue {
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

  /** 菜单是否折叠 */
  @Prop({
    type: Boolean,
    required: true,
    default: false
  })
  public collapse!: boolean;

  public $refs!: {
    menuRef: Menu;
  };

  public mounted() {
    const vm = this;

    /**
     * jquery-slimscroll
     */
    const fix = () => {
      if (!$.fn.slimScroll) {
        console.error("jquery-slimscroll 未加载");
        return;
      }

      $(".hy-layout__aside__menu").slimScroll({ destroy: true });
      $(".hy-layout__aside__menu").slimScroll({
        alwaysVisible: false,
        height: `${$(window).height()! - 95}px`,
        color: "rgba(0,0,0,0.2)",
        size: "3px"
      });
    };

    fix();

    window.addEventListener("resize", fix);
    vm.$once("hook:beforeDestroy", () => {
      window.removeEventListener("resize", fix);
    });
  }

  /**
   * 供外部调用，初始化当前打开的菜单
   */
  public initOpenedMenu() {
    this.$refs.menuRef.initOpenedMenu();
  }

  /**
   * 点击菜单
   * @param menu 菜单
   */
  private async handleMenuItemClick(menu: MenuDTO) {
    const vm = this;
    await vm.$nextTick();
    vm.$emit(EVENTS.CLICK_MENU_ITEM, menu);
  }

  // tslint:disable-next-line:member-ordering
  public render(h: CreateElement) {
    const vm = this;

    return (
      <aside class="hy-layout__aside">
        <section class="hy-layout__aside__menu">
          <Menu
            ref="menuRef"
            uniqueOpened={true}
            defaultActive={vm.activeMenuId}
          >
            {vm.menus.map((menu: MenuDTO) =>
              !!menu[vm.props.children] &&
              menu[vm.props.children].length > 0 ? (
                <Submenu index={menu.id} dataIndex={menu.id}>
                  <template slot="title">
                    {!!menu.icon ? (
                      <img src={menu.icon} />
                    ) : (
                      <i class="el-icon-setting hy-layout__aside__menu__title__icon" />
                    )}
                    {!vm.collapse && <span>{menu.name}</span>}
                  </template>
                  {!vm.collapse && (
                    <MenuItemGroup>
                      {menu[vm.props.children].map((childMenu: MenuDTO) => (
                        <MenuItem
                          index={childMenu.id}
                          dataIndex={childMenu.id}
                          onClick={vm.handleMenuItemClick.bind(vm, childMenu)}
                        >
                          {childMenu.canActive ? (
                            <router-link
                              to={{
                                name: childMenu.url,
                                query: { menu: childMenu.id }
                              }}
                            >
                              {childMenu.name}
                            </router-link>
                          ) : (
                            <a
                              href="javascript:void(0)"
                              id={childMenu.id}
                              class="router-link-no-active"
                            >
                              {childMenu.name}
                            </a>
                          )}
                        </MenuItem>
                      ))}
                    </MenuItemGroup>
                  )}
                </Submenu>
              ) : (
                <MenuItem
                  index={menu.id}
                  onClick={vm.handleMenuItemClick.bind(vm, menu)}
                >
                  <router-link to={{ name: menu.url }}>
                    {!!menu.icon ? (
                      <img src={menu.icon} />
                    ) : (
                      <i class="el-icon-setting hy-layout__aside__menu__title__icon" />
                    )}
                    {!vm.collapse && <span>{menu.name}</span>}
                  </router-link>
                </MenuItem>
              )
            )}
          </Menu>
        </section>
      </aside>
    );
  }
}
