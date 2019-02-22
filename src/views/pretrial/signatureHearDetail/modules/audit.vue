<template>
  <el-dialog
    :visible.sync="flag"
    v-dialogDrag
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="'审核意见'"
    class="audit"
    width="560px"
    center>
    <el-form>
      <el-form-item label="审核结果" label-width="100px" label-position="left">
        <!--<el-select style="width: 300px;" v-model="status" >-->
          <!--<el-option label="通过" :value="1"></el-option>-->
          <!--<el-option label="未通过" :value="0"></el-option>-->
        <!--</el-select>-->
        <el-radio v-model="status" :label="1">通过</el-radio>
        <el-radio v-model="status" :label="2">未通过</el-radio>
      </el-form-item>
      <el-form-item class="audit" label="原因(多选)" prop="type" label-width="100px" v-if="status === 2">
        <el-input style="width: 400px;" v-model="filterValue" placeholder="请输入关键字搜索审核意见"></el-input>
        <el-radio-group class="self_group" v-model="tab" style="margin-bottom: 30px;" v-if="!filterValue">
          <el-radio-button  :label="0">{{resObj.clientName}}</el-radio-button>
          <el-radio-button :label="1">公共</el-radio-button>
        </el-radio-group>
        <el-checkbox-group v-model="reasonIds">
          <el-checkbox  v-for="(opt,index) in resObj.publicRes" v-if="tab === 1 && !filterValue" :key="index" :label="opt.reasonId" name="type">{{opt.reasonMsg}}</el-checkbox>
          <p v-if="tab === 1 && !filterValue && resObj.publicRes.length === 0" style="text-align: center;width: 300px;padding: 10px;">未找到匹配的审核意见</p>

          <el-checkbox  v-for="(opt,index) in resObj.privateRes" v-if="tab === 0 && !filterValue" :key="index" :label="opt.reasonId" name="type">{{opt.negReasonMsg}}</el-checkbox>
          <p v-if="tab === 0 && !filterValue && resObj.privateRes.length === 0" style="text-align: center;width: 300px;padding: 10px;">未找到匹配的审核意见</p>

          <template v-if="filterValue">
            <p class="checkbox_label">{{resObj.clientName}}</p>
            <el-checkbox  v-for="(opt,index) in filterObj.publicRes"  :key="index" :label="opt.reasonId" name="type">{{opt.reasonMsg}}</el-checkbox>
            <p class="checkbox_label">公共</p>
            <el-checkbox  v-for="(opt,index) in filterObj.privateRes"  :key="index" :label="opt.reasonId" name="type">{{opt.negReasonMsg}}</el-checkbox>

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

