import Vue from 'vue';
import Vuex from 'vuex';

import user from './module/user';
import app from './module/app';
import notice from './module/notice';
import shop from './module/shop';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {
    //
  },
  modules: {
    user,
    notice,
    app,
    shop
  }
});
