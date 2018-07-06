<template>
  <el-dialog :visible.sync="show" v-dialogDrag :title="title" width="890px" center @close="closeFoo">
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
                    <el-select v-model="orderDetail.resultStatus" placeholder="请选择审核状态" :disabled="orderDetail.orderStatus > 1 || editState == 9">
                      <el-option label="通过" :value="2"></el-option>
                      <el-option label="不通过" :value="3"></el-option>
                    </el-select>
                  </td>
                  <td colspan="3"></td>
                </tr>
                <tr class="table-edits">
                  <td colspan="4">
                    <el-input type="textarea" v-model="orderDetail.apprerResult" placeholder="请输入审核说明" :disabled="orderDetail.orderStatus > 1 || editState == 9"></el-input>
                  </td>
                </tr>
              </tbody>
            </table>
      </table-edits>
    </div>
    <el-button v-if="addDollerBtn && ($parent.editState == 1 && currentLine.orderStatus === 2)" type="primary" @click="newCurrentTpl">新增加款</el-button>
    <span slot="footer" class="dialog-footer">
              <el-button v-if="$parent.editState == 1" type="primary" @click="saveAndcommit(0)">保存</el-button>
              <el-button v-if="$parent.editState == 1" type="primary" @click="saveAndcommit(1)">提交</el-button>
              <el-button v-if="$parent.editState == 1" @click="$parent.editState = 0">取 消</el-button>
              <el-button v-if="$parent.editState == 9" type="primary" @click="$parent.editState = 0">返回</el-button>
        </span>
  </el-dialog>
</template>


<script>
import dataHandle from "@/components/script/_dataHandle";
import TableEdits from "@/components/tableEdits";
import { URL_JSON } from "../../../../components/script/url_json";

export default {
  name: "edit",
  extends: dataHandle,
  props: {
    editState: Number, // 1:显示 0:隐藏 9:只读
    item: Object,
    currentLine:Object
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
            },
            {
              label: "审批时间：",
              type: "date",
              columns: 1,
              property: "apprerTime",

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
              property: "resultStatus",
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
            }
          ]
        }
      ],
      addDollerBtn:1
    };
  },
  computed: {
    show: {
      get: function() {
        return this.editState == 1 || this.editState == 9;
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
    closeFoo(){
      this.addDollerBtn = 1;
    },
    newCurrentTpl() {
      this.item.orderDetailList.push({}); //创建一个observer的新对象
      this.addDollerBtn = 0;
      console.info(this.item.orderDetailList);
    },
    saveAndcommit(type) {
      console.log("***saveAndcommit***:", this.item);
      let _thatObj = this.item.orderDetailList.filter(
        it => !it.detailId || it.orderStatus === 0
      );
      console.log("item:::: ", this.item);
      console.log("_thatObj:::: ", _thatObj);
      let _sUrl = URL_JSON["saveOrderAddNewDefaultDetail"];
      switch (type) {
        case 0:
          this.$http
            .post(
              _sUrl,
              {
                isCommit: type,
                orderDetailList: _thatObj,
                orderId: this.item.orderVO.orderId
              },
              {
                mheaders: true
              }
            )
            .then(res => {
              console.log(res);
              if (res.code == "0000") {
                this.$emit("refresh");
                this.$parent.editState = 0;
                this.$message({
                  message: "保存成功",
                  type: "success"
                });
              }
            });
          break;
        case 1:
          this.$http
            .post(
              _sUrl,
              {
                isCommit: type,
                orderDetailList: _thatObj,
                orderId: this.item.orderVO.orderId
              },
              {
                mheaders: true
              }
            )
            .then(res => {
              console.log(res);
              if (res.code == "0000") {
                this.$emit("refresh");
                this.$parent.editState = 0;
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
              }
            });
          break;
        default:
          break;
      }
      console.log("default");

    }
  },
  mounted() {
    // this.newCurrentTpl();
  },
  created () {

  }
};
</script>
