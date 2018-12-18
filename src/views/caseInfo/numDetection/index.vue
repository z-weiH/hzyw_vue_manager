<template>
  <div class="num-detection">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">号码检测</a>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">号码检测</span>
    </div>

    <div class="item-table num-detection-cont">
      <template v-if="type === 1">
        <div class="font-center" style="padding-top: 100px;">
          <el-upload
            class="upload-box"
            :action="`${$host}/forceManager/queryForceCaseListByExcelImplort.htm`"
            :show-file-list="false"
            :before-upload="uploadBefore"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :data="{
              token : token,
            }"
          >
            <el-button type="primary"><i class="el-icon-upload el-icon--right"></i>上传表格</el-button>
          </el-upload>
          <p class="mt-10">请上传xls、xlsx格式的表格文件</p>
          <p class="mt-10">文件中需包含手机号</p>
        </div>
      </template>

      <template v-if="type === 2">
        <div class="font-center" style="padding-top: 100px;">
          <p class="m-tit">正在检测...</p>
          <p class="m-num">123&nbsp;/&nbsp;200</p>
          <mprogress :width="30" :height="20" class="mprogress"></mprogress>
        </div>
      </template>

      <template v-if="type === 3">
        <div></div>
      </template>
    </div>

    <div class="item-title of-hidden mt-10">
      <span class="item-title-sign">检测记录</span>
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
				<el-table-column prop="respondents" label="检测时间"></el-table-column>
        <el-table-column prop="respondents" label="检测总数"></el-table-column>
        <el-table-column prop="respondents" label="号码可用"></el-table-column>
        <el-table-column prop="respondents" label="号码不可用"></el-table-column>
        <el-table-column prop="respondents" label="检测错误"></el-table-column>
        <el-table-column prop="respondents" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDownload(scope.row)" type="text">下载</el-button>
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
  import mprogress from './modules/progress.vue'
  export default {
    components : {
      mprogress,
    },
    data() {
      return {
        // 用户token
        token : (() => {
          try{
            return JSON.parse(localStorage.getItem('loginInfo')).token;
          }catch(err) {
            return '';
          }
        })(),
        type : 2, // 当前状态： 1 - 上传表格 2 - 正在检测 3 - 检测完成
        pageLoading : '',

        // 表格数据
        tableData : [{}],
        // 数据总数
        total : 11,
        // 当前页数
        currentPage : 1,
        // 每页数量
				pageSize : 10,
      }
    },
    methods : {
      // 点击下载
      handleDownload(row) {

      },


      // 文件上传前回调
      uploadBefore(file) {
        let fileType = file.name.split('.').pop();
        let arr = ['xlsx','xls'];
        if(arr.indexOf(fileType) === -1){
          this.$message.warning('文件格式有误');
          return false;
        }
        this.pageLoading = this.$loading();
        return true;
      },
      // 文件上传成功
      uploadSuccess(res, file, fileList) {
        this.pageLoading.close();
        this.importQueryState = true;
        this.tableData = res.result.caseInfos;
        
        this.$refs.batchImportDialog.show({
          total : res.result.caseNum,
          errorList : res.result.noResultCaseList,
          duplicateNum : res.result.duplicateNum,
          data : res.result.caseInfos,
          duplicateCaseList : res.result.duplicateCaseList,
        });
      },
      // 文件上传失败
      uploadError() {
        this.pageLoading.close();
        this.$message.error('文件上传失败，请稍后重试');
      },



      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
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

.num-detection{
  .font-center{
    text-align: center;
  }

  .num-detection-cont{
    height: 300px;
    .m-tit{
      font-size: 16px;
      font-weight: bold;
    }
    .mprogress{
      width: 600px;
      margin: 0 auto;
    }
    .m-num{
      width: 600px;
      text-align: right;
      margin: 0 auto;
      margin-top: 30px;
      margin-bottom: 10px;
    }
  }

}

</style>