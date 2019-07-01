import Vue from 'vue'
import VueRouter from 'vue-router'

import { constantRouterMap } from 'src/router/constant'
import { asyncRouterMap, generateRoutesFromMenu } from 'src/router/async'

import { SET_LOCAL } from 'src/store/mutation-types'
import store from 'src/store'

import { localStore } from 'src/lib/utils'

Vue.use(VueRouter)

// 公共路由
let router = new VueRouter({
  mode: 'history',
  routes: constantRouterMap
})

// 避免重复更改路由
let loadRoutes = false

router.beforeEach((to, from, next) => {
  // 登陆验证
  if (to.path === '/login') {
    localStore.removeUser()
    loadRoutes = false
    next()
  }

  let user = localStore.getUser()
  if (!user || !user.role) {
    next({ path: '/login' })
  } else {
    // 异步挂载路由
    if (!loadRoutes) {
      let accessedRouters = []
      // 用户权限
      let { role } = user

      if (!role.isSuper) {
        // 可访问路由
        accessedRouters = generateRoutesFromMenu(role.menus)
      } else {
        accessedRouters = asyncRouterMap
      }

      console.log('accessedRouters', accessedRouters)

      if (accessedRouters.length > 0) {
        // 添加路由
        router.addRoutes(accessedRouters)
        // 写入store供左菜单读取
        store.commit(SET_LOCAL, { field: 'accessedRouters', val: accessedRouters })
        loadRoutes = true
        next(to)
      }
    }

    next()
  }

  // 更改网页title
  let name = ''
  if (to.name) {
    name = to.name
  }
  document.title = name
  next()
})

export default router
