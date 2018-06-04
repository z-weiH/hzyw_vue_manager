<template>
  <div class="processing-fee-settle-review-dialog">
    <el-dialog
      title="受理费结算复核"
      :visible.sync="dialogVisible"
      width="880px"
      @close="handleClose"
    >
      <div class="m-content">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">

          <template v-for="(item,index) in ruleForm.list">

            <table
              :key="index"
              class="m-primordial-table 
                el-table el-table--fit el-table--border 
                el-table--enable-row-hover"
            >
              <tbody>
                <tr>
                  <td colspan="4">受理费结算打款明细</td>
                </tr>

                <tr>
                  <td colspan="1">结算方：</td>
                  <td colspan="1">{{item.arbName}}</td>
                  <td colspan="1">开户行：</td>
                  <td colspan="1">{{item.bankName}}</td>
                </tr>

                <tr>
                  <td colspan="1">金额：</td>
                  <td colspan="1">{{item.settleAmtAll}}</td>
                  <td colspan="1">账户名称：</td>
                  <td colspan="1">{{item.arbAcctname}}</td>
                </tr>

                <tr>
                  <td colspan="1">结算年月：</td>
                  <td colspan="1">{{item.settleMonth}}</td>
                  <td colspan="1">银行账号：</td>
                  <td colspan="1">{{item.arbAcctno}}</td>
                </tr>

                <tr>
                  <td colspan="1">结算单号：</td>
                  <td colspan="1">{{item.bankPayno}}</td>
                  <td colspan="1">结算状态：</td>
                  <td colspan="1">
                    {{
                      item.resultStatus === 1 ? '带复核' :
                      item.resultStatus === 2 ? '已复核' :
                      item.resultStatus === 3 ? '复核不通过' : ''
                    }}
                  </td>
                </tr>

                <tr>
                  <td colspan="1">结算说明：</td>
                  <td colspan="3">{{item.settleRemark}}</td>
                </tr>

                <tr>
                  <td colspan="1">提交人：</td>
                  <td colspan="1">{{item.apprerName}}</td>
                  <td colspan="1">提交时间：</td>
                  <td colspan="1">{{item.submitTime}}</td>
                </tr>

                <tr>
                  <td colspan="2">
                    <el-form-item label=" "
                      :prop="`list[${index}].resultStatus2`"
                      :rules="[
                        {required : true , message : '请选择' , trigger : 'change'},
                      ]"
                    >
                      <el-select style="width:100%;" v-model="item.resultStatus2" placeholder="请选择"
                        :disabled="item.resultStatus === 1 ? false : true"
                      >
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="通过" :value="2"></el-option>
                        <el-option label="不通过" :value="3"></el-option>
                      </el-select>
                    </el-form-item>
                  </td>
                </tr>

                <tr>
                  <td colspan="4">
                    <el-form-item label=" " 
                      :prop="`list[${index}].apprerResult`"
                      :rules="[
                        {required : item.resultStatus2 === 3 ? true : false , message : '请输入原因' , trigger : 'blur'},
                      ]"
                    >
                      <el-input type="textarea" v-model="item.apprerResult" placeholder="请输入原因" 
                        :disabled="item.resultStatus === 1 ? false : true"
                      />
                    </el-form-item>
                  </td>
                </tr>
              </tbody>
            </table>

          </template>
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
          list : [{}],
        },
        rules : {
        },
      }
    },
    methods : {
      show(row) {
        this.$http({
          method : 'post',
          url : '/recharge/reviewDetail.htm',
          data : {
            resultId : row.resultId,
          },
        }).then((res) => {
          this.ruleForm.list = [res.result];
          this.detailId = res.result.detailId;
        });
        this.resultId = row.resultId;
        this.dialogVisible = true;
      },
      // 点击关闭
      handleClose() {
        this.dialogVisible = false;
        this.$refs.ruleForm.resetFields();
      },

      // 点击提交
      handleSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            this.$http({
              method : 'post',
              url : '/recharge/review.htm',
              data : {
                apprerResult : this.ruleForm.list[0].apprerResult,
                resultId : this.resultId,
                resultStatus : this.ruleForm.list[0].resultStatus2,
                detailId : this.detailId,
              },
            }).then((res) => {
              this.$message.success('操作成功');
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

.processing-fee-settle-review-dialog{
  .el-form-item{
    margin-bottom: 0!important;
  }
}

</style>