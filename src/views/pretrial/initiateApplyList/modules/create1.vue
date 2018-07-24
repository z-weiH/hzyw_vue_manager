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
        <el-button type="primary" @click="confirmApCase" :disabled = "zqdata.resultType === 3">确 定</el-button>
        <el-button @click="$parent.editState1 = false">取 消</el-button>
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
		}
	},
	methods: {
		confirmApCase() {
			this.itsObj = this.item
			this.itsObj.loanBillNos = this.zqdata.loanBillNos
      // 请求开关控制
			let isHold = true;
			if (isHold) {
        isHold = false;
				this.$http.post(URL_JSON['confirmApplyCase'], this.itsObj).then(res => {
					console.log('成功！', res.result)
					this.$parent.$parent.initQuery(this.$parent.$parent.queryUrl, this.$parent.$parent.searchItem)
					this.$parent.editState1 = false
					this.$parent.$parent.editState = 0
          this.$message.success('立案成功')
          isHold = true;
				})
			}
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
