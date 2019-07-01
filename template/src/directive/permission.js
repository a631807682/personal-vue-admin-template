import { localStore, menuHelper } from 'src/lib/utils'

export default {
  inserted (el, binding, vnode) {
    let hasPermission = false
    let user = localStore.getUser()
    if (user) {
      if (user.role.isSuper) {
        hasPermission = true
      } else {
        let menus = user.role.menus
        // 当前匹配的路由
        let routePath = vnode.context.$route.path
        let cmpRole = menuHelper.join(routePath, binding.value)
        hasPermission = !!menus.find(m => m === cmpRole)
      }
    }

    if (!hasPermission) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
