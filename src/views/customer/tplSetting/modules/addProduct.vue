<template>
  <div class="tpl-setting-add-product">
    <el-dialog
      title="添加新产品"
      :visible.sync="dialogVisible"
      width="500px"
      @close="handleClose"
    >
      <div class="m-content">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
          <table
            class="m-primordial-table 
              el-table el-table--fit el-table--border 
              el-table--enable-row-hover"
          >
            <tbody>
              <tr>
                <td>产品名称：</td>
                <td colspan="2">
                  <el-form-item label=" " prop="detailId">
                    <el-select v-model="ruleForm.detailId" placeholder="请选择产品名称">
                      <el-option label="请选择" value=""></el-option>
                      <template v-for="(item,index) in productList">
                        <el-option 
                          :key="item.prodId + '' + index" 
                          :label="item.prodName" 
                          :value="item.prodId"
                        >
                        </el-option>
                      </template>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td>模板名称：</td>
                <td colspan="2">
                  <el-form-item label=" " prop="templateName">
                    <el-input v-model.trim="ruleForm.templateName" placeholder="请输入模板名称"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td>模板编码：</td>
                <td colspan="2">
                  <el-form-item label=" " prop="templateCode">
                    <el-input v-model.trim="ruleForm.templateCode" placeholder="请输入模板编码"></el-input>
                  </el-form-item>
                </td>
              </tr>
            </tbody>
          </table>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button @click="handleClose">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,
        ruleForm : {
          // 产品名称
          detailId : '',
          // 模板名称
          templateName : '',
          // 模板编码
          templateCode : '',
        },
        rules : {
          detailId : [
            {required : true , trigger : 'change' , message : '请选择产品名称'}
          ],
          templateName : [
            {required : true , trigger : 'blur' , message : '请输入模板名称'}
          ],
          templateCode : [
            {required : true , trigger : 'blur' , message : '请输入模板编码'}
          ],
        },

        // 产品 list
        productList : [
          {prodName : '产品1' , prodId : '产品1'},
          {prodName : '产品2' , prodId : '产品2'},
        ],
      }
    },
    methods : {
      show(data) {
        this.dialogVisible = true;
        this.data = data;
        // 查询 产品list
        this.$http({
          method : 'post',
          url : '/tplsetting/queryProductInfoByMerchantCode.htm',
          data : {
            merchantCode : data.merchantCode,
          },
        }).then((res) => {
          this.productList = res.result;
        });
      },
      // 点击 关闭
      handleClose() {
        this.dialogVisible = false;
        this.$refs.ruleForm.resetFields();
      },
      // 点击提交
      handleSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            this.$http({
              method : 'get',
              url : '/tplsetting/saveTemplateDetail.htm',
              params : {
                busiCode : this.ruleForm.detailId,
                templateName : this.ruleForm.templateName,
                templateCode : this.ruleForm.templateCode,
                templateId : this.data.templateId,
              },
            }).then((res) => {
              this.$message.success('添加新产品 成功');
              this.$emit('successCBK');
              this.handleClose();
            });
          }
        });
      },
    },
  }
</script>

<style lang="scss">

.tpl-setting-add-product{
  .el-form-item{
    padding: 10px 0!important;
  }
  .m-primordial-table td .el-input{
    padding: 0 10px!important;
  }
  .el-select{
    width: 100%;
  }
  .el-form-item__error{
    padding-left: 10px;
  }
}

</style>