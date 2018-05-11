<template>
  <el-dialog
    :visible.sync="show"
    :title="title"
    width="890px"
    center>
    <table-edits :editDefines="edtDefines" :item="item"></table-edits>
    <span slot="footer" class="dialog-footer">
          <el-button type="primary">确 定</el-button>
          <el-button type="primary">确认提交</el-button>
          <el-button @click="$parent.editState = 0">取 消</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import TableEdits from '@/components/tableEdits'
  export default {
    name: 'apply',
    props: {
      editState: Number,
    },
    data () {
      return {
        title:'开户申请',
        edtDefines: [{
          title: '第一部分：客户基本信息',
          content: [
            {label: '客户全称：', type: 'text', placeholder: '请输入客户全称',columns:1,property: 'hello'},
            {label: '年营业额（万元）：', type: 'text', placeholder: '请输入年营业额',columns:1},
            {label: '社会唯一信用号：', type: 'text', placeholder: '请输入社会唯一信用号',columns:1},
            {label: '邮箱(账户)：', type: 'text', placeholder: '请输入邮箱(账户)',columns:1},
            {label: '企业注册地址：', type: 'text', placeholder: '请输入企业注册地址',columns:2},
            {label: '网址或应用(名称)：', type: 'text', placeholder: '请输入网址或应用(名称)',columns:2},
          ]
        }],
        item: {hello: 1}
      }
    },
    computed: {
      show :{
        get: function () {
          return this.editState == 2;
        },
        set: function (v) {
          if(!v)
            this.$parent.editState = 0
        }
      }
    },
    components: {
      TableEdits
    },
    mounted () {
    }
  }
</script>

<style scoped lang="scss">
  .el-table--border, .el-table--group{
    border: none;
    border-left: 1px solid #ebeef5;
  }
  td{
    border: 1px solid #ebeef5;
  }
</style>
