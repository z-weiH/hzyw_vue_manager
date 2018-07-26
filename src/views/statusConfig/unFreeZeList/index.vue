<template>
<div class="content">
        <div class='wsbodyhead'>
         <a>所在位置</a>
         <router-link :to='$options.name' class='aside_tit'>调解状态设置</router-link>
        </div>
        <searchs @valueChange="searchItemChange" class='item-search' :search-items='searchItems' :item='searchItem' :query-url='queryUrl'>
          <template slot='moreBtn'>
            <el-button :disabled="checkBoxesLen" class="ml-20" type='primary' @click='CasefreeZe'>冻结</el-button>
            <el-button  class="ml-20" type='success' @click='rebackPrevPage'>返回</el-button>
          </template>
        </searchs>
        <div class='item-title'>
          未冻结案件列表
        </div>
        <div class='item-table'>
           <table-component  :needCheckbox="true" @slectionChange="slectionChange" :pager="pager"  @refreshList="doQuery(this.queryUrl, this.item)" :currentPage.sync="pager.currentPage" :total="pager.total" :pageSize="pager.pageSize" :table-data="tableData"  :column-define="columnDefine" >
              <el-table-column label="操作" slot="defineCol" width="126">
                 <template slot-scope="scope">
                     <el-button size="mini" @click="CasefreeZe(1,scope.row)">冻结案件</el-button>
                 </template>
              </el-table-column>
           </table-component>
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
			selection: [],
			item: {},
			queryUrl: URL_JSON['queryUnFreeZeCaseToDo'],
			caseIdsGroup: null, //待冻结数据id数组
			tableData: [],
			searchItem: {},
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
					labelfield: 'merchantName',
					valuefield: 'code',
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
					label: '预测裁决金额',
					property: 'forecastJudgeAmt',
					width: 150,
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
		}
	},
	methods: {
		doQuery(url, item) {
			this.query(url, item).then(res => {
				this.tableData = res.result.list
				this.total = res.result.count
			})
		},
		rebackPrevPage() {
			// 返回到-冻结案件列表
			self.history.go(-1)
		},
		searchItemChange(item) {
			console.log('searchI:::', item)
			for (var i in item) {
				switch (item[i]) {
					case 'merchantCode':
						console.log(item['value'])
						this.optsPduListView({ merchantCode: item['value'] })
						break
					case 'caseProcess':
						console.warn(item['value'])
						console.log('item>>>>>>>>>>>>>>', this.item)
						item['value'] === ''
							? (this.item[this.searchItems[8].property] = '')
							: this.optsHkCaseStatusView({ status: item['value'] })
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
		slectionChange(that) {
			console.log('ss++', that)
			this.selection = that //缓存当前选中行数据
			this.caseIdsGroup = new Array()
			that.forEach(el => {
				this.caseIdsGroup.push(el.caseId)
			})
			console.log('caseIdsGroup==== ', this.caseIdsGroup)
		},
		arrTransMap(arr) {
			// 数组去重方法
			let arrSet = new Set(arr)
			return [...arrSet]
		},
		CasefreeZe(type, row) {
			/** 批量\单一-冻结dialog-view
			 * @param type
			 * 1 代表单条数据冻结模版逻辑
			 */
			const h = this.$createElement
			// 该变量用来捕获只勾选一行数据，
			// 又去触发批量-冻结按钮，
			// 这时候提示的模版是和当行数据模版一样的
			let multi_btnType = this.selection.length === 1
			if (type === 1 || multi_btnType) {
				this.$msgbox({
					title: '提示',
					message: h('div', null, [
						h('p', null, [
							h('span', null, '待冻结'),
							h(
								'span',
								{
									style: {
										color: '#EEA823',
									},
								},
								`( ${multi_btnType ? this.selection[0].applicants : row.applicants} )`
							),
							h('span', null, '与'),
							h(
								'span',
								{
									style: {
										color: '#EEA823',
									},
								},
								`( ${multi_btnType ? this.selection[0].respondents : row.respondents} )`
							),
							h('span', null, '借款合同纠纷一案'),
							h(
								'span',
								{
									style: {
										color: '#EEA823',
									},
								},
								`( ${multi_btnType ? (this.selection[0].arbCaseId ? this.selection[0].arbCaseId : '暂无案号' ) : ( row.arbCaseId ? row.arbCaseId : '暂无案号')} )`
							),
						]),
						h('p', null, '确认提交?'),
					]),
					center: true,
					showCancelButton: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(res => {
					this.FreedataFoo(0, row)
				})
			} else {
				this.$msgbox({
					title: '提示',
					message: h('div', null, [
						h('p', null, [
							h('span', null, '待冻结'),
							h('span', { style: { color: '#EEA823' } }, this.selection.length),
							h('span', null, '个案件'),
						]),
						h('p', null, '确认提交?'),
					]),
					center: true,
					showCancelButton: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				}).then(res => {
					this.FreedataFoo(1, row)
				})
			}
		},
		FreedataFoo(type, row) {
      // console.log('冻结请求方法-当前数据 ',row);
      // console.log( row ? row.caseId : this.caseIdsGroup[0]);
			/**
			 * @param type
			 * 0:代表单条数据请求
			 * 1:代表多条数据请求
			 */
			// 批量&单一：冻结案件方法
			this.$http
				.post(URL_JSON['saveunFreezeCaseIdsList'], {
					caseIds: type === 0 ? (row ? row.caseId : this.caseIdsGroup[0]) : this.caseIdsGroup.join(),
					mediateStatus: 1,
				})
				.then(msg => {
					if (msg.code === '0000') {
						console.log('*** ', msg.data)
						this.$message.success('冻结处理成功!')
						this.doQuery(this.queryUrl, this.searchItem)
					} else {
						console.log('*** ERROR')
					}
				})
		},
	},
	computed: {
		checkBoxesLen() {
			return this.selection.length === 0
		},
	},
	created() {
		this.optsCompanyListView() //互金企业
		this.optsPduListView() //产品名称
		this.optsHkCaseStageView() //还款案件阶段
		this.optsHkCaseStatusView() //还款案件状态
	},
	mounted() {
		// this.doQuery(this.queryUrl, this.searchItem)
	},
	components: {
		Searchs,
		TableComponent,
	},
}
</script>
<style scoped lang="scss">
</style>
