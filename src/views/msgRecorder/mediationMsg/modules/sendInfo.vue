<template>
  <el-dialog
    v-dialogDrag
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :visible.sync="show"
    :title="title"
    width="660px"
    center>
    <div class="dailog-container">
      <table
        class="m-primordial-table
              el-table el-table--fit el-table--border
              el-table--enable-row-hover"
      >
        <tbody class="left-table">
          <tr>
            <td colspan="2">
              <el-select style="width: 180px;" placeholder="请选择调解人员" v-model="mediatorId1">
                <template  v-for="(opt,idx) in MediatorList">
                  <el-option :key="idx"  :value="opt.id" :label="opt.name" ></el-option>
                </template>
              </el-select>
            </td>
            <td colspan="1">
              <el-button type="primary"  @click="showConfirm(1)">调解员介绍</el-button>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <el-select style="width: 150px;" placeholder="请选择调解人员" v-model="mediatorId2">
                <template  v-for="(opt,idx) in MediatorList">
                  <el-option :key="idx"  :value="opt.id" :label="opt.name" ></el-option>
                </template>
              </el-select>
              <el-date-picker
                type="date" placeholder="选择日期"
                v-model="date2"
                style="width: 140px;"
                value-format="yyyy-MM-dd"
              >
              </el-date-picker>
              <el-input type="number" v-model="hour2" style="width: 50px;"></el-input>时

            </td>
            <td colspan="1">
              <el-button type="primary" @click="showConfirm(2)">进展报告</el-button>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <el-select style="width: 150px;" placeholder="请选择调解人员" v-model="mediatorIdz1">
                <template  v-for="(opt,idx) in MediatorList">
                  <el-option :key="idx"  :value="opt.id" :label="opt.name" ></el-option>
                </template>
              </el-select>
              <el-select style="width: 150px;" placeholder="请选择发送方式" v-model="smsType">
                <el-option :value="0" label="全部" ></el-option>
                <el-option :value="1" label="闪信" ></el-option>
                <el-option :value="2" label="普通" ></el-option>
              </el-select>
            </td>
            <td colspan="1">
              <el-button type="primary" @click="showConfirm(5)">中止调解</el-button>
            </td>
          </tr>
          <tr>
            <td colspan="2">
              <el-select style="width: 150px;" placeholder="请选择调解人员" v-model="mediatorIdz2">
                <template  v-for="(opt,idx) in MediatorList">
                  <el-option :key="idx"  :value="opt.id" :label="opt.name" ></el-option>
                </template>
              </el-select>
            </td>
            <td colspan="1">
              <el-button type="primary" @click="showConfirm(6)">出裁决书</el-button>
            </td>
          </tr>
        <tr>
          <td colspan="2">
            <el-date-picker
              type="date" placeholder="选择日期"
              v-model="date3"
              class="mr-30 w-205"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
            <el-input type="number" v-model="hour3" style="width: 50px;"></el-input>时
          </td>
          <td colspan="1">
            <el-button type="primary" @click="showConfirm(3)">还款约定告知</el-button>
          </td>
        </tr>
        <tr>
          <td colspan="2">
            <el-select class="w-160" placeholder="请选择调解人员" v-model="mediatorId4">
              <template  v-for="(opt,idx) in MediatorList">
                <el-option :key="idx"  :value="opt.id" :label="opt.name" ></el-option>
              </template>
            </el-select>
            <el-select class="w-160" placeholder="请选择还款账户" v-model="payment4">
              <template  v-for="(opt,idx) in AdjustList">
                <el-option :key="idx"  :value="opt.id" :label="opt.accountInformation" ></el-option>
              </template>
            </el-select>
          </td>
          <td colspan="1">
            <el-button type="primary" @click="showConfirm(4)">还款方式告知</el-button>
          </td>
        </tr>
        </tbody>
      </table>
      <div slot="footer" class="dialog-footer center mt-30" >
          <el-button type="primary" @click="$parent.editState = 0">取 消</el-button>
      </div>
    </div>
    <el-dialog
      :visible.sync="showDialog"
      v-dialogDrag
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      title="提示"
      width="400px"
      :modal="false"
      center>
        {{confirmMsg}}
      <div slot="footer" class="dialog-footer center mt-30" >
        <el-button type="primary" @click="HandleSubmit">确  认</el-button>
        <el-button @click="showDialog = false;">取 消</el-button>
      </div>
    </el-dialog>

  </el-dialog>
</template>

