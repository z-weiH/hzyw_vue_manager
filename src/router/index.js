import Vue from 'vue'
import Router from 'vue-router'

import {
  Message
} from 'element-ui'

// 进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import main from './../main'
/* main 子路由 end */

// 权限排除
import jurisdictionExclude from './jurisdictionExclude'

Vue.use(Router)

let router = new Router({
  routes: [{
      path: '/',
      component: () =>
        import ('@/views/auth/login.vue'),
    },
    {
      path: '/login',
      component: () =>
        import ('@/views/auth/login.vue'),
    },
    {
      path: '/404',
      component: () =>
        import ('@/views/notFind'),
    },
    {
      path: '/main',
      component: () =>
        import ('@/views/main'),
      children: [
        /* 系统管理模块 start */
        {
          path: 'userQuery',
          component: () =>
            import ('@/views/system/userQuery'),
          meta: {
            name: 'userQuery',
          },
        },
        {
          path: 'userControl',
          component: () =>
            import ('@/views/system/userControl'),
          meta: {
            name: 'userControl',
          },
        },
        {
          path: 'roleManage',
          component: () =>
            import ('@/views/system/roleManage'),
          meta: {
            name: 'roleManage',
          },
        },
        {
          path: 'menuManage',
          component: () =>
            import ('@/views/system/menuManage'),
          meta: {
            name: 'menuManage',
          },
        },
        {
          path: 'personInfo',
          component: () =>
            import ('@/views/system/personInfo'),
          meta: {
            name: 'personInfo',
          },
        },
        {
          path: 'changePwd',
          component: () =>
            import ('@/views/system/changePwd'),
          meta: {
            name: 'changePwd',
          },
        },
        /* 系统管理模块 end */

        /* 开户管理 start */
        {
          path: 'accountApply',
          component: () =>
            import ('@/views/account/accountApply'),
          meta: {
            name: 'accountApply',
          },
        },
        {
          path: 'userSearch',
          component: () =>
            import ('@/views/account/userSearch'),
          meta: {
            name: 'userSearch',
          },
        },
        {
          path: 'accountSettingDefault',
          component: () =>
            import ('@/views/account/accountSettingDefault'),
          meta: {
            name: 'accountSettingDefault',
          },
        },
        {
          path: 'accountSettingManage',
          component: () =>
            import ('@/views/account/accountSettingManage'),
          meta: {
            name: 'accountSettingManage',
          },
        },
        {
          path: 'accountAffirm',
          component: () =>
            import ('@/views/account/accountAffirm'),
          meta: {
            name: 'accountAffirm',
          },
        },
        /* 开户管理 end */

        /* 仲裁委管理 start*/
        {
          path: 'arbitramentManage',
          component: () =>
            import ('@/views/arb/arbitramentManage'),
          meta: {
            name: 'arbitramentManage',
          },
        },
        {
          path: 'informEmailManage',
          component: () =>
            import ('@/views/arb/informEmailManage'),
          meta: {
            name: 'informEmailManage',
          },
        },
        /* 仲裁委管理 end*/

        /* 官网管理 */
        {
          path: 'customerCase',
          component: () =>
            import ('@/views/officialweb/customerCase'),
          meta: {
            name: 'customerCase',
          },
        },
        {
          path: 'advisoryManage',
          component: () =>
            import ('@/views/officialweb/advisoryManage'),
          meta: {
            name: 'advisoryManage',
          },
        },
        {
          path: 'newsDynamicState',
          component: () =>
            import ('@/views/officialweb/newsDynamicState'),
          meta: {
            name: 'newsDynamicState',
          },
        },


        /* 官网管理 */

        /* 第三方管理模块 start */
        {
          path: 'mailSend',
          component: () =>
            import ('@/views/third/mailSendLog'), // 邮件发送日志
          meta: {
            name: 'mailSend',
          },
        },
        {
          path: 'noteSend',
          component: () =>
            import ('@/views/third/noteSendLog'), // 短信发送日志
          meta: {
            name: 'noteSend',
          },
        },
        {
          path: 'channelManage',
          component: () =>
            import ('@/views/third/channelManage'), // 短信发送日志
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
        /* 短信记录 start */
        {
          path: 'esmqLogView',
          component: () =>
            import ('@/views/msgRecorder/esmqLogView'), //发送记录
          meta: {
            name: 'esmqLogView'
          }
        }, {
          path: 'receiveLog',
          component: () =>
            import ('@/views/msgRecorder/receiveLog'), //接收记录
          meta: {
            name: 'receiveLog'
          }
        },
        {
          path: 'mediationMsg',
          component: () =>
            import ('@/views/msgRecorder/mediationMsg'), //调解短信
          meta: {
            name: 'mediationMsg'
          }
        }, {
          path: 'mediationMsgSet',
          component: () =>
            import ('@/views/msgRecorder/mediationMsgSet'), //调解短信设置
          meta: {
            name: 'mediationMsgSet'

          }
        },
        /* 短信记录 end */
        /* 状态配置 start */
        {
          path: 'customerAllot',
          component: () =>
            import ('@/views/statusConfig/customerAllot'), //客户分配
          meta: {
            name: 'customerAllot'
          }
        }, {
          path: 'mediateStatusSet',
          component: () =>
            import ('@/views/statusConfig/mediateStatusSet'), //调解状态设置
          meta: {
            name: 'mediateStatusSet'
          }
        },{
          path: 'unFreeZeList',
          component: () =>
            import ('@/views/statusConfig/unFreeZeList'),//未冻结案件列表
          meta: {
            name: 'unFreeZeList'
          }
        },
        /* 状态配置 end */
        /* 客户管理模块 start */
        {
          path: 'clientManagement',
          component: () =>
            import ('@/views/customer/clientManagement'), // 客户管理
          meta: {
            name: 'clientManagement',
          },
        },
        {
          path: 'accountManagement',
          component: () =>
            import ('@/views/customer/accountManagement'), // 客户账号管理
          meta: {
            name: 'accountManagement',
          },
        },
        {
          path: 'productList',
          component: () =>
            import ('@/views/customer/productList'), // 客户管理 - 产品列表
          meta: {
            name: 'clientManagement',
          },
        },
        {
          path: 'balanceQuery',
          component: () =>
            import ('@/views/customer/balanceQuery'), // 账户余额查询
          meta: {
            name: 'balanceQuery',
          },
        },
        {
          path: 'balanceQueryDetail',
          component: () =>
            import ('@/views/customer/balanceQueryDetail'), // 账户余额查询 - 子页面
          meta: {
            name: 'balanceQueryDetail',
          },
        },
        // {
        //   path: 'balanceQueryInfo',
        //   component: () =>
        //     import ('@/views/customer/balanceQueryInfo'), // 账户余额查询 - 子页面 --赠券详情
        //   meta: {
        //     name: 'balanceQueryInfo',
        //   },
        // },
        {
          path: 'tplSetting',
          component: () =>
            import ('@/views/customer/tplSetting'), // 模板设置 - 列表
          meta: {
            name: 'tplSetting',
          },
        },
        {
          path: 'tplSettingList',
          component: () =>
            import ('@/views/customer/tplSettingList'), // 模板设置 - 子列表
          meta: {
            name: 'tplSetting',
          },
        },
        {
          path: 'tplSettingEdit',
          component: () =>
            import ('@/views/customer/tplSettingEdit'), // 模板设置 - 编辑
          meta: {
            name: 'tplSetting',
          },
        },
        {
          path: 'evidenceSetting',
          component: () =>
            import ('@/views/customer/evidenceSetting'), // 模板设置 - 证据设置
          meta: {
            name: 'tplSetting',
          },
        },
        {
          path: 'tplEvidenceSetting',
          component: () =>
            import ('@/views/customer/tplEvidenceSetting'), // 模板证据设置
          meta: {
            name: 'tplEvidenceSetting',
          },
        },
        {
          path: 'businessTypeSetting',
          component: () =>
            import ('@/views/customer/businessTypeSetting'), // 业务类型设置
          meta: {
            name: 'businessTypeSetting',
          },
        },
        {
          path: 'templateList',
          component: () =>
            import ('@/views/customer/templateList'), // 模板列表
          meta: {
            name: 'templateList',
          },
        },
        {
          path: 'dataManagement',
          component: () =>
            import ('@/views/customer/dataManagement'), // 数据管理
          meta: {
            name: 'dataManagement',
          },
        },
        /* 客户管理模块 end */

        /* 案件订单模块 start */
        {
          path: 'arbitramentTimeTaskManage',
          component: () =>
            import ('@/views/order/arbitramentTimeTaskManage'), // 仲裁端定时任务管理
          meta: {
            name: 'arbitramentTimeTaskManage',
          },
        },
        {
          path: 'clientTimeTaskManage',
          component: () =>
            import ('@/views/order/clientTimeTaskManage'), // 客户端定时任务管理
          meta: {
            name: 'clientTimeTaskManage',
          },
        },
        /* {
          path: 'caseOrderQuery',
          component: () =>
            import ('@/views/order/caseOrderQuery'), // 案件提交日志
          meta: {
            name: 'caseOrderQuery',
          },
        }, */
        {
          path: 'idCardVerfy',
          component: () =>
            import ('@/views/order/idCardVerfy'), // 身份证校验
          meta: {
            name: 'idCardVerfy',
          },
        },
        {
          path: 'orderManagement',
          component: () =>
            import ('@/views/order/orderManagement'), // 订单管理
          meta: {
            name: 'orderManagement',
          },
        },
        {
          path: 'fastTrack',
          component: () =>
            import ('@/views/order/fastTrack'), // 快速通道
          meta: {
            name: 'fastTrack',
          },
        },
        /* 案件订单模块 end */

        /* 案件相关模块 start */
        {
          path: 'arbitramentUsersManage',
          component: () =>
            import ('@/views/case/arbitramentUsersManage'), // 仲裁用户管理
          meta: {
            name: 'arbitramentUsersManage',
          },
        },
        {
          path: 'caseManagement',
          component: () =>
            import ('@/views/case/caseManagement'), // 案件管理
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
          path: 'zticketDonateGeneral',
          component: () =>
            import ('@/views/finance/zticketDonateGeneral'), //仲券赠送【财务人员】
          meta: {
            name: 'zticketDonateGeneral',
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

        /* 预审模块 start */
        {
          path: 'hearCaseList',
          component: () =>
            import ('@/views/pretrial/hearCaseList'), //预审案件库
          meta: {
            name: 'hearCaseList',
          },
        },
        {
          path: 'hearDropCaseList',
          component: () =>
            import ('@/views/pretrial/hearDropCaseList'), //证据缺失案件库
          meta: {
            name: 'hearDropCaseList',
          },
        },
        {
          path: 'hearDropCaseDetail',
          component: () =>
            import ('@/views/pretrial/hearDropCaseDetail'), //证据缺失案件库 详情
          meta: {
            name: 'hearDropCaseList',
          },
        },
        {
          path: 'initialHearList',
          component: () =>
            import ('@/views/pretrial/initialHearList'), //案件初审 列表
          meta: {
            name: 'initialHearList',
          },
        },
        {
          path: 'initialHearDetail',
          component: () =>
            import ('@/views/pretrial/initialHearDetail'), //案件初审 审核页面
          meta: {
            name: 'initialHearList',
          },
        },
        {
          path: 'redoHearList',
          component: () =>
            import ('@/views/pretrial/redoHearList'), //案件复审 列表
          meta: {
            name: 'redoHearList',
          },
        },
        {
          path: 'redoHearDetail',
          component: () =>
            import ('@/views/pretrial/redoHearDetail'), //案件复审 审核页面
          meta: {
            name: 'redoHearList',
          },
        },
        {
          path: 'initiateApplyList',
          component: () =>
            import ('@/views/pretrial/initiateApplyList'), //立案申请
          meta: {
            name: 'initiateApplyList',
          },
        },
        {
          path: 'messagePushList',
          component: () =>
            import ('@/views/pretrial/messagePushList'), //推送记录
          meta: {
            name: 'messagePushList',
          },
        },
        {
          path: 'advanceHearSetsList',
          component: () =>
            import ('@/views/pretrial/advanceHearSetsList'), //预审设置 列表
          meta: {
            name: 'advanceHearSetsList',
          },
        },
        {
          path: 'ideaHearOption',
          component: () =>
            import ('@/views/pretrial/ideaHearOption'), //预审设置 审核意见维护
          meta: {
            name: 'advanceHearSetsList',
          },
        },
        {
          path: 'batchNumOption',
          component: () =>
            import ('@/views/pretrial/batchNumOption'), //预审设置 批次数量设置
          meta: {
            name: 'advanceHearSetsList',
          },
        },
        {
          path: 'tplTermOption',
          component: () =>
            import ('@/views/pretrial/tplTermOption'), //预审设置 模板条件设置
          meta: {
            name: 'advanceHearSetsList',
          },
        },
        {
          path: 'dataStatisticsView',
          component: () =>
            import ('@/views/pretrial/dataStatisticsView'), //数据统计
          meta: {
            name: 'dataStatisticsView',
          },
        },
        /* 预审模块 end */

        /* 复核系统 模块 start */
        {
          path: 'reviewCaseList',
          component: () =>
            import ('@/views/review/reviewCaseList'), // 案件列表
          meta: {
            name: 'reviewCaseList',
          },
        },
        {
          path: 'reviewCaseReview',
          component: () =>
            import ('@/views/review/reviewCaseReview'), // 案件复核
          meta: {
            name: 'reviewCaseReview',
          },
        },
        {
          path: 'reviewCaseReviewList',
          component: () =>
            import ('@/views/review/reviewCaseReviewList'), // 案件复核 - 列表
          meta: {
            name: 'reviewCaseReview',
          },
        },
        {
          path: 'monitor',
          component: () =>
            import ('@/views/review/monitor'), // 复核监控
          meta: {
            name: 'monitor',
          },
        },
        {
          path: 'monitorList',
          component: () =>
            import ('@/views/review/monitorList'), // 复核监控 - 列表
          meta: {
            name: 'monitor',
          },
        },
        {
          path: 'withdrawCase',
          component: () =>
            import ('@/views/review/withdrawCase'), // 撤案对接
          meta: {
            name: 'withdrawCase',
          },
        },
        {
          path: 'reviewSetting',
          component: () =>
            import ('@/views/review/reviewSetting'), // 复核设置
          meta: {
            name: 'reviewSetting',
          },
        },
        {
          path: 'reviewSettingRetrial',
          component: () =>
            import ('@/views/review/reviewSettingRetrial'), // 复核设置 - 复审人设置
          meta: {
            name: 'reviewSetting',
          },
        },
        {
          path: 'reviewSettingSampling',
          component: () =>
            import ('@/views/review/reviewSettingSampling'), // 复核设置 - 抽检比例设置
          meta: {
            name: 'reviewSetting',
          },
        },
        /* 复核系统 模块 end */

        /* 规则库管理 模块 start */
        {
          path: 'ruleBaseNavigation',
          component: () =>
            import ('@/views/ruleBaseManagement/ruleBaseNavigation'), // 规则库 - 导航
          meta: {
            name: 'ruleBaseNavigation',
          },
        },
        /* 规则库管理 模块 end */
      ],
    },
    {
      path: '*',
      redirect: '/404',
    },
    {
      path: '/redoHearChildDetail',
      component: () =>
        import ('@/views/pretrial/redoHearChildDetail'), //案件复审 子批次审核
      meta: {
        name: 'redoHearChildDetail',
      },
    },
    {
      path: '/idCardHearDetail',
      component: () =>
        import ('@/views/pretrial/idCardHearDetail'), //案件初审 身份证审核
      meta: {
        name: 'idCardHearDetail',
      },
    },
    {
      path: '/signatureHearDetail',
      component: () =>
        import ('@/views/pretrial/signatureHearDetail'), //案件初审 签名审核
      meta: {
        name: 'signatureHearDetail',
      },
    },
    {
      path: '/evidenceWireHear',
      component: () =>
        import ('@/views/pretrial/evidenceWireHear'), //案件初审 证据链审核
      meta: {
        name: 'evidenceWireHear',
      },
    },
    {
      path: '/webpageEditor',
      component: () =>
        import ('@/views/customer/webpageEditor'), // 模板设置 - 网页编辑
      meta: {
        name: 'webpageEditor',
      },
    },
    {
      path: '/parameterList',
      component: () =>
        import ('@/views/customer/parameterList'), // 模板设置 - 参数列表
      meta: {
        name: 'parameterList',
      },
    },
    {
      path: '/caseReview',
      component: () =>
        import ('@/views/review/caseReview'), // 复核管理 - 案件详情
      meta: {
        name: 'caseReview',
      },
    },
    {
      path: '/ruleBase',
      component: () =>
        import ('@/views/ruleBaseManagement/ruleBase'), // 规则库
      meta: {
        name: 'ruleBase',
      },
    },
    
  ]
})


/* 前置钩子 */
router.beforeEach((to, from, next) => {
  // 返回顶部
  window.scrollTo(0, 0);
  NProgress.start();

  let exclude = ['login', '404', ''];
  let path = to.path.slice(1);
  if (exclude.indexOf(path) !== -1) {
    next();
  } else {
    if (process.env.NODE_ENV === 'development') {
      next();
    } else {
      try {
        let treeList = [];
        let tree = JSON.parse(localStorage.getItem('menuInfoList'));
        // 递归
        let fn = (tree) => {
          tree.map((v, k) => {
            v.children.map((v1, k1) => {
              if (v1.children) {
                fn(v1);
              } else {
                treeList.push(v1.menuUrl);
              }
            });
          });
        }
        fn(tree);

        // 权限判断
        if ((treeList.indexOf(to.path.slice(6)) !== -1) || (jurisdictionExclude.indexOf(to.path) !== -1)) {
          // 高亮左侧导航
          try {
            main.$store.commit('menu/setMenuActive', `${to.path}`);
          } catch (err) {}
          next();
        } else {
          console.log('该用户 没有权限', from);
          Message({
            type: 'warning',
            message: '没有权限访问',
          });
          router.replace('/login');
        }
        // 当前未登录
      } catch (err) {
        router.replace(`/login?returnUrl=${router.history.pending.path}`);
      }
    }

  }
});

/* 后置钩子 */
router.afterEach((to, from) => {
  NProgress.done();
});

export default router
