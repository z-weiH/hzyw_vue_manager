<template>
  <div class="menu-box">
    <el-menu
      router
      :default-active="$store.state.menu.menuActive"
      :unique-opened="true"
    >
      <template v-for="(item) in menuList">

        <el-submenu :key="item.menuId" :index="item.menuId + ''">
          <template slot="title">
            <span>{{item.menuName}}</span>
          </template>
          <template v-for="(child) in item.children">

            <!-- 如果当前是 推送记录菜单 特殊处理-->
            <template v-if="child.menuUrl === 'messagePushList'">
              <el-menu-item :key="child.menuId" :index="`/main/${child.menuUrl}`">
                <i class="ico_userManage2"></i>
                {{child.menuName}}
                <span
                  v-if="$store.state.menu.pushRecordUnread !== 0 &&
                  $store.state.menu.pushRecordUnread !== '0'"
                  style="color:#F1C26B;"
                >
                  （{{$store.state.menu.pushRecordUnread}}）
                </span>
                <span class="fn-hide">{{isPushRecord = true}}</span>
              </el-menu-item>
            </template>

            <template v-else>
              <el-menu-item :key="child.menuId" :index="`/main/${child.menuUrl}`">
                <i class="ico_userManage2"></i>
                {{child.menuName}}
              </el-menu-item>
            </template>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 是否存在 推送记录
        isPushRecord : false,
        // menu list
        menuList : [
          {
            menuName : '系统管理',
            menuId : 1,
            children : [
              {
                menuName : '用户查询',
                menuId : 2,
                menuUrl : 'userQuery',
              },
              {
                menuName : '角色管理',
                menuId : 3,
                menuUrl : 'roleManage',
              },
              {
                menuName : '用户管理',
                menuId : 4,
                menuUrl : 'userControl',
              },
              {
                menuName : '菜单管理',
                menuId : 5,
                menuUrl : 'menuManage',
              },
              {
                menuName : '个人信息',
                menuId : 6,
                menuUrl : 'personInfo',
              },
              {
                menuName : '修改密码',
                menuId : 7,
                menuUrl : 'changePwd',
              },
              {
                menuName : '权限分配',
                menuId : 8,
                menuUrl : 'permissionAllot',
              },
              {
                menuName : '权限列表',
                menuId : 9,
                menuUrl : 'permissionList',
              }
            ],
          },
          {
            menuName : '开户管理',
            menuId : 10,
            children: [
              {
                menuName : '用户查询',
                menuId : 11,
                menuUrl : 'userSearch'
              },
              {
                menuName : '开户申请',
                menuId : 12,
                menuUrl : 'accountApply'
              },
              {
                menuName : '开户设置【财务主管】',
                menuId : 13,
                menuUrl : 'accountSettingDefault'
              },
              {
                menuName : '开户设置【财务人员】',
                menuId : 14,
                menuUrl : 'accountSettingManage'
              },
              {
                menuName : '开户确认',
                menuId : 15,
                menuUrl : 'accountAffirm'
              }
            ]
          },
          {
            menuName : '仲裁委管理',
            menuId : 150,
            children: [
              {
                menuName : '仲裁委管理',
                menuId : 151,
                menuUrl : 'arbitramentManage',
              },
              {
                menuName : '通知邮箱管理',
                menuId : 152,
                menuUrl : 'informEmailManage',
              },
            ]
          },
          {
            menuName : '官网管理',
            menuId : 160,
            children: [
              {
                menuName : '客户案例',
                menuId : 161,
                menuUrl : 'customerCase',
              },
              {
                menuName : '咨询管理',
                menuId : 162,
                menuUrl : 'advisoryManage',
              },
              {
                menuName : '新闻动态',
                menuId : 163,
                menuUrl : 'newsDynamicState',
              },
            ]
          },
          {
            menuName : '第三方管理',
            menuId : 21,
            children : [
              {
                menuName : '邮件发送',
                menuId : 22,
                menuUrl : 'mailSend',
              },
              {
                menuName : '短信发送',
                menuId : 23,
                menuUrl : 'noteSend',
              },
              {
                menuName : '短信渠道管理',
                menuId : 24,
                menuUrl : 'channelManage',
              },
              /* {
                menuName : '邮件发送日志',
                menuId : 24,
                menuUrl : 'mailSendLog',
              }, */
              /* {
                menuName : '短信发送',
                menuId : 25,
                menuUrl : 'noteSend',
              },
              {
                menuName : '邮件发送',
                menuId : 26,
                menuUrl : 'mailSend',
              }, */
            ],
          },
          {
            menuName : '客户管理',
            menuId : 31,
            children : [
              {
                menuName : '客户账号管理',
                menuId : 39,
                menuUrl : 'accountManagement',
              },
              {
                menuName : '客户管理',
                menuId : 32,
                menuUrl : 'clientManagement',
              },
              {
                menuName : '账户余额查询',
                menuId : 33,
                menuUrl : 'balanceQuery',
              },
              {
                menuName : '模板设置',
                menuId : 34,
                menuUrl : 'tplSetting',
              },
              /* {
                menuName : '模板证据设置',
                menuId : 35,
                menuUrl : 'tplEvidenceSetting',
              }, */
              {
                menuName : '业务类型设置',
                menuId : 36,
                menuUrl : 'businessTypeSetting',
              },
              {
                menuName : '模板列表',
                menuId : 37,
                menuUrl : 'templateList',
              },
              {
                menuName : '数据管理',
                menuId : 38,
                menuUrl : 'dataManagement',
              },
              {
                menuName : '模板联调',
                menuId : 310,
                menuUrl : 'templateJoint',
              },
              {
                menuName : '参数列表',
                menuId : 311,
                menuUrl : 'ctParameterList',
              },
            ],
          },
          {
            menuName : '案件订单',
            menuId : 41,
            children : [
              {
                menuName : '仲裁端定时任务管理',
                menuId : 42,
                menuUrl : 'arbitramentTimeTaskManage'
              },
              {
                menuName : '客户端定时任务管理',
                menuId : 43,
                menuUrl : 'clientTimeTaskManage'
              },
              /* {
                menuName : '案件提交日志',
                menuId : 44,
                menuUrl : 'caseOrderQuery'
              }, */
              {
                menuName : '身份证校验',
                menuId : 45,
                menuUrl : 'idCardVerfy'
              },
              {
                menuName : '订单管理',
                menuId : 46,
                menuUrl : 'orderManagement'
              },
              {
                menuName : '快速通道',
                menuId : 47,
                menuUrl : 'fastTrack'
              },
            ],
          },
          {
            menuName : '案件相关',
            menuId : 51,
            children : [
              {
                menuName : '仲裁用户管理',
                menuId : 52,
                menuUrl : 'arbitramentUsersManage'
              },
              {
                menuName : '案件管理',
                menuId : 53,
                menuUrl : 'caseManagement'
              },
            ],
          },
          {
            menuName : '财务管理',
            menuId : 61,
            children : [
              {
                menuName : '合同加款【财务人员】',
                menuId : 62,
                menuUrl : 'contractAddNewDefault'
              },
              {
                menuName : '合同加款【审核】',
                menuId : 63,
                menuUrl : 'contractAddNewManage'
              },{
                menuName : '订单加款【财务人员】',
                menuId : 64,
                menuUrl : 'orderAddNewDefault'
              },{
                menuName : '订单加款【审核】',
                menuId : 65,
                menuUrl : 'orderAddNewManage'
              },{
                menuName : '受理费日对账',
                menuId : 66,
                menuUrl : 'billingDay'
              },{
                menuName : '服务费日对账',
                menuId : 67,
                menuUrl : 'serviceChargeDayCheck'
              },{
                menuName : '仲券赠送【销售申请】',
                menuId : 671,
                menuUrl : 'zticketDonateGeneral'
              },{
                menuName : '仲券赠送【销售主管初审】',
                menuId : 68,
                menuUrl : 'zticketDonateDefault'
              },{
                menuName : '仲券赠送【CEO复审】',
                menuId : 69,
                menuUrl : 'zticketDonateManage'
              },{
                menuName : '退款【财务人员】',
                menuId : 70,
                menuUrl : 'refundListDefault'
              },{
                menuName : '退款【审核】',
                menuId : 711,
                menuUrl : 'refundListManage'
              },{
                menuName : '技术服务费日对账',
                menuId : 712,
                menuUrl : 'techServiceDayCheck'
              },{
                menuName : '受理费结算',
                menuId : 713,
                menuUrl : 'processingFeeSettle'
              },{
                menuName : '受理费结算复核',
                menuId : 714,
                menuUrl : 'processingFeeSettleReview'
              },
              {
                menuName : '案件仲券退款申请',
                menuId : 715,
                menuUrl : 'crRefundApplication'
              },
              {
                menuName : '案件仲券退款审核',
                menuId : 716,
                menuUrl : 'crRefundAudit'
              },
              {
                menuName : '案件仲券退款查看',
                menuId : 717,
                menuUrl : 'crRefundView'
              },
            ],
          },
          {
            menuName : '案件信息',
            menuId : 71,
            children : [
              {
                menuName : '案件列表',
                menuId : 72,
                menuUrl : 'caseListView'
              },
              {
                menuName : '被申请人反馈',
                menuId : 73,
                menuUrl : 'respondentsFeedback'
              },
              {
                menuName : '还款信息',
                menuId : 74,
                menuUrl : 'paymentInformation'
              },
              {
                menuName : '被申请人操作记录',
                menuId : 75,
                menuUrl : 'respondentsOperateRecord'
              }
            ],
          },
           {
            menuName : '短信记录',
            menuId : 81,
            children : [
              {
                menuName : '发送记录',
                menuId : 82,
                menuUrl : 'esmqLogView'
              },
              {
                menuName : '接收记录',
                menuId : 83,
                menuUrl : 'receiveLog'
              },
              {
                menuName : '调解短信',
                menuId : 84,
                menuUrl : 'mediationMsg'
              },
              {
                menuName : '调解短信设置',
                menuId : 85,
                menuUrl : 'mediationMsgSet'
              }
            ],
          }, {
            menuName : '状态配置',
            menuId : 91,
            children : [
              {
                menuName : '客户分配',
                menuId : 92,
                menuUrl : 'customerAllot'
              },
              {
                menuName : '调解状态设置',
                menuId : 93,
                menuUrl : 'mediateStatusSet'
              },

            ],
          },
          {
            menuName : '预审系统',
            menuId : 'ys1',
            children : [
              {
                menuName : '预审案件库',
                menuId : 'ys2',
                menuUrl : 'hearCaseList'
              },
              {
                menuName : '证据缺失案件库',
                menuId : 'ys3',
                menuUrl : 'hearDropCaseList'
              },
              {
                menuName : '案件初审',
                menuId : 'ys4',
                menuUrl : 'initialHearList'
              },
              {
                menuName : '案件复审',
                menuId : 'ys5',
                menuUrl : 'redoHearList'
              },
              {
                menuName : '立案申请',
                menuId : 'ys6',
                menuUrl : 'initiateApplyList'
              },
              {
                menuName : '推送记录',
                menuId : 'ys7',
                menuUrl : 'messagePushList'
              },
              {
                menuName : '数据统计',
                menuId : 'ys8',
                menuUrl : 'dataStatisticsView'
              },
              {
                menuName : '预审设置',
                menuId : 'ys9',
                menuUrl : 'advanceHearSetsList'
              },
            ],
          },
          {
            menuName : '复核管理',
            menuId : 'fh1',
            children : [
              {
                menuName : '案件列表',
                menuId : 'fh2',
                menuUrl : 'reviewCaseList'
              },
              {
                menuName : '案件复核',
                menuId : 'fh3',
                menuUrl : 'reviewCaseReview'
              },
              {
                menuName : '复核监控',
                menuId : 'fh4',
                menuUrl : 'monitor'
              },
              {
                menuName : '撤案对接',
                menuId : 'fh5',
                menuUrl : 'withdrawCase'
              },
              {
                menuName : '复核设置',
                menuId : 'fh6',
                menuUrl : 'reviewSetting'
              },
            ],
          },
          {
            menuName : '规则库管理',
            menuId : 'gzk1',
            children : [
              {
                menuName : '规则库',
                menuId : 'gzk2',
                menuUrl : 'ruleBaseNavigation'
              },
              {
                menuName : '规则模版',
                menuId : 'gzmb',
                menuUrl : 'ruleTemplate'
              },
            ],
          },
          {
            menuName: '执行管理',
            menuId: 'zxm1',
            children: [
              {
                menuName: '法院信息表',
                menuId: 'zxm2',
                menuUrl: 'courtInfo'
              },
              {
                menuName: '注册法官信息',
                menuId: 'zxm3',
                menuUrl: 'judgeInfo'
              },
              {
                menuName: '注册信息审核',
                menuId: 'zxm4',
                menuUrl: 'judgeRegisterInfo'
              },
              {
                menuName: '案件操作记录',
                menuId: 'zxm5',
                menuUrl: 'caseOperationRecord'
              }
            ]
          },
          {
            menuName: '送达系统',
            menuId: 'sdxt',
            children: [
              {
                menuName: '渠道管理',
                menuId: 'sdxt1',
                menuUrl: 'serChannelManage'
              },
              {
                menuName: '业务管理',
                menuId: 'sdxt2',
                menuUrl: 'serBusinessManage'
              },
              {
                menuName: '客户管理',
                menuId: 'sdxt3',
                menuUrl: 'serCustomerManage'
              },
              {
                menuName: '模板管理',
                menuId: 'sdxt4',
                menuUrl: 'serTemplateManage'
              },
              {
                menuName: '短信发送',
                menuId: 'sdxt5',
                menuUrl: 'serSmsSend'
              },
              {
                menuName: '邮件发送',
                menuId: 'sdxt6',
                menuUrl: 'serEmailSend'
              },
            ]
          },
          {
            menuName: '强制执行管理',
            menuId: 'qzzx',
            children: [
              {
                menuName: '法院案件关联',
                menuId: 'fyajgl',
                menuUrl: 'courtCaseRelation'
              },
            ]
          }
        ],
        // 当前高亮的 menu
        active : '/main/demo',
        // 推送记录 定时器
        timer : '',
      }
    },
    mounted() {
      if(process.env.NODE_ENV !== 'development'){
        // 从 缓存读取 左侧树
        this.menuList = JSON.parse(localStorage.getItem('menuInfoList'));
        console.error(this.menuList);
      }
      // 获取menu 树 , 高亮选中
      this.getMeun().then(this.setMuenActive);

      this.$nextTick(() => {
        if(this.isPushRecord === true){
          this.timingRecord();
          this.timer = setInterval(this.timingRecord,1000 * 60 * 10);
        }
      });
    },
    methods : {
      // 获取menu 树
      getMeun() {
        return new Promise((resove,reject) => {
          resove();
        });
      },
      // 设置当前 高亮
      setMuenActive() {
        let routerName = this.$route.meta.name;
        this.menuList.map((v,k) => {
          if(v.children && v.children.length > 0){
            v.children.map((v1,k1) => {
              if(v1.menuUrl.indexOf(routerName) !== -1){
                // this.active = `/main/${v1.menuUrl}`;
                this.$store.commit('menu/setMenuActive',`/main/${v1.menuUrl}`);
              }
            });
          }
        });

      },
      // 更新 推送记录
      timingRecord() {
        this.$store.dispatch('menu/upDataPushRecordUnread');
      },
    },
    destroyed() {
      clearInterval(this.timer);
    },
  }
