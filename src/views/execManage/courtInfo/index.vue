<template>
	<div class="courtInfo-box">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">法院信息表</a>
    </div>

		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
				<span class="inline">法院类型：</span>
        <el-form-item label=" " prop="courtType">
          <el-select clearable v-model="ruleForm.courtType" placeholder="请选择" style="width:150px;">
            <el-option 
              v-for="(item,index) in courtTypeOptions" 
              :key="index" 
              :label="item.label" 
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" " prop="provinceCode">
          <cityCascader
            :provinceCode.sync="ruleForm.provinceCode"
            :cityCode.sync="ruleForm.cityCode"
            :districtCode.sync="ruleForm.districtCode"  
            ref="cityCascader"
            @finish="cityFinish"
            @cancel="cityCancel"
          >
          </cityCascader>
        </el-form-item>


				<span class="inline">法院：</span>
        <el-form-item label=" " prop="courtId">
          <el-select clearable v-model="ruleForm.courtId" placeholder="请选择" style="width:185px;">
            <el-option 
              v-for="(item,index) in courtOptions" 
              :key="index" 
              :label="item.courtName" 
              :value="item.courtId"
            >
            </el-option>
          </el-select>
        </el-form-item>

				<div class="mt-20">
					<span class="ml-30">查询：</span>
					<el-form-item label=" " prop="keyWords">
						<el-input v-model.trim="ruleForm.keyWords" placeholder="输入法院、地址、电话"></el-input>
					</el-form-item>

          <el-button @click="handleSearch" type="warning">查询</el-button>

          <div class="fr">
            <el-button @click="handleAdd" type="primary" class="mr-10"><i class="el-icon-plus"></i>新增</el-button>
          </div>

        </div>
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
				<el-table-column prop="respondents" label="法院类型" width="120px">
          <template slot-scope="scope">
            {{
              scope.row.courtType === 1 ? '基层人民法院' :
              scope.row.courtType === 2 ? '中级人民法院' :
              scope.row.courtType === 3 ? '高级人民法院' :
              scope.row.courtType === 4 ? '最高人民法院' : ''
            }}
          </template>
        </el-table-column>
        <el-table-column prop="province" label="省" width="120px"></el-table-column>
        <el-table-column prop="city" label="市" width="120px"></el-table-column>
        <el-table-column prop="district" label="区" width="120px"></el-table-column>
        <el-table-column prop="courtName" label="法院名" width="120px"></el-table-column>
        <el-table-column prop="courtAddress" label="地址" width="120px"></el-table-column>
        <el-table-column prop="courtPhone" label="电话" width="120px"></el-table-column>
        <el-table-column label="操作" width="120px" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text">修改</el-button>
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

      <mdialog @successCBK="successCBK" ref="dialog"></mdialog>
    </div>
	</div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import mdialog from './modules/dialog.vue'
  import cityCascader from '@/components/cityCascader.vue'
	export default {
		components : {
      timeFrame,
      mdialog,
      cityCascader,
		},
		data() {
			return {
				ruleForm : {
					// 省编码
          provinceCode : '',
          // 市编码
          cityCode : '',
          // 区编码
          districtCode : '',
          // 法院编码
          courtId : '',
          // 法院类型 1:基层人民法院;2:中级人民法院;3:高级人民法院;4:最高院
          courtType : '',
          // 关键字
          keyWords : '',
				},
				rules : {},

        // 法院 options
        courtOptions : [
          /* {courtName : '法院1' , courtId : '1'},
          {courtName : '法院2' , courtId : '2'},
          {courtName : '法院3' , courtId : '3'},
          {courtName : '法院4' , courtId : '4'}, */
        ],
        // 法院类型 options
        courtTypeOptions : [
          {label : '基础人民法院' , value : 1},
          {label : '中级人民法院' , value : 2},
          {label : '高级人民法院' , value : 3},
          {label : '最高人民法院' , value : 4},
        ],

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
      
      // 地区 选择完成回调
      cityFinish() {
        console.log('选择成功');
        this.$http({
          url : '/court/queryCourtInfoByDistrictCode.htm',
          method : 'post',
          data : {
            districtCode : this.ruleForm.districtCode,
          },
        }).then((res) => {
          this.courtOptions = res.result;
          this.ruleForm.courtId = '';
        });
      },
      // 地区 取消回调
      cityCancel() {
        this.courtOptions = [];
        this.ruleForm.courtId = '';
      },
      // 点击新增
      handleAdd() {
        this.$refs.dialog.show('add');
      },
      // 点击修改
      handleEdit(row) {
        console.log(row);
        this.$refs.dialog.show('edit',row);
      },
      // 新增 修改 成功回调
      successCBK() {
        this.initTableList();
      },
      // 点击启用，停用
      handleState(row) {

      },

			// 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/court/queryCourtlist.htm',
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

.courtInfo-box{
	.inline{
    display: inline-block;
    vertical-align: middle;
    margin-top: 14px;
  }
}

</style>

<style lang="scss">

.courtInfo-box{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
}

</style>