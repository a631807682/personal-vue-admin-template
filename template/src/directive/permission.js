import { menuHelper } from 'src/lib/utils'

export default {
  inserted (el, binding, vnode) {
    let hasPermission = false
    let vm = vnode.context
    let user = vm.$store.getters.user
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

    // if (binding.value === 'editBtn') hasPermission = false
    if (!hasPermission) {
      let instance = vnode.componentInstance || vnode.elm
      // destroy ref
      if (vnode.data.ref !== null && vnode.data.ref !== undefined) {
        // console.log('remove ref', vnode.data.ref, vm.$refs[vnode.data.ref] === instance)
        delete vm.$refs[vnode.data.ref]
      }
      // destroy component
      instance.$destroy()
      vnode.elm.parentElement && vnode.elm.parentElement.removeChild(vnode.elm)
    }
  }
}
