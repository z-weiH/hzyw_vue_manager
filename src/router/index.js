import Vue from 'vue'
import Router from 'vue-router'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
/* main 子路由 end */

Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/',
      component: () => import('@/views/auth/login.vue'),
    },
    {
      path: '/login',
      component: () => import('@/views/auth/login.vue'),
    },
    {
      path: '/404',
      component: () => import('@/views/notFind'),
    },
    {
      path: '/main',
      component: () => import('@/views/main'),
      children: [
        /* 系统管理模块 start */
        {
          path: 'userQuery',
          component: () => import('@/views/system/userQuery'),
          meta: {
            name: 'userQuery',
          },
        },
        {
          path: 'userControl',
          component: () => import('@/views/system/userControl'),
          meta: {
            name: 'userControl',
          },
        },
        {
          path: 'roleManage',
          component: () => import('@/views/system/roleManage'),
          meta: {
            name: 'roleManage',
          },
        },
        {
          path: 'menuManage',
          component: () => import('@/views/system/menuManage'),
          meta: {
            name: 'menuManage',
          },
        },
        {
          path: 'personInfo',
          component: () => import('@/views/system/personInfo'),
          meta: {
            name: 'personInfo',
          },
        },
        {
          path: 'changePwd',
          component: () => import('@/views/system/changePwd'),
          meta: {
            name: 'changePwd',
          },
        },
        /* 系统管理模块 end */

        /* 开户管理 start */
        {
          path: 'accountApply',
          component: () => import('@/views/account/accountApply'),
          meta: {
            name: 'accountApply',
          },
        },
        {
          path: 'userSearch',
          component: () => import('@/views/account/userSearch'),
          meta: {
            name: 'userSearch',
          },
        },
        {
          path: 'accountSettingDefault',
          component: () => import('@/views/account/accountSettingDefault'),
          meta: {
            name: 'accountSettingDefault',
          },
        },
        {
          path: 'accountSettingManage',
          component: () => import('@/views/account/accountSettingManage'),
          meta: {
            name: 'accountSettingManage',
          },
        },
        {
          path: 'accountAffirm',
          component: () => import('@/views/account/accountAffirm'),
          meta: {
            name: 'accountAffirm',
          },
        },
        /* 开户管理 end */

        /* 仲裁委管理 start*/
        {
          path: 'arbitramentManage',
          component: () => import('@/views/arb/arbitramentManage'),
          meta: {
            name: 'arbitramentManage',
          },
        },
        {
          path: 'informEmailManage',
          component: () => import('@/views/arb/informEmailManage'),
          meta: {
            name: 'informEmailManage',
          },
        },
        /* 仲裁委管理 end*/

        /* 官网管理 */
        {
          path: 'customerCase',
          component: () => import('@/views/officialweb/customerCase'),
          meta: {
            name: 'customerCase',
          },
        },
        {
          path: 'advisoryManage',
          component: () => import('@/views/officialweb/advisoryManage'),
          meta: {
            name: 'advisoryManage',
          },
        },
        {
          path: 'newsDynamicState',
          component: () => import('@/views/officialweb/newsDynamicState'),
          meta: {
            name: 'newsDynamicState',
          },
        },


        /* 官网管理 */

        /* 第三方管理模块 start */
        {
          path: 'mailSend',
          component: () => import ('@/views/third/mailSendLog'), // 邮件发送日志
          meta: {
            name: 'mailSend',
          },
        },
        {
          path: 'noteSend',
          component: () => import ('@/views/third/noteSendLog'), // 短信发送日志
          meta: {
            name: 'noteSend',
          },
        },
        {
          path: 'channelManage',
          component: () => import ('@/views/third/channelManage'), // 短信发送日志
          meta: {
            name: 'channelManage',
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
          component: () =>
            import ('@/views/caseInfo/respondentsOperateRecord'), //被申请人操作记录
          meta: {
            name: 'respondentsOperateRecord'
          }
        },
        /* 案件信息模块 end */
        /* 短息记录 start */
        {
          path: 'esmqLogView',
          component: () =>
            import ('@/views/msgRecorder/esmqLogView'), //发送记录
          meta: {
            name: 'esmqLogView'
          }
        },{
          path: 'receiveLog',
          component: () =>
            import ('@/views/msgRecorder/receiveLog'), //接收记录
          meta: {
            name: 'receiveLog'
          }
        },
        /* 短息记录 end */
        /* 状态配置 start */
        {
          path: 'customerAllot',
          component: () =>
            import ('@/views/statusConfig/customerAllot'), //客户分配
          meta: {
             name: 'customerAllot'
          }
        },{
          path: 'mediateStatusSet',
          component: () =>
            import ('@/views/statusConfig/mediateStatusSet'), //调解状态设置
          meta: {
            name: 'mediateStatusSet'
          }
        },
        /* 状态配置 end */
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
          component: () => import ('@/views/customer/tplEvidenceSetting'), // 模板证据设置
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
          component: () =>
            import ('@/views/finance/contractAddNewDefault'), // 合同加款【财务人员】
          meta: {
            name: 'contractAddNewDefault',
          },
        },
        {
          path: 'contractAddNewManage',
          component: () =>
            import ('@/views/finance/contractAddNewManage'), // 合同加款【财务主管-审核】
          meta: {
            name: 'contractAddNewManage',
          },
        },
        {
          path: 'orderAddNewDefault',
          component: () =>
            import ('@/views/finance/orderAddNewDefault'), //订单加款【财务人员】
          meta: {
            name: 'orderAddNewDefault',
          },
        },
        {
          path: 'orderAddNewManage',
          component: () =>
            import ('@/views/finance/orderAddNewManage'), //订单加款【财务主管-审核】
          meta: {
            name: 'orderAddNewManage',
          },
        },
        {
          path: 'billingDay',
          component: () =>
            import ('@/views/finance/billingDay'), //受理费日对账
          meta: {
            name: 'billingDay',
          },
        },
        {
          path: 'serviceChargeDayCheck',
          component: () =>
            import ('@/views/finance/serviceChargeDayCheck'), //服务费日对账
          meta: {
            name: 'serviceChargeDayCheck',
          },
        },
        {
          path: 'zticketDonateDefault',
          component: () =>
            import ('@/views/finance/zticketDonateDefault'), //仲券赠送【财务人员】
          meta: {
            name: 'zticketDonateDefault',
          },
        },
        {
          path: 'zticketDonateManage',
          component: () =>
            import ('@/views/finance/zticketDonateManage'), //仲券赠送【财务主管-审核】
          meta: {
            name: 'zticketDonateManage',
          },
        },
        {
          path: 'refundListDefault',
          component: () =>
            import ('@/views/finance/refundListDefault'), //退款【财务人员】
          meta: {
            name: 'refundListDefault',
          },
        },
        {
          path: 'refundListManage',
          component: () =>
            import ('@/views/finance/refundListManage'), //退款【财务主管-审核】
          meta: {
            name: 'refundListManage',
          },
        },
        {
          path: 'techServiceDayCheck',
          component: () =>
            import ('@/views/finance/techServiceDayCheck'), //技术服务费日对账
          meta: {
            name: 'techServiceDayCheck',
          },
        },
        {
          path: 'processingFeeSettle',
          component: () =>
            import ('@/views/finance/processingFeeSettle'), //受理费结算
          meta: {
            name: 'processingFeeSettle',
          },
        },
        {
          path: 'processingFeeSettleReview',
          component: () =>
            import ('@/views/finance/processingFeeSettleReview'), //受理费结算复核
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
  // 返回顶部
  window.scrollTo(0,0);
  NProgress.start();
  next();
});

/* 后置钩子 */
router.afterEach((to, from) => {
  NProgress.done();
});

export default router