<script>
  import TableEdits from '@/components/tableEdits'
  import {URL_JSON} from "../../../../components/script/url_json";
  export default {
    name: 'edit',
    props: {
      editState: Number,
      item: Object
    },
    data () {
      return {
        showDialog: false,
        confirmMsg: '',
        title:'发送短信类型',
        MediatorList: [],
        AdjustList: [],
        mediatorId1: '',//调解员id1
        mediatorId2: '',//调解员id2
        date2: '',//时间2
        hour2: '',
        date3: '',//时间2
        hour3: '',
        mediatorId4: '',
        payment4: '',
        sendtype: 0,

        // 发送方式 0全部 1闪信 2普通
        smsType : '',
        // 调解员id
        mediatorIdz1 : '',
        // 调解员id
        mediatorIdz2 : '',

      }
    },
    computed: {
      show :{
        get: function () {
          return this.editState === 1;
        },
        set: function (v) {
          if(!v)
            this.$parent.editState = 0
        }
      }
    },
    components: {
      TableEdits
    },
    methods: {
      queryAllMediatorList() {
        this.$http.post(URL_JSON['queryAllMediatorList']).then(res => {
            if(res.code === '0000'){
              this.MediatorList = res.result;
              // console.error(this.MediatorList)
            }
        })
      },
      queryAdjustPaymentQuery() {
        this.$http.post(URL_JSON['queryAdjustPaymentQuery']).then(res => {
          if(res.code === '0000'){
            this.AdjustList = res.result;
          }
        })
      },
      showConfirm(num) {
        this.sendtype = num;
        if(num === 1){
          // 将对2个被申请人发送调解员介绍，短信内容中的调解员是李四，确定发送吗？
          let mediator = this.MediatorList.find(it => it.id == this.mediatorId1);
          if(!mediator)
            return this.$message.error('请选择调解员')
          this.confirmMsg = `将对${this.$parent.selection.length}个被申请人发送调解员介绍，短信内容中的调解员是${mediator.name}，确定发送吗？`;
        }else if(num === 2){
          if(!this.date2)
            return this.$message.error('请选择日期时间');
          if(!this.hour2 || this.hour2 < 0 || this.hour2 > 24)
            return this.$message.error('请填写正确的小时格式')

          // 将对1个被申请人发送进展告知，短信内容中的调解员是李四，联系时间是6月2日24时，确定发送吗？
          let mediator = this.MediatorList.find(it => it.id == this.mediatorId2);
          if(!mediator)
            return this.$message.error('请选择调解员');
          this.confirmMsg = `将对${this.$parent.selection.length}个被申请人发送进展告知，短信内容中的调解员是${mediator.name}，联系时间是${this.date2.substr(5,2)}月${this.date2.substr(8,2)}日${this.hour2}时，确定发送吗？`;
        }else if(num === 3){
          if(!this.date3)
            return this.$message.error('请选择日期时间');
          if(!this.hour3 || this.hour3 < 0 || this.hour3 > 24)
            return this.$message.error('请填写正确的小时格式')
          // 将对1个被申请人发送还款约定告知，短信内容中的约定还款时间是6月13日11时，确定发送吗？
          this.confirmMsg = `将对${this.$parent.selection.length}个被申请人发送还款约定告知，短信内容中的约定还款时间是${this.date3.substr(5,2)}月${this.date3.substr(8,2)}日${this.hour3}时，确定发送吗？`;
        }else if(num === 4){
          let  mediator = this.MediatorList.find(it => it.id === this.mediatorId4);
          let payment = this.AdjustList.find(it => it.id === this.payment4);
          if(!mediator)
            return this.$message.error('请选择调解员');
          if(!payment)
            return this.$message.error('请选择还款方式');
          this.confirmMsg = `将对${this.$parent.selection.length}个被申请人发送还款方式告知，短信内容中的调解员是${mediator.name}，还款账户是${payment.accountInformation}账户，确定发送吗？`;
          //
        }else if(num === 5) {
          if(!this.mediatorIdz1) {
            return this.$message.error('请选择调解员');
          }else if(this.smsType === '') {
            return this.$message.error('请选择发送方式');
          }
          // this.confirmMsg = '';
          this.HandleSubmit();
          return;
        }else if(num === 6) {
          if(!this.mediatorIdz2) {
            return this.$message.error('请选择调解员');
          }
          // this.confirmMsg = '';
          this.HandleSubmit();
          return;
        }
        this.showDialog = true;
      },
      HandleSubmit() {
        let caseIds= '';
        this.$parent.selection.forEach(it => {
          caseIds += it.caseId + ',';
        })
        caseIds = caseIds.substr(0, caseIds.length - 1);
        let item = {};
        if(this.sendtype === 1){
          item = {caseIds: caseIds, type: this.sendtype, mediatorId: this.mediatorId1};
        }else if(this.sendtype === 2){
          item = {caseIds: caseIds, type: this.sendtype, mediatorId: this.mediatorId2, date: this.date2, hour: this.hour2};
        }else if(this.sendtype === 3){
          item= {caseIds: caseIds, type: this.sendtype,  date: this.date3, hour: this.hour3};
        }else if(this.sendtype === 4){
          item= {caseIds: caseIds, type: this.sendtype, mediatorId: this.mediatorId4, adjustPaymentAccId: this.payment4};
        }else if(this.sendtype === 5) {
          item = {
            caseIds,
            type: this.sendtype,
            mediatorId : this.mediatorIdz1,
            smsType : this.smsType,
          };
        }else if(this.sendtype === 6) {
          item = {
            caseIds,
            type: this.sendtype,
            mediatorId : this.mediatorIdz2,
          };
        }
        this.$http.post(URL_JSON['sendMediationMsg'],item)
          .then(res => {
            if(res.code === '0000'){
              this.$message.success(res.description);
              this.showDialog = false;
            }
          })

      }
    },
    created () {
      this.queryAllMediatorList();
      this.queryAdjustPaymentQuery();
    }
  }
</script>

<style scoped>
  /*.dailog-container{*/
    /*height: 542px;*/
    /*overflow-y: scroll;*/
  /*}*/
  .left-table> tr > td:nth-child(1) {
    padding-left: 20px !important;
    text-align: left;
  }
</style>
