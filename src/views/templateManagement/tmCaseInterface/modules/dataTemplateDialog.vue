<template>
  <div class="tm-caseInterface-data-template-dialog">
    <el-dialog
      title="请选择一份数据模板"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
					<el-form-item label="数据模板：" prop="dataId">
            <el-select clearable style="width:400px;" v-model="ruleForm.dataId" placeholder="请选择数据模板">
              <el-option :label="item.dataName" :value="item.dataId" v-for="(item,index) in dataOptions" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <documentPreviewDialog ref="documentPreviewDialog"></documentPreviewDialog>
  </div>
</template>

<script>
  import documentPreviewDialog from './documentPreviewDialog.vue'
  export default {
    components : {
      documentPreviewDialog,
    },
    data() {
      return {
        dialogVisible : false,

        ruleForm : {
          // 数据模板 id
          dataId : '',
        },
        rules : {
          dataId : [
            {required : true , message : '请选择数据模板' , trigger : 'change'},
          ],
        },

        // 产品 options
        dataOptions : [
          {dataName : '产品1' , dataId : '产品1'}
        ],
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
            url : '/templateData/queryTemplateDataByDataIdList.htm',
          }).then((res) => {
            this.dataOptions = res.result;
          });
        });
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        
        setTimeout(() => {
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
            this.$refs.documentPreviewDialog.show({
              dataId : this.ruleForm.dataId,
            });
          }
        });
      },
    },
  }
</script>

<style scoped lang="scss">

.tm-caseInterface-data-template-dialog{

}

</style>
