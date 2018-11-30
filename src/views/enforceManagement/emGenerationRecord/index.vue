<template>
  <div>
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">强制执行材料生成记录</a>
    </div>
    <el-form :inline="true" class="searchs item-search" >

      <el-form-item label="批次号">
        <el-input style="width: 180px;" v-model="searchItem.keyWords" placeholder="强制执行案件处理批次号"></el-input>
      </el-form-item>
      <el-form-item label="操作人">
        <el-input style="width: 150px;" v-model="searchItem.keyWords" ></el-input>
      </el-form-item>
      <el-form-item label="处理时间">
        <el-date-picker
          style="width: 149PX;"
          v-model="searchItem.startDate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions1"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="">
        <el-date-picker
          style="width: 150PX;"
          v-model="searchItem.endDate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions2"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
      </el-form-item>
      <el-button  type="warning"  @click="doQuery">查询</el-button>
    </el-form>

    <div class="item-title">
      强制执行材料生成记录
    </div>

    <div class="item-table" >
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          type="index"
          width="70"
          label="序号"
        >
        </el-table-column>

        <el-table-column
          prop="batchNo"
          label="批次号"
          >
          <template slot-scope="scope">
            <span class="colLink" @click="getRecordInfo(scope.row)" >{{scope.row.batchNo}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="customerNum"
          label="客户数"
          >
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.customerNum}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="executionStatus"
          label="法院数"
          >
          <template slot-scope="scope">
            {{scope.row.courtNum}}
          </template>
        </el-table-column>
        <el-table-column
          prop="caseNum"
          label="案件数"
          >
          <template slot-scope="scope">
            {{scope.row.caseNum}}
          </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="处理时间"
         >
          <template slot-scope="scope">
            {{scope.row.createTime}}
          </template>
        </el-table-column>
        <el-table-column
          prop="userName"
          label="操作人"
          width="120">
          <template slot-scope="scope">
            {{scope.row.userName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="courtSettingStatus"
          label="操作"
          width="116">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClick(scope.row)" size="small">配置文书</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination style="background: #fff"
                   class="mt-10 mb-10"
                   @size-change="handleSizeChange"
                   @current-change="handleCurrentChange"
                   :current-page="pager.currentNum"
                   :page-sizes="[10, 20, 30, 40]"
                   :page-size="pager.pageSize"
                   layout="total, sizes, prev, pager, next, jumper"
                   :total="pager.count">
    </el-pagination>

    <batchInfo ref="batchInfo"></batchInfo>

  </div>
</template>

<script>
  import batchInfo from './module/batchInfo'
  export default {
    name: 'emGenerationRecord',
    components:{
      batchInfo
    },
    data() {
      return {
        searchItem: {},
        tableData: [],
        pickerOptions1: {
          disabledDate: time => {
            if (!this.searchItem.endDate) return false
            else if (new Date(time).getTime() > new Date(this.searchItem.endDate).getTime()) {
              return true
            } else {
              return false
            }
          },
        },
        pickerOptions2: {
          disabledDate: time => {
            if (!this.searchItem.startDate) return false
            else if (new Date(time).getTime() < new Date(this.searchItem.startDate).getTime()) {
              return true
            } else {
              return false
            }
          },
        },
        pager: {
          count: 1,
          pageSize: 10,
          currentNum: 1
        },
        currentItem:{},
        infoFlag: false
      }
    },
    methods:{
      getRecordInfo(row){
          this.$refs.batchInfo.show(row);
      },
      doQuery(){
        this.$http.post("/applicantBankCard/docsCreateList.htm",{...this.searchItem, ...this.pager}).then(res => {
          this.tableData = res.result.list;
          this.pager.count = res.result.count;
        })
      },
      handleCurrentChange(val){
        this.pager.currentNum = val;
        this.doQuery();
      },

      handleSizeChange(val){
        this.pager.pageSize = val;
        this.doQuery();
      },
    },
    created(){
      this.doQuery();
    }

  }
</script>

<style scoped lang="scss">

</style>
