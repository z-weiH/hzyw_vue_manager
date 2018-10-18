<template>
  <div class="gz-textarea" :key="key">
    <div class="container" :style="{width : width + 'px' , height : height + 'px'}">
      <div class="backdrop" :style="{width : width + 'px' , height : height + 'px'}">
        <div class="highlights"></div>
      </div>
      <textarea spellcheck="false" ref="textarea" :style="{width : width + 'px' , height : height + 'px'}"></textarea>
    </div>
  </div>
</template>

<script>
  /*
    <gzTextarea ref="gzTextarea" :width="500" :height="300" v-model="value"></gzTextarea>
    // this.$refs.gzTextarea.getVal()
  */
  import $ from 'jquery'
  export default {
    props : {
      value : {},
      width : {
        type : Number,
        default : 460,
      },
      height : {
        type : Number,
        default : 180,
      },
    },
    data() {
      return {
        key : 1,
      }
    },
    mounted() {
      this.$refs.textarea.value = this.value;
      this.$nextTick(() => {
        this.init();
      });
      $('textarea').blur((e) => {
        console.log(e,'blur');
        this.$emit("valueChange",this.getVal());
      })

    },

    watch : {
      value(val) {
        this.key = +new Date();
        this.$nextTick(() => {
          this.$refs.textarea.value = val;
          this.init();
        });
      },
    },
    methods : {
      init() {
        let _this = this;
        var $container = $('.container');
        var $backdrop = $('.backdrop');
        var $highlights = $('.highlights');
        var $textarea = $('textarea');
        var $toggle = $('button');

        var ua = window.navigator.userAgent.toLowerCase();
        var isIE = !!ua.match(/msie|trident\/7|edge/);
        var isWinPhone = ua.indexOf('windows phone') !== -1;
        var isIOS = !isWinPhone && !!ua.match(/ipad|iphone|ipod/);

        function fixIOS() {
          $highlights.css({
            'padding-left': '+=3px',
            'padding-right': '+=3px'
          });
        }
        if (isIOS) {
          fixIOS();
        }

        function applyHighlights(text) {
          text = text
            .replace(/\n$/g, '\n\n')
            .replace(/\/\/([\u4e00-\u9fa5]+)/g,'<span class="m-notes">$&</span>')
            .replace(/[\u4e00-\u9fa5].*?/g, '<span class="m-mark">$&</span>');
          if (isIE) {
            // IE wraps whitespace differently in a div vs textarea, this fixes it
            text = text.replace(/ /g, ' <wbr>');
          }

          return text;
        }
        function handleInput() {
          console.log('频率');
          var text = $textarea.val();
          var highlightedText = applyHighlights(text);
          $highlights.html(highlightedText);
        }
        function _throttle(fn,wait,time){
            var previous = null; //记录上一次运行的时间
            var timer = null;

            return function(){
                var now = +new Date();

                if(!previous) previous = now;
                //当上一次执行的时间与当前的时间差大于设置的执行间隔时长的话，就主动执行一次
                if(now - previous > time){
                    clearTimeout(timer);
                    fn();
                    previous = now;// 执行函数后，马上记录当前时间
                }else{
                    clearTimeout(timer);
                    timer = setTimeout(function(){
                        fn();
                    },wait);
                }
            }
        }
        function handleScroll() {
          var scrollTop = $textarea.scrollTop();
          $backdrop.scrollTop(scrollTop);

          var scrollLeft = $textarea.scrollLeft();
          $backdrop.scrollLeft(scrollLeft);
        }
        function bindEvents() {
          $textarea.on({
            'input': _throttle(handleInput,0,300),
            'scroll': handleScroll
          });

          $toggle.on('click', function() {
            $container.toggleClass('perspective');
          });
        }
        bindEvents();
        handleInput();
      },
      getVal() {
        return this.$refs.textarea.value;
      },
    },
  }
</script>

<style lang="scss">
  .gz-textarea{
    .m-mark{
      background-color: #b1d5e5;
    }
    .m-notes{
      background-color: #ddd;
      .m-mark{
        background-color: #ddd;
      }
    }

  }
</style>


<style lang="scss" scoped>

.gz-textarea{
  .container{
    display: block;
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-text-size-adjust: none;
    *, *::before, *::after {
      box-sizing: border-box;
    }
    .highlights, textarea {
      padding: 10px;
      font: 20px/28px 'Open Sans', sans-serif;
      letter-spacing: 1px;
    }

    .backdrop {
      position: absolute;
      z-index: 1;
      border: 2px solid #DCDFE6;
      background-color: #fff;
      overflow: auto;
      pointer-events: none;
      -webkit-transition: -webkit-transform 1s;
      transition: -webkit-transform 1s;
      transition: transform 1s;
      transition: transform 1s, -webkit-transform 1s;
    }

    .highlights {
      white-space: pre-wrap;
      word-wrap: break-word;
      color: transparent;
    }

    textarea {
      display: block;
      position: absolute;
      z-index: 2;
      margin: 0;
      border: 2px solid #DCDFE6;
      border-radius: 0;
      color: #444;
      background-color: transparent;
      overflow: auto;
      resize: none;
      -webkit-transition: -webkit-transform 1s;
      transition: -webkit-transform 1s;
      transition: transform 1s;
      transition: transform 1s, -webkit-transform 1s;
    }

    mark {
      border-radius: 3px;
      color: transparent;
      background-color: #b1d5e5;
    }

    button {
      display: block;
      width: 300px;
      margin: 30px auto 0;
      padding: 10px;
      border: none;
      border-radius: 6px;
      color: #fff;
      background-color: #74637f;
      font: 18px 'Opens Sans', sans-serif;
      letter-spacing: 1px;
      -webkit-appearance: none;
        -moz-appearance: none;
              appearance: none;
      cursor: pointer;
    }

    .perspective .backdrop {
      -webkit-transform:
        perspective(1500px)
        translateX(-125px)
        rotateY(45deg)
        scale(.9);
              transform:
        perspective(1500px)
        translateX(-125px)
        rotateY(45deg)
        scale(.9);
    }

    .perspective textarea {
      -webkit-transform:
        perspective(1500px)
        translateX(155px)
        rotateY(45deg)
        scale(1.1);
              transform:
        perspective(1500px)
        translateX(155px)
        rotateY(45deg)
        scale(1.1);
    }

    textarea:focus, button:focus {
      outline: none;
      /*box-shadow: 0 0 0 2px #c6aada;*/
    }
  }
}

</style>
