<template>
  <div>
    <el-dialog
      :visible.sync="show"
      title="登陆密码修改"
      width="495px"
      @open="resetForm"
      center>
      <edit-component ref="edits" formname="updatePwd" :edit-items="psdItems" :item="psdItem" :label-width="'80px'"></edit-component>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save">修 改</el-button>
          <el-button @click="$parent.editState = 0">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import EditComponent from '@/components/edits'
  import {URL_JSON} from "../../../../components/script/url_json";
  import formCheck from '@/components/script/formCheck'
  export default {
    name: 'updatePwd',
    mixins: [formCheck],
    props: {
      psdItem: Object,
      editState: Number
    },
    data () {
      return {
        psdItems: [
          {type: 'text', property:'loginName', label: '用户名', disabled: true},
          {type: 'text', property:'userName', label: '真实姓名', disabled: true},
          {type: 'password', property:'oldPwd', label: '旧密码',rule:'require'},
          {type: 'password', property:'newPwd', label: '新密码',rule:'require'},
          {type: 'password', property:'confirmPwd', label: '确认密码',rule:[
              { required : true , message : '不能为空' , trigger : 'blur'},
              { validator:
                  (rule, value, callback) => {
                    if (value !== this.psdItem.newPwd) {
                      callback(new Error('两次输入密码不一致!'));
                    } else {
                      callback();
                    }
                  },
                trigger: 'blur' }
            ]},
        ],
      }
    },
    methods: {
      save() {
        this.checkbeforeSave().then(res => {
          if(res){
            this.$http.post(URL_JSON['updatePwdUserControl'], this.psdItem)
              .then(res => {
                if(res.code == '0000'){
                  this.$message.success(res.description);
                  this.$parent.editState = 0;
                }
              })
          }
        }).catch(()=> {})

      }
    },
    computed: {
      show :{
        get: function () {
          return this.editState == 3
        },
        set: function (v) {
          if(!v)
            this.$parent.editState = 0
        }
      }
    },
    components: {
      EditComponent
    }
  }
</script>

<style scoped>

</style>

