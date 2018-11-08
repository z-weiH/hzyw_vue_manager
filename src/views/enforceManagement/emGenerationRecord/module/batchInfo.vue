<template>
  <el-dialog
    class="self_dialog"
    :visible.sync="infoFlag"
    v-dialogDrag
    width="655px"
    center>
    <div class="title" style="line-height: 37px;height: 37px;text-align: left;padding-left: 10px;" slot="title">
        <span style="width: 31%;display: inline-block;" class="ellipsis">
          批次号：{{currentItem.batchNo}}
        </span>
      <span style="width: 31%;display: inline-block;" class="ellipsis">
          操作人: {{currentItem.userName}}
        </span>

      <span style="width: 31%;display: inline-block;" class="ellipsis">
          处理时间：{{currentItem.processTime}}
        </span>
    </div>
    <div class="dialog_content">
      <ul style="overflow: hidden">
        <li>
          <div class="title">{{currentItem.customerList.length}}个客户</div>
          <div class="list">
            <span v-for="(item,idx) in currentItem.customerList" :key="idx">{{item.clientName}}</span>
          </div>
        </li>
        <li>
          <div class="title">{{currentItem.courtList.length}}个法院</div>
          <div class="list">
            <span v-for="(item,idx) in currentItem.courtList" :key="idx">{{item.courtName}}</span>
          </div>
        </li>
        <li>
          <div class="title">已生成材料</div>
          <div class="list">
            <span >{{currentItem.createDocsAll}}</span>
          </div>
        </li>
        <li>
          <div class="title">{{currentItem.caseList.length}}个案件</div>

        </li>
      </ul>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'batchInfo',
  data(){
    return {
      currentItem: {
        customerList:[],
        courtList: [],
        caseList: []
      },
      infoFlag: false
    }
  },
  methods:{
    show(item){
      this.$http.get("/docsCreate/batchDetailInfo.htm",{batchNo: item.batchNo}).then(res => {
        this.infoFlag = true;
        this.currentItem = {...item,...res.result};
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .dialog_content{
    ul>li{
      margin-bottom: 10px;
      color: #333;
      .title{
        line-height: 30px;
        font-size: 16px;
        font-weight: bold;
      }
      .list{
        line-height: 22px;
        display: inline-block;
        margin-right: 10px;
      }
    }
  }
</style>
