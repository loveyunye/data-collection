import Vue from 'vue';
import Vuex from 'vuex';
import data from './module/data';
import user from './module/user';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    data,
    user,
  },
});
