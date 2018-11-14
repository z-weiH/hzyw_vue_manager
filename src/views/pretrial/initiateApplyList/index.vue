<template>
  <div class="content">
    <div class='wsbodyhead'>
      <a>所在位置</a>
      <router-link :to='$options.name' class='aside_tit'>立案申请</router-link>
    </div>
    <searchs @valueChange="searchItemChange" class='item-search' :search-items='searchItems' :item='searchItem' :query-url='queryUrl'>
    </searchs>
    <div class='item-title clear of-hidden'>
      <span class="fl mt-10">案件列表</span>
      <el-button class='fr' type='primary' @click='create' :disabled="dfBtnStatus">申请立案</el-button>
    </div>
    <div class='item-table'>
      <table-component :pager="pager" @refreshList="doQuery(this.queryUrl, this.searchItem)" :currentPage.sync="pager.currentPage" :total="pager.total" :pageSize="pager.pageSize" :table-data="tableData" :column-define="columnDefine">
      </table-component>
    </div>
    <apply-case-dialog :editState="editState" :pager="pager" :item="searchItem"></apply-case-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import $ from 'jquery'
import { URL_JSON } from '../../../components/script/url_json'
import Searchs from '@/components/searchs'
import TableComponent from '@/components/table'
import Mixins from '@/components/script/_mixin'
import { rawCitiesData } from '@/assets/js/city'
import applyCaseDialog from './modules/create'

