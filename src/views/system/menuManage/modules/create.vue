<template>
  <el-dialog
    v-dialogDrag
    :visible.sync="show"
    :title="title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="495px"
    center>
    <edits :edit-items="createItems" :item="item" :label-width="'110px'"></edits>
    <span slot="footer" class="dialog-footer">
          <el-button @click="$parent.editState = 0">取 消</el-button>
          <el-button type="primary" @click="save">确 定</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import Edits from '@/components/edits'
  import {URL_JSON} from "../../../../components/script/url_json";
  export default {
    name: 'createMenu',
    props: {
      item: Object,
      editState: Number
    },
    data () {
      return {
        createItems: [
          {type: 'text', property:'menuName', label: '菜单实际名称', placeholder: '菜单实际名称'},
          {type: 'text', property:'menuTitle', label: '菜单显示标题', placeholder: '菜单显示标题'},
          {type: 'text', property:'menuIcon', label: '菜单图标', placeholder: '菜单图标'},
          {type: 'text', property:'menuUrl', label: '菜单链接', placeholder: '菜单链接'},
          {type: 'select', property:'menuDegree', label: '菜单层级', placeholder: '菜单层级',options: [{label:'一级菜单',value: 1},{label:'二级菜单',value: 2}]},
          {type: 'number', property:'menuSort', label: '菜单排序', placeholder: '输入菜单排序(数字)'},
          {type: 'textarea', property:'otherInfo', label: '其它信息', placeholder: '输入其它信息'},
        ]
      }
    },
    computed: {
      title () {
        return this.editState == 1 ? '修改菜单' : this.editState == 2 ? '新增菜单' : ''
      },
      show :{
        get: function () {
          return this.editState == 2 || this.editState == 1;
        },
        set: function (v) {
          if(!v)
            this.$parent.editState = 0
        }
      }
    },
    components: {
      Edits
    },
    methods: {
      save() {
        this.$http.post(URL_JSON['saveMenuManage'],this.item)
          .then(res => {
            if(res.code === '0000'){
              this.$message.success(res.description);
              this.$emit('refresh');
            }
          })
      }
    }
  }
</script>

<style scoped>

</style>
