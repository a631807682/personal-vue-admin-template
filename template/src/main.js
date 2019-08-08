/* eslint-disable no-new */
import 'babel-polyfill'
import Vue from 'vue'
// UI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
// 字体
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAlignJustify
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

// 过滤器
import { statusFilter } from 'src/lib/filter'
// 自定义指令
import 'src/directive'

import store from 'src/store'
import router from 'src/router/index'
import App from 'src/App'
import Common from './components/common'

// Vue.config.errorHandler = function (error) {
//   alert('Caught an error', error)
// }

// 添加组件
Vue.use(ElementUI)
Vue.use(Common)

library.add([faAlignJustify])
Vue.component('font-awesome-icon', FontAwesomeIcon)

// 添加过滤器
Vue.filter('statusFilter', statusFilter)

Vue.config.devtools = true

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
