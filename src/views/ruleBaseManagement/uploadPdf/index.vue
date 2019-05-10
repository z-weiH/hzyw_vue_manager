<template>
  <div class="uploadPdf">
    <p style="position:absolute;margin-top: 250px;font-weight: 700;
    font-style: normal;
    font-size: 28px;
    width: 100%;
    text-align: center;
    color: #CCCCCC;" v-if="!pdfUrl">请先上传证据</p>
    <iframe :src="pdfUrl" frameborder="0" width="100%" height="100%"></iframe>

    <div class="right-content">

      <el-upload
        class="upload-demo"
        :http-request="handleUpload"
        :show-file-list="false"
        action="123"
        accept=".pdf,.PDF"
      >
        <el-button >点击上传</el-button>
      </el-upload>

      <div class="mt20">
        <el-select v-model="form.methodName" clearable placeholder="请选择方法名称">
          <el-option
            v-for="item in methodOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </div>

      <div class="mt20">
        <el-input type="text" placeholder="前面的文字" style="width: 190px;" v-model="form.beforeValue"></el-input>
      </div>

      <div class="mt20">
        <el-input type="text" placeholder="后面的文字" style="width: 190px;" v-model="form.afterValue"></el-input>
      </div>

      <div class="mt20" v-if="form.methodName === 'getPdfNumByDigits'">
        <el-input type="number" placeholder="保留小数位数" style="width: 190px;" v-model="form.num"></el-input>
      </div>

      <div class="mt20">
        <el-input type="textarea" style="width: 190px;" :rows="4" placeholder="值" v-model="form.result"></el-input>
      </div>

      <div class="mt20">
        <el-input type="textarea" style="width: 190px;" readonly :rows="4" placeholder="规则结果" v-model="ruleResult"></el-input>
      </div>

      <div class="mt20">
        <el-button type="primary" style="margin-left: 30px;" @click="copyRule" :disabled="checkDisabled()">复制规则函数</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import copy from '@/assets/js/copy.js'
  export default {
    name: 'uploadPdf',
    data() {
      return {
        file: '',
        pdfUrl: '',
        form: {
          beforeValue: '',
          afterValue: '',
          num: '',
          result: '',
          methodName: 'getPdfString'
        },
        methodOptions: [
          // 'getPdfNum', 'getPdfDate', 'getPdfIdCard', 'getPdfString'
          {label: '取数字', value: 'getPdfNum'},
          {label: '取日期', value: 'getPdfDate'},
          {label: '取身份证', value: 'getPdfIdCard'},
          {label: '取字符串', value: 'getPdfString'},
          {label: '取小数', value: 'getPdfNumByDigits'},
        ]
      }
    },
    computed:{
      ruleResult(){
        return `${this.form.methodName}(证据名称, "${this.form.beforeValue}", "${this.form.afterValue}"${this.form.methodName === 'getPdfNumByDigits' ? ', '+ this.form.num : ''})`;
      }
    },
    watch: {
      'form.beforeValue'(){
        this.getResult();
      },
      'form.afterValue'(){
        this.getResult();
      },
      'form.num'(){
        this.getResult();
      }
    },
    methods: {
      handleUpload(obj) {
        let fileReader = new FileReader();
        fileReader.readAsDataURL(obj.file);
        this.file = obj.file;
        console.log(this.file,obj);
        fileReader.onload = (e ) => {
          // console.log(e.target.result);
          this.pdfUrl = e.target.result;
        }
      },
      getResult(){
        if(this.form.methodName !== 'getPdfNumByDigits' && this.form.beforeValue && this.form.afterValue){
          this.handleValueChange();
        }
        else if(this.form.methodName === 'getPdfNumByDigits' && this.form.beforeValue && this.form.afterValue && this.form.num){
          this.handleValueChange();
        }
      },
      handleValueChange(){
        let formData = new FormData();
        formData.append("file", this.file);

        Object.keys(this.form).forEach(key => {
          formData.append(key, this.form[key]);
        })
        console.log(formData)
        this.$http({
          url:'/pdfValues/getPdfValuesByInputStream.htm',
          method: 'post',
          data: formData,
          mheaders: true,
          header: {'Content-Type': 'multipart/form-data'}
        }).then(res => {
          console.log(res);
          this.form.result = res.result;
        })
      },
      checkDisabled(){
        if(!this.form.methodName || !this.form.beforeValue || !this.form.afterValue || (this.form.methodName === 'getPdfNumByDigits' && !this.form.num )){
            return true;
        }
        return false;
      },

      copyRule(){
          console.log(copy);
          copy(
            `${this.form.methodName}(证据名称, "${this.form.beforeValue}", "${this.form.afterValue}"${this.form.methodName === 'getPdfNumByDigits' ? ', '+ this.form.num : ''})`,
            () => {
              this.$message.success("规则已复制")
            }
          )
      }
    }
  }
</script>

<style lang="scss">
  .uploadPdf{
    position: relative;
    height: 100vh;
    .right-content{
      width: 250px;
      position: absolute;
      top: 50px;
      right: 0;
      min-height: 200px;
      .mt60{
        margin-top: 60px;
      }
      .mt20{
        margin-top: 20px;
      }
    }

  }
</style>
