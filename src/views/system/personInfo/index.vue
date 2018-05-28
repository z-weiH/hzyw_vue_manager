<template>
    <div>
      <searchs class="item-search" :search-items="searchItems" :item="searchItem" :query-url="'/user/queryUserList.htm'">
      </searchs>
      <div class="item-title">
        个人信息
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
import Searchs from '@/components/searchs'
export default {
  name: 'index',
  data () {
    return {
      searchItems: [
        {label:'案件查询', placeholder: '输入按键', property: 'anjian',colSpan: 5},
        {options: [{label: '提交日期', value: 'tijiao'}, {label: '立案日期', value: 'lian'}], placeholder: '请选择', property: 'anjian',type: 'select',colSpan: 3},
        {type:'date',placeholder: '开始时间',property:'startTime',colSpan: 4},
        {type:'date',placeholder: '结束时间',property:'endTime',colSpan: 4,},
      ],
      searchItem: {},
      editItems: [
        {label: '用户名', property: 'loginName', disabled: true, type : 'text'},
        {label: '所属角色', property: 'loginName', disabled: true, type : 'text'},
        {label: '真实姓名', property: 'loginName',  type : 'text'},
        {label: '手机号码', property: 'loginName',  type : 'number'},
        {label: '电子邮箱', property: 'loginName',  type : 'text'},
        {label: '通讯地址', property: 'loginName',  type : 'text'},
        {label: '其他信息', property: 'loginName',  type : 'textarea'},
      ],
      item: {}
    }
  },
  components: {
    Edits,
    Searchs
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
