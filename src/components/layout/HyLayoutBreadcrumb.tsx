import { Component, Vue } from "vue-property-decorator";
import { NavBreadcrumb, NavBreadcrumbItem } from "../../store/nav/index";
import { Getter } from "vuex-class";
import { CreateElement } from "vue";
import { Breadcrumb, BreadcrumbItem } from "element-ui";

/** 事件 */
enum EVENTS {
  /** 点击面包屑链接 */
  CLICK = "click"
}

/**
 * 面包屑导航栏
 */
@Component<HyLayoutBreadcrumb>({})
export class HyLayoutBreadcrumb extends Vue {
  @Getter
  private NAV_BREADCRUMB!: NavBreadcrumb;

  /**
   * 点击面包屑链接
   * @param breadcrumbItem
   */
  private handleItemClick(breadcrumbItem: NavBreadcrumbItem) {
    const vm = this;

    if (breadcrumbItem.isLink) {
      vm.$emit(EVENTS.CLICK, breadcrumbItem);
    }
  }

  // tslint:disable-next-line:member-ordering
  public render(h: CreateElement) {
    const vm = this;

    return (
      <section class="hy-layout__breadcrumb">
        <h3 class="hy-layout__breadcrumb__title">{vm.NAV_BREADCRUMB.title}</h3>
        <Breadcrumb>
          {vm.NAV_BREADCRUMB.items.map(
            (item: NavBreadcrumbItem, itemIndex: number) => (
              <BreadcrumbItem
                class={[
                  "hy-layout__breadcrumb__item",
                  item.isLink
                    ? "hy-layout__breadcrumb__item--link"
                    : "hy-layout__breadcrumb__item--text"
                ]}
              >
                {itemIndex !== 0 && <i class="fa fa-caret-right" />}
                <span onClick={vm.handleItemClick.bind(vm, item)}>
                  {item.name}
                </span>
              </BreadcrumbItem>
            )
          )}
        </Breadcrumb>
      </section>
    );
  }
}
