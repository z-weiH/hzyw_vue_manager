<template>
  <div>
    <input type="text" style="border:1px solid #aaa;" v-model="pageNum">
    <button @click="onNextPage">下一页</button>
    <button @click="onPrevPage">上一页</button>
    <button @click="testPdf1">console</button>
    <!--一共{{}}页-->
    <div style="position:relative;" >
      <!--<pdf ref="pdf" style="width:595.3px;" src="../../../../../static/借款协议.pdf"-->
           <!--@num-pages="pageCount = $event"-->
      <!--&gt;</pdf>-->
      <canvas id="the-canvas" style="width: 595.3px;"></canvas>
      <!--<iframe  src="../../../../../static"-->
      <!--width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>-->
      <div class="resizeMe" id="testDiv" ref="testDiv">
        <div id="innerNice" ref="innerNice">


        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import pdf from 'vue-pdf'
  // import PDFJS from 'pdfjs-dist'
export default {
  name: 'pdf_selector',
  data(){
      return {


        pdfDoc: null,
        pageNum: 1,
        pageRendering: false,
        pageNumPending: null,
        scale: 0.9
      }
  },
  components:{
    pdf,
  },
  created(){
    console.log(PDFJS);
    PDFJS.workerSrc = 'static/pdfjs/build/pdf.worker.js';
    PDFJS.cMapUrl  = 'static/pdfjs/web/cmaps/';
    PDFJS.cMapPacked = true;
  },
  methods:{

    showPDF (url) {
      let _this = this
      PDFJS.getDocument(url).then(function (pdf) {
        _this.pdfDoc = pdf
        _this.renderPage(1)
      })
    },
    renderPage (num) {
      this.pageRendering = true
      let _this = this
      this.pdfDoc.getPage(num).then(function (page) {
        var viewport = page.getViewport(_this.scale)
        let canvas = document.getElementById('the-canvas')
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
    },
    onNextPage () {
      if (this.pageNum >= this.pdfDoc.numPages) {
        return
      }
      this.pageNum++
      this.queueRenderPage(this.pageNum)
    },



    testPdf(){
      console.log(this.$refs.pdf);
      this.$refs.pdf.pdf.loadPage(++this.pdfPage);
    },
    testPdf2(){
      console.log(this.$refs.pdf);
      this.$refs.pdf.pdf.loadPage(--this.pdfPage);
    },
    testPdf1(){
      console.log(this.$refs.testDiv.style.left,this.$refs.testDiv.style.top,this.$refs.testDiv.offsetWidth,this.$refs.testDiv.offsetHeight,);
    },
    getDirection(el,e) {
      var xPos, yPos, offset, dir;
      dir = "";

      xPos = e['offsetX'];
      yPos = e['offsetY'];

      offset = 8; //The distance from the edge in pixels

      if (yPos<offset) dir += "n";
      else if (yPos > el.offsetHeight-offset) dir += "s";
      if (xPos<offset) dir += "w";
      else if (xPos > el.offsetWidth-offset) dir += "e";

      return dir;
    },

    doDown(e) {
      console.log("down");

      var el = this.getReal(event.srcElement, "className", "resizeMe");



      if (el == null) {
        this.theobject = null;
        return;
      }

      let dir = this.getDirection(el,e);
      if (dir == "") return;

      // this.theobject = new resizeObject();
      // export class resizeObject extends BaseEntity{
      //   el;       // = null; //pointer to the object
      //   dir;    //= "";      //type of current resize (n, s, e, w, ne, nw, se, sw)
      //   grabx; //= null;     //Some useful values
      //   graby; //= null;
      //   width; //= null;
      //   height; //= null;
      //   left; //= null;
      //   top;// = null;
      // }


      this.theobject = {};

      this.theobject.el = el;
      this.theobject.dir = dir;

      this.theobject.grabx = e['clientX'];
      this.theobject.graby = e['clientY'];
      this.theobject.width = el.offsetWidth;
      this.theobject.height = el.offsetHeight;
      this.theobject.left = el.offsetLeft;
      this.theobject.top = el.offsetTop;

      e.returnValue = false;
      e.cancelBubble = true;
      e.stopPropagation();
    },

    doUp(e) {
      console.log("up");

      if (this.theobject != null) {
        this.theobject = null;
      }
      this.$refs.innerNice.style.cursor = 'default';
      this.$refs.innerNice.onmousemove=null;

    },

     doMove(e) {
      var el, xPos, yPos, str, xMin, yMin;
      xMin = 8; //The smallest width possible
      yMin = 8; //             height

      el = this.getReal(e.srcElement, "className", "resizeMe");

      if (el.className == "resizeMe") {
        str = this.getDirection(el,e);

        //Fix the cursor
        if (str == "") str = "default";
        else str += "-resize";
        el.style.cursor = str;

      }
     //Dragging starts here
      if(this.theobject != null) {
        if (this.theobject.dir.indexOf("e") != -1)
          this.theobject.el.style.width = Math.max(xMin, this.theobject.width + e['clientX'] - this.theobject.grabx) + "px";

        if (this.theobject.dir.indexOf("s") != -1)
          this.theobject.el.style.height = Math.max(yMin, this.theobject.height + e['clientY'] - this.theobject.graby) + "px";

        if (this.theobject.dir.indexOf("w") != -1) {
          let s= Math.min(this.theobject.left + e['clientX'] - this.theobject.grabx, this.theobject.left + this.theobject.width - xMin);
          this.theobject.el.style.left=s+'px';
          this.theobject.el.style.width = Math.max(xMin, this.theobject.width - e['clientX'] + this.theobject.grabx) + "px";
        }
        if (this.theobject.dir.indexOf("n") != -1) {
          let s=Math.min(this.theobject.top + e['clientY'] - this.theobject.graby,this.theobject.top + this.theobject.height - yMin) ;
          this.theobject.el.style.top =s+'px';
          this.theobject.el.style.height = Math.max(yMin, this.theobject.height - e['clientY'] + this.theobject.graby) + "px";
        }

        window.event.returnValue = false;
        window.event.cancelBubble = true;
      }
    },
    getReal(el, type, value) {
      let temp = el;
      while ((temp != null) && (temp.tagName != "BODY")) {
        if (eval("temp." + type) == value) {
          el = temp;
          return el;
        }
        temp = temp.parentElement;
      }
      return el;
    }
  },
  mounted(){
    this.showPDF("../../../../../static/借款协议.pdf");
    this.$refs.testDiv.style.border=this.border;
    this.$refs.testDiv.addEventListener('mousedown',(e)=>{this.doDown(e)});
    document.addEventListener('mouseup',(e)=>{this.doUp(e)});
    document.addEventListener('mousemove',(e)=>{this.doMove(e)});
    this.$refs.innerNice.onmousedown=(e) => {
      console.log('innerMousedown')
      e.stopPropagation();
      this.$refs.innerNice.style.cursor='move';
      var x = e.pageX - this.$refs.testDiv.offsetLeft;//获得鼠标指针离DIV元素左边界的距离
      var y = e.pageY - this.$refs.testDiv.offsetTop;//获得鼠标指针离DIV元素上边界的距离
      this.$refs.innerNice.onmousemove=(ev) =>//绑定鼠标的移动事件，因为光标在DIV元素外面也要有效果，所以要用doucment的事件，而不用DIV元素的事件
      {
        ev.stopPropagation();
        let h=this.$refs.testDiv.offsetHeight;
        let w=this.$refs.testDiv.offsetWidth;
        var _x = ev.pageX - x;//获得X轴方向移动的值
        var _y = ev.pageY - y;//获得Y轴方向移动的值

        // if(_x<=0) _x=0;
        // if(_x>500-w) _x=500-w;
        // if(_y<=0) _y=0;
        // if(_y>=(400-h)) _y=400-h;
        this.$refs.testDiv.style.left = _x + 'px';
        this.$refs.testDiv.style.top = _y + 'px';

      }
    }
  }
}
</script>

<style scoped>
  #testDiv{
    position:absolute;
    background-color: transparent;
    background-repeat: repeat;
    background-attachment: scroll;
    color: #3969A5;
    height: 100px;
    left: 30px;
    top:0;
    width: 200px;
    z-index: 2;
    margin: 0px;
    padding:2px;
  }
  #innerNice{
    background-color: transparent;
    background-repeat: repeat;
    background-attachment: scroll;
    color: #3969A5;
    height: 100%;
    width: 100%;
  }
</style>
