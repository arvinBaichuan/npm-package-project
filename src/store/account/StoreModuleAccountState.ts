/**
 * 状态数据
 * @author arvin 2018-07-23
 */

import { AppAccountDTO } from "../../vms/dto/index";

interface IStoreModuleAccountState {
  /** 应用账户 */
  appAccount: AppAccountDTO;
}

export { IStoreModuleAccountState };
