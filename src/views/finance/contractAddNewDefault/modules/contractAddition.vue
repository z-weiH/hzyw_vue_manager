<template>
  <div class="contract-add-new-default-contract-addition">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="800px"
      @close="handleClose"
      ref="dialog"
    >
      <div class="m-content">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
          <!-- 加款信息 -->
          <table
            class="m-primordial-table
              el-table el-table--fit el-table--border
              el-table--enable-row-hover"
          >
            <!-- 编辑 -->
            <template v-if="additionalInformationType === 'edit'">

              <tr>
                <td colspan="4">加款信息</td>
              </tr>

              <tr>
                <td colspan="1">
                  合同编号：
                </td>
                <td colspan="1">
                  <el-form-item label=" " prop="contractNo">
                    <el-input v-model="ruleForm.contractNo" placeholder="请输入合同编号" />
                  </el-form-item>
                </td>
                <td colspan="1">
                  合同日期：
                </td>
                <td colspan="1">
                  <el-form-item label=" " prop="contractDate">
                    <el-date-picker
                      type="date" placeholder="选择日期"
                      v-model="ruleForm.contractDate"
                      style="width: 100%;"
                      value-format="yyyy-MM-dd"
                    >
                    </el-date-picker>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">
                  客户名称：
                </td>
                <td colspan="1">
                  <el-form-item label=" " prop="merchantCode">
                    <el-select ref="merchantCode" v-model="ruleForm.merchantCode" placeholder="请选择">
                      <el-option label="请选择" value=""></el-option>
                      <template v-for="(item,index) in merchantOptions">
                        <el-option :key="item.code + index" :label="item.merchantName" :value="item.code"></el-option>
                      </template>
                    </el-select>
                  </el-form-item>
                </td>
                <td colspan="1">
                  预缴受理费（元）：
                </td>
                <td colspan="1">
                  <el-form-item label=" " prop="preCaseAmt">
                    <el-input v-model="ruleForm.preCaseAmt" placeholder="请输入预缴受理费" />
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">
                  充值仲券（张）：
                </td>
                <td colspan="1">
                  <el-form-item label=" " prop="preCaseTicket">
                    <el-input v-model="ruleForm.preCaseTicket" placeholder="请输入充值仲券" />
                  </el-form-item>
                </td>
                <td colspan="1">
                  仲券金额（元）：
                </td>
                <td colspan="1">
                  <el-form-item label=" " prop="preTicketAmt">
                    <el-input :disabled="true" v-model="ruleForm.preTicketAmt" placeholder="请输入仲券金额" />
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">
                  赠送仲券（张）：
                </td>
                <td colspan="1">
                  <el-form-item label=" " prop="preGiftTicket">
                    <el-input v-model="ruleForm.preGiftTicket" placeholder="请输入赠送仲券" />
                  </el-form-item>
                </td>
                <td v-if="preGiftPeriodIsShow" colspan="1">
                  赠券有效期：
                </td>
                <td colspan="1">
                  <el-form-item v-if="preGiftPeriodIsShow" label=" " prop="preGiftPeriod">
                    <el-select v-model="ruleForm.preGiftPeriod" placeholder="请选择">
                      <el-option label="请选择" value=""></el-option>
                      <el-option label="1个月" :value="1"></el-option>
                      <el-option label="2个月" :value="2"></el-option>
                      <el-option label="3个月" :value="3"></el-option>
                      <el-option label="4个月" :value="4"></el-option>
                      <el-option label="5个月" :value="5"></el-option>
                      <el-option label="6个月" :value="6"></el-option>
                      <el-option label="7个月" :value="7"></el-option>
                      <el-option label="8个月" :value="8"></el-option>
                      <el-option label="9个月" :value="9"></el-option>
                      <el-option label="10个月" :value="10"></el-option>
                      <el-option label="11个月" :value="11"></el-option>
                      <el-option label="12个月" :value="12"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">
                  技术服务费（元）：
                </td>
                <td colspan="1">
                  <el-form-item label=" " prop="preServiceAmt">
                    <el-input v-model="ruleForm.preServiceAmt" placeholder="请输入技术服务费" />
                  </el-form-item>
                </td>
                <td colspan="2"></td>
              </tr>

            </template>
            <!-- 详情 -->
            <template v-else>
              <tr>
                <td colspan="4">加款信息</td>
              </tr>

              <tr>
                <td colspan="1">
                  合同编号：
                </td>
                <td colspan="1">
                  {{ruleForm.contractNo}}
                </td>
                <td colspan="1">
                  合同日期：
                </td>
                <td colspan="1">
                  {{ruleForm.contractDate}}
                </td>
              </tr>

              <tr>
                <td colspan="1">
                  客户名称：
                </td>
                <td colspan="1">
                  {{ruleForm.merchantName}}
                </td>
                <td colspan="1">
                  预缴受理费（元）：
                </td>
                <td colspan="1">
                  {{ruleForm.preCaseAmt}}
                </td>
              </tr>

              <tr>
                <td colspan="1">
                  充值仲券（张）：
                </td>
                <td colspan="1">
                  {{ruleForm.preCaseTicket}}
                </td>
                <td colspan="1">
                  仲券金额（元）：
                </td>
                <td colspan="1">
                  {{ruleForm.preTicketAmt}}
                </td>
              </tr>

              <tr>
                <td colspan="1">
                  赠送仲券（张）：
                </td>
                <td colspan="1">
                  {{ruleForm.preGiftTicket}}
                </td>
                <template v-if="ruleForm.preGiftTicket > 0">
                  <td colspan="1">
                    赠券有效期：
                  </td>
                  <td colspan="1">
                    {{ruleForm.preGiftPeriod}}个月
                  </td>
                </template>
              </tr>

              <tr>
                <td colspan="1">
                  技术服务费（元）：
                </td>
                <td colspan="1">
                  {{ruleForm.preServiceAmt}}
                </td>
                <td colspan="2"></td>
              </tr>

              <tr>
                <td colspan="1">订单状态</td>
                <td colspan="3">
                  {{
                    ruleForm.orderStatus === 0 ? '待加款' :
                    ruleForm.orderStatus === 1 ? '待复核' :
                    ruleForm.orderStatus === 2 ? '已加款' : '未通过'
                  }}
                </td>
              </tr>

            </template>

          </table>

          <!-- 新增加款 list -->
          <template v-for="(item,index) in ruleForm.orderDetailList">

            <!-- 编辑 -->
            <template v-if="item.orderStatus === 0 && type !== 'detail' && type !== 'examineDetail'">
              <table
                :key="index"
                class="m-primordial-table mt-10
                  el-table el-table--fit el-table--border
                  el-table--enable-row-hover"
              >
                <tr>
                  <td colspan="4">
                    确认操作
                  </td>
                </tr>

                <tr>
                  <td colspan="1">
                    客户银行账户名：
                  </td>
                  <td colspan="3">
                    <el-form-item label=" "
                      :prop="`orderDetailList[${index}].acctName`"
                      :rules="rules.acctName"
                    >
                      <el-input v-model="item.acctName" placeholder="请输入客户银行账户名" />
                    </el-form-item>
                  </td>
                </tr>

                <tr>
                  <td colspan="1">客户银行账号：</td>
                  <td colspan="1">
                    <el-form-item label=" "
                      :prop="`orderDetailList[${index}].acctNo`"
                      :rules="rules.acctNo"
                    >
                      <el-input v-model="item.acctNo" placeholder="请输入客户银行账号" />
                    </el-form-item>
                  </td>
                  <td colspan="1">客户开户行：</td>
                  <td colspan="1">
                    <el-form-item label=" "
                      :prop="`orderDetailList[${index}].bankName`"
                      :rules="rules.bankName"
                    >
                      <el-input v-model="item.bankName" placeholder="请输入客户开户行" />
                    </el-form-item>
                  </td>
                </tr>

                <tr>
                  <td colspan="1">
                    银行流水号：
                  </td>
                  <td colspan="3">
                    <el-form-item label=" "
                      :prop="`orderDetailList[${index}].bankOrderno`"
                      :rules="rules.bankOrderno"
                    >
                      <el-input v-model="item.bankOrderno" placeholder="请输入银行流水号" />
                    </el-form-item>
                  </td>
                </tr>

                <tr>
                  <td colspan="1">到账金额（元）：</td>
                  <td colspan="1">
                    <el-form-item label=" "
                      :prop="`orderDetailList[${index}].arrivalAmt`"
                      :rules="rules.arrivalAmt"
                    >
                      <el-input :disabled="true" v-model="item.arrivalAmt" placeholder="请输入到账金额" />
                    </el-form-item>
                  </td>
                  <td colspan="1">到款时间：</td>
                  <td colspan="1">
                    <el-form-item label=" "
                      :prop="`orderDetailList[${index}].payTime`"
                      :rules="rules.payTime"
                    >
                      <el-date-picker
                        type="date" placeholder="选择日期"
                        v-model="item.payTime"
                        style="width: 100%;"
                        value-format="yyyy-MM-dd"
                      >
                      </el-date-picker>
                    </el-form-item>
                  </td>
                </tr>

                <tr>
                  <td colspan="1">
                    转账摘要：
                  </td>
                  <td colspan="3">
                    <el-form-item label=" "
                      :prop="`orderDetailList[${index}].bankRemark`"
                      :rules="rules.bankRemark"
                    >
                      <el-input v-model="item.bankRemark" placeholder="请输入转账摘要" />
                    </el-form-item>
                  </td>
                </tr>

                <tr>
                  <td colspan="1">添加仲券（张）：</td>
                  <td colspan="1">
                    <el-form-item label=" "
                      :prop="`orderDetailList[${index}].addTicket`"
                      :rules="rules.addTicket"
                    >
                      <el-input @input.native="handleAddTicket(item,index)" v-model="item.addTicket" placeholder="请输入添加仲券" />
                    </el-form-item>
                  </td>
                  <td colspan="1">仲券金额（元）：</td>
                  <td colspan="1">
                    <el-form-item label=" "
                      :prop="`orderDetailList[${index}].addTicketAmt`"
                      :rules="rules.addTicketAmt"
                    >
                      <el-input :disabled="true" v-model="item.addTicketAmt" placeholder="请输入仲券金额" />
                    </el-form-item>
                  </td>
                </tr>

                <tr>
                  <td colspan="1">添加受理费（元）：</td>
                  <td colspan="1">
                    <el-form-item label=" "
                      :prop="`orderDetailList[${index}].addAmt`"
                      :rules="rules.addAmt"
                    >
                      <el-input @input.native="handleComputedArrivalAmt(item,index)" v-model="item.addAmt" placeholder="请输入添加受理费" />
                    </el-form-item>
                  </td>
                  <td colspan="1">技术服务费（元）：</td>
                  <td colspan="1">
                    <el-form-item label=" "
                      :prop="`orderDetailList[${index}].addService`"
                      :rules="rules.addService"
                    >
                      <el-input @input.native="handleComputedArrivalAmt(item,index)" v-model="item.addService" placeholder="请输入技术服务费" />
                    </el-form-item>
                  </td>
                </tr>

                <tr>
                  <td colspan="1">赠送仲券（张）：</td>
                  <td colspan="1">
                    <el-form-item label=" "
                      :prop="`orderDetailList[${index}].addGiftTicket`"
                      :rules="rules.addGiftTicket"
                    >
                      <el-input @input.native="handleAddGiftTicket(item,index)" v-model="item.addGiftTicket" placeholder="请输入赠送仲券" />
                    </el-form-item>
                  </td>
                  <td v-if="item.addGiftPeriodStatus" colspan="1">赠券有效期：</td>
                  <td colspan="1">
                    <el-form-item label=" "
                      :prop="`orderDetailList[${index}].addGiftPeriod`"
                      :rules="rules.addGiftPeriod"
                      v-if="item.addGiftPeriodStatus"
                    >
                      <el-select v-model="item.addGiftPeriod" placeholder="请选择">
                        <el-option label="请选择" value=""></el-option>
                        <el-option label="1个月" :value="1"></el-option>
                        <el-option label="2个月" :value="2"></el-option>
                        <el-option label="3个月" :value="3"></el-option>
                        <el-option label="4个月" :value="4"></el-option>
                        <el-option label="5个月" :value="5"></el-option>
                        <el-option label="6个月" :value="6"></el-option>
                        <el-option label="7个月" :value="7"></el-option>
                        <el-option label="8个月" :value="8"></el-option>
                        <el-option label="9个月" :value="9"></el-option>
                        <el-option label="10个月" :value="10"></el-option>
                        <el-option label="11个月" :value="11"></el-option>
                        <el-option label="12个月" :value="12"></el-option>
                      </el-select>
                    </el-form-item>
                  </td>
                </tr>

              </table>
            </template>
            <!-- 详情 -->
            <template v-else>
              <table
                :key="index"
                class="m-primordial-table mt-10
                  el-table el-table--fit el-table--border
                  el-table--enable-row-hover"
              >
                <tr>
                  <td colspan="4">
                    确认操作
                  </td>
                </tr>

                <tr>
                  <td colspan="1">
                    客户银行账户名：
                  </td>
                  <td colspan="3">
                    {{item.acctName}}
                  </td>
                </tr>

                <tr>
                  <td colspan="1">客户银行账号：</td>
                  <td colspan="1">
                    {{item.acctNo}}
                  </td>
                  <td colspan="1">客户开户行：</td>
                  <td colspan="1">
                    {{item.bankName}}
                  </td>
                </tr>

                <tr>
                  <td colspan="1">
                    银行流水号：
                  </td>
                  <td colspan="3">
                    {{item.bankOrderno}}
                  </td>
                </tr>

                <tr>
                  <td colspan="1">到账金额（元）：</td>
                  <td colspan="1">
                    {{item.arrivalAmt}}
                  </td>
                  <td colspan="1">到款时间：</td>
                  <td colspan="1">
                    {{item.payTime}}
                  </td>
                </tr>

                <tr>
                  <td colspan="1">
                    转账摘要：
                  </td>
                  <td colspan="3">
                    {{item.bankRemark}}
                  </td>
                </tr>

                <tr>
                  <td colspan="1">添加仲券（张）：</td>
                  <td colspan="1">
                    {{item.addTicket}}
                  </td>
                  <td colspan="1">仲券金额（元）：</td>
                  <td colspan="1">
                    {{item.addTicketAmt}}
                  </td>
                </tr>

                <tr>
                  <td colspan="1">添加受理费（元）：</td>
                  <td colspan="1">
                    {{item.addAmt}}
                  </td>
                  <td colspan="1">技术服务费（元）：</td>
                  <td colspan="1">
                    {{item.addService}}
                  </td>
                </tr>

                <tr>
                  <td colspan="1">赠送仲券（张）：</td>
                  <td colspan="1">
                    {{item.addGiftTicket}}
                  </td>
                  <template v-if="item.addGiftTicket > 0">
                    <td colspan="1">赠券有效期：</td>
                    <td colspan="1">
                      {{item.addGiftPeriod}}个月
                    </td>
                  </template>
                </tr>

                <!-- 如果当前审核完成 显示审核 结果 -->
                <template v-if="item.orderStatus === 2 || item.orderStatus === 3">
                  <tr>
                    <td colspan="4">审核结果</td>
                  </tr>

                  <tr>
                    <td colspan="1">
                      审核状态：
                    </td>
                    <td colspan="3">
                      <div class="text-left pl-20">
                        {{
                          item.resultStatus === 2 ? '已加款' : '未通过'
                        }}
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colspan="1">
                      审核结果：
                    </td>
                    <td colspan="3">
                      <div class="m-h text-left pl-20">
                        {{item.apprerResult}}
                      </div>
                    </td>
                  </tr>
                </template>

                <!-- 如果当前加款是待审核状态 且 当前是审核状态时 -->
                <template v-if="item.orderStatus === 1 && type === 'examine'">
                  <tr>
                    <td colspan="4">审核结果</td>
                  </tr>

                  <tr>
                    <td colspan="1">
                      <el-form-item label=" "
                        :prop="`orderDetailList[${index}].resultStatus`"
                        :rules="rules.resultStatus"
                      >
                        <el-select v-model="item.resultStatus" placeholder="请选择">
                          <el-option label="请选择" value=""></el-option>
                          <el-option label="通过" :value="2"></el-option>
                          <el-option label="不通过" :value="3"></el-option>
                        </el-select>
                      </el-form-item>
                    </td>
                    <td colspan="3"></td>
                  </tr>

                  <tr>
                    <td colspan="4">
                      <el-form-item label=" "
                        :prop="`orderDetailList[${index}].apprerResult`"
                        :rules="{
                          required: item.resultStatus === 3 ? true : false,
                          message: '请输入审核说明',
                          trigger: 'blur',
                        }"
                      >
                        <el-input
                          type="textarea"
                          v-model="item.apprerResult"
                          placeholder="请输入审核说明"
                          :autosize="{ minRows: 3}"
                        />
                      </el-form-item>
                    </td>
                  </tr>
                </template>

              </table>
            </template>

          </template>
        </el-form>

        <el-button v-if="type === 'add' || type === 'edit'"
          type="primary" @click="handleAdditionalMoney" class="mt-20"
        >
          新增加款
        </el-button>
      </div>

      <span slot="footer" class="dialog-footer">
        <template v-if="type === 'detail' || type === 'examineDetail'">
          <el-button type="primary" @click="handleClose">返 回</el-button>
        </template>

        <template v-else-if="type === 'add' || type === 'edit'">
          <el-button :disabled="submitDisabled" @click="handleSubmit('save')">保 存</el-button>
          <el-button :disabled="submitDisabled" type="primary" @click="handleSubmit('submit')">提 交</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </template>

        <template v-else-if="type === 'examine'">
          <el-button :disabled="submitDisabled" type="primary" @click="handleExamine">审 核</el-button>
          <el-button @click="handleClose">取 消</el-button>
        </template>
      </span>

    </el-dialog>
  </div>
