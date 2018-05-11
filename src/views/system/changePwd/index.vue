<template>
  <div>
    <div class="item-title">
      修改密码
    </div>
    <div class="item-table">
      <edits class="item-edits" :editItems="editItems" :item="item"></edits>
      <div class="item-buttons">
        <el-button type="primary">提 交</el-button>
        <el-button >取 消</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import Edits from '@/components/edits'
  export default {
    name: 'changePwd',
    data () {
      return {
        editItems: [
          {label: '用户名', property: 'loginName', readonly: true, type : 'text'},
          {label: '旧密码', property: 'loginName',  type : 'text'},
          {label: '新密码', property: 'loginName',  type : 'text'},
          {label: '确认密码', property: 'loginName',  type : 'text'},
        ],
        item: {}
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