</script>

<style lang="scss" scoped>


/* aside icon start */
.ico_userManage:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -121px -259px; width: 23px; height: 20px; }

.ico_userSearch:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -290px -63px; width: 21px; height: 22px; }

.ico_roleManage:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -113px -290px; width: 23px; height: 17px; }

.ico_menuManage:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -32px -227px; width: 24px; height: 24px; }

.ico_me:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: 0px -227px; width: 24px; height: 24px; }

.ico_pwd:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -319px -248px; width: 16px; height: 18px; margin-right: 16px; margin-left: 5px; }

.ico_fzzqApply:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -319px -59px; width: 19px; height: 20px; }

.ico_fzzqSearch:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -290px -63px; width: 21px; height: 22px; }

.ico_fzzqSet:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -258px 0px; width: 24px; height: 24px; }

.ico_fzzqConfirm:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -224px -195px; width: 24px; height: 24px; }

.ico_rebate:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -192px -195px; width: 24px; height: 24px; }

.ico_voucher:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -160px -195px; width: 24px; height: 24px; }

.ico_addmoney:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -128px -195px; width: 24px; height: 24px; }

.ico_orderM:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -96px -195px; width: 24px; height: 24px; }

.ico_profee:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -57px -290px; width: 20px; height: 20px; }

.ico_service:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -32px -195px; width: 24px; height: 24px; }

