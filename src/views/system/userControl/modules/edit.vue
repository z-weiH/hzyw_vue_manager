<template>
    <div>
      <el-dialog
        :visible.sync="show"
        title="修改用户信息"
        width="495px"
        center>
        <edit-component :edit-items="editItems" :item="editItem" :label-width="'150px'"></edit-component>
        <el-select v-model="editItem.roleIdsStr"  multiple>
          <el-option v-for="(opt, idx) in options"
                     :key="idx"
                     :label="opt.roleName"
                     :value="opt.roleId"
          >
          </el-option>
        </el-select>

        <span slot="footer" class="dialog-footer">
          <el-button @click="$parent.editState = 0">取 消</el-button>
          <el-button type="primary"  @click="save">确 定</el-button>
        </span>
      </el-dialog>
    </div>
</template>
<script>
  import EditComponent from '@/components/edits'
  import {URL_JSON} from "../../../../components/script/url_json";
  export default {
    name: 'editUsrControl',
    props: {
      editItem: Object,
      editState: Number
    },
    data () {
      return {
        editItems: [
          {type: 'text', property:'loginName', label: '用户名', disabled: true},
          {type: 'text', property:'userName', label: '真实姓名'},
          {type: 'text', property:'userPhone', label: '手机号码'},
          {type: 'text', property:'userEmail', label: '电子邮箱'},
          {type: 'select', property:'roleIdsStr', label: '角色权限（可多选）',multiple: true,options: [], optLabel:'roleName', optValue: 'roleId'},
          {type: 'text', property:'userAddress', label: '通讯地址'},
          {type: 'textarea', property:'otherInfo', label: '其它信息', placeholder: '请输入内容'},
        ],
        options:[]
      }
    },
    computed: {
      list() {

      },
      show :{
        get: function () {
          return this.editState == 1
        },
        set: function (v) {
          if(!v)
            this.$parent.editState = 0
        }
      }
    },
    methods: {
      save() {
        console.log(this.editItem);

      }
    },
    components: {
      EditComponent
    },
    created() {
      this.$http.post(URL_JSON['queryALlRole'])
        .then(res => {
          if(res.code === '0000'){
              this.editItems[4].options = res.result;
              this.options = res.result;
              console.log(res.result);
          }
        })
    }
  }
</script>

<style scoped>

</style>
