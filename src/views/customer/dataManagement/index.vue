<template>
  <div class="data-management">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">数据管理</a>
    </div>
    <div class="item-search">
      <searchs :search-items="searchItems" :item="searchItem" :queryUrl="queryUrl"></searchs>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">数据列表</span>
    </div>
    <div class="item-table">
      <table-component :needCheckbox="true" :pager="pager" :table-data="tableData" :column-define="columnDefine">
        <el-table-column label="操作"  slot="defineCol" >
          <template slot-scope="scope">
            <span class="colLink" @click="changeHandle">修改</span>
            <span @click="deleteHandle">删除</span>
          </template>
        </el-table-column>
      </table-component>

      <div class="center mt-20 mb-20">
        <el-button type="primary" @click="showDailog = true;">新增数据</el-button>
        <el-button  @click="HandleCreate">取消</el-button>
      </div>

    </div>

    <el-dialog
      ref="dialog"
      :visible.sync="showDailog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="新增数据"
      width="640px"
      center>
      <div style="margin: 0 100px;">
        <edits class="item-edits" formname="changePwd" ref="edits" :editItems="editItems" :item="item" :labelWidth="'100px'"></edits>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary"   @click="saveHandle">保 存</el-button>
          <el-button @click=" showDailog= 0" >取 消</el-button>
        </span>
    </el-dialog>

  </div>
</template>

<script>
  import Edits from '@/components/edits'
  import Searchs from "@/components/searchs";
  import Mixins from "@/components/script/_mixin";
  import TableComponent from "@/components/table";
  export default {
    name:'dataManagement',
    mixins: [Mixins],
    data() {
      return {
        queryUrl: '/5/templateData/queryTemplateDataByBaseQuery',
        searchItems: [
          {
            type: "text",
            placeholder: "请输入数据名称",
            property: "dataName",
            colSpan: 6
          },
          {type: 'date',placeholder: '请输入开始时间', property: 'startDate', colSpan: 4, lt: 'endDate'},
          {type: 'date',placeholder: '请输入结束时间', property: 'endDate', colSpan: 4, gt: 'startDate'},
        ],
        columnDefine:[
          { label: "数据名称", property: "dataName",width: 200},
          { label: "创建日期", property: "startDate",width: 200},
          { label: "备注", property: "remark",width: 200},
        ],
        //控制弹窗
        showDailog: false,
        item: {},
        editItems: [
          {label: '数据名称：', property: 'dataName', type : 'text',placeholder:'请输入数据名称'},
          {label: '备注：', property: 'remark', type : 'textarea',placeholder:'请勿超过30个数字'}
        ],

      }
    },
    methods:{
      changeHandle(){

      },
      deleteHandle(){

      }
    },
    components:{
      TableComponent,
      Searchs,
      Edits
    },
  }
</script>

<style lang="scss" scoped>

.data-management{

}

</style>
