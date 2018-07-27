<template>
  <div class="webpage-editor-preview-dialog">
    <el-dialog
      title="预览"
      :visible.sync="dialogVisible"
      width="500px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          
					<el-form-item label="数据模板" prop="dataId">
            <el-select clearable style="width:300px;" v-model="ruleForm.dataId" placeholder="请选择数据模板">
              <el-option v-for="(item,index) in dataOptions" :label="item.dataName" :value="item.dataId" :key="index"></el-option>
            </el-select>
          </el-form-item>

        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">预 览</el-button>
        <el-button @click="handleDataManagement">数据管理</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,
        // 富文本内容
        textarea : '',
        // 预览数据 options
        dataOptions : [
          {dataName : '张三' , dataId : '张三'}
        ],
        loading : '',

        ruleForm : {
          // 模板数据 
          dataId : '',
        },
        rules : {
          dataId : [
            {required : true , message : '请选择数据模板' , trigger : 'change'},
          ],
        },
      }
    },
    mounted() {
      
    },
    methods : {
      show(data) {
        this.dialogVisible = true;
        this.loading = '';
        this.textarea = data;
        // 获取 模板数据options
        this.$http({
          url : '/templateData/queryTemplateDataByDataIdList.htm',
          method : 'post',
        }).then((res) => {
          this.dataOptions = res.result;
        });


				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });
      },
      // 点击 数据管理
      handleDataManagement() {
        window.open(`//${window.location.host}/#/main/dataManagement`,'_blank');

        // 关闭弹出框
        this.handleClose();
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
				// 重置表单数据
        this.$refs.ruleForm.resetFields();

        this.loading && this.loading.close();
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            this.loading = this.$loading({
              text : '模板生成中'
            });
            let win = window.open('');
						// 提交数据
						this.$http({
              method : 'post',
              url : '/templateSetting/reviewTemplateContent.htm',
              data : {
                content : this.textarea,
                dataId : this.ruleForm.dataId,
                prodTempId : this.$route.query.prodTempId,
                type : (
                  this.$route.query.type === 'applyContent' ? 1 :
                  this.$route.query.type === 'judgeContent' ? 2 :
                  this.$route.query.type === 'enforceContent' ? 3 : ''
                )
              },
            }).then((res) => {
              this.loading.close();
              win.location.href = res.result;
            }).catch(() => {
              this.$message.warning('生成失败');
              this.loading.close();
              win.close();
            });
          }
        });
      },
    },
  }
</script>

<style scoped lang="scss">

.webpage-editor-preview-dialog{

}

</style>
