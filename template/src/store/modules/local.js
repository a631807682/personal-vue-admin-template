import {
  SET_LOCAL_COLLAPSED,
  SET_LOCAL_ROUTERS,
  SET_LOCAL_USER,
  SET_LOCAL_TOOLBAR_EXIST,
  SET_LOCAL_TOOLBAR_VISABLE,
  SET_LOCAL_IS_MOBILE } from '../mutation-types'

const state = {
  collapsed: true,
  accessedRouters: [],
  user: null,
  toolbarExist: false,
  toolbarVisable: false,
  isMobile: false
}

// mutations
const mutations = {
  [SET_LOCAL_COLLAPSED] (state, val) {
    state.collapsed = val
  },
  [SET_LOCAL_ROUTERS] (state, val) {
    state.accessedRouters = val
  },
  [SET_LOCAL_USER] (state, val) {
    state.user = val
  },
  [SET_LOCAL_TOOLBAR_EXIST] (state, val) {
    state.toolbarExist = val
  },
  [SET_LOCAL_TOOLBAR_VISABLE] (state, val) {
    state.toolbarVisable = val
  },
  [SET_LOCAL_IS_MOBILE] (state, val) {
    state.isMobile = val
  }
}

export default {
  state,
  mutations
}
