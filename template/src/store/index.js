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
  actions,
  getters: {
    toolbarExist: state => {
      return state.local.toolbarExist
    },
    toolbarVisable: state => {
      return state.local.toolbarVisable
    },
    isMobile: state => {
      return state.local.isMobile
    },
    isCollapsed: state => {
      return state.local.collapsed
    },
    user: state => {
      return state.local.user
    }
  }
})
