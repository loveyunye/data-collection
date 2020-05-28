import Vue from 'vue';
import App from './App.vue';
import router from './router/index';
import store from './store/index';
import './components/globalConfig';
// 引入 reset.css
import '@/assets/style/reset.styl';

import '@/assets/style/common.styl';
// 引入 iconfont
import '@/assets/style/iconfont.styl';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
