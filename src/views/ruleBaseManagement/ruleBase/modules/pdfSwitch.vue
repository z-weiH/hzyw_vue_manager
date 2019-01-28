<template>
    <div class="pdfSwitch" v-if="pdfFlag">
      <div class="iframe-warpar">
        <iframe :src="pdfUrl.replace(/http:|https:/g,'')" frameborder="0"></iframe>
        <div class="content">
          <div class="fl">
            <el-select popper-class="pdf_select" v-model="pdfUrl"  style="width: 190px;">
              <el-option
                v-for="(item,idx) in pdfList"
                :key="idx"
                :value="item.pdfUrl"
                :label="item.resName">
              </el-option>
            </el-select>
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
      pdfList: []
    }
  },
  methods: {
    show (obj) {
      this.pdfFlag = true;
      this.pdfList = obj;
      this.pdfUrl= obj[0].pdfUrl;
    }
  },
  created () {
    const loading =this.$loading({
      lock: true,
      text: '正在加载...',
      fullscreen: true,
      spinner: 'el-icon-loading',
      background: "hsla(0,0%,100%,.9)"
    });
    this.$http.post("/ruleBase/queryPdfUrlAndWithHigh.htm",{levelId: this.$route.query.levelId, pdfParam: this.$route.query.pdfParam}).then(res => {
      loading.close();
      this.show(res.result);
      // window.open(res.result.pdfUrl, '_blank');
    }).catch(() => {
      loading.close()
    })
  }

}
</script>

<style lang="scss">
  .el-select-dropdown.el-popper.pdf_select{
    z-index: 200000 !important;
  }
  .pdfSwitch{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background: #5C5C5C;
    z-index: 99999;
    .iframe-warpar{
      position: relative;
      margin: 0 auto;
      width: 1200px;
      height: auto;
      .content{
        position: absolute;
        top:64px;
        right:21px;
      }
      iframe{
        width: 100%;
        height: 100vh;
      }
    }
  }
</style>
