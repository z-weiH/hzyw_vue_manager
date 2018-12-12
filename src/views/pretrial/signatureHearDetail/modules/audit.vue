<template>
  <el-dialog
    :visible.sync="show"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="'审核意见'"
    @open="HandleOpen"
    width="560px"
    center>
    <el-form>
      <el-form-item label="审核结果" label-width="100px" label-position="left">
        <el-select style="width: 300px;" v-model="status" >
          <el-option label="通过" :value="1"></el-option>
          <el-option label="未通过" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="audit" label="原因(多选)" prop="type" label-width="100px" v-if="status === 0">
        <el-input style="width: 300px;" v-model="filterValue" placeholder="请输入关键字搜索审核意见"></el-input>
        <el-checkbox-group v-model="reasonIds">
          <el-checkbox  v-for="(opt,index) in list" :key="index" :label="opt.reasonMsg" name="type"></el-checkbox>
          <!--<el-checkbox label="地推活动" name="type"></el-checkbox>-->
          <!--<el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
          <!--<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
        </el-checkbox-group>
        <p v-if="list.length === 0" style="text-align: center;width: 300px;padding: 10px;">未找到匹配的审核意见</p>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="HandleAuditConfirm">确 认</el-button>
          <el-button @click="$parent.editState = 0" >取 消</el-button>
      </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'audit',
  data() {
    return {
      status: 0,
      reasonIds: [],
      list: [],
      filterValue: ''
    }
  },
  props: {
    caseId: String,
    type: Number,
    selValue: null
  },
  watch:{
    'filterValue'(val,oldVal){
      if(val){
        this.list = this.list.filter(it=> it.reasonMsg.indexOf(val)!== -1);
      }else{
        this.list = this.clone(this.listClone);
      }
    }
  },
  methods: {
    //提交
    HandleAuditConfirm() {
      // console.log(this.reasonIds)



      let auditList = this.listClone.filter(it => this.reasonIds.indexOf(it.reasonMsg) !== -1);
      if(this.status === 0 && auditList.length === 0){
        return this.$message.error('请选择不通过原因');
      }
      if(this.status === 1){ //通过的话
        auditList = [];
      }
      this.$http.post('/firstAudit/auditConfirm.htm',{caseId: this.caseId,isPass: 1 - this.status,reasonIdList:auditList,type: this.type},{mheaders: true})
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
            this.$parent.editState = 0;
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
    HandleOpen() {
      this.filterValue = '';
      this.list = this.$parent.auditLists;
      this.listClone = this.clone(this.list);
      this.reasonIds = [];
      this.list.forEach(it => {
        if(it.reasonType === 1){
          this.reasonIds.push(it.reasonMsg);
        }
      })
      console.log(this.reasonIds);
        let arr = this.list.filter(it => it.reasonType === this.type);
        /* if(this.type === 2){
          this.status = 1;
        }
        else{
          this.status = this.selValue === 2 ? 0 : 1;
        } */
        if(this.$parent.activeItem.mmmType === 'sfz' && this.$parent.activeItem.auditListWrap && this.$parent.activeItem.auditListWrap.length === 0) {
          this.status = 1;
        }else if(this.$parent.activeItem.mmmType === 'qm' && this.$parent.activeItem.checkSignList && this.$parent.activeItem.checkSignList.length === 0) {
          this.status = 1;
        }else if(this.$parent.activeItem.mmmType === 'zjl' && this.$parent.activeItem.checkAuditList && this.$parent.activeItem.checkAuditList.length === 0) {
          this.status = 1;
        }else{
          this.status = 0;
        }
    }
  },
  computed:{
    show: {
      get: function () {
        return this.$parent.editState !== 0;
      },
      set: function (v) {
        if(!v)
          this.$parent.editState = 0
      }
    },

  },
}
</script>

<style scoped>

</style>
