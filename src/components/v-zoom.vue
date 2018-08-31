<template>
  <div class="_magnifier" style="width:100%;height:100%;">
    <img :style="{'transform':'rotate('+cureentDeg+'deg)','height':height +'px','max-width':'100%'}" :src="src" @mouseover="handOver"  @mousemove="handMove" @mouseout="handOut"/>
    <div class="edit-wrap" >
      <span class="rotate-left" @click="rotate('left')"></span>
      <span class="rotate-right" @click="rotate('right')"></span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'app',
    props: {
      src: {
        type: String,
        required: true,
      },
      bigsrc: {
        type: String,
        required: true,
      },
      width: {
        type: String,
        default: 'auto',
      },
      height: {
        type: String,
        default: 'auto',
      },
      configs: {
        type: Object,
        default() {
          return {
            width: 750,
            height: 450,
            maskWidth: 50,
            maskHeight: 50,
            maskColor: '#fff',
            maskOpacity: 0.5,
          }
        },
      },
    },
    data() {
      return {
        //旋转角度
        cureentDeg:0,
        imgObj: {},
        bigImg: {},
        mouseMask: {},
        imgLayer: {},
        imgRect: {},
      }
    },
    methods: {
      rotate(direction){
        let idx = this.src.lastIndexOf(',');
        if(direction == 'left'){
          let deg = +this.src.substr(idx+1)-90;
          if(deg <　0){
            deg += 360;
          }
          this.src = this.src.substring(0,idx + 1)+deg;
        }else{
          let deg = +this.src.substr(idx+1)+90;
          if(deg > 360){
            deg -= 360;
          }
          this.src = this.src.substring(0,idx + 1)+deg;
        }
        this.bigsrc = this.src;
      },
      handMove(e) {
        let objX = e.pageX - this.imgRect.left
        let objY = e.pageY - this.imgRect.top

        // console.log(e.pageX,objX,objY);
        //判断是否超出界限
        let _maskX = objX - this.mouseMask.offsetHeight / 2
        let _maskY = objY - this.mouseMask.offsetWidth / 2
        // console.log(_maskX,_maskY,this.mouseMask.offsetHeight / 2,this.mouseMask.offsetWidth / 2);

        if (_maskY <= 0) {
          _maskY = 0
        }
        if (_maskY + this.mouseMask.offsetHeight >= this.imgRect.height) {
          _maskY = this.imgRect.height - this.mouseMask.offsetHeight
        }
        if (_maskX <= 0) {
          _maskX = 0
        }
        if (_maskX + this.mouseMask.offsetWidth >= this.imgRect.width) {
          _maskX = this.imgRect.width - this.mouseMask.offsetWidth
        }
        this.mouseMask.style.webkitTransform = `translate3d(${_maskX+this.imgObj.offsetLeft}px,${_maskY}px,0)`;
        let backgroundX = _maskX * (Math.ceil(this.bigImg.width / this.imgObj.offsetWidth))
        let backgroundY = _maskY * (Math.ceil(this.bigImg.height / this.imgObj.offsetHeight))
        //判断背景图是否小于预览框
        if (backgroundY + this.configs.height >= this.bigImg.height) {
          backgroundY = this.bigImg.height - this.configs.height
        }
        if (backgroundX + this.configs.width >= this.bigImg.width) {
          backgroundX = this.bigImg.width - this.configs.width
        }
        this.bigImg.style.top=-backgroundY + 'px';
        this.bigImg.style.left=-backgroundX + 'px';
      },
      handOut(e) {
        this.imgLayer.remove()
        this.mouseMask.remove()
      },
      handOver(e) {
        if (!document.getElementById('_magnifier_layer')) {
          //获取大图尺寸
          this.imgObj = this.$el.getElementsByTagName('img')[0]
          this.imgRect = this.imgObj.getBoundingClientRect()
          // console.log(this.imgObj.offsetLeft,this.imgRect)
          this.bigImg = new Image()
          this.bigImg.src = this.bigsrc
          this.bigImg.style.width = this.imgObj.offsetWidth *3 + 'px';
          this.bigImg.style.height = this.imgObj.offsetHeight *3 + 'px';
          this.bigImg.style.top=0;
          this.bigImg.style.left=0;
          this.bigImg.style.position='absolute';
          //创建鼠标选择区域
          this.mouseMask = document.createElement('div')
          this.mouseMask.className = '_magnifier_zoom'
          this.mouseMask.style.background = this.configs.maskColor
          this.mouseMask.style.height = this.configs.maskHeight + 'px'
          this.mouseMask.style.width = this.configs.maskWidth + 'px'
          this.mouseMask.style.opacity = this.configs.maskOpacity
          this.imgObj.parentNode.appendChild(this.mouseMask)
          //创建预览框
          let imgLayer = document.createElement('div')
          this.imgLayer = imgLayer
          let _layerHeight = this.configs.height
          let _layerWidth = this.configs.width
          imgLayer.id = '_magnifier_layer'
          imgLayer.style.width = _layerWidth + 'px'
          imgLayer.style.height = _layerHeight + 'px'
          imgLayer.style.left = this.imgRect.left  + 'px'
          imgLayer.style.top = this.imgRect.top+ this.imgRect.height + 'px';
          if(document.documentElement.querySelector('.pagination')){
            if(document.documentElement.querySelector('.body_container').offsetHeight < this.imgRect.top + this.imgRect.height * 2){
              imgLayer.style.top = this.imgRect.top- this.imgRect.height + 'px';
            }
          }
          if(this.configs.top){
            imgLayer.style.top = this.imgRect.top- this.imgRect.height + 'px';
          }
          imgLayer.appendChild(this.bigImg);
          document.body.appendChild(imgLayer)
        }
      },
    },
  }
</script>

<style lang="scss">
  #_magnifier_layer {
    position: absolute;
    z-index: 9999;
    background: #f9f9f9;
    overflow: hidden;
  }
  ._magnifier {
    position: relative;
    display: inline-block;
    text-align: center;
  }
  ._magnifier img {
    vertical-align: middle;
  }
  ._magnifier_zoom {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    pointer-events: none;
  }
  .edit-wrap{
    position: absolute;
    bottom: 5px;
    right: 0;
    z-index: 888;
    background: rgba(0,0,0,0.4);
    padding: 5px 15px 0 15px;
    border-radius: 15px;
    .rotate-left{
      display: inline-block;
      cursor: pointer;
      width: 16px;
      height: 16px;
      background: url(../assets/img/rotate.png);
      background-size: 100% 100%;
      -moz-transform:scaleX(-1);
      -webkit-transform:scaleX(-1);
      -o-transform:scaleX(-1);
      transform:scaleX(-1);
    }
    .rotate-right{
      margin-left: 10px;
      cursor: pointer;
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url(../assets/img/rotate.png);
      background-size: 100% 100%;
    }
  }
</style>
