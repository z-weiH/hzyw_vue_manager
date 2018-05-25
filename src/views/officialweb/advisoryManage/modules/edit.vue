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
            {label: '姓名：', type: 'text', placeholder: '请输入姓名',columns:2,property: 'name'},
            {label: '姓名：', type: 'text', placeholder: '请输入姓名',columns:2,property: 'name'},
            {label: '姓名：', type: 'text', placeholder: '请输入姓名',columns:2,property: 'name'},
            {label: '姓名：', type: 'text', placeholder: '请输入姓名',columns:2,property: 'name'},
            {label: '姓名：', type: 'text', placeholder: '请输入姓名',columns:2,property: 'name'},
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

