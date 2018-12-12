<template>
  <el-dialog :visible.sync="show" :title="'审核意见'" @open="HandleOpen" width="560px" center @close="closeFoo">
    <el-form>
      <el-form-item label="审核结果" label-width="100px" label-position="left">
        <el-select style="width: 300px;" v-model="status">
          <el-option label="通过" :value="1"></el-option>
          <el-option label="未通过" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="audit" label="原因(多选)" prop="type" label-width="100px" v-if="status === 0">
        <el-input style="width: 300px;" v-model="filterValue" placeholder="请输入关键字搜索审核意见"></el-input>
        <el-checkbox-group @change="getReasonIds" v-model="reasonIds">
          <template v-for="(opt,index) in list2">
            <el-checkbox v-if="opt.mText !== void 0" :key="index + '' + opt.id" class="tit-label" :label="`${(
              opt.reasonType === 0 ? '身份证审核' :
              opt.reasonType === 1 ? '签名审核' :
              opt.reasonType === 2 ? '证据链审核' : ''
            )}`"></el-checkbox>
            <el-checkbox :key="index" :label="opt.reasonId" name="type" >{{opt.reasonMsg}}</el-checkbox>
          </template>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="HandleAuditConfirm">确 认</el-button>
            <el-button @click="$parent.audit_state = 0" >取 消</el-button>
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
      list2: [],
      status: 0,
      reasonIds: [],
      arrReasonIds: [],
      filterValue:''
    };
  },

  methods: {
    getReasonIds(list) {
      console.error(list);
      let arr = [];
      this.auditOptsByCase.suggestions.map((v, k) => {
        list.map((v1, k1) => {
          if (v.reasonId === v1) {
            v.reasonId && arr.push(v);
          }
        });
      });
      this.arrReasonIds = arr;
      console.log("list--", arr);
    },
    HandleOpen() {
      setTimeout(() => {

        this.status = 1;
      let data = this.$parent.idCardList[0];
      if(
        data.idCard.failReasonList === 0 &&
        data.sign.signAuditList === 0 &&
        data.sign.checkSignList === 0
      ){
        this.status = 1;
      }else{
        this.status = 0;

        let arr = [];
        this.$parent.auditLists.forEach(it => {
          if(it.isChecked === 1){
            arr.push(it.reasonId);
          }
        })

        console.log(arr);
          this.getReasonIds(arr);
      }
      },500)

    },
    notpassReasonView(el) {
      let _failReasonArr = this.curCardObj.idCard.failReasonList;
      console.log("_failReasonArr: ",_failReasonArr);
      if (_failReasonArr != 0) {
        _failReasonArr.map((v, k) => {
          el.map((v1, k1) => {
            if (v.reasonMsg !== v1.reasonMsg) {
              let _obj = Object.assign({}, { reasonMsg: v1.reasonMsg });
              console.log("_obj: ", _obj);
              // this.curCardObj.idCard.failReasonList.push(_obj);
            } else {
              return false;
            }
          });
        });
      }else{
        let _obj = Object.assign({},{ reasonMsg: el.reasonMsg });
        console.log("_obj: ", _obj);
        this.curCardObj.idCard.failReasonList.push(_obj);

      }
    },
    HandleAuditConfirm() {
      console.log("curCardObj::", this.curCardObj);
      let _rids = this.arrReasonIds;
      let _auditBj = {
        caseId: this.curCardObj.caseId,
        suggestions: this.status === 1 ? [] : _rids,
      };

      let arr_idcard = _auditBj["suggestions"].filter(v => v.reasonType === 0);
      let arr_sign = _auditBj["suggestions"].filter(v => v.reasonType === 1);
      console.log("arr_idcard: ", arr_idcard);
      console.log("arr_sign: ", arr_sign);
      arr_idcard.forEach(el => {
        console.log(el);
        let _key = el.code;
        switch (_key) {
          case "ADDRESS":
            this.curCardObj.idCard.idaddressStatus = 0;
            console.log("ADDRESS");
            // this.notpassReasonView(el);
            break;
          case "NAME":
            this.curCardObj.idCard.nameStatus = 0;
            break;
          case "NATION":
            this.curCardObj.idCard.nationStatus = 0;
            break;
          case "IDCARD":
            this.curCardObj.idCard.idcardStatus = 0;
            break;
          case "GENDER":
            this.curCardObj.idCard.sexStatus = 0;
          case "EFFECT":
            this.curCardObj.idCard.effctDateStatus = 0;
            break;
          default:
            break;
        }
      });
      // ADDRESS(住址和身份证),
      // SIGN,NAME(姓名和身份证),
      // GENDER(性别和身份证),
      // NATION(民族与身份证),
      // IDCARD(身份证号与身份证)
      // let base_address = arr_idcard.filter(v => v.code === "ADDRESS");
      // let base_gender = arr_idcard.filter(v => v.code === "GENDER");
      // let base_sign = arr_sign.filter(v => v.code === "SIGN");

      this.$http({
        method: "post",
        url: URL_JSON["saveChangeResReason"],
        mheaders: true,
        data: _auditBj
      }).then(res => {
        if (res.code === "0000") {
          this.$parent.audit_state = 0;
          this.$message.success('保存成功');
          this.$parent.getRecheckDetail();
          this.$parent.queryCountAgainAuditCase({subBatchNo: this.$parent.subBatchId})
        } else {
          console.log("提交审核原因内容：：：：", res.result);
        }
      });
    },
    closeFoo() {
      this.$parent.auditLists = [];
    }
  },
  watch: {
    'filterValue'(val,oldval){
      if(val){
        let list = this.$parent.auditLists;
        let arr1 = list.filter(v => v.reasonType === 0 && v.reasonMsg.indexOf(val) !== -1);
        let arr2 = list.filter(v => v.reasonType === 1 && v.reasonMsg.indexOf(val) !== -1);
        let arr3 = list.filter(v => v.reasonType === 2 && v.reasonMsg.indexOf(val) !== -1);
        arr1[0] && (arr1[0].mText = arr1[0].reasonType);
        arr2[0] && (arr2[0].mText = arr2[0].reasonType);
        arr3[0] && (arr3[0].mText = arr3[0].reasonType);
        list = [].concat(arr1, arr2, arr3);
        this.list2 = list;
      }else{
        let list = this.$parent.auditLists;
        let arr1 = list.filter(v => v.reasonType === 0);
        let arr2 = list.filter(v => v.reasonType === 1);
        let arr3 = list.filter(v => v.reasonType === 2);
        arr1[0] && (arr1[0].mText = arr1[0].reasonType);
        arr2[0] && (arr2[0].mText = arr2[0].reasonType);
        arr3[0] && (arr3[0].mText = arr3[0].reasonType);
        list = [].concat(arr1, arr2, arr3);
        this.list2 = list;
      }
    },


    ["$parent.auditLists"]() {
      let list = this.$parent.auditLists;
      let arr1 = list.filter(v => v.reasonType === 0);
      let arr2 = list.filter(v => v.reasonType === 1);
      let arr3 = list.filter(v => v.reasonType === 2);
      arr1[0] && (arr1[0].mText = arr1[0].reasonType);
      arr2[0] && (arr2[0].mText = arr2[0].reasonType);
      arr3[0] && (arr3[0].mText = arr3[0].reasonType);
      list = [].concat(arr1, arr2, arr3);
      this.list2 = list;
      console.log("非健康的减肥", list);

      let _readyReasons = this.list2.filter(v=>{
        v.isChecked === 1
      });

      console.log("_readyReasons: ",_readyReasons);
    }
  },
  computed: {
    // list(){
    //   return this.$parent.auditLists;
    // },
    show: {
      get: function() {
        return this.$parent.audit_state === 1;
      },
      set: function(v) {
        console.log(v);
        if (!v) {
          this.$parent.audit_state = 0;
        }
      }
    }
  },
  components: {}
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
</style>
