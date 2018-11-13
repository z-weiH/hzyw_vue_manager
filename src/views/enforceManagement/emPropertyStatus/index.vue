<template>
	<div class="em-property-status">
    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
        <el-form-item label=" " prop="keyWords">
          <el-input v-model.trim="ruleForm.keyWords" placeholder="被执行人、手机号、身份证号"></el-input>
        </el-form-item>

        <el-button @click="handleSearch" type="warning">查询</el-button>
      </el-form>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign" style="display:inline-block;margin-top:12px;">被执行人财产状况</span>
      <div class="fr">
        <el-button @click="handleDownload">表格模板下载</el-button>
        <el-upload
            class="upload-box"
            :action="`${$host}/executedProperty/importExcelMandatory.htm?token=${token}`"
            :show-file-list="false"
            :before-upload="uploadBefore"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :data="{
              token : token,
            }"
          >
            <el-button>批量导入</el-button>
          </el-upload>
        <el-button @click="handleAdd" type="primary">新增</el-button>
      </div>
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
				<el-table-column prop="executedName" label="被执行人"></el-table-column>
        <el-table-column prop="idCard" label="身份证号"></el-table-column>
        <el-table-column prop="phone" label="手机号"></el-table-column>
        <el-table-column prop="accountName" label="银行卡号"></el-table-column>
        <el-table-column prop="bankName" label="开户银行"></el-table-column>
        <el-table-column prop="clientName" label="数据来源"></el-table-column>
        <el-table-column prop="platName" label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
            <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
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

    <mdialog @successCBK="handleSearch" ref="mdialog"></mdialog>
	</div>
</template>

<script>
  import mdialog from './modules/dialog.vue'
  import exportFile from '@/assets/js/exportFileForm.js'
	export default {
		components : {
			mdialog,
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
				},
				rules : {},

				// 表格数据
        tableData : [{propertyId : '1' , clientName : '参数'}],
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
      // 表格模板下载
      handleDownload() {
        exportFile({
          url : '/executedProperty/excelExport.htm',
        });
      },
      
      // 点击 新增
      handleAdd() {
        this.$refs.mdialog.show('add');
      },
      // 点击 修改
      handleEdit(row) {
        this.$refs.mdialog.show('edit',row);
      },
      // 点击 删除
      handleDelete(row) {
        this.$confirm('确定要删除该信息吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel',
          confirmButtonClass: 'confirm',
          center: true,
        }).then(() => {
          this.$http({
            method : 'post',
            url : '/executedProperty/deleteCourtExecutedProperty.htm',
            data : {
              propertyId : row.propertyId,
            },
          }).then((res) => {
            this.$message.success('删除成功');
            this.handleSearch();
          });
        },() => {
          console.log('已取消');
        });
      },

      // 批量导入相关事件

      // 文件上传前回调
      uploadBefore(file) {
        let fileType = file.name.split('.').pop();
        let arr = ['xlsx','xls'];
        if(arr.indexOf(fileType) === -1){
          this.$message.warning('文件格式有误');
          return false;
        }
        return true;
      },
      // 文件上传成功
      uploadSuccess(res, file, fileList) {
        if(res.code !== '0000') {
          this.$message.warning(res.description || '文件上传失败');
        }
        this.initTableList();
      },
      // 文件上传失败
      uploadError() {
        this.$message.error('文件上传失败，请稍后重试');
      },

      // 批量导入相关事件

			// 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/executedProperty/courtExecutedPropertyInfoBaseQuery.htm',
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

.em-property-status{
	
}

</style>

<style lang="scss">

.em-property-status{
  .upload-box{
    display: inline-block;
  }
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
  .item-title{
    padding: 10px;
  }
}

</style>