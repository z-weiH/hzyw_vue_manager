<template>
  <div class="tm-parameter-detail-product-dialog">
    <el-dialog
      title="添加产品"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
					<el-form-item label="产品：" prop="productId">
            <el-select clearable style="width:400px;" v-model="ruleForm.productId" placeholder="请选择产品">
              <el-option :label="item.productName" :value="item.productId" v-for="(item,index) in productOptions" :key="index"></el-option>
            </el-select>
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
          // 产品 id
          productId : '',
        },
        rules : {
          productId : [
            {required : true , message : '请选择产品' , trigger : 'change'},
          ],
        },

        // 产品 options
        productOptions : [
          {productName : '产品1' , productId : '产品1'}
        ],
      }
    },
    mounted() {
      
    },
    methods : {
      show(type,data) {
        // 获取产品 options
        this.$http({
          method : 'post',
          url : '/param/queryProductList.htm',
          data : {
            hasPersonalParam : 0,
          },
        }).then((res) => {
          this.productOptions = res.result;
        });

				this.dialogVisible = true;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        this.$nextTick(() => {
          // 处理逻辑 写在nextTick中 ， 防止dialog没有加载数据问题
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
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate();
          });
				},500);
				
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
						// 提交数据
						this.submitDisabled = true;
						this.$http({
              method : 'post',
              url : '/param/updateProductByHasPersonalParam.htm',
              data : {
                productId : this.ruleForm.productId,
              },
            }).then((res) => {
              this.$message.success('新增成功');
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

.tm-parameter-detail-product-dialog{

}

</style>
