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
        },{
          title: '第二部分：法定代表人信息',
          content: [
            {label: '法定代表人：', type: 'text', placeholder: '请输入法定代表人',columns:1,property: 'hello'},
            {label: '身份证号：', type: 'text', placeholder: '请输入身份证号',columns:1},
            {label: '法定代表人手机：', type: 'text', placeholder: '请输入法定代表人手机',columns:1},
            {label: '法定代表人邮箱：', type: 'text', placeholder: '请输入法定代表人邮箱',columns:1},
            {label: '法定代表人职务：', type: 'text', placeholder: '请输入法定代表人职务',columns:2},
            {type: 'info',columns:2,content:'注：法定代表人手机和邮箱将用于接收案件信息，请与客户确认'}
          ]
        },{
          title: '第三部分：联系人信息',
          content: [
            {label: '客户联系人：', type: 'text', placeholder: '请输入客户联系人',columns:1},
            {label: '联系电话：', type: 'text', placeholder: '请输入联系电话',columns:1},
            {label: '联系邮箱：', type: 'text', placeholder: '请输入联系邮箱',columns:1},
            {label: '微信或QQ：', type: 'text', placeholder: '请输入微信或QQ',columns:1},
          ]
        },{
          title: '第四部分：配置信息',
          content: [
            {label: '选择仲裁委：', type: 'select', options: [{label: '杭州仲裁委员会', value: 'hz'},{label: '衢州仲裁委员会', value: 'qz'}],columns:1},
            {label: '客户类型：', type: 'select', options: [{label: '杭州仲裁委员会', value: 'hz'},{label: '衢州仲裁委员会', value: 'qz'}],columns:1},
          ]
        },{
          title: '第五部分：客户资料',
          content: [
            {label: '营业执照(jpg，png)', type: 'text', placeholder: '请输入客户联系人',columns:2},
          ]
        },{
          title: '第六部分：合同信息',
          content: [
            {label: '合同编号：', type: 'text', placeholder: '请输入合同编号',columns:1},
            {label: '合同时间：', type: 'text', placeholder: '请输入合同时间',columns:1},
            {label: '预缴仲裁受理费（元）：', type: 'text', placeholder: '请输入预缴仲裁受理费',columns:1},
            {label: '技术服务费（元）：', type: 'text', placeholder: '请输入技术服务费',columns:1},
            {label: '充值仲券（张）：', type: 'text', placeholder: '请输入充值仲券',columns:1},
            {label: '仲券金额（元）：', type: 'text', placeholder: '请输入仲券金额',columns:1},
            {label: '赠送仲券（张）：', type: 'text', placeholder: '请输入赠送仲券',columns:1},
          ]
        },{
          title: '第七部分：所属负责人',
          content: [
            {label: '市场人员：',  type: 'select', options: [{label: '杭州仲裁委员会', value: 'hz'},{label: '衢州仲裁委员会', value: 'qz'}],columns:1,placeholder:'请选择市场人员'},
            {type: 'info',columns:1, content:''},

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
  .dailog-container{
    height: 542px;
    overflow-y: scroll;
  }
</style>
