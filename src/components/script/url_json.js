export const URL_JSON = {
  /* 系统管理 */

  //用户管理 UserControl
  'updatePwdUserControl': '/user/updatePwdByUserId.htm',    //修改密码
  'saveUserControl': '/user/saveUserInfo.htm',              //用户保存
  'queryUserControl': '/user/queryUserList.htm',             //用户列表
  'deleteUserControl': '/user/deleteByPrimaryKey.htm',      //用户删除
  'editUserControl': ' /user/selectByPrimaryKey.htm',        //用户详情

  //菜单管理  MenuManage
  'parentMenuMenuManage': '/menu/queryParentMenuList.htm',   //一级菜单
  'saveMenuManage': '/menu/saveMenuInfo.htm',            //菜单保存
  'deleteMenuManage': '/menu/deleteByPrimaryKey.htm',    //菜单删除
  'queryMenuManage': '/menu/queryMenuList.htm',          //菜单管理
  'editMenuManage': '/menu/selectByPrimaryKey.htm',      //菜单详情

  //角色管理 roleManage
  'saveRoleManage':'/role/saveHzmngRoleInfo.htm',         //角色保存
  'queryRoleManage':'/role/queryRoleList.htm',            //角色列表
  'deleteRoleManage':'/role/deleteRoleByRoleId.htm',      //角色删除
  'treeRoleManage':'/menu/selectZTreeVOList.htm',         //角色菜单树
  'editRoleManage':' /role/selectRoleExtByRoleId.htm',  //角色详情

  /* 系统管理 */

  /* 开户管理 */
  //开户申请 accountApply
  'saveAccountApply': 'customer/saveCustomerInfo.htm',  //开户申请保存
  'queryAccountApply': 'customer/queryCostomerByBaseQuery.htm',  //开户申请列表查询
  'editAccountApply': 'customer/queryCustomerExtByCustomerId.htm',    //开户申请详情
  'ArbListAccountApply': 'arbitration/queryAllArbList.htm',    //开户申请详情-查询所有仲裁委列表
  'RoleTypeAccountApply': 'user/queryUserListByRoleType.htm',   //开户申请详情-查询所有市场人员列表

  //开户确认 AccountAffirm
  'queryAccountAffirm': 'customer/queryApplicationOrderForOperator.htm', //开户确认列表查询
  'openAccountAffirm': 'customer/openCustomerConfirmByCustId.htm', //开户确认设置
  'editAccountAffirm': 'customer/queryApplicationOrderForOperator.htm', //开户确认详情

  //开户设置【财务主管】 AccountSettingDefault
  'editAccountSettingDefault': 'order/selectDetailByOrderId.htm',  //开户设置详情
  'queryAccountSettingDefault': 'order/queryApplicationOrderForFinancialCharge.htm',  //用户列表
  'saveAccountSettingDefault': 'order/updateOrderResultInfo.htm',  //财务主管加款信息审核

  //开户设置【财务人员】 AccountSettingManage
  'queryAccountSettingManage': 'order/queryApplicationOrderForFinancial.htm',  //客户列表
  'editAccountSettingManage': 'order/selectDetailByOrderId.htm',  //开户设置详情

  /* 开户管理 */

  /* 官网管理 */
  //咨询管理   AdvisoryManage
  'queryAdvisoryManage': '/consult/queryConsultByBaseQuery.htm', //咨询管理列表
  'editAdvisoryManage': ' /consult/selectConsultByPrimaryKey.htm', //咨询管理详情
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
  'saveArbitramentManage': '/arbitration/saveArbArbitration.htm', // 仲裁委保存
  'deleteArbitramentManage': 'arbitration/deleteArbByPrimaryKey.htm', // 仲裁委删除
  'queryArbitramentManage': '/arbitration/queryArbByBaseQuery.htm', // 仲裁委管理列表
  'editArbitramentManage': '/arbitration/selectArbByPrimaryKey.htm', // 仲裁委详情

  //通知邮箱管理  InformEmailManage
  'saveInformEmailManage': '/email/updateArbEmailByEmailId.htm', //仲裁委邮箱修改
  'queryInformEmailManage': '/email/queryArbEmailByBaseQuery.htm', //仲裁委邮箱列表
  'editInformEmailManage': '/email/selectEmailByPrimaryKey.htm', //仲裁委邮箱详情


  /* 仲裁委管理 */


}
