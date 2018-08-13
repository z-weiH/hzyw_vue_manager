<template>
  <div class="account-management">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link tag="a" to="main/accountManagement" href="javascript:;" class="aside_tit">客户账号管理</router-link>
    </div>
    <div class="item-search">
      <searchs :search-items="searchItems" :item="searchItem" :queryUrl="queryUrl">
        <div class="fr" slot="moreBtn">
          <el-button @click="handleCreate" type="primary">新增用户</el-button>
        </div>
      </searchs>
  </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">客户列表</span>
    </div>
    <div class="item-table">
      <table-component :pager="pager" :table-data="tableData" :column-define="columnDefine" >
           <el-table-column label="操作" prop="orderStatusName" slot="defineCol" width="181">
            <template slot-scope="scope">
                <span class="colLink" @click="handleEdit(scope.row)">修改信息</span>
                <span class="colLink" @click="handleChange(scope.row)">修改密码</span>
                <span class="colLink" @click="handleDelete(scope.row)">删除</span>
            </template>
          </el-table-column>

      </table-component>

    </div>
    <edit ref="edit" :editState = "editState" @refresh="refresh"></edit>
  </div>
</template>

<script>
  import edit from "./module/edit.vue"
  import Searchs from "@/components/searchs";
  import Mixins from "@/components/script/_mixin";
  import TableComponent from "@/components/table";
  export default {
    name:'templateList',
    mixins: [Mixins],
    data(){
      return {
        //是否启用
        editState: 0, //页面状态 1 - 修改信息 2- 修改密码 3- 新增用户
        queryUrl:'/client/queryByBaseQuery.htm',
        searchItem: {},
        columnDefine: [
          // { label: "客户号", property: "clientCode",width: 80 },
          { label: "用户名称", property: "userName",width:110},
          { label: "登录账户", property: "loginName",width: 185 },
          { label: "邮箱地址", property: "userEmail",width: 185 },
          { label: "用户手机号", property: "userPhone",width: 130 },
          { label: "创建时间", property: "createTime",width: 115 },
        ],
        searchItems : [
          {type: 'text',placeholder: '请输入客户名称', property: 'keyWords', colSpan: 7}
        ]

      }
    },

    components:{
      TableComponent,
      Searchs,
      edit
    },
    methods: {
        handleEdit(row){
            this.$http.post("/client/details.htm",{loginId: row.loginId}).then(
              res =>{
                if(res.code === '0000'){
                  this.editState = 1;
                  this.$nextTick(() => {
                  this.$refs.edit.editItem = res.result;
                  })
                }
              }
            )
        },
        handleCreate(){
          this.editState = 3;
          this.$refs.edit.editItem = {};
        },
        handleChange(row){
          this.editState = 2;
          this.$nextTick(() => {
            this.$refs.edit.editItem = {};
            this.$set(this.$refs.edit.editItem,"loginName",row.loginName);
            this.$set(this.$refs.edit.editItem,"loginId",row.loginId);
          })
        },
        handleDelete(row){
          this.showConfirm().then( () => {
            this.$http.post("/client/deleteClient.htm",{loginId: row.loginId}).then(res => {
              if(res.code === '0000'){
                this.$message.success("刪除账户成功");
                this.doQuery(this.queryUrl, this.searchItem);
              }
            })
          })
        }
    },
    mounted(){
      this.doQuery(this.queryUrl,this.searchItem);
    }

  }
</script>

<style lang="scss" scoped>



</style>
