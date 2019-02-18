<template>
  <el-dialog
    :visible.sync="flag"
    v-dialogDrag
    title="脚本规则列表"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="800px"
  >
    <p>以下 {{'3'}} 条脚本规则引用了审核意见“{{`[${item.code}]${item.negReasonMsg}`}}”。</p>
        <ul class="ul" style="max-height: 400px;overflow: auto">
          <li class="li" v-for="(li,idx) in ruleList" :key="idx">
            <div class="left">
              {{idx + 1}}
            </div>
            <div class="right">
              <ul>
                <li>
                  <span class="label">产品模板</span>
                  <span class="value">{{li.templateName}}</span>
                </li>
                <li>
                  <span class="label">规则描述</span>
                  <span class="value">{{li.ruleDesc}}</span>
                </li>
                <li>
                  <span class="label">规则代码</span>
                  <span class="value">{{li.ruleContent}}</span>
                </li>
              </ul>
            </div>
          </li>
        </ul>

      <div style="text-align: center"  slot="footer">
        <el-button @click="flag = false">关闭</el-button>
      </div>

    </el-dialog>
</template>

<script>
    export default {
      name: 'quoteRules',
      data() {
        return {
          flag: false,
          item: {},
          ruleList: [
            {templateName: '奇速贷-1001', ruleDesc: '验证借款起止时间与合同中约定的时间是否一致', ruleContent: 'if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}'},
            {templateName: '奇速贷-1001', ruleDesc: '验证借款起止时间与合同中约定的时间是否一致', ruleContent: 'if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}'},
            {templateName: '奇速贷-1001', ruleDesc: '验证借款起止时间与合同中约定的时间是否一致', ruleContent: 'if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}'},
            {templateName: '奇速贷-1001', ruleDesc: '验证借款起止时间与合同中约定的时间是否一致', ruleContent: 'if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}'},
            {templateName: '奇速贷-1001', ruleDesc: '验证借款起止时间与合同中约定的时间是否一致', ruleContent: 'if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}'},
            {templateName: '奇速贷-1001', ruleDesc: '验证借款起止时间与合同中约定的时间是否一致', ruleContent: 'if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075},if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075},if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075},if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}'},
          ]
        }
      },
      methods: {
        show(obj) {
          console.log(obj);
          this.item = obj;
          this.flag = true;
        }
      }
    }
</script>

<style scoped lang="scss">
  .ul{
    border: 1px solid #ccc;
    border-bottom: none;
    .li{
      display: flex;
      border-bottom: 1px solid #ccc;
      .left{
        width:30px;
        align-items:center;/*垂直居中*/
        display: flex;
        justify-content: center;
        border-right: 1px solid #ccc;
      }
      .right{
        flex: 1;
        li{
          display: flex;
          padding: 10px 15px;
          .label{
            width: 100px;
            font-weight: bold;
          }
          .value{
            flex: 1;
          }
        }
      }
    }
  }

</style>
