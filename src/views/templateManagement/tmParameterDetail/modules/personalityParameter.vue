<template>
  <div class="tm-parameter-detail-personality-parameter">
    <div class="fl mcont-left">
      <scrollTop :text="getCnText()"></scrollTop>
    </div>
    <div class="fr mcont-right">
      <template v-if="type === 1">
        <p class="cp-title">产品列表</p>
        <div>
          <template v-for="(item,index) in productList">
            <el-button class="mb-20" @click="handleProductDetail(item)" :key="index">{{item.productName}}</el-button>
          </template>
          <el-button class="mb-20" @click="handleProductAdd" icon="el-icon-plus"></el-button>
        </div>
      </template>
      <template v-else>
        <div class="cp-title" style="overflow:hidden;">
          <p class="fl">{{productActive.productName}}</p>
          <div class="fr">
            <el-button @click="handleGoBack" size="small">返回</el-button>
          </div>
        </div>
    
        <div class="m-table-item">
          <div class="m-title">
            <div class="fl scroll-top-item add-text">参数列表</div>
            <div class="fr">
              <el-button @click="handleAdd" type="primary" size="small">添加</el-button>
            </div>
          </div>

          <div>
            <el-table
              :data="list"
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
                  <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </template>
    </div>

    <parameterDialog @successCBK="successCBK" ref="parameterDialog"></parameterDialog>
    <productDialog @successCBK="productSuccess" ref="productDialog"></productDialog>
  </div>
</template>

<script>
  // 滚动插件
  import scrollTop from '@/components/scrollTop'
  // 弹窗
  import parameterDialog from './parameterDialog.vue'
  // 产品 dialog
  import productDialog from './productDialog.vue'
  export default {
    components : {
      scrollTop,
      parameterDialog,
      productDialog,
    },
    data() {
      return {
        // 1 产品列表状态 2 表格状态
        type : 1,
        // 产品当前展开的产品
        productActive : {
          productName : '产品a',
          productId : '1'
        },
        // 产品 list
        productList : [
          {
            productName : '产品a',
            productId : '1'
          },
          {
            productName : '产品b',
            productId : '2'
          },
        ],
        // 表格 list
        list : [
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
            paramType : 1,
          },
        ],
      }
    },
    mounted() {
      this.init();
    },
    methods : {
      // 初始化表格
      initTable() {
        this.$http({
          method : 'post',
          url : '/param/queryPersonalParamList.htm',
          data : {
            productId : this.productActive.productId,
          },
        }).then((res) => {
          this.list = res.result;
        });
      },
      // 初始化产品
      init() {
        this.$http({
          method : 'post',
          url : '/param/queryProductList.htm',
          data : {
            // 1 查询全部 0 查询没有选择的产品
            hasPersonalParam : 1,
          },
        }).then((res) => {
          this.productList = res.result;
        });
      },
      // 左侧中文
      getCnText() {
        return ['仲裁参数']
      },
      // 点击新增 表格
      handleAdd() {
        this.$refs.parameterDialog.show('add',{
          productId : this.productActive.productId,
        });
      },
      // 点击编辑 表格
      handleEdit(row) {
        this.$refs.parameterDialog.show('edit',{
          ...row,
          productId : this.productActive.productId,
        });
      },
      // 弹窗成功回调 表格
      successCBK() {
        this.initTable();
      },
      // 产品新增
      handleProductAdd() {
        this.$refs.productDialog.show();
      },
      // 产品详情
      handleProductDetail(item) {
        this.productActive = item;
        this.type = 2;
        this.initTable();
      },
      // 产品 新增成功回调
      productSuccess() {
        this.init();
      },
      // 点击返回
      handleGoBack() {
        this.type = 1;
      },
    },
  }
</script>

<style lang="scss" scoped>

.tm-parameter-detail-personality-parameter{
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