<template>
  <el-dialog :visible.sync="show" :title="title" width="890px" center>
    <div class="dailog-container">
      <table-edits :editDefines="edtDefines" :item="item.orderVO"></table-edits>
      <table-edits v-for="(orderDetail, index) in item.orderDetailList" :key="index" :disabled="Boolean(orderDetail.orderStatus) || $parent.editState == 9" :editDefines="edtDefines_item" :item="orderDetail">
        <table v-if="orderDetail.orderStatus > 1" slot="tablePlus" class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover mb-20">
          <tbody>
            <tr class="table-edits">
              <td colspan="4">审核结果</td>
            </tr>
            <tr class="table-edits">
              <td colspan="1">
                <el-select v-model="orderDetail.resultStatus" placeholder="请选择审核状态" :disabled="editState == 9">
                  <el-option label="通过" :value="2"></el-option>
                  <el-option label="不通过" :value="3"></el-option>
                </el-select>
              </td>
              <td colspan="3"></td>
            </tr>
            <tr class="table-edits">
              <td colspan="4">
                <el-input type="textarea" v-model="orderDetail.apprerResult" placeholder="请输入审核说明" :disabled="editState == 9"></el-input>
              </td>
            </tr>
          </tbody>
        </table>
      </table-edits>
      <!-- <table-edits :editDefines="edtDefines_audit" :item="item.orderDetailList" v-if="$parent.editState == 3"></table-edits> -->
    </div>
    <el-button v-if="$parent.editState == 1" type="primary" @click="newCurrentTpl">新增加款</el-button>
    <span slot="footer" class="dialog-footer">
                  <el-button v-if="$parent.editState == 3" type="primary" @click="checkUpdate">审核</el-button>
                  <el-button v-if="$parent.editState == 3" @click="$parent.editState = 0">取 消</el-button>
                  <el-button v-if="$parent.editState == 9" type="primary" @click="$parent.editState = 0">返回</el-button>
            </span>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import TableEdits from "@/components/tableEdits";
import { URL_JSON } from "../../../../components/script/url_json";
export default {
  name: "edit",
  props: {
    editState: Number, // 1:显示 0:隐藏 9:只读 3:开启审核模板
    item: Object
  },
  data() {
    return {
      title: "订单加款审核",
      edtDefines: [
        {
          title: "订单明细",
          content: [
            {
              label: "订单号：",
              type: "text",
              disabled: "disabled",
              columns: 1,
              property: "orderId"
            },
            {
              label: "客户名称：",
              type: "text",
              disabled: "disabled",
              columns: 1,
              property: "merchantName"
            },
            {
              label: "订单日期：",
              type: "text",
              disabled: "disabled",
              columns: 1,
              property: "orderDate"
            },
            {
              label: "联系电话：",
              type: "text",
              disabled: "disabled",
              columns: 1,
              property: "orderPhone"
            },
            {
              label: "订单金额（元）：",
              type: "text",
              disabled: "disabled",
              columns: 1,
              property: "orderAmt"
            },
            {
              label: "已到账金额（元）：",
              type: "text",
              disabled: "disabled",
              columns: 1,
              property: "factAmt"
            },
            {
              label: "订单状态：",
              type: "select",
              disabled: "disabled",
              columns: 1,
              property: "orderStatus"
            }
          ]
        }
      ],
      edtDefines_item: [
        {
          title: "加款信息",
          content: [
            {
              label: "客户银行账户名：",
              type: "text",
              columns: 1,
              property: "acctName"
            },
            {
              label: "客户银行账号：",
              type: "text",
              columns: 1,
              property: "acctNo"
            },
            {
              label: "客户开户行：",
              type: "text",
              columns: 1,
              property: "bankName"
            },
            {
              label: "银行流水号：",
              type: "text",
              columns: 1,
              property: "bankOrderno"
            },
            {
              label: "到账金额（元）：",
              type: "text",
              columns: 1,
              property: "arrivalAmt"
            },
            {
              label: "到款时间：",
              type: "date",
              columns: 1,
              property: "payTime"
            },
            {
              label: "转账摘要：",
              type: "text",
              columns: 1,
              property: "bankRemark"
            },
            {
              label: "加款人：",
              type: "text",
              columns: 1,
              property: "operName",
              hidden: item => {
                //自定义orderStatus== 2,3 显示扩展字段，并且新增【加款信息】时，扩展字段是隐藏的。
                return (
                  (this.item.orderVO.orderStatus == 2 ||
                    this.item.orderVO.orderStatus == 3) &&
                  item.orderStatus
                );
              }
            },
            {
              label: "审核状态：",
              type: "select",
              columns: 1,
              options: [
                {
                  label: "待复核",
                  value: 1
                },
                {
                  label: "通过",
                  value: 2
                },
                {
                  label: "未通过",
                  value: 3
                }
              ],
              property: "resultStatus",
              hidden: item => {
                //自定义orderStatus== 2,3 显示扩展字段，并且新增【加款信息】时，扩展字段是隐藏的。
                return (
                  (this.item.orderVO.orderStatus == 2 ||
                    this.item.orderVO.orderStatus == 3) &&
                  item.orderStatus
                );
              }
            },
            {
              label: "审核说明：",
              type: "textarea",
              columns: 1,
              property: "apprerResult",
              hidden: item => {
                //自定义orderStatus== 2,3 显示扩展字段，并且新增【加款信息】时，扩展字段是隐藏的。
                return (
                  (this.item.orderVO.orderStatus == 2 ||
                    this.item.orderVO.orderStatus == 3) &&
                  item.orderStatus
                );
              }
            },
            {
              label: "加款时间：",
              type: "date",
              columns: 1,
              property: "submitTime",
              hidden: item => {
                //自定义orderStatus== 2,3 显示扩展字段，并且新增【加款信息】时，扩展字段是隐藏的。
                return (
                  (this.item.orderVO.orderStatus == 2 ||
                    this.item.orderVO.orderStatus == 3) &&
                  item.orderStatus
                );
              }
            }
          ]
        }
      ]
    };
  },
  computed: {
    show: {
      get: function() {
        return (
          this.editState == 1 || this.editState == 9 || this.editState == 3
        );
      },
      set: function(v) {
        if (!v) this.$parent.editState = 0;
      }
    }
  },
  components: {
    TableEdits
  },
  methods: {
    checkUpdate() {
      // 审核
      this.$http
        .post(URL_JSON["updateOrderAddNewManage"], {
          // auditList:
        })
        .then(res => {});
    }
  },
  mounted() {}
};
</script>

<style scoped lang="scss">
</style>
