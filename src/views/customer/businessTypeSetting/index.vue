<template>
  <div class="business-type-setting">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">业务类型设置</a>
    </div>
    <div class="item-title of-hidden">
      <span class="item-title-sign">数据类型</span>
    </div>
    <div class="item-table">
      <table-component :noPager="true" :noSerial="true"  :pager="pager" :table-data="tableData" :column-define="columnDefine">
        <el-table-column label="启用状态" prop="orderStatusName" slot="defineCol" >
          <template slot-scope="scope">
            // { label: "启用状态", property: "enabledStatus",},
            // 0:未启用,1:启用
           <span v-if="scope.row.enabledStatus === 0" class="colLink">启用</span>
           <span v-if="scope.row.enabledStatus === 1" class="colLink" style="color:#848484">停用</span>
          </template>
        </el-table-column>

      </table-component>
      <div class="center mt-20 mb-20">
        <el-button type="primary" @click="HandleCreate">新增业务</el-button>
      </div>
    </div>

    <el-dialog
      ref="dialog"
      :visible.sync="showDailog"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="新增业务"
      width="640px"
      center>
      <div style="margin: 0 100px;">
        <edits class="item-edits" formname="changePwd" ref="edits" :editItems="editItems" :item="item"></edits>
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
  import Mixins from "@/components/script/_mixin";
  import TableComponent from "@/components/table";
  export default {
    name: 'businessTypeSetting',
    mixins: [Mixins],
    data() {
      return {
        columnDefine: [
          { label: "业务类型", property: "busiType" },
          { label: "创建时间", property: "createTime" },
          { label: "产品数量", property: "productNum" },

        ],
        //控制弹窗
        showDailog: false,
        item: {},
        editItems: [
          {label: '业务类型', property: 'loginName', type : 'text',placeholder:'请输入业务类型'},
        ],
        queryUrl: "/5/biz/queryBizSetTypeByBaseQuery.htm",
      }
    },
    components:{
      TableComponent,
      Edits
    },
    methods:{
      HandleCreate() {
        this.showDailog = true;
      },
      saveHandle() {

      }
    },
    created() {
      this.doQuery(this.queryUrl,{});
    }
  }
</script>

<style lang="scss" scoped>

.business-type-setting{

}

</style>
