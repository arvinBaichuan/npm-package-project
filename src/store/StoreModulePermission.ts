/**
 * 动作权限
 *
 * @author arvin 2018-06-12
 */

export default {
  state: {
    /** 没有授权的权限标识列表 */
    permissions: []
  },
  mutations: {
    SET_PERMISSIONS(state: any, payload: any) {
      state.permissions = payload;
    }
  },
  getters: {
    PERMISSIONS: (state: any) => state.permissions
  },
  actions: {
    /**
     * 获取权限标识
     * @param commit
     * @param payload
     * @constructor
     */
    INIT_PERMISSIONS: async ({ commit }: any, payload: any) => {
      commit("SET_PERMISSIONS", payload);
    }
  }
};
