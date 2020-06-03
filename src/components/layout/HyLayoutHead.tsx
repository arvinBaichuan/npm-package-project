import { Component, Vue } from "vue-property-decorator";
import { Getter } from "vuex-class";
import { Menu, MenuItem } from "element-ui";
import { CreateElement } from "vue";
import { AppAccountDTO } from "../../vms/dto/index";

@Component<HyLayoutHead>({})
export class HyLayoutHead extends Vue {
  @Getter
  private APP_ACCOUNT!: AppAccountDTO;

  // tslint:disable-next-line:member-ordering
  public render(h: CreateElement) {
    const vm = this;

    return (
      <header class="hy-layout__header">
        <Menu mode="horizontal">
          <MenuItem index="1" class="hy-layout__header__menu-item__logo">
            <img src={vm.APP_ACCOUNT.app.image} />
          </MenuItem>
          <MenuItem index="2" class="hy-layout__header__menu-item__title">
            {vm.APP_ACCOUNT.app.title}
            <sup class="hy-layout__header__menu-item__version">
              {vm.APP_ACCOUNT.app.releaseVersion}
            </sup>
          </MenuItem>
          {vm.$slots.default}
        </Menu>
      </header>
    );
  }
}
