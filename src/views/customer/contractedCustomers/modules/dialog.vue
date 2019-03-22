<template>
  <div class="customer-contracted-customers-dialog">
    <el-dialog
      :title="type === 'add' ? '新增' : type === 'edit' ? '修改' : '详情'"
      :visible.sync="dialogVisible"
      width="610px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="150px" v-show="type !== 'detail'">
          
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

          <el-form-item label="系统对接完成时间：" prop="finishTime">
						<el-date-picker 
							type="date"
							v-model="ruleForm.finishTime"
							value-format="yyyy-MM-dd"
              placeholder="选择日期"
              style="width:400px;" 
						>
						</el-date-picker>
					</el-form-item>

          <el-form-item label="均件：" prop="averageQuantity">
						<el-input type="number" style="width:400px;" v-model.trim="ruleForm.averageQuantity" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="月放款量：" prop="lendingVolume">
						<el-input style="width:400px;" v-model.trim="ruleForm.lendingVolume" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="放款单数：" prop="totalCount">
						<el-input type="number" style="width:400px;" v-model.trim="ruleForm.totalCount" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="预计提交案件逾期天数：" prop="overdueDay">
						<el-input type="number" style="width:400px;" v-model.trim="ruleForm.overdueDay" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="月新增逾期件数：" prop="overdueRate">
						<el-input style="width:400px;" v-model.trim="ruleForm.overdueRate" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="存量多少：" prop="stockCount">
						<el-input style="width:400px;" v-model.trim="ruleForm.stockCount" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="放款量前10的省份：" prop="provinceOrder">
						<el-input style="width:400px;" v-model.trim="ruleForm.provinceOrder" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="月新增逾期总标的（万元）：" prop="customerExpect">
						<el-input style="width:400px;" v-model.trim="ruleForm.customerExpect" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="客户是否可以债转：" prop="debtTransfer">
            <el-select clearable v-model="ruleForm.debtTransfer" placeholder="请选择打款状态" style="width:400px;" >
              <el-option label="可债转" :value="1"></el-option>
              <el-option label="不可债转" :value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="备注：" prop="remark">
						<el-input type="textarea" style="width:400px;" v-model.trim="ruleForm.remark" placeholder="请输入"></el-input>
					</el-form-item>

        </el-form>

        <div v-if="type === 'detail'">
          <ul>
            <li class="item">
              <div class="item-label">销售：</div>
              <div class="item-value">{{ruleForm.salesman}}</div>
            </li>
            <li class="item">
              <div class="item-label">运营：</div>
              <div class="item-value">{{ruleForm.operator}}</div>
            </li>
            <li class="item">
              <div class="item-label">客户名称：</div>
              <div class="item-value">{{ruleForm.clientName}}</div>
            </li>
            <li class="item">
              <div class="item-label">产品名称：</div>
              <div class="item-value">{{ruleForm.productName}}</div>
            </li>
            <li class="item">
              <div class="item-label">业务模式：</div>
              <div class="item-value">{{ruleForm.bizMode}}</div>
            </li>
            <li class="item">
              <div class="item-label">资金来源：</div>
              <div class="item-value">{{ruleForm.sourceFund}}</div>
            </li>
            <li class="item">
              <div class="item-label">资金方：</div>
              <div class="item-value">{{ruleForm.capitalSide}}</div>
            </li>
            <li class="item">
              <div class="item-label">获得债权依据：</div>
              <div class="item-value">{{ruleForm.bondBasis}}</div>
            </li>
            <li class="item">
              <div class="item-label">合同签订时间：</div>
              <div class="item-value">{{ruleForm.contractTime}}</div>
            </li>
            <li class="item">
              <div class="item-label">是否完成付款：</div>
              <div class="item-value">{{ruleForm.isPay === 1 ? '已付款' : '未付款'}}</div>
            </li>
            <li class="item">
              <div class="item-label">第一次打款时间：</div>
              <div class="item-value">{{ruleForm.firstPayTime}}</div>
            </li>
            <li class="item">
              <div class="item-label">协议是否上线：</div>
              <div class="item-value">{{ruleForm.agreementStatus === 1 ? '已上线' : '未上线'}}</div>
            </li>
            <li class="item">
              <div class="item-label">协议上线时间：</div>
              <div class="item-value">{{ruleForm.arbitrationTime}}</div>
            </li>
            <li class="item">
              <div class="item-label">协议上线区域：</div>
              <div class="item-value">{{ruleForm.agreementRegion}}</div>
            </li>
            <li class="item">
              <div class="item-label">系统是否完成对接：</div>
              <div class="item-value">{{ruleForm.finishAbutment === 1 ? '已上线' : '未上线'}}</div>
            </li>
            <li class="item">
              <div class="item-label">系统对接完成时间：</div>
              <div class="item-value">{{ruleForm.finishTime}}</div>
            </li>
            <li class="item">
              <div class="item-label">均件：</div>
              <div class="item-value">{{ruleForm.averageQuantity}}</div>
            </li>
            <li class="item">
              <div class="item-label">月放款量：</div>
              <div class="item-value">{{ruleForm.lendingVolume}}</div>
            </li>
            <li class="item">
              <div class="item-label">放款单数：</div>
              <div class="item-value">{{ruleForm.totalCount}}</div>
            </li>
            <li class="item">
              <div class="item-label">预计提交案件逾期天数：</div>
              <div class="item-value">{{ruleForm.overdueDay}}</div>
            </li>
            <li class="item">
              <div class="item-label">月新增逾期件数：</div>
              <div class="item-value">{{ruleForm.overdueRate}}</div>
            </li>
            <li class="item">
              <div class="item-label">存量多少：</div>
              <div class="item-value">{{ruleForm.stockCount}}</div>
            </li>
            <li class="item">
              <div class="item-label">放款量前10的省份：</div>
              <div class="item-value">{{ruleForm.provinceOrder}}</div>
            </li>
            <li class="item">
              <div class="item-label">月新增逾期总标的（万元）：</div>
              <div class="item-value">{{ruleForm.customerExpect}}</div>
            </li>
            <li class="item">
              <div class="item-label">客户是否可以债转：</div>
              <div class="item-value">{{ruleForm.debtTransfer === 1 ? '可债转' : '不可债转'}}</div>
            </li>
            <li class="item">
              <div class="item-label">备注：</div>
              <div class="item-value">{{ruleForm.remark}}</div>
            </li>
          </ul>
        </div>
      </div>

      <span slot="footer" class="dialog-footer" v-if="type !== 'detail'">
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
          // 均件
          averageQuantity : '',
          // 月放款量
          lendingVolume : '',
          // 放款单数
          totalCount : '',
          // 预计提交案件逾期天数
          overdueDay : '',
          // 月新增逾期件数
          overdueRate : '',
          // 存量多少
          stockCount : '',
          // 放款量前10的省份
          provinceOrder : '',
          // 月新增逾期总标的（万元）
          customerExpect : '',
          // 客户是否可以债转 1-可债转,0-不可债转
          debtTransfer : '',
          // 备注
          remark : '',
        },
        rules : {
          salesman : [
            {required : true , message : '请输入销售' , trigger : 'blur'},
          ],
          /* operator : [
            {required : true , message : '请输入运营' , trigger : 'blur'},
          ], */
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
        this.type = type;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        this.$nextTick(() => {
          // 处理逻辑 写在nextTick中 ， 防止dialog没有加载数据问题
          if(type === 'edit' || type === 'detail') {
            this.id = data.id;
            // 获取回显数据
            this.$http({
              method : 'post',
              url : '/contracted/selectCustomerInfoById.htm',
              data : {
                id : data.id,
              },
            }).then((res) => {
              this.ruleForm = Object.assign(this.ruleForm,res.result);
            });
          }
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
              form.id = this.id;
            }
						this.$http({
              method : 'post',
              url : '/contracted/saveCustomerInfo.htm',
              data : form,
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

.customer-contracted-customers-dialog{
  .item{
    overflow: hidden;
    margin-bottom: 10px;
  }
  .item-label{
    width: 150px;
    float: left;
    text-align: right;
  }
  .item-value{
    float: left;
    width: calc(100% - 150px);
    word-wrap: break-word;
    word-break: normal;
    word-break: break-all;
  }
}

</style>
