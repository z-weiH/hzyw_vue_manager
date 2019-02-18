<template>
  <div class="em-wtr-client-management">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">委托人管理</a>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">委托人管理</span>
      <div class="fr">
        <el-button @click="handleAdd" type="primary">添加</el-button>
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
				<el-table-column prop="respondents" label="委托人名称"></el-table-column>
        <el-table-column prop="respondents" label="法人"></el-table-column>
        <el-table-column prop="respondents" label="法人职务"></el-table-column>
        <el-table-column prop="respondents" label="法人身份证正反面照片">
          <template slot-scope="scope">
            <a target="_blank" :href="scope.row.aaaaa">查看</a>
          </template>
        </el-table-column>
        <el-table-column prop="respondents" label="联系电话"></el-table-column>
        <el-table-column prop="respondents" label="营业执照">
          <template slot-scope="scope">
            <a target="_blank" :href="scope.row.aaaaa">查看</a>
          </template>
        </el-table-column>
        <el-table-column label="操作">
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

    <mdialog @successCBK="successCBK" ref="mdialog"></mdialog>
  </div>
</template>

<script>
  import mdialog from './modules/dialog.vue'
  export default {
    name : 'emWtrClientManagement',
    components : {
      mdialog,
    },
    data() {
      return {
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
      handleAdd() {
        this.$refs.mdialog.show('add');
      },
      handleEdit(row) {
        this.$refs.mdialog.show('edit',row);
      },
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
            url : '/templatevidence/deleteTemplateEvidence.htm',
            data : {
              eviId : row.eviId,
            },
          }).then((res) => {
            this.$message.success('删除成功');
            this.initTableList();
          });
        },() => {
          console.log('已取消');
        }).catch(() => {});
      },
      successCBK() {
        this.initTableList();
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        return this.$http({
          url : '/preCaseLib/queryCaseListByCondition.htm',
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

.em-wtr-client-management{
  .item-title{
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .item-title-sign{
    margin-top: 12px;
    display: inline-block;
  }
}

</style>