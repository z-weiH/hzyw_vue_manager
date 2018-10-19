<template>
  <div class="ser-channel-manage-dialog">
    <el-dialog
      :title="type === 'add' ? '新增渠道' : '修改渠道'"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">

          <el-form-item label="渠道编码：" prop="channelId">
						<el-input :disabled="true" style="width:400px;" v-model.trim="ruleForm.channelId" placeholder="请输入"></el-input>
					</el-form-item>
          
					<el-form-item label="渠道名称：" prop="channelName">
						<el-input style="width:400px;" v-model.trim="ruleForm.channelName" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="渠道号码：" prop="channelPhone">
						<el-input style="width:400px;" v-model.trim="ruleForm.channelPhone" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="渠道信息：" prop="channelInfo">
						<el-input type="textarea" style="width:400px;" v-model.trim="ruleForm.channelInfo" placeholder="请输入"></el-input>
					</el-form-item>

        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button :disabled="submitDisabled" type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
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
          // 渠道名称
          channelName : '',
          // 渠道号码
          channelPhone : '',
          // 渠道信息
          channelInfo : '',
          // 渠道编码
          channelId : '',
        },
        rules : {
          channelName : [
            {required : true , message : '请输入渠道名称' , trigger : 'blur'},
          ],
          channelPhone : [
            {required : true , message : '请输入渠道号码' , trigger : 'blur'},
          ],
        },

        type : '',

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
          this.type = type;
          if(type === 'edit') {
            this.channelId = data.channelId;
            // 数据回显
            this.$http({
              method : 'post',
              url : '/channel/queryChannelInfoDetails.htm',
              data : {
                channelId : data.channelId,
              },
            }).then((res) => {
              this.ruleForm = Object.assign(this.ruleForm,res.result[0]);
            });
          }
        });
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        
        setTimeout(() => {
          // 取消按钮禁用
          this.submitDisabled = false;
          // 重置表单数据
          this.$refs.ruleForm.resetFields();
          this.$refs.ruleForm.clearValidate();
				},500);
				
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
						// 提交数据
            this.submitDisabled = true;
            
            let form = {
              ...this.ruleForm,
            };
            if(this.type === 'edit') {
              form.channelId = this.channelId;
            }
						this.$http({
              method : 'post',
              url : '/channel/saveChannelInfoByChannelId.htm',
              data : form,
            }).then((res) => {
              this.$message.success('操作成功');
              this.handleClose();
              this.$emit('successCBK');
            }).catch(() => {
              this.submitDisabled = false;
            });
          }
        });
      },
    },
  }
</script>

<style scoped lang="scss">

.ser-channel-manage-dialog{

}

</style>
