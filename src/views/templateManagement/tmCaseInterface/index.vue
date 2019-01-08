<template>
  <div class="tm-caseInterface">
    <div class="tm-head">
      <div class="fl">接口列表-{{$route.query.prodTempName}}</div>
      <div class="fr">
        <el-button @click="handleAdd" size="small">添加参数</el-button>
        <el-button @click="handleDoc" size="small" type="primary">生成文档</el-button>
      </div>
    </div>

    <div class="tm-content">
      <div class="fl">
        <scrollTop :text="getCnText()"></scrollTop>
      </div>

      <div class="fr mcont-right">
        <div class="m-scrollbar-box">
          <el-scrollbar :native="false">
            <div>
              <p class="cp-title">案件参数</p>
    
              <template v-for="(item,index) in tableData">
                <div class="m-table-item" :key="index">
                  <div class="m-title">
                    <div class="fl scroll-top-item add-text">{{item.categoryDesc}}</div>
                    <div class="fr">
                    </div>
                  </div>

                  <div>
                    <el-table
                      :data="item.params"
                      border
                      class="mt-20 mb-20"
                    >
                      <el-table-column prop="date" label="序号" width="50px">
                        <template slot-scope="scope">
                          {{scope.$index + 1}}
                        </template>
                      </el-table-column>
                      <el-table-column prop="paramCode" label="参数"></el-table-column>
                      <el-table-column prop="paramName" label="中文"></el-table-column>
                      <el-table-column prop="valueType" label="类型">
                        <template slot-scope="scope">
                          {{
                            (
                              scope.row.valueType === 1 ? 'Integer' :
                              scope.row.valueType === 2 ? 'String' :
                              scope.row.valueType === 3 ? 'Date' :
                              scope.row.valueType === 4 ? 'Decimal' : ''
                            )
                          }}
                        </template>
                      </el-table-column>
                      <el-table-column prop="dataSource" label="数据来源">
                        <template slot-scope="scope">
                          {{
                            (
                              scope.row.dataSource === 0 ? '接口' :
                              scope.row.dataSource === 1 ? '脚本' :
                              scope.row.dataSource === 2 ? '公式' :
                              scope.row.dataSource === 3 ? '账户' : ''
                            )
                          }}
                        </template>
                      </el-table-column>
                      <el-table-column prop="paramNote" label="说明"></el-table-column>
                      <el-table-column label="操作" align="center">
                        <template slot-scope="scope">
                          <el-button @click="handleEdit(item,scope.row)" type="text">编辑</el-button>
                          <el-button @click="handleDelete(item,scope.row)" type="text">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                </div>
              </template>
            </div>
          </el-scrollbar>
        </div>
      </div>
    </div>
    <dataTemplateDialog ref="dataTemplateDialog"></dataTemplateDialog>
    <parameterDialog @successCBK="successCBK" ref="parameterDialog"></parameterDialog>
  </div>
</template>

