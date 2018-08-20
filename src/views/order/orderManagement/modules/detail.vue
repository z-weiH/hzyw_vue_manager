<template>
  <div class="order-management-detail">
    <el-dialog
      title="客户信息修改"
      :visible.sync="dialogVisible"
      width="860px"
      @close="handleClose"
    >
      <div class="m-content">
        <!-- 案件订单信息 -->
        <table
          class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover"
        >
          <tr>
            <td colspan="4">案件订单信息</td>
          </tr>

          <tr>
            <td colspan="1">案件订单编号：</td>
            <td colspan="1">
              <el-tooltip :content="ruleForm.orderInfo.loanBillNo" placement="top-start">
                <span class="ellipsis" style="max-width:185px;" type="text">{{ruleForm.orderInfo.loanBillNo}}</span>
              </el-tooltip>
            </td>
            <td colspan="1">所属平台：</td>
            <td colspan="1">{{ruleForm.orderInfo.platName}}</td>
          </tr>

          <tr>
            <td colspan="1">出借人：</td>
            <td colspan="1">{{ruleForm.orderInfo.lender}}</td>
            <td colspan="1">被申请人：</td>
            <td colspan="1">{{ruleForm.orderInfo.respondents}}</td>
          </tr>

          <tr>
            <td colspan="1">标的金额：</td>
            <td colspan="1">{{ruleForm.orderInfo.amtCase}}</td>
            <td colspan="1">案件受理费：</td>
            <td colspan="1">{{ruleForm.orderInfo.caseAmt}}</td>
          </tr>

          <tr>
            <td colspan="1">案件仲券：</td>
            <td colspan="1">{{ruleForm.orderInfo.caseTicket}}</td>
            <td colspan="1">仲裁申请书：</td>
            <td colspan="1">
              <a :href="ruleForm.orderInfo.applicationUrl" target="_blank" class="underline">查看</a>
            </td>
          </tr>
        </table>

        <!-- 相关金额信息 -->
        <table
          class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover mt-10"
        >
          <tr>
            <td colspan="4">相关金额信息</td>
          </tr>
          <tr>
            <td colspan="1">本金：</td>
            <td colspan="1">{{ruleForm.fundInfo.amtCapital}}</td>
            <td colspan="1">利息：</td>
            <td colspan="1">{{ruleForm.fundInfo.amtInterest}}</td>
          </tr>

          <tr>
            <td colspan="1">利息利率：</td>
            <td colspan="1">{{ruleForm.fundInfo.rateInterest}}</td>
            <td colspan="1">罚息：</td>
            <td colspan="1">{{ruleForm.fundInfo.amtPenalty}}</td>
          </tr>

          <tr>
            <td colspan="1">服务费：</td>
            <td colspan="1">{{ruleForm.fundInfo.amtService}}</td>
            <td colspan="1">服务费利率：</td>
            <td colspan="1">{{ruleForm.fundInfo.rateService}}</td>
          </tr>

          <tr>
            <td colspan="1">其他费用：</td>
            <td colspan="1">{{ruleForm.fundInfo.amtOther}}</td>
            <td colspan="1">已还费用：</td>
            <td colspan="1">{{ruleForm.fundInfo.amtRefund}}</td>
          </tr>

          <tr>
            <td colspan="1">分期还款利率：</td>
            <td colspan="1">{{ruleForm.fundInfo.rateRefund}}</td>
            <td colspan="1">期数类型：</td>
            <td colspan="1">{{ruleForm.fundInfo.periodsType}}</td>
          </tr>

          <tr>
            <td colspan="1">期数：</td>
            <td colspan="1">{{ruleForm.fundInfo.countPeriods}}</td>
            <td colspan="1">借款开始日期：</td>
            <td colspan="1">{{ruleForm.fundInfo.borrowStartDate}}</td>
          </tr>

          <tr>
            <td colspan="1">借款结束日期：</td>
            <td colspan="1">{{ruleForm.fundInfo.borrowEndDate}}</td>
            <td colspan="1">借款天数：</td>
            <td colspan="1">{{ruleForm.fundInfo.daysBorrowed}}</td>
          </tr>

          <tr>
            <td colspan="1">违约计算开始日期：</td>
            <td colspan="1">{{ruleForm.fundInfo.violateStartDate}}</td>
            <td colspan="1">违约计算结束日期：</td>
            <td colspan="1">{{ruleForm.fundInfo.violateEndDate}}</td>
          </tr>

          <tr>
            <td colspan="1">逾期天数：</td>
            <td colspan="1">{{ruleForm.fundInfo.dayOverDue}}</td>
            <td colspan="1">逾期利率：</td>
            <td colspan="1">{{ruleForm.fundInfo.rateOverDue}}</td>
          </tr>
        </table>

        <!-- 申请人 与 被申请人 信息 -->
        <template v-for="(item,index) in ruleForm.respondents">

          <table
            class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover mt-10"
            :key="index"
          >
            <tr>
              <td colspan="4">{{item.ltype === 0 ? '申请人信息' : '被申请人信息'}}</td>
            </tr>

            <!-- 自然人 -->
            <template v-if="item.type === 0">
              <tr>
                <td colspan="1">姓名：</td>
                <td colspan="1">{{item.name}}</td>
                <td colspan="1">性别：</td>
                <td colspan="1">{{item.sex === 0 ? '女' : '男'}}</td>
              </tr>

              <tr>
                <td colspan="1">民族：</td>
                <td colspan="1">{{item.nation}}</td>
                <td colspan="1">出生年月：</td>
                <td colspan="1">{{item.birth}}</td>
              </tr>

              <tr>
                <td colspan="1">手机号：</td>
                <td colspan="1">{{item.phone}}</td>
                <td colspan="1">邮箱：</td>
                <td colspan="1">{{item.email}}</td>
              </tr>

              <tr>
                <td colspan="1">证件类型：</td>
                <td colspan="1">{{item.idtype === 0 ? '身份证' : '营业执照'}}</td>
                <td colspan="1">证件号码：</td>
                <td colspan="1">{{item.idcard}}</td>
              </tr>

              <tr>
                <td colspan="1">身份证正面：</td>
                <td colspan="1">
                  <a :href="item.img01" target="_blank" class="underline">查看</a>
                </td>
                <td colspan="1">身份证反面：</td>
                <td colspan="1">
                  <a :href="item.img02" target="_blank" class="underline">查看</a>
                </td>
              </tr>

              <tr>
                <td colspan="1">证件地址：</td>
                <td colspan="3">{{item.idAddress}}</td>
              </tr>

              <tr>
                <td colspan="1">住址：</td>
                <td colspan="3">{{item.address}}</td>
              </tr>
            </template>
            <!-- 企业 -->
            <template v-else>
              <tr>
                <td colspan="1">企业名称：</td>
                <td colspan="1">{{item.name}}</td>
                <td colspan="1">证件类型：</td>
                <td colspan="1">{{item.idtype === 0 ? '身份证' : '营业执照'}}</td>
              </tr>

              <tr>
                <td colspan="1">证件号码：</td>
                <td colspan="1">{{item.idcard}}</td>
                <td colspan="1">营业执照：</td>
                <td colspan="1">
                  <a :href="item.img01" target="_blank" class="underline">查看</a>
                </td>
              </tr>

              <tr>
                <td colspan="1">注册地址：</td>
                <td colspan="3">{{item.idAddress}}</td>
              </tr>

              <tr>
                <td colspan="1">法定代表人：</td>
                <td colspan="1">{{item.legaler}}</td>
                <td colspan="1">职位：</td>
                <td colspan="1">{{item.position}}</td>
              </tr>

              <tr>
                <td colspan="1">手机号：</td>
                <td colspan="1">{{item.phone}}</td>
                <td colspan="1">邮箱：</td>
                <td colspan="1">{{item.email}}</td>
              </tr>

              <tr>
                <td colspan="1">通讯地址：</td>
                <td colspan="3">{{item.address}}</td>
              </tr>
            </template>
          </table>

        </template>

        <!-- 借款协议 -->
        <table
          class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover mt-10"
        >
          <tr>
            <td colspan="4">借款协议</td>
          </tr>
          
          <tr>
            <td colspan="1">协议名称</td>
            <td colspan="1">协议编号</td>
            <td colspan="1">协议页数</td>
            <td colspan="1">协议地址</td>
          </tr>

          <tr v-for="(item,index) in ruleForm.agreements" :key="index">
            <td colspan="1">{{item.provedObject}}</td>
            <td colspan="1">{{item.agreeNo}}</td>
            <td colspan="1">{{item.pageSize}}</td>
            <td colspan="1">
              <a :href="item.agreeUrl" target="_blank" class="underline">查看</a>
            </td>
          </tr>
        </table>

        <!-- 借款信息 -->
        <table
          class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover mt-10"
        >
          <tr>
            <td colspan="4">借款信息</td>
          </tr>

          <tr>
            <td colspan="1">借款单号：</td>
            <td colspan="1">{{ruleForm.creditInfo.loanBillNo}}</td>
            <td colspan="1">借款金额：</td>
            <td colspan="1">{{ruleForm.creditInfo.lamtBorrow}}</td>
          </tr>
          
          <tr>
            <td colspan="1">借款时间：</td>
            <td colspan="1">{{ruleForm.creditInfo.borrowdate}}</td>
            <td colspan="1">借款银行卡号：</td>
            <td colspan="1">{{ruleForm.creditInfo.bankNo}}</td>
          </tr>

          <tr>
            <td colspan="1">借款状态：</td>
            <td colspan="1">{{ruleForm.creditInfo.billStatus}}</td>
            <td colspan="1">还款状态：</td>
            <td colspan="1">{{ruleForm.creditInfo.refundStatus}}</td>
          </tr>

          <tr>
            <td colspan="1">分期数：</td>
            <td colspan="1">{{ruleForm.creditInfo.daysInstalment}}</td>
            <td colspan="1">借款到期时间：</td>
            <td colspan="1">{{ruleForm.creditInfo.loadDate}}</td>
          </tr>
          
        </table>

        <!-- 打款凭证 -->
        <table
          class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover mt-10"
        >
          <tr>
            <td colspan="4">打款凭证</td>
          </tr>

          <tr>
            <td colspan="1">凭证供应商：</td>
            <td colspan="1">{{ruleForm.voucherInfo.voucherOffer}}</td>
            <td colspan="1">凭证凭证：</td>
            <td colspan="1">
              <a :href="ruleForm.voucherInfo.voucherUrl" target="_blank" class="underline">查看</a>
            </td>
          </tr>
        </table>

        <!-- 还款信息 -->
        <table
          class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover mt-10"
        >
          <tr>
            <td colspan="1">还款时间</td>
            <td colspan="1">到期时间</td>
            <td colspan="1">需还金额</td>
            <td colspan="1">实际还款</td>
            <td colspan="1">还款方式</td>
            <td colspan="1">还款状态</td>
          </tr>

          <tr v-for="(item,index) in ruleForm.refunds" :key="index">
            <td colspan="1">{{item.refundDate}}</td>
            <td colspan="1">{{item.expireDate}}</td>
            <td colspan="1">{{item.amtRefund}}</td>
            <td colspan="1">{{item.amtActural}}</td>
            <td colspan="1">{{item.refundType}}</td>
            <td colspan="1">{{item.refundStatus}}</td>
          </tr>
        </table>

      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleClose">返 回</el-button>
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
          /* ---------------------------- 案件订单信息 -------------------------- */
          orderInfo : {
            // 案件订单编号
            loanBillNo : '',
            // 所属平台
            platName : '',
            // 出借人
            lender : '',
            // 被申请人
            respondents : '',
            // 标的金额
            amtCase : '',
            // 案件受理费
            caseAmt : '',
            // 案件仲券
            caseTicket : '',
            // 仲裁申请书
            applicationUrl : '',
          },

          /* ---------------------------- 相关金额信息 -------------------------- */
          fundInfo : {
            // 本金
            amtCapital : '',
            // 利息
            amtInterest : '',
            // 利息利率
            rateInterest : '',
            // 罚息
            amtPenalty : '',
            // 服务费
            amtService : '',
            // 服务费利率
            rateService : '',
            // 其他费用
            amtOther : '',
            // 已还费用
            amtRefund : '',
            // 分期还款利率
            rateRefund : '',
            // 期数类型
            periodsType : '',
            // 期数
            countPeriods : '',
            // 借款开始日期
            borrowStartDate : '',
            // 借款结束日期
            borrowEndDate : '',
            // 借款天数
            daysBorrowed : '',
            // 违约计算开始日期
            violateStartDate : '',
            // 违约计算结束日期
            violateEndDate : '',
            // 逾期天数
            dayOverDue : '',
            // 逾期利率
            rateOverDue : '',
          },

          /* ---------------------------- 申请人 与 被申请人 信息 -------------------------- */
          respondents : [
            /* {
              // 用户类型 0自然人 1企业
              type : 0,
              // 当事人类型 	0申请人 1被申请人
              ltype : 0,
              // 姓名 or 企业名称
              name : '',
              // 性别 0女 1男
              sex : '',
              // 民族
              nation : '',
              // 出生年月
              birth : '',
              // 手机号
              phone : '',
              // 邮箱
              email : '',
              // 证件类型 0身份证 3营业执照
              idtype : '',
              // 证件号码
              idcard : '',
              // 身份证正面 营业执照
              img01 : '',
              // 身份证反面
              img02 : '',
              // 证件地址 注册地址
              idAddress : '',
              // 住址 通讯地址
              address : '',

              // 法定代表人
              legaler : '',
              // 职位
              position : '',
            } */
          ],

          /* ---------------------------- 借款协议 -------------------------- */
          agreements : [
            /* {
              // 协议名称
              provedObject : '',
              // 协议编号
              agreeNo : '',
              // 协议页数
              pageSize : '',
              // 协议地址
              agreeUrl : '',
            } */
          ],

          /* ---------------------------- 借款信息 -------------------------- */
          creditInfo : {
            // 借款单号
            loanBillNo : '',
            // 借款金额
            lamtBorrow : '',
            // 借款时间
            borrowdate : '',
            // 借款银行卡号
            bankNo : '',
            // 借款状态
            billStatus : '',
            // 还款状态
            refundStatus : '',
            // 分期数
            daysInstalment : '',
            // 借款到期时间
            loadDate : '',
          },
          
          /* ---------------------------- 打款凭证 -------------------------- */
          voucherInfo : {
            // 凭证供应商
            voucherOffer : '',
            // 凭证凭证
            voucherUrl : '',
          },

          /* ---------------------------- 还款信息 -------------------------- */
          refunds : [
            /* {
              // 还款时间
              refundDate : '',
              // 到期时间
              expireDate : '',
              // 需还金额
              amtRefund : '',
              // 实际还款
              amtActural : '',
              // 还款方式
              refundType : '',
              // 还款状态
              refundStatus : '',
            } */
          ],

        },
      }
    },
    methods: {
      show(row) {
        this.dialogVisible = true;
        this.$http({
          method : 'post',
          url : '/ordermanage/selectOrderDetail.htm',
          data : {
            caseOrderId : row.caseOrderId,
          },
        }).then((res) => {
          this.ruleForm = Object.assign(this.ruleForm,res.result);
        });
      },

      // 浮层关闭
      handleClose() {
        this.dialogVisible = false;
      },
    },
  }
</script>

<style lang="scss" scoped>

.order-management-detail{

}

</style>