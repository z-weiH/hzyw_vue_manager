<template>
  <div class="content">
    <div class='wsbodyhead'>
      <a>所在位置</a>
      <router-link to='/main/redoHearList'>案件复审</router-link>
      <router-link to='/main/redoHearDetail' class='aside_tit'>{{clientName}}</router-link>
    </div>
    <div class="item-title clear of-hidden">
      <span class="tit">
                  <i class="fg_ico">|</i>批次信息
                </span>
      <customer-button v-if="showBtn" class="fr" @click="queryDialogFCperson">变更初审人</customer-button>

    </div>
    <div>
      <el-row class="message">
        <el-col :span="12">
          <span class="label">互金企业</span>
          <span>{{item.clientName}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">模板</span>
          <span>{{item.productName}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">账龄</span>
          <span>{{item.caseAging}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">推送日期</span>
          <span>{{item.pushTime}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">案件数量</span>
          <span>{{item.countCase}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">子批次数</span>
          <span>{{item.countSubBatch}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">初审人</span>
          <span>{{item.firstAuditorName}}</span>
        </el-col>
        <el-col :span="12">
          <span class="label">批次状态</span>
          <span>{{getLabel(item.reviewStatus)}}</span>
        </el-col>
      </el-row>
    </div>

    <div v-for="(opts,index) in childBatchList" :key="index">
      <div class="item-title">
        <i class="fg_ico">|</i>子批次- {{index+1}}（<span>{{opts.countCase}}</span><span>件</span>）
        <button v-if="opts.batchStatus == 0" class="title_btn ml-5" disabled>待初审</button>
        <button v-else-if="opts.batchStatus == 1" class="title_btn ml-5" disabled>待复审</button>
        <span v-else-if="opts.batchStatus == 2">
                <button class="title_btn ml-5" disabled>退回重审</button>
                <a href="javascript:;" class="btn_link" style="margin-left:15px;" @click="handleResult(opts)">查看原因</a>
              </span>
        <button v-else-if="opts.batchStatus == 3" class="title_btn ml-5" disabled>预审完成</button>
        <div class="fr" v-if="opts.batchStatus == 3"><customer-button type="primary" size="small" @click="childBatchExcel(opts)" round>导出Excel</customer-button></div>
      </div>
      <el-row class="message part">
        <el-col :span="22">
          <ul v-if="opts.batchStatus == 1 || opts.batchStatus == 3">
            <li>全部案件</li>
            <li>通过<span v-if="opts.passNum!=null">&nbsp;{{opts.passNum}}&nbsp;</span>件，未通过<span v-if="opts.unpassNum!=null">&nbsp;{{opts.unpassNum}}&nbsp;</span>件</li>
          </ul>
          <ul v-if="opts.batchStatus == 0 || opts.batchStatus == 2">
            <li>全部案件</li>
            <li>身份证已审<span>&nbsp;{{opts.countIdChecked}}&nbsp;</span>件, 签名已审<span>&nbsp;{{opts.countSignChecked}}&nbsp;</span>件,证据链已审<span>&nbsp;{{opts.countEviChecked}}&nbsp;</span>件</li>
          </ul>
        </el-col>
        <el-col :span="2" style="text-align:center;">
          <customer-button v-if="opts.batchStatus == 1" type="primary" size="medium" round @click="gotoSmallTs(opts)">审核</customer-button>
          <span v-if="opts.batchStatus == 3" class="btn_link" @click="gotoSmallTs(opts)">查看</span>
        </el-col>
      </el-row>
    </div>

    <div class="item-title">
      <i class="fg_ico">|</i>批次日志
    </div>
    <div class="logsItemWrap">
      <ul>
        <li v-for="(opts,index) in batchLogList" :key="index">
          <span>{{ opts.logTime }}</span>
          <span>{{ opts.logMsg }}</span>
          <span v-if="opts.logType == 4">复审退回<i class="btn_link" style="margin-left:15px;" @click="showViewReason(opts)">查看原因</i></span>
        </li>
      </ul>
    </div>

    <!-- dialog:查看原因 -->
    <el-dialog title="退回原因" :visible.sync="reasonPanelType" width="600px">
      <el-row>
        <div>
          <span>退回原因：</span>
          <span>{{backReasonObj}}</span>
        </div>
      </el-row>
      <span slot="footer" class="dialog-footer">
                <customer-button @click="reasonPanelType = false">关闭</customer-button>
              </span>
    </el-dialog>
    <!-- ** -->

    <!-- dialog:变更初审人 -->
    <el-dialog title="变更初审人" :visible.sync="changeFpeopleType" width="560px">
      <el-form :model="ruleForm" label-width="100px"  :rules="rules" ref="ruleForm">
        <el-row class="mb-20">
          <el-col :span="4">保留案件：</el-col>
          <el-col :span="20">
            <span class="f_orange mr-10">{{ changeFPerson.hasAudit }}</span><span>件</span>
          </el-col>
        </el-row>
        <el-row class="mb-20">
          <el-col :span="4">移交案件：</el-col>
          <el-col :span="20">
            <span class="f_orange mr-10">{{ changeFPerson.handerOver }}</span><span>件</span>
          </el-col>
        </el-row>
        <el-row class="mb-20">
          <el-col :span="4">现任初审人：</el-col>
          <el-col :span="20">
            <span class="f_orange">{{ changeFPerson.originalAuditName }}</span>
          </el-col>
        </el-row>
        <el-row class="mb-20">
          <el-col :span="24">
            <el-form-item label="新任初审人:" prop="newFirstPerson">
              <el-select @change="optsValChange" clearable v-model="ruleForm.newFirstPerson" placeholder="请选择初审人">
                <el-option v-for="item in changeFPerson.newAuditors" :key="item.userId" :label="item.userName" :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <customer-button @click="saveNewFPerson" type="primary">确认</customer-button>
          <customer-button @click="changeFpeopleType = false">取消</customer-button>
        </span>
    </el-dialog>
    <!-- ** -->
  </div>
</template>

<script type="text/ecmascript-6">
import { URL_JSON } from '../../../components/script/url_json'
import exportFile from '@/assets/js/exportFile'
import { compileStr, uncompileStr } from '@/assets/js/tool'
import Searchs from '@/components/searchs'
import TableComponent from '@/components/table'
import Mixins from '@/components/script/_mixin'
export default {
	extends: Mixins,
	data() {
		return {
			changeFpeopleType: false,
			reasonPanelType: false,
			batchNo: '',
			clientName: '',
			childBatchList: [], //子批次概要信息
			batchLogList: [], //批次日志信息
			items: [],
			item: {}, //批次信息
			queryUrl: '',
			tableData: [{}],
			changeFPerson: {}, //变更初审人obj
			ruleForm: {
				newFirstPerson: '', //新初审人字段
			},
			rules: {
				newFirstPerson: [
					{
						required: true,
						message: '请选择新的审核人',
						trigger: 'change',
					},
				],
			},
			_newOpts: {},
			backReasonObj: '', //退回原因
			firstPersonOpts: [
				{
					value: '1',
					label: '人物1',
				},
				{
					value: '2',
					label: '人物2',
				},
				{
					value: '3',
					label: '人物3',
				},
			],
			searchItem: {},
			searchItems: [
				{
					label: '',
					type: '',
					placeholder: '',
					colSpan: 4,
					property: '',
				},
			],
			columnDefine: [
				{
					label: '',
					property: '',
				},
			],
		}
	},
	computed: {
		showBtn() {
			let item = this.childBatchList.find(it => {
				return (
					(it.batchStatus === 0 || it.batchStatus === 2) &&
					(it.countEviChecked < it.countCase &&
						it.countIdChecked < it.countCase &&
						it.countSignChecked < it.countCase)
				)
			})
			if (item) {
				console.log('*真*')
				return true
			} else {
				console.log('*假*')
				return false
			}
		},
	},
	methods: {
		handleResult(item) {
			this.reasonPanelType = true
			this.backReasonObj = item.returnMsg
		},
		showViewReason(opts) {
			this.reasonPanelType = true
			console.log('opts.logId: ', opts.logId)
			this.$http
				.post(URL_JSON['queryBackReason1'], {
					logId: opts.logId,
				})
				.then(res => {
					console.log('退回原因：', res)
					this.backReasonObj = res.result.returnMsg
				})
		},
		getBatchInfo() {
			console.info('asdasd     ', this.batchNo)
			this.$http
				.post(URL_JSON['queryBatchInfo'], {
					batchNo: this.batchNo,
				})
				.then(res => {
					if (res.code === '0000') {
						this.item = res.result
						console.log('批次信息：', res.result)
					}
				})
		},
		getBatchList() {
			this.$http
				.post(URL_JSON['queryChildBatchInfo'], {
					batchNo: this.batchNo,
					type: 'SECOND',
				})
				.then(res => {
					if (res.code === '0000') {
						// res = Mock.mock(res);
						console.log('zzzzz:::', res)
						// this.items = res.result.list;
						this.childBatchList = res.result
						console.log('SECOND:: ', this.childBatchList)
					}
				})
		},
		getBatchLog() {
			this.$http
				.post(URL_JSON['queryBatchLogs'], {
					batchNo: this.batchNo,
				})
				.then(res => {
					if (res.code === '0000') {
						console.log('logs::::', res)
						this.batchLogList = res.result
					}
				})
		},
		getLabel(value) {
			let options = [
				{
					label: '初审中',
					value: 0,
				},
				{
					label: '待审核',
					value: 1,
				},
				{
					label: '审核完成',
					value: 2,
				},
			]
			let item = options.find(it => it.value === value)
			if (item) return item.label
			return '--'
		},
		gotoSmallTs(opts) {
			localStorage.removeItem('savedConfig');
      console.log(this.savedCurrentNum);
			// 小批次查看与审核
			let routeData = this.$router.resolve({
				path: '/redoHearChildDetail',
				query: {
					subBatchId: opts.subBatchNo,
					subViewType: opts.batchStatus,
				},
			})
			window.open(routeData.href, '_blank')
		},
		queryDialogFCperson() {
			this.changeFpeopleType = true
			// 变更初审人查询
			this.$http
				.post(URL_JSON['queryChangeFirstPerson'], {
					batchId: this.batchNo,
					type: 'OPERATOR',
				})
				.then(res => {
					console.log('bgsgg11111::', res.result)
					this.changeFPerson = res.result
				})
		},
		saveNewFPerson() {
			console.info('ssasasasas::', this._newOpts)
			this.$refs['ruleForm'].validate(valid => {
				if (valid) {
					// 更新新初审人
					this.$http.post(URL_JSON['saveChangeFirstPerson'], this._newOpts).then(res => {
						this.changeFpeopleType = false
						this.$message.success('修改成功')
						this.$router.push('/main/redoHearList')
					}, 300)
				} else {
					console.log('error submit!!')
					return false
				}
			})
		},
		optsValChange(_value) {
			console.log(_value)
			this._newOpts = Object.assign({}, this.changeFPerson)
			this._newOpts.batchId = this.$route.query.batchN
			// delete this._newOpts.newAuditors;
			this._newOpts.currentAuditId = _value
			console.info('vhange:::', this._newOpts)
		},
		childBatchExcel(opts) {
			// 导出子批次数据
			exportFile({
				url: URL_JSON['exportChildBatchFile'],
				data: {
					productName: this.item.productName,
					subBatchNo: opts.subBatchNo
				},
			})
		},
	},
	mounted() {
		this.batchNo = this.$route.query.batchN
		this.clientName = uncompileStr(this.$route.query.clientN)
		this.getBatchInfo()
		this.getBatchList()
		this.getBatchLog()
	},
	components: {
		Searchs,
		TableComponent,
	},
}
</script>

<style scoped lang="scss">
$themeColor: #0f357f;
.fg_ico {
	color: $themeColor;
	font-weight: bold;
	margin-right: 5px;
}

.title_btn {
	color: $themeColor;
	border: 1px solid #193b8c;
	padding: 7px 12px;
	border-radius: 10px;
	font-size: 16px;
	background: #fff;
}

.content {
	.logsItemWrap {
		background-color: #ffffff;
		li {
			padding-left: 20px;
			padding-top: 26px;
			padding-bottom: 16px;
			font-size: 14px;
			border-top: 1px dotted #a3a3a3;
			&:first-child {
				border-top: 0;
			}
			span {
				&:first-child {
					color: #a3a3a3;
				}
				& + span {
					font-size: 16px;
				}
			}
		}
	}
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
