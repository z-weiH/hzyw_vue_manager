<template>
  <el-dialog
    :visible.sync="flag"
    v-dialogDrag
    title="配置规则的返回编码"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="800px"
  >
    <div class="reasonView">
      <p class="title">将以下哪些脚本规则的返回编码替换为“{{rule.code}}”（{{rule.negReasonMsg}}）？</p>
      <div class="content">
            <div class="w160">
              <el-scrollbar style="height: 100%">

              <ul>
                <li v-for="(item, idx)  in items" :class="{'active': idx === currentIndex}" :key="idx" @click="handleClick(idx)">
                  {{`${item.clientName}-${item.clientCode}`}}
                  <span v-if="item.selectedNum > 0">{{`(${item.selectedNum})`}}</span>
                </li>
              </ul>
              </el-scrollbar>

            </div>
          <div class="rules">
            <el-scrollbar style="height: 100%">

            <ul>
              <li v-for="(rule, idx) in ruleList" :key="idx">
                <div class="checkbox">
                  <el-checkbox ref="check" v-model="rule.selected" @change="refreshDisabled"></el-checkbox>
                </div>
                <div class="rule_content">
                  <ul>
                    <li>
                      <div class="label">规则描述</div>
                      <div class="value">{{rule.ruleDesc}}</div>
                    </li>
                    <li>
                      <div class="label">规则代码</div>
                      <div class="value">{{rule.ruleContent}}</div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            </el-scrollbar>

          </div>

      </div>
    </div>
    <div style="text-align: center;margin-top: 15px;">
      <el-button type="primary" @click="handleOK" :disabled="disabled">确定</el-button>
      <el-button @click="flag = false">取消</el-button>
    </div>


  </el-dialog>
</template>

<script>
    export default {
      name: 'reasonView',
      data(){
        return {
          flag: false,
          rule: {},
          ruleList: [],
          disabled: true,
          currentIndex: null,
          items: [

          ]
        }
      },

      watch: {
        'currentIndex'(val,oldval){
          this.ruleList = this.items[this.currentIndex].rules;
        },
        'flag'(val,oldval){
          if(!val){
            this.items = null;
            this.disabled = true;
            this.$refs.check.forEach(it => {
              it.model = false;
            })
            console.log(this.items)

          }
        }
      },
      methods: {
        refreshDisabled(val) {
          console.log(val);
          if(val){
            this.disabled = false;
          }else{
            this.disabled = !this.items.find(it => it.selectedNum > 0);
          }
        },

        handleOK() {

        },

        handleClick(idx) {
          this.currentIndex = idx;
        },

        show(rule){
          console.log(rule);
          this.rule = rule;
          this.flag = true;
          this.currentIndex = 0;

          //TODO 获取数据
          this.items = [
            {clientName: '奇速贷', clientCode: '1001', rules: [
                {ruleDesc: '验证借款起止时间与合同中约定的时间是否一致', ruleContent: 'if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}'},
                {ruleDesc: '验证借款起止时间与合同中约定的时间是否一致', ruleContent: 'if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}'},
                {ruleDesc: '验证借款起止时间与合同中约定的时间是否一致', ruleContent: 'if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}'},
              ]
            },
            {clientName: '奇速贷', clientCode: '1002', rules: [
                {ruleDesc: '验证借款起止时间与合同中约定的时间是否一致2', ruleContent: 'if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}'},
                {ruleDesc: '验证借款起止时间与合同中约定的时间是否一致', ruleContent: 'if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}'},
                {ruleDesc: '验证借款起止时间与合同中约定的时间是否一致', ruleContent: 'if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}'},
              ]
            },
            {clientName: '奇速贷', clientCode: '1003', rules: [
                {ruleDesc: '验证借款起止时间与合同中约定的时间是否一致3', ruleContent: 'if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}'},
                {ruleDesc: '验证借款起止时间与合同中约定的时间是否一致', ruleContent: 'if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}'},
                {ruleDesc: '验证借款起止时间与合同中约定的时间是否一致', ruleContent: 'if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}if(resIdCard !=getContent(VOUCHER,0,228,281,169,16)){return 3075}'},
              ]
            }
          ];

          this.initItems()
        },
        initItems(){
          this.items.forEach(it => {
            it.rules.forEach(i => {
              this.$set(i,'selected',false)
            })
            Object.defineProperty(it,'selectedNum', {
              get: function () {
                return it.rules.filter(it => it.selected).length
              }
            })
          })
        }
      }
    }
</script>

<style scoped lang="scss">
.reasonView{
  .title{
    line-height: 30px;
    font-size: 14px;
  }
  .content{
    display: flex;
    height: 400px;
    .w160{
      width: 170px;
      ul{
        margin-top: 10px;
        border:1px solid #666;
        li{
          font-size: 15px;
          padding: 5px;
          line-height: 30px;
          border-bottom: 1px solid #666;
          cursor: pointer;
          &.active{
            background: #F2F2F2;
          }
          &:last-child{
            border-bottom: none;
          }
        }
      }
    }
    .rules{
      flex: 1;
      ul>li{
        margin: 10px 0;
        display: flex;
        .checkbox{
          width: 30px;
          display: flex;
          align-items: center;
          text-align: center;
        }
        .rule_content{
          flex: 1;
          border: 1px solid #999;
          padding: 0 5px;
          ul{
            li{
              display: flex;
              .label{
                width: 100px;
                text-align: center;
              }
              .value{
                flex: 1;
              }
            }
          }
        }
      }
    }
  }
}
</style>
