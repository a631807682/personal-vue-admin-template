import Vue from 'vue'

import store from './store'
import router from './router/index'
import App from './App'

//UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.use(ElementUI);

//添加过滤器
Vue.filter('statusFilter', statusFilter);

Vue.config.devtools = true

// Vue.config.errorHandler = function(error) {
//   alert('Caught an error', error);
// }



let app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
