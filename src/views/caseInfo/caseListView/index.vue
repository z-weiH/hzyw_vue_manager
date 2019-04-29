<template>
  <div class="content">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link :to="$options.name" class="aside_tit">案件列表</router-link>
    </div>
    <searchs @valueChange="searchItemChange" class="item-search" :search-items="searchItems" :item="searchItem" :query-url="queryUrl">
      <template slot="moreBtn">
            <el-button class="ml-20" type="primary" @click="handleExport">导出Excel</el-button>
</template>
    </searchs>
    <div class="item-title">
      <div>案件列表</div>
      <div class="stat_item">
        <div>
          <span>统计信息&gt;&nbsp;&nbsp;</span>
        </div>
        <div>
          <ul>
            <li><span>总标的金额:</span><span>{{countItem.sumAmtBorrow}}元&nbsp;;</span></li>
            <li><span>总数量:</span><span>{{countItem.caseCount}}笔&nbsp;;</span></li>
            <li><span>总受理费:</span><span>{{countItem.sumPrepaymentAmt}}元&nbsp;;</span></li>
            <li><span>总受理费退费:</span><span>{{countItem.sumAcceptReturnAmt}}元&nbsp;;</span></li>
            <li><span>总使用仲券:</span><span>{{countItem.sumCaseTicket}}张&nbsp;;</span></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="item-table">
      <table-component :pager="pager" @refreshList="doQuery(this.queryUrl, this.searchItem)" :table-data="tableData" :column-define="columnDefine" ></table-component>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { URL_JSON } from '../../../components/script/url_json'
