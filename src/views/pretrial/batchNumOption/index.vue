<template>
  <div class="batch-num-option">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link to="advanceHearSetsList">预审设置</router-link>
      <a>子批次数量设置</a>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">子批次数量设置</span>
    </div>

    <div class="item-table">
      <div class="m-content">
        <span class="m-text">当前子批次数量</span>
        <span class="m-num">{{subBatchCount}}件</span>
        <el-button class="m-btn" @click="handleEdit" type="text">修改</el-button>
      </div>
    </div>

    <mdialog @successCBK="successCBK" ref="dialog"></mdialog>
  </div>
</template>

<script>
  import mdialog from './moudules/dialog.vue'
  export default {
    components : {mdialog},
    data() {
      return {
        // 数量 
        subBatchCount : '',
        // 主键 id
        batchId : '',
      }
    },
    mounted() {
      this.initNum();
    },
    methods : {
      initNum() {
        this.$http({
          method : 'post',
          url : '/reason/preBatch.htm',
        }).then((res) => {
          this.subBatchCount = res.result.subBatchCount;
          this.batchId = res.result.batchId;
        });
      },
      // 点击修改
      handleEdit() {
        this.$refs.dialog.show({
          subBatchCount : this.subBatchCount,
          batchId : this.batchId,
        });
      },
      // 修改成功 回调
      successCBK() {
        this.initNum();
      },
    },
  }
</script>

<style lang="scss" scoped>

.batch-num-option{
  .m-content{
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 25px;
    .m-text{
      margin-right: 30px;
    }
    .m-num{
      margin-right: 25px;
    }
  }
}

</style>