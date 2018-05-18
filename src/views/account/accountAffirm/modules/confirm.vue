<template>
  <el-dialog
    :visible.sync="show"
    :title="title"
    width="890px"
    center>
    <div class="dailog-container">
      <table-edits :editDefines="edtDefines" :item="item"></table-edits>

    </div>
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
        title:'开户确认',
        edtDefines: [{
          title: '第一部分：客户基本信息',
          content: [
            {label: '客户全称：', type: 'text', readonly: true,columns:1,property: 'custName'},
            {label: '帐号：', type: 'text', readonly: true,columns:1,property: 'loginName'},
            {label: '社会唯一信用号：', type: 'text', readonly: true,columns:1,property: 'custIdcard'},
            {label: '法定代表人：', type: 'text', readonly: true,columns:1,property: 'legallerName'},
            {label: '合同号：', type: 'text', readonly: true,columns:1,property: 'contractNo'},
          ]
        },{
          title: '第二部分：加款信息',
          content: [
            {label: '添加受理费（元）: ', type: 'text',readonly: true,columns:1,property: 'hello'},
            {label: '技术服务费（元）：', type: 'text',readonly: true,columns:1,property: 'serviceAmt'},
            {label: '添加仲券（张）：: ', type: 'text',readonly: true,columns:1,property: 'hello'},
            {label: '仲券金额（元）：', type: 'text',readonly: true,columns:1,property: 'preTicketAmt'},
          ]
        }],
        item: {}
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
  .dailog-container{
    height: 542px;
    overflow-y: scroll;
  }
</style>
