<template>
	<div class="contract-deduction-audit">
		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
        <el-form-item label="签约客户:" prop="clientCode" label-width="100px">
          <el-select filterable clearable v-model="ruleForm.clientCode">
            <el-option :label="item.merchantName" :value="item.code" v-for="(item,index) in clientOptions" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态:" prop="deductionStatus" label-width="50px">
          <el-select clearable v-model="ruleForm.deductionStatus">
            <el-option label="全部" value=""></el-option>
            <el-option label="已扣款" :value="1"></el-option>
            <el-option label="待处理" :value="0"></el-option>
            <el-option label="未通过" :value="2"></el-option>
          </el-select>
        </el-form-item>

        <el-button @click="handleSearch" type="warning">查询</el-button>
        <el-button @click="handleExport" type="primary">导出Excel</el-button>
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
				<el-table-column prop="clientName" label="客户名称"></el-table-column>
        <el-table-column prop="deductionTypeDesc" label="结算类型">
          <!--<template slot-scope="scope">-->
            <!--{{scope.row.deductionType == 0 ? '仲券结算' :  '比例结算'}}-->
          <!--</template>-->
        </el-table-column>
        <el-table-column prop="deductionTicket" label="扣除服务费">
          <template slot-scope="scope">
            {{scope.row.deductionType == 2 ? scope.row.deductionTicket4Fee : '/'}}
          </template>
        </el-table-column>
        <el-table-column prop="deductionTicket" label="扣除仲券">
          <template slot-scope="scope">
            {{scope.row.deductionType == 0 ? scope.row.deductionTicket : '/'}}
          </template>
        </el-table-column>
        <el-table-column prop="deductionAmt" label="扣除仲裁费">
          <template slot-scope="scope">
            {{scope.row.deductionType == 1 ? scope.row.deductionAmt : '/'}}
          </template>
        </el-table-column>
        <el-table-column prop="deductionDesc" label="扣除说明"></el-table-column>
        <el-table-column prop="verifyTime" label="审核时间">
          <template slot-scope="scope">
            {{scope.row.verifyTime || '--'}}
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <template v-if="scope.row.deductionStatus === 0">
              <el-button type="text" @click="handleExamine(scope.row)">待处理</el-button>
            </template>
            <template v-else-if="scope.row.deductionStatus === 1">
              <el-button type="text" @click="handleDetail(scope.row)">已扣款</el-button>
            </template>
            <template v-else>
              <el-button type="text" @click="handleDetail(scope.row)">未通过</el-button>
            </template>
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

    <detailDialog ref="detailDialog"></detailDialog>
    <examineDialog @successCBK="initTableList" ref="examineDialog"></examineDialog>
	</div>
</template>

<script>
  import detailDialog from '../acontractDeduction/modules/detailDialog.vue'
  import examineDialog from './modules/examineDialog.vue'
  import exportFile from '@/assets/js/exportFile'

	export default {
    components : {
      detailDialog,
      examineDialog,
    },
		data() {
			return {
				ruleForm : {
					// 关键字
					clientCode : '',
				},
        rules : {},
        // 客户options
        clientOptions : [],

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
      this.initClientOptions();
      this.initTableList();
    },
		methods : {
      // 获取客户options
      initClientOptions() {
        this.$http({
          method : 'post',
          url : '/case/queryCustomerList.htm',
        }).then((res) => {
          this.clientOptions = res.result;
        });
      },
			// 点击搜索
			handleSearch() {
				this.currentPage = 1;
        this.initTableList();
      },
      // 详情
      handleDetail(row) {
        this.$refs.detailDialog.show(row,'sh');
      },
      // 审核
      handleExamine(row) {
        this.$refs.examineDialog.show(row);
      },
      handleExport() {
        exportFile({
          url : '/dedution/queryContractDedutionVerifyOut.htm',
          data : {
            clientCode : this.ruleForm.clientCode,
            deductionStatus : this.ruleForm.deductionStatus,
          },
        });
      },

			// 表格相关 start

      // 初始化 表格数据
      initTableList() {
        return this.$http({
          url : '/dedution/queryContractVerifyByPage.htm',
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

.contract-deduction-audit{

}

</style>

<style lang="scss">

.contract-deduction{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
}

</style>
