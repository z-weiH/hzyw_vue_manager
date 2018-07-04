<template>
  <el-dialog :visible.sync="show" :title="'审核意见'" @open="HandleOpen" width="560px" center @close="closeFoo">
    <el-form>
      <el-form-item label="审核结果" label-width="100px" label-position="left">
        <el-select v-model="status">
          <el-option label="通过" :value="1"></el-option>
          <el-option label="未通过" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="audit" label="原因(多选)" prop="type" label-width="100px" v-if="status === 0">
        <el-checkbox-group @change="getReasonIds" v-model="reasonIds">
          <template v-for="(opt,index) in list2">
            <el-checkbox v-if="opt.mText !== void 0" :key="index + '' + opt.id" class="tit-label" :label="`${(
              opt.reasonType === 0 ? '身份证审核' :
              opt.reasonType === 1 ? '签名审核' :
              opt.reasonType === 2 ? '证据链审核' : ''
            )}`"></el-checkbox>
            <el-checkbox :key="index" :label="opt.reasonId" name="type" >{{opt.reasonMsg}}</el-checkbox>
          </template>
          <!--<el-checkbox label="地推活动" name="type"></el-checkbox>-->
          <!--<el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
          <!--<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
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
    props:{
      curCardObj:Object,
      auditOptsByCase:Object
    },
    data() {
      return {
        list2 : [],
        status:0,
        reasonIds:[],
        arrReasonIds:[]
      };
    },
    methods: {
      getReasonIds(list){
        let arr = [];
        this.auditOptsByCase.suggestions.map((v,k)=>{
          list.map((v1,k1) => {
            if(v.reasonId === v1) {
              v.reasonId && arr.push(v);
            }
          });
        });
        this.arrReasonIds = (arr);
        console.log('list--',arr);
      },
      HandleOpen() {
      },
      HandleAuditConfirm(){
        console.log("curCardObj::",this.curCardObj);
        this.$http({
          method : 'post',
          url : URL_JSON['saveChangeResReason'],
          mheaders : true,
          data : {
            caseId:this.curCardObj.caseId,
            suggestions:this.arrReasonIds,
          },
        }).then((res) => {
          console.log('提交审核原因内容：：：：',res.result);
        });
      },
      closeFoo() {
        this.$parent.auditLists = [];
      }
    },
    watch : {
      ['$parent.auditLists']() {
        let list = this.$parent.auditLists;
        let arr1 = list.filter(v => v.reasonType === 0);
        let arr2 = list.filter(v => v.reasonType === 1);
        let arr3 = list.filter(v => v.reasonType === 2);
        arr1[0] && (arr1[0].mText = arr1[0].reasonType);
        arr2[0] && (arr2[0].mText = arr2[0].reasonType);
        arr3[0] && (arr3[0].mText = arr3[0].reasonType);
        list = [].concat(arr1,arr2,arr3);
        this.list2 = list;
        console.log('非健康的减肥',list);
      },
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

.tit-label .el-checkbox__input{
  display: none;
}
.tit-label .el-checkbox__label{
  font-size: 16px;
  color: #606266!important;
  cursor: initial!important;
}

</style>
