<template>
  <div class="content">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link :to="$options.name" class="aside_tit">案件上传记录</router-link>
    </div>
    <searchs
      @valueChange="searchItemChange"
      class="item-search"
      :search-items="searchItems"
      :item="searchItem"
      :query-url="queryUrl"
    >
      <template slot="moreBtn">
        <el-button class="ml-20" type="primary" @click="gotoCaseUploadView">案件上传</el-button>
      </template>
    </searchs>
    <div class="item-title">案件上传记录</div>
    <div class="item-table">
      <table-component
        :pager="pager"
        @refreshList="doQuery(this.queryUrl, this.searchItem)"
        :table-data="tableData"
        :column-define="columnDefine"
        :actions="actions"
      ></table-component>
    </div>
  </div>
</template>


<script type='text/ecmascript-6'>
import { URL_JSON } from "../../../components/script/url_json";
import exportFile from "@/assets/js/exportFile";
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
export default {
  name: "caseUploadRecord",
  mixins: [Mixins],
  data() {
    return {
      queryUrl:'/12/caseupload/queryCaseUploadRecord.htm',
      opCompany: [],
			opProduct: [],
      searchItem: {},
      item: {},
      pager: {
        // 数据总数
        total: 11,
        // 当前页数
        currentPage: 1,
        // 每页数量
        pageSize: 10
      },
      tableData: [{}],
      searchItems: [
        {
          label: "操作人",
          type: "text",
          placeholder: "操作人姓名",
          colSpan: 6,
          property: "operName"
        },
        {
          label: "操作日期",
          type: "date",
          placeholder: "开始日期",
          colSpan: 4,
          property: "startDate"
        },
        {
          type: "date",
          placeholder: "结束日期",
          colSpan: 4,
          property: "endDate"
        },
        {
          type: "select",
          label:"状态",
          colSpan: 4,
          property:"recordStatus",
          options: [
            {
              label: '上传中',
              value: 0,
            },
            {
              label: '上传失败',
              value: 1,
            },
            {
              label: '上传成功',
              value: 2,
            },
            {
              label: '处理失败',
              value: 3,
            },
            {
              label: '处理成功',
              value: 4,
            },
          ]

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
      ],
      columnDefine: [
        {
          label: "客户名称",
          property: "clientName",
          width: 150
        },
        {
          label: "失败原因",
          property: "failedReason",
          width: 100
        },
        {
          label: "操作人",
          property: "operName",
          width: 100
        },
        {
          label: "操作时间",
          property: "operTime",
        },
        {
          label: "产品名称",
          property: "productName",
          width: 150
        },
        {
          label: "状态",
          property: "recordStatus",
          width: 100
        },
        {
          label: "模版号",
          property: "templateId",
        },
      ],
      actions:[
        {
          label: '操作',
          btns: [
            {label: '通知', function: this.doInform}
          ]
        }
      ]
    };
  },
  methods: {
    searchItemChange(item) {
			console.log('parent valuechange init')
			for (var i in item) {
				switch (item[i]) {
					case 'merchantCode':
						console.log(item['value'])
						if (item['value'] === '') {
							this.$set(this.searchItem, 'prodName', '')
							this.$set(this.searchItem, 'templateCode', '')
							this.searchItems[6].options = []
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
							this.searchItems[7].options = []
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
					default:
						break
				}
			}
		},
    optsCompanyListView() {
			this.$http.post(URL_JSON['selectCompany']).then(res => {
				console.log('selectCompany:::', res)

				this.searchItems[5].options = res.result
				// console.log('list:',res.result);
			})
		},
		optsPduListView(params) {
			this.searchItems[6].options = []
			this.$http.post(URL_JSON['selectProduct'], params).then(res => {
				// console.log('selectProduct:::',res);
				this.searchItems[6].options = res.result
				this.opProduct = res.result
				this.$set(this.searchItem, 'prodName', '')
			})
		},
		optsTemplateCode(params) {
			this.$http.post(URL_JSON['selectTemplateItem'], params).then(res => {
				this.searchItems[7].options = []
				res.result.forEach(el => {
					this.searchItems[7].options.push({ label: el, value: el })
				})
			})
		},
    gotoCaseUploadView(){
      this.$router.push('caseUploadView')
    },
    doInform(){
      // 通知方法
    },
    doQuery(url, item) {
      this.query_mock(url, item).then(res => {
          console.info('1111',);
        //  this.tableData = res.result.list;
        //   this.total = res.result.count;
      });
    }
  },
  created() {
    this.optsCompanyListView() //互金企业
  },
  mounted() {
    this.doQuery(this.queryUrl, this.searchItem);
  },
  components: {
    Searchs,
    TableComponent
  }
};
</script>


<style lang='scss' scoped>
</style>
