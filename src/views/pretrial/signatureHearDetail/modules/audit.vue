<template>
  <el-dialog
    :visible.sync="show"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :title="'审核意见'"
    width="560px"
    center>
    <el-form>
      <el-form-item label="审核结果" label-width="100px" label-position="left">
        <el-select v-model="status" >
          <el-option label="通过" :value="1"></el-option>
          <el-option label="未通过" :value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="audit" label="原因(多选)" prop="type" label-width="100px" v-if="status === 0">
        <el-checkbox-group v-model="reasonIds">
          <el-checkbox :checked="Boolean(opt.reasonType)" v-for="(opt,index) in list" :key="index" :label="opt.reasonMsg" name="type"></el-checkbox>
          <!--<el-checkbox label="地推活动" name="type"></el-checkbox>-->
          <!--<el-checkbox label="线下主题活动" name="type"></el-checkbox>-->
          <!--<el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>-->
        </el-checkbox-group>
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
      reasonIds: []
    }
  },
  props: {
    caseId: String
  },
  methods: {
    //提交
    HandleAuditConfirm() {
      let auditList = this.list.filter(it => this.reasonIds.indexOf(it.reasonMsg) !== -1);
      this.$http.post('/firstAudit/auditConfirm.htm',{caseId: this.caseId,checkedReasons: auditList, type: 1})
        .then(res => {
          if(res.code === '0000'){
            this.$message.success(res.description);
            console.log(res);
          }
        })
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
    //获取父页面的审核原因
    list() {
      return this.$parent.auditLists;
    }
  },
  updated() {
    if(this.list.filter(it => it.reasonType === 1).length == 0 )
      this.status = 1;
    this.status = 0;
  }
}
</script>

<style scoped>

</style>