</template>

<script>
  export default {
    watch : {
      // 监听 充值仲券
      ['ruleForm.preCaseTicket'](val) {
        let type = val > 0 ? true : false;
        if(type === false) {
          this.ruleForm.preTicketAmt = '';
        }else{
          this.ruleForm.preTicketAmt = val * this.multiple;
        }
      },
      // 监听 赠送仲券
      ['ruleForm.preGiftTicket'](val) {
        let type = val > 0 ? true : false;
        if(type === false){
          this.ruleForm.preGiftPeriod = '';
        }
        this.preGiftPeriodIsShow = type;
      },
    },
    data() {
      return {
        dialogVisible : false,
        title : '',
        // 当前浮层 状态
        type : '',
        // 加款信息状态
        additionalInformationType : 'detail',
        // 保存 当前table tr 数据
        row : '',
        // 充值仲券 和 仲券金额的倍数
        multiple : 10,
        // 提交按钮禁用状态
        submitDisabled : false,
        ruleForm : {
          /* ************************加款信息************************************  */
          // 合同编号
          contractNo : '',
          // 合同日期
          contractDate : '',
          // 客户名称
          merchantCode : '',
          // 预缴受理费
          preCaseAmt : '',
          // 充值仲券
          preCaseTicket : '',
          // 仲券金额
          preTicketAmt : '',
          // 赠送仲券
          preGiftTicket : '',
          // 赠券有效期
          preGiftPeriod : '',
          // 技术服务费
          preServiceAmt : '',

          /* ************************新增加款 list************************************  */
          orderDetailList : [
            {
              // 客户银行账户名
              acctName : '',
              // 客户银行账号
              acctNo : '',
              // 客户开户行
              bankName : '',
              // 银行流水号
              bankOrderno : '',
              // 到账金额
              arrivalAmt : '',
              // 到款时间
              payTime : '',
              // 转账摘要
              bankRemark : '',
              // 添加仲券
              addTicket : '',
              // 仲券金额
              addTicketAmt : '',
              // 添加受理费
              addAmt : '',
              // 技术服务费
              addService : '',
              // 赠送仲券
              addGiftTicket : '',
              // 赠券有效期
              addGiftPeriod : '',
              // 状态 0待提交1待审核2已加款3未通过
              orderStatus : 0,

              // 审核说明
              apprerResult : '',
              // 审核状态 2 通过 3不通过
              resultStatus : '',
            },
          ],
        },
        rules : {
          // 加款信息
          contractNo : [
            {required : true , message : '请输入合同编号' , trigger : 'blur'}
          ],
          contractDate : [
            {required : true , message : '请选择合同日期' , trigger : 'change'}
          ],
          merchantCode : [
            {required : true , message : '请选择客户' , trigger : 'change'}
          ],
          preCaseAmt : [
            {required : true , message : '请输入预缴受理费' , trigger : 'blur'},
            {pattern : /^\d+(\.\d+)?$/ , message : '格式输入有误' , trigger : 'blur'},
          ],
          preCaseTicket : [
            {required : true , message : '请输入充值仲券' , trigger : 'blur'},
            {pattern : /^(0|[1-9][0-9]*)$/ , message : '格式输入有误' , trigger : 'blur'},
          ],
          /* preTicketAmt : [
            {required : true , message : '请输入仲券金额' , trigger : 'blur'}
          ], */
          preGiftTicket : [
            {required : true , message : '请输入赠送仲券' , trigger : 'blur'},
            {pattern : /^(0|[1-9][0-9]*)$/ , message : '格式输入有误' , trigger : 'blur'},
          ],
          preGiftPeriod : [
            {required : true , message : '请选择赠券有效期' , trigger : 'change'}
          ],
          preServiceAmt : [
            {required : true , message : '请输入技术服务费' , trigger : 'blur'},
            {pattern : /^\d+(\.\d+)?$/ , message : '格式输入有误' , trigger : 'blur'},
          ],

          // 新增加款 list
          acctName : [
            {required : true , message : '请输入客户银行账户名' , trigger : 'blur'}
          ],
          acctNo : [
            {required : true , message : '请输入客户银行账号' , trigger : 'blur'}
          ],
          bankName : [
            {required : true , message : '请输入客户开户行' , trigger : 'blur'}
          ],
          bankOrderno : [
            {required : true , message : '请输入银行流水号' , trigger : 'blur'}
          ],
          /* arrivalAmt : [
            {required : true , message : '请输入到账金额' , trigger : 'blur'}
          ], */
          payTime : [
            {required : true , message : '请选择到款时间' , trigger : 'change'}
          ],
          bankRemark : [
            {required : true , message : '请输入转账摘要' , trigger : 'blur'}
          ],
          addTicket : [
            {required : true , message : '请输入添加仲券' , trigger : 'blur'},
            {pattern : /^(0|[1-9][0-9]*)$/ , message : '格式输入有误' , trigger : 'blur'},
          ],
          /* addTicketAmt : [
            {required : true , message : '请输入仲券金额' , trigger : 'blur'}
          ], */
          addAmt : [
            {required : true , message : '请输入添加受理费' , trigger : 'blur'},
            {pattern : /^\d+(\.\d+)?$/ , message : '格式输入有误' , trigger : 'blur'},
          ],
          addService : [
            {required : true , message : '请输入技术服务费' , trigger : 'blur'},
            {pattern : /^\d+(\.\d+)?$/ , message : '格式输入有误' , trigger : 'blur'},
          ],
          addGiftTicket : [
            {required : true , message : '请输入赠送仲券' , trigger : 'blur'},
            {pattern : /^(0|[1-9][0-9]*)$/ , message : '格式输入有误' , trigger : 'blur'},
          ],
          addGiftPeriod : [
            {required : true , message : '请选择赠券有效期' , trigger : 'change'}
          ],

          // 审核相关
          resultStatus : [
            {required : true , message : '请选择审核结果' , trigger : 'change'}
          ],
        },
        // 赠券有效期
        preGiftPeriodIsShow : false,

        // 客户 options
        merchantOptions : [
          {
            merchantName : '张三',
            code : '张三',
          }
        ],
      }
    },
    mounted() {
      // 获取客户列表
      this.$http({
        method : 'post',
        url : '/merchant/queryMerchants.htm',
      }).then((res) => {
        this.merchantOptions = res.result.list;
      });
    },
    methods: {
      show(type,row) {
        this.dialogVisible = true;
        this.row = row;
        this.type = type;
        if(type === 'add'){
          this.initAdd();
        }else if(type === 'edit'){
          this.initEdit(row);
        }else if(type === 'detail') {
          this.initDetail(row);
        }else if(type === 'examine'){
          this.initExamine(row);
        }else if(type === 'examineDetail'){
          this.initExamineDetail(row);
        }
        // dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });
      },
      // 新增初始化
      initAdd() {
        this.additionalInformationType = 'edit';
        this.ruleForm.orderDetailList[0].orderStatus = 0;
        this.title = '新增加款';
      },
      // 编辑初始化
      initEdit(row) {
        this.additionalInformationType = 'detail';
        this.title = '修改加款';
        this.$http({
          url : '/contractOrder/queryOrderDetailByOrderId.htm',
          method : 'post',
          data : {
            orderId : row.orderId,
          },
        }).then((res) => {
          // 用于显示 赠券有效期
          res.result.orderDetailList = res.result.orderDetailList.map((v) => {
            if(v.addGiftTicket > 0){
              v.addGiftPeriodStatus = true;
            }
            return v;
          });
          this.ruleForm = Object.assign(this.ruleForm,res.result);

          // 如果当前被驳回 或者 已加款 默认增加一条加款
          if(res.result.orderStatus === 3 || res.result.orderStatus === 2) {
            this.handleAdditionalMoney();
          }
        });
      },
      // 详情初始化
      initDetail(row) {
        this.additionalInformationType = 'detail';
        this.title = '合同加款详情';
        this.$http({
          url : '/contractOrder/queryOrderDetailByOrderId.htm',
          method : 'post',
          data : {
            orderId : row.orderId,
          },
        }).then((res) => {
          this.ruleForm = Object.assign(this.ruleForm,res.result);
        });
      },
      // 审核初始化
      initExamine(row) {
        this.additionalInformationType = 'detail';
        this.title = '合同加款审核';
        this.$http({
          url : '/contractOrder/queryOrderDetailByOrderId.htm',
          method : 'post',
          data : {
            orderId : row.orderId,
          },
        }).then((res) => {
          // 设置 如果当前是审核状态  初始化为 请选择
          res.result.orderDetailList = res.result.orderDetailList.map((v) => {
            if(v.orderStatus === 1) {
              v.resultStatusDefault = v.resultStatus;
              v.resultStatus = '';
            }
            return v;
          });
          this.ruleForm = Object.assign(this.ruleForm,res.result);
        });
      },
      // 审核详情初始化
      initExamineDetail(row) {
        this.additionalInformationType = 'detail';
        this.title = '合同加款审核详情';
        this.$http({
          url : '/contractOrder/queryOrderDetailByOrderId.htm',
          method : 'post',
          data : {
            orderId : row.orderId,
          },
        }).then((res) => {
          this.ruleForm = Object.assign(this.ruleForm,res.result);
        });
      },

      // 点击新增 加款
      handleAdditionalMoney() {
        this.ruleForm.orderDetailList.push({
          orderStatus : 0,
        });
      },
      // 新增加款 list 赠送仲卷 change
      handleAddGiftTicket(item,index) {
        let type = item.addGiftTicket > 0 ? true : false;
        if(type === false){
          this.ruleForm.orderDetailList[index].addGiftPeriod = '';
        }
        this.$set(item,'addGiftPeriodStatus',type);
      },
      // 新增加款 list 添加仲券
      handleAddTicket(item,index) {
        let type = item.addTicket > 0 ? true : false;
        if(type === false) {
          this.ruleForm.orderDetailList[index].addTicketAmt = 0;
        }else{
          this.ruleForm.orderDetailList[index].addTicketAmt = item.addTicket * this.multiple;
        }

        this.$nextTick(() => {
          this.handleComputedArrivalAmt(item,index);
        });
      },
      // 新增加款 list 计算到账金额
      handleComputedArrivalAmt(item,index) {
        let addTicketAmt = +item.addTicketAmt || 0;
        let addAmt = +item.addAmt || 0;
        let addService = +item.addService || 0;
        this.ruleForm.orderDetailList[index].arrivalAmt = (addTicketAmt + addAmt + addService) || '';
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        // 取消按钮禁用
        setTimeout(() => {
          this.submitDisabled = false;
        },500);

        //this.ruleForm = {};
        this.ruleForm.orderDetailList = [{}];

        // 重置表单
        this.$nextTick(() => {
          let arr = [
            'contractDate' , 'contractNo' , 'merchantCode' , 'preCaseAmt',
            'preCaseTicket' , 'preGiftPeriod' , 'preGiftTicket' , 'preServiceAmt' , 'preTicketAmt'
          ];
          arr.map((v,k) => {
            this.ruleForm[v] = '';
          });
          this.$refs.ruleForm.resetFields();
        });
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            this.submit(submitType);
          }
        });
      },
      // 处理提交 逻辑
      submit(submitType) {
        this.submitDisabled = true;
        let type = this.type;
        // 请求url
        let sendUrl  = '';
        // 请求数据
        let sendObj = {
          isCommit : submitType === 'save' ? 0 : 1,
        };
        // 新增
        if(type === 'add'){
          sendUrl = '/contractOrder/saveContractOrderInfo.htm';
          let sendDataArr = [
            'contractDate' , 'contractNo' , 'merchantCode' , 'preCaseAmt',
            'preCaseTicket' , 'preGiftPeriod' , 'preGiftTicket' , 'preServiceAmt' , 'preTicketAmt'
          ];
          sendDataArr.map((v,k) => {
            sendObj[v] = this.ruleForm[v];
          });
          sendObj.orderDetailList = (this.ruleForm.orderDetailList);
          sendObj.orderId = '';
          sendObj.merchantName = this.$refs.merchantCode.selectedLabel;
        // 编辑
        }else if(type === 'edit'){
          sendUrl = '/contractOrder/saveContractOrderInfo.htm';
          sendObj.orderId = this.ruleForm.orderId;
          sendObj.orderDetailList = (this.ruleForm.orderDetailList.filter((v) => {
            return v.orderStatus === 0;
          }));

        }

        this.$http({
          method : 'post',
          url : sendUrl,
          data : sendObj,
          mheaders : true,
        }).then((res) => {
          this.$message.success('操作成功');
          this.handleClose();
          this.$emit('successCBK');
        }).catch(() => {
          this.submitDisabled = false;
        });
      },
      // 点击审核
      handleExamine() {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            this.submitDisabled = true;
            let auditList = this.ruleForm.orderDetailList.map((v) => {
              return {
                apprerResult : v.apprerResult,
                detailId : v.detailId,
                resultStatus : v.resultStatus || v.resultStatusDefault,
                orderStatus : v.orderStatus,
              }
            });
            auditList = auditList.filter(v => v.orderStatus === 1);

            this.$http({
              method : 'post',
              url : '/contractOrder/auditContractOrder.htm',
              data : {
                orderId : this.ruleForm.orderId,
                auditList : (auditList),
              },
              mheaders : true,
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

<style lang="scss" scoped>

.contract-add-new-default-contract-addition{
  .pl-20{
    padding-left: 20px;
  }
  .text-left{
    text-align: left;
  }
  .m-h{
    min-height: 80px;
  }
}

</style>
