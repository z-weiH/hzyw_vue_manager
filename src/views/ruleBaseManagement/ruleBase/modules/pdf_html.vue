<template>
    <div class="pdf_html" v-if="pdfFlag">
      <div class="pdf_warpper">
        <iframe id="iframe" name="iframe1" ref="iframe" style="cursor: pointer;"  :src="src"    frameborder="0" ></iframe>
      </div>
    </div>

</template>

<script>
  import $ from 'jquery'
export default {
  name: 'pdf_html',
  data(){
    return {
      pdfFlag: true,
      src: 'http://filetest.arbexpress.cn/02104339-44bf-479f-a0ed-f9688cae160c.html',
    }
  },
  methods:{
    show(item){
      this.$http.post('/ruleBase/getHtmlUrlByPdf.htm',{url: item.pdfUrl}).then(res => {
          this.src = res.result;
          this.pdfFlag = true;
          this.$nextTick( () => {
            this.$refs.iframe.style.width = '830px';
            this.$refs.iframe.style.height = '100vh';
            this.addListener();
          })
          // this.width = item.width+ 'px';

      })
    },
    addListener(){
      console.log(this.$refs.iframe.contentWindow);

      this.$refs.iframe.contentWindow.document.addEventListener('click',(e) => {
        console.log(e, e.target);
      })
    },
    listener(e){
      console.log(e);
    }

  },
  mounted(){
    this.$refs.iframe.style.width = '830px';
    this.$refs.iframe.style.height = '100vh';
    setTimeout(() => {
      // console.log('over');
      // console.log(this.$refs.iframe.contentWindow.document);
      // this.$refs.iframe.contentWindow.document.appendChild()
      // this.$refs.iframe.contentWindow.document.addEventListener('click',(e) => {
      //   console.log(e, e.target);
      // })
      console.log($("#iframe").contents())

    },2000)

  }
}

</script>

<style scoped lang="scss">
  .pdf_html{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow-y: scroll;
    background: #fff;
    z-index: 99999;
  .pdf_warpper {
    z-index: 999999;
    width: 1200px;
    text-align: center;
    margin: 30px auto;
    iframe{
      margin: 0 auto;
    }
  }
  }

</style>
