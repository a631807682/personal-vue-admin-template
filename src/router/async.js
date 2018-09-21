import Home from 'src/views/Home'
import User from 'src/views/pages/User'
import GroupRouter from 'src/views/pages/PageGroupRouter'
// //广告
// import ADList from 'src/views/pages/Advertisement/List'
// import ADAdd from 'src/views/pages/Advertisement/Add'
// import ADEdit from 'src/views/pages/Advertisement/Edit'


//异步挂载的路由
//动态需要根据权限加载的路由表 
export const asyncRouterMap = [{
    path: '/',
    auth: true,
    component: Home,
    name: '系统管理',
    iconCls: 'fa el-icon-setting',
    children: [
      { path: '/user', component: User, name: '管理员用户管理' },
      { path: '/test', component: User, name: '不应该出现的栏目' }
    ]
  },
  // {
  //   path: '/',
  //   auth: false,
  //   component: Home,
  //   name: '投影仪管理',
  //   iconCls: 'fa el-icon-printer',
  //   children: [{
  //       path: '/upgrade/app',
  //       name: '升级管理',
  //       component: GroupRouter,
  //       redirect: '/upgrade/app/list',
  //       children: [
  //         { path: 'list', component: APPList, name: '更新包管理' },
  //         { path: 'add', component: APPAdd, name: '添加更新包', hidden: true },
  //         { path: 'edit/:id', component: APPEdit, name: '编辑更新包', hidden: true },
  //       ]
  //     },
  //     {
  //       path: '/ad',
  //       name: '广告管理',
  //       component: GroupRouter,
  //       redirect: '/ad/list',
  //       children: [
  //         { path: 'list', component: ADList, name: '广告列表' },
  //         { path: 'add', component: ADAdd, name: '新增广告', hidden: true },
  //         { path: 'edit/:id', component: ADEdit, name: '编辑广告', hidden: true },
  //       ]
  //     },
  //   ]
  // },
  {
    path: '*',
    auth: false,
    hidden: true,
    redirect: { path: '/404' }
  }
];

//根据可访问目录生成路由
export const generateRoutesFromMenu = (roleMenus) => {
  let accessedRouters = [];

  for (let ar of asyncRouterMap) {
    if (!ar.auth) { //不验证权限
      accessedRouters.push(ar);
    } else if (ar.children && ar.children.length > 0) {
      //筛选匹配子菜单
      ar.children = ar.children.filter(c => {
        return roleMenus.some(m => m == c.path && !c.hidden);
      });
      //子菜单存在
      if (ar.children.length > 0) accessedRouters.push(ar);
    }
  }
  return accessedRouters;
}
