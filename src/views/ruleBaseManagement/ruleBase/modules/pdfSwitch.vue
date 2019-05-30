<template>
    <div class="pdfSwitch" v-if="pdfFlag">

        <div class="iframe-warpar">
          <iframe :src="pdfUrl.replace(/http:|https:/g,'')" frameborder="0" scrolling="no"></iframe>
          <div class="content">
            <div class="">
              <el-select popper-class="pdf_select" v-model="pdfUrl"  style="width: 190px;">
                <el-option
                  v-for="(item,idx) in pdfList"
                  :key="idx"
                  :value="item.pdfUrl"
                  :label="item.resName">
                </el-option>
              </el-select>
            </div>

            <div class="mt60">
              <el-input type="text" placeholder="前面的文字" style="width: 190px;" v-model="form.beforeValue"></el-input>
            </div>

            <div class="mt20">
              <el-input type="text" placeholder="后面的文字" style="width: 190px;" v-model="form.afterValue"></el-input>
            </div>

            <div class="mt20" v-if="data.ruleType === 2">
              <el-input type="number" placeholder="保留小数位数" style="width: 190px;" v-model="form.num"></el-input>
            </div>

            <div class="mt20">
              <el-input type="textarea" style="width: 190px;" :rows="4" placeholder="值" v-model="form.result"></el-input>
            </div>

            <div class="mt20" style="text-align: center">
              <customer-button @click="handleSubmit" style="width: 190px">确定</customer-button>
            </div>
            <div class="mt20">
              <customer-button @click="pdfFlag = false" style="width: 190px">取消</customer-button>
            </div>

          </div>



        </div>

    </div>
</template>

<script>
export default {
  name: 'pdfSwitch',
  data(){
    return {
      pdfUrl: '',
      pdfFlag: false,
      pdfList: [],
      data: {},
      form: {}
    }
  },
  watch:{
    'form.beforeValue'(val,oldval){
      this.getPdfValue();
    },
    'form.afterValue'(val,oldval){
      this.getPdfValue();
    },
    'form.num'(val,oldval){
      this.getPdfValue();
    }

  },
  methods: {
    handleSubmit(){

      let result = `, "${this.form.beforeValue}", "${this.form.afterValue}"`;
      if(this.data.ruleType === 2){
        result += `, "${this.form.num}"`;
      }
      this.$emit("over", result);
      this.pdfFlag = false;
    },

    getPdfValue(){
      if(!this.form.beforeValue || !this.form.afterValue){
        return;
      }
      else if(!this.form.num && this.data.ruleType === 2){
        return;
      }
      this.$http({
        method: 'post',
        url: '/pdfValues/getPdfValues.htm',
        data: {
          pdfUrl: this.pdfUrl,
          methodName: this.data.functionName,
          ...this.form,
        }
      }).then(res => {
          this.form.result = res.result;
      })
    },

    show (obj) {
      this.pdfFlag = true;
      this.pdfList = obj;
      this.pdfUrl= obj[0].pdfUrl;
    },
    init(data){
      console.log(data);
      this.data = data;
      this.form = {result: ''};
      const loading =this.$loading({
        lock: true,
        text: '正在加载...',
        fullscreen: true,
        spinner: 'el-icon-loading',
        background: "hsla(0,0%,100%,.9)"
      });
      this.$http.post("/ruleBase/queryPdfUrlAndWithHigh.htm",{levelId: data.levelId, pdfParam: data.pdfParam}).then(res => {
        loading.close();
        this.show(res.result);
        // window.open(res.result.pdfUrl, '_blank');
      }).catch(() => {
        loading.close()
      })
    }
  },
  created () {

  }

}
</script>

<style lang="scss">
  .el-select-dropdown.el-popper.pdf_select{
    z-index: 200000 !important;
  }
  .pdfSwitch{
    .mt60{
      margin-top: 60px;
    }
    .mt20{
      margin-top: 20px;
    }

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: #5C5C5C;
    z-index: 2222;
    .iframe-warpar{
      position: relative;
      margin: 0 auto;
      width: 100%;
      height: auto;
      .content{
        position: absolute;
        top:64px;
        margin-right: 10px;
        right:21px;
      }
      iframe{
        width: 100%;
        height: 100vh;
      }
    }
  }
</style>
