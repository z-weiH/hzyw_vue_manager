<template>
  <div class="customer-contracted-customers-dialog">
    <el-dialog
      :title="type === 'add' ? '新增' : '修改'"
      :visible.sync="dialogVisible"
      width="610px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px">
          
					<el-form-item label="销售：" prop="salesman">
						<el-input style="width:400px;" v-model.trim="ruleForm.salesman" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="运营：" prop="operator">
						<el-input style="width:400px;" v-model.trim="ruleForm.operator" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="客户名称：" prop="clientName">
						<el-input style="width:400px;" v-model.trim="ruleForm.clientName" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="产品名称：" prop="productName">
						<el-input style="width:400px;" v-model.trim="ruleForm.productName" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="业务模式：" prop="bizMode">
						<el-input style="width:400px;" v-model.trim="ruleForm.bizMode" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="资金来源：" prop="sourceFund">
						<el-input style="width:400px;" v-model.trim="ruleForm.sourceFund" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="资金方：" prop="capitalSide">
						<el-input style="width:400px;" v-model.trim="ruleForm.capitalSide" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="获得债权依据：" prop="bondBasis">
						<el-input style="width:400px;" v-model.trim="ruleForm.bondBasis" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="合同签订时间：" prop="contractTime">
						<el-date-picker 
							type="date"
							v-model="ruleForm.contractTime"
							value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width:400px;" 
						>
						</el-date-picker>
					</el-form-item>

          <el-form-item label="是否完成付款：" prop="isPay">
            <el-select clearable v-model="ruleForm.isPay" placeholder="请选择打款状态" style="width:400px;" >
              <el-option label="已付款" :value="1"></el-option>
              <el-option label="未付款" :value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="第一次打款时间：" prop="firstPayTime">
						<el-date-picker 
							type="date"
							v-model="ruleForm.firstPayTime"
							value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width:400px;" 
						>
						</el-date-picker>
					</el-form-item>

          <el-form-item label="协议是否上线：" prop="agreementStatus">
            <el-select clearable v-model="ruleForm.agreementStatus" placeholder="请选择打款状态" style="width:400px;" >
              <el-option label="已上线" :value="1"></el-option>
              <el-option label="未上线" :value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="协议上线时间：" prop="arbitrationTime">
						<el-date-picker 
							type="date"
							v-model="ruleForm.arbitrationTime"
							value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width:400px;" 
						>
						</el-date-picker>
					</el-form-item>

          <el-form-item label="协议上线区域：" prop="agreementRegion">
						<el-input style="width:400px;" v-model.trim="ruleForm.agreementRegion" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="系统是否完成对接：" prop="finishAbutment">
            <el-select clearable v-model="ruleForm.finishAbutment" placeholder="请选择打款状态" style="width:400px;" >
              <el-option label="已上线" :value="1"></el-option>
              <el-option label="未上线" :value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="协议上线时间：" prop="finishTime">
						<el-date-picker 
							type="date"
							v-model="ruleForm.finishTime"
							value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width:400px;" 
						>
						</el-date-picker>
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
        type : '',

        ruleForm : {
          // 销售
          salesman : '',
          // 运营
          operator : '',
          // 客户名称
          clientName : '',
          // 产品名称
          productName : '',
          // 业务模式
          bizMode : '',
          // 资金来源
          sourceFund : '',
          // 资金方
          capitalSide : '',
          // 获得债权依据
          bondBasis : '',
          // 合同签订时间
          contractTime : '',
          // 是否完成付款 1-付款,0-未付款
          isPay : '',
          // 第一次打款时间
          firstPayTime : '',
          // 协议是否上线 1-已上线,0-未上线
          agreementStatus : '',
          // 加上仲裁条款的协议上线时间
          arbitrationTime : '',
          // 协议上线区域（是全国还是部分省份）
          agreementRegion : '',
          // 系统是否完成对接 1-已完成,0-未完成
          finishAbutment : '',
          // 系统对接完成时间
          finishTime : '',
        },
        rules : {
          salesman : [
            {required : true , message : '请输入销售' , trigger : 'blur'},
          ],
          operator : [
            {required : true , message : '请输入运营' , trigger : 'blur'},
          ],
          clientName : [
            {required : true , message : '请输入客户名称' , trigger : 'blur'},
          ],
        },

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
          this.$refs.ruleForm.clearValidate();
				},500);
				
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
						// 提交数据
            this.submitDisabled = true;
            let form = {...this.ruleForm};
            if(this.type === 'edit') {
              form.aaaa = this.aaaa;
            }
						this.$http({
              method : 'post',
              url : '/preCaseLib/distributeCaseByDistributeCaseQuery.htm',
              data : form,
            }).then((res) => {
              this.$message.success('操作成功');
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

.customer-contracted-customers-dialog{

}

</style>
