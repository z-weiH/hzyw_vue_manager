<template>
  <div class="tpl-setting-edit">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">模板设置</a>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">模板设置</span>

      <div class="fr">
        <el-button @click="handleParameterList" type="primary" round class="mr-10">参数列表</el-button>
        <el-button type="text" @click="handleGoBack">返回&gt;&gt;</el-button>
      </div>
    </div>

    <div class="item-table">
      <div class="m-template-list">
        <el-tooltip :content="ruleForm.prodTempName" placement="left">
          <span class="mr-10 templateName ellipsis">{{ruleForm.prodTempName}}</span>
        </el-tooltip>
        <el-button @click="handleEnableOrDiscontinuation(0)" :disabled="ruleForm.applyStatus !== 1" class="mr-10" type="warning" size="medium" round>
          {{ruleForm.templateStatus === 1 ? '停用' : '启用'}}
        </el-button>
        <span class="remarks ellipsis">
          <el-tooltip :content="ruleForm.remark" placement="top">
            <span style="max-width:545px;" class="ellipsis">{{ruleForm.remark}}</span>
          </el-tooltip>
        </span>
        
        <div class="mt-20">
          <span>仲裁服务费：</span>
          <el-select @change="handleArbFeeStatus" style="width:130px;" v-model="ruleForm.arbFeeStatus" class="mr-20">
            <el-option label="主张" :value="1"></el-option>
            <el-option label="不主张" :value="0"></el-option>
          </el-select>
          <span>仲裁程序：</span>
          <el-select @change="handleArbProcedureDay" style="width:130px;" v-model="ruleForm.arbProcedureDay" class="mr-20">
            <el-option label="互金程序" :value="1"></el-option>
            <el-option label="普通程序" :value="5"></el-option>
          </el-select>
          <span>案由：</span>
          <el-select @change="handleCaseReason" style="width:130px;" v-model="ruleForm.caseReason">
            <el-option label="借款合同纠纷" :value="0"></el-option>
            <el-option label="追偿权纠纷" :value="1"></el-option>
            <el-option label="融资租赁合同纠纷" :value="2"></el-option>
            <el-option label="买卖合同纠纷" :value="3"></el-option>
          </el-select>
          <span class="ml-20">向申请人发送短信：</span>
          <el-select @change="handleSendSMS" style="width:130px;" v-model="ruleForm.sendSmsApplicants">
            <el-option label="不发送" :value="0"></el-option>
            <el-option label="发送" :value="1"></el-option>
          </el-select>
        </div>
      </div>

      <div class="m-template-list">
        <el-row>
          <el-col :span="12">
            <div>
              <span class="is-required list-text">申请书：</span>
              <!-- <el-upload
                v-show="!ruleForm.applyUpdateTime"
                ref="sqs"
                class="upload-demo"
                :action="`${$host}/templateSetting/uploadTemplateContent.htm`"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
                :on-error="fileError"
                :data="{
                  path : 'demo',
                  token : token,
                  type : '1',
                  prodTempId : $route.query.prodTempId,
                }"
              >
                <el-button type="text">word上传</el-button>
              </el-upload>
              <el-button v-show="ruleForm.applyUpdateTime" @click="handleCoverUpload('sqs')" type="text">word上传</el-button> -->
              <el-button @click="handleWebpage('applyContent')" type="text">网页编辑</el-button>
              <span class="m-time ml-10">
                {{ruleForm.applyUpdateTime || '待设置'}}
              </span>
            </div>
            <div>
              <span class="is-required list-text">标的金额：</span>
              <el-button @click="handleSet(1)" type="text">设置</el-button>
              <span class="m-time" style="margin-left:38px;">
                {{ruleForm.bidUpdateTime || '待设置'}}
              </span>
            </div>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="18">
                <span class="is-required list-text">证据设置：</span>
                <el-button @click="handleEvidenceSetting" type="text">设置</el-button>
                <span class="m-time ml-20">
                  {{ruleForm.eviUpdateTime || '待设置'}}
                </span>
              </el-col>
              <el-col :span="6">
                <el-button @click="handleEnableOrDiscontinuation(1)" type="warning" size="medium" round class="mt-20">
                  {{ruleForm.applyStatus === 1 ? '停用' : '启用'}}
                </el-button>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </div>

      <div class="m-template-list">
        <el-col :span="12">
            <div>
              <span class="list-text">裁决书：</span>
              <!-- <el-upload
                v-show="!ruleForm.judgeUpdateTime"
                ref="cjs"
                class="upload-demo"
                :action="`${$host}/templateSetting/uploadTemplateContent.htm`"
                :show-file-list="false"
                :before-upload="beforeAvatarUpload"
                :on-success="handleAvatarSuccess"
                :on-error="fileError"
                :data="{
                  path : 'demo',
                  token : token,
                  type : '2',
                  prodTempId : $route.query.prodTempId,
                }"
              >
                <el-button type="text">word上传</el-button>
              </el-upload>
              <el-button v-show="ruleForm.judgeUpdateTime" @click="handleCoverUpload('cjs')" type="text">word上传</el-button> -->
              <el-button @click="handleWebpage('judgeContent')" type="text">网页编辑</el-button>
              <span class="m-time ml-10">
                {{ruleForm.judgeUpdateTime || '待设置'}}
              </span>
            </div>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="18">
                <span class="list-text">预测仲裁金额：</span>
                <el-button @click="handleSet(2)" type="text">设置</el-button>
                <span class="m-time ml-20">
                  {{ruleForm.forecastUpdateTime || '待设置'}}
                </span>
              </el-col>
              <el-col :span="6">
                <el-button @click="handleEnableOrDiscontinuation(2)" type="warning" size="medium" round>
                  {{ruleForm.adjudeStatus === 1 ? '停用' : '启用'}}
                </el-button>
              </el-col>
            </el-row>
          </el-col>
      </div>

      <div class="m-template-list">
        <div class="of-hidden" v-if="ruleForm.qzzxList.length > 0">
          <div class="fl list-text" style="margin-top:13px;">强制执行书：</div>
          <el-row class="fl" style="width:calc(100% - 110px)">
            <el-col :span="11" v-for="(item , index) in ruleForm.qzzxList" :key="index">
              <div>
                <span class="mr-10">裁决书 {{item.version && item.version.split(' ')[0]}}</span>
                <el-button @click="handleWebpage('enforceContent',item.documentLogId)" type="text">网页编辑</el-button>
                <span class="m-time ml-10">
                  {{item.version || '待设置'}}
                </span>
              </div>
            </el-col>
          </el-row>
        </div>

        <el-row>
          <el-col :span="12">
            <el-row>
              <el-col :span="18">
                <span class="list-text">执行标的：</span>
                <el-button @click="handleSet(3)" type="text">设置</el-button>
                <span class="m-time ml-20">
                  {{ruleForm.executeUpdateTime || '待设置'}}
                </span>
              </el-col>
              <!-- <el-col :span="6">
                <el-button @click="handleEnableOrDiscontinuation(3)" type="warning" size="medium" round>
                  {{ruleForm.enforceStatus === 1 ? '停用' : '启用'}}
                </el-button>
              </el-col> -->
            </el-row>
          </el-col>
        </el-row>
      </div>

      <div class="m-template-list">
        <el-col :span="12">
          <el-row>
            <span class="list-text">公式配置：</span>
            <el-button @click="handleFormula" type="text">设置</el-button>
          </el-row>
        </el-col>
      </div>
    </div>

    <!-- 设置 dialog -->
    <setDialog @successCBK="successCBK" ref="setDialog"></setDialog>
    <!-- 公式配置 dialog -->
    <formulaConfigDialog ref="formulaConfigDialog"></formulaConfigDialog>
  </div>
