import NotFound from 'src/views/404'
import Login from 'src/views/Login'
import Test from 'src/views/Test'

// 所有权限通用路由表
// 如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [{
  path: '/login',
  component: Login,
  name: '管理后台',
  hidden: true
}, {
  path: '/404',
  component: NotFound,
  name: '',
  hidden: true
}, {
  path: '/test',
  component: Test,
  name: '',
  hidden: true
}]
