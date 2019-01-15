<template>
  <div class="pdf-slector" v-show="pdfFlag">
    <div class="pdf_warpper">
      <div class="w-352 left-content">
        <div class="content">
          <p class="left-title">选中参数</p>
          <div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 5}"
              placeholder="请在pdf文档中选择矩形区域"
              v-model="pdfRange">
            </el-input>
          </div>
        </div>
        <div class="content mt-20">
          <p class="left-title">识别结果</p>
          <div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 5}"
              placeholder="请在pdf文档中选择矩形区域"
              v-model="pdfValue">
            </el-input>
          </div>
        </div>
        <div class="mt-20" >
          <div class="button" style="text-align: center;">
            <el-button  class="mr-35" @click="submitRes($event)">确 定</el-button>
            <el-button  class="mr-35" @click="refresh($event)">重新选择</el-button>
            <el-button @click="pdfFlag = false;">取 消</el-button>
          </div>
        </div>
        </div>

      <div class="fr right-content" :style="{'width': width}">
        <!--<input type="text" style="border:1px solid #aaa;" v-model="pageNum">-->
        <div class="title" style="height: 50px;line-height: 50px;text-align: center;background: #333333;color: #fff;margin-bottom: 10px;" :style="{'width': width}" >
          <div class="fl ml-10">
            <el-button size="mini" @click="onPrevPage">上一页</el-button>
          </div>
          <div class="fr mr-10">
            <el-button size="mini" @click="onNextPage">下一页</el-button>
            <!--<button @click="testPdf1">console</button>-->
          </div>
          {{pageNum}}/{{numpages}}
        </div>



        <!--一共{{}}页-->
        <div style="position:relative;margin-top: 60px;height: calc(100vh - 100px);overflow: auto;" id="canvas"  >
          <!--<pdf ref="pdf" style="width:595.3px;" src="../../../../../static/借款协议.pdf"-->
          <!--@num-pages="pageCount = $event"-->
          <!--&gt;</pdf>-->
          <canvas v-for="num in numpages" :key="num"  ref="canvas" :id="'the-canvas'+num" :style="{'width': width,'height': height}"></canvas>
          <!--<div class="resizeMe" id="testDiv" ref="testDiv">-->
            <!--<div id="innerNice" ref="innerNice">-->

          <pdfEditor key="edit1" ref="edit1" v-if="showEditor1"></pdfEditor>
          <pdfEditor key="edit2" ref="edit2" v-if="showEditor2"></pdfEditor>
            <!--</div>-->
          <!--</div>-->

        </div>

      </div>
      <div class="clear"></div>
      </div>


    </div>



</template>

<script>
  import pdfEditor from './pdf_editor'
  // import PDFJS from 'pdfjs-dist'
