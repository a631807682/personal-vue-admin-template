import Home from 'src/views/Home'
import User from 'src/views/pages/User'
import Role from 'src/views/pages/Role'
// import GroupRouter from 'src/views/pages/PageGroupRouter'

// 个人中心
import PersonalPassword from 'src/views/pages/Personal/Password'

// 公共类
import { menuHelper } from 'src/lib/utils'

// 异步挂载的路由
// 动态需要根据权限加载的路由表
export const asyncRouterMap = [{
  path: '/',
  auth: false,
  hidden: true,
  name: '首页',
  component: Home
}, {
  path: '/system',
  auth: true,
  component: Home,
  name: '系统管理',
  iconCls: 'fa el-icon-setting',
  children: [{
    path: 'user',
    component: User,
    name: '用户管理',
    auth: true,
    cmpAuth: [{ key: 'addBtn', name: '添加' }, { key: 'editBtn', name: '编辑' },
      { key: 'deleteBtn', name: '删除' }, { key: 'vist', name: '查看' }
    ]
  },
  {
    path: 'role',
    component: Role,
    name: '角色管理',
    auth: true,
    cmpAuth: [{ key: 'addBtn', name: '添加' }, { key: 'editBtn', name: '编辑' },
      { key: 'deleteBtn', name: '删除' }, { key: 'vist', name: '查看' }
    ]
  }
  ]
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
        if (!c.auth) return true
        return roleMenus.some(m => menuHelper.allowed(ar.path, c.path, m))
      })
      // 子菜单存在
      if (ar.children.length > 0) accessedRouters.push(ar)
    }
  }
  return accessedRouters
}
