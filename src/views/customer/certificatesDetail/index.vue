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
      <span>服务费充值记录</span>
      <div class="fr">
        <el-form class="m-form" :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
          <timeFrame :startDate.sync="ruleForm.startDate" :endDate.sync="ruleForm.endDate"></timeFrame>
          <el-button @click="handleTimeSearch" type="primary" size="mini" class="mt-5 mr-20">确定</el-button>
        </el-form>
      </div>
    </div>

    <div class="statistics-box">
      <el-row :gutter="10">
        <el-col :span="8">
          <div class="m-grid-content">
            <p>充值服务费总数（元）</p>
            <div class="grid-num grid-num-origin">{{statistics.rechargeTotal}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="m-grid-content">
            <p>赠券服务费总数（元）</p>
            <div class="grid-num grid-num-origin">{{statistics.giftTotal}}</div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="m-grid-content">
            <p>退款总数（元）</p>
            <div class="grid-num grid-num-origin">{{statistics.refundTotal}}</div>
          </div>
        </el-col>
      </el-row>
    </div>

    <el-tabs type="border-card" @tab-click="handleSecuritiesAndRatioTab">
      <el-tab-pane>
        <span slot="label">仲券结算客户</span>
        <div class="item-search">
          <el-form :inline="true" ref="searchForm" :model="searchForm" label-width="0px">
            <el-form-item label=" " prop="clientCode">
              <el-select filterable clearable v-model="searchForm.clientCode" placeholder="请选择客户">
                <el-option label="全部" value></el-option>
                <el-option
                  :label="item.merchantName"
                  :value="item.code"
                  v-for="(item,index) in clientOptions"
                  :key="index"
                ></el-option>
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

            <el-button @click="handleSearch(1)" type="warning">查询</el-button>

            <div class="fr">
              <el-button @click="handleExportFile(1)" type="primary">导出</el-button>
            </div>
          </el-form>
        </div>
        <div class="item-table">
          <el-table :data="tableData" border stripe style="width:100%;">
            <el-table-column prop="date" label="序号" width="50">
              <template slot-scope="scope">{{scope.$index + 1}}</template>
            </el-table-column>
            <el-table-column prop="clientName" label="客户名称" width="150"></el-table-column>
            <el-table-column
              prop="finalTicket"
              label="期末仲券数"
              :render-header="headerFinalTicketGift"
            ></el-table-column>
            <el-table-column
              prop="finalTicketGift"
              label="期末赠券数"
              :render-header="headerFinalTicketGift"
            ></el-table-column>
            <el-table-column prop="ticketValue" label="单张券面值（元）"></el-table-column>
            <el-table-column prop="periodTicketRecharge" label="期间充值仲券">
              <template slot-scope="scope">
                  {{scope.row.periodTicketRecharge/10}}
              </template>
            </el-table-column>
            <el-table-column prop="periodTicketGift" label="期间赠券">
                <template slot-scope="scope">
                  {{scope.row.periodTicketGift/10}}
                </template>
            </el-table-column>
            <el-table-column prop="periodTicketRefund" label="期间退券">
                <template slot-scope="scope">
                  {{scope.row.periodTicketRefund/10}}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="140">
              <template slot-scope="scope">
                <el-button @click="handleDetail(scope.row)" type="text">查看详情</el-button>
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
            :total="total"
          ></el-pagination>
        </div>
      </el-tab-pane>
      <el-tab-pane label="比例结算客户">
        <div class="item-search">
          <el-form :inline="true" ref="searchForm" :model="searchForm1" label-width="0px">
            <el-form-item label=" " prop="clientCode">
              <el-select filterable clearable v-model="searchForm1.clientCode" placeholder="请选择客户">
                <el-option label="全部" value></el-option>
                <el-option
                  :label="item.merchantName"
                  :value="item.code"
                  v-for="(item,index) in clientOptions"
                  :key="index"
                ></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label=" " prop="hasRecharge">
              <el-checkbox v-model="searchForm1.hasRecharge">有充值记录</el-checkbox>
            </el-form-item>

            <el-form-item label=" " prop="hasGift">
              <el-checkbox v-model="searchForm1.hasGift">有赠送记录</el-checkbox>
            </el-form-item>

            <el-form-item label=" " prop="hasRefund">
              <el-checkbox v-model="searchForm1.hasRefund">有退费记录</el-checkbox>
            </el-form-item>

            <el-button @click="handleSearch(2)" type="warning">查询</el-button>

            <div class="fr">
              <el-button @click="handleExportFile(2)" type="primary">导出</el-button>
            </div>
          </el-form>
        </div>
        <div class="item-table">
          <el-table :data="tableData1" stripe border style="width: 100%">
            <el-table-column prop="date" label="序号" width="50">
              <template slot-scope="scope">{{scope.$index + 1}}</template>
            </el-table-column>
            <el-table-column prop="clientName" label="客户名称" width="150"></el-table-column>
            <el-table-column prop="originalServiceFee" label="期末服务费" width="150" :render-header="headerFinalTicket"></el-table-column>
            <el-table-column prop="originalGiftServiceFee" label="期末赠送服务费" width="150" :render-header="headerFinalTicket"></el-table-column>

            <!-- <el-table-column prop="finalFee" label="期末仲裁费余额" width="120"></el-table-column> -->

            <el-table-column prop="periodTicketRecharge" label="期间充值服务费" width="155"></el-table-column>
            <el-table-column prop="periodTicketGift" label="期间赠送服务费" width="155"></el-table-column>
            <el-table-column prop="periodTicketRefund" label="期间退费"></el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="handleDetail(scope.row)" type="text">查看详情</el-button>
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
            :total="total"
          ></el-pagination>
        </div>
      </el-tab-pane>
    </el-tabs>

    <detailDialog ref="detailDialog" :modelType="tabcardType"></detailDialog>
  </div>
</template>

<script>
import timeFrame from "@/components/timeFrame.vue";
import exportFile from "@/assets/js/exportFile";
import detailDialog from "./modules/detailDialog.vue";
export default {
  components: {
    timeFrame,
    detailDialog
  },
  data() {
    let time = this.$moment(+new Date() - 24 * 3600 * 1000).format(
      "YYYY-MM-DD"
    );
    return {
      // 用于统计搜索
      ruleForm: {
        // 开始日期
        startDate: time,
        // 结束日期
        endDate: time
      },
      startDateText: time,
      endDateText: time,
      // 统计
      statistics: {
        giftTotal: "", // 赠券总数（张）
        rechargeTotal: "", // 充值仲券总数（张）
        refundTotal: "" // 退券总数（张）
      },
      tabcardType: 1, //选项卡(业务内容)全局下标 1代表仲券 2代表比例
      // 用于表格搜索
      searchForm: {
        // 客户
        clientCode: "",
        // 赠券记录 0否 1是
        hasGift: true,
        // 充值记录 0否 1是
        hasRecharge: true,
        // 退券记录 0否 1是
        hasRefund: true
      },
      searchForm1: {
        // 客户
        clientCode: "",
        // 赠券记录 0否 1是
        hasGift: true,
        // 充值记录 0否 1是
        hasRecharge: true,
        // 退券记录 0否 1是
        hasRefund: true
      },
      // 仲券结算-表格数据
      tableData: [],
      // 比例结算-表格数据
      tableData1: [],
      // 数据总数
      total: 0,
      // 当前页数
      currentPage: 1,
      // 每页数量
      pageSize: 10,

      // 客户options
      clientOptions: []
    };
  },
  mounted() {
    this.initClient();
    this.initStatistics();
    this.initTableList(1);
  },
  methods: {
    handleSecuritiesAndRatioTab(tab, event) {
      console.log(tab, event, "handleSecuritiesAndRatioTab");
      if (tab.index == 0) {
        // 仲券结算
        this.initTableList(1);
        this.tabcardType = 1;
      } else if (tab.index == 1) {
        //  比例结算
        this.initTableList(2);
        this.tabcardType = 2;
      }
    },
    // 获取客户 options
    initClient() {
      return this.$http({
        method: "post",
        url: "/merchant/queryMerchants.htm"
      }).then(res => {
        this.clientOptions = res.result.list;
      });
    },
    // 获取统计
    initStatistics() {
      return this.$http({
        method: "post",
        url: "/account/queryRechargeTotal.htm",
        data: {
          bizType: 1,
          ...this.ruleForm
        }
      }).then(res => {
        this.statistics = Object.assign(this.statistics, res.result);
      });
    },
    // 时间搜索
    handleTimeSearch() {
      if (!this.ruleForm.startDate && !this.ruleForm.endDate) {
        return this.$message.warning("请至少选择一个时间");
      }
      this.initStatistics().then(() => {
        if (this.tabcardType == 1) {
          this.initTableList(1);
        } else if (this.tabcardType == 2) {
          this.initTableList(2);
        }
        this.startDateText = this.ruleForm.startDate;
        this.endDateText = this.ruleForm.endDate;
      });
    },
    // 点击导出
    handleExportFile(type) {
      if (type === 1) {
        exportFile({
          url: "/account/queryTicketRechargeExport.htm",
          data: {
            ...this.ruleForm,
            clientCode: this.searchForm.clientCode,
            hasGift: this.searchForm.hasGift ? 1 : 0,
            hasRecharge: this.searchForm.hasRecharge ? 1 : 0,
            hasRefund: this.searchForm.hasRefund ? 1 : 0,
            settleType: type
          }
        });
      } else if (type === 2) {
        exportFile({
          url: "/account/queryTicketRechargeExport.htm",
          data: {
            ...this.ruleForm,
            clientCode: this.searchForm1.clientCode,
            hasGift: this.searchForm1.hasGift ? 1 : 0,
            hasRecharge: this.searchForm1.hasRecharge ? 1 : 0,
            hasRefund: this.searchForm1.hasRefund ? 1 : 0,
            settleType: type
          }
        });
      }
    },
    // 点击返回
    handleGoBack() {
      this.$router.push("balanceQuery");
    },
    // 点击查询
    handleSearch(type) {
      if (type === 1) {
        this.initTableList(1);
      } else if (type === 2) {
        this.initTableList(2);
      }
      this.initStatistics();
    },
    // 表格详情
    handleDetail(row) {
      this.$refs.detailDialog.show({
        ...row,
        ...this.ruleForm
      });
    },

    // 表格相关 start

    // 初始化 表格数据
    initTableList(stype) {
      this.queryTableData(stype);
    },
    queryTableData(stype) {
       let loading = this.$loading();
      if (stype === 1) {
        // 查询表格数据
        this.$http({
          url: "/account/queryTicketRechargeList.htm",
          method: "post",
          data: {
            pageSize: this.pageSize,
            currentNum: this.currentPage,

            ...this.ruleForm,
            clientCode: this.searchForm.clientCode,
            hasGift: this.searchForm.hasGift ? 1 : 0,
            hasRecharge: this.searchForm.hasRecharge ? 1 : 0,
            hasRefund: this.searchForm.hasRefund ? 1 : 0,
            settleType: stype ? stype : 1
          }
        })
          .then(res => {
            this.total = res.result.count;

            this.tableData = res.result.list;

            loading.close();
          })
          .catch(() => {
            loading.close();
          });
      } else if (stype === 2) {
        // 查询表格数据
        this.$http({
          url: "/account/queryTicketRechargeList.htm",
          method: "post",
          data: {
            pageSize: this.pageSize,
            currentNum: this.currentPage,

            ...this.ruleForm,
            clientCode: this.searchForm1.clientCode,
            hasGift: this.searchForm1.hasGift ? 1 : 0,
            hasRecharge: this.searchForm1.hasRecharge ? 1 : 0,
            hasRefund: this.searchForm1.hasRefund ? 1 : 0,
            settleType: stype ? stype : 1
          }
        })
          .then(res => {
            this.total = res.result.count;

            this.tableData1 = res.result.list;

            loading.close();
          })
          .catch(() => {
            loading.close();
          });
      }
    },
    // 页数 change
    handleSizeChange(val) {
      this.pageSize = val;
      this.currentPage = 1;
      if (this.tabcardType == 1) {
        this.initTableList(1);
      } else if (this.tabcardType == 2) {
        this.initTableList(2);
      }
    },
    // 分页 change
    handleCurrentChange(val) {
      this.currentPage = val;
      if (this.tabcardType == 1) {
        this.initTableList(1);
      } else if (this.tabcardType == 2) {
        this.initTableList(2);
      }
    },

    // 表格相关 end

    headerFinalTicket(h, { column, $index }) {
      // console.log(h, column);
      // 期末赠送服务费
      // 期末服务费
     if (column.label === "期末服务费") {
        return (
          <span>
            {column.label}
            <el-tooltip class="item" effect="dark" placement="bottom">
              <i class="el-icon-info ml-10" />
              <div slot="content">
                期末服务费意思为：所选时间范围内，
                <br/>
                该客户账户最新的可用服务费，
                <br/>
                如：选择查看1月1号到1月30号时间范围，
                <br/>
                那么此项将显示1月30号0点时，
                <br/>
                该账户的可用服务费金额
              </div>
            </el-tooltip>
          </span>
        );
      } else if(column.label === "期末赠送服务费"){
        return (
          <span>
            {column.label}
            <el-tooltip class="item" effect="dark" placement="bottom">
              <i class="el-icon-info ml-10" />
              <div slot="content">
               期末赠送服务费意思为：
               <br/>
               所选时间范围内，该客户账户最新的可用赠送服务费，
               <br/>
               如：选择查看1月1号到1月30号时间范围，
               <br/>
               那么此项将显示1月30号0点时，
               <br/>
               该账户可用赠送服务费金额
              </div>
            </el-tooltip>
          </span>
        );
      }
    },
    headerFinalTicketGift(h, { column, $index }) {
      // 期末赠券数
      // 期末仲券
      if (column.label === "期末赠券数") {
        return (
          <span>
            {column.label}
            <el-tooltip class="item" effect="dark" placement="bottom">
              <i class="el-icon-info ml-10" />
              <div slot="content">
                在所选择的时间范围内，该客户最新的账户
                <br />
                可用赠券，如：当在2月15日当天，查询1
                <br />
                月1日至1月30日的数据，期末赠券数=1月3
                <br />
                0日24点该客户账户剩余的可用赠券数，而
                <br />
                非2月15日的实时数据。
              </div>
            </el-tooltip>
          </span>
        );
      } else if (column.label === "期末仲券数") {
        return (
          <span>
            {column.label}
            <el-tooltip class="item" effect="dark" placement="bottom">
              <i class="el-icon-info ml-10" />
              <div slot="content">
                在所选择的时间范围内，该客户最新的账户
                <br />
                可用仲券，如：当在2月15日当天，查询1
                <br />
                月1日至1月30日的数据，期末仲券数=1月3
                <br />
                0日24点该客户账户剩余的可用仲券数，而
                <br />
                非2月15日的实时数据。
              </div>
            </el-tooltip>
          </span>
        );
      }
    }
  }
};
</script>

<style lang="scss">
.certificates-detail {
  .m-item {
    background-color: #ffffff;
    border: 1px solid #e9edf0;
    border-top: none;
  }
  .m-form {
    display: inline-block;
    vertical-align: middle;
    .el-form-item {
      margin-bottom: 0;
    }
    .el-input__inner {
      height: 28px;
      line-height: 28px;
    }
  }

  .statistics-box {
    margin-top: 10px;
    margin-bottom: 10px;
    .m-grid-content {
      background-color: #fff;
      height: 90px;
      padding: 12px 12px 5px 20px;
      box-sizing: border-box;

      .grid-num {
        font-size: 22px;
        font-weight: bold;
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
      }
      .grid-num-origin {
        color: #ff9933;
      }
      .grid-num-green {
        color: #66cc66;
      }
      .grid-detail {
        text-align: right;
        margin-top: -20px;
      }
    }
  }
  .item-search {
    .el-form-item {
      margin-bottom: 0;
    }
  }
}
</style>
