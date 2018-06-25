<template>
  <div class="arbitrament-users-manage">
    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm">

        <el-form-item label=" " prop="keyWords">
          <el-input v-model.trim="ruleForm.keyWords" placeholder="请输入企业名称、手机号码"></el-input>
        </el-form-item>

        <!-- 时间范围 选择 -->
        <timeFrame
          :startDate.sync="ruleForm.startDate"
          :endDate.sync="ruleForm.endDate"
        >
        </timeFrame>

        <el-form-item label=" " prop="isSigned">
          <el-select clearable style="width:120px;" v-model="ruleForm.isSigned" placeholder="请选择状态">
            <el-option label="未签约" :value="0"></el-option>
            <el-option label="已签约" :value="1"></el-option>
          </el-select>
        </el-form-item>

        <el-button @click="handleSearch" type="warning">查询</el-button>

        <div class="fr">
          <el-button @click="handleAddUser" type="primary">新增用户</el-button>
        </div>

      </el-form>
    </div>

    <div class="item-title">
      仲裁用户管理
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
        <el-table-column prop="name" label="客户名称">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.name" placement="top-start">
              <span class="fn-a ellipsis" style="max-width:108px;" @click="handleDetail(scope.row)">{{scope.row.name}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号码"></el-table-column>
        <el-table-column prop="email" label="电子邮件">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.email" placement="top-start">
              <span class="ellipsis" style="max-width:108px;">{{scope.row.email}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="fullName" label="所属仲裁委"></el-table-column>
        <el-table-column prop="createTime" label="开户时间">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.createTime" placement="top-start">
              <span class="ellipsis" style="max-width:108px;">{{scope.row.createTime}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            {{scope.row.isSigned === 0 ? '未签约' : '已签约'}}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEditUser(scope.row)" type="text">修改</el-button>
            <el-button @click="handleQzMent(scope.row)" type="text">签章管理</el-button>
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

      <!-- 用户详情 -->
      <userDetail ref="userDetail"></userDetail>
      <!-- 用户dialog -->
      <userDialog @successCBK="userDialogSuccess" ref="userDialog"></userDialog>
      <!-- 签章管理 dialog -->
      <signatureManagement @successCBK="signatureManagementSuccess" ref="signatureManagement"></signatureManagement>
    </div>

  </div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import userDialog from './modules/userDialog.vue'
  import signatureManagement from './modules/signatureManagement.vue'
  import userDetail from './modules/detail.vue'
  export default {
    components : {
      timeFrame,
      userDialog,
      signatureManagement,
      userDetail,
    },
    data() {
      return {
        ruleForm : {
          // 企业名称 手机号码
          keyWords : '',
          // 开始时间
          startDate : '',
          // 结束时间
          endDate : '',
          // 	是否签约 0未签约 1已签约
          isSigned : '',
        },

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
      // 点击新增用户
      handleAddUser() {
        this.$refs.userDialog.show('add');
      },
      // 点击修改
      handleEditUser(row) {
        this.$refs.userDialog.show('edit',row);
      },
      // 用户dialog 成功回调
      userDialogSuccess() {
        this.initTableList();
      },
      // 点击详情
      handleDetail(row) {
        this.$refs.userDetail.show(row);
      },
      // 点击签章管理
      handleQzMent(row) {
        this.$refs.signatureManagement.show(row);
      },
      // 签章管理 成功回调
      signatureManagementSuccess() {
        this.initTableList();
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          method : 'post',
          url : '/hzuser/queryHzUserByBaseQuery.htm',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
            endDate : this.ruleForm.endDate,
            startDate : this.ruleForm.startDate,
            keyWords : this.ruleForm.keyWords,
            isSigned : this.ruleForm.isSigned,
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

.arbitrament-users-manage{
  .el-form-item{
    margin-bottom: 0;
  }
}

</style>