<template>
  <div>
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">受委托人管理</a>
    </div>

    <div class="item-search">
      <el-form :inline="true" ref="searchItem" :model="searchItem" >
        <el-form-item label="" prop="keyWords">
          <el-input style="width: 250px;" v-model.trim="searchItem.keyWords" placeholder="受托人姓名、手机号、身份证号"></el-input>
        </el-form-item>
        <el-form-item label="类型" prop="mandatoryType">
          <el-select style="width: 180px;"  clearable v-model="searchItem.mandatoryType" placeholder="选择">
            <el-option label="内部员工" value="1"></el-option>
            <el-option label="律所代理" value="2"></el-option>
            <el-option label="线下代理" value="3"></el-option>
            <!--1：自营渠道：2：律所代理：3：线下代理-->
          </el-select>
        </el-form-item>

        <el-button @click="doQuery" type="warning">查询</el-button>
      </el-form>
    </div>
    <div class="item-title of-hidden" style="position: relative;">
      <div style="position: absolute;top: 6px ;right: 10px;">
          <el-button type="primary" @click="exportExcel">表格模板下载</el-button>
          <!--<el-button >导入</el-button>-->
          <el-upload
            style="display: inline-block"
            class="upload-demo"
            :action="uploadUrl"
            :data="{token: token}"
            :on-success="fileUploadSuccess"
            :on-error="fileUploadError"
            :limit="1"
            :show-file-list="false"
            >
            <el-button >导入</el-button>
          </el-upload>
          <el-button type="primary" @click="addClient">添加</el-button>
      </div>
      <span class="item-title-sign">受委托人管理</span>
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
        <el-table-column
          prop="channelName"
          label="类型"
          width="100">
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.channelName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mandatoryName"
          label="受委托人姓名"
          width="120">
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.mandatoryName}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="identityCard"
          label="身份证号"
          width="120">
          <template slot-scope="scope">
            {{scope.row.identityCard}}
          </template>
        </el-table-column>
        <el-table-column
          prop="channelName"
          label="工作单位/律所名称"
          width="180">
          <template slot-scope="scope">
            {{scope.row.channelName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="jobPosition"
          label="职务"
          width="120">
          <template slot-scope="scope">
            {{scope.row.jobPosition}}
          </template>
        </el-table-column>
        <el-table-column
          prop="phone"
          label="联系电话"
          width="130">
          <template slot-scope="scope">
            {{scope.row.phone}}
          </template>
        </el-table-column>
        <el-table-column
          prop="courtSettingStatus"
          label="操作"
          width="136">
          <template slot-scope="scope">
            <el-button type="text" @click="handleDelClick(scope.row)" size="small">删除</el-button>
            <el-button type="text" @click="handleEditClick(scope.row)" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="mt-10 mb-10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pager.currentNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pager.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pager.count">
      </el-pagination>

    </div>
    <clientEdit ref="clientEdit" />
  </div>
</template>

<script>
  import clientEdit from './module/clientEdit'
  import exportFile from "@/assets/js/exportFile";
  import host from '../../../axios/host'
  export default {
  name: 'emClientManagement',
  components:{
    clientEdit
  },
  data() {
    return {
      token : JSON.parse(localStorage.getItem('loginInfo')).token,
      uploadUrl: host.target + '/mandatory/importExcelMandatory.htm'+'?token='+JSON.parse(localStorage.getItem('loginInfo')).token,
      searchItem: {},
      tableData: [],
      pager:{
        currentNum: 1,
        pageSize: 10,
        count: 1
      }
    }
  },
  methods:{
    doQuery(){
      this.$http.post("/mandatory/queryCourtMandatoryInfo.htm",{...this.searchItem, ...this.pager}).then(res => {
        this.tableData = res.result.list;
        this.pager.count = res.result.count;
      })
    },
    handleSizeChange(val){
      this.pager.pageSize = val;
      this.doQuery();
    },
    handleCurrentChange(val){
      this.pager.currentNum = val;
      this.doQuery();
    },
    handleDelClick(row){
      this.$confirm('确定要删除该信息吗?', '提示', {
        center: true,
      }).then(res => {
        this.$http.post("/mandatory/deleteCourtMandatoryInfo.htm",{mandatoryId: row.mandatoryId}).then(res => {
          this.$message.success("受委托人删除成功");
        })
      }).catch(err => {

      })
    },
    handleEditClick(row){
      console.log(row);
      this.$refs.clientEdit.show(row.mandatoryId);
    },
    exportExcel(){
      exportFile(
        {
          url: '/mandatory/excelExport.htm',
        }
      );
    },
    addClient(){
      this.$refs.clientEdit.show();
    },
    fileUploadSuccess(response, file, fileList){

    },
    fileUploadError(err, file, fileList){

    }
  },
  created(){
    this.doQuery();
  }
}
</script>

<style scoped>

</style>
