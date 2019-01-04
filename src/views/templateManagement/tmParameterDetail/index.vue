<template>
  <div class="tm-parameter-detail">
    <div class="tm-head">
      <div class="fl">参数列表</div>
      <div class="fr">
        <el-radio-group @change="handleChange" v-model="type" size="small">
          <el-radio-button label="0">案件参数</el-radio-button>
          <el-radio-button label="1">仲裁参数</el-radio-button>
          <el-radio-button label="2">个性参数</el-radio-button>
        </el-radio-group>
      </div>
    </div>

    <div class="tm-content">
      <div class="m-scrollbar-box">
        <el-scrollbar :native="false">
          <component :is="componentFn()"></component>
        </el-scrollbar>
      </div>
    </div>
  </div>
</template>

<script>
  // 仲裁参数
  import arbitrationParameters from './modules/arbitrationParameters.vue'
  // 案件参数
  import caseParameters from './modules/caseParameters.vue'
  // 个性参数
  import personalityParameter from './modules/personalityParameter.vue'
  export default {
    components : {
      arbitrationParameters,
      caseParameters,
      personalityParameter,
    },
    data() {
      return {
        // '0' 案件参数 '1' 仲裁参数 '2' 个性参数
        type : this.$route.query.type || '0',
      }
    },
    methods : {
      componentFn() {
        return (
          this.type === '0' ? 'caseParameters' :
          this.type === '1' ? 'arbitrationParameters' :
          this.type === '2' ? 'personalityParameter' : 'caseParameters'
        )
      },
      handleChange(val) {
        this.$router.replace({
          path : '/tmParameterDetail',
          query : {
            type : val,
          },
        });
      },
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