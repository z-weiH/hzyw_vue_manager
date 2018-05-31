<template>
  <el-dialog
    :visible.sync="show"
    title="新增用户信息"
    width="495px"
    @open="resetForm"
    center>
    <edits ref="edits1" :formname="'editsform1'" :edit-items="createItems"  :item="createItem" :label-width="'90px'"></edits>
    <el-form  label-position="left" label-width="90px">
      <el-form-item label="所属角色" >
        <el-select v-model="roleids" multiple placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.roleId"
            :label="item.roleName"
            :value="item.roleId">
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <edits ref="edits2" :formname="'editsform2'" :edit-items="createItems1" :item="createItem"  :label-width="'90px'"></edits>
    <span slot="footer" class="dialog-footer">
          <el-button @click="$parent.editState = 0">取 消</el-button>
          <el-button type="primary" @click="save" >确 定</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import FormCheck from '@/components/script/formCheck'
  import Edits from '@/components/edits'
  import {URL_JSON} from "../../../../components/script/url_json";
  export default {
    mixins: [FormCheck],
    name: 'createUser',
    props: {
      createItem: Object,
      editState: Number
    },
    data () {
      return {
        createItems: [
          {type: 'text', property:'loginName', label: '用户名',rule:'require'},
          {type: 'text', property:'loginPwd', label: '登录密码',rule:'require'},
        ],
        createItems1: [
          // {type: 'text', property:'roleIds', label: '所属角色'},
          {type: 'text', property:'userName', label: '真实姓名',rule:'require'},
          {type: 'text', property:'userPhone', label: '手机号码',rule:'require'},
          {type: 'text', property:'userEmail', label: '电子邮箱',rule:'require'},
          {type: 'text', property:'userAddress', label: '通讯地址',rule:'require'},
          {type: 'textarea', property:'otherInfo', label: '其它信息', placeholder: '请输入内容'},
        ],
        options: [],
        roleids: []
      }
    },
    computed: {
      show :{
        get: function () {
          return this.editState == 2
        },
        set: function (v) {
          if(!v)
            this.$parent.editState = 0
        }
      }
    },
    methods: {
      save() {
        this.checkbeforeSave().then(res=> {
          console.log(res);
        }).catch(res => {
          console.log(res);
        })
        // this.createItem.roleIds = this.roleids.join(',');
        // this.$http.post(URL_JSON['saveUserControl'],this.createItem).then(res => {
        //   if(res.code === '0000'){
        //     this.$emit('refresh');
        //   }
        // })
      }
    },
    components: {
      Edits
    },
    created() {
      this.$http.post(URL_JSON['queryALlRole'])
        .then(res => {
          if(res.code === '0000'){
            // this.editItems1[4].options = res.result;
            this.options = res.result;
            console.log(res.result);
          }
        })
    }
  }
</script>

<style scoped>

</style>
