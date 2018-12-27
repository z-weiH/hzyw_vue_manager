<template>
  <div class="tm-parameter-detail-case-parameters">
    <p class="cp-title">案件参数</p>
    
    <template v-for="(item,index) in list">
      <div class="m-table-item" :key="index">
        <div class="m-title">
          <div class="fl scroll-top-item">{{item.categoryDesc}}</div>
          <div class="fr">
            <el-button @click="handleAdd(item)" size="small">添加</el-button>
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
                <el-button @click="handleEdit(item)" type="text">编辑</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
  export default {
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
                paramCode : '',
                // 中文
                paramName : '',
                // 类型 1:数字,2:字符串,3:日期,4:金额
                valueType : '',
                // 属性 0 否 1 是 是否为通用参数 属性
                isCommon : '',
                // 说明
                paramNote : '',
              }
            ],
          },{categoryDesc : '啦啦啦'},
        ],
      }
    },
    mounted() {

    },
    methods : {
      // 点击新增
      handleAdd(item) {

      },
      // 点击编辑
      handleEdit(item) {
        
      },
    },
  }
</script>

<style lang="scss" scoped>

.tm-parameter-detail-case-parameters{
  padding-left: 60px;
  .cp-title{
    font-size: 20px;
    padding: 30px 0;
    font-weight: bold;
  }
  .m-table-item{
    height: 2000px;
    .m-title{
      line-height: 32px;
      overflow: hidden;
      .fl{
        font-size: 16px;
      }
    }
  }
}

</style>