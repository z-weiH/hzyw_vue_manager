<template>
  <div class="tplSetting-list-template-dialog">
    <el-dialog
      title="添加新模板"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          
					<el-form-item label="产品名称" prop="productId">
            <el-select clearable style="width:260px;" v-model="ruleForm.productId" placeholder="请选择产品">
              <el-option :label="item.productName + ' ' + item.prodCode" :value="item.productId" v-for="(item,index) in productOptions" :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="模板编号" prop="templateCode">
						<el-input style="width:260px;" v-model.trim="ruleForm.templateCode" placeholder="请输入"></el-input>
					</el-form-item>

					<el-form-item label="备注" prop="remark">
						<el-input style="width:360px;" type="textarea" v-model.trim="ruleForm.remark" placeholder="请输入"></el-input>
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
  export default {
    data() {
      // 校验模板编号
      let verifyCode = (rule, value, callback) => {
        callback();
      }
      return {
        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,

        ruleForm : {
          // 产品名称
          productId : '',
          // 模板编号
          templateCode : '',
          // 备注
          remark : '',
        },
        rules : {
          productId : [
            {required : true , message : '请选择产品名称' , trigger : 'change'},
          ],
          templateCode : [
            {required : true , message : '输入模板编号' , trigger : 'blur'},
            {pattern : /^\d{2}$/ , message : '请输入两位数字' , trigger : 'blur'},
            { validator: verifyCode, trigger: 'blur' }
          ],
        },

        // 产品 options
        productOptions : [
          {productName : '产品' , prodCode : '10' , productId : '产品1'}
        ],
      }
    },
    mounted() {
      // 获取 产品 options
      this.$http({
        url : '/templateList/queryTemplateList.htm',
        method : 'post',
      }).then((res) => {
        this.productOptions = res.result;
      });
    },
    methods : {
      show(data,type) {
				this.dialogVisible = true;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        // 取消按钮禁用
        setTimeout(() => {
          this.submitDisabled = false;
				},500);
				// 重置表单数据
        this.$refs.ruleForm.resetFields();
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
						// 提交数据
						this.submitDisabled = true;
						this.$http({
              method : 'post',
              url : '/templateSetting/saveProductTemplate.htm',
              data : {
                productId : this.ruleForm.productId,
                remark : this.ruleForm.remark,
                templateCode : this.ruleForm.templateCode,
                templateId : this.$route.query.templateId,
              },
            }).then((res) => {
              this.$message.success('新增成功');
              this.$emit('successCBK');
              this.handleClose();
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

.tplSetting-list-template-dialog{

}

</style>
