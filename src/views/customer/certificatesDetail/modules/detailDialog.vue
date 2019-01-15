<template>
  <div class="certificates-detail-detail-dialog">
    <el-dialog
      :title="ruleForm.clientName"
      :visible.sync="dialogVisible"
      width="840px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-row>
          <el-col :span="10">
            技术对接费：{{ruleForm.amtService}}元
          </el-col>
          <el-col :span="14">
            合同编号：{{ruleForm.contractNo}}
          </el-col>
        </el-row>

        <el-tabs @tab-click="handleTabChange" v-model="tabsVal" type="border-card" class="mt-10">
          <el-tab-pane :label="item.label" :value="item.value" v-for="(item,index) in tabs" :key="index">
            <el-table
              :data="tableData"
              border
            >
              <!-- 充值 -->
              <template v-if="tabsVal === '0'">
                <el-table-column prop="ticketCount" label="充值仲券" :key="10"></el-table-column>
              </template>
              <!-- 赠券 -->
              <template v-else-if="tabsVal === '2'">
                <el-table-column prop="ticketCount" label="获赠仲券" :key="11"></el-table-column>
                <el-table-column prop="applyName" label="申请人" :key="12"></el-table-column>
                <el-table-column prop="applyRemark" label="申请备注" :key="13"></el-table-column>
              </template>
              <!-- 退券 -->
              <template v-else-if="tabsVal === '1'">
                <el-table-column prop="ticketCount" label="退款仲券" :key="14"></el-table-column>
                <el-table-column prop="applyName" label="申请人" :key="15"></el-table-column>
                <el-table-column prop="applyRemark" label="申请备注" :key="16"></el-table-column>
              </template>
              <el-table-column prop="auditName" label="审核人"></el-table-column>
              <el-table-column prop="auditId" label="审核人员账号"></el-table-column>
              <el-table-column prop="auditTime" label="审核时间"></el-table-column>
              <el-table-column prop="auditRemark" label="审核结果">
                <template slot-scope="scope">
                  {{scope.row.auditRemark || '/'}}
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
          </el-tab-pane>
        </el-tabs>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : true,
        row : {},
        ruleForm : {
          amtService : '15000', // 技术对接费
          contractNo : 'YW-20181211-爱尚分期', // 合同编号
          clientName : '安徽和分期网络科技有限公司', // 客户名称
        },

        tabs : [
          {
            label : '充值',
            value : '0',
          },
          {
            label : '赠券',
            value : '2',
          },
          {
            label : '退券',
            value : '1',
          },
        ],
        tabsVal : '0',

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
      
    },
    methods : {
      show(data) {
        this.dialogVisible = true;
        this.row = data;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        this.$nextTick(() => {
          // 处理逻辑 写在nextTick中 ， 防止dialog没有加载数据问题
          this.initContract();
          this.initTableList();
        });
      },

      // 获取 合同信息
      initContract() {
        return this.$http({
          method : 'post',
          url : '/account/queryClientContractInfo.htm',
          data : {
            clientCode : this.row.clientCode,
          },
        }).then((res) => {
          res.result.clientName = this.row.clientName;
          this.ruleForm = Object.assign(this.ruleForm,res.result);
        });
      },
      // tab change
      handleTabChange() {
        this.currentPage = 1;
        this.initTableList();
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        
        setTimeout(() => {
          this.tabsVal = '0';
				},500);
				
      },

      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        return this.$http({
          url : '/account/queryTicketRechargeDetail.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,

            clientCode : this.row.clientCode,
            orderType : this.tabsVal,
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

<style scoped lang="scss">

.certificates-detail-detail-dialog{

}

</style>
