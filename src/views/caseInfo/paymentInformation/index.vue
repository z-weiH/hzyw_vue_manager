<template>
  <div class='content'>
    <div class='wsbodyhead'>
      <a>所在位置</a>
      <router-link :to='$options.name' class='aside_tit'>还款信息</router-link>
    </div>
    <searchs @valueChange="searchItemChange" class='item-search' :search-items='searchItems' :item='item' :query-url='queryUrl'>
        <template slot='moreBtn'>
              <el-button class='ml-20' type='primary' @click='exportFile1'>导出Excel</el-button>
        </template>
    </searchs>
    <div class='item-title'>
      还款信息列表
    </div>
    <div class='item-table'>
      <table-component  :pager="pager"  @refreshList="doQuery(this.queryUrl, this.item)" :currentPage.sync="pager.currentPage" :total="pager.total" :pageSize="pager.pageSize" :table-data='tableData' :column-define='columnDefine' ></table-component>
    </div>
  </div>
</template>

<script type='text/ecmascript-6'>
import { URL_JSON } from '../../../components/script/url_json'
import exportFile from '@/assets/js/exportFile'
import Searchs from '@/components/searchs'
import TableComponent from '@/components/table'
import Mixins from '@/components/script/_mixin'
export default {
	name: 'paymentInformation',
	mixins: [Mixins],
	data() {
		return {
			item: {},
			Withdrawals: false,
			opCompany: [],
			opProduct: [],
			opHkCaseStage: [],
			opHkCaseStatus: [],
			queryUrl: URL_JSON['queryPaymentInformation'], ///11/repayment/queryRepaymentList.htm
			exportUrl: URL_JSON['exportPaymentInfomation'],
			pager: {
				// 数据总数
				total: 11,
				// 当前页数
				currentPage: 1,
				// 每页数量
				pageSize: 10,
			},
			tableData: [{}],
			searchItem: {},
			searchItems: [
				{
					label: '案件查询',
					type: 'text',
					placeholder: '案号、申请人、被申请人、手机号',
					colSpan: 8,
					property: 'keyWords',
				},
				{
					type: 'select',
					placeholder: '日期选择',
					colSpan: 4,
					property: 'dateType',
					options: [
						{
							label: '提交日期',
							value: '1',
						},
						{
							label: '立案日期',
							value: '2',
						},
						{
							label: '组庭日期',
							value: '3',
						},
						{
							label: '结案日期',
							value: '4',
						},
						{
							label: '应裁日期',
							value: '5',
						},
					],
					property: 'repaymentTime',
				},
				{
					type: 'date',
					placeholder: '开始日期',
					colSpan: 4,
					property: 'startDate',
				},
				{
					type: 'date',
					placeholder: '结束日期',
					colSpan: 4,
					property: 'endDate',
				},
				{
					label: '互金企业',
					newline: 1,
					type: 'select',
					placeholder: '互金企业',
					colSpan: 3,
					property: 'merchantCode',
					options: this.opCompany,
					labelfield: 'merchantName',
					valuefield: 'code',
					filterable: true,
				},
				{
					label: '产品名称',
					type: 'select',
					placeholder: '产品名称',
					colSpan: 3,
					property: 'prodName',
					options: this.opProduct,
					labelfield: 'prodName',
					valuefield: 'prodName',
					filterable: true,
				},
				{
					label: '还款案件阶段',
					type: 'select',
					placeholder: '还款案件阶段',
					colSpan: 3,
					property: 'caseProcess',
					options: this.opHkCaseStage,
					labelfield: 'desc',
					valuefield: 'status',
				},
				{
					label: '还款案件状态',
					type: 'select',
					placeholder: '还款案件状态',
					colSpan: 3,
					property: 'statusThree',
					options: this.opHkCaseStatus,
					labelfield: 'desc',
					valuefield: 'status',
				},
			],
			columnDefine: [
				{
					label: '案件编号',
					property: 'caseNo',
					width: 100,
				},
				{
					label: '互金企业',
					property: 'merchantName',
					width: 100,
				},
				{
					label: '产品名称',
					property: 'productName',
					width: 100,
				},
				{
					label: '申请人',
					property: 'applicants',
					width: 100,
				},
				{
					label: '被申请人',
					property: 'respondents',
					width: 100,
				},
				{
					label: '被申请人手机',
					property: 'resPhone',
					width: 150,
				},
				{
					label: '还款金额',
					property: 'repaymentAmt',
					width: 100,
				},
				{
					label: '还款时间',
					property: 'repaymentTime',
					width: 100,
				},
				{
					label: '还款案件阶段',
					property: 'caseProcessCn',
					width: 150,
				},
				{
					label: '还款案件状态',
					property: 'statusThreeCn',
					width: 150,
				},
				{
					label: '提交后天数',
					property: 'submitDate',
					width: 150,
				},
				{
					label: '标的金额',
					property: 'amtBorrow',
					width: 100,
				},
				{
					label: '逾期天数',
					property: 'overdueDate',
					width: 100,
				},
				{
					label: '已还款总额',
					property: 'reimbursementAmt',
					width: 150,
				},
				{
					label: '打款金额',
					property: 'payAmt',
					width: 100,
				},
			],
		}
	},
	methods: {
		exportFile1() {
			console.log(exportFile)
			exportFile({ url: URL_JSON['exportPaymentInfomation'], data: this.item })
		},
		searchItemChange(item) {
			// console.error(item);
			for (var i in item) {
				switch (item[i]) {
					case 'merchantCode':
						console.log(item['value'])
						if (item['value'] === '') {
							this.$set(this.item,'prodName','');
              this.searchItems[5].options = [];
						} else {
							this.optsPduListView({ merchantCode: item['value'] })
						}
						break
					case 'caseProcess':
						this.optsHkCaseStatusView({ status: item['value'] })
						break
					default:
						break
				}
			}
		},
		doQuery(url, item) {
			this.query(url, item).then(res => {
				this.tableData = res.result.list
				this.total = res.result.count
			})
		},
		optsCompanyListView() {
			this.$http.post(URL_JSON['selectCompany']).then(res => {
				console.log('selectCompany:::', res)
				this.searchItems[4].options = res.result
				console.log('list:', res.result)
			})
		},
		optsPduListView(params) {
			this.searchItems[5].options = []
			this.$http.post(URL_JSON['selectProduct'], params).then(res => {
				this.searchItems[5].options = res.result
				this.$set(this.item, 'prodName', '')
				console.log('selectProduct:::', res)
			})
		},
		optsHkCaseStageView() {
			this.$http.post(URL_JSON['selectHkCaseStage']).then(res => {
				// console.log('selectHkCaseStage:::',res);
				// res.result.list.unshift({
				//   desc: "请选择",
				//   status: ""
				// });
				this.searchItems[6].options = res.result.list
			})
		},
		optsHkCaseStatusView(params) {
			this.$http.post(URL_JSON['selectHkCaseStatus'], params).then(res => {
				console.warn('\n', res.result.list)
				// res.result.list.unshift({
				//   desc: "请选择",
				//   status: ""
				// });
				this.searchItems[7].options = res.result.list
				setTimeout(() => {
					// this.searchItem.statusThree = '';
					this.$set(this.item, 'statusThree', '')
					console.log(this.item)
				}, 300)
			})
		},
	},
	created() {
		this.optsCompanyListView() //互金企业
		// this.optsPduListView(); //产品名称
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

<style scoped >
</style>

