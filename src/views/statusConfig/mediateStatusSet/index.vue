<template>
<div class="content">
        <div class='wsbodyhead'>
         <a>所在位置</a>
         <router-link :to='$options.name' class='aside_tit'>调解状态设置</router-link>
        </div>
        <searchs @valueChange="searchItemChange" class='item-search' :search-items='searchItems' :item='item' :query-url='queryUrl'>
          <template slot='moreBtn'><el-button class='ml-20' type='primary' @click=''>导出Excel</el-button></template>
        </searchs>
        <div class='item-title'>
          调解状态设置列表
        </div>
        <div class='item-table'>
           <table-component  :pager="pager"  @refreshList="doQuery(this.queryUrl, this.item)" :currentPage.sync="pager.currentPage" :total="pager.total" :pageSize="pager.pageSize" :table-data="tableData"  :column-define="columnDefine"  :actions="actions"></table-component>
        </div>
</div>
</template>
<script type="text/ecmascript-6">
import Searchs from '@/components/searchs'
import TableComponent from '@/components/table'
import Mixins from '@/components/script/_mixin'
import { URL_JSON } from '../../../components/script/url_json'
export default {
	name: 'mediateStatusSet',
	extends: Mixins,
	data() {
		return {
			item: {},
			queryUrl: URL_JSON['queryFreezeCaseList'],
			tableData: [{}],
			searchItems: [
				{
					label: '案件查询',
					type: 'text',
					placeholder: '案号、申请人、被申请人、手机号',
					colSpan: 7,
					property: 'keyWords',
				},
				{
					type: 'select',
					colSpan: 4,
					options: [
						{
							label: '提交日期',
							value: '1',
						},
						{
							label: '冻结日期',
							value: '2',
						},
					],
					property: 'dateType',
				},
				{
					type: 'date',
					placeholder: '开始日期',
					colSpan: 5,
					property: 'startDate',
				},
				{
					type: 'date',
					placeholder: '结束日期',
					colSpan: 5,
					property: 'endDate',
				},
				{
					newline: 1,
					label: '互金企业',
					type: 'select',
					colSpan: 5,
					property: 'merchantCode',
					options: [],
					labelfield: '',
					valuefield: '',
				},
				{
					label: '产品名称',
					type: 'select',
					colSpan: 5,
					property: 'productId',
					options: [],
					labelfield: 'prodName',
					valuefield: 'prodId',
				},
				{
					label: '逾期天数',
					type: 'select',
					colSpan: 6,
					property: 'overdueDate',
				},
				{
					newline: 1,
					label: '案件阶段',
					type: 'select',
					colSpan: 5,
					property: 'caseProcess',
					options: [],
					labelfield: 'desc',
					valuefield: 'status',
				},
				{
					label: '案件状态',
					type: 'select',
					colSpan: 5,
					property: 'statusThree',
					options: [],
					labelfield: 'desc',
					valuefield: 'status',
				},
				{
					label: '应裁情况',
					type: 'select',
					colSpan: 6,
					property: 'decideStatus',
					options: [
						{
							label: '未应裁',
							value: '0',
						},
						{
							label: '应裁有意见',
							value: '1',
						},
						{
							label: '应裁无意见',
							value: '2',
						},
					],
				},
				{
					newline: 1,
					label: '短信送达',
					type: 'select',
					colSpan: 5,
					property: 'messageDelivery',
					options: [
						{
							label: '未送达',
							value: '0',
						},
						{
							label: '送达',
							value: '1',
						},
					],
				},
				{
					label: '短链查看',
					type: 'select',
					colSpan: 5,
					property: 'shortChainView',
					options: [
						{
							label: '未查看',
							value: '0',
						},
						{
							label: '查看',
							value: '1',
						},
					],
				},
				/*   {
          label: "调解中心",
          type: "select",
          colSpan: 6,
          property: ""
        }, */
			],
			columnDefine: [
				{
					label: '案件编号',
					property: 'arbCaseId',
				},
				{
					label: '互金企业',
					property: 'platName',
				},
				{
					label: '申请人',
					property: 'applicants',
				},
				{
					label: '被申请人',
					property: 'respondents',
				},
				{
					label: '被申请人手机',
					property: 'resPhone',
					width: 130,
				},
				{
					label: '案件阶段',
					property: 'caseProcessDesc',
				},
				{
					label: '案件状态',
					property: 'caseStatusDesc',
				},
				{
					label: '提交日期',
					property: 'submitTime',
				},
				{
					label: '冻结日期',
					property: '1s',
				},
				{
					label: '应裁情况',
					property: 'decideStatus',
				},
				{
					label: '短信送达',
					property: 'messageDelivery',
				},
				{
					label: '短链查看',
					property: 'shortChainView',
				},
			],
			actions: [
				{
					label: '操作',
					btns: [{ label: '解冻', function: this.doEdit }],
				},
			],
		}
	},
	methods: {
		doQuery(url, item) {
			this.query(url, item).then(res => {
				this.tableData = res.result.list
				this.total = res.result.count
			})
		},
		searchItemChange(item) {
      console.log("searchI:::", item);
			for (var i in item) {
				switch (item[i]) {
					case 'merchantCode':
						console.log(item['value'])
						this.optsPduListView({ merchantCode: item['value'] })
						break
					case 'caseProcess':
            console.warn(item['value'])
            console.log('item>>>>>>>>>>>>>>',this.item);
            item['value'] === "" ? this.item[this.searchItems[8].property] = '' :
						this.optsHkCaseStatusView({ status: item['value'] })
						break
					default:
						break
				}
			}
		},
		optsCompanyListView() {
			this.$http.post(URL_JSON['selectCompany']).then(res => {
				this.searchItems[4].options = res.result
			})
		},
		optsPduListView(params) {
			this.$http.post(URL_JSON['selectProduct'], params).then(res => {
				this.searchItems[5].options = res.result
			})
		},
		optsHkCaseStageView() {
			this.$http.post(URL_JSON['selectHkCaseStage']).then(res => {
				this.searchItems[7].options = res.result.list
				console.warn('阶段：', res.result.list)
			})
		},
		optsHkCaseStatusView(params) {
			this.$http.post(URL_JSON['selectHkCaseStatus'], params).then(res => {
				this.searchItems[8].options = res.result.list
        console.warn('状态：', res.result.list)

			})
		},
	},
	created() {
		this.optsCompanyListView() //互金企业
		this.optsPduListView() //产品名称
		this.optsHkCaseStageView() //还款案件阶段
		this.optsHkCaseStatusView() //还款案件状态
	},
	mounted() {
		this.doQuery(this.queryUrl, this.item)
	},
	components: {
		Searchs,
		TableComponent,
	},
}
</script>
<style scoped lang="scss">
</style>
