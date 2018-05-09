<template>
  <div class="menu-box">
    <el-menu
      router
      :default-active="active"
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
            ],
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
          /* this.$axios({
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
          this.$router.push({
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
