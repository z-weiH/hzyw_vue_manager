<template>
  <div class="parameter-list">
    <div class="parameter-list-title">
      <div class="width-1200">参数列表</div>
    </div>
    <div class="parameter-list-content">
      <div class="w-1200">
        <parameter></parameter>

        <div class="m-center">
          <el-button @click="handleClose">关闭</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import parameter from './modules/parameter.vue'
  export default {
    components : {
      parameter,
    },
    methods : {
      // 点击关闭
      handleClose() {
        window.close();
      },
    },
  }
</script>

<style lang="scss" scoped>

.parameter-list{
  height: 100%;
  overflow: auto;
  .parameter-list-title{
    height: 75px;
    background-color: #fff;
    box-sizing: border-box;
    .width-1200{
      width: 1200px;
      margin: 0 auto;
      font-size: 30px;
      color: #0f357f;
      padding-top: 21px;
    }
  }
  .parameter-list-content{
    background-color: #F1F2F7;
    min-height: calc(100% - 75px);
    .w-1200{
      width: 1200px;
      margin: 0 auto;
      padding-top: 10px;
      .m-center{
        text-align: center;
        padding: 20px 0;
      }
    }
  }
}

</style>