<template>
    <div>
      <div class="item-title">
        个人信息
      </div>
      <div class="item-table padding">
        <edits :edit-items="editItems" :item="item" :label-width="'150px'"></edits>
        <div class="item-buttons">
          <el-button type="primary" @click="save">提 交</el-button>
        </div>
      </div>
    </div>
</template>

<script>
import Edits from '@/components/edits'
import Searchs from '@/components/searchs'
import {URL_JSON} from "../../../components/script/url_json";
export default {
  name: 'index',
  data () {
    return {
      searchItem: {},
      editItems: [
        {label: '用户名', property: 'loginName', disabled: true, type : 'text'},
        {label: '所属角色', property: 'roleIdsArr', disabled: true, type : 'select', multiple: true, options: [], optLabel:'roleName', optValue: 'roleId'},
        {label: '真实姓名', property: 'userName',  type : 'text'},
        {label: '手机号码', property: 'userPhone',  type : 'number'},
        {label: '电子邮箱', property: 'userEmail',  type : 'text'},
        {label: '通讯地址', property: 'userAddress',  type : 'text'},
        {label: '其他信息', property: 'otherInfo',  type : 'textarea'},
      ],
      item: {}
    }
  },
  methods: {
    save() {
      this.$http.post(URL_JSON['saveUserControl'],this.item).then(res => {
        if(res.code === '0000'){
          this.$message.success(res.description);
        }
      })
    }
  },
  components: {
    Edits,
    Searchs
  },
  created() {
    try{
      this.$http.post(URL_JSON['queryALlRole'])
        .then(res => {
          if(res.code === '0000'){
            this.editItems[1].options = res.result;
            this.$http.post(URL_JSON['editUserControl'],{userId: JSON.parse(localStorage.getItem('loginInfo')).userId})
              .then(r => {
                if(r.code === '0000'){
                  this.item = r.result;
                  this.item.roleIdsArr = this.item.roleIds.split(',');
                }
            })
          }
        })
    }
    catch(err){
      this.$message.warn('登陆超时,请重新登陆');
      setTimeout(() => {
        this.$router.push('/login')
      },200)
    }


  }
}
</script>

<style scoped>
  .item-edits{
    width: 495px;
    margin: 0 auto;
    padding-top: 20px;
  }
  .padding{
    padding: 10px 50px;
  }
  .item-buttons{
    width: 495px;
    text-align: center;
    margin: 20px auto;
  }
</style>
