/**
 * vuex
 * @author arvin 2016-12-03
 */

import Vue from "vue";
import Vuex from "vuex";
import StoreModulePermission from "./StoreModulePermission";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    StoreModulePermission
  }
});
export * from "./account";
export * from "./loading";
export * from "./nav";
export * from "./tab";
export * from "./websocket";
