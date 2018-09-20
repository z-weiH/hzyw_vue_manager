<template>
	<div class="cr-refund-view-box">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">案件仲卷退款查看</a>
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
        <el-table-column prop="resPhone" label="被申请人手机" width="150px"></el-table-column>
        <el-table-column prop="borrowAmt" label="标的金额"></el-table-column>
        <el-table-column prop="caseTicket" label="案件仲券"></el-table-column>
        <el-table-column prop="refundStatus" label="退款状态">
          <template slot-scope="scope">
            {{
              scope.row.refundStatus === 1 ? '待审核' :
              scope.row.refundStatus === 2 ? '已通过' :
              scope.row.refundStatus === 3 ? '不通过' : ''
            }}
          </template>
        </el-table-column>
        <el-table-column prop="applyName" label="申请人姓名"></el-table-column>
        <el-table-column prop="applyTime" label="申请时间">
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.applyTime}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
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
    </div>
	</div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import detailDialog from '@/views/case/caseManagement/modules/detailDialog.vue'
	export default {
		components : {
      timeFrame,
      detailDialog,
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
        tableData : [{caseId : 1537239084742}],
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
      
      // 查看
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
          url : '/ticketRefund/queryTicketRefundByFinancialManager.htm',
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

.cr-refund-view-box{
	
}

</style>

<style lang="scss">

.cr-refund-view-box{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
}

</style>