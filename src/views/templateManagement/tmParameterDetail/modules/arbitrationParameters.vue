<template>
  <div class="tm-parameter-detail-arbitration-parameters">
    <div class="fl mcont-left">
      <scrollTop :text="getCnText()"></scrollTop>
    </div>
    <div class="fr mcont-right">
      <p class="cp-title">仲裁参数</p>
    
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
                    scope.row.valueType === 4 ? 'Decimal' :
                    scope.row.valueType === 5 ? 'JSON' : ''
                  )
                }}
              </template>
            </el-table-column>
            <el-table-column prop="isCommon" label="属性"></el-table-column>
            <el-table-column prop="paramNote" label="说明"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row)" type="text">编辑</el-button>
                <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
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
          url : '/param/queryArbParamList.htm',
        }).then((res) => {
          this.list = res.result;
          callback && callback();
        }).catch(() => {
          callback && callback();
        });
      },
      // 左侧中文
      getCnText() {
        return ['仲裁参数']
      },
      // 点击新增
      handleAdd() {
        this.$refs.parameterDialog.show('add',{

        });
      },
      // 点击编辑
      handleEdit(row) {
        this.$refs.parameterDialog.show('edit',{
          ...row,
        });
      },
      handleDelete(row) {
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

.tm-parameter-detail-arbitration-parameters{
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