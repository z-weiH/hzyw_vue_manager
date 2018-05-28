<template>
  <el-dialog
    :visible.sync="show"
    :title="title"
    width="495px"
    center>
    <edits :edit-items="createItems" :item="item" :label-width="'90px'"></edits>
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
    name: 'createRole',
    props: {
      item: Object,
      editState: Number
    },
    data () {
      return {
        createItems: [
          {type: 'text', property:'roleCode', label: '角色编码', placeholder: '输入角色编码'},
          {type: 'text', property:'roleName', label: '角色名称', placeholder: '输入角色名称'},
          {type: 'textarea', property:'otherInfo', label: '其它信息', placeholder: '输入其他信息'},
        ]
      }
    },
    methods: {
      save() {
        this.$http.post(URL_JSON['saveRoleManage'],this.item)
          .then(res => {
            this.$message.success(res.description);
            if(res.code == '0000'){
              if(this.editState == 2){
                this.$parent.doQuery(this.$parent.queryUrl, this.$parent.searchItem)
              }
              this.$parent.editState = 0;

            }
          })
      }
    },
    computed: {
      title () {
        return this.editState == 1 ? '修改角色信息' : this.editState == 2 ? '新增角色' : ''
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
    }
  }
</script>

<style scoped>

</style>
