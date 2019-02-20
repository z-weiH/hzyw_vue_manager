<template>
  <el-dialog
    :visible.sync="flag"
    v-dialogDrag
    title="脚本规则列表"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="800px"
  >
    <p>以下 {{ruleList.length}} 条脚本规则引用了审核意见“{{`[${item.code}]${item.negReasonMsg}`}}”。</p>
        <ul class="ul" ref="ul" style="max-height: 400px;overflow: auto">
          <li class="li" v-for="(li,idx) in ruleList" :key="idx">
            <div class="left">
              {{idx + 1}}
            </div>
            <div class="right">
              <ul>
                <li>
                  <span class="label">产品模板</span>
                  <span class="value">{{li.prodTempCode}}</span>
                </li>
                <li>
                  <span class="label">规则描述</span>
                  <span class="value">{{li.ruleDesc}}</span>
                </li>
                <li>
                  <span class="label">规则代码</span>
                  <span class="value">{{li.ruleInfo}}</span>
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

          ]
        }
      },
      methods: {
        show(obj) {
          console.log(obj);
          this.$http.post("/reason/queryRuleInfoByErrorCode.htm", {errorCode: obj.code}).then(res => {
            this.item = obj;
            this.ruleList = res.result;
            this.flag = true;
            this.$nextTick(() => {
              this.$refs.ul.scrollTop = 0;
            })
          })


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
