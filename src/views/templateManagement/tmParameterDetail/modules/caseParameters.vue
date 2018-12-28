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
                      scope.row.valueType === 4 ? 'Decimal' : ''
                    )
                  }}
                </template>
              </el-table-column>
              <el-table-column prop="isCommon" label="属性"></el-table-column>
              <el-table-column prop="paramNote" label="说明"></el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button @click="handleEdit(item,scope.row)" type="text">编辑</el-button>
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
      // this.init();
    },
    methods : {
      // 初始化页面数据
      init() {
        this.$http({
          method : 'post',
          url : '/param/queryCaseParamList.htm',
        }).then((res) => {
          this.list = res.result;
        });
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