</template>

<script>
  import setDialog from './modules/setDialog.vue'
  import formulaConfigDialog from './modules/formulaConfigDialog.vue'
  export default {
    components : {
      setDialog,
      formulaConfigDialog,
    },
    data() {
      return {
        // 用户token
        token : JSON.parse(localStorage.getItem('loginInfo')).token,

        ruleForm : {
          // 模板名称
          prodTempName : '',
          // 客户名称 ---
          clientName : '',
          // 备注
          remark : '',
          // 仲裁服务费 1(主张),0(不主张)
          arbFeeStatus : '',
          // 仲裁程序 1(互金程序),5(普通程序)
          arbProcedureDay : '',
          // 案由 0借款合同纠纷 1追偿权纠纷 2融资租赁合同纠纷
          caseReason : '',
          // 向申请人发送短信 0-不发送，1-发送
          sendSmsApplicants : '',
          // 申请书 时间
          applyUpdateTime : '',
          // 证据设置状态 0(未设置),1(已设置) ---
          eviStatus : '',
          // 证据设置 时间
          eviUpdateTime : '',
          // 标的金额
          bidAmt : '',
          // 标的金额 时间
          bidUpdateTime : '',
          // 裁决书 时间
          judgeUpdateTime : '',
          // 预测仲裁金额
          forecastAmt : '',
          // 预测仲裁金额 时间
          forecastUpdateTime : '',
          // 强制申请书  时间
          enforceUpdateTime : '',
          // 执行标的
          executeAmt : '',
          // 执行标的 时间
          executeUpdateTime : '',

          // 模板启用状态 	0:停用,1:启用
          templateStatus : '',
          // 申请书状态 	0:待设置,1:启用,2:停用
          applyStatus : '',
          // 裁决书 状态 0:待设置,1:启用,2:停用
          adjudeStatus : '', 
          // 强制申请书 	0:待设置,1:启用,2:停用
          enforceStatus : '',

          // 强制执行 list
          qzzxList : [],
          // 申请书、裁决书、强制申请书documentId
          documentIdList : [],
        },
      }
    },
    mounted() {
      this.init();
      this.queryDocuemntId().then(() => {
        this.queryQzzxList();
      });
    },
    methods : {
      // 初始化数据
      init() {
        this.$http({
          url : '/templateSetting/queryTemplateInfoByProdTempId.htm',
          method : 'post',
          data : {
            prodTempId : this.$route.query.prodTempId,
          },
        }).then((res) => {
          this.ruleForm = Object.assign(this.ruleForm,res.result);
        });
      },
      // 获取 documentIdList
      queryDocuemntId() {
        return this.$http({
          url : '/document/queryTemplateDocumentByProdTempId.htm',
          method : 'post',
          data : {
            prodTempId : this.$route.query.prodTempId,
          },
        }).then(res => {
          this.documentIdList = res.result;
        });
      },
      // 获取 强制执行list
      queryQzzxList() {
        return this.$http({
          url : '/document/queryTemplateDocumentLogListByDocumentId.htm',
          method : 'post',
          data : {
            docuemntId : this.documentIdList.filter(v => v.documentType === 5)[0].documentId,
          },
        }).then(res => {
          this.ruleForm.qzzxList = res.result;
        });
      },
      // 点击返回
      handleGoBack() {
        this.$router.push(`tplSettingList?clientCode=${this.$route.query.clientCode}&templateId=${this.$route.query.templateId}`);
      },
      //点击参数列表
      handleParameterList() {
        window.open(`//${window.location.host}/#/tmParameterDetail?type=0`,'_blank');
      },
      // 点击设置
      handleSet(type) {
        this.$refs.setDialog.show(this.ruleForm,type);
      },
      // 设置成功 回调
      successCBK() {
        this.init();
      },
      // 点击网页编辑
      handleWebpage(type,documentLogId) {
        let documentId = '';
        if(!documentLogId && type === 'applyContent') {
          documentId = this.documentIdList.filter(v => v.documentType === 1)[0].documentId;
        }else if(!documentLogId && type === 'judgeContent') {
          documentId = this.documentIdList.filter(v => v.documentType === 5)[0].documentId;
        }
        this.$router.push(`/webpageEditor?clientCode=${this.$route.query.clientCode}&prodTempId=${this.$route.query.prodTempId}&type=${type}&templateId=${this.$route.query.templateId}&documentLogId=${documentLogId || ''}&documentId=${documentId || ''}`);
      },
      // 点击证据设置
      handleEvidenceSetting() {
        this.$router.push(`evidenceSetting?clientCode=${this.$route.query.clientCode}&prodTempId=${this.$route.query.prodTempId}&templateId=${this.$route.query.templateId}`);
      },
      // 点击 启用 or 停用
      handleEnableOrDiscontinuation(type) {
        // 业务类型 0：大状态启用停用,1:申请书启用停用,2:裁决书启用停用,3:强制申请书启用停用
        let activeType = ''; // 当前状态
        // 根据状态校验 
        if(type === 0) {
          if(!this.ruleForm.applyUpdateTime || !this.ruleForm.eviUpdateTime || !this.ruleForm.bidUpdateTime) {
            this.$message.warning('尚未设置完成，无法操作');
            return;
          }
          activeType = this.ruleForm.templateStatus;
        }else if(type === 1) {
          if(!this.ruleForm.applyUpdateTime) {
            this.$message.warning('申请书 尚未设置完成，无法操作');
            return;
          }
          if(!this.ruleForm.eviUpdateTime) {
            this.$message.warning('证据设置 尚未设置完成，无法操作');
            return;
          }
          if(!this.ruleForm.bidUpdateTime) {
            this.$message.warning('标的金额 尚未设置完成，无法操作');
            return;
          }
          activeType = this.ruleForm.applyStatus;
        }else if(type === 2) {
          if(!this.ruleForm.judgeUpdateTime) {
            this.$message.warning('裁决书 尚未设置完成，无法操作');
            return;
          }
          if(!this.ruleForm.forecastUpdateTime) {
            this.$message.warning('预测仲裁金额 尚未设置完成，无法操作');
            return;
          }
          activeType = this.ruleForm.adjudeStatus;
        }else if(type === 3) {
          if(!this.ruleForm.enforceUpdateTime) {
            this.$message.warning('强制申请书 尚未设置完成，无法操作');
            return;
          }
          if(!this.ruleForm.executeUpdateTime) {
            this.$message.warning('执行标的 尚未设置完成，无法操作');
            return;
          }
          activeType = this.ruleForm.enforceStatus;
        }
        console.log(activeType);
        this.$http({
          url : '/templateSetting/updateTemplateStatusByProdTempId.htm',
          method : 'post',
          data : {
            prodTempId : this.$route.query.prodTempId,
            status : activeType === 1 ? 2 : 1,
            type : type,
          },
        }).then((res) => {
          let name = this.ruleForm.prodTempName + ' ' + (
            type === 1 ? '申请书' : 
            type === 2 ? '裁决书' : 
            type === 3 ? '强制申请书' : '模板'
          );
          let message = activeType === 1 ? name + '停用成功' : name + '启用成功';
          this.$message.success(message);
          this.init();
        });
      },

      // 仲裁服务费 change
      handleArbFeeStatus(val) {
        this.editFn({
          arbFeeStatus : val,
        });
      },
      // 仲裁程序 change
      handleArbProcedureDay(val) {
        this.editFn({
          arbProcedureDay : val,
        });
      },
      // 案由 change
      handleCaseReason(val) {
        this.editFn({
          caseReason : val,
        });
      },
      // 发送短信
      handleSendSMS(val) {
        this.editFn({
          sendSmsApplicants : val,
        });
      },
      // 修改页面参数接口
      editFn(data) {
        this.$http({
          url : '/templateSetting/updateTemplateDetailByProdTempId.htm',
          method : 'post',
          data : {
            ...data,
            prodTempId : this.$route.query.prodTempId,
          },
        }).then(() => {
          
        });
      },

      // 文件上传 覆盖
      handleCoverUpload(type) {
        let file = this.$refs[type].$el.querySelector('.el-upload__input');
        this.$confirm('已经存在模板，是否覆盖上传?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel',
          confirmButtonClass: 'confirm',
          center: true,
        }).then(() => {
          file.click();
        },() => {
        });
      },
      // 文件上传前 回调
      beforeAvatarUpload(file) {
        let fileType = file.name.split('.').pop().toLowerCase();
        let arr = ['doc','docx'];
        if(arr.indexOf(fileType) === -1){
          this.$message.error('文件格式有误');
          return false;
        }
        return true;
      },
      // 文件上传成功
      handleAvatarSuccess(response, file, fileList) {
        if(response.code !== '0000') {
          this.$message.warning(response.description);
        }else{
          this.$message.success('上传成功');
          this.init();
        }
      },
      /* 文件上传失败 回调 */
      fileError() {
        this.$message.error('文件上传失败，请稍后重试');
      },
      // 公式配置
      handleFormula() {
        this.$refs.formulaConfigDialog.show();
      },
    },
  }
</script>

<style lang="scss" scoped>

.tpl-setting-edit{
  .fn-hide{
    display: none!important;
  }
  .templateName{
    width: 100px;
  }
  .h-70{
    height: 41.5px;
  }
  .item-title{
    padding-top: 5px;
    padding-bottom: 5px;
  }
  .item-title-sign{
    margin-top: 12px;
    display: inline-block;
  }
  .is-required:before{
    content: '*';
    color: #f56c6c;
    margin-right: 4px;
  }

  .item-table{
    .m-time{
      color: #bbb;
      font-size: 12px;
    }
    .remarks{
      color: #bbb;
      width: 270px;
    }
    .m-template-list{
      padding: 15px 20px;
      border-bottom: 1px solid #ddd;
      overflow: hidden;
      .list-text{
        width: 110px;
        display: inline-block;
      }
      .upload-demo{
        display: inline-block;
      }
    }
    .m-template-list:last-child{
      border-bottom: none;
    }
  }
}

</style>