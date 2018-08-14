<template>
  <div class="rule-base">
    <!-- <div class="m-bar">
      <m-progress :width="progress" :height="20">执行中</m-progress>
    </div> -->
    <div class="title-box">
      <div>
        <span class="m-title">规则库</span>
        <div class="fr">
          <el-button type="primary" class="mt-20">执行规则</el-button>
        </div>
      </div>
    </div>
    <div class="content-box">
      <div class="fl m-left">
        <el-tree 
          :data="treeData" 
          :props="{children : 'children' , label : 'label'}"
          :highlight-current="true"
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        >
        </el-tree>
      </div>
      <div class="fl m-right">

      </div>
    </div>
  </div>
</template>

<script>
  import progress from './modules/progress.vue'
  export default {
    components : {
      'm-progress' : progress,
    },
    data() {
      return {
        progress : 80,
        treeData : [
          {
            label : '公共规则',
            children : [
              {
                label : 'P2P现金贷业务',
                children : [
                  {
                    label : '奇速贷',
                    children : [
                      {
                        label : '奇速贷-1001',
                        id : 1,
                      },
                      {
                        label : '奇速贷-1002',
                      },
                      {
                        label : '奇速贷-1003',
                      },
                    ],
                  }
                ],
              }
            ],
          }
        ],
      }
    },
    mounted() {

    },
    methods : {
      handleNodeClick(row) {
        console.log(row);
      },
    },
  }
</script>

<style lang="scss" scoped>

.rule-base{
  height: 100%;
  overflow: auto;
  background-color: #F1F2F7;
  .title-box{
    height: 75px;
    background-color: #fff;
    >div{
      width: 1200px;
      margin: 0 auto;
    }
    .m-title{
      font-size: 30px;
      color: #0f357f;
      display: inline-block;
      margin-top: 21px;
    }
  }
  .content-box{
    width: 1200px;
    margin: 0 auto;
    margin-top: 10px;
    .m-left{
      width: 300px;
    }
    .m-right{
      width: 890px;
      margin-left: 10px;
      background-color: #fff;

      height: 300px;
    }
  }
}

</style>