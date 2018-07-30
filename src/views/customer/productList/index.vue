<template>
	<div class="product-list">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">客户信息</a>
    </div>

    <div class="item-title">
      产品列表
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
				<el-table-column prop="prodName" label="产品名称">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.prodName" placement="top-start">
              <span class="fn-a ellipsis" style="max-width:112px;" @click="handleEditProduct(scope.row)">{{scope.row.prodName}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="prodCode" label="产品编码"></el-table-column>
        <el-table-column prop="busiName" label="业务类型"></el-table-column>
        <el-table-column prop="platName" label="借款平台"></el-table-column>
        <el-table-column prop="extraPhones" label="协商电话"></el-table-column>
        <el-table-column prop="productIp" label="IP白名单"></el-table-column>
        <el-table-column prop="productUrl" label="接口地址">
          <template slot-scope="scope">
            <el-tooltip :content="scope.row.productUrl" placement="top-start">
              <span class="ellipsis" style="max-width:108px;">{{scope.row.productUrl}}</span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <div class="m-footer">
        <el-button @click="handleAddProduct" type="primary" class="mr-20">
          <i class="el-icon-circle-plus-outline"></i>
          新增产品
        </el-button>
        <el-button @click="handleGoBack">返回</el-button>
      </div>

    </div>

    <productDialog @successCBK="successCBK" ref="productDialog"></productDialog>

	</div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import productDialog from './modules/productDialog.vue'
	export default {
		components : {
      timeFrame,
      productDialog,
		},
		data() {
			return {
				ruleForm : {

				},
				rules : {},

				// 表格数据
        tableData : [],
				
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
      // 点击新增 产品
      handleAddProduct() {
        this.$refs.productDialog.show('add');
      },
      // 编辑产品
      handleEditProduct(row) {
        this.$refs.productDialog.show('edit',row);
      },
      // 产品 dialog 回调
      successCBK() {
        this.initTableList();
      },

      // 点击返回
      handleGoBack() {
        this.$router.push('clientManagement');
      },

			// 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/merchant/queryClientInfoByClientCode.htm',
          method : 'post',
          data : {
            clientCode : this.$route.query.clientCode,
          },
        }).then((res) => {
          this.tableData = res.result;
        });
      },

      // 表格相关 end
		},
	}
</script>

<style lang="scss" scoped>

.product-list{
	.m-footer{
    margin-top: 40px;
    margin-bottom: 40px;
    text-align: center;
  }
}

</style>

<style lang="scss">

.product-list{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
}

</style>