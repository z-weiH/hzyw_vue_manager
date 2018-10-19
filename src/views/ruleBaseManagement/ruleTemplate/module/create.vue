<template>
  <el-dialog
    :visible.sync="show"
    v-dialogDrag
    :title="title"
    @open="resetForm"
    width="595px"
    center>
    <el-form :rules="rules" ref="ruleForm" :model="ruleForm" :label-width="'80px'">
      <el-form-item label="描述：" prop="templateDesc">
        <el-input
          placeholder="请填写描述"
          v-model.trim="ruleForm.templateDesc">
        </el-input>
      </el-form-item>
    </el-form>
    <div class="text_warpar">
      <div class="label">
        规则模版：
      </div>
      <div class="textarea">
        <gz-textarea ref="textarea" :width="463" :height="200" v-model="ruleForm.templateInfo" @valueChange="textAreaChange"></gz-textarea>
        <div class="el-form-item__error" style="position: inherit;" v-if="show_error">请输入规则模版</div>
      </div>
    </div>
    <div slot="footer">
      <el-button type="primary" :disabled="disabled" @click="handleClick">保存并关闭</el-button>
      <el-button @click="show = false;">取消</el-button>
    </div>

  </el-dialog>
</template>

<script>
import gzTextarea from '@/components/gzTextarea'
export default {
  name: 'create',
  components:{
    gzTextarea
  },
  data(){
    return {
      disabled: false,
      title: '',
      show: false,
      rules: {
        templateDesc: [
          { required : true , message : '请输入描述' , trigger : 'blur'},
        ]
      },
      ruleForm: {templateDesc: '',templateInfo: ''},
      show_error: false
    }
  },
  methods:{
    init(id){
      if(!id){
        this.title='添加规则模版';
        this.ruleForm = {templateDesc: '',templateInfo: ''};
        this.disabled = false;
        this.show= true;
      }else{
        this.title = "编辑规则模版";
        this.$http.post("/ruleTem/queryRuleTemplateDetails.htm",{id: id}).then(res => {
          console.log(res);
          this.ruleForm = res.result;
          this.disabled = false;
          this.show = true;
        })
      }

    },
    resetForm(){
      this.$refs.ruleForm.clearValidate();
      this.show_error = false;
    },
    textAreaChange(val){
      console.log(val,'get');
      this.ruleForm.templateInfo = val;
      if(!val)
        this.show_error = true;
      else{
        this.show_error = false;
      }
    },
    handleClick(){
      this.$refs.ruleForm.validate(() => {

      })
      this.textAreaChange(this.$refs.textarea.getVal());
      if(!this.ruleForm.templateInfo || !this.ruleForm.templateDesc){
        return ;
      }else{
        if(!this.disabled){
          this.$http.post("/ruleTem/saveRuleTemplateInfoById.htm",this.ruleForm).then(res => {
            this.$message.success("保存模版成功");
            this.disabled = true;
            this.show = false;
            this.$nextTick(() => {
              this.$parent.doQuery(this.$parent.queryUrl, this.$parent.searchItem)
            })

          })
        }

      }
    }
  }

}
</script>

<style scoped lang="scss">
  .text_warpar{
    &::after{
      content: '';
      clear: both;
      display: block;
    }
    .label{
      float: left;
      width: 80px;
    }
    .textarea{
      float: left;
    }
  }

</style>
