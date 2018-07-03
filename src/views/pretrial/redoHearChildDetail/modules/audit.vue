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
        <el-checkbox-group v-model="reasonIds">
          <el-checkbox v-for="(opt,index) in list" :key="index" :label="opt.reasonMsg" name="type"></el-checkbox>
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
  export default {
    data() {
      return {
        status:0,
        reasonIds:"",
        list:[]
      };
    },
    methods: {
      HandleOpen() {},
      HandleAuditConfirm(){

      },
      closeFoo() {}
    },
    computed: {
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

<style scoped lang="scss">

</style>
