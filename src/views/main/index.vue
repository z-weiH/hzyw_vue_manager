<template>
  <div class="main">
    <top class="mb-10"></top>
    <div class="box">
      <!-- 左侧菜单 -->
      <div class="menu fl">
        <menuL></menuL>
      </div>
      <!-- router 内容 -->
      <div class="page-content fl">
          <router-view/>
      </div>
    </div>
    <backTop></backTop>
  </div>
</template>

<script>
  import top from './modules/top.vue'
  import menuL from './modules/menu.vue'
  import backTop from '@/components/backTop.vue'

  export default {
    components : {
      top,
      menuL,
      backTop
    },
  }
</script>

<style lang="scss" scoped>

.main{
  background-color: #F1F2F7;
  overflow: hidden;
  min-height: 100%;
  .box{
    width: 1200px;
    margin: 0 auto;
    .menu{
      width: 230px;
      margin-right: 10px;
      padding-bottom: 50px;
    }
    .page-content{
      width: 960px;
    }
  }
}

</style>
