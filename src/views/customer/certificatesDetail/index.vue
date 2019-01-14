<template>
  <div class="certificates-detail">
    <div class="m-item">
      <el-button @click="handleGoBack" type="text" icon="el-icon-arrow-left">返回</el-button>
      <template v-if="startDateText && endDateText">
        <span>{{startDateText}}</span>
        <span>——</span>
        <span>{{endDateText}}</span>
      </template>
      <template v-else-if="startDateText">
        <span>{{startDateText}}</span>
        <span>及之后</span>
      </template>
      <template v-else-if="endDateText">
        <span>{{endDateText}}</span>
        <span>及之前</span>
      </template>
      <span>仲券充值记录</span>
      <div class="fr">
        <el-form class="m-form" :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
          <timeFrame
            :startDate.sync="ruleForm.startDate"
            :endDate.sync="ruleForm.endDate"
          >
          </timeFrame>
          <el-button @click="handleTimeSearch" type="primary" size="mini" class="mt-5 mr-20">确定</el-button>
        </el-form>
      </div>
    </div>

    <div class="statistics-box">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="m-grid-content">
            <p>充值仲券总数（张）</p>
            <div class="grid-num grid-num-origin">{{statistics.rechargeTotal}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="m-grid-content">
            <p>赠券总数（张）</p>
            <div class="grid-num grid-num-origin">{{statistics.giftTotal}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="m-grid-content">
            <p>退券总数（张）</p>
            <div class="grid-num grid-num-origin">{{statistics.refundTotal}}</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <div class="item-search">
      <el-form :inline="true" ref="searchForm" :model="searchForm" label-width="0px">
        <el-form-item label=" " prop="clientCode">
          <el-select filterable clearable v-model="searchForm.clientCode" placeholder="请选择客户">
            <el-option label="全部" value=""></el-option>
            <el-option :label="item.merchantName" :value="item.code" v-for="(item,index) in clientOptions" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" " prop="hasRecharge">
          <el-checkbox v-model="searchForm.hasRecharge">有充值记录</el-checkbox>
        </el-form-item>

        <el-form-item label=" " prop="hasGift">
          <el-checkbox v-model="searchForm.hasGift">有赠券记录</el-checkbox>
        </el-form-item>

        <el-form-item label=" " prop="hasRefund">
          <el-checkbox v-model="searchForm.hasRefund">有退券记录</el-checkbox>
        </el-form-item>

        <el-button @click="handleSearch" type="warning">查询</el-button>

        <div class="fr">
          <el-button @click="handleExportFile" type="primary">导出</el-button>
        </div>
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
        <el-table-column prop="finalTicket" label="期末仲券数">
          <template slot="header" slot-scope="scope">
            <span :key="scope.$index">
              期末仲券数
              <el-tooltip class="item" effect="dark" placement="bottom">
                <i class="el-icon-info ml-10"></i>
                <div slot="content">
                  期末仲券数意思为：所选时间范
                  <br />围内，该客户账户最新的可用仲
                  <br />券数，如：选择查看1月1号到1
                  <br />月30号时间范围，那么此项将显
                  <br />示1月30号0点时，该账户的可
                  <br />用仲券数量
                </div>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="finalTicketGift" label="期末赠券数">
          <template slot="header" slot-scope="scope">
            <span :key="scope.$index">
              期末赠券数
              <el-tooltip class="item" effect="dark" placement="bottom">
                <i class="el-icon-info ml-10"></i>
                <div slot="content">
                  期末赠券数意思为：所选时间范
                  <br />围内，该客户账户最新的可用赠
                  <br />券数量，如：选择查看1月1号到
                  <br />1月30号时间范围，那么此项将
                  <br />显示1月30号0点时，该账户可
                  <br />用赠券数量
                </div>
              </el-tooltip>
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="ticketValue" label="单张券面值（元）"></el-table-column>
        <el-table-column prop="periodTicketRecharge" label="期间充值仲券"></el-table-column>
        <el-table-column prop="periodTicketGift" label="期间赠券"></el-table-column>
        <el-table-column prop="periodTicketRefund" label="期间退券"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope)" type="text">查看详情</el-button>
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
  </div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import exportFile from '@/assets/js/exportFile'
  import detailDialog from './modules/detailDialog.vue'
  export default {
    components : {
      timeFrame,
      detailDialog,
    },
    data() {
      let time = this.$moment().format('YYYY-MM-DD');
      return {
        // 用于统计搜索
        ruleForm : {
          // 开始日期
          startDate : time,
          // 结束日期
          endDate : time,
        },
        startDateText : time,
        endDateText : time,
        // 统计
        statistics : {
          giftTotal : '1', // 赠券总数（张）
          rechargeTotal : '2', // 充值仲券总数（张）
          refundTotal : '3', // 退券总数（张）
        },
        // 用于表格搜索
        searchForm : {
          // 客户
          clientCode : '',
          // 赠券记录 0否 1是
          hasGift : '',
          // 充值记录 0否 1是
          hasRecharge : '',
          // 退券记录 0否 1是
          hasRefund : '',
        },

        // 表格数据
        tableData : [{}],
        // 数据总数
        total : 11,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
        
        // 客户options
        clientOptions : [],
      }
    },
    mounted() {
      this.initClient();
      this.initStatistics();
      this.initTableList();
    },
    methods : {
      // 获取客户 options
      initClient() {
        return this.$http({
          method : 'post',
          url : '/merchant/queryMerchants.htm',
        }).then((res) => {
          this.clientOptions = res.result.list;
        });
      },
      // 获取统计
      initStatistics() {
        return this.$http({
          method : 'post',
          url : '/account/queryRechargeTotal.htm',
          data : {
            bizType : 1,
            ...this.ruleForm,
          },
        }).then((res) => {
          this.statistics = Object.assign(this.statistics,res.result);
        });
      },
      // 时间搜索
      handleTimeSearch() {
        if(!this.ruleForm.startDate && !this.ruleForm.endDate) {
          return this.$message.warning('请至少选择一个时间');
        }
        this.initStatistics().then(() => {
          this.startDateText = this.ruleForm.startDate;
          this.endDateText = this.ruleForm.endDate;
        });
      },
      // 点击导出 
      handleExportFile() {
        exportFile({
          url : '/account/queryTicketRechargeExport.htm',
          data : {
            ...this.ruleForm,
            clientCode : this.searchForm.clientCode,
            hasGift : this.searchForm.hasGift ? 1 : 0,
            hasRecharge : this.searchForm.hasRecharge ? 1 : 0,
            hasRefund : this.searchForm.hasRefund ? 1 : 0,
          },
        });
      },
      // 点击返回
      handleGoBack() {
        this.$router.push('balanceQuery');
      },
      // 点击查询
      handleSearch() {
        this.initTableList();
      },
      // 表格详情
      handleDetail(row) {
        this.$refs.detailDialog.show(row);
      },


      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/account/queryTicketRechargeList.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,

            ...this.ruleForm,
            clientCode : this.searchForm.clientCode,
            hasGift : this.searchForm.hasGift ? 1 : 0,
            hasRecharge : this.searchForm.hasRecharge ? 1 : 0,
            hasRefund : this.searchForm.hasRefund ? 1 : 0,
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

.certificates-detail{
  .m-item{
    background-color: #ffffff;
    border: 1px solid #E9EDF0;
    border-top: none;
  }
  .m-form{
    display: inline-block;
    vertical-align: middle;
    .el-form-item{
      margin-bottom: 0;
    }
    .el-input__inner{
      height: 28px;
      line-height: 28px;
    }
  }

  .statistics-box{
    margin-top: 10px;
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
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
}

</style>