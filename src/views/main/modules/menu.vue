<template>
  <div class="menu-box">
    <el-menu
      router
      :default-active="active"
      :unique-opened="true"
    >
      <template v-for="(item) in menuList">

        <el-submenu :key="item.id" :index="item.id + ''">
          <template slot="title">
            <span>{{item.label}}</span>
          </template>
          <template v-for="(child) in item.children">
            <el-menu-item :key="child.id" :index="`/main/${child.url}`">
              <i class="ico_userManage"></i>
              {{child.label}}
            </el-menu-item>
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
        // menu list
        menuList : [
          {
            label : '系统管理',
            id : 1,
            children : [
              {
                label : '用户查询',
                id : 2,
                url : 'userQuery',
              },
              {
                label : '角色管理',
                id : 3,
                url : 'roleManage',
              },
              {
                label : '用户管理',
                id : 4,
                url : 'userControl',
              },
              {
                label: '菜单管理',
                id: 5,
                url: 'menuManage'
              }
            ],
          },
          {
            label: '开户管理',
            id: 10,
            children: [
              {
                label: '用户查询',
                id: 11,
                url: 'userSearch'
              },
              {
                label: '开户申请',
                id: 12,
                url: 'accountApply'
              },
              {
                label: '开户设置【财务主管】',
                id: 13,
                url: 'accountSettingDefault'
              },
              {
                label: '开户设置【财务人员】',
                id: 14,
                url: 'accountSettingManage'
              },
              {
                label: '开户确认',
                id: 15,
                url: 'accountAffirm'
              }
            ]
          },
          {
            label: '仲裁委管理',
            id: 150,
            children: [
              {
                label: '仲裁委管理',
                id: 151,
                url: 'arbitramentManage',
              },
              {
                label: '通知邮箱管理',
                id: 152,
                url: 'informEmailManage',
              },
            ]
          },
          {
            label: '官网管理',
            id: 160,
            children: [
              {
                label: '客户案例',
                id: 161,
                url: 'customerCase',
              },
              {
                label: '咨询管理',
                id: 162,
                url: 'advisoryManage',
              },
              {
                label: '新闻动态',
                id: 163,
                url: 'newsDynamicState',
              },
            ]
          },
          {
            label : '第三方管理',
            id : 21,
            children : [
              {
                label : '邮件发送日志',
                id : 22,
                url : 'mailSendLog',
              },
              {
                label : '短信发送日志',
                id : 23,
                url : 'noteSendLog',
              },
              /* {
                label : '邮件发送日志',
                id : 24,
                url : 'mailSendLog',
              }, */
              {
                label : '短信发送',
                id : 25,
                url : 'noteSend',
              },
              {
                label : '邮件发送',
                id : 26,
                url : 'mailSend',
              },
            ],
          },
          {
            label : '客户管理',
            id : 31,
            children : [
              {
                label : '客户管理',
                id : 32,
                url : 'clientManagement',
              },
              {
                label : '账户余额查询',
                id : 33,
                url : 'balanceQuery',
              },
              {
                label : '模板设置',
                id : 34,
                url : 'tplSetting',
              },
              {
                label : '模板证据设置',
                id : 35,
                url : 'tplEvidenceSetting',
              },
            ],
          },
          {
            label : '案件订单',
            id : 41,
            children : [
              {
                label : '仲裁端定时任务管理',
                id : 42,
                url : 'arbitramentTimeTaskManage'
              },
              {
                label : '客户端定时任务管理',
                id : 43,
                url : 'clientTimeTaskManage'
              },
              {
                label : '案件提交日志',
                id : 44,
                url : 'caseOrderQuery'
              },
              {
                label : '身份证校验',
                id : 45,
                url : 'idCardVerfy'
              },
              {
                label : '订单管理',
                id : 46,
                url : 'orderManagement'
              },
              {
                label : '快速通道',
                id : 47,
                url : 'fastTrack'
              },
            ],
          },
          {
            label : '案件相关',
            id : 51,
            children : [
              {
                label : '仲裁用户管理',
                id : 52,
                url : 'arbitramentUsersManage'
              },
              {
                label : '案件管理',
                id : 53,
                url : 'caseManagement'
              },
            ],
          },
          {
            label : '财务管理',
            id : 61,
            children : [
              {
                label : '合同加款【财务人员】',
                id : 62,
                url : 'contractAddNewDefault'
              },
              {
                label : '合同加款【审核】',
                id : 63,
                url : 'contractAddNewManage'
              },{
                label : '订单加款【财务人员】',
                id : 64,
                url : 'orderAddNewDefault'
              },{
                label : '订单加款【审核】',
                id : 65,
                url : 'orderAddNewManage'
              },{
                label : '受理费日对账',
                id : 66,
                url : 'billingDay'
              },{
                label : '服务费日对账',
                id : 67,
                url : 'serviceChargeDayCheck'
              },{
                label : '仲券赠送【财务人员】',
                id : 68,
                url : 'zticketDonateDefault'
              },{
                label : '仲券赠送【审核】',
                id : 69,
                url : 'zticketDonateManage'
              },{
                label : '退款【财务人员】',
                id : 70,
                url : 'refundListDefault'
              },{
                label : '退款【审核】',
                id : 711,
                url : 'refundListManage'
              },{
                label : '技术服务费日对账',
                id : 712,
                url : 'techServiceDayCheck'
              },{
                label : '受理费结算',
                id : 713,
                url : 'processingFeeSettle'
              },{
                label : '受理费结算复核',
                id : 714,
                url : 'processingFeeSettleReview'
              },
            ],
          },
          {
            label : '案件信息',
            id : 71,
            children : [
              {
                label : '案件列表',
                id : 72,
                url : 'caseListView'
              },
              {
                label : '被申请人反馈',
                id : 73,
                url : 'respondentsFeedback'
              },
            ],
          },
           {
            label : '短信记录',
            id : 81,
            children : [
              {
                label : '发送记录',
                id : 82,
                url : 'esmqLogView'
              },
              {
                label : '接收记录',
                id : 83,
                url : 'receiveLog'
              },
            ],
          }, {
            label : '状态配置',
            id : 91,
            children : [
              {
                label : '客户分配',
                id : 92,
                url : 'customerAllot'
              },
              {
                label : '调解状态设置',
                id : 93,
                url : 'mediateStatusSet'
              },
            ],
          },
        ],
        // 当前高亮的 menu
        active : '/main/demo',
      }
    },
    mounted() {
      console.log('init menu');
      // 如果当前时 登录也跳转 ， 则默认跳转至 第一个页面
      this.initPath();
      // 获取menu 树 , 高亮选中
      this.getMeun().then(this.setMuenActive);
    },
    methods : {
      // 获取menu 树
      getMeun() {
        return new Promise((resove,reject) => {
          /* this.$http({
            method : 'get',
            url : '/json/menu_init.json'
          }).then((res) => {
            console.log(res);
          }); */
          resove();
        });
      },
      // 设置当前 高亮
      setMuenActive() {
        let routerName = this.$route.meta.name;
        this.menuList.map((v,k) => {
          if(v.children && v.children.length > 0){
            v.children.map((v1,k1) => {
              if(v1.url.indexOf(routerName) !== -1){
                this.active = `/main/${v1.url}`;
              }
            });
          }
        });

      },
      // 初始化 默认跳转
      initPath() {
        let routerPath = this.$route.path;
        if(routerPath === '/main' || routerPath === '/main/'){
          this.$router.replace({
            path : '/main/' + this.menuList[0].children[0].url,
          });
        }
      },
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
  .el-menu-item{
    padding-left: 20px!important;
  }
}

</style>
