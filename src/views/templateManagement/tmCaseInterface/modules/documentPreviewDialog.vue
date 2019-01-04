<template>
  <div class="tm-caseInterface-document-preview-dialog">
    <el-dialog
      title="接口文档预览（参数部分)"
      :visible.sync="dialogVisible"
      width="880px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-radio-group @change="handleChange" v-model="type" size="small">
          <el-radio-button :label="1">参数列表</el-radio-button>
          <el-radio-button :label="2">参数样例</el-radio-button>
        </el-radio-group>

        <div class="mt-20">
          <template v-if="type === 1">
            <div class="m-table">
              <table
                class="m-primordial-table 
                  el-table el-table--fit el-table--border 
                  el-table--enable-row-hover"
              >
                <tr>
                  <td colspan="2">序号</td>
                  <td colspan="6">参数</td>
                  <td colspan="4">中文</td>
                  <td colspan="4">类型</td>
                  <td colspan="8">说明</td>
                </tr>

                <!-- 循环数据 -->
                <template v-for="(item,index) in tableData">
                  <tr :key="index">
                    <td colspan="2" :rowspan="item.params.length + 1">{{index + 1}}</td>
                    <td colspan="6">{{item.categoryName}}</td>
                    <td colspan="4">{{item.categoryDesc}}</td>
                    <td colspan="4">JSON</td>
                    <td colspan="8">{{item.categoryDesc}}</td>
                  </tr>
                  <template v-for="(item2,index2) in item.params">
                    <tr :key="index + '' + index2">
                      <td colspan="2">{{index2 + 1}}</td>
                      <td colspan="4">{{item2.paramCode}}</td>
                      <td colspan="4">{{item2.paramName}}</td>
                      <td colspan="4">
                        {{
                          (
                            item2.valueType === 1 ? 'Integer' :
                            item2.valueType === 2 ? 'String' :
                            item2.valueType === 3 ? 'Date' :
                            item2.valueType === 4 ? 'Decimal' : ''
                          )
                        }}
                      </td>
                      <td colspan="8">{{item2.paramNote}}</td>
                    </tr>
                  </template>
                </template>
              </table>
            </div>
          </template>
          <template v-else>
            <div class="code">
              <pre>
                <code>{{jsonData}}</code>
              </pre>
            </div>
          </template>
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确定生成</el-button>
        <el-button @click="dialogVisible = false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import exportFile from '@/assets/js/exportFile.js'
  import hljs from 'highlight.js'
  import 'highlight.js/styles/monokai-sublime.css' //样式文件
  export default {
    data() {
      return {
        dialogVisible : false,
        // 1 参数列表 2 参数样例
        type : 1,

        // 模板 id
        prodTempId : this.$route.query.prodTempId,
        // 数据 id
        dataId : '',
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
              }
            ],
          }
        ],
        // json数据
        jsonData : {
          aaa : 10,
          bbb : '20',
        },
      }
    },
    mounted() {

    },
    methods : {
      show(data) {
        this.dialogVisible = true;
        this.dataId = data.dataId;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        this.$nextTick(() => {
          // 处理逻辑 写在nextTick中 ， 防止dialog没有加载数据问题
          this.initTable();
          this.init();
        });
      },
      // 获取表格数据
      initTable() {
        this.$http({
          method : 'post',
          url : '/interface/queryInterfaceParamList.htm',
          data : {
            dataSource : 0,
            prodTempId : this.prodTempId,
          },
        }).then((res) => {
          this.tableData = res.result;
        });
      },
      // 获取参数样例数据
      init() {
        this.$http({
          method : 'post',
          url : '/interface/queryDataSimpleByDataId.htm',
          data : {
            dataId : this.dataId,
            prodTempId : this.prodTempId,
          },
        }).then((res) => {
          this.jsonData = JSON.parse(res.result);
        });
      },
      handleChange(val) {
        if(val === 2) {
          let code = document.querySelector('.code code');
          this.$nextTick(() => {
            hljs.highlightBlock(code);
          });
        }
      },

      // 关闭浮层
      handleClose() {
				this.type = 1;
      },
      // 点击提交
      handleSubmit(submitType) {
        exportFile({
          url : '/interface/downloadInterfaceDoc.htm',
          data : {
            dataId : this.dataId,
            prodTempId : this.prodTempId,
          },
        });
      },
    },
  }
</script>

<style scoped lang="scss">

.tm-caseInterface-document-preview-dialog{

}

</style>
