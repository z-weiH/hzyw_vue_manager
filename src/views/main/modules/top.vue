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
          欢迎登录OA系统
          <span class="ml-10 mr-10">|</span>
          系统管理员系统管理员
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
        time : '',
      }
    },
    mounted() {

    },
    methods : {
      handleSignOut() {
        alert('退出');
      },
    },
  }
</script>

<style lang="scss" scoped>

.top-header{
  background-color: #fff;
  height: 33px;
  line-height: 33px;
  padding: 23px 0 19px 0;
  border-bottom: 1px solid #E0E4E8;
  .content{
    width: 1200px;
    margin: 0 auto;
    .left{
      color: #0F357F;
      a{
        font-size: 37px;
        font-family: 'stlitiregular';
      }
      >span{
        font-size: 27px;
      }
    }
    .right{
      .iconfont{
        font-size: 16px;
      }
      .m-btn{
        padding: 5px 5px;
        border: 1px solid #747F94;
        margin-left: 10px;
      }
    }
  }
}

</style>