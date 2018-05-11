<template>
  <div class="content">
    <div class="wsbodyhead" id="bodyhead">
      <a>所在位置</a><a class="aside_tit" href="javascript:;">案件列表</a>
    </div>
    <searchs class="item-search" :search-items="searchItems" :item="item" :query-url="1">

      <template slot="moreBtn">
        <div class="clear"></div>
          <el-button class="ml-20" type="primary" @click="">导出Excel</el-button>
      </template>
    </searchs>

  </div>
</template>

<script type="text/ecmascript-6">
  import Searchs from "@/components/searchs";
  import TableComponent from "@/components/table";
  import Mixins from "@/components/script/_mixin";
  export default {
    name: "orderAddNewDefault",
    extends: Mixins,
    data() {
      return {
        searchItems: [{
            label: "案件查询",
            type: "text",
            placeholder: "案号、申请人、被申请人、手机号",
            colSpan: 4,
            property: ""
          },
          {
            type: "select",
            colSpan: 4,
            property: '',
            options: [{
                label: "提交日期",
                value: "tjrq"
              },
              {
                label: "立案日期",
                value: "larq"
              },
              {
                label: "组庭日期",
                value: "ztrq"
              },
              {
                label: "结案日期",
                value: "jarq"
              },
              {
                label: "应裁日期",
                value: "ycrq"
              }
            ]
          },
          {
            type: 'date',
            colSpan: 4,
            placeholder:'开始日期',
            property:'startTime'
          },
          {
            type: 'date',
            colSpan: 4,
            placeholder:'结束日期',
            property:'endTime'
          },
          {
            label: '互金企业',
            type: 'select',
            property: '',
            colSpan: 4,
            newline:1,
            options:[
              {
                label: '企业一',
                value: '001'
              },
              {
                label: '企业二',
                value: '002'
              },
              {
                label: '企业三',
                value: '003'
              },
              {
                label: '企业四',
                value: '004'
              }
            ]
          },
          {
            label: '产品名称',
            type: 'select',
            property: '',
            colSpan: 4,
            options:[
              {
                label: '产品一',
                value: '001'
              },
              {
                label: '产品二',
                value: '002'
              },
              {
                label: '产品三',
                value: '003'
              },
            ]
          },
          {
            label: '逾期天数',
            type: 'select',
            property: '',
            colSpan: 4,
            options:[
              {
                label: '产品一',
                value: '001'
              },
              {
                label: '产品二',
                value: '002'
              },
              {
                label: '产品三',
                value: '003'
              },
            ]
          },
          {
            label: '审理状态',
            type: 'select',
            property: '',
            colSpan: 4,
            newline: 1,
            options:[
              {
                label: '产品一',
                value: '001'
              },
              {
                label: '产品二',
                value: '002'
              },
              {
                label: '产品三',
                value: '003'
              },
            ]
          },
          {
            label: '案件阶段',
            type: 'select',
            property: '',
            colSpan: 4,
            options:[
              {
                label: '产品一',
                value: '001'
              },
              {
                label: '产品二',
                value: '002'
              },
              {
                label: '产品三',
                value: '003'
              },
            ]
          },
          {
            label: '案件状态',
            type: 'select',
            property: '',
            colSpan: 4,
            options:[
              {
                label: '产品一',
                value: '001'
              },
              {
                label: '产品二',
                value: '002'
              },
              {
                label: '产品三',
                value: '003'
              },
            ]
          },
          {
            label: '应裁情况',
            type: 'select',
            property: '',
            colSpan: 4,
            newline: 1,
            options:[
              {
                label: '产品一',
                value: '001'
              },
              {
                label: '产品二',
                value: '002'
              },
              {
                label: '产品三',
                value: '003'
              },
            ]
          },
          {
            label: '还款情况',
            type: 'select',
            property: '',
            colSpan: 4,
            options:[
              {
                label: '产品一',
                value: '001'
              },
              {
                label: '产品二',
                value: '002'
              },
              {
                label: '产品三',
                value: '003'
              },
            ]
          }
        ],
        item: {}
      };
    },
    components: {
      Searchs,
      TableComponent
    }
  };
</script>

<style scoped lang="scss">

</style>
