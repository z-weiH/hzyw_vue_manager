<template>
    <div class="pdf_html" v-if="pdfFlag">
      <div class="pdf_warpper">
        <div class="retrun_btn" @click="pdfFlag = false" style="cursor: pointer">
          <i class="el-icon-arrow-left"></i>
          返回
        </div>

        <div class="content" >
          <p class="left-title">切换样例</p>
          <div>
            <el-select @change="refreshHtml" class="html_select" popper-class="pdf_select" v-model="pdfSrc"  style="width: 100%;">
              <el-option
                v-for="(item,idx) in items"
                :key="idx"
                :value="item.pdfUrl"
                :label="item.resName">
              </el-option>
            </el-select>

          </div>
        </div>

        <iframe ref="iframe" style="cursor: pointer;"  :src="src.replace(/http:|https:/g,'')" scrolling="auto"   frameborder="0" ></iframe>

        <div ref="tap" class="tap">
          <div class="top">
            <span></span>
          </div>
          <span>ID: {{pId}}</span>
          <el-button size="mini" type="primary" @click="setPId">获取</el-button>
        </div>
      </div>



    </div>

</template>

<script>
export default {
  name: 'pdf_html',
  data(){
    return {
      pdfFlag: false,
      // src: 'http://filetest.arbexpress.cn/02104339-44bf-479f-a0ed-f9688cae160c.html',
      src: '',
      pId: '111',
      width: 0,
      items: [],
      item: {},
      pdfSrc: ''
    }
  },
  methods:{

    refreshHtml(){
      this.$http.post('/ruleBase/getHtmlUrlByPdf.htm',{url: this.pdfSrc}).then(res => {
        this.src = res.result;
      })
    },

    show(items){
      console.log(items);
      this.items = items;
      this.pdfSrc = items[0].pdfUrl;
      this.$http.post('/ruleBase/getHtmlUrlByPdf.htm',{url: items[0].pdfUrl}).then(res => {
        // if(window.location.href.indexOf('https') === 0){
        //   this.src = 'https' + res.result.substr(4);

          this.src = res.result;

        // }
        console.log(window.location.href,this.src);

        this.pdfFlag = true;
      })
    },
    setPId(){
      this.pdfFlag = false;
      this.$parent.setPid("'"+this.pId + "'");
    }



  },
  created(){
    window.addEventListener('message',(messageEvent) => {
      var data = messageEvent.data;// messageEvent: {source, currentTarget, data}
      // console.info('message from child:', JSON.parse(data));
      try{
        let obj = JSON.parse(data);
        if(obj){
          if(obj.id){
            this.pId = obj.id;
            this.$refs.tap.style.top = obj.offsetHeight + obj.offsetTop + 8 +'px';
            this.$refs.tap.style.left = (1200 - this.width) /2 + obj.offsetWidth/2 + obj.offsetLeft - 60 + 'px';
          }
         else{
            this.width = obj.width + 30;
            this.$refs.iframe.style.width = obj.width + 30 + 'px';
            this.$refs.iframe.style.height = obj.height + 100 +'px' ;
          }

        }
        console.log(this.$refs.iframe.scrollTop);

      }
      catch (e) {

      }

    })
  },
  mounted(){

  }
}

</script>

<style  lang="scss">
  .pdf_html{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow-y: scroll;
    background: #5C5C5C;
    z-index: 99999;
  .pdf_warpper {
    position: relative;
    z-index: 999999;
    width: 1200px;

    text-align: center;
    margin: 30px auto;
    .retrun_btn{
      position: absolute;
      left: 0;
      top: 0;
      padding: 18px 0;
      width: 160px;
      background: #fff;
      font-size: 16px;
    }
    .content{
      position: absolute;
      left: 0;
      top: 60px;
      width: 160px;
      .left-title{
        background: #fff;
        padding: 10px 0;
        color: #000;
        font-size: 16px;
        font-weight: bold;
      }
    }
  }

    .html_select{
      .el-input__inner{
        border-radius: 0 !important;
      }
    }
    .tap{
      position: absolute;
      top: -1000px;
      left: 400px;
      background: rgb(252,255,190);
      padding: 8px 10px;
      border: 1px solid #aaa;

      .top{
        position: absolute;
        top: -15px;
        left: calc(50% - 10px);
        display:block;
        width:0;
        height:0;
        border-width:0 10px 10px;
        border-style:solid;
        border-color:transparent transparent #aaa;
        position:absolute;
        top:-10px;
        left:50%;/* 三角形居中显示 */
        margin-left:-10px;/* 三角形居中显示 */
        span{
          display:block;
          width:0;
          height:0;
          border-width:0 10px 10px;
          border-style:solid;
          border-color:transparent transparent rgb(252,255,190);
          position:absolute;
          top:1px;
          left:-10px;
        }
      }
    }

  }

</style>
