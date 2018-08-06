<template>
    <div>
      <el-dialog
        :visible.sync="show"
        :title="title"
        width="495px"
        @open="resetForm"
        center>
        <edit-component v-if="editState == 1 " ref="edits1" :edit-items="editItems" :item="editItem" :label-width="'150px'"></edit-component>
        <edit-component v-if="editState == 2"  ref="edits2" :edit-items="editItems2" :item="editItem" :label-width="'150px'"></edit-component>
        <edit-component v-if="editState == 3"  ref="edits3" :edit-items="editItems3" :item="editItem" :label-width="'150px'"></edit-component>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="save">确 定</el-button>
                    <el-button @click="$parent.editState = 0">取 消</el-button>
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
      editState: Number
    },
    mixins: [Checkform],
    data () {
      return {
        editItems: [
          {type: 'text', property:'loginName', label: '登录账号', disabled: true},
          {type: 'text', property:'userEmail', label: '邮箱地址',rule:'require,email'},
          {type: 'text', property:'userName', label: '用户名称', rule:'require'},
          {type: 'select', property:'clientCode',label: "企业名称",rule:'require',options:[],optLabel:'merchantName',optValue:'code'},
          {type: 'text', property:'userPhone', label: '用户手机号',rule:'require,phone'},
        ],
        editItems3: [
          {type: 'text', property:'loginName', label: '登录账号', rule: 'require'},
          {type: 'text', property:'userEmail', label: '邮箱地址',rule:'require,email'},
          {type: 'text', property:'userName', label: '用户名称', rule:'require'},
           {type: 'select', property:'clientCode',label: "企业名称",rule:'require',options:[],optLabel:'merchantName',optValue:'code'},
          {type: 'text', property:'userPhone', label: '用户手机号',rule:'require,phone'},
        ],
        editItems2: [
            {type: 'text', property:'loginName', label: '登录账号', disabled: true},
            {type: 'password', property:'oldPwd', label: '用户旧密码', rule:'require'},
            {type: 'password', property:'newPwd', label: '	用户新密码', rule:'require'},
            {type: 'password', property:'confirmPwd', label: '用户确认密码', rule:[
                { required : true , message : '不能为空' , trigger : 'blur'},
                { validator:
                    (rule, value, callback) => {
                    if (value !== this.editItem.newPwd) {
                        callback(new Error('两次输入密码不一致!'));
                    } else {
                        callback();
                    }
                    },
                    trigger: 'blur' }
            ]},
        ],
        editItem: {}
      }
    },
    computed: {
      title(){
          return this.editState == 1 ? "修改信息" : ( this.editState == 2 ? "修改密码" :  (this.editState == 3 ? "新增用户" : ""));
      },
      show :{
        get: function () {
          return this.editState == 1 || this.editState == 2 || this.editState == 3;
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
            if(this.editState === 2){
                this.$http.post("/client/updatePassWord.htm",this.editItem).then(res => {
                    if(res.code == '0000'){
                        this.$message.success("修改密码成功");
                        this.$emit("refresh");
                    }
                })
            }else{
               this.$http.post("/client/updateClientByLoginId.htm",this.editItem).then(res => {
                   console.log(res)
                    if(res.code == '0000'){
                        this.$message.success( this.editState == 3 ? "新增账户成功,默认密码为123456" : "修改信息成功");
                        this.$emit("refresh");
                    }
                }) 
            }
           
        })
      },
      //为下拉选项复制
      addOptions(arr,property,opts){
        let item = arr.find(it => it.property == property);
        if(item){
          item.options = opts;
        }
      }

    },
    components: {
      EditComponent
    },
    created() {
      this.$http.post('/merchant/queryMerchants.htm').then(res => {
        console.log(res);
        this.addOptions(this.editItems,"clientCode",res.result.list);
        this.addOptions(this.editItems3,"clientCode",res.result.list);
      })
    }
   
  }
</script>

<style scoped>

</style>
