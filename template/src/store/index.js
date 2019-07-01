import Vue from 'vue'
import Vuex from 'vuex'
// import mutations from './mutations'
import local from './modules/local'
import error from './modules/error'

import * as actions from './actions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    local,
    error
  },
  actions

})