.ico_tec:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: 0px -195px; width: 24px; height: 24px; }

.ico_settle:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -226px -160px; width: 24px; height: 24px; }

.ico_custom:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -226px -128px; width: 24px; height: 24px; }

.ico_tpl:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -226px -96px; width: 24px; height: 24px; }

.ico_tplset:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -226px -64px; width: 24px; height: 24px; }

.ico_balance:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -226px -32px; width: 24px; height: 24px; }

.ico_ajorder:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -226px 0px; width: 24px; height: 24px; }

.ico_card:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -192px -163px; width: 24px; height: 24px; }

.ico_client:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -160px -163px; width: 24px; height: 24px; }

.ico_arb:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -128px -163px; width: 24px; height: 24px; }

.ico_caseM:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -96px -163px; width: 24px; height: 24px; }

.ico_arbuser:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -64px -163px; width: 24px; height: 24px; }

.ico_arbboard:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -252px -227px; width: 22px; height: 22px; }

.ico_gmail:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -30px -259px; width: 22px; height: 23px; }

.ico_consulting:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -152px -259px; width: 22px; height: 20px; }

.ico_newstate:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -194px -96px; width: 24px; height: 24px; }

.ico_clientcase:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -194px -64px; width: 24px; height: 24px; }

.ico_sendemail:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -242px -259px; width: 22px; height: 18px; }

.ico_sendnote:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -194px 0px; width: 24px; height: 24px; }

.ico_caselib:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -258px -64px; width: 24px; height: 24px; }

.ico_casebchk:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -258px -96px; width: 24px; height: 24px; }

.ico_preReview:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -258px -128px; width: 24px; height: 24px; }

.ico_caseList:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -98px -129px; width: 24px; height: 24px; }

.ico_bsqrback:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -66px -129px; width: 24px; height: 24px; }

.ico_hkmsg:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -162px -97px; width: 24px; height: 24px; }

.ico_bsqrHistory:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -130px -97px; width: 24px; height: 24px; }

.ico_sendHistory:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -162px -129px; width: 24px; height: 24px; }

.ico_reiveHistory:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -130px -129px; width: 24px; height: 24px; }

.ico_customAllot:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -98px -97px; width: 24px; height: 24px; }

.ico_mstatusSet:before { background-image: url('./../../../assets/img/png-sprite.png'); content: ''; display: inline-block; vertical-align: text-bottom; margin-right: 12px; background-position: -66px -97px; width: 24px; height: 24px; }

/* end */


.menu-box{

}

</style>

<style lang="scss">

.menu-box{

}

</style>
