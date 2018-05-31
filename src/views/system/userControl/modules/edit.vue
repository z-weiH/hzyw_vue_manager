<template>
    <div>
      <el-dialog
        :visible.sync="show"
        title="修改用户信息"
        width="495px"
        @open="resetForm"
        center>
        <edit-component formname="editUsrControl1" ref="edits1" :edit-items="editItems" :item="editItem" :label-width="'150px'"></edit-component>
        <el-form  label-position="left" label-width="150px">
          <el-form-item label="角色权限（可多选)" >
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
        <edit-component formname="editUsrControl2" ref="edits2" :edit-items="editItems1"  :item="editItem" :label-width="'150px'"></edit-component>
        <!--<el-form ref="ruleForm" :model="editItem" >-->
          <!--&lt;!&ndash; 加款信息 &ndash;&gt;-->
          <!--<table-->
            <!--class="m-primordial-table-->
              <!--el-table el-table&#45;&#45;fit el-table&#45;&#45;border-->
              <!--el-table&#45;&#45;enable-row-hover"-->
          <!--&gt;-->
            <!--<tr>-->
              <!--<td colspan="1">用户名：</td>-->
              <!--<td colspan="1">-->
                <!--<el-form-item label=" " prop="roleCode">-->
                  <!--<el-input v-model="item.loginName" placeholder="请输入角色编码" />-->
                <!--</el-form-item>-->
              <!--</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td colspan="1">真实姓名：</td>-->
              <!--<td colspan="1">-->
                <!--<el-form-item label=" " prop="userName">-->
                  <!--<el-input v-model="item.userName" placeholder="请输入角色名称" />-->
                <!--</el-form-item>-->
              <!--</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td colspan="1">手机号码：</td>-->
              <!--<td colspan="1">-->
                <!--<el-form-item label=" " prop="userPhone">-->
                  <!--<el-input v-model="item.userPhone" placeholder="请输入角色名称" />-->
                <!--</el-form-item>-->
              <!--</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td colspan="1">手机号码：</td>-->
              <!--<td colspan="1">-->
                <!--<el-form-item label=" " prop="userPhone">-->
                  <!--<el-input v-model="item.userPhone" placeholder="请输入角色名称" />-->
                <!--</el-form-item>-->
              <!--</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td colspan="1">电子邮箱：</td>-->
              <!--<td colspan="1">-->
                <!--<el-form-item label=" " prop="userEmail">-->
                  <!--<el-input v-model="item.userEmail" placeholder="请输入角色名称" />-->
                <!--</el-form-item>-->
              <!--</td>-->
            <!--</tr>-->
            <!--<tr>-->
              <!--<td colspan="1">角色权限（可多选）：</td>-->
              <!--<td colspan="1">-->
                <!--<el-form-item   prop="roleIdsStr">-->
                  <!--<el-select v-model="item.roleIdsStr" multiple placeholder="请选择">-->
                    <!--<el-option-->
                      <!--v-for="item in options"-->
                      <!--:key="item.roleId"-->
                      <!--:label="item.roleName"-->
                      <!--:value="item.roleId">-->
                    <!--</el-option>-->
                  <!--</el-select>-->
                <!--</el-form-item>-->
              <!--</td>-->
            <!--</tr>-->
          <!--</table>-->
        <!--</el-form>-->
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
  import Checkform from "@/components/script/formCheck"
  export default {
    name: 'editUsrControl',
    props: {
      item: Object,
      editState: Number
    },
    mixins: [Checkform],
    data () {
      return {
        editItems: [
          {type: 'text', property:'loginName', label: '用户名', disabled: true},
          {type: 'text', property:'userName', label: '真实姓名',rule:'require'},
          {type: 'text', property:'userPhone', label: '手机号码',rule:'require'},
          {type: 'text', property:'userEmail', label: '电子邮箱',rule:'require'},
        ],
        editItems1: [
          // {type: 'text', property:'loginName', label: '用户名', disabled: true},
          // {type: 'text', property:'userName', label: '真实姓名'},
          // {type: 'text', property:'userPhone', label: '手机号码'},
          // {type: 'text', property:'userEmail', label: '电子邮箱'},
          // {type: 'select', property:'roleIdsStr', label: '角色权限（可多选）',multiple: true,options: [], optLabel:'roleName', optValue: 'roleId'},
          {type: 'text', property:'userAddress', label: '通讯地址',rule:'require'},
          {type: 'textarea', property:'otherInfo', label: '其它信息', placeholder: '请输入内容'},
        ],
        options:[],
        roleids: [],
        editItem: {},
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
            this.checkbeforeSave().then(() => {
              this.editItem.roleIds = this.roleids.join(',');
              this.$http.post(URL_JSON['saveUserControl'],this.editItem).then(res => {
                if(res.code === '0000'){
                  this.$emit('refresh');
                }
              })
            })
      }
    },
    components: {
      EditComponent
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
