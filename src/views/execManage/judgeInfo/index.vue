<template>
	<div class="judge-info-box">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">注册法官信息</a>
    </div>

		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
				<el-cascader
					:options="cityOptions"
          clearable
					v-model="ruleForm.selectedOptions"
          @change="handleRegion"
          placeholder="地区"
					change-on-select
          :props="{
            label : 'label',
            children : 'children',
          }"
          class="mr-20"
				>
				</el-cascader>

        <span>法院：</span>
        <el-form-item label=" " prop="accountAge">
          <el-select clearable v-model="ruleForm.accountAge" placeholder="请选择法院" style="width:150px;">
            <el-option 
              v-for="(item,index) in courtOptions" 
              :key="index" 
              :label="item.label" 
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <span>法官：</span>
        <el-form-item label=" " prop="keyWords">
          <el-input v-model.trim="ruleForm.keyWords" placeholder="姓名、手机、座机" style="width:178px;"></el-input>
        </el-form-item>

        
        <span>角色：</span>
        <el-form-item label=" " prop="accountAge">
          <el-select clearable v-model="ruleForm.accountAge2" placeholder="请选择角色" style="width:150px;">
            <el-option 
              v-for="(item,index) in roleOptions" 
              :key="index" 
              :label="item.label" 
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

				<div class="mt-20">
          <span>录入日期：</span>
          <timeFrame
            :startDate.sync="ruleForm.startDate"
            :endDate.sync="ruleForm.endDate"
            startPlaceholder="开始时间"
            endPlaceholder="结束时间"
          >
          </timeFrame>

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
				<el-table-column prop="respondents" label="省" width="120px"></el-table-column>
        <el-table-column prop="respondents" label="法院" width="120px"></el-table-column>
        <el-table-column prop="respondents" label="角色" width="120px"></el-table-column>
        <el-table-column prop="respondents" label="姓名" width="120px"></el-table-column>
        <el-table-column prop="respondents" label="手机" width="120px"></el-table-column>
        <el-table-column prop="respondents" label="座机" width="120px"></el-table-column>
        <el-table-column prop="respondents" label="法院地址" width="120px"></el-table-column>
        <el-table-column prop="respondents" label="录入日期" width="120px"></el-table-column>
        <el-table-column prop="respondents" label="备注" width="120px"></el-table-column>
        <el-table-column label="操作" width="120px" fixed="right" align="center">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text">修改</el-button>
            <el-button @click="handleState(scope.row)" type="text">启用</el-button>
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

      <mdialog ref="dialog"></mdialog>
    </div>
	</div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import mdialog from './modules/dialog.vue'
  import {rawCitiesData} from '@/assets/js/city'
	export default {
		components : {
      timeFrame,
      mdialog,
		},
		data() {
			return {
				ruleForm : {
					// 关键字
					keyWords : '',
					// 开始时间
					startDate : '',
					// 结束时间
					endDate : '',
				},
				rules : {},

				// 城市tree
        cityOptions : rawCitiesData,
        // 法院 options
        courtOptions : [
          {label : '法院a' , value : 'a'},
          {label : '法院b' , value : 'b'},
        ],
        // 角色 options
        roleOptions : [
          {label : '立案法官' , value : '1'},
          {label : '执行法官' , value : '2'},
          {label : '立案庭庭长' , value : '3'},
          {label : '执行庭庭长' , value : '4'},
          {label : '法院院长' , value : '5'},
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
      
      // 地区change
      handleRegion(val) {
        console.log(val);
      },
      // 点击新增
      handleAdd() {
        this.$refs.dialog.show('add');
      },
      // 点击修改
      handleEdit(row) {
        this.$refs.dialog.show('edit',row);
      },
      // 点击启用，停用
      handleState(row) {

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

.judge-info-box{
	
}

</style>

<style lang="scss">

.judge-info-box{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
}

</style>