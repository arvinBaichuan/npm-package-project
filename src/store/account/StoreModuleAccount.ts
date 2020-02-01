/**
 * 状态管理：应用账户
 * @author arvin 2018-07-20
 */

import { AppAccountDTO } from "@ytd/fe-core";
import { ActionContext, Module } from "vuex";
import { IStoreModuleAccountState } from "./StoreModuleAccountState";

const StoreModuleAccount: Module<IStoreModuleAccountState, any> = {
  state: {
    /** 应用账户 */
    appAccount: new AppAccountDTO()
  },
  getters: {
    APP_ACCOUNT: (state: IStoreModuleAccountState) => state.appAccount
  },
  mutations: {
    _APP_ACCOUNT_SET(state: IStoreModuleAccountState, payload: AppAccountDTO) {
      state.appAccount = payload;
    }
  },
  actions: {
    APP_ACCOUNT_SET: (
      { commit }: ActionContext<IStoreModuleAccountState, any>,
      payload: AppAccountDTO
    ) => commit("_APP_ACCOUNT_SET", payload)
  }
};

export { StoreModuleAccount };
