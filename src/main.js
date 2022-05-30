import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import "./assets/css/reset.css"

import "./components/index"

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

Vue.prototype.$primary2='rgb(36,45,78)';

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
