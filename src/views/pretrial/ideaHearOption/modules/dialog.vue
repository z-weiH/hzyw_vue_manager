<template>
  <div class="idea-hear-option-dialog">
    <el-dialog
      ref="dialog"
      :title="status === 'add' ? '添加审核意见' : '修改审核意见'"
      :visible.sync="dialogVisible"
      width="500px"
      @close="handleClose"
    >
      <div class="m-content">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-form-item  label="公司" prop="clientCode">
            <el-select :disabled="edittype === 'edit'" v-model="ruleForm.clientCode" @change="selectChange">
              <el-option v-for="(item, idx) in companyList" :key="idx" :label="item.merchantName" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :disabled="edittype === 'edit'" label="模块" prop="type">
            <el-select  v-model="ruleForm.type" @change="selectChange">
              <el-option label="身份证审核" value="0"></el-option>
              <el-option label="签名意见" value="1"></el-option>
              <el-option label="证据意见" value="2"></el-option>
            </el-select>
            <!--{{-->
              <!--type === '0' ? '身份证审核' :-->
              <!--type === '1' ? '签名意见' :-->
              <!--type === '2' ? '证据意见' : ''-->
            <!--}}-->
          </el-form-item>
          <el-form-item label="编码" prop="code" >
            <el-input disabled type="text" v-model="ruleForm.code" />
          </el-form-item>

          <el-form-item label="审核意见" prop="reasonMsg">
            <el-input type="textarea" v-model="ruleForm.reasonMsg" />
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit" :disabled="!ruleForm.code">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props : {
      type : String,
    },
    data() {
      return {
        dialogVisible : false,
        status : 'add', // add or edit

        ruleForm : {
          // 审核意见
          reasonMsg : '',
          clientCode: '',
          type: null
        },
        rules : {
          clientCode: [
            {required : true , message : '请选择公司' , trigger : 'blur'}
          ],
          type: [
            {required : true , message : '请选择模块' , trigger : 'blur'}
          ],
          reasonMsg : [
            {required : true , message : '请输入审核意见' , trigger : 'blur'}
          ]
        },
        reasonId : '',
        companyList: [], //公司列表
        edittype: ''
      }
    },
    mounted() {
      // 解决 dialog初始化问题
      this.$refs.dialog.rendered = true;
    },
    watch: {
      // 'ruleForm.clientCode'(val,oldval){
      //
      // },
      // 'ruleForm.type'(val,oldval){
      //   if(this.ruleForm.clientCode && this.ruleForm.type){
      //     this.queryCode({type: this.ruleForm.type, clientCode: this.ruleForm.clientCode, codeIndex: this.companyList.find(it => it.code === this.ruleForm.clientCode).codeIndex}).then(res => {
      //       this.$set(this.ruleForm, 'code',res.result);
      //     })
      //   }
      // },
    },
    methods : {



      //刷新编码
      selectChange() {
        console.log(this.ruleForm)
        if(this.ruleForm.clientCode && this.ruleForm.type){
          this.queryCode({type: this.ruleForm.type, clientCode: this.ruleForm.clientCode, codeIndex: this.companyList.find(it => it.code === this.ruleForm.clientCode).codeIndex}).then(res => {
            this.$set(this.ruleForm, 'code',res.result);
          })
        }
      },

      //获取编码
      queryCode(obj){
        let { type,clientCode,codeIndex } = obj;
        return this.$http.post("/reason/queryCodeByType.htm",{type: type, clientCode: clientCode, codeIndex: codeIndex}).then(res => {
          return res;
        })
      },
      show(type,row) {
        this.edittype = type;
        this.ruleForm.type = this.type;
        this.status = type;
        this.dialogVisible = true;
        //查询code值
        if(type === 'edit'){
          console.log(row);
          this.ruleForm.clientCode = row.clientCode;
          this.reasonId = row.reasonId;
          this.ruleForm.reasonMsg = row.negReasonMsg;
          this.ruleForm.code = row.code;
        }else{
          this.queryCode({type: this.type, clientCode: row.code, codeIndex: row.codeIndex}).then(res => {
            this.ruleForm.clientCode = row.code;
            if(res.code === '0000'){
              this.$set(this.ruleForm, 'code',res.result);
            }
          })
          this.reasonId = '';
        }
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
                clientCode: this.ruleForm.clientCode,
                reasonType : this.ruleForm.type,
                reasonId : this.reasonId,
                code: this.ruleForm.code,
                clientName: this.companyList.find(it => it.code === this.ruleForm.clientCode).merchantName,
                codeIndex: this.companyList.find(it => it.code === this.ruleForm.clientCode).codeIndex,
              },
            }).then((res) => {
              this.$message.success('操作成功');
              this.handleClose();
              this.$emit('successCBK');
            });
          }
        });
      },
    },
    created(){
      this.$http.post("/reason/queryPreMerchantNameWithReason.htm").then(res => {
        this.companyList = res.result;
      });
    }
  }
</script>

<style lang="scss" scoped>

.idea-hear-option{

}

</style>
