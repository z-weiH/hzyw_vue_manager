export const URL_JSON = {
    /* 系统管理 */

    //用户管理 UserControl
    'updatePwdUserControl': '/user/updatePwdByUserId.htm', //修改密码
    'saveUserControl': '/user/saveUserInfo.htm', //用户保存
    'queryUserControl': '/user/queryUserList.htm', //用户列表
    'deleteUserControl': '/user/deleteByPrimaryKey.htm', //用户删除
    'editUserControl': '/user/queryUserInfoByUserId.htm', //用户详情
    'queryALlRole': '/role/queryAllRoleList.htm', //角色选择

    //菜单管理  MenuManage
    'parentMenuMenuManage': '/menu/queryParentMenuList.htm', //一级菜单
    'saveMenuManage': '/menu/saveMenuInfo.htm', //菜单保存
    'deleteMenuManage': '/menu/deleteByPrimaryKey.htm', //菜单删除
    'queryMenuManage': '/menu/queryMenuList.htm', //菜单管理
    'editMenuManage': '/menu/selectByPrimaryKey.htm', //菜单详情

    //角色管理 roleManage
    'saveRoleManage': '/role/saveHzmngRoleInfo.htm', //角色保存
    'queryRoleManage': '/role/queryRoleList.htm', //角色列表
    'deleteRoleManage': '/role/deleteRoleByRoleId.htm', //角色删除
    'treeRoleManage': '/menu/queryRoleZTree.htm', //角色菜单树
    'editRoleManage': '/role/queryRoleExtByRoleId.htm', //角色详情

    /* 系统管理 */

    /* 开户管理 */
    //开户申请 accountApply
    'saveAccountApply': '/customer/saveCustomerInfo.htm', //开户申请保存
    'queryAccountApply': '/customer/queryCostomerByBaseQuery.htm', //开户申请列表查询
    'editAccountApply': '/customer/queryCustomerExtByCustomerId.htm', //开户申请详情
    'ArbListAccountApply': '/arb/queryAllArbList.htm', //开户申请详情-查询所有仲裁委列表
    'RoleTypeAccountApply': '/user/queryUserListByRoleType.htm', //开户申请详情-查询所有市场人员列表
    'getParentCustomerAccountApply': '/customer/selectAllParentCustomer.htm', //父账户下拉列表

    //开户确认 AccountAffirm
    'queryAccountAffirm': '/customer/queryApplicationOrderForOperator.htm', //开户确认列表查询
    'openAccountAffirm': '/customer/openCustomerConfirmByCustId.htm', //开户确认设置
    'editAccountAffirm': '/customer/queryCustomerConfirmDetailByCustomerId.htm', //开户确认详情

    //开户设置【财务主管】 AccountSettingDefault
    'editAccountSettingDefault': '/order/selectDetailByOrderId.htm', //开户设置详情
    'queryAccountSettingDefault': '/order/queryApplicationOrderForFinancialCharge.htm', //用户列表
    'saveAccountSettingDefault': '/order/updateOrderResultInfo.htm', //财务主管加款信息审核

    //开户设置【财务人员】 AccountSettingManage
    'queryAccountSettingManage': '/order/queryApplicationOrderForFinancial.htm', //客户列表
    'editAccountSettingManage': '/order/selectDetailByOrderId.htm', //开户设置详情
    'saveAccountSettingManage': '/order/saveAdditionalInformation.htm', //保存，提交

    /* 开户管理 */

    /* 官网管理 */
    //咨询管理   AdvisoryManage
    'queryAdvisoryManage': '/consult/queryConsultByBaseQuery.htm', //咨询管理列表
    'editAdvisoryManage': '/consult/queryConsultByPrimaryKey.htm', //咨询管理详情
    'saveAdvisoryManage': '/consult/updateConsultByConsultId.htm', //处理

    //客户案例 CustomerCase
    'saveCustomerCase': '/portal/saveCustCaseInfo.htm', //修改案例
    'deleteCustomerCase': '/portal/deleteCustCaseByPrimaryKey.htm', //删除案例
    'queryCustomerCase': '/portal/queryCustInfoByBaseQuery.htm', //客户案例列表
    'insertCustomerCase': '/portal/saveCustCaseInfo.htm', //新增案例
    'editCustomerCase': '/portal/selectCustCaseByPrimaryKey.htm', //案例详情

    //新闻动态 NewsDynamicState
    'saveNewsDynamicState': '/news/savePortalNewsInfo.htm', //修改新闻
    'deleteNewsDynamicState': '/news/deleteNewsByPrimaryKey.htm', //删除新闻
    'insertNewsDynamicState': '/news/savePortalNewsInfo.htm', //新增新闻
    'queryNewsDynamicState': '/news/queryNewsByBaseQuery.htm', //新闻动态列表
    'editNewsDynamicState': '/news/selectNewsByPrimaryKey.htm', //新闻详情

    /* 官网管理 */


    /* 仲裁委管理 */
    //仲裁委管理 ArbitramentManage
    'saveArbitramentManage': '/arb/saveArbArbitration.htm', // 仲裁委保存
    'deleteArbitramentManage': '/arb/deleteArbByPrimaryKey.htm', // 仲裁委删除
    'queryArbitramentManage': '/arb/queryArbByBaseQuery.htm', // 仲裁委管理列表
    'editArbitramentManage': '/arb/queryArbByPrimaryKey.htm', // 仲裁委详情

    //通知邮箱管理  InformEmailManage
    'saveInformEmailManage': '/email/updateArbEmailByEmailId.htm', //仲裁委邮箱修改
    'queryInformEmailManage': '/email/queryArbEmailByBaseQuery.htm', //仲裁委邮箱列表
    'editInformEmailManage': '/email/queryEmailByPrimaryKey.htm', //仲裁委邮箱详情


    /* 仲裁委管理 */

    /* 第三方管理 */

    //短信渠道管理channelManage
    'queryChannelManage': '/riskChannel/queryChannelByBaseQuery.htm', // 短信渠道管理列表页面
    'editChannelManage': '/riskChannel/queryChannelByChannelId.htm', // 短信渠道修改详情
    'deleteChannelManage': '/riskChannel/updateChannelByPrimaryKey.htm', // 短信渠道的删除
    'saveChannelManage': '/riskChannel/saveChannelManage.htm', // 短信渠道保存

    /* 第三方管理 */

    /* 财务管理 */
    //  订单加款【 财务人员】
    'queryOrderAddNewDefault': '/order/queryOrderByFinancialStaff.htm', // 订单加款列表
    'queryOrderAddNewDefaultDetail': '/order/queryOrderDetailByOrderId.htm', //订单加款详情
    'exportOrderAddNewDefault': '/order/exportExcel.htm', //导出excel
    'saveOrderAddNewDefaultDetail': '/order/saveOrderInfo.htm', //保存加款明细

    //  订单加款【 审核】
    'queryOrderAddNewManage': '/order/queryOrderByCharge.htm', // 订单加款列表
    'exportOrderAddNewManage': '/order/exportExcelForManager.htm', //导出excel
    'updateOrderAddNewManage': '/order/auditOrderAdd.htm', //订单加款审核

    // 仲券赠送【销售申请】
    'queryZticketDonateGeneral': '/ticketGift/queryTicketGiftByMarketer.htm', //列表
    'queryZticketDonateGeneralDetail': '/ticketGift/queryTicketByTicketId.htm', //详情
    'queryZticketCompany': '/merchant/queryMerchantsByUserId.htm', //赠送企业申请列表
    'queryZticketCompanyInfo': '/ticketGift/queryMerchantInfoByMerchantCode.htm', //企业信息
    'updateZticketDetail': '/ticketGift/applicationTicketGift.htm', //保存、修改、提交


    // 仲券赠送【销售主管初审】
    'queryZticketTopheadList': '/ticketGift/queryTicketGiftByManager.htm', //销售主管初审列表
    'queryZticketZgDetail': '/ticketGift/queryTicketByTicketId.htm', //主管审核详情
    'updateZticketIsPass': '/ticketGift/aduitTicketGiftByManager.htm', //审核接口



    //仲券赠送【ceo】
    'queryZticketDonateManage': '/ticketGift/queryTicketGiftByCeo.htm',
    'editZticketDonateManage': '/ticketGift/queryTicketByTicketId.htm',
    'saveZticketDonateManage': '/ticketGift/aduitTicketGiftByCeo.htm',




    // 受理费日对账
    'queryBillingDay': '/amountcheckday/billdaylist.htm', //受理费日对账列表

    // 服务费日对账
    'queryServiceChargeDayCheck': '/amountcheckday/servicedaylist.htm', //服务费日对账列表

    // 受理费结算
    'queryProcessingFeeSettle': '/recharge/processingFee.htm', //受理费结算列表
    'editProcessingFeeSettle': '/recharge/settiementDetail.htm', //受理费结算详情
    'updateProcessingFeeSettle': '/recharge/settlement.htm', //提交






    /* 财务管理 */

    /* 短信记录 */
    'queryEsmqLogView': '/send/querySmsSendByBaseQuery.htm', //发送记录
    'exportEsmqLogView': '/send/exportExcel.htm', //导出
    'queryReceiveLog': '/receive/querySmsReceiveByBaseQuery.htm', //接收记录
    'exportReceiveLog': '/receive/exportExcel.htm', //导出
    /* 短信记录 */

    /* 案件信息 */
    'queryCaseListView': '/case/queryHzCaseInfoByBaseQuery.htm', //案件列表
    'queryCaseListCountItem': '/case/queryCaseSumInfo.htm',//案件列表-小计接口
    'exportCaseListView': '/case/exportFileHzCaseInfoByBaseQuery.htm', //案件列表 - 导出
    'queryRespondentsFeedback': '/feedback/queryRespondentFeedbackByBaseQuery.htm', //被申请人反馈
    'exportRespondentsFeedback': '/feedback/exportExcel.htm', //被申请人反馈-导出
    'queryPaymentInformation': '/repayment/queryRepaymentList.htm', //还款信息
    'selectCompany': '/case/queryCustomerList.htm', //选择-互金公司
    'selectProduct': '/case/queryProducts.htm', //选择-产品
    'selectHkCaseStage': '/caseStatus/queryCaseStatusTwoLevel.htm', //还款案件阶段
    'selectHkCaseStatus': '/caseStatus/queryCaseStatusThreeLevel.htm', //还款案件状态
    'exportPaymentInfomation': '/repayment/exportExcel.htm', //导出还款信息
    'queryRespondentsOperateRecord': '/respondents/queryOperRecordList.htm', //被申请人操作记录
    'exportRespondentsOperateRecord': '/respondents/exportExcel.htm', //导出被申请人操作记录
    'queryOperType': '/respondents/queryOperType.htm', //操作类型
    'queryOperObject': '/respondents/queryOperObject.htm', //操作对象
    'selectTemplateItem': '/case/queryTemplatesByProductCode.htm', //产品模版

    /* 案件信息 */

    /* 状态配置 */
    'queryCustomerAllot': '/distribution/queryDistributionByBaseQuery.htm', //客户分配列表
    'queryAllMerchant': '/merchant/queryAllMerchant.htm', //互金企业
    'queryUserListByRoleType': '/user/queryUserListByRoleType.htm', //运营人员
    'saveCustomerAllot': '/distribution/saveDistribution.htm', //新增分配人员
    'unbindCustomerAllot': '/distribution/deleteChannelByPrimaryKey.htm', //解绑分配人员

    'queryFreezeCaseList': '/adjust/queryFreezedCasesList.htm', //调解-冻结案件列表
    'saveunFreezeCaseIdsList': '/adjust/freezeOrUnfreezeCases.htm', //保存解冻-案件
    'queryUnFreeZeCaseToDo': '/adjust/queryPrepareFreezeCasesList.htm', //未冻结案件-列表

    /* 状态配置 */


    /* 短信发送模块 */
    /* 短信调节 */

    'queryMediationMsg': '/adjust/queryAdjustCaseListByBaseQuery.htm',
    'sendMediationMsg': '/adjust/sendAdjustSmsByCaseIds.htm',
    'queryAllMediatorList': '/msgRecorder/queryAllMediatorList.htm',
    'queryAdjustPaymentQuery': '/msgRecorder/queryAdjustPaymentQuery.htm',

    /* 短信调节 */

    /*设置*/
    'queryAdjustMediator': '/msgRecorder/queryAdjustMediatorByBaseQuery.htm',
    'deleteAdjustMediator': '/msgRecorder/deleteAdjustMediatorByPrimaryKey.htm',
    'saveAdjustMediator': '/msgRecorder/saveAdjustMediatorManage.htm',
    'queryAdjustPaymentAccount': '/msgRecorder/queryAdjustPaymentAccountByBaseQuery.htm',
    'deleteAdjustPaymentAccount': '/msgRecorder/deleteAdjustPaymentAccountByPrimaryKey.htm',
    'saveAdjustPaymentAccount': '/msgRecorder/saveAdjustPaymentAccountManage.htm',
    /*调节短信设置*/


    /*-----预审系统----*/
    'queryInitiateApplyList': '/caseApply/queryApplicationList.htm', //立案申请列表

    'queryRedoHearList': '/againAudit/queryBatchInfoByBaseQuery.htm', //案件复审列表

    'queryFPurl': '/user/queryUserListByRoleType.htm', //初审人下拉

    'queryBatchInfo': '/firstAudit/queryBatchInfoByBatchNo.htm', //预审-批次信息

    'queryChildBatchInfo': '/firstAudit/querySubBatchList.htm', //预审详情-子批次概要信息

    'queryBatchLogs': '/firstAudit/queryBatchLog.htm', //批次日志

    'queryHJCompany': '/merchant/queryPreMerchantName.htm', //预审-互金企业

    'queryCpProduct': '/merchant/selectMerchantProductByMerchantCode.htm', //根据企业选择产品

    'queryApplyCaseNum': '/caseApply/queryApplicationTicketAndAmt.htm', //申请立案数量信息

    'confirmApplyCase': '/caseApply/applicationByPreDistributeQuery.htm', //立案申请确认

    'queryChangeFirstPerson': '/againAudit/changeAuditUserQueryByBatchId.htm', //变更初审人-查询

    'saveChangeFirstPerson': '/againAudit/changeAuditorByBatchId.htm', //变更初审人-保存

    'queryRedoHearChildDetail': '/againAudit/queryAgainAuditDetailByBatchNo.htm', //案件复审-子批次审核详情页

    'queryRecheckDetailView': '/againAudit/queryAgainAuditDetailByBatchNo.htm', //案件复审3合一详情

    'savecaseReback': '/againAudit/subBatchReturnByBatchId.htm', //3合一自批次退回

    'savePassBatchId': '/againAudit/subBatchPassByBatchId.htm', //通过3合一子批次

    'queryNumberBatchList': '/againAudit/subBatchPassQueryByBatchId.htm', //查询子批次数量信息

    'queryNumberBatchList1': '/firstAudit/subBatchPassQueryByBatchId.htm', //查询子批次数量信息bak

    'queryAllReasonList': '/againAudit/queryAuditOpinionByCaseId.htm', //所有审核不通过原因

    'queryBackReason': '/againAudit/querysubBatchReturnInfoByBatchNo.htm', //查看退回原因
    'queryBackReason1': '/firstAudit/queryReturnMsg.htm', //复审-查看退回原因

    'saveChangeResReason': '/againAudit/saveAuditSuggestion.htm', //案件复审-变更审核原因

    'querySetCaseNum': '/caseApply/countAbleApplicationCaseByBaseQuery.htm', //立案申请总数查询

    'exportChildBatchFile': '/againAudit/exportSubBatchBackCaseList.htm', //案件复审-导出子批次数据
    /*-----预审系统----*/


}
