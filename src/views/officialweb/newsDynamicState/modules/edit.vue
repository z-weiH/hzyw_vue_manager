<template>
  <div>
    <el-dialog
      v-dialogDrag
      :visible.sync="show"
      :title="title"
      width="868px"
      ref="dialog"
      center>
      <table-edits :editDefines="editDefines" :item.sync="item" :disabled="editState == 9"></table-edits>
      <span class="fl w-133">新闻内容:</span>
      <div class="m-content fl" >
        <tinymce :path="'portal/news'" :height="300" ref="tinymce"></tinymce>
      </div>
      <div class="clear"></div>
      <span  slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save" v-if="editState != 9" >{{action}}</el-button>
          <el-button type="primary" @click="$parent.editState = 0" v-if="editState == 9">返 回</el-button>
          <el-button @click="$parent.editState = 0" v-if="editState != 9">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import tinymce from '@/components/Tinymce/index.vue'
  import TableEdits from '@/components/tableEdits'
  import {URL_JSON} from "../../../../components/script/url_json";
  export default {
    name: 'updatePwd',
    props: {
      item: Object,
      editState: Number
    },
    data () {
      return {
        editDefines:  [{
          content: [
            {label: '新闻标题：', type: 'text', placeholder: '请输入新闻标题',columns:2,property: 'newsTitle'},
            {label: '新闻类型：',type: 'select',columns:2,placeholder: '请输入新闻类型',property: 'newsType',options: [
                // 1签约 2活动 3行业资讯
                {label:'签约', value: 1},
                {label:'活动', value: 2},
                {label:'行业资讯', value: 3},
              ]},
            {label: '关键词：',type: 'text',columns:2,placeholder: '请输入关键词',property: 'keyWords'},
            {label: '新闻图标：',type: 'file',columns:1,path: 'portal/news',property:'newsImg'},
            {type: 'img',columns:1,property:'newsImg'},
            {label: '外部链接：', type: 'text', placeholder: '外部链接',columns:2,property: 'newsUrl'},
            {label: '排列序号：', type: 'text', placeholder: '排列序号',columns:2,property: 'newsSort'},
            {label: '新闻简介：', type: 'textarea', placeholder: '新闻简介',columns:2,property: 'newsBrief'},
            {label: '状态：', type: 'select', placeholder: '请选择',columns:2, options: [
                {label: '待发布', value: 0},
                {label: '已发布', value: 1},
                {label: '已下线', value: 2},
                // 0待发布 1已发布 2已下线
              ], property: 'newsStatus'},
          ]
        }]
      }
    },
    methods: {
      save() {
        // console.error(this.item);
        this.item.newsDetail = this.$refs.tinymce.getContent();
        this.$http.post(URL_JSON['saveNewsDynamicState'],this.item)
          .then(res => {
            if(res.code == '0000'){
              console.log(res );
              if(this.$parent.editState == 2){
                // this.$parent.tableData.unshift(Object.assign(this.item, res.result));
                // this.$message.success('新增成功');
                this.$parent.editState = 0;
                this.$message.success('修改成功');
                this.$parent.doQuery(this.$parent.queryUrl, this.$parent.searchItem);
              }else{
                console.log(this.$parent);
                let currentItem = this.$parent.tableData.find(it => it.custId == this.item.custId);
                Object.keys(this.item).forEach(key => {
                  currentItem[key] = this.item[key];
                });
                this.$parent.editState = 0;
                this.$message.success('修改成功');
              }
            }
            else{
              this.$message.error(res.description);
            }
          })
      }
    },
    computed: {
      action() {
        return this.editState == 2 ? '新 增' : '修 改'
      },
      title() {
        return this.editState == 2 ? '新增新闻' : this.editState == 1 ? '修改新闻' : '新闻详情'
      },
      show :{
        get: function () {
          return this.editState == 1 || this.editState == 2 || this.editState == 9
        },
        set: function (v) {
          if(!v){
            this.$parent.editState = 0
            this.$refs.tinymce.setContent('');
          }
        }
      }
    },
    components: {
      TableEdits,
      tinymce
    },
    mounted() {
      this.$refs.dialog.rendered = true;
    },
  }
</script>

<style scoped>

</style>