export default {
	name: 'initiateApplyList',
	mixins: [Mixins],
	data() {
		return {
			item: {},
			editState: 0,
			queryUrl: /* "/24" + */ URL_JSON['queryInitiateApplyList'],
			merchantOptions: [], //互金企业
			tableData: [],
			dfBtnStatus: true,
			searchItem: {},
			searchItems: [
				{
					label: '互金企业',
					type: 'select',
					placeholder: '请输入关键字进行搜索',
					colSpan: 6,
					property: 'merchantCode',
					options: [],
					labelfield: 'merchantName',
					valuefield: 'code',
					remoteMethod: this.companyfinance,
					filterable: true,
					reserveKey: true,
					remote: true,
				},
				{
					label: '产品名称',
					type: 'select',
					colSpan: 4,
					property: 'templateId',
					options: [],
					labelfield: 'prodName',
					valuefield: 'prodCode',
					remoteMethod: this.queryProductList,
				},
				{
					label: '账龄',
					type: 'select',
					colSpan: 4,
					property: 'accountPeriod',
					options: [
						{
							label: '1-30天 M1',
							value: 'M0',
						},
						{
							label: '31-60天 M2',
							value: 'M1',
						},
						{
							label: '61-90天 M3',
							value: 'M2',
						},
						{
							label: '91-120天 M4',
							value: 'M3',
						},
						{
							label: '121天-150天 M5',
							value: 'M4',
						},
						{
							label: '151天-180天 M6',
							value: 'M5',
						},
						{
							label: '181天-210天 M7',
							value: 'M6',
						},
						{
							label: '211天-240天 M8',
							value: 'M7',
						},
						{
							label: '241天-270天 M9',
							value: 'M8',
						},
						{
							label: '271天-300天 M10',
							value: 'M9',
						},
						{
							label: '301天-330天 M11',
							value: 'M10',
						},
						{
							label: '331天-360天 M12',
							value: 'M11',
						},
						{
							label: '360天以上 M12以上',
							value: 'M12',
						},
					],
				},
				{
					label: '被申请人',
					type: 'text',
					newline: 1,
					placeholder: '姓名、手机号',
					colSpan: 4,
					property: 'respondentName',
				},
				{
					label: '住所地',
					type: 'cascader',
					colSpan: 4,
					property: 'resAddress1',
					options: rawCitiesData,
					cusClass: 'c_place',
					changeOnSelect : true,
				},
				{
					label: '还款情况',
					type: 'select',
					colSpan: 4,
					property: 'repaymentStatus',
					options: [
						{
							label: '有还款',
							value: '1',
						},
						{
							label: '无还款',
							value: '2',
						},
					],
				},
				{
					label: '标的金额',
					type: 'rangeText',
					colSpan: 3,
					newline: 1,
					unit: '元',
					connectIco: '-',
					property: 'amtBorrowMin',
					format: /[^0-9]/g,
					width: 140,
				},
				{
					type: 'rangeText',
					colSpan: 3,
					unit: '元',
					property: 'amtBorrowMax',
					format: /[^0-9]/g,
					width: 140,
				},
				{
					label: '推送日期',
					type: 'date',
					colSpan: 4,
					placeholder: '开始日期',
					property: 'startDate',
				},
				{
					type: 'date',
					colSpan: 4,
					placeholder: '截至日期',
					property: 'endDate',
				},
			],
			columnDefine: [
				{
					label: '互金企业',
					property: 'clientName',
				},
				{
					label: '产品名称',
					property: 'productName',
				},
				{
					label: '被申请人',
					property: 'respondentName',
				},
				{
					label: '被申请人手机',
					property: 'resPhone',
				},
				{
					label: '住所地',
					property: 'address',
				},
				{
					label: '标的金额',
					property: 'amtCase',
				},
				{
					label: '逾期天数',
					property: 'overdueDate',
				},
				{
					label: '还款情况',
					property: 'repayment',
				},
				{
					label: '推送日期',
					property: 'pushDate',
				},
			],
		}
	},
	// watch: {
	//   value(val, oldval) {
	//     console.error(val, oldval);
	//   }
	// },
	methods: {
		searchItemChange(item) {
			console.error(item)
			console.error(this.searchItem)
			for (let i in item) {
				switch (item[i]) {
					case 'merchantCode':
						console.log('value---', item['value'])
						if (item['value'] === '') {
							// this.searchItem.templateId = ''
							this.$set(this.searchItem, 'templateId', '')
							// this.companyfinance('')
							// this.queryProductList(-1)
							this.searchItems[1].options = []
						} else {
							this.queryProductList(item['value'])
						}
						break
					default:
						break
				}
			}
		},
		doQuery(url, item) {
			console.log(JSON.stringify(item.resAddress))
			let place = $('[data-hk="c_place"]').find('input')[0].defaultValue

			let _idx = place.indexOf('/')
			item['resAddress'] = place.slice(_idx + 1)
			console.log('搜索因素：：', item)
			let _numMin = this.item.amtBorrowMin,
				_numMax = this.item.amtBorrowMax
			if ((!_numMin && _numMax) || (_numMin && !_numMax)) {
				this.$confirm('标的金额的范围请填写完整再查询', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					center: true,
				})
					.then()
					.catch(() => {})
			} else {
				if (_numMin > 999999 || _numMax > 999999) {
					this.$confirm('限制仅能输入0~999999的整数！', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						center: true,
					})
						.then()
						.catch(() => {})
				} else {
					if (_numMin > _numMax) {
						this.$confirm('您输入的标的金额范围有误，请重新输入！', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							center: true,
						}).then(() => {})
					} else {
						this.initQuery(url, item)
					}
				}
			}

			console.log('start::', this.item.amtBorrowMin)
			console.log('end::', this.item.amtBorrowMax)
		},
		initQuery(url, item) {
			this.query(url, item).then(res => {
				res.result.list.forEach(it => {
					it.resPhone = it.resPhone.substr(0, 3) + '****' + it.resPhone.substr(7)
				})
				this.tableData = res.result.list
				this.total = res.result.count

				let _lbNum_arr = [] //借款单号id数组
				let _lbNum = '' //借款单号id字符串
				let _caseNum_arr = [] //案件No数组
				let _caseNum = '' //案件No字符串
				let loanNos_data = this.tableData.filter((el, idx, self) => {
					// _lbNum_arr.push(self[idx]["loanBillNo"]);
					// _lbNum = _lbNum_arr.join();
					// _caseNum_arr.push(self[idx]["caseId"]);
					// _caseNum = _caseNum_arr.join();
				})
				// console.log("_lbNum: ", _lbNum);
				console.log('love***8: ', item)
				// item.loanBillNos = _lbNum;
				// item.caseId = _caseNum;
				for (let i in item) {
					// console.log(i);
					if (i == 'templateId') {
						console.log('--------------------99999-------', item[i])
						console.log('~~~~~~~~~~~~~~~~~table-~~~~~~~~~~', this.tableData.length)
						if (item[i] != '' && this.tableData.length != 0) {
							this.dfBtnStatus = false
						} else {
							this.dfBtnStatus = true
						}
					}
				}
			})
		},
		companyfinance(into) {
			console.log('互金企业')
			// 互金企业
			this.$http
				.post(URL_JSON['queryHJCompany'], {
					keyWords: into,
				})
				.then(res => {
					console.log('互金：：：', res.result)
					this.searchItems[0].options = res.result
				})
		},
		queryProductList(into) {
			//根据企业选择产品
			//queryCpProduct
			this.$http
				.post(URL_JSON['selectProduct'], {
					merchantCode: into,
				})
				.then(res => {
					console.log('产品：：：', res.result)
          this.searchItems[1].options = res.result
          this.$set(this.item, 'templateId', '')
				})
		},
		cityDataChange() {
			// city数据格式处理成2级结构
			rawCitiesData.forEach(el => {
				console.log(el)
				el.children.forEach(el_child => {
					delete el_child['children']
				})
			})
		},
		create() {
			this.editState = 1
			// console.log("create:::", this.item);
			// this.$http.post(URL_JSON['queryApplyCaseNum'],this.item).then(res=>{
			//   console.log('申请立案：',res.result);
			// });
		},
	},

	mounted() {
		this.doQuery(this.queryUrl, this.searchItem)
		this.companyfinance('')
		this.cityDataChange()
	},
	components: {
		Searchs,
		TableComponent,
		applyCaseDialog,
	},
}
</script>

<style scoped lang="scss">
</style>
