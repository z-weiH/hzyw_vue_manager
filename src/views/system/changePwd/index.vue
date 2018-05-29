<template>
  <div>
    <div class="item-title">
      修改密码
    </div>
    <div class="item-table">
      <edits class="item-edits" :editItems="editItems" :item="item"></edits>
      <div class="item-buttons">
        <el-button type="primary" @click="save">提 交</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Edits from '@/components/edits'
  import {URL_JSON} from "../../../components/script/url_json";
  export default {
    name: 'changePwd',
    data () {
      return {
        editItems: [
          {label: '用户名', property: 'loginName', disabled: true, type : 'text'},
          {label: '旧密码', property: 'oldPwd',  type : 'text'},
          {label: '新密码', property: 'newPwd',  type : 'text'},
          {label: '确认密码', property: 'confirmPwd',  type : 'text'},
        ],
      }
    },
    computed: {
      item(){
        return JSON.parse(localStorage.getItem('loginInfo'));
      }
    },
    methods: {
      save() {
        this.$http.post(URL_JSON['updatePwdUserControl'], this.item)
          .then(res => {
            if(res.code == '0000'){
              this.$message.success(res.description);
            }
          })
      }
    },
    components: {
      Edits,
    }
  }
</script>

<style scoped>
  .item-edits{
    width: 495px;
    margin: 0 auto;
    padding-top: 20px;
  }
  .item-buttons{
    width: 495px;
    text-align: center;
    margin: 20px auto;
  }
</style>
