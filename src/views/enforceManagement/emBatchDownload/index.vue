<template>
  <div class="emBatch-download">
    <div class="item-title of-hidden">
      <span class="item-title-sign">强制执行-材料选择</span>
      <div class="fr">
        <a class="cursor" @click="handleGoBack">返回&gt;&gt;</a>
      </div>
    </div>

    <div class="item-table">
      <div class="select-case">
        <p class="ft-20 fl case-num">已选择
          {{
            type === '2' ? caseIds.split(',').length : caseNum
          }}
        个案件</p>
        <div class="fr">
          <el-button :disabled="verifyChecked()" @click="handlePreview">预览</el-button>
          <el-button :disabled="verifyChecked()" @click="handleDownload" type="primary">拼接下载</el-button>
        </div>
      </div>

      <div class="choice-doc">
        <ul>
          <li class="doc-list">
            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全部</el-checkbox>
          </li>
           <!--if判断 暂时去除受委托人在仲裁代理中不收取报酬的承诺书 显示-->
          <!--<li v-if="item.value !== 'bsqbccns'" v-for="(item,index) in checkList" :key="index" class="doc-list">-->
            <!--<el-checkbox @change="handleChange" v-model="item.checked">{{item.label}}</el-checkbox>-->
          <!--</li>-->

          <li  v-for="(item,index) in checkList" :key="index" class="doc-list">
            <el-checkbox :disabled="item.disabled" @change="handleChange" v-model="item.checked">{{item.label}}</el-checkbox>
          </li>
        </ul>
      </div>
    </div>

    <timeDialog @successCBK="timeSuccess" ref="timeDialog"></timeDialog>
    <setDialog ref="setDialog"></setDialog>
  </div>
</template>

