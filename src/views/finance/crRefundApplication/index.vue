<template>
	<div class="cr-refund-application-box">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">案件仲卷退款申请</a>
    </div>

		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
        <el-form-item label=" " prop="keyWords">
          <el-input v-model.trim="ruleForm.keyWords" placeholder="请输入申请人、被申请人、被申请人电话" style="width:300px;"></el-input>
        </el-form-item>

        <el-form-item label=" " prop="clientCode">
          <el-select filterable clearable v-model="ruleForm.clientCode" placeholder="请选择客户">
            <template v-for="(item,index) in merchantOptions">
              <el-option :key="item.code + index" :label="item.merchantName" :value="item.code"></el-option>
            </template>
          </el-select>
        </el-form-item>

        <el-button @click="handleSearch" type="warning">查询</el-button>
      </el-form>
    </div>

		<div class="item-table">
      <el-table
        :data="tableData"
        border
      >
        <el-table-column prop="date" label="序号" width="50px">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
				<el-table-column prop="applicants" label="申请人"></el-table-column>
        <el-table-column prop="respondents" label="被申请人"></el-table-column>
        <el-table-column prop="resPhone" label="被申请人手机" width="120px"></el-table-column>
        <el-table-column prop="borrowAmt" label="标的金额"></el-table-column>
        <el-table-column prop="caseTicket" label="案件仲券"></el-table-column>
        <!-- <el-table-column prop="clientCode" label="客户号"></el-table-column>
        <el-table-column prop="clientName" label="客户名称"></el-table-column> -->
        <el-table-column prop="isRefund" label="是否已退仲券" width="120px">
          <template slot-scope="scope">
            {{
              scope.row.isRefund === 0 ? '否' : '是'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="submitTime" label="提交时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button v-if="scope.row.isRefund === 0" @click="handleRefundApplication(scope.row)" type="text">退款申请</el-button>
            <span v-else>--</span>
          </template>
        </el-table-column>
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
	import timeFrame from '@/components/timeFrame.vue'
	export default {
		components : {
			timeFrame,
		},
		data() {
			return {
				ruleForm : {
					// 关键字
          keyWords : '',
          // 客户号
          clientCode : '',
				},
        rules : {},
        // 客户 options
        merchantOptions : [],

				// 表格数据
        tableData : [],
        // 数据总数
        total : 11,
        // 当前页数
        currentPage : 1,
        // 每页数量
				pageSize : 10,
				
			}
    },
    mounted() {
      this.initTableList();

      // 获取所有 客户
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
				this.currentPage = 1;
        this.initTableList();
      },
      
      // 点击退款退款申请
      handleRefundApplication(row) {
        this.$confirm('确认申请退款?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel',
          confirmButtonClass: 'confirm',
          center: true,
        }).then(() => {
          let obj = {
            applicants : row.applicants,
            borrowAmt : row.borrowAmt,
            caseId : row.caseId,
            caseOrderId : row.caseOrderId,
            caseTicket : row.caseTicket,
            clientCode : row.clientCode,
            clientName : row.clientName,
            resPhone : row.resPhone,
            respondents : row.respondents,
          };
          this.$http({
            method : 'post',
            url : '/ticketRefund/saveTicketRefundApply.htm',
            data : obj,
          }).then((res) => {
            this.$message.success('已提交申请');
            this.initTableList();
          });
        }).catch(() => {});
      },

			// 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/ticketRefund/queryTicketRefundByFinancialStaff.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,

            ...this.ruleForm,
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

<style lang="scss" scoped>

.cr-refund-application-box{
	
}

</style>

<style lang="scss">

.cr-refund-application-box{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
}

</style>