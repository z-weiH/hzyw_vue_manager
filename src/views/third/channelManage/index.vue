<template>
  <div>
    <div>
      <div class="item-search">
        <searchs :search-items="searchItems" :item="searchItem" :queryUrl="queryUrl">
          <div class="fl ml-10" slot="moreBtn">
            <el-button type="primary" @click="create">新增</el-button>
          </div>
        </searchs>
      </div>
      <div class="item-title">
        短信渠道列表
      </div>
      <div class="item-table">
        <table-component :pager="pager" :table-data="tableData" :column-define="columnDefine" :actions="actions"></table-component>
      </div>
    </div>
    <channel-edit :editState="editState" :item="item" @refresh="refresh"></channel-edit>
  </div>
</template>

<script>

  import Mixins from '@/components/script/_mixin'
  import Searchs from '@/components/searchs'
  import TableComponent from '@/components/table'
  import {URL_JSON} from "../../../components/script/url_json";
  import ChannelEdit from "./modules/edit"
  export default {
    name: 'channelManage',
    extends: Mixins,
    data () {
      return {
        searchItems : [
          {type: 'text',placeholder: '请输入手机渠道商名称、手机号', property: 'keyWords', colSpan: 6},
        ],
        searchItem: {},
        columnDefine: [
          {label: '短信渠道商名称',property: 'channelName'},
          {label: '短信发送号码',property: 'phone'},
        ],
        actions: [
          {label: '操作',btns: [
              {label:'修改', function: this.edit},
              {label:'删除', function: this.delete},
            ]
          }
        ],
        item: {},
        queryUrl: URL_JSON['queryChannelManage']
      }
    },
    methods: {
      edit(row) {
        this.$http.post(URL_JSON['editChannelManage'],{channelId:row.channelId})
          .then(res => {
            if(res.code === '0000'){
              this.item = res.result;
              this.editState = 1;
            }
          });
      },
      create () {
        this.item = {};
        this.editState = 2;
      },
      delete (row) {
        this.showConfirm().then(res => {
          if(res){
            if(res){
              this.$http.post(URL_JSON['deleteChannelManage'],{channelId:row.channelId}).then(r => {
                if(r.code === '0000'){
                  this.$message.success(r.description);
                  this.refresh()
                }
              })
            }
          }
        })
      },
      refresh(){
        this.editState = 0;
        this.doQuery(this.queryUrl, this.searchItem);
      }
    },
    components: {
      Searchs,
      TableComponent,
      ChannelEdit
    },
    created() {
      this.doQuery(this.queryUrl, this.searchItem);
    }
  }
</script>

<style scoped>

</style>
