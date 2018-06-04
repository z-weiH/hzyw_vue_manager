<template>
  <el-dialog :visible.sync="show" v-dialogDrag :title="title" width="890px" center>
    <div class="dailog-container">
      <table-edits :editDefines="edtDefines" :item="item"></table-edits>
    </div>
    <span slot="footer" class="dialog-footer">
              <el-button v-if="$parent.editState == 1" type="primary" @click="saveAndcommit(1)">提交</el-button>
              <el-button v-if="$parent.editState == 1" @click="$parent.editState = 0">取 消</el-button>
              <el-button v-if="$parent.editState == 9" type="primary" @click="$parent.editState = 0">返回</el-button>
        </span>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import TableEdits from "@/components/tableEdits";
import { URL_JSON } from "../../../../components/script/url_json";
import formCheck from "@/components/script/formCheck";
export default {
  name: "edit",
  mixins: [formCheck],
  props: {
    editState: Number, // 1:显示 0:隐藏 9:只读
  },
  data() {
    return {
      item: {},
      title: "受理费结算",
      edtDefines: [
        {
          title: "受理费结算打款明细",
          content: [
            {
              label: "结算方",
              type: "text",
              columns: 4,
              property: "arbName",
            },
            {
              label: "结算年月",
              type:"month",
              columns: 1,
              property:"settleMonth",
              baseFmat:"yyyyMM",
              val_baseFmat:"yyyyMM"
            },
            {
              label: "金额",
              type: "text",
              columns: 1,
              property:"settleAmtAll",
            },
            {
              label: "账户名称",
              type: "text",
              columns: 1,
              property: "arbAcctname"
            },
            {
              label: "开户行",
              type: "text",
              columns: 1,
              property: "arbBank"
            },
            {
              label: "银行账号",
              type: "text",
              columns: 1,
              property: "arbAcctno"
            },
            {
              label: "结算单号",
              type: "text",
              columns: 1,
              property: "bankPayno"
            },
            {
              label: "结算说明",
              type: "textarea",
              columns: 4,
              property: "settleRemark"
            }
          ]
        }
      ]
    };
  },
  methods: {
    saveAndcommit(type){
      console.error(this.item);
      switch (type) {
        case 0:
          break;
        case 1:
          this.$http.post(URL_JSON['updateProcessingFeeSettle'],this.item)
          .then(res => {
            this.$message.success('提交成功');
          });
          break;
        default:
          break;
      }
    }
  },
  computed: {
    show: {
      get: function() {
        return this.editState == 1 || this.editState == 9;
      },
      set: function(v) {
        if (!v) {
          this.$parent.editState = 0;
        }
      }
    }
  },
  components: {
    TableEdits
  }
};
</script>

<style scoped lang="scss">
</style>
