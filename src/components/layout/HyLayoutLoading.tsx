import { Component, Vue } from "vue-property-decorator";
import { CreateElement } from "vue";
import { Getter } from "vuex-class";

/**
 * 全局加载指示
 */
@Component<HyLayoutLoading>({})
export class HyLayoutLoading extends Vue {
  @Getter
  private LOADING_VISIBLE!: boolean;

  @Getter
  private LOADING_MESSAGE!: boolean;

  // tslint:disable-next-line:member-ordering
  public render(h: CreateElement) {
    const vm = this;

    if (!vm.LOADING_VISIBLE) {
      return null;
    }

    return (
      <div class="hy-layout__loading">
        <svg viewBox="25 25 50 50" class="circular">
          <circle cx={50} cy={50} r={20} fill="none" class="path" />
        </svg>
        <span class="hy-layout__loading__message">{vm.LOADING_MESSAGE}</span>
      </div>
    );
  }
}
