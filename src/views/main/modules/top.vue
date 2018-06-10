<template>
  <div class="top-header">
    <div class="content">
      <div class="left fl">
        <a class="cursor">
          互仲科技
          <span>•</span>
        </a>
        <span class="ml-5">
          业务后台管理系统
        </span>
      </div>

      <div class="right fr">
        <div class="fl">
          <i class="iconfont icon-rili mr-10"></i>
          {{new Date() | TimeMomentChina}}
          <span class="ml-10 mr-10">|</span>
          欢迎登录业务后台管理系统
          <span class="ml-10 mr-10">|</span>
          {{userName}}
          <el-button @click="handleSignOut" class="m-btn">
            <i class="iconfont icon-tuichu"></i>
            退出登录
          </el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: "",
      userName : '',
    };
  },
  mounted() {
    try{
      this.userName = JSON.parse(localStorage.getItem('loginInfo')).userName;
    }catch(err) {

    }
  },
  methods: {
    handleSignOut() {
      this.$confirm("是否退出客户服务平台?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true
      }).then(() => {
        // this.$http.post("/logout.htm", {}).then(response => {
          localStorage.removeItem("loginInfo");
          localStorage.removeItem("menuInfoList");
          this.$router.push({ path: "/login" });
        // });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.top-header {
  background-color: #fff;
  height: 33px;
  line-height: 33px;
  padding: 23px 0 19px 0;
  border-bottom: 1px solid #e0e4e8;
  .content {
    width: 1200px;
    margin: 0 auto;
    .left {
      color: #0f357f;
      a {
        font-size: 37px;
        font-family: "stlitiregular";
      }
      > span {
        font-size: 27px;
      }
    }
    .right {
      .iconfont {
        font-size: 16px;
      }
      .m-btn {
        padding: 5px 5px;
        border: 1px solid #747f94;
        margin-left: 10px;
      }
    }
  }
}
</style>
