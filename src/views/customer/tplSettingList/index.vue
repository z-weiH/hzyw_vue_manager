<template>
	<div class="tpl-setting-list">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">模板设置</a>
    </div>

		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">

				<timeFrame
          :startDate.sync="ruleForm.startDate"
          :endDate.sync="ruleForm.endDate"
          startPlaceholder="初次启用开始"
          endPlaceholder="初次启用结束"
        >
        </timeFrame>

        <el-button @click="handleSearch" type="warning">查询</el-button>

        <el-form-item label=" " prop="templateStatus">
          是否启用：
          <el-select @change="handleChange" style="width:150px;" clearable v-model="ruleForm.templateStatus" placeholder="是否启用">
            <el-option label="全部" value=""></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="停用" value="2"></el-option>
          </el-select>
        </el-form-item>

        <div class="fr">
          <el-button @click="handleAddTemplate" type="primary" class="mr-20">
            <i class="el-icon-circle-plus-outline"></i>
            增加新模板
          </el-button>

          <el-button type="text" @click="handleGoBack">返回&gt;&gt;</el-button>
        </div>
      </el-form>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">模板列表</span>
    </div>

		<div class="item-table">
      <el-table
        :data="tableData"
        border
        @row-click="tableRowClick"
      >
        <el-table-column prop="date" label="序号" width="50px">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
        <el-table-column prop="clientName" label="客户">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.clientName" placement="top-start">
              <span class="ellipsis" style="max-width:80px;">{{scope.row.clientName}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
				<el-table-column prop="productName" label="产品">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.productName  + '' + scope.row.prodCode" placement="top-start">
              <span class="ellipsis" style="max-width:78px;">{{scope.row.productName  + '' + scope.row.prodCode}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="templateCode" label="模板"></el-table-column>
        <el-table-column prop="templateStatus" label="启用状态">
          <template slot-scope="scope">
            {{ 
              scope.row.templateStatus === 1 ? '启用' : '停用'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="applyStatus" label="申请书">
          <template slot-scope="scope">
            {{ 
              
              scope.row.applyStatus === 0 ? '待设置' :
              scope.row.applyStatus === 1 ? '启用' : 
              scope.row.applyStatus === 2 ? '停用' : ''
            }}
          </template>
        </el-table-column>
        <el-table-column prop="adjudeStatus" label="裁决书">
          <template slot-scope="scope">
            {{ 
              
              scope.row.adjudeStatus === 0 ? '待设置' :
              scope.row.adjudeStatus === 1 ? '启用' : 
              scope.row.adjudeStatus === 2 ? '停用' : ''
            }}
          </template>
        </el-table-column>
        <el-table-column prop="enforceStatus" label="强执申请书">
          <template slot-scope="scope">
            {{ 
              
              scope.row.enforceStatus === 0 ? '待设置' :
              scope.row.enforceStatus === 1 ? '启用' : 
              scope.row.enforceStatus === 2 ? '停用' : ''
            }}
          </template>
        </el-table-column>
        <el-table-column prop="firstUseTime" label="初次启用日期" width="120px">
          <template slot-scope="scope">
            {{
              scope.row.firstUseTime || '--'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.remark" placement="top-start">
              <span class="ellipsis" style="max-width:78px;">{{scope.row.remark}}</span>
            </el-tooltip>
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

      <templateDialog @successCBK="successCBK" ref="templateDialog"></templateDialog>

    </div>
	</div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import templateDialog from './modules/templateDialog.vue'
	export default {
		components : {
      timeFrame,
      templateDialog,
		},
		data() {
			return {
				ruleForm : {
					// 开始时间
					startDate : '',
					// 结束时间
          endDate : '',
          // 是否启用
          templateStatus : '',
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
      // 下拉 change
      handleChange() {
        this.handleSearch();
      },
      // 点击返回
      handleGoBack() {
        this.$router.push('tplSetting');
      },
      // table行 点击
      tableRowClick(row, event, column) {
        this.$router.push(`tplSettingEdit?clientCode=${this.$route.query.clientCode}&prodTempId=${row.prodTempId}&templateId=${this.$route.query.templateId}`);
      },
      // 添加新模板
      handleAddTemplate() {
        this.$refs.templateDialog.show('add');
      },
      // 添加新模板 成功回调
      successCBK() {
        this.handleSearch();
      },

			// 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/templateList/queryTemplateListByBaseQuery.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
            clientCode : this.$route.query.clientCode,

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

.tpl-setting-list{
	
}

</style>

<style lang="scss">

.tpl-setting-list{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
  .el-table__row{
    cursor: pointer;
  }
}

</style>