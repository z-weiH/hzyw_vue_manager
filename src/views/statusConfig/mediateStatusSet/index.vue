<template>
  <div class="content">
    <div class='wsbodyhead'>
      <a>所在位置</a>
      <router-link :to='$options.name' class='aside_tit'>调解状态设置</router-link>
    </div>
    <searchs @valueChange="searchItemChange" class='item-search' :search-items='searchItems' :item='searchItem' :query-url='queryUrl'>
       <template slot='moreBtn'>
          <el-button class="ml-20" type='primary' @click='gotoUnFreeZeView'>冻结案件</el-button>
          <el-button :disabled="checkBoxesLen" class="ml-20" type='info' @click='multiUnfreeZe'>解冻</el-button>
          </template>
    </searchs>
        <div class='item-title'>
          调解状态设置列表
        </div>
        <div class='item-table'>
           <table-component :selectable="selectable" :needCheckbox="true" @slectionChange="slectionChange" :pager="pager"  @refreshList="doQuery(this.queryUrl, this.item)"  :table-data="tableData" :column-define="columnDefine">
              <el-table-column label="操作" slot="defineCol" width="126">
                 <template slot-scope="scope">
                     <el-button v-if="scope.row.status !== 2" size="mini" @click="multiUnfreeZe(1,scope.row)">解冻</el-button>
										<span v-else>--</span>
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
			queryUrl: URL_JSON['queryFreezeCaseList'],
			caseIdsGroup: null, //待解冻数据id数组
			tableData: [],
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
					newline: 1,
					label: '互金企业',
					type: 'select',
					colSpan: 4,
					property: 'merchantCode',
					options: [],
					labelfield: 'merchantName',
          valuefield: 'code',
          remoteMethod: this.optsCompanyListView,
          filterable: true,
          reserveKey: true,
          remote: true
				},
				{
					label: '产品名称',
					type: 'select',
					colSpan: 4,
					property: 'prodCode',
					options: [],
					labelfield: 'prodName',
          valuefield: 'prodCode',
          remoteMethod: this.optsPduListView
				},
				{
					label: '逾期天数',
					type: 'select',
					colSpan: 4,
					property: 'overdueDate',
					options: [
						{
							label: '0-30天 M1',
							value: 'M1',
						},
						{
							label: '31-60天 M2',
							value: 'M2',
						},
						{
							label: '61-90天 M3',
							value: 'M3',
						},
						{
							label: '91-120天 M4',
							value: 'M4',
						},
						{
							label: '121-150天 M5',
							value: 'M5',
						},
						{
							label: '151-180天 M6',
							value: 'M6',
						},
						{
							label: '180天以上 M7',
							value: 'M7',
						},
					],
				},
				{
					newline: 1,
					label: '案件阶段',
					type: 'select',
					colSpan: 4,
					property: 'caseProcess',
					options: [],
					labelfield: 'desc',
					valuefield: 'status',
				},
				{
					label: '案件状态',
					type: 'select',
					colSpan: 4,
					property: 'statusThree',
					options: [],
					labelfield: 'desc',
					valuefield: 'status',
				},
				{
					label: '应裁情况',
					type: 'select',
					colSpan: 4,
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
					colSpan: 4,
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
					colSpan: 4,
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
				{
					label: '冻结状态',
					type: 'select',
					colSpan: 4,
					property: 'status',
					options: [
						{
							label: '冻结',
							value: 1,
						},
						{
							label: '解冻',
							value: 2,
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
					property: 'freezeTime',
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
				{
					label: '冻结状态',
					property: 'statusDesc',
				},
				{
					label: '操作人',
					property: 'userName',
				},
				{
					label: '操作原因',
					property: 'reason',
				},
			],
		}
	},
	methods: {
		selectable(row, index) {
			return row.status !== 2;
		},
		doQuery(url, item) {
			this.query(url, item).then(res => {
				this.tableData = res.result.list
				this.total = res.result.count
			})
		},
		searchItemChange(item) {
			console.log('searchI:::', item)
			for (var i in item) {
				switch (item[i]) {
					case 'merchantCode':
            console.log("value---", item["value"]);
            !item["value"] && (this.searchItem.prodCode = "");
						this.optsPduListView(item['value'])
						break
					case 'caseProcess':
						console.warn(item['value'])
						console.log('item>>>>>>>>>>>>>>', this.item)
						item['value'] === ''
							? (this.item[this.searchItems[8].property] = '')
							: this.optsHkCaseStatusView({
									status: item['value'],
							  })
						break
					default:
						break
				}
			}
		},
		optsCompanyListView(into) {
			this.$http.post(URL_JSON['queryHJCompany'],{
        keyWords: into
      }).then(res => {
				this.searchItems[4].options = res.result
			})
		},
		optsPduListView(into) {
			this.$http.post(URL_JSON['selectProduct'], {
        merchantCode: into
      }).then(res => {
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
			this.selection = that //缓存当前选中行数据(单/多)
			console.log('that-len---> ', this.selection.length)
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
		multiUnfreeZe(type, row) {
			/** 批量解冻dialog-view
			 * @param type
			 * 1 代表单条数据解冻模版逻辑
			 */
			// 该变量用来捕获只勾选一行数据，
			// 又去触发批量-解冻按钮，
			// 这时候提示的模版是和当行数据模版一样的
			let multi_btnType = this.selection.length === 1
			console.log(multi_btnType)
			console.log('mmmmmmmmmmmm-', this.selection)
			document.querySelector('.jd-textarea') && ( document.querySelector('.jd-textarea').value = '' );
			if (type === 1 || multi_btnType) {
				this.$msgbox({
					title : '案件解冻',
					message : <div class="jd-msgbox">
						即将解冻<span class="jdcolor-yellow">{multi_btnType ? this.selection[0].applicants : row.applicants}</span>与<span class="jdcolor-yellow">{multi_btnType ? this.selection[0].respondents : row.respondents}</span>借款合同纠纷一案，案号<span class="jdcolor-yellow">{multi_btnType? this.selection[0].arbCaseId ? this.selection[0].arbCaseId : '暂无案号': row.arbCaseId ? row.arbCaseId : '暂无案号'}</span>。请填写解冻原因。
						<div class="el-textarea mt-10">
							<textarea placeholder="请输入解冻原因" rows="4" class="el-textarea__inner jd-textarea" maxlength="100"></textarea>
						</div>
					</div>,
					center: true,
					showCancelButton: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				})
					.then(res => {
						this.unFreedataFoo(0, row)
					})
					.catch(() => {})
			} else {
				this.$msgbox({
					title: '案件解冻',
					message : <div class="jd-msgbox">
						即将解冻<span class="jdcolor-yellow">{this.selection.length}</span>个案件。请填写解冻原因。
						<div class="el-textarea mt-10">
							<textarea placeholder="请输入解冻原因" rows="4" class="el-textarea__inner jd-textarea" maxlength="100"></textarea>
						</div>
					</div>,
					center: true,
					showCancelButton: true,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
				})
					.then(res => {
						console.log('批量--')
						this.unFreedataFoo(1, row)
					})
					.catch(() => {})
			}
		},
		unFreedataFoo(type, row) {
			// console.log('解冻请求方法-当前数据 ',row);
			/**
			 * @param type
			 * 0:代表单条数据请求
			 * 1:代表多条数据请求
			 */
			// 批量&单一：解冻案件方法
			// console.log('this.caseIdsGroup ', this.caseIdsGroup.join().split(','))
			this.$http
				.post(URL_JSON['saveunFreezeCaseIdsList'], {
					caseIds: type === 0 ? (row ? row.caseId : this.caseIdsGroup[0]) : this.caseIdsGroup.join(),
					mediateStatus: 0,
					reason : document.querySelector('.jd-textarea').value,
				})
				.then(msg => {
					if (msg.code === '0000') {
						console.log('*** ', msg.data)
						this.$message.success('解冻处理成功!')
						this.doQuery(this.queryUrl, this.searchItem)
					} else {
						console.log('*** ERROR')
					}
				})
		},
		gotoUnFreeZeView() {
			// 跳转到-未冻结案件-视图
			this.$router.push('/main/unFreeZeList')
		},
	},
	computed: {
		checkBoxesLen() {
			return this.selection.length === 0
		},
	},
	created() {
		this.optsCompanyListView('') //互金企业
		// this.optsPduListView() //产品名称
		this.optsHkCaseStageView() //还款案件阶段
		this.optsHkCaseStatusView() //还款案件状态
	},
	mounted() {
		this.doQuery(this.queryUrl, this.searchItem)
	},
	components: {
		Searchs,
		TableComponent,
	},
}
</script>

<style lang="scss">

.jd-msgbox{
	line-height: 2;
	.jdcolor-yellow{
		color: #EEA823;
	}
}

</style>
