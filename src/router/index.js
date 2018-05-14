import Vue from 'vue'
import Router from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// main 主体路由
import main from '@/views/main'
/* main 子路由 start */

// 系统管理模块
import userQuery from '@/views/system/userQuery' // 用户查询
import userControl from '@/views/system/userControl' // 用户管理
import roleManage from '@/views/system/roleManage' // 角色管理
import menuManage from '@/views/system/menuManage' // 菜单管理
import personInfo from '@/views/system/personInfo' // 个人信息
import changePwd from '@/views/system/changePwd' // 修改密码

//开户管理
import accountApply from '@/views/account/accountApply' //开户申请
import userSearch from '@/views/account/userSearch' //用户查询

//仲裁委管理
import arbitramentManage from '@/views/arb/arbitramentManage' // 仲裁委管理
import informEmailManage from '@/views/arb/informEmailManage' // 仲裁委邮箱管理

// 财务管理模块
import orderAddNewDefault from '@/views/finance/orderAddNewDefault' //订单加款【财务人员】
import orderAddNewManage from '@/views/finance/orderAddNewManage' //订单加款【财务主管-审核】
import billingDay from '@/views/finance/billingDay' //受理费日对账
import serviceChargeDayCheck from '@/views/finance/serviceChargeDayCheck' //服务费日对账
import zticketDonateDefault from '@/views/finance/zticketDonateDefault' //仲券赠送【财务人员】
import zticketDonateManage from '@/views/finance/zticketDonateManage' //仲券赠送【财务主管-审核】
import refundListDefault from '@/views/finance/refundListDefault' //退款【财务人员】
import refundListManage from '@/views/finance/refundListManage' //退款【财务主管-审核】
import techServiceDayCheck from '@/views/finance/techServiceDayCheck' //技术服务费日对账
import processingFeeSettle from '@/views/finance/processingFeeSettle' //受理费结算
import processingFeeSettleReview from '@/views/finance/processingFeeSettleReview' //受理费结算复核









