<template>
  <div class="m-progress-dialog-wrap">
    <el-dialog
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div class="m-progress-dialog" :style="{height : height + 'px'}">
        <div ref="bar" :style="{width : width + '%'}" class="progress-bar progress-bar-striped active progress-color">
        </div>
        <div class="slot" :style="{'line-height' : height - 2 + 'px'}">
          <slot></slot>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    props : {
      width : {

        default : '',
      },
      height : {
        type : Number,
        default : 30,
      },
      px:{
        type: Number,
        default: 0
      }
    },
    watch:{
      'px'(val,oldval){
        console.log(val);
        this.$refs.bar.style.width = val + '%';
      }
    },
    data() {
      return {
        dialogVisible : false,
      }
    },
    methods : {
      show() {
        this.dialogVisible = true;
      },
      hide() {
        this.handleClose();
      },
      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
      },
    },
  }
</script>

<style lang="scss" scoped>
.m-progress-dialog{
  width: 100%;
  position: relative;
  box-sizing: border-box;
  border: 1px solid #8E71C7;
  .slot{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    text-align: center;
  }
  // 进度条样式
  .progress-color{
    background-color: #8E71C7;
  }
  .progress-bar{
    float: left;
    height: 100%;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    -webkit-box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
    box-shadow: inset 0 -1px 0 rgba(0,0,0,.15);
    -webkit-transition: width .6s ease;
    -o-transition: width .6s ease;
    transition: width .6s ease;
  }
  .progress-bar-striped{
    background-image: -webkit-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
    background-image: -o-linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
    background-image: linear-gradient(45deg,rgba(255,255,255,.15) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.15) 50%,rgba(255,255,255,.15) 75%,transparent 75%,transparent);
    -webkit-background-size: 40px 40px;
    background-size: 40px 40px;
  }
  .active{
    -webkit-animation: progress-bar-stripes 2s linear infinite;
    -o-animation: progress-bar-stripes 2s linear infinite;
    animation: progress-bar-stripes 2s linear infinite;
  }
  @-webkit-keyframes progress-bar-stripes {
    from {
      background-position: 40px 0
    }

    to {
      background-position: 0 0
    }
  }

  @-o-keyframes progress-bar-stripes {
    from {
      background-position: 40px 0
    }

    to {
      background-position: 0 0
    }
  }

  @keyframes progress-bar-stripes {
    from {
      background-position: 40px 0
    }

    to {
      background-position: 0 0
    }
  }
}

</style>
