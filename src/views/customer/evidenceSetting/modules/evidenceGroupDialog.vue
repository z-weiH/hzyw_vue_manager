<template>
  <div class="evidence-setting-evidence-group-dialog">
    <el-dialog
      :title="type === 'add' ? '新增证据组' : '修改证据组'"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          
					<el-form-item label="证据对象" prop="eviObject">
            <autoTextarea style="width:400px;" v-model.trim="ruleForm.eviObject" :enter="false"></autoTextarea>
          </el-form-item>

        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button :disabled="submitDisabled" type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import autoTextarea from '@/components/autoTextarea.vue'
  export default {
    components : {
      autoTextarea,
    },
    data() {
      return {
        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,

        ruleForm : {
          // 证据对象
          eviObject : '',
        },
        rules : {
          eviObject : [
            {required : true , message : '请选择证据对象' , trigger : 'blur'},
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
        this.type = type;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        // 修改逻辑
        if(type === 'edit') {
          this.ruleForm.eviObject = data.eviObject;
        }
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        // 取消按钮禁用
        setTimeout(() => {
          this.submitDisabled = false;
				},500);
				// 重置表单数据
        setTimeout(() => {
          this.$refs.ruleForm.resetFields();
        },200);
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
						// 提交数据
						this.submitDisabled = true;
            
            this.$emit('successCBK',this.type,this.ruleForm.eviObject);
            this.handleClose();
          }
        });
      },
    },
  }
</script>