<script>
  // 滚动插件
  import scrollTop from '@/components/scrollTop'
  // 数据模板 dialog
  import dataTemplateDialog from './modules/dataTemplateDialog.vue'
  // 参数 dialog
  import parameterDialog from './modules/parameterDialog.vue'
  export default {
    components : {
      scrollTop,
      dataTemplateDialog,
      parameterDialog,
    },
    data() {
      return {
        tableData : [
          {
            // 参数分类的编码值: 1-基础信息 2-金额信息 3-当事人信息 4-日期信息 5-证据信息 6-还款信息 7-借款人银行卡信息 8-分期贷信息 9-代偿信息
            categoryCode : 1,
            // 参数分类的编码值中文
            categoryDesc : '基础类型',
            // 参数名
            categoryName : 'caseBase',
            
            params : [
              {
                // 参数
                paramCode : 'loanBillNo',
                // 中文
                paramName : '案件订单编号',
                // 类型
                valueType : 2,
                // 说明
                paramNote : '客户借款单号',
                // 数据来源
                dataSource : 0,
              }
            ],
          }
        ],
      }
    },
    mounted() {
      this.init();
    },
    methods : {
      init() {
        this.$http({
          method : 'post',
          url : '/interface/queryInterfaceParamList.htm',
          data : {
            dataSource : '',
            prodTempId : this.$route.query.prodTempId,
          },
        }).then((res) => {
          this.tableData = this.dataFormat(res.result);
        });
      },
      // 处理数据 解决后台返回值不全问题（用于完整显示左侧菜单，以及空表格）
      dataFormat(tableData) {
        const typeArr = [
          {
            categoryCode : 1,
            categoryDesc : '基础类型',
          },
          {
            categoryCode : 2,
            categoryDesc : '金额信息',
          },
          {
            categoryCode : 3,
            categoryDesc : '当事人信息',
          },
          {
            categoryCode : 4,
            categoryDesc : '日期信息',
          },
          {
            categoryCode : 5,
            categoryDesc : '证据信息',
          },
          {
            categoryCode : 6,
            categoryDesc : '还款信息',
          },
          {
            categoryCode : 7,
            categoryDesc : '借款人银行卡信息',
          },
          {
            categoryCode : 8,
            categoryDesc : '分期贷信息',
          },
          {
            categoryCode : 9,
            categoryDesc : '代偿信息',
          },
        ];
        const result = [];
        typeArr.map((v) => {
          v.params = [];
          result.push(tableData.filter(v1 => v.categoryCode === v1.categoryCode)[0] || v);
        });
        return result;
      },
      // 左侧中文
      getCnText() {
        return this.tableData.map( v => v.categoryDesc);
      },
      // 新增参数
      handleAdd() {
        this.$refs.parameterDialog.show('add');
      },
      // 编辑参数
      handleEdit(item,row) {
        this.$refs.parameterDialog.show('edit',{
          ...row,
          categoryCode :item.categoryCode,
        });
      },
      // 删除参数
      handleDelete(item,row) {
        this.$confirm('确定删除该参数?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel',
          confirmButtonClass: 'confirm',
          center: true,
        }).then(() => {
          this.$http({
            method : 'post',
            url : '/interface/deleteInterfaceParam.htm',
            data : {
              id : row.id,
            },
          }).then((res) => {
            this.$message.success('删除成功');
            this.init();
          });
        },() => {
        }).catch(() => {});
      },
      // 参数dialog 回调
      successCBK() {
        this.init();
      },
      // 生成文档
      handleDoc() {
        this.$refs.dataTemplateDialog.show();
      },
    },
  }
</script>

<style lang="scss" scoped>

.tm-caseInterface{
  height: 100vh;
  overflow: auto;
  .tm-head{
    background-color: #fff;
    height: 50px;
    box-sizing: border-box;
    border-bottom: 1px solid #e0e4e8;
    .fl{
      color: #0f357f;
      padding-left: 18px;
      line-height: 50px;
      font-size: 26px;
    }
    .fr{
      margin-top: 10px;
      margin-right: 45px;
    }
  }

  .tm-content{
    .mcont-right{
      width: calc(100vw - 200px);
      box-sizing: border-box;
      padding-left: 60px;
      padding-right: 45px;
    }
    .cp-title{
      font-size: 20px;
      padding: 30px 0;
      font-weight: bold;
    }
    .m-table-item{
      .m-title{
        line-height: 32px;
        overflow: hidden;
        .add-text{
          font-size: 16px;
        }
      }
    }
  }
}

</style>

<style lang="scss">
.tm-caseInterface{
  .el-radio-button:focus:not(.is-focus):not(:active){
    box-shadow: none;
  }
}
</style> 

<style lang="scss">

.m-scrollbar-box{
  height: calc(100vh - 50px);
  overflow: hidden;
  .el-scrollbar{
    height: 100%;
  }
  .el-scrollbar__wrap{
    height: 100%;
    overflow-x: hidden;
  }
  .el-scrollbar__view{
    padding-right: 10px;
  }
}

</style> 