<script>
  import setDialog from './modules/setDialog.vue'
  import timeDialog from './modules/timeDialog.vue'
  import exportFile from '@/assets/js/exportFile.js'
  export default {
    components : {
      setDialog,
      timeDialog,
    },
    data() {
      return {
        caseIds : this.$route.query.caseIds,
        type : this.$route.query.type, // 2 强制执行案件点击进入 其他 为文书生成记录
        batchNo : this.$route.query.batchNo, // 批次号
        caseNum : this.$route.query.caseNum, // 批次号 案件数量

        //位置在授权委托书前, 营业执照、法人身份证正反面、法人代表人身份证明书

        //文书新增一份《债权转让确认书》，位置在《债权转让协议》后边，具体见附件1

        //文书在《限制高消费及纳入失信被执行人名单申请书》后，依次需要增加《限高名单申请书》（附件2）、《失信名单申请书-盖公章》（附件3）

        checkList : [
          {
            label : '强制执行申请书',
            value : 'qzzxsqs',
            checked : false,
          },
          {
            label : '关于被执行人财产状况说明',
            value : 'cczksm',
            checked : false,
          },
          {
            label : '营业执照',
            value : 'yyzz',
            checked : false,
          },
          {
            label : '法人身份证正反面',
            value : 'frsfzzfm',
            checked : false,
          },
          {
            label : '法定代表人身份证明书',
            value : 'frdbrsfzms',
            checked : false,
          },
          {
            label : '授权委托书',
            value : 'sqwts',
            checked : false,
          },
          {
            label : '劳动合同扫描件',
            value : 'ldhtsmj',
            checked : false,
          },
          {
            label : '被执行人身份证正反面',
            value : 'sfzzfm',
            checked : false,
          },

          {
            label : '裁决书封面',
            value : 'cjsfm',
            checked : false,
          },

          {
            label : '裁决书',
            value : 'cjs',
            checked : false,
          },


          {
            label : '债权转让协议',
            value : 'zqzrxy',
            checked : false,
            disabled : this.$route.query.disabled === 'true',
          },
          {
            label : '债权转让确认',
            value : 'zqzrqrs',
            checked : false,
            disabled : this.$route.query.disabled === 'true',
          },

          // {
          //   label : '受委托人在仲裁代理中不收取报酬的承诺书',
          //   value : 'bsqbccns',
          //   checked : false,
          // },
          {
            label : '收取执行款银行账户确认书',
            value : 'zxkyhzhqds',
            checked : false,
          },
          {
            label : '借款协议',
            value : 'jkxy',
            checked : false,
          },
          {
            label : '服务协议',
            value : 'fwxy',
            checked : false,
          },





          {
            label : '限制高消费及纳入失信被执行人名单申请书',
            value : 'xzgxfsms',
            checked : false,
          },
          {
            label : '限高名单申请书',
            value : 'xgmdsqs',
            checked : false,
          },
          {
            label : '失信名单申请书',
            value : 'sxmdsqs',
            checked : false,
          },
        ],
        isIndeterminate : false,
        checkAll : false,
      }
    },
    mounted() {
      // 根据批次号 获取案件id
      if(this.type !== '2') {
        this.$http({
          method : 'post',
          url : '/forceManager/queryFirstCaseIdByBatchNo.htm',
          data : {
            batchNo : this.batchNo,
          },
        }).then((res) => {
          this.caseIds = res.result;
        });
      }
    },
    methods : {
      // 点击返回
      handleGoBack() {
        if(this.type === '2') {
          this.$router.push({path : 'emEnforcementCases'})
        }else{
          this.$router.push({path : 'emGenerationRecord'})
        }
      },
      // 校验按钮 disabled
      verifyChecked() {
        return this.checkList.filter(v => v.checked).length === 0;
      },
      // 点击预览
      handlePreview() {
        // 预览前校验
        this.$http({
          method : 'post',
          url : '/forceManager/previewCaseDocPre.htm',
          data : {
            ...this.checkedStatus(),

            caseId : this.caseIds.split(',')[0],
          },
        }).then((res) => {
          // 扯淡需求
          if(res.result.settingIsOk === false && res.result.unSettingTemplateList.length === 0 && res.result.unSettingBankCardList.length > 0 && res.result.unSettingCourtNameList.length === 0 && res.result.unSettingClienteleList && res.result.unSettingClienteleList.length === 0 ) {
            this.$refs.setDialog.show(res.result);
            this.$refs.timeDialog.show({mtype:'yulan'});
          // 未配置
          }else if(res.result.settingIsOk === false) {
            this.$refs.setDialog.show(res.result);
          // 已配置选择预览时间
          }else{
            this.$refs.timeDialog.show({mtype:'yulan'});
          }
        });
      },
      // 点击拼接下载
      handleDownload() {
        let loading = this.$loading({
          text : '校验中'
        });
        // 预览前校验
        this.$http({
          method : 'post',
          url : '/forceManager/downloadDocsPre.htm',
          data : {
            ...this.checkedStatus(),

            caseIds : this.caseIds,
          },
          timeout : '0',
        }).then((res) => {
          loading.close();
          // 扯淡需求
          if(res.result.settingIsOk === false && res.result.unSettingTemplateList.length === 0 && res.result.unSettingBankCardList.length > 0 && res.result.unSettingCourtNameList.length === 0 && res.result.unSettingClienteleList && res.result.unSettingClienteleList.length === 0 ) {
            this.$refs.setDialog.show(res.result);
            this.$refs.timeDialog.show({mtype:'xiazai'});
          // 未配置
          }else if(res.result.settingIsOk === false) {
            this.$refs.setDialog.show(res.result);
          // 已配置选择预览时间
          }else{
            this.$refs.timeDialog.show({mtype:'xiazai'});
          }
        }).catch(() => {
          loading.close();
        });
      },
      // 获取选中状态
      checkedStatus() {
        let obj = {};
        this.checkList.map((v) => {obj[v.value] = v.checked});
        return obj;
      },
      // 全选事件
      handleCheckAllChange(val) {
        this.isIndeterminate = false;
        this.checkList = this.checkList.map(v => {
          if(!v.disabled) {
            v.checked = val;
          }
          return v;
        });
      },
      // 单个 change
      handleChange(val) {
        let checkLenth = this.checkList.filter(v => v.checked).length;
        this.isIndeterminate = checkLenth > 0 && checkLenth < this.checkList.length;
        this.checkAll = checkLenth === this.checkList.length;
      },

      // 时间dialog 回调
      timeSuccess(time,row) {
        // 预览逻辑
        if(row.mtype === 'yulan') {
          let win = window.open('');
          let loading = this.$loading({
            text : '预览生成中'
          });
          this.$http({
            method : 'post',
            url : '/forceManager/previewCaseDocPost.htm',
            data : {
              ...this.checkedStatus(),

              caseId : this.caseIds.split(',')[0],
              docDate : time,
            },
          }).then((res) => {
            loading.close();
            win.location.href = res.result;
          }).catch(() => {
            loading.close();
            win.close();
          });
        // 下载逻辑
        }else{
          // 强制执行案件 进入
          if(this.type === '2') {
            this.$http({
              method : 'post',
              url : '/forceManager/downloadDocsPost.htm',
              data : {
                ...this.checkedStatus(),

                caseIds : this.caseIds,
                docDate : time,
              },
            }).then((res) => {
              this.$message.success('操作成功');
              this.$router.push('emDownloadTask');
            });
          // 文书生成记录 进入
          }else{
            this.$http({
              method : 'post',
              url : '/forceManager/settingDocs.htm',
              data : {
                ...this.checkedStatus(),

                batchNo : this.batchNo,
                docDate : time,
                caseIds : this.caseIds,
              },
            }).then((res) => {
              this.$message.success('操作成功');
              this.$router.push('emDownloadTask');
            });
          }
        }
      },
    },
  }
</script>

<style lang="scss" scoped>

.emBatch-download{
  .ft-20{
    font-size: 16px;
  }
  .select-case{
    padding: 10px 20px;
    overflow: hidden;
    .case-num{
      line-height: 40px;
    }
    border-bottom: 1px solid #ccc;
  }
  .choice-doc{
    padding-left: 20px;
    margin-top: 20px;
    .doc-list{
      margin-bottom: 20px;
    }
  }
}

</style>
