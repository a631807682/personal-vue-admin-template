import Vue from 'vue'

import store from './store'
import router from './router/index'
import App from './App'

//UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//过滤器
import { statusFilter } from 'src/lib/filter'
//自定义指令
import 'src/directive'

//字体
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAlignJustify,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

//添加组件
library.add([faAlignJustify])
Vue.component('font-awesome-icon', FontAwesomeIcon);

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
