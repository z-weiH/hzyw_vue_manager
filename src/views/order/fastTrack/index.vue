<template>
  <div class="fast-track">
    <div class="item-search">
      <el-form :rules="rules" ref="ruleForm" :model="ruleForm">
        <el-form-item label=" " prop="loanBillNos">
          <el-input 
            style="width:100%;"
            type="textarea" 
            v-model.trim="ruleForm.loanBillNos" 
            placeholder="请输入借款单号，多个单号以英文逗号隔开"
            :autosize="{ minRows: 3, maxRows: 3}"
          >
          </el-input>
        </el-form-item>

        <!-- <el-form-item style="display:inline-block;" label=" " prop="arbId">
          <el-select filterable clearable class="mr-10" style="width:150px;" v-model="ruleForm.arbId" placeholder="请选择仲裁委">
            <template v-for="(item,index) in arbOptions">
              <el-option :key="item.arbId + index" :label="item.arbName" :value="item.arbId"></el-option>
            </template>
          </el-select>
        </el-form-item> -->

        <el-form-item style="display:inline-block;" label=" " prop="merchantCode">
          <el-select @change="handleMerchantCodeChange" filterable clearable class="mr-10" style="width:150px;" v-model="ruleForm.merchantCode" placeholder="请选择客户">
            <template v-for="(item,index) in merchantOptions">
              <el-option :key="item.code + index" :label="item.merchantName" :value="item.code"></el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item style="display:inline-block;" label=" " prop="busiCode">
          <el-select @change="handleChange" clearable class="mr-10" style="width:150px;" v-model="ruleForm.busiCode" placeholder="请选择业务">
            <template v-for="(item,index) in busiOptions">
              <el-option :key="item.id + index" :label="item.desc" :value="item.id"></el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item v-if="ruleForm.busiCode === 'SUBMIT'" style="display:inline-block;" label=" " prop="prodCode">
          <el-select clearable class="mr-10" style="width:150px;" v-model="ruleForm.prodCode" placeholder="请选择产品">
            <template v-for="(item,index) in prodOptions">
              <el-option :key="item.prodCode + index" :label="item.prodName" :value="item.prodCode"></el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-form-item style="display:inline-block;width:270px;" label="推送预审库：" prop="type">
          <el-select clearable class="mr-10" style="width:150px;" v-model="ruleForm.type" placeholder="请选择">
            <el-option label="是" value="client"></el-option>
            <el-option label="否" value="hz"></el-option>
          </el-select>
        </el-form-item>

        <div>
          <el-form-item style="display:inline-block;width:670px;" label="整合步骤：" prop="step">
            <el-checkbox-group v-model="ruleForm.step">
              <el-checkbox label="FETCH_CUSTOMER_INFO">获取客户数据</el-checkbox>
              <el-checkbox label="CREATE_REQUISITION">生成申请书</el-checkbox>
              <el-checkbox label="DOWNLOAD_AND_INTEGRATION">下载并整合证据链</el-checkbox>
            </el-checkbox-group>
          </el-form-item>

          <div class="fr">
            <el-button @click="handleSearch" type="warning">提交</el-button>
          </div>
        </div>
      </el-form>
    </div>

    <div class="item-title">
      快速通道
    </div>

    <div class="item-table">
      <el-table
        :data="tableData"
        border
      >
        <el-table-column prop="date" label="序号">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="loanBillNo" label="借款单号"></el-table-column>
        <el-table-column prop="result" label="处理结果"></el-table-column>
      </el-table>
      <!-- 分页 -->
      <!-- <el-pagination
        class="mt-10 mb-10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination> -->

    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm : {
          // 借款单号	
          loanBillNos : '',
          // 仲裁委ID
          arbId : '',
          // 商户ID	
          merchantCode : '',
          // 业务编码
          busiCode : '',
          // 产品 id
          prodCode : '',
          // 是否推送预审库 client 是 hz否
          type : 'client',
          // 整合步骤 FETCH_CUSTOMER_INFO获取客户数据 CREATE_REQUISITION生成申请书 DOWNLOAD_AND_INTEGRATION下载并整合证据链
          step : [],
        },
        rules : {
          loanBillNos : [
            {required : true , message : '请输入借款单号' , trigger : 'blur'}
          ],
          arbId : [
            {required : true , message : '请选择仲裁委' , trigger : 'change'}
          ],
          merchantCode : [
            {required : true , message : '请选择商户' , trigger : 'change'}
          ],
          busiCode : [
            {required : true , message : '请选择业务编码' , trigger : 'change'}
          ],
        },
        
        // 表格数据
        tableData : [],
        // 数据总数
        total : 0,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,

        // 仲裁委options 
        arbOptions : [
          /* {arbName : '张三' , arbId : '张三'} */
        ],
        // 商户options
        merchantOptions : [
          /* {merchantName : '李四' , code : '李四'} */
        ],
        // 业务编码options
        busiOptions : [
          {desc : 'SUBMIT' , id : 'SUBMIT'},
          {desc : 'APPLICATION' , id : 'APPLICATION'},
        ],
        // 产品 option
        prodOptions : [],
      }
    },
    mounted() {
      // this.initTableList();
      // 获取所有 仲裁委
      this.$http({
        method : 'post',
        url : '/arb/queryAllArbList.htm',
      }).then((res) => {
        this.arbOptions = res.result;
      });
      // 获取所有 商户
      this.$http({
        method : 'post',
        url : '/merchant/queryMerchants.htm',
      }).then((res) => {
        this.merchantOptions = res.result.list;
      });
      
    },
    methods : {
      // 点击搜索
      handleSearch() {
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            this.currentPage = 1;
            this.initTableList();
          }
        });
      },

      // 业务change
      handleChange(val) {
        this.ruleForm.prodCode = '';
      },
      // 商户 cahnge
      handleMerchantCodeChange() {
        this.ruleForm.prodCode = '';
        this.initProduct();
      },
      // 更新 产品 下拉
      initProduct() {
        // 获取所有产品 option
        this.$http({
          method : 'post',
          url : '/fastTrack/queryProdSelectByClientCode.htm',
          data : {
            clientCode : this.ruleForm.merchantCode,
          },
        }).then((res) => {
          this.prodOptions = res.result;
        });
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/fastTrack/orderFastDeal.htm',
          method : 'post',
          data : {
            /* pageSize : this.pageSize,
            currentNum : this.currentPage, */

            arbId	: this.ruleForm.arbId,
            busiCode	: this.ruleForm.busiCode,
            loanBillNos	: this.ruleForm.loanBillNos,
            merchantCode	: this.ruleForm.merchantCode,
            prodCode : this.ruleForm.prodCode,
            type : this.ruleForm.type,
            step : this.ruleForm.step.join(','),
          },
        }).then((res) => {
          this.total = res.result.count;
          this.tableData = res.result.list;
        });
      },
      // 页数 change
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.initTableList();
      },
      // 分页 change
      handleCurrentChange(val) {
        this.currentPage = val; 
        this.initTableList();
      },

      // 表格相关 end
    },
  }
</script>

<style lang="scss">

.fast-track{
  .el-form-item.is-required .el-form-item__label:before{
    display: none;
  }
}

</style>