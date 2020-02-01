import Vue from "vue";
import { IInstallOption } from "../vms";

/**
 * 指令类型
 * @author arvin 2018-08-24
 */

interface IDirective {
  /**
   * 注册指令
   * @param vue
   * @param options
   */
  install(vue: typeof Vue, options: IInstallOption): void;
}

export { IDirective };
