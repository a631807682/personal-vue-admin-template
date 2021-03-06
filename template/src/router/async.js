// 公共类
import { menuHelper } from 'src/lib/utils'

// 公共模块
import Home from 'src/views/Home'
import GroupRouter from 'src/views/pages/PageGroupRouter'
import Index from 'src/views/pages/Index'

// 用户角色
const UserList = () => import('src/views/pages/User/List')
const UserEdit = () => import('src/views/pages/User/Edit')
const UserAdd = () => import('src/views/pages/User/Add')

const RoleList = () => import('src/views/pages/Role/List')
const RoleEdit = () => import('src/views/pages/Role/Edit')
const RoleAdd = () => import('src/views/pages/Role/Add')
// 个人中心
const PersonalPassword = () => import('src/views/pages/Personal/Password')

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [{
  path: '/',
  auth: false,
  hidden: true,
  name: '系统首页',
  redirect: '/system/user/list',
  component: Home,
  children: [{
    path: 'index',
    auth: false,
    name: '主页',
    component: Index
  }]
}, {
  path: '/system',
  auth: true,
  component: Home,
  name: '系统管理',
  iconCls: 'fa el-icon-setting',
  children: [{
    path: 'user',
    component: GroupRouter,
    redirect: '/system/user/list',
    name: '用户管理',
    auth: true,
    children: [
      {
        path: 'list',
        auth: true,
        component: UserList,
        name: '用户列表',
        cmpAuth: [{ key: 'addBtn', name: '添加' }, { key: 'editBtn', name: '编辑' },
          { key: 'deleteBtn', name: '删除' }, { key: 'vist', name: '查看' }]
      },
      { path: 'edit/:id', component: UserEdit, name: '编辑用户' },
      { path: 'add', component: UserAdd, name: '添加用户' }
    ]
  },
  {
    path: 'role',
    component: GroupRouter,
    redirect: '/system/role/list',
    name: '角色管理',
    auth: true,
    children: [
      {
        path: 'list',
        auth: true,
        component: RoleList,
        name: '角色列表',
        cmpAuth: [{ key: 'addBtn', name: '添加' }, { key: 'editBtn', name: '编辑' },
          { key: 'deleteBtn', name: '删除' }, { key: 'vist', name: '查看' }]
      },
      { path: 'edit/:id', component: RoleEdit, name: '编辑角色' },
      { path: 'add', component: RoleAdd, name: '添加角色' }
    ]
  }]
},
{
  path: '/personal',
  auth: false,
  hidden: true,
  component: Home,
  name: '个人中心',
  iconCls: 'fa el-icon-setting',
  children: [
    { path: 'password', component: PersonalPassword, name: '修改密码', auth: true }
  ]
},
{
  path: '*',
  auth: false,
  hidden: true,
  redirect: { path: '/404' }
}
]

// 根据可访问目录生成路由
export const generateRoutesFromMenu = (roleMenus) => {
  let accessedRouters = []
  console.log('roleMenus', roleMenus)
  for (let __ar of asyncRouterMap) {
    let ar = Object.assign({}, __ar) // 避免 直接修改了原始对象
    if (!ar.auth) { // 不验证权限
      accessedRouters.push(ar)
    } else if (ar.children && ar.children.length > 0) {
      // 筛选匹配子菜单
      ar.children = ar.children.filter(c => {
        return roleMenus.some(m => menuHelper.allowed(ar.path, c.path, m))
      })
      // 子菜单存在
      if (ar.children.length > 0) accessedRouters.push(ar)
    }
  }
  return accessedRouters
}
