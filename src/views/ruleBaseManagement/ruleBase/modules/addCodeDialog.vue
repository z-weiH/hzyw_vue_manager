<template>
  <el-dialog
    ref="dialog"
    title="添加审核意见"
    :visible.sync="dialogVisible"
    width="500px"
    @close="handleClose"
  >
    <div class="m-content">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
        <el-form-item  label="公司：" prop="clientCode" >
          <el-select disabled v-model="ruleForm.clientCode">
            <el-option v-for="(item, idx) in companyList" :key="idx" :label="item.merchantName" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模块：" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择模块">
            <el-option label="身份证审核" value="0"></el-option>
            <el-option label="签名意见" value="1"></el-option>
            <el-option label="证据意见" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编码" prop="code">
          <el-input disabled type="text" v-model="ruleForm.code" />
        </el-form-item>

        <el-form-item label="审核意见" prop="reasonMsg">
          <el-input type="textarea" v-model="ruleForm.reasonMsg" />
        </el-form-item>
      </el-form>
    </div>

    <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit" :disabled="canClick">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
  </el-dialog>
</template>

<script>
    export default {
      name: 'addCodeDialog',
      data() {
        return {
          dialogVisible : false,
          companyList: [],
          ruleForm : {
            // 审核意见
            type: '',
            code: '--',
            reasonMsg : '',
          },
          rules : {
            type: [
              {required : true , message : '请选择模块' , trigger : 'blur'}
            ],
            reasonMsg : [
              {required : true , message : '请输入审核意见' , trigger : 'blur'}
            ]
          },
          clientObj: {}
        }
      },
      computed:{
        canClick(){
          return !this.ruleForm.type || this.ruleForm.code === '--' || !this.ruleForm.reasonMsg;
        }
      },
      watch: {
        'ruleForm.type'(val,oldval){
          if(val){
            this.$http.post("/reason/queryCodeByType.htm",{type: val,clientCode: this.ruleForm.clientCode, codeIndex: this.companyList.find(it => it.code === this.ruleForm.clientCode).codeIndex}).then(res => {
              this.ruleForm.code = res.result;
            })
          }
        }
      },
      created(){
        this.$http.post("/reason/queryPreMerchantNameWithReason.htm").then(res => {
          this.companyList = res.result;
        });
      },
      methods: {
        init(obj){
          this.clientObj = obj;
          this.dialogVisible = true;
          this. ruleForm = {
            type: '',
            code: '--',
            reasonMsg : '',
            clientCode: obj.clientCode
          };
        },
        // 点击关闭
        handleClose() {
          this.dialogVisible = false;
          this.$refs.ruleForm.resetFields();
        },
        // 点击 提交
        handleSubmit() {
          this.$refs.ruleForm.validate((valid) => {
            if(valid) {
              this.$http({
                method : 'post',
                url : '/reason/addCause.htm',
                data : {
                  negReasonMsg : this.ruleForm.reasonMsg,
                  reasonType : this.ruleForm.type,
                  code: this.ruleForm.code,
                },
              }).then((res) => {
                this.$message.success('添加成功');
                this.$parent.currentList.push({module: +this.ruleForm.type,returnCode: this.ruleForm.code,desc: this.ruleForm.reasonMsg});
                let compare2 = (a,b) => {
                  if(a.module != b.module){
                    return a.module - b.module;
                  }else{
                    return Number(a.returnCode) - Number(b.returnCode);
                  }
                }
                this.$parent.currentList.sort(compare2);
                this.handleClose();

                console.log(this.$parent.currentList);
              });
            }
          });
        },
      }
    }
</script>

<style scoped>

</style>
