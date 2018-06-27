<template>
  <el-dialog :visible.sync="show" v-dialogDrag :title="title" width="890px"  @open="resetForm" center>
    <div class="dailog-container">
      <table-edits :disabled="$parent.editState == 9" ref='edits' @valueChange='getChange' :editDefines="edtDefines" :item="item" :companyList="companyList">
        <table slot="tablePlus" class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover mb-20">
          <tbody>
            <tr class="table-edits">
              <td colspan="4">附言</td>
            </tr>
            <tr class="table-edits">
              <td colspan="4">
                <el-input type="textarea" v-model="item.otherInfo" placeholder="请输入附言" :disabled="$parent.editState == 9"></el-input>
              </td>
            </tr>
          </tbody>
        </table>
      </table-edits>

    </div>
    <span slot="footer" class="dialog-footer">
                <el-button v-if="$parent.editState == 1" type="primary" @click="saveAndcommit(0)">保存</el-button>
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
  props: {
    editState: Number, // 1:显示 0:隐藏 9:只读
    merchantCode: String,
    companyList: Array
  },
  mixins: [formCheck],
  data() {
    return {
      item: {},
      title: "仲券赠送申请",
      edtDefines: [
        {
          title: "客户基本信息",
          content: [
            {
              label: "企业名称",
              type: "select",
              columns: 1,
              property: "merchantCode",
              options: this.companyList,
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
          content: [
            {
              label: "本次申请赠送（张）",
              type: "text",
              columns: 1,
              property: "ticketGift",
              rule: [
                { required: true, message: "不能为空", trigger: "blur" },
                {
                  validator: (rule, value, callback) => {
                    if (value.length > 9) {
                      callback(new Error("输入数量偏大请重新输入"));
                    } else {
                      callback();
                    }
                  }
                }
              ]
            },
            {
              label: "赠券有效期",
              type: "select",
              columns: 1,
              property: "ticketPeriod",
              options: [
                {
                  label: "请选择赠券有效期",
                  value: ""
                },
                {
                  label: "1个月",
                  value: "1"
                },
                {
                  label: "2个月",
                  value: "2"
                },
                {
                  label: "3个月",
                  value: "3"
                },
                {
                  label: "4个月",
                  value: "4"
                },
                {
                  label: "5个月",
                  value: "5"
                },
                {
                  label: "6个月",
                  value: "6"
                },
                {
                  label: "7个月",
                  value: "7"
                },
                {
                  label: "8个月",
                  value: "8"
                },
                {
                  label: "9个月",
                  value: "9"
                },
                {
                  label: "10个月",
                  value: "10"
                },
                {
                  label: "11个月",
                  value: "11"
                },
                {
                  label: "12个月",
                  value: "12"
                }
              ]
            }
          ]
        }
      ]
    };
  },
  watch: {
    companyList(val, oldVal) {
      if (val) this.edtDefines[0].content[0].options = val;
    }
  },
  created() {
    this.$http.post(URL_JSON["queryZticketCompany"]).then(res => {
      if (res.code === "0000")
        this.edtDefines[0].content[0].options = res.result.list;
    });
  },
  methods: {
    saveAndcommit(type) {
      console.info("dialog:::", this.item);
      this.checkbeforeSave()
        .then(() => {
          let _posObj = {
            isCommit: type,
            merchantCode: this.item.merchantCode,
            otherInfo: this.item.otherInfo,
            ticketGift: this.item.ticketGift,
            ticketId: this.item.ticketId,
            ticketPeriod: this.item.ticketPeriod
          };
          switch (type) {
            case 0:
              this.$http
                .post(URL_JSON["updateZticketDetail"], _posObj)
                .then(res => {
                  console.info("成功+0 ", res);
                  this.$message({
                    message: "保存成功",
                    type: "success"
                  });
                  this.$parent.FullListQuery();
                });
              break;
            case 1:
              this.$http
                .post(URL_JSON["updateZticketDetail"], _posObj)
                .then(res => {
                  console.info("成功+1 ", res);
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                  this.$emit("refresh");
                });
              break;
            default:
              break;
          }
        })
        .catch(msg => {});
    },
    getChange(obj) {
      if (obj.label === "merchantCode") {
        // console.log('if --- obj.label:::',obj.label);
        console.log('itemiiiiddd::',this.item);
        if (!obj.value) {
          console.log("没有 --- obj.value::", obj.value);
          this.item = {};
          console.log('还原：：',this.item);
        } else {
          this.$http
            .post(URL_JSON["queryZticketCompanyInfo"], {
              merchantCode: obj["value"]
            })
            .then(res => {
              if (res.code) {
                // Object.assign(this.item, res.result);
                console.log('itttttt:::',this.item);
                Object.keys(res.result).forEach(key => {
                  this.$set(this.item, key, res.result[key]);
                });
              }
            });
        }
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
