<template>
  <div class="resizeMe" id="testDiv" ref="testDiv" >
    <div id="innerNice" ref="innerNice">


    </div>
  </div>
</template>

<script>
    export default {
      name: 'pdf_editor',
      methods: {
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


          var el = this.getReal(event.srcElement, "className", "resizeMe");


          console.log(el);

          if (el == null) {
            this.theobject = null;

            return;
          }

          let dir = this.getDirection(el,e);
          if (dir == "") return;



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

          if (this.theobject != null) {
            this.theobject = null;
          }
          // this.$refs.innerNice.style.cursor = 'default';
          this.$refs.innerNice.onmousemove = null;
          console.log(e);
          if(e.target.nodeName !== 'SPAN' &&  e.target.nodeName !== 'BUTTON' && e.target.className !== 'fr mr-10' &&  e.target.className !== 'fl ml-10'){
              this.$parent.clacResult();
          }

        },

        doMove(e) {
          var el, xPos, yPos, str, xMin, yMin;
          xMin = 8; //The smallest width possible
          yMin = 8; //             height

          el = this.getReal(e.srcElement, "className", "resizeMe");

          if (el.className == "resizeMe") {
            str = this.getDirection(el,e);


            //Fix the cursor
            if (!str) str = "move";
            else str += "-resize";
            el.style.cursor = str;

          }
          //Dragging starts here
          if(this.theobject != null) {
            const scroll = document.querySelector("#canvas").scrollTop;

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
              this.theobject.el.style.top =  s+'px';
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
        },
        init(){
          this.$refs.testDiv.style.border= '1px solid red';
          this.$refs.testDiv.onmousedown = (e)=>{this.doDown(e)};
          document.onmouseup = (e)=>{this.doUp(e)};
          document.onmousemove = (e)=>{this.doMove(e)};
          this.$refs.innerNice.onmousedown=(e) => {
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
              console.error(_x,_y);
              this.$refs.testDiv.style.left = _x + 'px';
              this.$refs.testDiv.style.top = _y + 'px';

            }
          }
        },
        getResult(){
          let page = Math.floor(this.$refs.testDiv.style.top.substring(0,this.$refs.testDiv.style.top.length -2)/(this.$parent.height.substring(0,this.$parent.height.length -2)));
          return '['+ page + ',' + this.calcScale(this.$refs.testDiv.style.left.substring(0,this.$refs.testDiv.style.left.length-2)) + ',' + this.calcScale(this.$refs.testDiv.style.top.substring(0,this.$refs.testDiv.style.top.length -2) - page * (this.$parent.height.substring(0,this.$parent.height.length-2)))+ ',' +this.calcScale(this.$refs.testDiv.offsetWidth)+ ',' +this.calcScale(this.$refs.testDiv.offsetHeight) + ']';
        },
        setTopLeft(left,top){
          this.$refs.testDiv.style.top = top + 'px';
          this.$refs.testDiv.style.left = left + 'px';
        },
        setWH(width,height){
          this.$refs.testDiv.style.width = width + 'px';
          this.$refs.testDiv.style.height = height + 'px';
        },
        calcScale(num){
          return (num/this.$parent.scale).toFixed(0);
        }
      },
      mounted() {
        // this.init();
      },
      beforeDestroy() {
        console.error("beforeDestroy");
        this.$refs.testDiv.onmousedown = null;
        document.onmouseup = null;
        document.onmousemove = null;
        this.$refs.innerNice.onmousedown = null;
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
    height: 0px;
    left: 30px;
    top:0;
    width: 0px;
    margin: 0px;
    padding:2px;
    z-index: 111;
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