export default {
  name: 'pdf_selector',
  data(){
      return {
        pdfFlag: false,
        showEditor1: false,
        showEditor2: false,
        pdfRange: '',
        pdfValue: '',
        border: '1px solid red',
        pdfDoc: null,
        pageNum: 1,
        pageRendering: false,
        pageNumPending: null,
        numpages: 0,
        width: '',
        height: '',
        pdfUrl: '',
        scale: 1.3, //放大倍数
        type: 0,
      }
  },
  components:{
    pdfEditor
  },
  created(){
    console.log(PDFJS);
    PDFJS.workerSrc = 'static/pdfjs/build/pdf.worker.js';
    PDFJS.cMapUrl  = 'static/pdfjs/web/cmaps/';
    PDFJS.cMapPacked = true;
  },
  methods:{
    //確定提交結果
    submitRes(e){
      e.stopPropagation();
      this.pdfFlag = false;
      this.$parent.refreshRuleInfo(this.pdfRange);
    },
    getRangeValue(){
      let arr = [];
      if(this.showEditor1){
        arr.push({coordinates:`${this.$refs.edit1.getResult().substring(1,this.$refs.edit1.getResult().length-1)}`});
      }
      if(this.showEditor2){
        arr.push({coordinates:`${this.$refs.edit2.getResult().substring(1,this.$refs.edit2.getResult().length-1)}`});
      }
      this.$http.post("/ruleBase/queryPdfCoordinates.htm",{type: this.type,pdfUrl: this.pdfUrl,list:arr},{mheaders: true}).then(res => {
        console.log(res);
        if(res.code === '0000'){
          let value = '';
          res.result.forEach( it => {
            if(this.type === 0){
              if(it.numCoordinates != null)
                value += it.numCoordinates;
            }else{
              if(it.coordinates != null)
                value += it.coordinates;
            }
          })
          this.pdfValue = value;
        }
      } )
    },

    show(item){
      console.error(item);
      this.type = item.type;


      this.$http.post("/ruleBase/queryPdfUrlAndWithHigh.htm",item).then(res => {
        if(res.code === "0000"){
          if(res.result && res.result.length > 0){
            this.pdfFlag = true;
            this.showEditor1 = this.showEditor2 = false;
            this.pdfRange = this.pdfValue = '';
            this.pdfUrl= res.result[0].pdfUrl;
            this.width = res.result[0].width * this.scale  + 'px';
            this.height = res.result[0].height * this.scale  + 'px';


            this.$nextTick(() => {
              // document.querySelector("#canvas").addEventListener('mousedown',this.doDown)
              this.showPDF(this.pdfUrl.replace(/http:|https:/g,''));

              document.querySelector("#canvas").onmousedown = (e) => { this.doDown(e)};
            })
          }


        }
      })
    },

    showPDF (url) {
      let _this = this;
      PDFJS.getDocument(url).then(function (pdf) {
        _this.numpages = pdf.numPages;
        _this.pdfDoc = pdf;
        _this.pageNum = 1;
        _this.$nextTick(() => {
          for(let i = 1; i <= _this.numpages; i++){
            _this.renderPage(i);
          }
        })
      })
    },
    renderPage (num) {
      this.pageRendering = true
      let _this = this
      this.pdfDoc.getPage(num).then(function (page) {
        var viewport = page.getViewport(_this.scale)
        let canvas = document.getElementById('the-canvas' + num)
        canvas.height = viewport.height
        canvas.width = viewport.width

        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: canvas.getContext('2d'),
          viewport: viewport
        }
        var renderTask = page.render(renderContext)

        // Wait for rendering to finish
        renderTask.promise.then(function () {
          _this.pageRendering = false
          if (_this.pageNumPending !== null) {
            // New page rendering is pending
            _this.renderPage(_this.pageNumPending)
            _this.pageNumPending = null
          }
        })
      })
    },
    queueRenderPage (num) {
      if (this.pageRendering) {
        this.pageNumPending = num
      } else {
        this.renderPage(num)
      }
    },
    onPrevPage () {
      if (this.pageNum <= 1) {
        return
      }
      this.pageNum--
      this.queueRenderPage(this.pageNum)
      this.refresh();
    },
    onNextPage () {
      if (this.pageNum >= this.pdfDoc.numPages) {
        return
      }
      this.pageNum++
      this.queueRenderPage(this.pageNum)
      this.refresh();

    },


    clacResult(){
      let res = '';
      if(this.showEditor1){
        res += this.$refs.edit1.getResult() + ',';
      }
      if(this.showEditor2){
        res += this.$refs.edit2.getResult() + ',';
      }
      if(res)
        res = res.substring(0,res.length -1);
      this.pdfRange =  res;
      this.getRangeValue();
    },

    doDown(e){
      console.log('down');
      if(!this.showEditor1){
        e.stopPropagation();

        this.showEditor1 = true;
        this.$nextTick(() => {

          this.$refs.edit1.init();
          this.$refs.edit1.setTopLeft(e.offsetX,e.offsetY);0.


          document.querySelector("#canvas").onmousemove=(el) => {

            this.$refs.edit1.setWH(el.offsetX -e.offsetX,el.offsetY -e.offsetY);
          }
          document.querySelector("#canvas").onmouseup = (e) => {
            // e.stopPropagation();
            console.log(e);
              this.clacResult();

            document.querySelector("#canvas").onmousemove = null;
            document.querySelector("#canvas").onmouseup = null;
          }
        })
      }else if(!this.showEditor2){
        this.showEditor2 = true;

        this.$nextTick(() => {
          this.$refs.edit2.init();
          this.$refs.edit2.setTopLeft(e.offsetX,e.offsetY);
          document.querySelector("#canvas").onmousemove=(el) => {

            this.$refs.edit2.setWH(el.offsetX -e.offsetX,el.offsetY -e.offsetY);
          }
          document.querySelector("#canvas").onmouseup = (e) => {
            // e.stopPropagation();
            this.clacResult();
            document.querySelector("#canvas").onmousemove = null;
            document.querySelector("#canvas").onmouseup = null;
          }
        })
      }else{
        return ;
      }
    },
    refresh(e){
      this.showEditor1 = this.showEditor2 = false;
      this.$nextTick(() => {
        this.pdfRange = this.pdfValue = '';
      })
    },





  },
  mounted(){
    // this.showPDF("../../../../../static/借款协议.pdf");
    document.querySelector("#canvas").addEventListener('scroll',(e) => {
      // console.log(e.target.scrollTop,e);
      this.pageNum = Math.ceil(e.target.scrollTop/(+this.height.substring(0,this.height.length -2)));
      this.pageNum === 0 && (this.pageNum = 1);
    })
  }
}
</script>

<style scoped lang="scss">

  .pdf-slector{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow-y: scroll;
    background: #5C5C5C;
    z-index: 99999;
    .pdf_warpper{
      z-index: 999999;
      width: 1200px;
      margin: 30px auto;
      .left-content{
        position: fixed;
        top: 30px;
        left: calc(50vw - 600px);
        .content{
          background: #fff;
          color: #000;
          .left-title{
            padding-left: 20px;
            line-height: 40px;
            font-size: 16px;
            border-bottom: 1px solid #aaa;
            font-weight: bold;
          }
        }

      }
      .right-content{
        .title{
          position: fixed;
          top: 30px;
        }
      }
    }
  }
</style>
