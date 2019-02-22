<template>
  <el-dialog class="audit" :visible.sync="flag" :title="'审核意见'"  width="560px" center >
    <el-form>
      <el-form-item label="审核结果" label-width="100px" label-position="left">
        <el-radio v-model="status" :label="1">通过</el-radio>
        <el-radio v-model="status" :label="2">未通过</el-radio>
      </el-form-item>


      <!--<el-form-item class="audit" label="原因(多选)" prop="type" label-width="100px" v-if="status === 2">-->
        <!--<el-input style="width: 400px;" v-model="filterValue" placeholder="请输入关键字搜索审核意见"></el-input>-->
        <!--<el-checkbox-group  v-model="reasonIds">-->
          <!--<template v-for="(opt,index) in list2">-->
            <!--<el-checkbox v-if="opt.mText !== void 0" :key="index + '' + opt.id" class="tit-label" :label="`${(-->
              <!--opt.reasonType === 0 ? '身份证审核' :-->
              <!--opt.reasonType === 1 ? '签名审核' :-->
              <!--opt.reasonType === 2 ? '证据链审核' : ''-->
            <!--)}`"></el-checkbox>-->
            <!--<el-checkbox :key="index" :label="opt.reasonId" name="type" >{{opt.reasonMsg}}</el-checkbox>-->
          <!--</template>-->
        <!--</el-checkbox-group>-->
        <!--<p v-if="list2.length === 0" style="text-align: center;width: 300px;padding: 10px;">未找到匹配的审核意见</p>-->
      <!--</el-form-item>-->

      <el-form-item class="audit" label="原因(多选)" prop="type" label-width="100px" v-if="status === 2">
        <el-input style="width: 400px;" v-model="filterValue" placeholder="请输入关键字搜索审核意见"></el-input>
        <el-radio-group class="self_group" v-model="tab" style="margin-bottom: 30px;" v-if="!filterValue">
          <el-radio-button  :label="0">{{resObj.clientName}}</el-radio-button>
          <el-radio-button :label="1">公共</el-radio-button>
        </el-radio-group>
        <el-checkbox-group v-model="reasonIds">
          <template v-if="tab === 1 && !filterValue">
            <template>
              <p class="p_label">身份证</p>
              <el-checkbox  v-for="(opt,index) in resObj.publicRes.filter(it => it.reasonType === 0)" v-if=" !filterValue" :key="opt.reasonId" :label="opt.reasonId" name="type">{{opt.reasonMsg}}</el-checkbox>
              <p v-if="tab === 1 && !filterValue && resObj.publicRes.filter(it => it.reasonType === 0).length === 0" style="font-size: 14px;">无审核意见</p>
            </template>

            <template>
              <p class="p_label">签名</p>
              <el-checkbox  v-for="(opt,index) in resObj.publicRes.filter(it => it.reasonType === 1)" v-if="tab === 1 && !filterValue" :key="opt.reasonId" :label="opt.reasonId" name="type">{{opt.reasonMsg}}</el-checkbox>
              <p v-if="tab === 1 && !filterValue && resObj.publicRes.filter(it => it.reasonType === 1).length === 0" style="font-size: 14px;">无审核意见</p>
            </template>

            <template>
              <p class="p_label">证据链</p>
              <el-checkbox  v-for="(opt,index) in resObj.publicRes.filter(it => it.reasonType === 2)" v-if="tab === 1 && !filterValue" :key="opt.reasonId" :label="opt.reasonId" name="type">{{opt.reasonMsg}}</el-checkbox>
              <p v-if="tab === 1 && !filterValue && resObj.publicRes.filter(it => it.reasonType === 2).length === 0" style="font-size: 14px;">无审核意见</p>
            </template>
          </template>






          <template v-if="tab === 0 && !filterValue">
            <template>
              <p class="p_label">身份证</p>
              <el-checkbox  v-for="(opt,index) in resObj.privateRes.filter(it => it.reasonType === 0)" v-if="tab === 0 && !filterValue" :key="opt.reasonId" :label="opt.reasonId" name="type">{{opt.negReasonMsg}}</el-checkbox>
              <p v-if="tab === 0 && !filterValue && resObj.privateRes.filter(it => it.reasonType === 0).length === 0" style="font-size: 14px;">无审核意见</p>
            </template>

            <template>
              <p class="p_label">签名</p>
              <el-checkbox  v-for="(opt,index) in resObj.privateRes.filter(it => it.reasonType === 1)" v-if="tab === 0 && !filterValue" :key="opt.reasonId" :label="opt.reasonId" name="type">{{opt.negReasonMsg}}</el-checkbox>
              <p v-if="tab === 0 && !filterValue && resObj.privateRes.filter(it => it.reasonType === 1).length === 0" style="font-size: 14px;">无审核意见</p>
            </template>

            <template>
              <p class="p_label">证据链</p>
              <el-checkbox  v-for="(opt,index) in resObj.privateRes.filter(it => it.reasonType === 2)" v-if="tab === 0 && !filterValue" :key="opt.reasonId" :label="opt.reasonId" name="type">{{opt.negReasonMsg}}</el-checkbox>
              <p v-if="tab === 0 && !filterValue && resObj.privateRes.filter(it => it.reasonType === 2).length === 0" style="font-size: 14px;">无审核意见</p>
            </template>
          </template>




          <template v-if="filterValue">
            <p class="checkbox_label">{{resObj.clientName}}</p>
            <p class="p_label">身份证</p>
            <el-checkbox  v-for="(opt,index) in filterObj.privateRes.filter(it => it.reasonType === 0)"  :key="opt.reasonId" :label="opt.reasonId" name="type">{{opt.reasonMsg}}</el-checkbox>
            <p v-if=" filterObj.privateRes.filter(it => it.reasonType === 0).length === 0" style="font-size: 14px;">无审核意见</p>
            <p class="p_label">签名</p>
            <el-checkbox  v-for="(opt,index) in filterObj.privateRes.filter(it => it.reasonType === 1)"  :key="opt.reasonId" :label="opt.reasonId" name="type">{{opt.reasonMsg}}</el-checkbox>
            <p v-if=" filterObj.privateRes.filter(it => it.reasonType === 1).length === 0" style="font-size: 14px;">无审核意见</p>
            <p class="p_label">证据链</p>
            <el-checkbox  v-for="(opt,index) in filterObj.privateRes.filter(it => it.reasonType === 2)"  :key="opt.reasonId" :label="opt.reasonId" name="type">{{opt.reasonMsg}}</el-checkbox>
            <p v-if=" filterObj.privateRes.filter(it => it.reasonType === 2).length === 0" style="font-size: 14px;">无审核意见</p>


            <p class="checkbox_label">公共</p>
            <p class="p_label">身份证</p>
            <el-checkbox  v-for="(opt,index) in filterObj.publicRes.filter(it => it.reasonType === 0)"  :key="index" :label="opt.reasonId" name="type">{{opt.reasonMsg}}</el-checkbox>
            <p v-if=" filterObj.publicRes.filter(it => it.reasonType === 0).length === 0" style="font-size: 14px;">无审核意见</p>
            <p class="p_label">签名</p>
            <el-checkbox  v-for="(opt,index) in filterObj.publicRes.filter(it => it.reasonType === 1)"  :key="index" :label="opt.reasonId" name="type">{{opt.reasonMsg}}</el-checkbox>
            <p v-if=" filterObj.publicRes.filter(it => it.reasonType === 1).length === 0" style="font-size: 14px;">无审核意见</p>
            <p class="p_label">证据链</p>
            <el-checkbox  v-for="(opt,index) in filterObj.publicRes.filter(it => it.reasonType === 2)"  :key="index" :label="opt.reasonId" name="type">{{opt.reasonMsg}}</el-checkbox>
            <p v-if=" filterObj.publicRes.filter(it => it.reasonType === 2).length === 0" style="font-size: 14px;">无审核意见</p>

          </template>


          <!--<el-checkbox label="地推活动" name="type"></el-checkbox>-->
          <!--<el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
          <!--<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
        </el-checkbox-group>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="HandleAuditConfirm">确 认</el-button>
            <el-button @click="flag = false" >取 消</el-button>
        </span>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import { URL_JSON } from "./../../../../components/script/url_json";
export default {
  props: {
    curCardObj: Object,
    auditOptsByCase: Object
  },
  data() {
    return {
      status: null,
      resObj: {},
      reasonIds: [],
      filterValue:'',
      filterObj: {},
      flag: false,
      tab:null
    };
  },
  watch: {
    'filterValue'(val,oldval){
      if(val){
        this.filterObj = {publicRes: this.resObj.publicRes.filter(it => it.reasonMsg.indexOf(val) > -1) , privateRes: this.resObj.privateRes.filter(it => it.negReasonMsg.indexOf(val) > -1)}
      }
    }
  },

  methods: {

    show(obj) {
      let {status, clientName, publicRes, privateRes, caseId} = obj;
      this.reasonIds = [];
      privateRes.forEach(it => {
        if(it.isChecked === 1){
          this.reasonIds.push(it.reasonId);
        }
      })
      publicRes.forEach(it => {
        if(it.isChecked === 1){
          this.reasonIds.push(it.reasonId);
        }
      })

      this.resObj = obj;
      console.log(this.resObj)
      this.status = status;
      this.flag = true;
      this.tab = 0;
    },

    HandleAuditConfirm() {
      let auditList = this.resObj.publicRes.filter(it => this.reasonIds.indexOf(it.reasonId) >= 0).concat(this.resObj.privateRes.filter(it => this.reasonIds.indexOf(it.reasonId) >= 0));
      if(this.status && auditList.length == 0){
        return this.$message.error('请选择不通过原因');
      }
      if(this.status == 1){
        auditList = [];
      }
      auditList.forEach(it => {
        if(!it.reasonMsg){
          it.reasonMsg = it.negReasonMsg;
        }
      })
      this.$http.post("/againAudit/saveAuditSuggestion.htm",{caseId: this.resObj.caseId, suggestions: auditList},{mheaders: true}).then(res => {
            this.$message.success('保存成功');
            this.$parent.getRecheckDetail();
            this.$parent.queryCountAgainAuditCase({subBatchNo: this.$parent.subBatchId})
            this.flag= false;
      })


      // console.log("curCardObj::", this.curCardObj);
      // let _rids = this.arrReasonIds;
      // let _auditBj = {
      //   caseId: this.curCardObj.caseId,
      //   suggestions: this.status === 1 ? [] : _rids,
      // };
      //
      // let arr_idcard = _auditBj["suggestions"].filter(v => v.reasonType === 0);
      // let arr_sign = _auditBj["suggestions"].filter(v => v.reasonType === 1);
      // console.log("arr_idcard: ", arr_idcard);
      // console.log("arr_sign: ", arr_sign);
      // arr_idcard.forEach(el => {
      //   console.log(el);
      //   let _key = el.code;
      //   switch (_key) {
      //     case "ADDRESS":
      //       this.curCardObj.idCard.idaddressStatus = 0;
      //       console.log("ADDRESS");
      //       // this.notpassReasonView(el);
      //       break;
      //     case "NAME":
      //       this.curCardObj.idCard.nameStatus = 0;
      //       break;
      //     case "NATION":
      //       this.curCardObj.idCard.nationStatus = 0;
      //       break;
      //     case "IDCARD":
      //       this.curCardObj.idCard.idcardStatus = 0;
      //       break;
      //     case "GENDER":
      //       this.curCardObj.idCard.sexStatus = 0;
      //     case "EFFECT":
      //       this.curCardObj.idCard.effctDateStatus = 0;
      //       break;
      //     default:
      //       break;
      //   }
      // });
      // // ADDRESS(住址和身份证),
      // // SIGN,NAME(姓名和身份证),
      // // GENDER(性别和身份证),
      // // NATION(民族与身份证),
      // // IDCARD(身份证号与身份证)
      // // let base_address = arr_idcard.filter(v => v.code === "ADDRESS");
      // // let base_gender = arr_idcard.filter(v => v.code === "GENDER");
      // // let base_sign = arr_sign.filter(v => v.code === "SIGN");
      //
      // this.$http({
      //   method: "post",
      //   url: URL_JSON["saveChangeResReason"],
      //   mheaders: true,
      //   data: _auditBj
      // }).then(res => {
      //   if (res.code === "0000") {
      //     this.$parent.audit_state = 0;
      //     this.$message.success('保存成功');
      //     this.$parent.getRecheckDetail();
      //     this.$parent.queryCountAgainAuditCase({subBatchNo: this.$parent.subBatchId})
      //   } else {
      //     console.log("提交审核原因内容：：：：", res.result);
      //   }
      // });
    },

  },

};
</script>

<style lang="scss">
.tit-label .el-checkbox__input {
  display: none;
}
.tit-label .el-checkbox__label {
  font-size: 16px;
  color: #606266 !important;
  cursor: initial !important;
}
.audit{
  .p_label{
    color: #000;
    font-size: 15px;
    font-weight: bold;
  }

  .checkbox_label{
    color: #0F357F;
    font-size: 16px;
    font-weight: bold;
    &::before{
      display: inline-block;
      content: '';
      border-left: 6px solid #0F357F;
      height: 16px;
      margin-right: 6px;
      vertical-align: sub;
    }
  }

  .self_group{
    width: 400px;
    margin-top: 10px;
    margin-bottom: 0 !important;
    .el-radio-button{
      width: 50%;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      box-shadow: none !important;
      .el-radio-button__inner{
        width: 100%;
        box-shadow: none !important;
      }
    }
  }
}

</style>
