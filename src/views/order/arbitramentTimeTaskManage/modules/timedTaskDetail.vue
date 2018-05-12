<template>
  <div class="timed-task-detail">
    <el-dialog
      title="定时任务详情"
      :visible.sync="dialogVisible"
      width="500px"
      @close="handleClose"
    >
      <div class="m-content">
        <div class="m-form-item">
          <div class="m-label">商户名称：</div>
          <div class="m-value">{{ruleForm.merchantName}}</div>
        </div>

        <div class="m-form-item">
          <div class="m-label">业务编码：</div>
          <div class="m-value">{{ruleForm.busiCode}}</div>
        </div>

        <div class="m-form-item">
          <div class="m-label">请求时间：</div>
          <div class="m-value">{{ruleForm.createTime}}</div>
        </div>

        <div class="m-form-item">
          <div class="m-label">处理状态：</div>
          <div class="m-value">{{ruleForm.isProcessedCN}}</div>
        </div>

        <div class="m-form-item">
          <div class="m-label">参数：</div>
          <div class="m-value">{{ruleForm.params}}</div>
        </div>

        <div class="m-form-item">
          <div class="m-label">处理结果：</div>
          <div class="m-value">{{ruleForm.processResult}}</div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,

        ruleForm : {
          // 商户名称
          merchantName : '卡户',
          // 业务编码
          busiCode : 'SUBMIT',
          // 请求时间
          createTime : '2018-05-12 14:32:14',
          // 处理状态
          isProcessedCN : '处理失败',
          // 参数
          params : '{"caseOrderId":"1526106734795","loanBillNo":"3","merchantCode":"15253377300"}',
          // 处理结果
          processResult : '客户产品信息不存在',
        },
      }
    },
    methods : {
      show(ruleForm) {
        this.dialogVisible = true;
        this.ruleForm = ruleForm || this.ruleForm;
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
      },
    },
  }
</script>

<style lang="scss" scoped>

.timed-task-detail{
  .m-form-item{
    margin-bottom: 10px;
    overflow: hidden;
    .m-label{
      width: 100px;
      float: left;
      text-align: right;
    }
    .m-value{
      margin-left: 120px;
      word-wrap: break-word; 
      word-break: normal; 
    }
  }
}

</style>