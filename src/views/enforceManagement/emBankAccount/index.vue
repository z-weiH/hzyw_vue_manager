<template>
	<div class="em-bank-account">
    <div class="item-title of-hidden">
      <span class="item-title-sign" style="display:inline-block;margin-top:12px;">申请执行人银行账户</span>
      <div class="fr">
        <el-button @click="handleAdd" type="primary">新增</el-button>
      </div>
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
				<el-table-column prop="accountName" label="户名"></el-table-column>
        <el-table-column prop="accountNumber" label="银行卡号"></el-table-column>
        <el-table-column prop="depositBank" label="开户银行"></el-table-column>
        <el-table-column prop="branchName" label="支行名称"></el-table-column>
        <el-table-column prop="subbranch" label="联行号"></el-table-column>
        <el-table-column prop="bankAddress" label="银行地址"></el-table-column>
        <el-table-column prop="platName" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
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

    <mdialog @successCBK="handleSearch" ref="mdialog"></mdialog>
	</div>
</template>

<script>
	import mdialog from './modules/dialog.vue'
	export default {
		components : {
			mdialog,
		},
		data() {
			return {
				ruleForm : {
					// 关键字
					keyWords : '',
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
      
      // 点击 新增
      handleAdd() {
        this.$refs.mdialog.show('add');
      },
      // 点击 修改
      handleEdit(row) {
        this.$refs.mdialog.show('edit',row);
      },
      // 点击 删除
      handleDelete(row) {
        this.$confirm('确定要删除该信息吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel',
          confirmButtonClass: 'confirm',
          center: true,
        }).then(() => {
          this.$http({
            method : 'post',
            url : '/applicantBankCard/deleteExecutionApplicantBankCardInfo.htm',
            data : {
              applicantCardId : row.applicantCardId,
            },
          }).then((res) => {
            this.$message.success('删除成功');
            this.handleSearch();
          });
        },() => {
          console.log('已取消');
        });
      },

			// 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/applicantBankCard/queryExecutionApplicantBankCardInfo.htm',
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

.em-bank-account{
	
}

</style>

<style lang="scss">

.em-bank-account{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
  .item-title{
    padding: 10px;
  }
}

</style>