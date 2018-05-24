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
            <td colspan="1">{{ruleForm.orderInfo.loanbillno}}</td>
            <td colspan="1">所属平台：</td>
            <td colspan="1">{{ruleForm.orderInfo.platname}}</td>
          </tr>

          <tr>
            <td colspan="1">出借人：</td>
            <td colspan="1">{{ruleForm.orderInfo.lender}}</td>
            <td colspan="1">被申请人：</td>
            <td colspan="1">{{ruleForm.orderInfo.respondents}}</td>
          </tr>

          <tr>
            <td colspan="1">标的金额：</td>
            <td colspan="1">{{ruleForm.orderInfo.amtcase}}</td>
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
            <td colspan="1">{{ruleForm.fundInfo.amtcapital}}</td>
            <td colspan="1">利息：</td>
            <td colspan="1">{{ruleForm.fundInfo.amtinterest}}</td>
          </tr>

          <tr>
            <td colspan="1">利息利率：</td>
            <td colspan="1">{{ruleForm.fundInfo.rateinterest}}</td>
            <td colspan="1">罚息：</td>
            <td colspan="1">{{ruleForm.fundInfo.amtpenalty}}</td>
          </tr>

          <tr>
            <td colspan="1">服务费：</td>
            <td colspan="1">{{ruleForm.fundInfo.amtservice}}</td>
            <td colspan="1">服务费利率：</td>
            <td colspan="1">{{ruleForm.fundInfo.rateservice}}</td>
          </tr>

          <tr>
            <td colspan="1">其他费用：</td>
            <td colspan="1">{{ruleForm.fundInfo.amtother}}</td>
            <td colspan="1">已还费用：</td>
            <td colspan="1">{{ruleForm.fundInfo.amtrefund}}</td>
          </tr>

          <tr>
            <td colspan="1">分期还款利率：</td>
            <td colspan="1">{{ruleForm.fundInfo.raterefund}}</td>
            <td colspan="1">期数类型：</td>
            <td colspan="1">{{ruleForm.fundInfo.periodstype}}</td>
          </tr>

          <tr>
            <td colspan="1">期数：</td>
            <td colspan="1">{{ruleForm.fundInfo.countperiods}}</td>
            <td colspan="1">借款开始日期：</td>
            <td colspan="1">{{ruleForm.fundInfo.borrowstartdate}}</td>
          </tr>

          <tr>
            <td colspan="1">借款结束日期：</td>
            <td colspan="1">{{ruleForm.fundInfo.borrowenddate}}</td>
            <td colspan="1">借款天数：</td>
            <td colspan="1">{{ruleForm.fundInfo.daysborrowed}}</td>
          </tr>

          <tr>
            <td colspan="1">违约计算开始日期：</td>
            <td colspan="1">{{ruleForm.fundInfo.violatestartdate}}</td>
            <td colspan="1">违约计算结束日期：</td>
            <td colspan="1">{{ruleForm.fundInfo.violateenddate}}</td>
          </tr>

          <tr>
            <td colspan="1">逾期天数：</td>
            <td colspan="1">{{ruleForm.fundInfo.dayoverdue}}</td>
            <td colspan="1">逾期利率：</td>
            <td colspan="1">{{ruleForm.fundInfo.rateoverdue}}</td>
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
                <td colspan="3">{{item.idaddress}}</td>
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
                <td colspan="3">{{item.idaddress}}</td>
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
            <td colspan="1">{{item.provedobject}}</td>
            <td colspan="1">{{item.agreeno}}</td>
            <td colspan="1">{{item.pagesize}}</td>
            <td colspan="1">
              <a :href="item.agreeurl" target="_blank" class="underline">查看</a>
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
            <td colspan="1">{{ruleForm.creditInfo.loanbillno}}</td>
            <td colspan="1">借款金额：</td>
            <td colspan="1">{{ruleForm.creditInfo.amtborrow}}</td>
          </tr>
          
          <tr>
            <td colspan="1">借款时间：</td>
            <td colspan="1">{{ruleForm.creditInfo.borrowdate}}</td>
            <td colspan="1">借款银行卡号：</td>
            <td colspan="1">{{ruleForm.creditInfo.bankno}}</td>
          </tr>

          <tr>
            <td colspan="1">借款状态：</td>
            <td colspan="1">{{ruleForm.creditInfo.billstatus}}</td>
            <td colspan="1">还款状态：</td>
            <td colspan="1">{{ruleForm.creditInfo.refundstatus}}</td>
          </tr>

          <tr>
            <td colspan="1">分期数：</td>
            <td colspan="1">{{ruleForm.creditInfo.daysinstalment}}</td>
            <td colspan="1">借款到期时间：</td>
            <td colspan="1">{{ruleForm.creditInfo.loaddate}}</td>
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
            <td colspan="1">{{ruleForm.voucherInfo.voucheroffer}}</td>
            <td colspan="1">凭证凭证：</td>
            <td colspan="1">
              <a :href="ruleForm.voucherInfo.voucherurl" target="_blank" class="underline">查看</a>
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
            <td colspan="1">{{item.refunddate}}</td>
            <td colspan="1">{{item.expiredate}}</td>
            <td colspan="1">{{item.amtrefund}}</td>
            <td colspan="1">{{item.amtactural}}</td>
            <td colspan="1">{{item.refundtype}}</td>
            <td colspan="1">{{item.refundstatus}}</td>
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
            loanbillno : '',
            // 所属平台
            platname : '',
            // 出借人
            lender : '',
            // 被申请人
            respondents : '',
            // 标的金额
            amtcase : '',
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
            amtcapital : '',
            // 利息
            amtinterest : '',
            // 利息利率
            rateinterest : '',
            // 罚息
            amtpenalty : '',
            // 服务费
            amtservice : '',
            // 服务费利率
            rateservice : '',
            // 其他费用
            amtother : '',
            // 已还费用
            amtrefund : '',
            // 分期还款利率
            raterefund : '',
            // 期数类型
            periodstype : '',
            // 期数
            countperiods : '',
            // 借款开始日期
            borrowstartdate : '',
            // 借款结束日期
            borrowenddate : '',
            // 借款天数
            daysborrowed : '',
            // 违约计算开始日期
            violatestartdate : '',
            // 违约计算结束日期
            violateenddate : '',
            // 逾期天数
            dayoverdue : '',
            // 逾期利率
            rateoverdue : '',
          },

          /* ---------------------------- 申请人 与 被申请人 信息 -------------------------- */
          respondents : [
            {
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
              idaddress : '',
              // 住址 通讯地址
              address : '',

              // 法定代表人
              legaler : '',
              // 职位
              position : '',
            }
          ],

          /* ---------------------------- 借款协议 -------------------------- */
          agreements : [
            {
              // 协议名称
              provedobject : '',
              // 协议编号
              agreeno : '',
              // 协议页数
              pagesize : '',
              // 协议地址
              agreeurl : '',
            }
          ],

          /* ---------------------------- 借款信息 -------------------------- */
          creditInfo : {
            // 借款单号
            loanbillno : '',
            // 借款金额
            amtborrow : '',
            // 借款时间
            borrowdate : '',
            // 借款银行卡号
            bankno : '',
            // 借款状态
            billstatus : '',
            // 还款状态
            refundstatus : '',
            // 分期数
            daysinstalment : '',
            // 借款到期时间
            loaddate : '',
          },
          
          /* ---------------------------- 打款凭证 -------------------------- */
          voucherInfo : {
            // 凭证供应商
            voucheroffer : '',
            // 凭证凭证
            voucherurl : '',
          },

          /* ---------------------------- 还款信息 -------------------------- */
          refunds : [
            {
              // 还款时间
              refunddate : '',
              // 到期时间
              expiredate : '',
              // 需还金额
              amtrefund : '',
              // 实际还款
              amtactural : '',
              // 还款方式
              refundtype : '',
              // 还款状态
              refundstatus : '',
            }
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
            caseOrderId : row.caseorderid,
          },
        }).then((res) => {
          // 处理 rap 上数据问题
          res.result.refunds = [res.result.refunds];
          this.ruleForm = res.result;
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