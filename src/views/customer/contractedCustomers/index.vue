<template>
	<div class="customer-contracted-customers">
		<div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="0px">
        <el-form-item label=" " prop="keyWords">
          <el-input v-model.trim="ruleForm.keyWords" placeholder="请输入负责人、客户、产品" style="width:217px;"></el-input>
        </el-form-item>

        <el-form-item label=" " prop="isPay">
          <el-select clearable v-model="ruleForm.isPay" placeholder="请选择打款状态">
            <el-option label="已付款" :value="1"></el-option>
            <el-option label="未付款" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" " prop="agreementStatus">
          <el-select clearable v-model="ruleForm.agreementStatus" placeholder="请选择协议上线状态">
            <el-option label="已上线" :value="1"></el-option>
            <el-option label="未上线" :value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label=" " prop="finishAbutment">
          <el-select clearable v-model="ruleForm.finishAbutment" placeholder="请选择系统对接状态">
            <el-option label="已完成" :value="1"></el-option>
            <el-option label="未完成" :value="0"></el-option>
          </el-select>
        </el-form-item>


        <el-button @click="handleSearch" type="warning">查询</el-button>
      </el-form>
    </div>

    <div class="item-title of-hidden" style="padding: 5px 0;">
      <span class="item-title-sign" style="margin-top:13px;display:inline-block;">签约客户</span>
      <div class="fr">
        <el-button @click="handleAdd" type="primary">新增</el-button>
        <el-button @click="handleExport">导出</el-button>
      </div>
    </div>

		<div class="item-table">
      <el-table
        :data="tableData"
        border
        :span-method="arraySpanMethod"
      >
				<el-table-column prop="salesman" label="销售"></el-table-column>
        <el-table-column prop="operator" label="运营"></el-table-column>
        <el-table-column prop="clientName" label="客户名称"></el-table-column>
        <el-table-column prop="productName" label="产品名称"></el-table-column>
        <el-table-column prop="averageQuantity" label="件均"></el-table-column>
        <el-table-column prop="isPay" label="是否完成付款">
          <template slot-scope="scope">
            {{
              scope.row.isPay === 1 ? '付款' : '未付款'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="agreementStatus" label="协议是否上线">
          <template slot-scope="scope">
            {{
              scope.row.agreementStatus === 1 ? '已上线' : '未上线'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="agreementRegion" label="协议上线区域"></el-table-column>
        <el-table-column prop="finishAbutment" label="系统是否完成对接">
          <template slot-scope="scope">
            {{
              scope.row.finishAbutment === 1 ? '已完成' : '为完成'
            }}
          </template>
        </el-table-column>
        <el-table-column prop="debtTransfer" label="客户是否可以债转">
          <template slot-scope="scope">
            {{
              scope.row.debtTransfer === 1 ? '可债转' : '不可债转'
            }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="handleEdit(scope.row)" type="text">修改</el-button>
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

    <mdialog ref="mdialog"></mdialog>
	</div>
</template>

<script>
  import exportFile from '@/assets/js/exportFile.js'
  import mdialog from './modules/dialog.vue'
	export default {
		components : {
      mdialog,
		},
		data() {
			return {
				ruleForm : {
					// 关键字
					keyWords : '',
					// 是否完成付款 1-付款,0-未付款
          isPay : '',
          // 协议是否上线 1-已上线,0-未上线
          agreementStatus : '',
          // 系统是否完成对接 1-已完成,0-未完成
          finishAbutment : '',
				},
        rules : {},
        tableActive : 0,

				// 表格数据
        tableData : [{clientName : '张三1' , salesman : '销售1'},{clientName : '张三2' , salesman : '销售2'},{clientName : '张三2'}],
        // 数据总数
        total : 11,
        // 当前页数
        currentPage : 1,
        // 每页数量
				pageSize : 10,
				
			}
    },
    mounted() {
      //this.initTableList();
    },
		methods : {
			// 点击搜索
			handleSearch() {
				this.currentPage = 1;
        this.initTableList();
      },
      // 点击新增
      handleAdd() {
        this.$refs.mdialog.show('add');
      },
      // 点击修改
      handleEdit(row) {
        this.$refs.mdialog.show('edit',row);
      },
      // 点击删除
      handleDelete(row) {
        this.$confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          center: true
        }).then(() => {
          this.$http({
            method : 'post',
            url : '/reason/deletedTemplate.htm',
            data : {
              conditionId : row.conditionId,
            },
          }).then((res) => {
            this.$message.success('删除成功');
            this.initList();
          });
        }).catch(() => {});
      },
      // 表格 合并逻辑
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        /* let arr = this.tableData.filter((v,k) => {
          if(k >= rowIndex && (row.clientName === v.clientName && row.clientName === ( this.tableData[k+1] ? this.tableData[k+1].clientName : '') ) ) {
            return v;
          }
        });
        let length = arr.length;
        
        if (columnIndex === 2) {
          if (length > 0) {
            return {
              rowspan: length + 1,
              colspan: 1
            };
          } else {
            return {
              rowspan: 1,
              colspan: 0
            };
          }
        } */
        var property = 'clientName';
        if ( columnIndex === 2) {
            if(rowIndex === 0 ||  (this.tableData[rowIndex] && row[property] !== this.tableData[rowIndex-1][property])){
              let idx = -1;
              for(let i = this.tableData.length -1 ;i> rowIndex; i--){
                if(this.tableData[i][property] === row[property]){
                  idx = i;
                  break;
                }
              }

              if(idx!= -1){
                return {
                  rowspan: idx - rowIndex + 1,
                  colspan: 1
                }
              }else{
                  return {
                    rowspan: 1,
                    colspan: 1
                  };
              }
            }else{
              return {
                rowspan: 1,
                colspan: 0,
              };
            }

          }
      },
      // 点击导出
      handleExport() {

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

.customer-contracted-customers{
	
}

</style>

<style lang="scss">

.customer-contracted-customers{
  .item-search{
    .el-form-item{
      margin-bottom: 0;
    }
  }
}

</style>