/* main 子路由 end */

Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/',
      component: () => import ('@/views/auth/login.vue'), // 登录,
    },
    {
      path: '/login',
      component: () => import ('@/views/auth/login.vue'), // 登录
    },
    {
      path: '/404',
      component: () => import ('@/views/notFind'), // 404
    },
    {
      path: '/main',
      component: main,
      children: [
        /* 系统管理模块 start */
        {
          path: 'userQuery',
          component: userQuery,
          meta: {
            name: 'userQuery',
          },
        },
        {
          path: 'userControl',
          component: userControl,
          meta: {
            name: 'userControl',
          },
        },
        {
          path: 'roleManage',
          component: roleManage,
          meta: {
            name: 'roleManage',
          },
        },
        {
          path: 'menuManage',
          component: menuManage,
          meta: {
            name: 'menuManage',
          },
        },
        {
          path: 'personInfo',
          component: personInfo,
          meta: {
            name: 'personInfo',
          },
        },
        {
          path: 'changePwd',
          component: changePwd,
          meta: {
            name: 'changePwd',
          },
        },
        /* 系统管理模块 end */

        /* 开户管理 start */
        {
          path: 'accountApply',
          component: accountApply,
          meta: {
            name: 'accountApply',
          },
        },
        {
          path: 'userSearch',
          component: userSearch,
          meta: {
            name: 'userSearch',
          },
        },
        /* 开户管理 end */

        /* 仲裁委管理 start*/
        {
          path: 'arbitramentManage',
          component: arbitramentManage,
          meta: {
            name: 'arbitramentManage',
          },
        },
        {
          path: 'informEmailManage',
          component: informEmailManage,
          meta: {
            name: 'informEmailManage',
          },
        },
        /* 仲裁委管理 end*/

        /* 第三方管理模块 start */
        {
          path: 'mailSendLog',
          component: () => import ('@/views/third/mailSendLog'), //邮件发送日志
          meta: {
            name: 'mailSendLog',
          },
        },
        {
          path: 'noteSendLog',
          component: () => import ('@/views/third/noteSendLog'), //短信发送日志
          meta: {
            name: 'noteSendLog',
          },
        },
        /* 第三方管理模块 end */
        /* 案件信息模块 start */
        {
          path: 'caseListView',
          component: () =>
            import ('@/views/caseInfo/caseListView'), //案件列表
          meta: {
            name: 'caseListView',
          },
        },
        {
          path: 'respondentsFeedback',
          component: () =>
            import ('@/views/caseInfo/respondentsFeedback'), //被申请人反馈
          meta: {
            name: 'respondentsFeedback',
          },
        },
        {
          path: 'paymentInformation',
          component: () =>
            import ('@/views/caseInfo/paymentInformation'), //还款信息

          meta: {
            name: 'paymentInformation'
          }
        },
        {
          path: 'respondentsOperateRecord',
          component: import ('@/views/caseInfo/respondentsOperateRecord'), //被申请人操作记录
          meta: {
            name: 'respondentsOperateRecord'
          }
        },
        /* 案件信息模块 end */
        /* 客户管理模块 start */
        {
          path: 'clientManagement',
          component: () => import ('@/views/customer/clientManagement'), // 客户管理
          meta: {
            name: 'clientManagement',
          },
        },
        {
          path: 'balanceQuery',
          component: () => import ('@/views/customer/balanceQuery'), // 账户余额查询
          meta: {
            name: 'balanceQuery',
          },
        },
        {
          path: 'tplSetting',
          component: () => import ('@/views/customer/tplSetting'), // 模板设置
          meta: {
            name: 'tplSetting',
          },
        },
        {
          path: 'tplEvidenceSetting',
          component: () => import ('@/views/customer/tplEvidenceSetting'), // 模板证据设置,
          meta: {
            name: 'tplEvidenceSetting',
          },
        },
        /* 客户管理模块 end */

        /* 案件订单模块 start */
        {
          path: 'arbitramentTimeTaskManage',
          component: () => import ('@/views/order/arbitramentTimeTaskManage'), // 仲裁端定时任务管理
          meta: {
            name: 'arbitramentTimeTaskManage',
          },
        },
        {
          path: 'clientTimeTaskManage',
          component: () => import ('@/views/order/clientTimeTaskManage'), // 客户端定时任务管理
          meta: {
            name: 'clientTimeTaskManage',
          },
        },
        {
          path: 'caseOrderQuery',
          component: () => import ('@/views/order/caseOrderQuery'), // 案件提交日志
          meta: {
            name: 'caseOrderQuery',
          },
        },
        {
          path: 'idCardVerfy',
          component: () => import ('@/views/order/idCardVerfy'), // 身份证校验
          meta: {
            name: 'idCardVerfy',
          },
        },
        {
          path: 'orderManagement',
          component: () => import ('@/views/order/orderManagement'), // 订单管理
          meta: {
            name: 'orderManagement',
          },
        },
        {
          path: 'fastTrack',
          component: () => import ('@/views/order/fastTrack'), // 快速通道
          meta: {
            name: 'fastTrack',
          },
        },
        /* 案件订单模块 end */

        /* 案件相关模块 start */
        {
          path: 'arbitramentUsersManage',
          component: () => import ('@/views/case/arbitramentUsersManage'), // 仲裁用户管理
          meta: {
            name: 'arbitramentUsersManage',
          },
        },
        {
          path: 'caseManagement',
          component: () => import ('@/views/case/caseManagement'), // 案件管理
          meta: {
            name: 'caseManagement',
          },
        },
        /* 案件相关模块 end */

        /* 财务管理模块 start */
        {
          path: 'contractAddNewDefault',
          component: () => import ('@/views/finance/contractAddNewDefault'), // 合同加款【财务人员】
          meta: {
            name: 'contractAddNewDefault',
          },
        },
        {
          path: 'contractAddNewManage',
          component: () => import ('@/views/finance/contractAddNewManage'), // 合同加款【财务主管-审核】
          meta: {
            name: 'contractAddNewManage',
          },
        },
        {
          path: 'orderAddNewDefault',
          component: orderAddNewDefault,
          meta: {
            name: 'orderAddNewDefault',
          },
        },
        {
          path: 'orderAddNewManage',
          component: orderAddNewManage,
          meta: {
            name: 'orderAddNewManage',
          },
        },
        {
          path: 'billingDay',
          component: billingDay,
          meta: {
            name: 'billingDay',
          },
        },
        {
          path: 'serviceChargeDayCheck',
          component: serviceChargeDayCheck,
          meta: {
            name: 'serviceChargeDayCheck',
          },
        },
        {
          path: 'zticketDonateDefault',
          component: zticketDonateDefault,
          meta: {
            name: 'zticketDonateDefault',
          },
        },
        {
          path: 'zticketDonateManage',
          component: zticketDonateManage,
          meta: {
            name: 'zticketDonateManage',
          },
        },
        {
          path: 'refundListDefault',
          component: refundListDefault,
          meta: {
            name: 'refundListDefault',
          },
        },
        {
          path: 'refundListManage',
          component: refundListManage,
          meta: {
            name: 'refundListManage',
          },
        },
        {
          path: 'techServiceDayCheck',
          component: techServiceDayCheck,
          meta: {
            name: 'techServiceDayCheck',
          },
        },
        {
          path: 'processingFeeSettle',
          component: processingFeeSettle,
          meta: {
            name: 'processingFeeSettle',
          },
        },
        {
          path: 'processingFeeSettleReview',
          component: processingFeeSettleReview,
          meta: {
            name: 'processingFeeSettleReview',
          },
        },
        /* 财务管理模块 end */
      ],
    },
    {
      path: '*',
      redirect: '/404',
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
