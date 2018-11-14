<template>
	<div class="ser-business-manage">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">模板管理</a>
    </div>
		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
        <el-form-item label=" " prop="keyWords">
          <el-input v-model.trim="ruleForm.keyWords" placeholder="请输入模板编码、模板名称"></el-input>
        </el-form-item>
        <el-button @click="handleSearch" type="warning">查询</el-button>

        <el-button type="primary" @click="handleAdd">新增</el-button>
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
        <el-table-column prop="templateId" label="模板ID"></el-table-column>
				<el-table-column prop="templateCode" label="模板编码"></el-table-column>
        <el-table-column prop="templateName" label="模板名称"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column label="操作" align="center">
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
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel',
          confirmButtonClass: 'confirm',
          center: true,
        }).then(() => {
          this.$http({
            method : 'post',
            url : '/templateManagement/deleteTemplateInfoByTemplateId.htm',
            data : {
              templateId : row.templateId,
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
          url : '/templateManagement/queryDeliveryTemplateInfoByBaseQuery.htm',
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

.ser-business-manage{
	
}

</style>

<style lang="scss">

.ser-business-manage{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
}

</style>