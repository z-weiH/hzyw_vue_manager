<template>
	<div class="case-operation-record-box">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">案件操作记录</a>
    </div>

		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
        <el-form-item label=" " prop="keyWords">
          <el-input @keyup.native.enter="handleSearch" v-model.trim="ruleForm.keyWords" style="width:280px;" placeholder="案号、申请人、被申请人、手机、法院"></el-input>
        </el-form-item>

				<timeFrame
          :startDate.sync="ruleForm.startDate"
          :endDate.sync="ruleForm.endDate"
          startPlaceholder="开始时间"
          endPlaceholder="结束时间"
        >
        </timeFrame>

				<el-form-item label=" " prop="operType">
          <el-select clearable v-model="ruleForm.operType" style="width:150px;" placeholder="操作类型">
            <el-option label="法官扫码" :value="2"></el-option>
            <el-option label="普通扫码" :value="1"></el-option>
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
				<el-table-column prop="caseNo" label="案号">
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.caseNo}}</span>
          </template>
        </el-table-column>
				<el-table-column prop="applicants" label="申请人"></el-table-column>
				<el-table-column prop="respondents" label="被申请人"></el-table-column>
				<el-table-column prop="forecastJudgeAmt" label="裁决金额"></el-table-column>
				<el-table-column prop="operType" label="操作类型">
          <template slot-scope="scope">
            {{
              scope.row.operType === 1 ? '普通扫码' : '法官扫码'
            }}
          </template>
        </el-table-column>
				<el-table-column prop="operIp" label="操作IP">
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.operIp}}</span>
          </template>
        </el-table-column>
				<el-table-column prop="courtName" label="法院">
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.courtName}}</span>
          </template>
        </el-table-column>
				<el-table-column prop="judgeName" label="法官"></el-table-column>
				<el-table-column prop="cellphone" label="法官手机">
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.cellphone}}</span>
          </template>
        </el-table-column>
				<el-table-column prop="operTime" label="操作时间">
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.operTime}}</span>
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
					// 开始时间
					startDate : '',
					// 结束时间
          endDate : '',
          // 操作类型 1：普通扫码;2：法官扫码
          operType : '',
				},
				rules : {},

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
		},
		methods : {
			// 点击搜索
			handleSearch() {
				this.currentPage = 1;
        this.initTableList();
			},

			// 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/judge/judgeScanList.htm',
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

.case-operation-record-box{
	
}

</style>

<style lang="scss">

.case-operation-record-box{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
}

</style>