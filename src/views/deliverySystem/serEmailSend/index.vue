<template>
	<div class="ser-email-send">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">邮件发送</a>
    </div>
		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="125px">
        <el-form-item label="邮件ID：" prop="mailId">
          <el-input v-model.trim="ruleForm.mailId" placeholder="请输入邮件ID" style="width:170px;"></el-input>
        </el-form-item>

        <el-form-item label="发送邮件地址：" prop="senderAddress">
          <el-input v-model.trim="ruleForm.senderAddress" placeholder="请输入发送邮件地址" style="width:170px;"></el-input>
        </el-form-item>

        <el-form-item label="发送邮件人名称：" prop="senderName">
          <el-input v-model.trim="ruleForm.senderName" placeholder="请输入发送邮件人名称" style="width:170px;"></el-input>
        </el-form-item>
        

        <el-form-item label="接收邮件地址：" prop="toEmail">
          <el-input v-model.trim="ruleForm.toEmail" placeholder="请输入接收邮件地址" style="width:170px;"></el-input>
        </el-form-item>

        <el-form-item label="接收邮件人名称：" prop="mailReceiver">
          <el-input v-model.trim="ruleForm.mailReceiver" placeholder="请输入接收邮件人名称" style="width:170px;"></el-input>
        </el-form-item>

        <el-form-item label="邮件标题：" prop="mailTitle">
          <el-input v-model.trim="ruleForm.mailTitle" placeholder="请输入邮件标题" style="width:170px;"></el-input>
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
				<el-table-column prop="mailId" label="邮件ID" width="155px"></el-table-column>
        <el-table-column prop="clientName" label="所属客户名称" width="155px"></el-table-column>
        <el-table-column prop="clientMailId" label="邮件调用方的定义该邮件的唯一ID" width="155px"></el-table-column>
        <el-table-column prop="senderAddress" label="发送邮件邮箱地址" width="155px"></el-table-column>
        <el-table-column prop="fromSmtp" label="发送邮件邮箱SMTP地址" width="155px"></el-table-column>
        <el-table-column prop="port" label="发送邮件邮箱SMTP端口号" width="155px"></el-table-column>
        <el-table-column prop="senderName" label="发送邮件人名称" width="155px"></el-table-column>
        <el-table-column prop="toEmail" label="接收邮件地址" width="155px"></el-table-column>
        <el-table-column prop="mailReceiver" label="接收邮件人名称" width="155px"></el-table-column>
        <el-table-column prop="mailTitle" label="邮件标题" width="155px"></el-table-column>
        <el-table-column prop="mailStatus" label="邮件发送状态">
          <template slot-scope="scope">
            {{
              scope.row.mailStatus === 0 ? '待发送' :
              scope.row.mailStatus === 1 ? '发送成功' :
              scope.row.mailStatus === 2 ? '发送失败' : ''
            }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="155px"></el-table-column>
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
					// 邮件ID
          mailId : '',
          // 发送邮件地址
          senderAddress : '',
          // 发送邮件人名称
          senderName : '',
          // 接收邮件地址
          toEmail : '',
          // 接收邮件人名称
          mailReceiver : '',
          // 邮件标题
          mailTitle : '',
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
      
      // 点击 详情
      handleDetail(row) {
        this.$refs.mdetail.show('detail',row);
      },

			// 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/emailSend/queryEmailInfoByBaseQuery.htm',
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

.ser-email-send{
	
}

</style>

<style lang="scss">

/* .ser-email-send{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
} */

</style>