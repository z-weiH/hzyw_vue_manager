<template>
  <div>


    <el-dialog title="提示" :visible.sync="$parent.editState1" width="30%">
      <div v-if="zqdata.resultType === 1">
        <ul>
          <li>申请<span class="f_orange">{{zqdata.totalCase}}</span>件案件，共需消耗仲券<span class="f_orange">{{zqdata.needTicketCount}}</span>张，受理费<span>{{zqdata.totalAmt}}</span>元。</li>
          <li>该平台账户仲券及受理费充足，可以申请立案。</li>
          <li>确定对<span class="f_orange">{{zqdata.totalCase}}</span>件案件申请立案？</li>
        </ul>
      </div>
      <div v-if="zqdata.resultType === 2">
        <ul>
          <li>申请<span class="f_orange">{{zqdata.totalCase}}</span>件案件，共需消耗仲券<span class="f_orange">{{zqdata.needTicketCount}}</span>张，受理费<span>{{zqdata.totalAmt}}</span>元。</li>
          <li>该平台账户仲券或受理费不足，仅能对<span class="f_orange">{{zqdata.factCaseCount}}</span>件案件申请立案。</li>
          <li>确定对<span class="f_orange">{{zqdata.factCaseCount}}</span>件案件申请立案？</li>
        </ul>
      </div>
      <div v-if="zqdata.resultType === 3">
        <ul>
          <li>申请<span class="f_orange">{{zqdata.totalCase}}</span>件案件，共需消耗仲券<span class="f_orange">{{zqdata.needTicketCount}}</span>张，受理费<span>{{zqdata.totalAmt}}</span>元。</li>
          <li>该平台账户仲券或受理费不足，无法申请立案。</li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <customer-button type="primary" @click="confirmApCase" :disabled = "zqdata.resultType === 3 || disabled">确 定</customer-button>
        <customer-button @click="$parent.editState1 = false">取 消</customer-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import { URL_JSON } from '../../../../components/script/url_json'
export default {
	name: 'initiateApplyCreate1',
	props: {
		zqdata: Object,
		item: Object,
	},
	data() {
		return {
			//  editState1:0
      itsObj: {},
      disabled : false,
		}
	},
	methods: {
		confirmApCase() {
			this.itsObj = this.item
      this.itsObj.loanBillNos = this.zqdata.loanBillNos;
      this.disabled = true;
      this.$http.post(URL_JSON['confirmApplyCase'], this.itsObj).then(res => {
        console.log('成功！', res.result)
        this.$parent.$parent.initQuery(this.$parent.$parent.queryUrl, this.$parent.$parent.searchItem)
        this.$parent.editState1 = false
        this.$parent.$parent.editState = 0
        this.$message.success('立案成功');

        setTimeout(() => {
          this.disabled = false;
        },500);
      }).catch(() => {
        this.disabled = false;
      });
		},
	},
	mounted() {
		console.log('ddddd: ', this.zqdata)
	},
	components: {},
}
</script>

<style scoped lang="scss">
</style>
