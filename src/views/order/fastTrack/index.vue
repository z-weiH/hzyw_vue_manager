<template>
  <div class="fast-track fn-hide">
    <div class="item-search">
      <el-form ref="ruleForm" :model="ruleForm">
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

        <el-select clearable class="mr-10" style="width:150px;" v-model="ruleForm.arbId" placeholder="请选择仲裁委">
          <template v-for="(item,index) in arbOptions">
            <el-option :key="item.arbId + index" :label="item.fullName" :value="item.arbId"></el-option>
          </template>
        </el-select>

        <el-select clearable class="mr-10" style="width:150px;" v-model="ruleForm.merchantCode" placeholder="请选择商户">
          <template v-for="(item,index) in merchantOptions">
            <el-option :key="item.code + index" :label="item.merchantName" :value="item.code"></el-option>
          </template>
        </el-select>

        <el-select clearable class="mr-10" style="width:150px;" v-model="ruleForm.busiCode" placeholder="请选择业务">
          <template v-for="(item,index) in busiOptions">
            <el-option :key="item.value + index" :label="item.label" :value="item.value"></el-option>
          </template>
        </el-select>


        <el-button @click="handleSearch" type="warning">提交</el-button>
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
      <el-pagination
        class="mt-10 mb-10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

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
        },
        rules : {},
        
        // 表格数据
        tableData : [{},{}],
        // 数据总数
        total : 11,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,

        // 仲裁委options 
        arbOptions : [
          {fullName : '张三' , arbId : '张三'}
        ],
        // 商户options
        merchantOptions : [
          {merchantName : '李四' , code : '李四'}
        ],
        // 业务编码options
        busiOptions : [
          {label : 'SUBMIT' , value : 'SUBMIT'}
        ],
      }
    },
    mounted() {
      this.initTableList();
      // 获取所有 仲裁委
      this.$http({
        method : 'post',
        url : '/arbitration/queryAllArbList.htm',
      }).then((res) => {
        this.arbOptions = res.result.list;
      });
      // 获取所有 商户
      this.$http({
        method : 'post',
        url : ' /merchant/queryAllMerchant.htm',
      }).then((res) => {
        this.merchantOptions = res.result.list;
      });
      // 获取所有 业务编码
    },
    methods : {
      // 点击搜索
      handleSearch() {
        this.initTableList();
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : ' /fastTrack/orderFastDeal.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
            arbId	: this.ruleForm.arbId,
            busiCode	: this.ruleForm.busiCode,
            loanBillNos	: this.ruleForm.loanBillNos,
            merchantCode	: this.ruleForm.merchantCode,
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

}

</style>