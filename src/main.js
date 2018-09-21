import Vue from 'vue'

import store from './store'
import router from './router/index'
// import router from './router/new'
import App from './App'
// import 'bootstrap/dist/css/bootstrap.css'
import ElementUI from 'element-ui'
// import '../theme/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'

Vue.use(ElementUI)


// Vue.config.errorHandler = function(error) {
//   alert('Caught an error', error);
// }

/* eslint-disable no-new */
// 这灵活得亮瞎了
/*new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: { App }
});

 new Vue(Vue.util.extend({
   router
 }, App)).$mount('#app');

new Vue({
  el:'#app',
  router,
  render:h => h(App)
});*/

let app = new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
