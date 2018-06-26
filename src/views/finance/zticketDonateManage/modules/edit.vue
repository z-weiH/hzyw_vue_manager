<template>
  <el-dialog :visible.sync="show" v-dialogDrag :title="title" width="890px" center>
    <div class="dailog-container">
      <table-edits ref='tableEdits' :disabled="true" :editDefines="edtDefines" :item="item">
        <table v-if="editState === 1" slot="tablePlus" class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover mb-20">
          <tbody>
            <tr class="table-edits">
              <td colspan="4">审核原因</td>
            </tr>
            <tr class="table-edits">
              <td colspan="4">
                <el-input type="textarea" v-model="item.apprerResult" placeholder="请输入审批原因"></el-input>
              </td>
            </tr>
          </tbody>
        </table>
      </table-edits>
    </div>
    <span slot="footer" class="dialog-footer">
                  <el-button v-if="$parent.editState == 1" type="primary" @click="saveAndcommit(1)">通 过</el-button>
                  <el-button v-if="$parent.editState == 1 || $parent.editState == 2" type="primary" @click="saveAndcommit(0)">不通过</el-button>
                  <el-button v-if="$parent.editState == 1 || $parent.editState == 2" @click="$parent.editState = 0">取 消</el-button>
                  <el-button v-if="$parent.editState == 9" type="primary" @click="$parent.editState = 0">返回</el-button>
            </span>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
  import TableEdits from "@/components/tableEdits";
  import {
    URL_JSON
  } from "../../../../components/script/url_json";

  export default {
    name: "edit",
    props: {
      editState: Number, // 1:显示 0:隐藏 9:只读
      merchantCode: String
    },
    data() {
      return {
        item: {},
        title: "仲券赠送申请",
        edtDefines: [{
            title: "客户基本信息",
            content: [{
                label: "企业名称",
                type: "select",
                columns: 1,
                property: "merchantCode",
                options: [],
                labelfield: "merchantName",
                valuefield: "code"
              },
              {
                label: "企业账户",
                type: "text",
                columns: 1,
                disabled: "disabled",
                property: "companyAccount"
              },
              {
                label: "企业开户时间",
                type: "date",
                columns: 1,
                disabled: "disabled",
                property: "companyOpenTime"
              },
              {
                label: "企业累计充值（元）",
                type: "text",
                columns: 1,
                disabled: "disabled",
                property: "chargeTotal"
              },
              {
                label: "企业年营业额（万元）",
                type: "text",
                columns: 1,
                disabled: "disabled",
                property: "busiAmount"
              },
              {
                label: "累计赠送（张）",
                type: "text",
                columns: 1,
                disabled: "disabled",
                property: "giftTotal"
              }
            ]
          },
          {
            title: "赠送信息",
            content: [{
                label: "本次申请赠送（张）",
                type: "text",
                columns: 1,
                property: "ticketGift"
              },
              {
                label: "赠券有效期",
                type: "select",
                columns: 1,
                property: "ticketPeriod",
                options: [{
                    label: "请选择赠券有效期",
                    value: ""
                  },
                  {
                    label: "1个月",
                    value: 1
                  },
                  {
                    label: "2个月",
                    value: 2
                  },
                  {
                    label: "3个月",
                    value: 3
                  },
                  {
                    label: "4个月",
                    value: 4
                  },
                  {
                    label: "5个月",
                    value: 5
                  },
                  {
                    label: "6个月",
                    value: 6
                  },
                  {
                    label: "7个月",
                    value: 7
                  },
                  {
                    label: "8个月",
                    value: 8
                  },
                  {
                    label: "9个月",
                    value: 9
                  },
                  {
                    label: "10个月",
                    value: 10
                  },
                  {
                    label: "11个月",
                    value: 11
                  },
                  {
                    label: "12个月",
                    value: 12
                  }
                ]
              },
              {
                label: "附言",
                type: "textarea",
                columns: 2,
                property: "otherInfo"
              }
            ]
          },
          {
            title: "主管审批结果",
            hidden: () => this.item.ticketStatus == 2,
            content: [{
                label: "审批状态",
                type: "text",
                columns: 1,
                property: "managerStatusCn"
              },
              {
                label: "审批时间",
                type: "date",
                columns: 1,
                property: "managerTime"
              },
              {
                label: "审批原因",
                type: "textarea",
                columns: 2,
                property: "managerReason"
              }
            ]
          },
          {
            title: "ceo审批结果",
            hidden: () => this.item.ticketStatus > 2,
            content: [{
                label: "审批状态",
                type: "text",
                columns: 1,
                property: "ceoStatusCn"
              },
              {
                label: "审批时间",
                type: "date",
                columns: 1,
                property: "ceoTime"
              },
              {
                label: "审批原因",
                type: "textarea",
                columns: 2,
                property: "ceoReason"
              }
            ]
          }
        ]
      };
    },

    methods: {
      saveAndcommit(type) {
        if (!this.item.apprerResult && type === 0) {
          this.$message.warning("请输入审批原因");
        } else
          this.$http
          .post(URL_JSON["saveZticketDonateManage"], {
            apprerResult: this.item.apprerResult,
            isCommit: type,
            resultId: this.item.resultId
          })
          .then(res => {
            if (res.code === "0000") {
              this.$message.success(res.description);
              this.$emit("refresh");
            }
          });
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
    },
    created() {
      this.$http.post(URL_JSON["queryZticketCompany"]).then(res => {
        if (res.code === "0000")
          this.edtDefines[0].content[0].options = res.result.list;
      });
    }
  };
</script>

<style scoped lang="scss">

</style>
