<template>
  <div class="court-info-dialog">
    <el-dialog
      :title="type === 'add' ? '法院新增' : '法院修改'"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">

          <el-form-item label=" " prop="accountPeriodType">
            <el-cascader
              :options="cityOptions"
              clearable
              v-model="ruleForm.selectedOptions"
              @change="handleRegion"
              placeholder="地区"
              change-on-select
              :props="{
                label : 'label',
                children : 'children',
              }"
              class="mr-20"
              style="width:400px;"
            >
            </el-cascader>
          </el-form-item>

          <el-form-item label="法院类型：" prop="accountPeriodType">
            <el-select clearable style="width:400px;" v-model="ruleForm.accountPeriodType" placeholder="请选择">
              <el-option :label="item.label" :value="item.value" v-for="(item,index) in courtOptions" :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="法院名：" prop="demo">
						<el-input style="width:400px;" v-model.trim="ruleForm.demo" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="地址：" prop="demo">
						<el-input style="width:400px;" v-model.trim="ruleForm.demo" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="电话：" prop="demo">
						<el-input style="width:400px;" v-model.trim="ruleForm.demo" placeholder="请输入"></el-input>
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
  import {rawCitiesData} from '@/assets/js/city'
  export default {
    data() {
      return {
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
        type : '',
        // 城市tree
        cityOptions : rawCitiesData,

        // 法院类型 options
        courtOptions : [
          {label : '中级人民法院' , value : '1'},
          {label : '基础人民法院' , value : '2'},
          {label : '高级人民法院' , value : '3'},
          {label : '最高人民法院' , value : '4'},
        ],
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

        if(type === 'edit') {

        }
      },

      // 地区change
      handleRegion(val) {

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
          console.log(this.ruleForm);
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

<style scoped lang="scss">

.court-info-dialog{

}

</style>
