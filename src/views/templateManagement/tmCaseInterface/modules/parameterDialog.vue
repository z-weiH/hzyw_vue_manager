<template>
  <div class="tm-caseInterface-parameter-dialog">
    <el-dialog
      title="分配案件"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          
					<el-form-item label="参数" prop="demo">
						<el-input style="width:400px;" v-model.trim="ruleForm.demo" placeholder="请输入"></el-input>\
            <el-tabs class="absolute_tabs" v-model="activeName2" type="card" @tab-click="handleClick">
              <el-tab-pane label="案件参数" name="first">
                <div class="content">
                  <el-scrollbar style="max-height: 250px">
                    用户管理
                    <span>123123</span>
                  </el-scrollbar>


                </div>
              </el-tab-pane>
              <el-tab-pane label="仲裁参数" name="second">

                <div class="content">
                  <el-scrollbar style="max-height: 250px">
                    配置管理

                  </el-scrollbar>
                </div>
              </el-tab-pane>
              <el-tab-pane label="个性参数" name="third">

                <div class="content">
                  <el-scrollbar style="max-height: 250px">
                    角色管理

                  </el-scrollbar>

                </div>
              </el-tab-pane>
            </el-tabs>


					</el-form-item>
          <el-form-item label="参数中文名" prop="demo">
						<el-input style="width:400px;" v-model.trim="ruleForm.demo" placeholder="请输入"></el-input>
					</el-form-item>
          <el-form-item label="类型" prop="demo">
						<el-input style="width:400px;" v-model.trim="ruleForm.demo" placeholder="请输入"></el-input>
					</el-form-item>
          <el-form-item label="所属模块" prop="demo">
						<el-input style="width:400px;" v-model.trim="ruleForm.demo" placeholder="请输入"></el-input>
					</el-form-item>
          <el-form-item label="数据来源" prop="demo">
						<el-input style="width:400px;" v-model.trim="ruleForm.demo" placeholder="请输入"></el-input>
					</el-form-item>
          <el-form-item label="说明" prop="demo">
            <el-input type="textarea" style="width:400px;" v-model.trim="ruleForm.demo" placeholder="请输入"></el-input>
          </el-form-item>




					<!--<el-form-item label="账龄" prop="accountPeriodType">-->
            <!--<el-select clearable style="width:200px;" v-model="ruleForm.accountPeriodType" placeholder="请选择账龄">-->
              <!--<el-option :label="item.label" :value="item.value" v-for="(item,index) in productOptions" :key="index"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->



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
        activeName2: 'first',



        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,

        ruleForm : {

        },
        rules : {
          demo : [
            {required : true , message : '请选择互金企业' , trigger : 'change'},
          ],
        },

        // 产品 options
        productOptions : [
          {label : '产品1' , value : '产品1'}
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
              url : '/preCaseLib/distributeCaseByDistributeCaseQuery.htm',
              data : {
                
              },
            }).then((res) => {
              this.$message.success('分配成功');
            }).catch(() => {
              this.submitDisabled = false;
            });
          }
        });
      },
    },
  }
</script>

<style  lang="scss">

.tm-caseInterface-parameter-dialog{

  .absolute_tabs{
    position: absolute;
    z-index: 1000;
    background: #fff;

    .el-tabs__header{
      margin: 0;
    }

    .el-tabs__item{
      width: 133px;
      text-align: center;
    }
    .content{
      width: 398px;
      height: 250px;
      border: 1px solid #e4e7ed;
      border-top: none;
    }

  }
}

</style>
