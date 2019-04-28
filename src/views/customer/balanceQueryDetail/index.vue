<template>
  <div>
    <div>
      <div class="wsbodyhead">
        <a>所在位置</a>
        <router-link :to="'/main/balanceQuery'" class="aside_tit">账户余额</router-link>
        <span class="aside_tit">
          >
          <template v-if="settleType == 1">仲券详情</template>
          <template v-if="settleType == 2">服务费详情</template>
        </span>
      </div>
      <div class="item-title">
        <router-link :to="'/main/balanceQuery'" tag="span" class="fr" style="cursor:pointer;">返回>></router-link>
        <template v-if="settleType == 1">仲券详情</template>
        <template v-if="settleType == 2">服务费详情</template>
      </div>
      <div class="item-table">
        <table-component :pager="pager" :tableData="tableData" :columnDefine="columnDefine"></table-component>
      </div>
    </div>
  </div>
</template>

<script>
import Mixins from "@/components/script/_mixin";
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
export default {
  name: "accountAffirm",
  extends: Mixins,
  computed: {},
  data() {
    return {
      clientCode: "",
      settleType: "",
      item: {},
      columnDefine: [
        { label: "客户名称", property: "clientName" },
        { label: "可用服务费(元)", property: "serverFeeAvail" },
        { label: "赠送日期", property: "startDate" },
        { label: "有效期至", property: "ticketPeriod" }
      ],
      queryUrl: "/account/queryAvailableTicket.htm",
      searchItem: {}
    };
  },
  methods: {
    queryParams() {
      this.clientCode = this.$route.query.clientCode;
      this.settleType = this.$route.query.settleType;
      // 处理仲券和服务费的不同情况显示视图
      if (this.settleType == 1) {
        this.columnDefine[1]["label"] = "可用仲券(张)";
        this.columnDefine[1]["property"] = "ticket";
      }
    }
  },
  components: {
    TableComponent
  },
  created() {
    this.queryParams();
  },
  mounted() {
    console.log(this.settleType);
    let obj = {
      clientCode: this.clientCode,
      settleType: this.settleType
    };
    this.doQuery(this.queryUrl, obj);
  }
};
</script>

<style scoped>
</style>
