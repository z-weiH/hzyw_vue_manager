<template>
  <div class="tm-parameter-detail">
    <div class="tm-head">
      <div class="fl">参数列表</div>
      <div class="fr">
        <el-radio-group v-model="type" size="small">
          <el-radio-button label="0">案件参数</el-radio-button>
          <el-radio-button label="1">仲裁参数</el-radio-button>
          <el-radio-button label="2">个性参数</el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <div class="tm-content">
      <div class="fl">
        <scrollTop></scrollTop>
      </div>

      <div class="fr">
        <div class="m-scrollbar-box">
          <el-scrollbar :native="false">
            <div style="height:1000px;"></div>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <documentPreviewDialog ref="documentPreviewDialog"></documentPreviewDialog>
  </div>
</template>

<script>
  // 滚动插件
  import scrollTop from '@/components/scrollTop'
  import documentPreviewDialog from './modules/documentPreviewDialog.vue'
  export default {
    components : {
      scrollTop,
      documentPreviewDialog,
    },
    
    data() {
      return {
        // '1' 案件参数 '2' 仲裁参数 '3' 个性参数
        type : this.$route.query.type || '1',
      }
    },
  }
</script>

<style lang="scss" scoped>

.tm-parameter-detail{
  height: 100vh;
  overflow: auto;
  .tm-head{
    background-color: #fff;
    height: 50px;
    box-sizing: border-box;
    border-bottom: 1px solid #e0e4e8;
    .fl{
      color: #0f357f;
      padding-left: 18px;
      line-height: 50px;
      font-size: 26px;
    }
    .fr{
      margin-top: 10px;
      margin-right: 45px;
    }
  }

  .tm-content{
    .fr{
      width: calc(100vw - 200px);
      box-sizing: border-box;
    }
  }
}

</style>

<style lang="scss">
.tm-parameter-detail{
  .el-radio-button:focus:not(.is-focus):not(:active){
    box-shadow: none;
  }
}
</style> 

<style lang="scss">

.m-scrollbar-box{
  height: calc(100vh - 50px);
  overflow: hidden;
  .el-scrollbar{
    height: 100%;
  }
  .el-scrollbar__wrap{
    height: 100%;
    overflow-x: hidden;
  }
  .el-scrollbar__view{
    padding-right: 10px;
  }
}

</style> 