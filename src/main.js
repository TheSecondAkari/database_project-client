import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Vant from 'vant';
import 'vant/lib/index.css';
import Routers from './router/index.js'

Vue.use(Vant);
Vue.use(VueRouter);
Vue.config.productionTip = false

const RouterConfig = {
  // mode: 'history',
  routes: Routers
};
const router = new VueRouter(RouterConfig);

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
