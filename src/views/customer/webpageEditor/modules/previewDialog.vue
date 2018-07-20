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
          
					<el-form-item label="数据模板" prop="accountPeriodType">
            <el-select clearable style="width:300px;" v-model="ruleForm.accountPeriodType" placeholder="请选择数据模板">
              <el-option v-for="(item,index) in dataOptions" :label="item.name" :value="item.value" :key="index"></el-option>
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
          {name : '张三' , value : '张三'}
        ],
        loading : '',

        ruleForm : {

        },
        rules : {
          accountPeriodType : [
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
        // 获取预览数据


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
              url : '/preCaseLib/distributeCaseByDistributeCaseQuery.htm',
              data : {},
            }).then((res) => {
              this.loading.close();
              win.location.href = 'http://filetest.arbexpress.cn/case/evidence/2018-07-19/7253E188E25273F91798210247806E30.pdf';
            }).catch(() => {
              this.loading.close();
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
