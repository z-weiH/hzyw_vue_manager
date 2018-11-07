<template>
	<div class="em-enforcement-cases">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">强制执行案件</a>
    </div>
		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
        <el-form-item label=" " prop="keyWords">
          <el-input v-model.trim="ruleForm.keyWords" placeholder="请输入"></el-input>
        </el-form-item>

        <el-form-item label=" " prop="accountAge">
          <el-select clearable v-model="ruleForm.accountAge" placeholder="请选择账龄">
            <el-option label="1~30天" value="M1"></el-option>
            <el-option label="31~60天" value="M2"></el-option>
          </el-select>
        </el-form-item>

				<timeFrame
          :startDate.sync="ruleForm.startDate"
          :endDate.sync="ruleForm.endDate"
        >
        </timeFrame>

        <el-button @click="handleSearch" type="warning">查询</el-button>
      </el-form>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">已选{{multipleSelection.length}}个案件</span>
      <div class="fr">
        <div class="handle-box">
          <span @click="handleExportList">导出列表</span>
          <span class="handle-line">|</span>
          <span @click="handleTableTemplateDownload">表格模板下载</span>
          <span class="handle-line">|</span>
          <el-upload
            class="upload-box"
            :action="`${$host}/file/upload.htm`"
            :show-file-list="false"
            :before-upload="uploadBefore"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :data="{
              path : 'hzuser/idcard',
              token : token,
            }"
          >
            <span>批量导入查询</span>
          </el-upload>
          <span class="handle-line">|</span>
          <span @click="handleBatchDownload" :class="{'handle-disabled' : multipleSelection.length === 0}">批量下载</span>
        </div>
      </div>
    </div>

		<div class="item-table">
      <el-table
        :data="tableData"
        border
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
				<el-table-column prop="respondents" label="案号"></el-table-column>
        <el-table-column prop="respondents" label="仲裁申请人" width="120"></el-table-column>
        <el-table-column prop="respondents" label="执行标的"></el-table-column>
        <el-table-column prop="respondents" label="固定金额"></el-table-column>
        <el-table-column prop="respondents" label="仲裁被申请人" width="120"></el-table-column>
        <el-table-column prop="respondents" label="手机号"></el-table-column>
        <el-table-column prop="respondents" label="借款日期"></el-table-column>
        <el-table-column prop="respondents" label="逾期开始日" width="120"></el-table-column>
        <el-table-column prop="respondents" label="裁决时间"></el-table-column>
        <el-table-column prop="respondents" label="法院"></el-table-column>
        <el-table-column prop="respondents" label="模板编码"></el-table-column>
        <el-table-column prop="respondents" label="材料配置状态" width="120"></el-table-column>
        <el-table-column prop="respondents" label="下载状态"></el-table-column>
        <el-table-column label="操作" fixed="right" width="120" align="center">
          <template slot-scope="scope">
            <el-button @click="handlePreview(scope.row)" type="text">预览</el-button>
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
	import timeFrame from '@/components/timeFrame.vue'
	export default {
		components : {
			timeFrame,
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

				ruleForm : {
					// 关键字
					keyWords : '',
					// 开始时间
					startDate : '',
					// 结束时间
					endDate : '',
				},
        rules : {},
        // 表格选中数据
        multipleSelection : [],

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

      // 点击 导出列表
      handleExportList() {
        alert('导出列表');
      },
      // 点击 表格模板下载
      handleTableTemplateDownload() {
        alert('表格模板下载');
      },
      // 点击 批量导入查询
      handleBatchImportTemplate() {
        alert('批量导入查询');
      },
      // 批量导入相关事件

      // 文件上传前回调
      uploadBefore(file) {
        let fileType = file.name.split('.').pop();
        let arr = ['xlsx'];
        if(arr.indexOf(fileType) === -1){
          this.$message.warning('文件格式有误');
          return false;
        }
        return true;
      },
      uploadSuccess(response, file, fileList) {
        let res = response.result;
      },
      // 文件上传失败
      uploadError() {
        this.$message.error('文件上传失败，请稍后重试');
      },

      // 批量导入相关事件
      // 点击 批量下载
      handleBatchDownload() {
        if(this.multipleSelection.length === 0) {
          return;
        }
        alert('批量下载');
      },

      // 点击 预览
      handlePreview(row) {
        alert('预览');
      },
      // 点击 下载
      handleDownload(row) {
        alert('下载');
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
      // 表格 多选 change
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }

      // 表格相关 end
		},
	}
</script>

<style lang="scss" scoped>

.em-enforcement-cases{
	.handle-box{
    padding-top: 5px;
    font-size: 14px;
    color: #666666;
    .handle-line{
      margin: 0 5px;
    }
    span{
      cursor: pointer;
    }
    .handle-disabled{
      color: #ccc;
      cursor: auto;
    }
  }
  .upload-box{
    display: inline-block;
  }
}

</style>

<style lang="scss">

.em-enforcement-cases{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
}

</style>