<template>
  <div>
    <el-dialog
      :visible.sync="show"
      title="登陆密码修改"
      width="495px"
      center>
      <edit-component :edit-items="psdItems" :item="psdItem" :label-width="'80px'"></edit-component>
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
  export default {
    name: 'updatePwd',
    props: {
      psdItem: Object,
      editState: Number
    },
    data () {
      return {
        psdItems: [
          {type: 'text', property:'loginName', label: '用户名', disabled: true},
          {type: 'text', property:'userName', label: '真实姓名', disabled: true},
          {type: 'text', property:'oldPwd', label: '旧密码'},
          {type: 'text', property:'newPwd', label: '新密码'},
          {type: 'text', property:'confirmPwd', label: '确认密码'},
        ],
      }
    },
    methods: {
      save() {
        this.$http.post(URL_JSON['updatePwdUserControl'], this.psdItem)
          .then(res => {
            if(res.code == '0000'){
              this.$message.success(res.description);
              this.$parent.editState = 0;
            }
          })
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

