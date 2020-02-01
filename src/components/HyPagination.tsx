import { Component, Prop, Vue } from "vue-property-decorator";
import { Pagination } from "element-ui";
import { PageFilter } from "@ytd/fe-core";
import { CreateElement } from "vue";

const EVENTS = {
  CURRENT_CHANGE: "current-change",
  SIZE_CHANGE: "size-change"
};

/**
 * 分页
 */
@Component<HyPagination>({})
export class HyPagination extends Vue {
  /**
   * 分页参数
   */
  @Prop({
    type: [PageFilter, Object],
    default() {
      return new PageFilter();
    }
  })
  page: PageFilter;

  /**
   * '每页条数'下拉列表
   */
  @Prop({
    type: Array,
    default() {
      return [10, 20, 50];
    }
  })
  pageSizes: Array<number>;

  /**
   * 显示的页码按钮的数量
   */
  @Prop({
    type: Number,
    default: 7
  })
  pagerCount: number;

  /**
   * 布局
   */
  @Prop({
    type: String,
    default: "total, prev, pager, next, sizes"
  })
  layout: string;

  /**
   *
   * @param currentPage
   */
  handleCurrentChange(currentPage: number) {
    const vm = this;
    vm.page.pageIndex = currentPage;
    vm.$emit(EVENTS.CURRENT_CHANGE);
  }

  /**
   *
   * @param pageSize
   */
  handleSizeChange(pageSize: number) {
    const vm = this;
    vm.page.pageIndex = 1;
    vm.page.pageSize = pageSize;
    vm.$emit(EVENTS.SIZE_CHANGE);
  }

  // tslint:disable-next-line:member-ordering
  render(h: CreateElement) {
    const vm = this;

    return (
      <section class="hy-pagination">
        {vm.page.totalElements > 0 && (
          <Pagination
            background={true}
            current-page={vm.page.pageIndex}
            total={vm.page.totalElements}
            page-size={vm.page.pageSize}
            page-sizes={vm.pageSizes}
            pager-count={vm.pagerCount}
            layout={vm.layout}
            style={{ textAlign: "right" }}
            on-current-change={vm.handleCurrentChange}
            on-size-change={vm.handleSizeChange}
          />
        )}
      </section>
    );
  }
}
