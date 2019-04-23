<template>
  <div class="acontract-deduction-add-dialog">
    <el-dialog
      title="添加扣款记录"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">

					<el-form-item label="签约客户:" prop="clientCode">
            <el-select ref="client" @change="handleClientChange" filterable clearable v-model="ruleForm.clientCode" style="width:420px;">
              <el-option :label="item.merchantName" :value="item.code" v-for="(item,index) in clientOptions" :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="类型:" prop="deductionType">
            <el-radio-group v-model="ruleForm.deductionType">
              <el-radio :label="0" v-if="ruleForm.settleType === 1">扣除仲券</el-radio>
              <el-radio :label="2" v-if="ruleForm.settleType === 2">扣除服务费</el-radio>
              <el-radio :label="1">扣除仲裁费</el-radio>
            </el-radio-group>
          </el-form-item>

          <div>
            <el-row v-if="ruleForm.settleType === 1">
              <el-col :span="12">
                <span class="w-100">仲券余额：</span>
                <span>{{ruleForm.ticketAvail}}张</span>
              </el-col>
              <el-col :span="12">
                <span>赠券余额：</span>
                <span>{{ruleForm.giftAvail}}张</span>
              </el-col>
            </el-row>
            <el-row v-if="ruleForm.settleType === 2">
              <el-col :span="12">
                <span class="w-100">充值服务费余额：</span>
                <span>{{ruleForm.ticketAvail}}元</span>
              </el-col>
              <el-col :span="12">
                <span>赠送服务费余额：</span>
                <span>{{ruleForm.giftAvail}}元</span>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <span class="w-100">仲裁费余额：</span>
                <span>{{ruleForm.deductionAmt}}元</span>
              </el-col>
            </el-row>
          </div>

          <el-form-item label="扣除数目:" prop="deductionTicket" class="mt-20">
            <el-input v-model="ruleForm.deductionTicket" type="number" />
          </el-form-item>

          <el-form-item label="扣除说明:" prop="deductionDesc" class="mt-20">
            <el-input :autosize="{ minRows: 5, maxRows: 5}" type="textarea" v-model="ruleForm.deductionDesc" />
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
      let validator = (rule, value, callback) => {
        if(this.ruleForm.deductionType !== 1) {
          if(!/^[1-9]\d*$/.test(value) && this.ruleForm.settleType === 1){
            callback("请输入正整数")
          }
          if(value > this.ruleForm.ticketAvail + this.ruleForm.giftAvail ) {
            callback('不能超过余额数目');
          }else{
            callback();
          }
        }else{
          if(value > this.ruleForm.deductionAmt) {
            callback('不能超过余额数目');
          }else{
            callback();
          }
        }
      }
      return {
        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,
        clientOptions : [],

        ruleForm : {
          // 客户
          clientCode : '',
          // 类型
          deductionType : 0,
          // 扣除数目
          deductionTicket : '',
          // 扣除说明
          deductionDesc : '',
          // 仲券余额
          ticketAvail : '',
          // 赠券余额
          giftAvail : '',
          // 仲裁费余额
          deductionAmt : '',

          settleType: 1
        },
        rules : {
          deductionType : [
            {required : true , message : '请选择类型' , trigger : 'change'},
          ],
          deductionTicket : [
            // {required : true , pattern : /^[1-9]\d*$/, message : '请输入正整数' , trigger : 'blur'},
            {required : true , message : '请输入' , trigger : 'blur'},
            { validator: validator, trigger: 'blur' }
          ],
          deductionDesc : [
            {required : true , message : '请输入扣除说明' , trigger : 'blur'},
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
          this.initClientOptions();
        });
      },
      // 获取客户options
      initClientOptions() {
        this.$http({
          method : 'post',
          url : '/case/queryCustomerList.htm',
        }).then((res) => {
          this.clientOptions = res.result;
        });
      },
      // 客户 change
      handleClientChange(val) {
        val && this.$http({
          url : '/dedution/queryAccountInfoByClientCode.htm',
          method : 'post',
          data : {
            clientCode : val,
          },
        }).then(res => {
          this.ruleForm.settleType = res.result.settleType;
          if(this.ruleForm.settleType === 2){
            this.ruleForm.ticketAvail = res.result.serviceFee;
            this.ruleForm.giftAvail = res.result.giftServiceFee;
          }else{
            this.ruleForm.ticketAvail = res.result.ticketAvail;
            this.ruleForm.giftAvail = res.result.giftAvail;
          }
          this.ruleForm.deductionAmt = res.result.amtAvail;

        });
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;

        setTimeout(() => {
          // 取消按钮禁用
          this.submitDisabled = false;

          this.ruleForm.ticketAvail = '';
          this.ruleForm.giftAvail = '';
          this.ruleForm.deductionAmt = '';

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
            let obj = {
              clientCode : this.ruleForm.clientCode,
              clientName : this.$refs.client.$el.querySelector('input').value,
              deductionDesc : this.ruleForm.deductionDesc,
              deductionType : this.ruleForm.deductionType,
            };
            if(this.ruleForm.deductionType !== 1) {
              obj.deductionTicket = this.ruleForm.deductionTicket;
            }else{
              obj.deductionAmt = this.ruleForm.deductionTicket;
            }
						this.$http({
              method : 'post',
              url : '/dedution/addContractInfo.htm',
              data : obj,
            }).then((res) => {
              this.$message.success('操作成功');
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

.acontract-deduction-add-dialog{
  .w-100{
    width: 120px;
    display: inline-block;
    text-align: right;
  }
}

</style>
