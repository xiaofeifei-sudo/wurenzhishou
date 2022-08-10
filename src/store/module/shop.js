export default {
  state: {
    shopList: [],
    disconnectShop: [],
    currentShop: null,
    workBench: null
  },
  mutations: {
    updateShopList (state, data) {
      state.shopList = data;
    },
    updateDisconnectShop (state, data) {
      state.disconnectShop = data;
    },
    updateWorkBench (state, data) {
      state.workBench = data;
    },
    restUpdateShopList (state) {
      state.shopList = [];
    },
    restUpdateWorkBench (state) {
      state.workBench = null;
    },
    restDisconnectShop (state) {
      state.disconnectShop = [];
    },
    updateCurrentShop (state, data) {
      state.currentShop = data;
    },
    resetCurrentShop (state) {
      state.currentShop = null;
    }
  }
};
