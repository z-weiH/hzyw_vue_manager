<template>
  <div>
    <el-dialog
      v-dialogDrag
      :visible.sync="show"
      :title="title"
      width="868px"
      center>
      <table-edits :editDefines="editDefines" :item="item"></table-edits>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="save" >{{action}}</el-button>
          <el-button @click="$parent.editState = 0">取 消</el-button>
        </span>
    </el-dialog>
  </div>
</template>
<script>
  import TableEdits from '@/components/tableEdits'
  import {URL_JSON} from "../../../../components/script/url_json";
  export default {
    name: 'updatePwd',
    props: {
      item: Object,
      editState: Number
    },
    data () {
      return {
        editDefines:  [{
          content: [
            {label: '客户全称：', type: 'text', placeholder: '客户全称',columns:2,property: 'custName'},
            {label: '客户logo图标：',type: 'file',columns:1,property: 'custIcon',path: 'custinfo/logo'},
            {type: 'img',columns:1},
            {label: '客户pc官网地址：', type: 'text', placeholder: '客户pc官网地址',columns:2,property: 'custWebpc'},
            {label: '客户手机官网地址：', type: 'text', placeholder: '客户手机官网地址',columns:2,property: 'custWebmobile'},
            {label: '上线状态：', type: 'select', placeholder: '请选择',columns:2, options: [
                {label: '待上线', value: 0},
                {label: '已上线', value: 1},
                {label: '已下线', value: 2},
              ], property: 'custStatus'},
            {label: '排序：', type: 'text', placeholder: '输入排序',columns:2, property: 'custSort'},
            {label: '备注信息：', type: 'textarea', placeholder: '输入备注信息',columns:2, property: 'custRemark'},
          ]
        }]
      }
    },
    methods: {
      save() {
          // console.error(this.item);
        this.$http.post(URL_JSON['saveCustomerCase'],this.item)
          .then(res => {
          if(res.code == '0000'){
            console.log(res);
            if(this.editState == 2){

            }else{
              console.log(this.$parent);
              let currentItem = this.$parent.tableData.find(it => it.custId == this.item.custId);
              Object.keys(this.item).forEach(key => {
                currentItem[key] = this.item[key];
              });
              this.$parent.editState = 0;

            }
          }
        })
      }
    },
    computed: {
      action() {
        return this.editState == 2 ? '新 增' : '修 改'
      },
      title() {
        return this.editState == 2 ? '新增案例' : '修改案例'
      },
      show :{
        get: function () {
          return this.editState == 1 || this.editState == 2
        },
        set: function (v) {
          if(!v)
            this.$parent.editState = 0
        }
      }
    },
    components: {
      TableEdits
    }
  }
</script>

<style scoped>

</style>

