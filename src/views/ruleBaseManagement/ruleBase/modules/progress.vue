<template>
  <div class="m-progress">
    <div class="progress-bar progress-bar-striped active"></div>
  </div>
</template>

<script>
  export default {
    props : {
      
    },
  }
</script>

<style lang="scss" scoped>

.m-progress{
  width: 30px;
  height: 40px;
  // 进度条样式
  .progress-bar{
    float: left;
    width: 20px;
    height: 100%;
    font-size: 12px;
    line-height: 20px;
    color: #fff;
    text-align: center;
    background-color: #337ab7;
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