<template>
    <div class="rule-template">
      <div class="wsbodyhead">
        <a>所在位置</a>
        <a href="javascript:;" class="aside_tit">规则模版</a>
      </div>


      <div class="item-search">
        <searchs :search-items="searchItems" :item="searchItem" :queryUrl="queryUrl">

        </searchs>
      </div>
      <div class="item-title of-hidden">
        <span class="right_btn" @click="addTemplate">+添加</span>
        <span class="item-title-sign">规则模版（共{{pager.count}}条）</span>
      </div>
      <div class="item-table" style=" padding: 20px 10px;">
        <img src="@/assets/img/no_rule.png" style="width:100%;" alt="" v-if="pager.count === 0">
        <ul class="rule_list" v-if="pager.count > 0">
          <li :class="{'rule_item': true}" v-for="(rule,index) in tableData" :key="index" >
            <div class="ruleDesc">
              <div class="btns fr">
                <span class="enable_btn colLink" @click="handleEnable(rule,$event)">{{rule.templateStatus === 0 ? '停用' : '启用'}}</span>
                <span class="edit_btn colLink" @click="handleEdit(rule,$event)">编辑</span>
                <span class="delete_btn colLink" @click="handleDelete(rule,$event)">删除</span>
              </div>
              <b >{{(pager.currentNum-1) * pager.pageSize + index + 1}}.</b>
              <span>{{rule.templateDesc}}</span>
              <span class="mark" v-if="rule.templateStatus === 0">已启用</span>
            </div>
            <div>{{rule.templateInfo}}</div>
          </li>
        </ul>

        <div class="pagination clear" v-if="pager.count > 0">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pager.currentNum"
            :page-size="pager.pageSize"
            :page-sizes="[10,  20, 50]"
            layout="prev,sizes, pager, next, jumper, total"
            :total="pager.count">
          </el-pagination>
        </div>

      </div>




      <create ref="create"></create>

    </div>
</template>

<script>
import create from './module/create'
import Searchs from '@/components/searchs'
import Mixins from '@/components/script/_mixin'
export default {
  name: 'index',
  extends: Mixins,
  components:{
    Searchs,
    create
  },
  data () {
    return{
      searchItems : [
        {type: 'text',placeholder: '请输入关键词进行搜索', property: 'keyWords', colSpan: 6},
        // 0启用 ，1停用
        {type: 'select',placeholder: '启用状态', property: 'templateStatus', colSpan: 4,options: [{label:'启用',value: 0},{label:'停用',value: 1}]}
      ],
      searchItem: {},
      queryUrl:  '/ruleTem/queryTemplateInfoByBaseQuery.htm',
    }
  },
  methods: {
    addTemplate(){
      this.$refs.create.init();
    },
    handleEdit(rule){
        this.$refs.create.init(rule.id);
    },
    handleSizeChange(val){
      this.pager.pagerSize = val;
      this.doQuery(this.queryUrl, this.searchItem);
    },
    handleCurrentChange(val){
      this.pager.currentNum = val;
      this.doQuery(this.queryUrl, this.searchItem);
    },
    handleDelete(rule){
      this.showConfirm("确定删除这条规则模板?").then(res => {
        if(res){
          this.$http.post("/ruleTem/saveRuleTemplateInfoById.htm",{id: rule.id,isDelete: 1}).then(res => {
            this.$message.success("删除成功");
            this.doQuery(this.queryUrl, this.searchItem);
          })
        }
      })
    },
    handleEnable(rule){
      this.showConfirm(`确定${rule.templateStatus == 0 ? '停用' : '启用'}这条规则模板`).then(res => {
        if(res){
          this.$http.post("/ruleTem/saveRuleTemplateInfoById.htm",{id:rule.id,templateStatus: rule.templateStatus}).then(r => {
            this.$message.success(`${1- rule.templateStatus == 0 ? '启用' : '停用'}成功`);
            this.doQuery(this.queryUrl, this.searchItem);
          })
        }
      })
    }

  },
  created(){
    this.doQuery(this.queryUrl, this.searchItem);
  }
}
</script>

<style scoped lang="scss">
  .right_btn{
    float: right;
    margin-right: 20px;
    cursor: pointer;
  }
  .rule_list{


  .rule_item{
    border:1px solid #F3F5F7;
    margin: 20px 0;
    padding: 10px;
  &.active{
     border: 1px solid #46629C;
   }
  div{
    padding-left: 20px;
    color: #aaa;
    line-height: 20px;
    margin: 10px 0;
  .rule_title_desc{
    padding-right: 15px;
  }
  &.ruleDesc{
     margin: 0;
     padding-left: 0;
     color: #505050;
     font-size: 16px;
     line-height: 30px;
  b{
    padding-right: 10px;
  }
  .btns{
    margin-right: 5px;
    font-size: 14px;
  span{
    padding:0 10px;
  &.delete_btn{
     color: #656565;
   }
    &.enable_btn{
      color: #E85050;
    }
  }
  }
  }
  }

  }
  }
  .mark{
    font-size: 12px;
    padding: 2px 3px;
    background: #16378E;
    color: #fff;
    border-radius:8px;
    vertical-align: bottom;
  }

</style>
