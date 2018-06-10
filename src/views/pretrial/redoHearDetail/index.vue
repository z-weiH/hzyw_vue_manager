<template>
  <div class="content">
    <div class='wsbodyhead'>
      <a>所在位置</a>
      <router-link to='/main/redoHearList'>案件复审</router-link>
      <router-link to='/main/redoHearDetail' class='aside_tit'>杭州钱米网络科技有限公司</router-link>
    </div>
    <div class="item-title clear of-hidden">
      <span class="tit">
            <i class="fg_ico">|</i>批次信息
          </span>
      <el-button class="fr" @click="changeFpeopleType = true">变更初审人</el-button>

    </div>
    <div>
      <el-row class="message">
        <el-col :span="12">
          <span class="label">互金企业</span>
          <span>{{item.merchantName}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">模板</span>
          <span>{{item.productName}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">账龄</span>
          <span>{{item.accountAge}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">推送日期</span>
          <span>{{item.pushDate}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">案件数量</span>
          <span>{{item.caseNum}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">子批次数</span>
          <span>{{item.batchNum}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">初审人</span>
          <span>{{item.firstAuditName}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">批次状态</span>
          <span>{{getLabel(item.merchantName)}}</span>
        </el-col>
      </el-row>
    </div>
    <div class="item-title">
      <i class="fg_ico">|</i>子批次-1（<span>100</span><span>件</span>）
      <el-button size="medium" round>待复审</el-button>
    </div>
    <el-row class="message part">
      <el-col :span="22">
        <ul>
          <li>全部案件</li>
          <li>通过<span>128</span>件，未通过<span>33</span>件</li>
        </ul>
      </el-col>
      <el-col :span="2">
        <span class="btn_link" @click="gotoSmallTs(row)">审核</span>
      </el-col>
    </el-row>
    <div class="item-title">
      <i class="fg_ico">|</i>子批次-2（<span>100</span><span>件</span>）
      <el-button size="medium" round>预审完成</el-button>
    </div>
    <el-row class="message part">
      <el-col :span="22">
        <ul>
          <li>全部案件</li>
          <li>通过<span>128</span>件，未通过<span>33</span>件</li>
        </ul>
      </el-col>
      <el-col :span="2">
        <span class="btn_link" @click="gotoSmallTs(row)">查看</span>
      </el-col>
    </el-row>
    <div class="item-title">
      <i class="fg_ico">|</i>子批次-3（<span>100</span><span>件</span>）
      <el-button size="medium" round>退回重审</el-button> <span class="btn_link" @click="reasonPanelType = true">查看原因</span>
    </div>
    <el-row class="message part">
      <el-col :span="22">
        <ul>
          <li>全部案件</li>
          <li>通过<span>128</span>件，未通过<span>33</span>件</li>
        </ul>
      </el-col>
      <el-col :span="2">
      </el-col>
    </el-row>
    <div class="item-title">
      <i class="fg_ico">|</i>子批次-4（<span>100</span><span>件</span>）
      <el-button size="medium" round>待初审</el-button>
    </div>
    <el-row class="message part">
      <el-col :span="22">
        <ul>
          <li>全部案件</li>
          <li>通过<span>128</span>件，未通过<span>33</span>件</li>
        </ul>
      </el-col>
      <el-col :span="2">
      </el-col>
    </el-row>
    <div class="item-title">
      <i class="fg_ico">|</i>批次日志
    </div>
    <el-row class="message part">
      <el-col :span="22">
        <ul>
          <li>
            <span>2018/03/15   12:34:56</span>
            <span>分配完成</span>
            <span></span>
          </li>
          <li>
            <span>2018/03/15   12:34:56</span>
            <span>子批次-1</span>
            <span>初审完成</span>
          </li>
          <li>
            <span>2018/03/15   12:34:56</span>
            <span>子批次-2</span>
            <span>初审完成</span>
          </li>
          <li>
            <span>2018/03/15   12:34:56</span>
            <span>子批次-1</span>
            <span>复审通过，预审完成</span>
          </li>
          <li>
            <span>2018/03/15   12:34:56</span>
            <span>子批次-2</span>
            <span>复审退回<i class="btn_link" @click="reasonPanelType = true">查看原因</i></span>
          </li>
          <li>
            <span>2018/03/15   12:34:56</span>
            <span>初审人变由费玉琳变更为马忠兵，保留案件123件</span>
            <span></span>
          </li>
          <li>
            <span>2018/03/15   12:34:56</span>
            <span>初审人变由马忠兵变更为蒋慧芳，移交案件45件</span>
            <span></span>
          </li>
        </ul>
      </el-col>
      <el-col :span="2">
      </el-col>
    </el-row>


    <!-- dialog:查看原因 -->
    <el-dialog title="退回原因" :visible.sync="reasonPanelType" width="600px">
      <el-row>
        <el-col :span="6">退回原因：</el-col>
        <el-col :span="18">
          <div>1.初审错误率过高</div>
          <div>2.下次注意点</div>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
          <el-button @click="reasonPanelType = false">关闭</el-button>
        </span>
    </el-dialog>
    <!-- ** -->

    <!-- dialog:变更初审人 -->
    <el-dialog title="变更初审人" :visible.sync="changeFpeopleType" width="560px">
      <el-row  class="mb-20">
        <el-col :span="4">保留案件：</el-col>
        <el-col :span="20">
          <span class="f_orange mr-10">123</span><span>件</span>
        </el-col>
      </el-row>
      <el-row  class="mb-20">
        <el-col :span="4">移交案件：</el-col>
        <el-col :span="20">
          <span class="f_orange mr-10">223</span><span>件</span>
        </el-col>
      </el-row>
      <el-row  class="mb-20">
        <el-col :span="4">现任初审人：</el-col>
        <el-col :span="20">
          <span class="f_orange">费玉琳</span>
        </el-col>
      </el-row>
      <el-row  class="mb-20">
        <el-col :span="4">新任初审人：</el-col>
        <el-col :span="20">
          <el-select clearable v-model="newFirstPerson" placeholder="请选择初审人">
            <el-option v-for="item in firstPersonOpts" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
          <el-button @click="changeFpeopleType = false">关闭</el-button>
        </span>
    </el-dialog>
    <!-- ** -->
  </div>
</template>

<script type="text/ecmascript-6">
import Searchs from "@/components/searchs";
import TableComponent from "@/components/table";
import Mixins from "@/components/script/_mixin";
export default {
  extends: Mixins,
  data() {
    return {
      changeFpeopleType: false,
      reasonPanelType: false,
      batchId: "",
      items: [],
      item: {},
      queryUrl: "",
      tableData: [{}],
      newFirstPerson: "", //新初审人字段
      firstPersonOpts: [
        {
          value: "1",
          label: "人物1"
        },
        {
          value: "2",
          label: "人物2"
        },
        {
          value: "3",
          label: "人物3"
        }
      ],
      searchItem: {},
      searchItems: [
        {
          label: "",
          type: "",
          placeholder: "",
          colSpan: 4,
          property: ""
        }
      ],
      columnDefine: [
        {
          label: "",
          property: ""
        }
      ]
    };
  },
  methods: {
    getBatchInfo() {
      this.$http
        .post("/20/firstAudit/queryBatchInfo.htm", {
          batchId: this.batchId
        })
        .then(res => {
          if (res.code === "0000") {
            this.item = res.result;
          }
        });
    },
    getBatchList() {
      this.$http
        .post("/20/firstAudit/querySubBatchList.htm", {
          batchId: this.batchId
        })
        .then(res => {
          if (res.code === "0000") {
            res = Mock.mock(res);
            console.log(res);
            this.items = res.result.list;
          }
        });
    },
    getLabel(value) {
      let options = [
        {
          label: "待初审",
          value: 0
        },
        {
          label: "待复审",
          value: 1
        },
        {
          label: "退回重审",
          value: 2
        },
        {
          label: "预审完成",
          value: 3
        }
      ];
      let item = options.find(it => it.value === value);
      if (item) return item.label;
      return "--";
    },
    gotoSmallTs(row) {
      // 小批次查看与审核
      let routeData = this.$router.resolve({
        path: "/redoHearChildDetail",
        query: { id: 'id' }
      });
      window.open(routeData.href, "_blank");
    }
  },
  mounted() {
    this.batchId = this.$route.query.batchId;
    this.getBatchInfo();
  },
  components: {
    Searchs,
    TableComponent
  }
};
</script>

<style scoped lang="scss">
$themeColor: #0f357f;
.fg_ico {
  color: $themeColor;
  font-weight: bold;
  margin-right: 5px;
}

.content {
  .message {
    padding: 10px 20px;
    background: #fff;
    font-size: 15px;
    .btn_link {
      display: inline-block;
      // vertical-align: middle;
      margin-top: 22px;
    }
    span {
      display: inline-block;
      line-height: 30px;
    }
    .label {
      width: 100px;
      text-align: left;
      color: #7a7a7a;
    }
  }
  .part {
    padding-top: 20px;
    padding-bottom: 20px;
    li {
      line-height: 2;
    }
    ul {
      li {
        .btn_link {
          margin: 0;
        }
      }
    }
  }
}



.item-title {
  .tit {
    vertical-align: middle;
    display: inline-block;
    padding-top: 10px;
  }
}

.info {
  margin: 15px 0;
  .info_ul {
    background: #fff;
    li {
      box-sizing: border-box;
      padding: 20px 30px 10px;
      height: 100px;
      border-bottom: 1px solid #e5eaee;
      p {
        line-height: 24px;
        font-size: 14px;
        color: #666;
        &.info_title {
          line-height: 30px;
          color: #363636;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
