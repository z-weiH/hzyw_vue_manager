<template>
  <div class="hear-case-list-dialog">
    <el-dialog
      title="分配案件"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <div class="mb-5">
            <span class="icon-sign">筛选条件</span>
          </div>

          <el-form-item label="互金企业" prop="merchantCode">
            <el-select
              style="width:100%"
              v-model="ruleForm.merchantCode"
              clearable
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词进行检索"
              :remote-method="remoteMethod"
              @change="handleMerchantCodeChange"
            >
              <el-option
                v-for="(item,index) in merchantOptions"
                :key="item.code + '' + index "
                :label="item.merchantName"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="模版" prop="productId">
            <el-select
              style="width:200px"
              v-model="ruleForm.productId"
              clearable
              placeholder="请选择"
              @change="handleProductIdChange"
            >
              <el-option
                v-for="(item,index) in productOptions"
                :key="item.prodCode + '' + index "
                :label="item.prodName"
                :value="item.prodCode">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="账龄" prop="accountPeriodType">
            <el-select clearable style="width:200px;" v-model="ruleForm.accountPeriodType" placeholder="请选择账龄">
              <el-option label="1~30天" value="M0"></el-option>
              <el-option label="31~60天" value="M1"></el-option>
              <el-option label="61~90天" value="M2"></el-option>
              <el-option label="91~120天" value="M3"></el-option>
              <el-option label="121~150天" value="M4"></el-option>
              <el-option label="151~180天" value="M5"></el-option>
              <el-option label="181~210天" value="M6"></el-option>
              <el-option label="211~240天" value="M7"></el-option>
              <el-option label="241~270天" value="M8"></el-option>
              <el-option label="271~300天" value="M9"></el-option>
              <el-option label="301~330天" value="M10"></el-option>
              <el-option label="331~360天" value="M11"></el-option>
              <el-option label="360天以上" value="M12"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="推送日期">
            <timeFrame
              :startDate.sync="ruleForm.pushStartDate"
              :endDate.sync="ruleForm.pushEndDate"
              startPlaceholder="推送开始"
              endPlaceholder="推送结束"
              :requiredName="['pushStartDate','pushEndDate']"
            >

            </timeFrame>
          </el-form-item>

          <div class="mb-5">
            <span class="icon-sign">筛选结果</span>
          </div>

          <div class="screening-results">
            共找到案件
            <span class="color-origin">{{totalCount}}</span>
            件，待分配
            <span class="color-origin">
              {{
                undistributeTotalCount >= 0 ? undistributeTotalCount : ''
              }}
            </span>
          </div>

          <div>
            <span class="icon-sign">案件分配</span>
          </div>

          <ul class="case-distribution">
            <template v-for="(item,index) in ruleForm.allocationList">

              <li :Key="index">
                <el-form-item :label="item.userName"
                  :prop="`allocationList.${index}.count`"
                  :rules="[

                    {pattern : /^[0-9]*$/, message : '格式有误' , trigger : 'change'},
                  ]"
                >
                  <el-input
                    :disabled="item.disabled === true ? true : false"
                    @input.native="handleAuditedChange(item.count,index,item)"
                    style="width:200px;"
                    v-model="item.count" placeholder="请输入"
                  /><span class="ml-10">件</span>
                  （
                  <span class="color-origin">{{item.unDealCount}}</span>
                  件待审核）
                </el-form-item>
              </li>

            </template>
          </ul>

        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button :disabled="submitDisabled" type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  export default {
    components : {
      timeFrame
    },
    data() {
      return {
        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,

        ruleForm : {
          // 互金企业
          merchantCode : '',
          // 产品
          productId : '',
          // 账龄
          accountPeriodType : '',
          // 推送开始日期
          pushStartDate : '',
          // 推送结束日期
          pushEndDate : '',

          // 运营人员 列表
          allocationList : [
            /* {
              // 运营人员 姓名
              userName : '啦啦啦方法',
              // 运营人员 id
              userId : '1',
              // 已分配 数量
              count : '',
              // 待审核 数量
              unDealCount : '',
              // 当前是否 禁用
              disabled : false,
              // 保存案件分配 上次输入的数据
              countOld : '',
            }, */
          ],
        },
        rules : {
          merchantCode : [
            {required : true , message : '请选择互金企业' , trigger : 'change'},
          ],
          productId : [
            {required : true , message : '请选择产品' , trigger : 'change'},
          ],
        },

        // 互金企业 options
        merchantOptions : [
          /* {merchantName : '张三' , code : '张三'} */
        ],
        // 产品 options
        productOptions : [
          /* {prodName : '产品' , prodCode : '产品'} */
        ],

        // 总案件数量
        totalCount : '0',
        // 待分配案件数量
        undistributeTotalCount : '0',
        // 待分配案件数量 - 暂存值
        undistributeTotalCountStorage : '0',
      }
    },
    mounted() {

    },
    watch : {
      ['ruleForm.pushStartDate']() {
        this.handleTimeChange();
      },
      ['ruleForm.pushEndDate']() {
        this.handleTimeChange();
      },
      ['ruleForm.accountPeriodType']() {
        this.handleTimeChange();
      },
    },
    methods : {
      show() {
        this.dialogVisible = true;
        // 初始化 查询全部互金企业
        this.remoteMethod('');
        // 查询所有运营 人员
        this.$http({
          method : 'post',
          url : '/preCaseLib/queryUserAndDistributeCaseInfo.htm',
        }).then((res) => {
          this.ruleForm.allocationList = res.result.map((v) => {
            v.count = '';
            v.disabled = true;
            v.countOld = '';
            return v;
          });
        });
      },

      // 更新筛选结果
      updateResult() {
        // 重置 人员待分配 数量
        this.ruleForm.allocationList = this.ruleForm.allocationList.map((v) => {
          v.count = '';
          return v;
        });
        // 重置 总案件数量 和 待分配案件数量
        this.totalCount = 0;
        this.undistributeTotalCount = 0;
        // 禁止 运营人员输入
        this.ruleForm.allocationList = this.ruleForm.allocationList.map((v) => {
          v.disabled = true;
          return v;
        });
        // 如果没有 互金企业 或者 企业 不查询筛选结果
        if(!this.ruleForm.merchantCode || !this.ruleForm.productId){
          return;
        }
        this.$http({
          method : 'post',
          url : '/preCaseLib/queryUnDistributeCaseInfoByCondition.htm',
          data : {
            accountPeriodType : this.ruleForm.accountPeriodType,
            merchantCode : this.ruleForm.merchantCode,
            productId : this.ruleForm.productId,
            pushEndDate : this.ruleForm.pushEndDate,
            pushStartDate : this.ruleForm.pushStartDate,
          },
        }).then((res) => {
          // 需求修改 初始化时 总案件数 一定等于 待分配件数 
          this.totalCount = res.result.undistributeTotalCount;
          this.undistributeTotalCount = res.result.undistributeTotalCount;
          this.undistributeTotalCountStorage = res.result.undistributeTotalCount;
          // 开启 运营人员输入
          this.ruleForm.allocationList = this.ruleForm.allocationList.map((v) => {
            v.disabled = false;
            return v;
          });
        });
      },

      // 互金企业搜索
      remoteMethod(query) {
        this.$http({
          method : 'post',
          url : '/merchant/queryPreMerchantName.htm',
          data : {
            keyWords : query,
          },
        }).then((res) => {
          this.merchantOptions = res.result;
        });
      },
      // 互金企业change
      handleMerchantCodeChange(val) {
        // 清空 产品options ro 保存的产品 id
        this.productOptions = [];
        this.ruleForm.productId = '';

        if(!val) {
          this.updateResult();
          this.$refs.ruleForm.validateField(`productId`);
          return;
        }
        // 根据互金企业 查询 产品
        this.$http({
          method : 'post',
          url : '/merchant/selectMerchantProductByMerchantCode.htm',
          data : {
            merchantCode : val,
          },
        }).then((res) => {
          this.productOptions = res.result;
          this.updateResult();
        });
      },
      // 产品 change
      handleProductIdChange(val) {
        this.updateResult();
      },
      // 推送时间范围 change
      handleTimeChange() {
        this.updateResult();
      },
      // 案件分配 change
      handleAuditedChange(val,index,item) {
        // 通过校验
        if(/^[0-9]*$/.test(val)){
          // 判断用户输入第一位 不能为0
          if(val[0] == '0'){
            val = '';
            setTimeout(() => {
              this.ruleForm.allocationList[index].count = '';
            },0);
          // 如果所填 大于 总数量 默认最大数量值
          }else if(val > (+this.undistributeTotalCount) + (+item.countOld) ) {
            // 如果当前 可分配为 0 ， 重置为 之前数据
            if(this.undistributeTotalCount == '0') {
              val = item.countOld;
              setTimeout(() => {
                this.ruleForm.allocationList[index].count = val;
              },0);

            }else{
              // 设为最大
              let max = (+this.undistributeTotalCount) + (+item.countOld);
              this.ruleForm.allocationList[index].count = max;
              val = max;
            }
          // 正常处理数据
          }else{
            if(+val > +item.countOld){
              // 如果当前 可分配为 0 ， 重置为 之前数据
              if(this.undistributeTotalCount == '0') {
                val = item.countOld;
                setTimeout(() => {
                  this.ruleForm.allocationList[index].count = val;
                },0);
              }
            }
          }

          // 更新 待分配数量
          setTimeout(() => {
            // 当前案件分配 已分配数量
            let countMax = 0;
            this.ruleForm.allocationList.map((v) => {
              countMax = countMax + (+v.count);
            });
            this.undistributeTotalCount = (+this.undistributeTotalCountStorage) - countMax;
          },0);
        // 格式有误
        }else{
          setTimeout(() => {
            // 重置当前输入 为空
            this.ruleForm.allocationList[index].count = '';
            // 重新计算 待分配数量
            let countMax = 0;
            this.ruleForm.allocationList.map((v) => {
              countMax = countMax + (+v.count);
            });
            this.undistributeTotalCount = (+this.undistributeTotalCountStorage) - countMax;
          },0);
        }
        this.ruleForm.allocationList[index].countOld = val;
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        // 取消按钮禁用
        setTimeout(() => {
          this.submitDisabled = false;
          this.$refs.ruleForm.resetFields();
        },500);

        // 禁止 运营人员输入
        this.ruleForm.allocationList = this.ruleForm.allocationList.map((v) => {
          v.disabled = true;
          return v;
        });
        // 重置 总案件数量 和 待分配案件数量
        this.totalCount = 0;
        this.undistributeTotalCount = 0;
        // 清空下拉框数据
        this.merchantOptions = [];
        this.productOptions = [];

      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            // 校验待分配案件 是否变动
            if(this.undistributeTotalCount === this.undistributeTotalCountStorage){
              this.$message.warning('请至少分配一件案件');
              return;
            }

            let data = {...this.ruleForm};
            // 处理数据
            data.allocationList = (data.allocationList.map((v) => {
              return {
                count : v.count,
                userId : v.userId,
                userName : v.userName,
              }
            }));
            this.submitDisabled = true;
            this.$http({
              method : 'post',
              url : '/preCaseLib/distributeCaseByDistributeCaseQuery.htm',
              data : data,
              mheaders : true,
            }).then((res) => {
              this.$message.success('分配成功');
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

<style lang="scss">

.hear-case-list-dialog{
  .color-origin{
    color: #EEAB31;
  }
  .time-frame{
    .el-form-item{
      display: inline-block;
    }
    .m-span{
      margin-top: 0;
      margin-left: 5px;
    }
  }

  .screening-results{
    padding-left: 30px;
    margin-bottom: 10px;
  }
  .case-distribution{
    .el-form-item.is-required .el-form-item__label:before{
      display: none;
    }
  }
}

</style>
