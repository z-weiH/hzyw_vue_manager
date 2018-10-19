<template>
  <el-dialog
    :visible.sync="show"
    v-dialogDrag
    title="导入模版"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="600px"
  >
    <div class="content">
      <div class="search">
        <div class="fr">
          <el-input style="display: inline-block;width:240px;"
            placeholder="请输入内容"
            v-model="keyWords" size="medium">
          </el-input>
          <button class="search_btn" @click="doQuery">搜索</button>
        </div>
        请选择规则模版：
      </div>
      <div class="list">
        <ul>
          <li v-for="(rule,idx) in list" :key="idx" :class="{'active':rule.active}" @click="templateSelect(rule)">{{rule.templateDesc}}</li>
        </ul>
        <img src="@/assets/img/no_template.png" style="width:100%;" alt="" v-if="list.length === 0">
      </div>
      <div class="btns">
        <el-button type="primary" @click="handleInputTemplate"  :disabled="canClick">导入</el-button>
        <el-button @click="show = false;">取消</el-button>
      </div>
    </div>

  </el-dialog>
</template>

<script>
export default {
  name: 'inputTemplate',
  data(){
    return {
      show: false,
      list: [],
      keyWords: ''
    }
  },
  computed:{
    canClick(){
      return !this.list.find(it => it.active);
    }
  },
  methods: {
    init(){
      //目前获取100条
      this.$http.post("/ruleTem/queryTemplateInfoByBaseQuery.htm",{templateStatus: 0,currentNum: 1,pagerSize: 100}).then(res => {
        this.list = res.result.list;
        this.list.forEach(it => {
          this.$set(it,'active',false);
        })
        this.show = true;
      })
    },
    doQuery(){
      this.$http.post("/ruleTem/queryTemplateInfoByBaseQuery.htm",{templateStatus: 0,currentNum: 1,pagerSize: 100,keyWords: this.keyWords}).then(res => {
        this.list = res.result.list;
        this.list.forEach(it => {
          this.$set(it,'active',false);
        })
      })
    },
    templateSelect(rule){
      this.list.forEach(it => {
        it.active = false;
      })
      rule.active = true;
    },
    handleInputTemplate(){
      this.$parent.form.ruleInfo = this.list.find(it => it.active).templateInfo;
      this.show = false;
    }
  }
}
</script>

<style scoped lang="scss">
.search_btn{
  height: 36px;
  vertical-align: bottom;
  position: relative;
  left: -5px;
  background: #C4C4C4;
  border: none;
  padding: 0 10px;
  font-weight: bold;
  color: #fff;
  cursor: pointer;
  outline: none;
}
  .content{
    padding: 0px 10px 20px;
    .search{
      font-size: 15px;
      line-height: 36px;
    }
    .list{
      min-height:30px;
      li{
        font-size: 14px;
        line-height: 30px;
        margin: 14px 0;
        border: 1px solid #EFF2F5;
        padding-left: 15px;
        cursor: pointer;
        max-height: 300px;
        overflow: auto;
        &.active{
          background: #F7F9FE;
        }
      }
    }
    .btns{
      text-align: center;
    }
  }
</style>
