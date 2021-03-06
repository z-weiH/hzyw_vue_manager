<template>
  <div class="tm-parameter-detail-case-parameters">
    <div class="fl mcont-left">
      <scrollTop :text="getCnText()"></scrollTop>
    </div>
    <div class="fr mcont-right">
      <p class="cp-title">案件参数</p>
    
      <template v-for="(item,index) in list">
        <div class="m-table-item" :key="index">
          <div class="m-title">
            <div class="fl scroll-top-item add-text">{{item.categoryDesc}}</div>
            <div class="fr">
              <el-button @click="handleAdd(item)" type="primary" size="small">添加</el-button>
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
                      scope.row.valueType === 4 ? 'Decimal' :
                      scope.row.valueType === 5 ? 'JSON' : ''
                    )
                  }}
                </template>
              </el-table-column>
              <el-table-column prop="isCommon" label="属性">
                <template slot-scope="scope">
                  {{
                    (
                      scope.row.isCommon === 1 ? '通用' :
                      scope.row.isCommon === 0 ? '非通用' : ''
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

    <parameterDialog @successCBK="successCBK" ref="parameterDialog"></parameterDialog>
  </div>
</template>

<script>
  // 滚动插件
  import scrollTop from '@/components/scrollTop'
  // 弹窗
  import parameterDialog from './parameterDialog.vue'
  export default {
    components : {
      scrollTop,
      parameterDialog,
    },
    data() {
      return {
        list : [
          {
            // 参数分类的编码值: 1-基础信息 2-金额信息 3-当事人信息 4-日期信息 5-证据信息 6-还款信息 7-借款人银行卡信息 8-分期贷信息 9-代偿信息
            categoryCode : 1,
            // 参数分类的编码值中文
            categoryDesc : '基础类型',
            // 表格数据
            params : [
              {
                // 参数
                paramCode : '我是参数',
                // 中文
                paramName : '我是中文',
                // 类型 1:数字,2:字符串,3:日期,4:金额
                valueType : 4,
                // 属性 0 否 1 是 是否为通用参数 属性
                isCommon : 1,
                // 说明
                paramNote : '我是说明',
                // id
                paramId : 'id',
                paramType : 0,
              }
            ],
          },
          {
            categoryCode : 2,
            categoryDesc : '金额信息',
            params : [],
          },
        ],
      }
    },
    mounted() {
      let loading = this.$loading();
      this.init(() => {
        loading.close();
      });
    },
    methods : {
      // 初始化页面数据
      init(callback) {
        this.$http({
          method : 'post',
          url : '/param/queryCaseParamList.htm',
        }).then((res) => {
          this.list = this.dataFormat(res.result);
          callback && callback();
        }).catch(() => {
          callback && callback();
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
          {
            categoryCode : 10,
            categoryDesc : '短信信息',
          },
          {
            categoryCode : 11,
            categoryDesc : '贷款信息',
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
        return this.list.map( v => v.categoryDesc);
      },
      // 点击新增
      handleAdd(item) {
        this.$refs.parameterDialog.show('add',{
          categoryCode : item.categoryCode
        });
      },
      // 点击编辑
      handleEdit(item,row) {
        this.$refs.parameterDialog.show('edit',{
          ...row,
          categoryCode : item.categoryCode,
        });
      },
      // 点击删除
      handleDelete(item,row) {
        this.$confirm('确认删除该参数?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel',
          confirmButtonClass: 'confirm',
          center: true,
        }).then(() => {
          this.$http({
            method : 'post',
            url : '/param/deleteParamByParamId.htm',
            data : {
              paramId : row.paramId,
            },
          }).then((res) => {
            this.$message.success('删除成功');
            this.init();
          });
        }).catch(() => {

        });
      },
      // 弹窗成功回调
      successCBK() {
        this.init();
      },
    },
  }
</script>

<style lang="scss" scoped>

.tm-parameter-detail-case-parameters{
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

</style>