import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

export default new Router({
  mode:"history",
  routes: [
    {
      path: '/login',
      component: () => import('../pages/login')
    },
    {
      path: '/index',
      component: () => import('../pages/index'),
      children: [
        {
          path: '/user',
          component: () => import('@/views/user'),
          meta: {
            name: '管理员列表'
          }
          
        },
         {
          path:'/home',
          component:()=> import('@/views/home')
        },
        {
          // 修改过的路由
          path: '/menu',
          component: () => import('@/views/menu/index.vue'),
          meta: {
            name: '菜单列表'
          }

        },
        {
          path: '/user',
          component: () => import('@/views/user'),
          meta: {
            name: '管理员列表'
          }

        },
        {
          path: '/role',
          component: () => import('@/views/role/index.vue'),
          meta: {
            name: '角色管理'
          }
        },
      ]
    },
    {
      path: '*',
      redirect: '/index'
    }
  ]

})
