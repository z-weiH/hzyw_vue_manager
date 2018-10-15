<template>
  <div class="content">
    <div class='wsbodyhead'>
      <a>所在位置</a>
      <router-link :to='$options.name' class='aside_tit'>被申请人操作记录</router-link>
    </div>
    <searchs @valueChange="searchItemChange" class='item-search' :search-items='searchItems' :item='searchItem' :query-url='queryUrl'>
      <template slot='moreBtn'>
        <el-button v-if="misShow" class='ml-20' type='primary' @click='exportFile1'>导出Excel</el-button>
      </template>
    </searchs>
    <div class='item-title'>
    被申请人操作记录列表
    </div>
    <div class='item-table'>
         <table-component  :pager="pager"  @refreshList="doQuery(this.queryUrl, this.searchItem)" :currentPage.sync="pager.currentPage" :total="pager.total" :pageSize="pager.pageSize" :table-data='tableData' :column-define='columnDefine' ></table-component>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { URL_JSON } from '../../../components/script/url_json'
import exportFile from '@/assets/js/exportFile'
import Searchs from '@/components/searchs'
import TableComponent from '@/components/table'
import Mixins from '@/components/script/_mixin'

export default {
	name: 'respondentsOperateRecord',
	mixins: [Mixins],
	data() {
		return {
			misShow : (() => {
				try{
					let userName = JSON.parse(localStorage.getItem('loginInfo')).userName;
					let arr = ['费玉琳','金凤','蔣慧芳','超级管理员'];
					if(arr.indexOf(userName) !== -1) {
						return true;
					}else {
						return false;
					}
				}catch(err) {
					return false;
				}
			})(),
			item: {},
			exportUrl: URL_JSON['exportRespondentsOperateRecord'],
			queryUrl: URL_JSON['queryRespondentsOperateRecord'], ///11/respondents/queryOperRecordList.htm
			tableData: [{}],
			opTypeData: [],
			opObData: [],
			opCompany: [],
			opProduct: [],
			opHkCaseStage: [],
			opHkCaseStatus: [],
			searchItem: {},
			searchItems: [
				{
					label: '案件查询',
					type: 'text',
					placeholder: '案号、申请人、被申请人、手机号',
					colSpan: 4,
					property: 'keyWords',
				},
				{
					label: '操作日期',
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
					type: 'select',
					colSpan: 4,
					property: 'merchantCode',
					options: this.opCompany,
					labelfield: 'merchantName',
					valuefield: 'code',
					filterable: true,
				},
				{
					label: '产品名称',
					type: 'select',
					colSpan: 4,
					property: 'prodName',
					options: this.opProduct,
					labelfield: 'prodName',
					valuefield: 'prodName',
					filterable: true,
				},
				{
					label: '操作案件阶段',
					type: 'select',
					colSpan: 4,
					property: 'caseProcess',
					options: this.opHkCaseStage,
					labelfield: 'desc',
					valuefield: 'status',
				},
				{
					label: '操作案件状态',
					type: 'select',
					colSpan: 4,
					property: 'statusThree',
					options: this.opHkCaseStatus,
					labelfield: 'desc',
					valuefield: 'status',
				},
				{
					label: '操作类型',
					type: 'select',
					colSpan: 4,
					property: 'operType',
					newline: 1,
					options: this.opTypeData,
					labelfield: 'desc',
					valuefield: 'operType',
				},
				{
					label: '操作对象',
					type: 'select',
					colSpan: 4,
					options: this.opObData,
					property: 'operObject',
					labelfield: 'desc',
					valuefield: 'operObject',
				},
			],
			columnDefine: [
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
					label: '案件阶段',
					property: 'caseProcessCn',
					width: 100,
				},
				{
					label: '案件状态',
					property: 'statusThreeCn',
					width: 100,
				},
				{
					label: '操作类型',
					property: 'operTypeCn',
					width: 100,
				},
				{
					label: '操作对象',
					property: 'operObjectCn',
					width: 100,
				},
				{
					label: '操作时间',
					property: 'operTime',
					width: 100,
				},
			],
		}
	},
	methods: {
		exportFile1() {
			exportFile({ url: URL_JSON['exportRespondentsOperateRecord'], data: this.searchItem })
		},
		searchItemChange(item) {
			console.error(item)
			for (let i in item) {
				switch (item[i]) {
					case 'merchantCode':
						console.log('1---', item['value'])
						if (item['value'] === '') {
							this.$set(this.searchItem,'prodName','');
              this.searchItems[4].options = [];
						} else {
							this.optsPduListView({ merchantCode: item['value'] })
						}
						break
					case 'caseProcess':
						console.log('2----', item['value'])
						this.optsHkCaseStatusView({ status: item['value'] })
						break
					case 'operType':
						console.log('3----', item['value'])
						this.optsObjListView({ operType: item['value'] })
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
				console.log('ttttttttttttttttttttt')
				console.info(res.result.count)
			})
		},
		optsCompanyListView() {
			this.$http.post(URL_JSON['selectCompany']).then(res => {
				console.log('selectCompany:::', res)
				this.searchItems[3].options = res.result
				// console.log('list:',res.result);
			})
		},
		optsPduListView(params) {
			this.searchItems[4].options = []
			this.$http.post(URL_JSON['selectProduct'], params).then(res => {
				this.searchItems[4].options = res.result
				this.$set(this.searchItem, 'prodName', '')
			})
		},
		optsHkCaseStageView() {
			this.$http.post(URL_JSON['selectHkCaseStage']).then(res => {
				this.searchItems[5].options = res.result.list
			})
		},
		optsHkCaseStatusView(params) {
			this.$http.post(URL_JSON['selectHkCaseStatus'], params).then(res => {
				console.warn('\n', res.result.list)
				// res.result.list.unshift({
				//   desc: "请选择",
				//   status: ""
				// });
				this.searchItems[6].options = res.result.list
				setTimeout(() => {
					this.$set(this.searchItem, 'statusThree', '')
					console.log(this.searchItem)
				}, 300)
			})
		},
		optsTypeListView() {
			this.$http.post(URL_JSON['queryOperType']).then(res => {
				console.info('type::::', res)

				this.searchItems[7].options = res.result.list
			})
		},
		optsObjListView(params) {
			this.$http.post(URL_JSON['queryOperObject'], params).then(res => {
				console.info('obj:::::', res)
				this.searchItems[8].options = res.result.list
				setTimeout(() => {
					this.$set(this.searchItem, 'operObject', '')
				}, 300)
			})
		},
	},
	created() {
		this.optsCompanyListView() //互金企业
		// this.optsPduListView() //产品名称
		this.optsHkCaseStageView() //还款案件阶段
		this.optsHkCaseStatusView() //还款案件状态
		this.optsTypeListView() //操作类型
		this.optsObjListView() //操作对象
		this.doQuery(this.queryUrl, this.searchItem)
	},
	components: {
		Searchs,
		TableComponent,
	},
}
</script>

<style scoped lang="scss">
</style>
