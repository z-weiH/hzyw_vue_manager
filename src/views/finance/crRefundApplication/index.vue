<template>
	<div class="cr-refund-application-box">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">案件仲券退款申请</a>
    </div>

		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
        <el-form-item label=" " prop="keyWords">
          <el-input @keyup.native.enter="handleSearch" v-model.trim="ruleForm.keyWords" placeholder="请输入申请人、被申请人、被申请人电话" style="width:300px;"></el-input>
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
        <el-table-column prop="settleType" label="结算类型" >
          <template slot-scope="scope">
            {{scope.row.settleType === 1 ? '仲券结算' : '比例结算'}}
          </template>
        </el-table-column>
        <el-table-column prop="borrowAmt" label="标的金额"></el-table-column>
        <el-table-column prop="caseTicket" label="扣除费用">
          <template slot-scope="scope">
            {{scope.row.settleType === 1 ? `仲券${scope.row.caseTicket}张` : `${scope.row.caseTicketFee}元`}}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="clientCode" label="客户号"></el-table-column>
        <el-table-column prop="clientName" label="客户名称"></el-table-column> -->
        <el-table-column prop="isRefund" label="是否已退" width="120px">
          <template slot-scope="scope">
            {{
              scope.row.isRefund === 0 ? '否' : '是'
            }}
          </template>

        </el-table-column>
        <el-table-column prop="submitTime" label="提交时间">
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.submitTime}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="caseStatusWz" label="案件状态">
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.caseStatusWz}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="130px">
          <template slot-scope="scope">
            <el-button v-if="scope.row.isRefund === 0" @click="handleRefundApplication(scope.row)" type="text">退券申请</el-button>
            <el-button @click="handleSee(scope.row)" type="text">查看</el-button>
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

      <detailDialog ref="detailDialog"></detailDialog>
      <applyRefundDialog @successCBK="successCBK" ref="applyRefundDialog"></applyRefundDialog>
    </div>
	</div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import detailDialog from '@/views/case/caseManagement/modules/detailDialog.vue'
  import applyRefundDialog from './modules/applyRefundDialog.vue'
	export default {
		components : {
      timeFrame,
      detailDialog,
      applyRefundDialog,
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
        total : 0,
        // 当前页数
        currentPage : 1,
        // 每页数量
				pageSize : 10,

			}
    },
    mounted() {
      //this.initTableList();

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
        if(!this.ruleForm.keyWords && !this.ruleForm.clientCode) {
          this.$message.warning('请输入关键字、或者选择客户进行查询');
          return;
        }
				this.currentPage = 1;
        this.initTableList();
      },

      // 点击退款退款申请
      handleRefundApplication(row) {
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
          settleType: row.settleType,

          caseTicketFee: row.caseTicketFee
        };
        this.$refs.applyRefundDialog.show(obj);
      },
      successCBK() {
        this.initTableList();
      },
      // 点击 查看
      handleSee(row) {
        let loading = this.$loading();
        this.$http({
          method : 'post',
          url : '/casemanage/selectCaseDetailByCaseId.htm',
          data : {
            caseId : row.caseId,
          },
        }).then((res) => {
          loading.close();
          this.$refs.detailDialog.show(res.result);
        },(err) => {
          loading.close();
        });
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
