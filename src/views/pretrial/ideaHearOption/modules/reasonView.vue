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
      <div class="content" v-if="items.length > 0">
            <div class="w160">
              <el-scrollbar style="height: 100%">

              <ul>
                <li v-for="(item, idx)  in items" :class="{'active': idx === currentIndex}" :key="idx" @click="handleClick(idx)">
                  {{`${item.clientName}-${item.prodTempCode}`}}
                  <span v-if="item.selectedNum > 0">{{`(${item.selectedNum})`}}</span>
                </li>
              </ul>
              </el-scrollbar>

            </div>
          <div class="rules">
            <el-scrollbar style="height: 100%" v-if="ruleList && ruleList.length > 0">

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
                      <div class="value">{{rule.ruleInfo}}</div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            </el-scrollbar>
            <div v-else>
              <p class="mt-20" style="line-height: 40px;text-align: center;font-size: 18px;color: #333;font-weight: bold;">暂无规则</p>
            </div>

          </div>

      </div>
      <div v-else class="mt-20" style="height: 300px;line-height: 40px;text-align: center;font-size: 18px;color: #333;font-weight: bold;">
        暂无模版
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
          if(this.currentIndex !== -1){
            this.ruleList = this.items[this.currentIndex].ruleList;
          }
        },
        'flag'(val,oldval){
          if(!val){
             // this.items = [];
            // this.items
            this.currentIndex = -1;
            this.disabled = true;
            this.items.forEach(it => {
              it.ruleList.forEach(i => {
                i.selected = false;
              })
            })
            // this.$refs.check.forEach(it => {
            //   it.value = false;
            // })
            // console.log(this.items)

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
          console.error(this.ruleList === this.items[0].ruleList)
          let arr = [];
          this.items.forEach(it => {
            it.ruleList.forEach(i => {
              if(i.selected){
                arr.push(i.ruleId)
              }
            })
          })
          console.log(arr, this.items, this.$refs.check);
          this.$http.post("/reason/updateRuleReturnCodeByRuleIds.htm", {ruleIds: arr.join(','),errorCode: this.rule.code}).then(res => {
            this.$message.success("返回编码修改成功");
            this.flag = false;
            this.$emit('successCBK');

          })
        },

        handleClick(idx) {
          this.currentIndex = idx;
        },

        show(rule,list){
          console.error(rule,list);
          this.rule = rule;
          this.flag = true;



          //TODO 获取数据
          // this.$http.post("/reason/queryClientTemplateRuleList.htm", {clientCode: this.currentCompany.code, errorCode: row.code}).then(res => {
          //   console.log(res);
          // })
          this.items = list;
          this.currentIndex = 0;


          this.initItems()
        },
        initItems(){
          this.items.forEach(it => {
            it.ruleList.forEach(i => {
              this.$set(i,'selected',false)
            })
            Object.defineProperty(it,'selectedNum', {
              get: function () {
                return it.ruleList.filter(it => it.selected).length
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