import exportFile from '@/assets/js/exportFile'
import Searchs from '@/components/searchs'
import TableComponent from '@/components/table'
import Mixins from '@/components/script/_mixin'
import { distinctArrObj } from '@/assets/js/tool'
export default {
	name: 'caseListView',
	mixins: [Mixins],
	data() {
		return {
			misShow : (() => {
				try{
					let userName = JSON.parse(localStorage.getItem('loginInfo')).userName;
					let arr = ['费玉琳','金凤','蒋慧芳','超级管理员'];
					if(arr.indexOf(userName) !== -1) {
						return true;
					}else {
						return false;
					}
				}catch(err) {
					return false;
				}
			})(),
			searchItems: [
				{
					label: '案件查询',
					type: 'text',
					placeholder: '借款单号、仲裁案号、申请人、被申请人、被申请人手机',
					colSpan: 9,
					property: 'keyWords',
				},
				{
					type: 'select',
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
				},
				{
					type: 'date',
					colSpan: 4,
					placeholder: '开始日期',
					property: 'startDate',
				},
				{
					type: 'date',
					colSpan: 4,
					placeholder: '结束日期',
					property: 'endDate',
				},
				{
					label: '互金企业',
					type: 'select',
					property: 'merchantCode',
					colSpan: 4,
					newline: 1,
					options: this.opCompany,
					labelfield: 'merchantName',
					valuefield: 'code',
					filterable: true,
				},
				{
					label: '产品名称',
					type: 'select',
					property: 'prodName',
					colSpan: 4,
					options: this.opProduct,
					labelfield: 'prodName',
					valuefield: 'prodName',
					filterable: true,
				},
				{
					label: '模版编码',
					type: 'select',
					property: 'templateCode',
					colSpan: 4,
					options: [],
				},
				{
					label: '审理状态',
					type: 'select',
					property: 'hearStatus',
					colSpan: 4,
					newline: 1,
					options: [
						{
							label: '审理中',
							value: '0',
						},
						{
							label: '已结案',
							value: '1',
						},
					],
				},
				{
					label: '案件阶段',
					type: 'select',
					property: 'caseProcess',
					colSpan: 4,
					options: this.opHkCaseStage,
					labelfield: 'desc',
					valuefield: 'status',
				},
				{
					label: '案件状态',
					type: 'select',
					property: 'statusThree',
					colSpan: 4,
					options: this.opHkCaseStatus,
					labelfield: 'desc',
					valuefield: 'status',
				},
				{
					label: '应裁情况',
					type: 'select',
					property: 'decideStatus',
					colSpan: 4,
					newline: 1,
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
					label: '还款情况',
					type: 'select',
					property: 'repaymentStatus',
					colSpan: 4,
					options: [
						{
							label: '有还款',
							value: '1',
						},
						{
							label: '无还款',
							value: '2',
						},
						{
							label: '有仲裁后还款',
							value: '3',
						},
						{
							label: '无仲裁后还款',
							value: '4',
						},
					],
				},
				{
					label: '逾期天数',
					type: 'select',
					property: 'overdueDate',
					colSpan: 4,
					options: [
						{
							label: '0-30天',
							value: 'M1',
						},
						{
							label: '31-60天',
							value: 'M2',
						},
						{
							label: '61-90天',
							value: 'M3',
						},
						{
							label: '91-120天',
							value: 'M4',
						},
						{
							label: '121-150天',
							value: 'M5',
						},
						{
							label: '151-180天',
							value: 'M6',
						},
						{
							label: '180天以上',
							value: 'M7',
						},
					],
				},
			],
			cacheMerchantCode: '', //缓存的企业code
			searchItem: {
				caseProcess : ''
			},
      countItem:{
        sumAmtBorrow: 0,
        caseCount:0,
        sumPrepaymentAmt:0,
        sumAcceptReturnAmt:0,
        sumCaseTicket:0,
      },//统计数量
			item: {},
			currentItem: {},
			exportUrl: /* "http://192.168.30.18:7777" + */ URL_JSON['exportCaseListView'],
			queryUrl: URL_JSON['queryCaseListView'], ///11/case/queryHzCaseInfoByBaseQuery.htm
			// 数据总数
			total: 11,
			// 当前页数
			currentPage: 1,
			// 每页数量
			pageSize: 10,
			tableData: [],
			opCompany: [],
			opProduct: [],
			opHkCaseStage: [],
			opHkCaseStatus: [],
			columnDefine: [
				{
					label: '借款单号',
					property: 'loanBillNo',
					width: 220,
				},
				{
					label: '仲裁案号',
					property: 'arbCaseId',
					width: 200,
				},
				{
					label: '互金企业',
					property: 'platName',
					width: 100,
				},
				{
					label: '申请人',
					property: 'applicants',
					width: 100,
					isLink: true,
					linkShowPanel: (item) => {
						item.caseNoticeUrl && window.open(item.caseNoticeUrl,'_blank');
					},
				},
				{
					label: '被申请人',
					property: 'respondents',
					width: 100,
					isLink: true,
					linkShowPanel: this.gotoPretrial,
				},
				{
					label: '被申请人手机',
					property: 'resPhone',
					width: 150,
				},
				{
					label: '号码检测结果',
					property: 'phoneStatusResult',
					width: 130,
				},
				{
					label: '模版编码',
					property: 'templateCode',
					width: 130,
				},
				{
					label: '案件阶段',
					property: 'caseProcessDesc',
					width: 100,
				},
				{
					label: '案件状态',
					property: 'caseStatusDesc',
					width: 100,
				},
				{
					label: '提交日期',
					property: 'submitTime',
					width: 150,
					children: [
						{
							label: '逾期天数',
							property: 'overdueDate',
							width: 100,
						},
						{
							label: '处理天数',
							property: 'dealDate',
							width: 100,
						},
						{
							label: '立案日期',
							property: 'startTime',
							width: 100,
						},
						{
							label: '组庭日期',
							property: 'buildTime',
							width: 100,
						},
						{
							label: '结案日期',
							property: 'closeTime',
							width: 100,
						},
						{
							label: '应裁日期',
							property: 'takeTime',
							width: 100,
						},
						{
							label: '借款日期',
							property: 'borrowingDate',
							width: 100,
						},
						{
							label: '应还款日期',
							property: 'reimbursementDate',
							width: 150,
						},
						{
							label: '冻结日期',
							property: 'freezeDate',
							width: 100,
						},
						{
							label: '解冻日期',
							property: 'unfreezeDate',
							width: 100,
						},
					],
				},

				{
					label: '仲裁标的',
					property: 'amtBorrow',
					width: 150,
					children: [
            {
              label: '净标的',
              property: 'amtCase',
              width: 150,
            },
						{
							label: '调解还款额',
							property: 'adjustAmt',
							width: 110,
						},
						{
							label: '已还款总额',
							property: 'reimbursementAmt',
							width: 110,
						},
						{
							label: '合同借款金额',
							property: 'contractLoanAmt',
							width: 110,
						},
						{
							label: '打款金额',
							property: 'payAmt',
							width: 110,
						},
						{
							label: '平台服务费',
							property: 'platformFee',
							width: 110,
						},
						{
							label: '利息',
							property: 'interestAmt',
							width: 110,
						},
						{
							label: '违约金',
							property: 'penaltyAmt',
							width: 110,
						},
						{
							label: '服务费(元)',
							property: 'caseTicketFee',
							width: 110,
            },
            {
							label: '仲券(张)',
							property: 'caseTicket',
							width: 100,
						},
						{
							label: '预缴受理费',
							property: 'prepaymentAmt',
							width: 110,
						},
						{
							label: '受理费退费',
							property: 'acceptReturnAmt',
							width: 110,
						},
						{
							label: '处理费',
							property: 'handFee',
							width: 100,
						}
					],
				},
				{
					label: '预测裁决额',
					property: 'forecastJudgeAmt',
					width: 130,
				},
				{
					label: '仲裁还款',
					property: 'arbitrationRepayment',
					width: 100,
				},
				{
					label: '应裁情况',
					property: 'decideStatus',
					width: 100,
				},
				{
					label: '短信送达',
					property: 'messageDelivery',
					width: 100,
				},
				{
					label: '短链查看',
					property: 'shortChainView',
					width: 100,
				},
			],
		}
	},
	methods: {
		//跳转法务预审
		gotoPretrial(row) {
			let routeData = this.$router.resolve({
				path: '/caseDetail',
				query: { caseId: row.caseId },
			})
			window.open(routeData.href, '_blank')
		},

		handleExport() {
			console.info('searchItem:::', this.searchItem)
			let _token = JSON.parse(localStorage.getItem('loginInfo')).token
			this.searchItem.token = _token
			exportFile({
				url: this.exportUrl,
				data: this.searchItem,
			})
		},
		searchItemChange(item) {
			console.log('parent valuechange init')
			for (var i in item) {
				switch (item[i]) {
					case 'merchantCode':
						console.log(item['value'])
						if (item['value'] === '') {
							this.$set(this.searchItem, 'prodName', '')
							this.$set(this.searchItem, 'templateCode', '')
							this.searchItems[5].options = []
						} else {
							// 缓存当前的->cache:cacheMerchantCode,方便别的方法调用
							this.cacheMerchantCode = item['value']
							this.optsPduListView({ merchantCode: item['value'] })
						}
						break
					case 'prodName':
						console.log('prodName: ', item['value'])
						console.log('opProduct-', this.opProduct)

						if (item['value'] === '') {
							this.$set(this.searchItem, 'templateCode', '')
							this.searchItems[6].options = []
						} else {
							let $opPro = distinctArrObj(
								this.opProduct.filter(it => {
									return it.prodName == item['value']
								})
							)
							console.log('$opPro--', $opPro[0]['prodCode'])
							this.optsTemplateCode({
								merchantCode: this.cacheMerchantCode,
								prodCode: $opPro[0]['prodCode'],
							})
						}
						break
					case 'caseProcess':
						this.optsHkCaseStatusView({ status: item['value'] })
						break
					case 'operType':
						this.optsObjListView({ operType: item['value'] })
						break
					default:
						break
				}
			}
		},
		doQuery(url, item) {
			this.query(url, item).then(res => {
				console.info(res)
				//  this.tableData = res.result.list;
				//   this.total = res.result.count;
				this.tableData = res.result.list.map((v) => {
          (v.phoneStatusResult = v.phoneStatusResult || '未检测') &&
          (v.settleType == 1 ? v.caseTicketFee = '/':v.caseTicket = '/');
					return v;
				});
        this.queryCount(item)
			})
		},
    queryCount(item){
      // 案件列表-统计查询api
      this.$http.post(URL_JSON['queryCaseListCountItem'],item).then(res=>{
        console.log('统计查询api',res)
        if(res.code === '0000'){
          this.countItem = res.result
        }
      })
    },
		optsCompanyListView() {
			this.$http.post(URL_JSON['selectCompany']).then(res => {
				console.log('selectCompany:::', res)

				this.searchItems[4].options = res.result
				// console.log('list:',res.result);
			})
		},
		optsPduListView(params) {
			this.searchItems[5].options = []
			this.$http.post(URL_JSON['selectProduct'], params).then(res => {
				// console.log('selectProduct:::',res);
				this.searchItems[5].options = res.result
				this.opProduct = res.result
				this.$set(this.searchItem, 'prodName', '')
			})
		},
		optsTemplateCode(params) {
			this.$http.post(URL_JSON['selectTemplateItem'], params).then(res => {
				this.searchItems[6].options = []
				res.result.forEach(el => {
					this.searchItems[6].options.push({ label: el, value: el })
				})
			})
		},
		optsHkCaseStageView() {
			this.$http.post(URL_JSON['selectHkCaseStage']).then(res => {
				// console.log('selectHkCaseStage:::',res);

				this.searchItems[8].options = res.result.list
			})
		},
		optsHkCaseStatusView(params) {
			this.$http.post(URL_JSON['selectHkCaseStatus'], params).then(res => {
				console.warn('\n', res.result.list)

				this.searchItems[9].options = res.result.list
				setTimeout(() => {
					// this.searchItem.statusThree = '';
					this.$set(this.searchItem, 'statusThree', '')
					console.log(this.searchItem)
				}, 300)
			})
		},
	},
	created() {
		if(this.$route.query.caseProcess) {
			this.searchItem.caseProcess = +this.$route.query.caseProcess;
			// 清除url参数
			this.$router.replace({
				query : {},
			});
		}
		this.optsCompanyListView() //互金企业
		// this.optsPduListView() //产品名称
		this.optsHkCaseStageView() //还款案件阶段
		this.optsHkCaseStatusView() //还款案件状态
	},
	mounted() {
		this.doQuery(this.queryUrl, this.searchItem);
	},
	components: {
		Searchs,
		TableComponent,
	},
}
</script>

<style lang="scss" scoped>
@import '@/assets/style/scss/helper/_mixin.scss';
.item-title{
  // position: relative;
  @include clearfix;
  >div{
    &:first-child{
      float: left;
    }
    &+div{
      float:right;
    }
  }
}

.stat_item{
  font-size:14px;
  // position: absolute;
  // height: 12px;
  // margin:auto;
  // bottom: 0;
  // top: 0;
  // right: 20px;
  >div{
    display: table-cell;
  }
  ul{
    @include clearfix;
    li{
      float: left;
      span{
        margin-right: 5px;
        &+span{
          color:#555555;
          font-weight: bold;
        }
      }
    }
  }
}
</style>
