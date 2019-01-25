<template>
  <div class="balance-query">
    <div class="wsbodyhead" >
      <a>所在位置</a>
      <router-link :to="'/main/balanceQuery'" class="aside_tit">账户余额</router-link>
    </div>

    <div class="statistics-box">
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="m-grid-content">
            <p>昨日仲券充值总数（张）</p>
            <div class="grid-num grid-num-origin">{{statistics.ticketRechargeTotal}}</div>
            <div class="grid-detail">
              <el-button @click="handleGo(1)" type="text">明细</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="m-grid-content">
            <p>昨日仲裁费充值总数（元）</p>
            <div class="grid-num grid-num-origin">{{statistics.feeRechargeTotal}}</div>
            <div class="grid-detail">
              <el-button @click="handleGo(2)" type="text">明细</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="m-grid-content">
            <p>昨日仲券扣除总数（张）</p>
            <div class="grid-num grid-num-green">{{statistics.ticketOffTotal}}</div>
            <div class="grid-detail">
              <el-button @click="handleGo(3)" type="text">明细</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="m-grid-content">
            <p>昨日仲裁费扣除总数（元）</p>
            <div class="grid-num grid-num-green">{{statistics.feeOffTotal}}</div>
            <div class="grid-detail">
              <el-button @click="handleGo(4)" type="text">明细</el-button>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm">
        <el-form-item label=" " prop="keyWords">
          <el-input @keyup.native.enter="handleSearch" v-model.trim="ruleForm.keyWords" placeholder="请输入客户名称"></el-input>
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
           <!-- <span class="colLink" @click="handleDetail(scope.row)">{{scope.row.ticketGiftAvail || 0}}</span> -->
           {{scope.row.ticketGiftAvail || 0}}
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
        // 统计 集合
        statistics : {
          feeOffTotal : '', // 仲裁费扣除总数（元）
          feeRechargeTotal : '', // 仲裁费充值总数（元）
          ticketOffTotal : '', // 仲券扣除总数（张）
          ticketRechargeTotal : '', // 仲券充值总数（张）
        },

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
      this.initTableList();
      this.initStatistics();
    },
    methods : {
      // 获取统计
      initStatistics() {
        this.$http({
          method : 'post',
          url : '/account/queryYesterdayTotal.htm',
        }).then((res) => {
          this.statistics = Object.assign(this.statistics,res.result);
        });
      },
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
      // 点击明细
      handleGo(type) {
        let path;
        if(type === 1) {
          path = 'certificatesDetail';
        }else if(type === 2) {
          path = 'arbitrationFeesDetail';
        }else if(type === 3) {
          path = 'deductionVouchersDetail';
        }else if(type === 4) {
          path = 'arbitrationFeeDeductionDetail';
        }
        this.$router.push({
          path : path,
        });
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

  .statistics-box{
    margin-bottom: 10px;
    .m-grid-content{
      background-color: #fff;
      height: 90px;
      padding: 12px 12px 5px 20px;
      box-sizing: border-box;

      .grid-num{
        font-size: 22px;
        font-weight: bold;
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
      }
      .grid-num-origin{
        color: #FF9933;
      }
      .grid-num-green{
        color: #66CC66;
      }
      .grid-detail{
        text-align: right;
        margin-top: -20px;
      }
    }
  }
}

</style>