<template>
	<div class="em-download-task">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">下载任务页</a>
    </div>

		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="80px">
        <el-form-item label="批次号：" prop="batchNo">
          <el-input @keyup.native.enter="handleSearch" v-model.trim="ruleForm.batchNo" placeholder="强制执行批次号"></el-input>
        </el-form-item>

        <el-button @click="handleSearch" type="warning">查询</el-button>
      </el-form>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">下载任务列表</span>
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
				<el-table-column prop="batchNo" label="批次号" width="180px">
          <template slot-scope="scope">
            <span class="colLink" @click="getRecordInfo(scope.row)">{{scope.row.batchNo}}</span>
          </template>
        </el-table-column>
        <!--0:进行中；1：已完成；2：失败-->
        <el-table-column prop="createStatus" label="生成状态">
          <template slot-scope="scope">
           <span>{{scope.row.createStatus === 0 ? "进行中" : scope.row.createStatus === 1 ? '已完成' : '失败'}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="createDocs" label="生成文书" width="280px"></el-table-column>
        <el-table-column prop="docDate" label="文书落款日期" width="120px"></el-table-column>
        <el-table-column prop="downloadTimes" label="下载次数"></el-table-column>
        <el-table-column prop="userName" label="操作人"></el-table-column>
        <el-table-column prop="respondents" label="操作">
          <template slot-scope="scope">
            <!--<a :href="scope.row.docsPath" :download="'Your_downNames'" >xiazai</a>-->
            <el-button @click="handleDownload(scope.row)" v-if="scope.row.createStatus === 1" type="text">下载</el-button>
            <span v-else style="color: #CCCCCC;">下载</span>
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


    <batchInfo ref="batchInfo"></batchInfo>
	</div>
</template>

<script>
  import exportFile from "@/assets/js/exportFile";
  import batchInfo from '../emGenerationRecord/module/batchInfo'
	import timeFrame from '@/components/timeFrame.vue'
	export default {
		components : {
			timeFrame,
      batchInfo
		},
		data() {
			return {
				ruleForm : {
					// 关键字
					keyWords : '',
				},
				rules : {},

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
    created() {
      this.initTableList();
    },
		methods : {


      getRecordInfo(row){
        this.$refs.batchInfo.show(row);
      },

			// 点击搜索
			handleSearch() {
				this.currentPage = 1;
        this.initTableList();
      },

      // 点击下载
      handleDownload(row) {

        console.log(row.docsPath.substring(row.docsPath.length - 3));
        if(row.docsPath.substring(row.docsPath.length - 3) === 'pdf'){
          window.open(row.docsPath, '_blank');
        }
        else{
          var downloadAnchorNode = document.createElement("a");
          downloadAnchorNode.setAttribute("href", row.docsPath);
          let idx = row.docsPath.lastIndexOf('/');
          const filename = row.docsPath.substring(idx+1);
          downloadAnchorNode.setAttribute("download",filename);
          downloadAnchorNode.click();
          downloadAnchorNode.remove();
        }

        this.$http.post("/download/addDownloadTimesById.htm",{id: row.id}).then(res => {
          console.log(res);
          row.downloadTimes +=1;
        })
      },

			// 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http.post('/download/downloadBaseQuery.htm',{
            pageSize : this.pageSize,
            currentNum : this.currentPage,
            ...this.ruleForm
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

.em-download-task{

}

</style>

<style lang="scss">

.em-download-task{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
}

</style>
