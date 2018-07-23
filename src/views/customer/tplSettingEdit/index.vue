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
      <div class="m-template-list h-70">
        <span class="mr-10 templateName ellipsis">{{ruleForm.prodTempName}}</span>
        <el-button @click="handleEnableOrDiscontinuation(0)" class="mr-10" type="warning" size="medium" round>
          {{ruleForm.templateStatus === 0 ? '停用' : '启用'}}
        </el-button>
        <span class="remarks ellipsis">
          {{ruleForm.remark}}
        </span>
        <span>仲裁服务费：</span>
        <el-select style="width:130px;" v-model="ruleForm.arbFeeStatus" class="mr-10">
          <el-option label="主张" :value="1"></el-option>
          <el-option label="不主张" :value="0"></el-option>
        </el-select>
        <span>仲裁程序：</span>
        <el-select style="width:130px;" v-model="ruleForm.arbProcedureDay">
          <el-option label="互金企业" :value="1"></el-option>
          <el-option label="普通程序" :value="5"></el-option>
        </el-select>
      </div>

      <div class="m-template-list">
        <el-row>
          <el-col :span="12">
            <div>
              <span class="is-required list-text">申请书：</span>
              <el-upload
                  class="upload-demo"
                  :action="`${$host}/file/upload.htm`"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :on-error="fileError"
                  :data="{
                    path : 'demo',
                    token : token,
                  }"
                >
                <el-button type="text">word上传</el-button>
              </el-upload>
              <el-button @click="handleWebpage" type="text" class="ml-10">网页编辑</el-button>
              <span class="m-time ml-10">
                {{ruleForm.applyUpdateTime || '待设置'}}
              </span>
            </div>
            <div>
              <span class="is-required list-text">标的金额：</span>
              <el-button @click="handleSet(1)" type="text">设置</el-button>
              <span class="m-time" style="margin-left:113px;">
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
                  {{ruleForm.applyStatus === 1 ? '启用' : '停用'}}
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
              <el-upload
                  class="upload-demo"
                  :action="`${$host}/file/upload.htm`"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :on-error="fileError"
                  :data="{
                    path : 'demo',
                    token : token,
                  }"
                >
                <el-button type="text">word上传</el-button>
              </el-upload>
              <el-button @click="handleWebpage" type="text" class="ml-10">网页编辑</el-button>
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
                  {{ruleForm.adjudeStatus === 1 ? '启用' : '停用'}}
                </el-button>
              </el-col>
            </el-row>
          </el-col>
      </div>

      <div class="m-template-list">
        <el-col :span="12">
            <div>
              <span class="list-text">强制申请书：</span>
              <el-upload
                  class="upload-demo"
                  :action="`${$host}/file/upload.htm`"
                  :show-file-list="false"
                  :before-upload="beforeAvatarUpload"
                  :on-error="fileError"
                  :data="{
                    path : 'demo',
                    token : token,
                  }"
                >
                <el-button type="text">word上传</el-button>
              </el-upload>
              <el-button @click="handleWebpage" type="text" class="ml-10">网页编辑</el-button>
              <span class="m-time ml-10">
                {{ruleForm.enforceUpdateTime || '待设置'}}
              </span>
            </div>
          </el-col>
          <el-col :span="12">
            <el-row>
              <el-col :span="18">
                <span class="list-text">执行标的：</span>
                <el-button @click="handleSet(3)" type="text">设置</el-button>
                <span class="m-time ml-20">
                  {{ruleForm.executeUpdateTime || '待设置'}}
                </span>
              </el-col>
              <el-col :span="6">
                <el-button @click="handleEnableOrDiscontinuation(3)" type="warning" size="medium" round>
                  {{ruleForm.enforceStatus === 1 ? '启用' : '停用'}}
                </el-button>
              </el-col>
            </el-row>
          </el-col>
      </div>
    </div>

    <!-- 设置 dialog -->
    <setDialog @successCBK="successCBK" ref="setDialog"></setDialog>
  </div>
</template>

<script>
  import setDialog from './modules/setDialog.vue'
  export default {
    components : {
      setDialog,
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
        },
      }
    },
    mounted() {
      this.init();
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
      // 点击返回
      handleGoBack() {
        this.$router.push(`tplSettingList?clientCode=${this.$route.query.clientCode}`);
      },
      //点击参数列表
      handleParameterList() {
        window.open(`//${window.location.host}/#/parameterList`,'_blank');
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
      handleWebpage() {
        this.$router.push('/webpageEditor');
      },
      // 点击证据设置
      handleEvidenceSetting() {
        this.$router.push('evidenceSetting');
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
          let name = (
            type === 1 ? '申请书' : 
            type === 2 ? '裁决书' : 
            type === 3 ? '强制申请书' : '模板'
          );
          let message = activeType === 1 ? name + '启用成功' : name + '停用成功';
          this.$message.success(message);
          this.init();
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
      /* 文件上传失败 回调 */
      fileError() {
        this.$message.error('文件上传失败，请稍后重试');
      },
    },
  }
</script>

<style lang="scss" scoped>

.tpl-setting-edit{
  .templateName{
    width: 100px;
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