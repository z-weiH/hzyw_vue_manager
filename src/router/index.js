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
import userControl from '@/views/system/userControl' // 用户管理
import roleManage from '@/views/system/roleManage' // 角色管理
import menuManage from '@/views/system/menuManage' // 菜单管理

// 第三方管理模块
import mailSendLog from '@/views/third/mailSendLog' // 邮件发送日志
import noteSendLog from '@/views/third/noteSendLog' // 短信发送日志

// 客户管理模块
import clientManagement from '@/views/customer/clientManagement' // 客户管理
import balanceQuery from '@/views/customer/balanceQuery' // 账户余额查询
import tplSetting from '@/views/customer/tplSetting' // 模板设置
import tplEvidenceSetting from '@/views/customer/tplEvidenceSetting' // 模板证据设置

// 案件订单模块
import arbitramentTimeTaskManage from '@/views/order/arbitramentTimeTaskManage' // 仲裁端定时任务管理
import clientTimeTaskManage from '@/views/order/clientTimeTaskManage' // 客户端定时任务管理
import caseOrderQuery from '@/views/order/caseOrderQuery' // 案件提交日志
import idCardVerfy from '@/views/order/idCardVerfy' // 身份证校验
import orderManagement from '@/views/order/orderManagement' // 订单管理
import fastTrack from '@/views/order/fastTrack' // 快速通道

// 案件相关模块
import arbitramentUsersManage from '@/views/case/arbitramentUsersManage' // 仲裁用户管理
import caseManagement from '@/views/case/caseManagement' // 案件管理

// 财务管理模块
import contractAddNewDefault from '@/views/finance/contractAddNewDefault' // 合同加款【财务人员】
import contractAddNewManage from '@/views/finance/contractAddNewManage' // 合同加款【财务主管-审核】

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
          path : 'userControl',
          component : userControl,
          meta : {
            name : 'userControl',
          },
        },
        {
          path : 'roleManage',
          component : roleManage,
          meta : {
            name : 'roleManage',
          },
        },
        {
          path : 'menuManage',
          component : menuManage,
          meta : {
            name : 'menuManage',
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

        /* 客户管理模块 start */
        {
          path : 'clientManagement',
          component : clientManagement,
          meta : {
            name : 'clientManagement',
          },
        },
        {
          path : 'balanceQuery',
          component : balanceQuery,
          meta : {
            name : 'balanceQuery',
          },
        },
        {
          path : 'tplSetting',
          component : tplSetting,
          meta : {
            name : 'tplSetting',
          },
        },
        {
          path : 'tplEvidenceSetting',
          component : tplEvidenceSetting,
          meta : {
            name : 'tplEvidenceSetting',
          },
        },
        /* 客户管理模块 end */

        /* 案件订单模块 start */
        {
          path : 'arbitramentTimeTaskManage',
          component : arbitramentTimeTaskManage,
          meta : {
            name : 'arbitramentTimeTaskManage',
          },
        },
        {
          path : 'clientTimeTaskManage',
          component : clientTimeTaskManage,
          meta : {
            name : 'clientTimeTaskManage',
          },
        },
        {
          path : 'caseOrderQuery',
          component : caseOrderQuery,
          meta : {
            name : 'caseOrderQuery',
          },
        },
        {
          path : 'idCardVerfy',
          component : idCardVerfy,
          meta : {
            name : 'idCardVerfy',
          },
        },
        {
          path : 'orderManagement',
          component : orderManagement,
          meta : {
            name : 'orderManagement',
          },
        },
        {
          path : 'fastTrack',
          component : fastTrack,
          meta : {
            name : 'fastTrack',
          },
        },
        /* 案件订单模块 end */

        /* 案件相关模块 start */
        {
          path : 'arbitramentUsersManage',
          component : arbitramentUsersManage,
          meta : {
            name : 'arbitramentUsersManage',
          },
        },
        {
          path : 'caseManagement',
          component : caseManagement,
          meta : {
            name : 'caseManagement',
          },
        },
        /* 案件相关模块 end */

        /* 财务管理模块 start */
        {
          path : 'contractAddNewDefault',
          component : contractAddNewDefault,
          meta : {
            name : 'contractAddNewDefault',
          },
        },
        {
          path : 'contractAddNewManage',
          component : contractAddNewManage,
          meta : {
            name : 'contractAddNewManage',
          },
        },
        /* 财务管理模块 end */
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
