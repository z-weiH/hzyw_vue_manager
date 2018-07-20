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
      <table-component :noPager="true" :noSerial="true"  :pager="pager" :table-data="tableData" :column-define="columnDefine"></table-component>
    </div>
  </div>
</template>

<script>
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
          { label: "启用状态", property: "enabledStatus" },
        ],
        queryUrl: "",
      }
    },
    components:{
      TableComponent
    }
  }
</script>

<style lang="scss" scoped>

.business-type-setting{

}

</style>
