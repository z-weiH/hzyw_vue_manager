<template>
  <div class="ser-sms-send-detail-dialog">
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <div class="m-item">
          <div class="m-title">短信ID：</div>
          <div class="m-content">{{ruleForm.smsId}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">客户短信ID：</div>
          <div class="m-content">{{ruleForm.clientSmsId}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">所属客户：</div>
          <div class="m-content">{{ruleForm.clientId}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">短信签名：</div>
          <div class="m-content">{{ruleForm.clientSigner}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">模板ID：</div>
          <div class="m-content">{{ruleForm.templateId}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">短信类型：</div>
          <div class="m-content">{{
            ruleForm.smsType === '10' ? '普通短信' :
            ruleForm.smsType === '11' ? '验证码' :
            ruleForm.smsType === '12' ? '闪信' :
            ruleForm.smsType === '13' ? '弹窗' : ''
          }}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">所属渠道：</div>
          <div class="m-content">{{ruleForm.channelName}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">发送号码：</div>
          <div class="m-content">{{ruleForm.fromPhone}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">接收号码：</div>
          <div class="m-content">{{ruleForm.toPhone}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">发送时间：</div>
          <div class="m-content">{{ruleForm.smsTime}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">发送状态：</div>
          <div class="m-content">{{
            ruleForm.smsStatus === 0 ? '发送中' :
            ruleForm.smsStatus === 1 ? '发送成功' :
            ruleForm.smsStatus === 2 ? '发送失败' : ''
          }}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">短信数量：</div>
          <div class="m-content">{{ruleForm.smsCount}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">接收数量：</div>
          <div class="m-content">{{ruleForm.statusCount}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">发送参数内容：</div>
          <div class="m-content">{{ruleForm.smsContent}}</div> 
        </div>

        <div class="m-item">
          <div class="m-title">实际短信内容：</div>
          <div class="m-content">{{ruleForm.content}}</div> 
        </div>

        <div>
          <p class="m-table-title">短信发送明细列表</p>
          <el-table
            :data="ruleForm.list"
            border
          >
            <el-table-column prop="smsStatus" label="发送状态">
              <template slot-scope="scope">
                {{
                  scope.row.smsStatus === 0 ? '发送中' :
                  scope.row.smsStatus === 1 ? '发送成功' : 
                  scope.row.smsStatus === 2 ? '发送失败' : '' 
                }}
              </template>
            </el-table-column>
            <el-table-column prop="rspCod" label="回调状态"></el-table-column>
            <el-table-column prop="rspDesc" label="回调结果"></el-table-column>
            <el-table-column prop="rspTime" label="回调时间"></el-table-column>
          </el-table>
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
            url : '/smsSend/querySmsSendDetails.htm',
            data : {
              smsId : data.smsId,
            },
          }).then((res) => {
            res.result.list = res.result.list || [];
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

.ser-sms-send-detail-dialog{
  .m-item{
    display: flex;
    margin-bottom: 15px;
    .m-title{
      white-space: nowrap;
      margin-right: 10px;
      width: 100px;
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
