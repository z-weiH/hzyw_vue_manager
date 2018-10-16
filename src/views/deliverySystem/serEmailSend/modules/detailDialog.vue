<template>
  <div class="ser-email-send-detail-dialog">
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="680px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <div class="m-item">
          <div class="m-title">邮件ID：</div>
          <div class="m-content">{{ruleForm.mailId}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">所属客户名称：</div>
          <div class="m-content">{{ruleForm.clientName}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">邮件调用方的定义该邮件的唯一ID：</div>
          <div class="m-content">{{ruleForm.clientMailId}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">发送邮件邮箱地址：</div>
          <div class="m-content">{{ruleForm.senderAddress}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">发送邮件邮箱SMTP地址：</div>
          <div class="m-content">{{ruleForm.fromSmtp}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">发送邮件邮箱SMTP端口号：</div>
          <div class="m-content">{{ruleForm.port}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">发送邮件人名称：</div>
          <div class="m-content">{{ruleForm.senderName}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">接收邮件地址：</div>
          <div class="m-content">{{ruleForm.toEmail}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">接收邮件人名称：</div>
          <div class="m-content">{{ruleForm.mailReceiver}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">邮件标题：</div>
          <div class="m-content">{{ruleForm.mailTitle}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">发送状态：</div>
          <div class="m-content">{{
            ruleForm.mailStatus === 0 ? '待发送' :
            ruleForm.mailStatus === 1 ? '发送成功' :
            ruleForm.mailStatus === 2 ? '发送失败' : ''
          }}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">邮件内容：</div>
          <div class="m-content">{{ruleForm.mailContent}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">附件内容：</div>
          <div class="m-content">{{ruleForm.mailAttachment}}</div> 
        </div>

      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,

        ruleForm : {
          mailId : '',
        },
        rules : {

        },
      }
    },
    mounted() {

    },
    methods : {
      show(type,data) {
				this.dialogVisible = true;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        this.$nextTick(() => {
          // 处理逻辑 写在nextTick中 ， 防止dialog没有加载数据问题
          this.$http({
            method : 'post',
            url : '/emailSend/queryEmailInfoDetails.htm',
            data : {
              mailId : data.mailId,
            },
          }).then((res) => {
            this.ruleForm = res.result;
          });
        });
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        
        setTimeout(() => {
          // 取消按钮禁用
          this.submitDisabled = false;
				},500);
				
      },
    },
  }
</script>

<style scoped lang="scss">

.ser-email-send-detail-dialog{
  .m-item{
    display: flex;
    margin-bottom: 15px;
    .m-title{
      white-space: nowrap;
      margin-right: 10px;
      width: 220px;
      text-align: right;
    }
    .m-content{
      word-break: break-all;
      word-wrap: break-word;
      white-space: pre-wrap;
    }
  }
  .m-table-title{
    text-align: center;
    font-weight: bold;
    margin-bottom: 15px;
  }
}

</style>
