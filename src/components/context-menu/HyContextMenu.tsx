import { Component, Prop, Vue } from "vue-property-decorator";
import { CreateElement } from "vue";
import { VueContext } from "vue-context";
import { IHyContextMenu } from "../../vms";
import _ from "lodash";
import { HyContextMenuEventEnum } from "./vms/HyContextMenuEventEnum";

/**
 * 右键菜单
 */
@Component<HyContextMenu>({})
export class HyContextMenu extends Vue {
  /** 菜单列表 */
  @Prop({
    type: Array,
    default() {
      return [];
    }
  })
  public menus!: Array<IHyContextMenu>;

  public $refs!: {
    contextMenuRef: VueContext;
  };

  public mounted() {
    const vm = this;

    window.addEventListener("wheel", vm.handleWindowWheel);
    vm.$once("hook:beforeDestroy", () => {
      window.removeEventListener("wheel", vm.handleWindowWheel);
    });
  }

  /**
   * 打开右键菜单
   * @param e 鼠标事件对象
   */
  public open(e: MouseEvent) {
    const vm = this;

    if (vm.$refs.contextMenuRef) {
      vm.$refs.contextMenuRef.open(e);
    }
  }

  /**
   * 关闭右键菜单
   */
  public close() {
    const vm = this;

    if (vm.$refs.contextMenuRef) {
      vm.$refs.contextMenuRef.close();
    }
  }

  /**
   * 鼠标滚轮滚动
   * @param e 滚动事件
   */
  private handleWindowWheel(e: WheelEvent) {
    const vm = this;

    const path = e.composedPath();
    if (!path.includes(vm.$el)) {
      vm.close();
    }
  }

  /**
   * 点击右键菜单
   * @param menu 右键菜单
   */
  private handleClick(menu: IHyContextMenu) {
    const vm = this;

    if (menu.disabled) {
      return;
    }

    if (!_.isFunction(menu.handler)) {
      console.warn("没有定义回调函数");
      return;
    }

    vm.$emit(HyContextMenuEventEnum.CLICK, menu);
  }

  // tslint:disable-next-line:member-ordering
  public render(h: CreateElement) {
    const vm = this;

    return (
      <VueContext
        ref="contextMenuRef"
        class="hy-context-menu"
        nativeOnContextmenu={(e: MouseEvent) => {
          e.preventDefault();
        }}
      >
        <ul>
          {_.map(vm.menus, (menu: IHyContextMenu) => (
            <li
              class={[
                menu.disabled ? "disabled" : "",
                menu.divide ? "divide" : ""
              ]}
              onClick={vm.handleClick.bind(vm, menu)}
            >
              {!menu.divide && !!menu.icon && (
                <span domPropsInnerHTML={menu.icon} />
              )}
              {!menu.divide && !menu.icon && <i class="fa fa-circle-o fa-fw" />}
              {menu.divide ? "" : menu.name}
            </li>
          ))}
        </ul>
      </VueContext>
    );
  }
}
