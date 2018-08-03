<template>
  <div>
    <div>
      <div class="wsbodyhead" >
      <a>所在位置</a>
      <router-link :to="'/main/balanceQuery'" class="aside_tit">账户余额</router-link>
      <span class="aside_tit"> > 赠券订单 </span>

    </div>  
      <div class="item-title">
        <router-link :to="'/main/balanceQuery'" tag="span" class="fr" style="cursor:pointer;">返回>></router-link>  
        仲券订单
      </div>
      <div class="item-table">
        <table-component :pager="pager" :tableData="tableData" :columnDefine="columnDefine" >
        </table-component>
      </div>
    </div>
    
  </div>
</template>

<script>
import Mixins from '@/components/script/_mixin'
import Searchs from '@/components/searchs'
import TableComponent from '@/components/table'
export default {
  name: 'accountAffirm',
  extends: Mixins,
  data () {
    return {
      item: {},
      columnDefine: [
        {label: '客户名称',property: 'clientName',width: 186.5},
        {label: '可用赠券',property: 'ticket',width: 180},
        {label: '赠送日期',property: 'startDate', width: 180},
        {label: '有效期至',property: 'ticketPeriod', width: 180},
        {label: '摘要',property: '132', width: 180},
      ],
      queryUrl: 'account/queryAvailableTicket.htm',
      searchItem: {}
    }
  },
  methods: {
    
  },
  components: {
    TableComponent,
  },
  mounted() {
      let obj =  {clientCode: this.$route.query.clientCode};
      this.doQuery(this.queryUrl, obj);
  }
}
</script>

<style scoped>

</style>
