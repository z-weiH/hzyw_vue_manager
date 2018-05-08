import Vue from 'vue'
import Router from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// 登录
import login from '@/views/auth/login.vue'
// 404
import notFind from '@/views/notFind'
// main 主体路由
import main from '@/views/main'
/* main 子路由 start */

// 系统管理模块
import userQuery from '@/views/system/userQuery' // 用户查询
import roleManage from '@/views/system/roleManage' // 角色管理

/* main 子路由 end */

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path : '/',
      component : login,
    },
    {
      path : '/login',
      component : login,
    },
    {
      path : '/404',
      component : notFind,
    },
    {
      path : '/main',
      component : main,
      children : [
        {
          path : 'userQuery',
          component : userQuery,
          meta : {
            name : 'userQuery',
          },
        },
        {
          path : 'roleManage',
          component : roleManage,
          meta : {
            name : 'roleManage',
          },
        },
      ],
    },
    {
      path : '*',
      redirect : '/404',
    },
  ]
})


/* 前置钩子 */
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

/* 后置钩子 */
router.afterEach((to, from) => {
  NProgress.done();
});

export default router