<script>
export default {
  name: 'audit',
  data() {
    return {
      resObj: {},
      resObjClone: [],
      flag: false,
      status: null,
      reasonIds: [],
      filterValue: '',
      filterObj: [],
      tab:null
    }
  },
  props: {
    type: Number,
    selValue: null
  },
  watch:{
    'filterValue'(val,oldVal){
      if(val){
        this.filterObj = {publicRes: this.resObj.publicRes.filter(it => it.reasonMsg.indexOf(val) > -1) , privateRes: this.resObj.privateRes.filter(it => it.negReasonMsg.indexOf(val) > -1)}
      }
    }
  },
  methods: {
    //提交
    HandleAuditConfirm() {

      console.log(this.reasonIds);
      let auditList = this.resObj.publicRes.filter(it => this.reasonIds.indexOf(it.reasonId) >= 0).concat(this.resObj.privateRes.filter(it => this.reasonIds.indexOf(it.reasonId) >= 0));
      if(this.status === 2 && this.reasonIds.length === 0){
        return this.$message.error('请选择不通过原因');
      }
      if(this.status === 1){ //通过的话
        auditList = [];
      }
      this.$http.post('/firstAudit/auditConfirm.htm',{caseId: this.resObj.caseId,isPass: this.status - 1,reasonIdList:auditList,type: this.type},{mheaders: true})
        .then(res => {
          if(res.code === '0000'){
            this.$message.success(res.description);
            //刷新审核结果
            this.$parent.handleCountQuery({check: this.$parent.disabled ? 0 : 1,subBatchNo:this.$parent.subBatchNo, type: this.type+1});
            // let keyStr= '';
            // if(this.type === 0){
            //   keyStr = 'idCardList.auditListWrap';
            // }
            // else if(this.type === 1){
            //   keyStr = 'signatureItems.checkSignList';
            // }
            // else if(this.type === 2){
            //   keyStr = 'evidenceItems.checkAuditList';
            // }
            // let keyArray = keyStr.split('.');
            // let item = this.$parent[keyArray[0]].find(it => it.caseId === this.$parent.currentCaseId);
            //
            // if(item){
            //   if(this.type === 0){
            //     item.idStatus = this.status === 0 ? 2 : 1;
            //     let arr = ['effctDateStatus','idaddressStatus','idcardStatus','nameStatus','nationStatus','sexStatus'];
            //     arr.map(key => {
            //       if(item.auditInfoWrap[key] != 3){
            //         item.auditInfoWrap[key] = 1;
            //       }
            //       // if(it.code && auditList.find(i => i.code === it.code)){
            //       //   it.auditStatus = 0;
            //       // }
            //       if(auditList.find(it => it.code == 1001)){
            //         item.auditInfoWrap.sexStatus = 0;
            //       }
            //       if(auditList.find(it => it.code == 1002)){
            //         item.auditInfoWrap.nationStatus = 0;
            //       }
            //       if(auditList.find(it => it.code == 1003)){
            //         item.auditInfoWrap.idaddressStatus = 0;
            //       }
            //       if(auditList.find(it => it.code == 1004)){
            //         item.auditInfoWrap.idcardStatus = 0;
            //       }
            //       if(auditList.find(it => it.code == 1005)){
            //         item.auditInfoWrap.effctDateStatus = 0;
            //       }
            //       if(auditList.find(it => it.code == 1000)){
            //         item.auditInfoWrap.nameStatus = 0;
            //       }
            //     })
            //   }
            //   else if(this.type === 1){
            //     item.signStatus = this.status === 0 ? 2 : 1;
            //     item.signAuditList.forEach(it => {
            //       it.auditStatus = 1;
            //       if(it.code && auditList.find(i => i.code === it.code)){
            //         it.auditStatus = 0;
            //       }
            //     })
            //   }
            //   item[keyArray[1]] = auditList;
            //
            // }
            // this.$parent.editState = 0;
            this.flag =false;
            this.$parent.HandleQuery();
          }
        })
    },

    clone(arr){
      let newArr = [];
      arr.forEach(it => {
        newArr.push({...it});
      })
      return newArr;
    },
    showInit(obj) {
      let {caseId, clientName, status, publicRes, privateRes} = obj;
      this.resObj = obj;
      this.flag= true;
      this.status = status;
      this.tab = 0;
      this.filterValue = '';
      // this.resObjClone = this.clone(publicRes).concat(this.clone(privateRes));
      this.reasonIds = [];
      privateRes.forEach(it => {
        if(it.isChecked === 1){
          this.reasonIds.push(it.reasonId);
        }
      })
      publicRes.forEach(it => {
        if(it.type === 1){
          this.reasonIds.push(it.reasonId);
          if(this.status === 1){
            this.status = 2;
          }
        }
      })
      this.resObjClone = JSON.parse(JSON.stringify(this.resObj));
    }
  },
  computed:{
    // show: {
    //   get: function () {
    //     return this.$parent.editState !== 0;
    //   },
    //   set: function (v) {
    //     if(!v)
    //       this.$parent.editState = 0
    //   }
    // },

  },
}
</script>

<style lang="scss">
.audit{

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
    margin-bottom: 0;
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
