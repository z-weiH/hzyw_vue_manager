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

// 第三方管理模块
import mailSendLog from '@/views/third/mailSendLog' // 邮件发送日志
import noteSendLog from '@/views/third/noteSendLog' // 短信发送日志

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
        /* 系统管理模块 start */
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
        /* 系统管理模块 end */

        /* 第三方管理模块 start */
        {
          path : 'mailSendLog',
          component : mailSendLog,
          meta : {
            name : 'mailSendLog',
          },
        },
        {
          path : 'noteSendLog',
          component : noteSendLog,
          meta : {
            name : 'noteSendLog',
          },
        },
        /* 第三方管理模块 end */
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
