<template>
	<div class="ser-sms-send">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">短信发送</a>
    </div>
		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="100px">
        <el-form-item label="短信ID：" prop="smsId">
          <el-input v-model.trim="ruleForm.smsId" placeholder="请输入短信ID" style="width:170px;"></el-input>
        </el-form-item>

        <el-form-item label="客户短信ID：" prop="clientSmsId">
          <el-input v-model.trim="ruleForm.clientSmsId" placeholder="请输入客户短信ID" style="width:170px;"></el-input>
        </el-form-item>

        <el-form-item label="所属客户：" prop="clientName">
          <el-input v-model.trim="ruleForm.clientName" placeholder="请输入所属客户" style="width:170px;"></el-input>
        </el-form-item>
        

        <el-form-item label="接收号码：" prop="toPhone">
          <el-input v-model.trim="ruleForm.toPhone" placeholder="请输入接收号码" style="width:170px;"></el-input>
        </el-form-item>

        <el-form-item label="短信类型：" prop="smsType">
          <el-select clearable style="width:170px;" v-model="ruleForm.smsType" placeholder="请选择">
            <el-option :label="item.busiName" :value="item.busiCode" v-for="(item,index) in smsTypeOptions" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属模板：" prop="templateName">
          <el-select filterable clearable style="width:170px;" v-model="ruleForm.templateName" placeholder="请选择模板">
            <el-option :label="item.templateName" :value="item.templateName" v-for="(item,index) in templateOptions" :key="index"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item label="发送时间：">
        </el-form-item>
        <timeFrame
          style="margin-left:-15px;"
          :startDate.sync="ruleForm.startDate"
          :endDate.sync="ruleForm.endDate"
        >
        </timeFrame>


        <el-button @click="handleSearch" type="warning">查询</el-button>

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
				<el-table-column prop="smsId" label="短信ID" width="155px"></el-table-column>
        <el-table-column prop="clientSmsId" label="客户短信ID" width="155px"></el-table-column>
        <el-table-column prop="clientName" label="所属客户" width="155px"></el-table-column>
        <el-table-column prop="clientSigner" label="短信签名" width="155px"></el-table-column>
        <el-table-column prop="templateName" label="所属模板" width="155px"></el-table-column>
        <el-table-column prop="busiName" label="短信类型"></el-table-column>
        <el-table-column prop="fromPhone" label="发送号码" width="155px"></el-table-column>
        <el-table-column prop="toPhone" label="接收号码" width="155px"></el-table-column>
        <el-table-column prop="smsTime" label="发送时间" width="160px"></el-table-column>
        <el-table-column prop="smsStatus" label="发送状态">
          <template slot-scope="scope">
            {{
              scope.row.smsStatus === 0 ? '发送中' :
              scope.row.smsStatus === 1 ? '发送成功' :
              scope.row.smsStatus === 2 ? '发送失败' : ''
            }}
          </template>
        </el-table-column>
        <el-table-column prop="smsCount" label="短信数量"></el-table-column>
        <el-table-column prop="statusCount" label="接收数量"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleDetail(scope.row)" type="text">详情</el-button>
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

    <mdetail @successCBK="handleSearch" ref="mdetail"></mdetail>
	</div>
</template>

<script>
  import mdetail from './modules/detailDialog.vue'
  import timeFrame from '@/components/timeFrame.vue'
  export default {
		components : {
      mdetail,
      timeFrame,
		},
		data() {
			return {
				ruleForm : {
					// 短信ID
          smsId : '',
          // 客户短信ID
          clientSmsId : '',
          // 所属客户
          clientName : '',
          // 接收号码
          toPhone : '',
          // 短信类型
          smsType : '',
          // 所属模板
          templateName : '',
          // 开始时间
          startDate : '',
          // 结束时间
          endDate : '',
				},
				rules : {},

				// 表格数据
        tableData : [],
        // 数据总数
        total : 11,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
        
        // 所属模板 options
        templateOptions : [],
        // 短信类型 options
        smsTypeOptions : [],
				
			}
    },
    mounted() {
      this.initTableList();

      // 获取所属 模板options
      this.$http({
        method : 'post',
        url : '/templateManagement/queryTemplateNameList.htm',
      }).then((res) => {
        this.templateOptions = res.result;
      });
      // 短信类型 模板options
      this.$http({
        method : 'post',
        url : '/busiManagement/queryDeliveryBusiInfoByBaseQuery.htm',
        data : {
          pageSize : 1000,
          currentNum: 1,
        },
      }).then((res) => {
        this.smsTypeOptions = res.result.list;
      });
    },
		methods : {
			// 点击搜索
			handleSearch() {
				this.currentPage = 1;
        this.initTableList();
      },
      
      // 点击 详情
      handleDetail(row) {
        this.$refs.mdetail.show('detail',row);
      },

			// 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/smsSend/querySmsSendByBaseQuery.htm',
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

.ser-sms-send{
	
}

</style>

<style lang="scss">

/* .ser-sms-send{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
} */

</style>