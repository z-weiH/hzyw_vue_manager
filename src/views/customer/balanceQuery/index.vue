<template>
  <div class="balance-query">
     <div class="wsbodyhead" >
        <a>所在位置</a>
        <router-link :to="'/main/balanceQuery'" class="aside_tit">账户余额</router-link>
      </div>  
    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm">
        <el-form-item label=" " prop="keyWords">
          <el-input v-model.trim="ruleForm.keyWords" placeholder="请输入客户名称"></el-input>
        </el-form-item>

        <el-button @click="handleSearch" type="warning">查询</el-button>
      </el-form>
    </div>

    <div class="item-title">
      账户余额查询
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
        <el-table-column prop="clientName" label="客户名称">
          <template slot-scope="scope">
              <span v-ellipsis.20>{{scope.row.clientName}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="ticketAvail" label="可用仲券">
          <template slot-scope="scope">
            {{scope.row.ticketAvail || 0}}
          </template>
        </el-table-column>
        <el-table-column prop="ticketGiftAvail" label="可用赠券">
          <template slot-scope="scope">
           <span class="colLink" @click="handleDetail(scope.row)">{{scope.row.ticketGiftAvail || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="amtAvail" label="可用仲裁费"></el-table-column>
        <el-table-column prop="ticketTotal" label="累计充值仲券"></el-table-column>
        <el-table-column prop="giftTotal" label="累计赠送仲券">
           <!-- <template slot-scope="scope">
             <span class="colLink" @click="handleInfo(scope.row)">
                {{scope.row.giftTotal || 0}}
             </span>
          </template> -->
        </el-table-column>
        <el-table-column prop="ticketAmtTotal" label="累计充值仲券费">
          <template slot-scope="scope">
            {{scope.row.ticketAmtTotal || 0}}
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
  export default {
    data() {
      return {
        ruleForm : {
          // 客户名称
          keyWords : '',
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
      //详情页面
      handleDetail(row) {
        this.$router.push({
          path:'/main/balanceQueryDetail',
          query: {clientCode: row.clientCode},
        });
      },
      //赠券详情
      handleInfo(row){
         this.$router.push({
          path:'/main/balanceQueryInfo',
          query: {clientCode: row.clientCode},
        });
      },
      // 点击搜索
      handleSearch() {
        this.currentPage = 1;
        this.initTableList();
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          method : 'post',
          url : '/account/queryAccountByBaseQuery.htm',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
            keyWords : this.ruleForm.keyWords,
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

.balance-query{
  
}

</style>

<style lang="scss">

.balance-query{
  .el-form-item{
    margin-bottom: 0;
  }
}

</style>