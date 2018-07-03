

<template>
  <el-dialog :visible.sync="show" :title="'退回'" width="560px" center @close="closeFinish">
     <div class="dg_tit">
        您即将对本批案件执行复审退回操作，请填写退回原因。
     </div>
    <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
      <el-form-item label="退回原因" label-width="100px" label-position="left" prop="reasonText">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="ruleForm.reasonText">
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="cbackReason('ruleForm')">确 认</el-button>
            <el-button @click="$parent.rb_state = 0" >取 消</el-button>
        </span>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import { URL_JSON } from "../../../../components/script/url_json";
export default {
  name: "audit",
  props: {
    subBatchNo:String
  },
  data() {
    return {
      ruleForm: {
        reasonText: ""
      },
      rules: {
        reasonText: [
          {
            required: true,
            message: "必填项哦",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    cbackReason(fname) {
      this.$refs[fname].validate(valid => {
        if (valid) {
          this.$http.post(URL_JSON['savecaseReback'],{
            batchNo: this.subBatchNo,
            returnMsg:this.ruleForm.reasonText
          }).then(res=>{
            console.log(res);
            this.$parent.rb_state = 0;
            this.$message.success('退回成功');
          });

        } else {
          return false;
        }
      });
    },
    closeFinish() {
      this.$refs["ruleForm"].resetFields();
    }
  },
  computed: {
    show: {
      get: function() {
        return this.$parent.rb_state === 1;
      },
      set: function(v) {
        console.log(v);
        if (!v) {
          this.$parent.rb_state = 0;
        }
      }
    }
  }
};
</script>

<style scoped lang="scss">
.dg_tit {
  text-indent: 36px;
  margin-bottom: 20px;
}
</style>
