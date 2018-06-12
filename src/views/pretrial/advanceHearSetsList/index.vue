<template>
  <div class="advance-hear-setsList">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">预审设置</a>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">预审设置</span>
    </div>

    <div class="item-table">
      <ul>
        <li>
          <div @click="handleGo('ideaHearOption')" class="sz-shyjwh"></div>
          <p>
            <span>审核意见维护</span>
          </p>
        </li>
        <li>
          <div @click="handleGo('batchNumOption')" class="sz-pcsl"></div>
          <p>
            <span>批次数量设置</span>
          </p>
        </li>
        <li>
          <div @click="handleGo('tplTermOption')" class="sz-mbtj"></div>
          <p>
            <span>模板条件设置</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    methods : {
      handleGo(path) {
        this.$router.push(path);
      },
    },
  }
</script>

<style lang="scss" scoped>

.advance-hear-setsList{
  .item-table{
    padding-left: 50px;
    height: 300px;
    ul{
      padding-top: 35px;
    }
    li{
      float: left;
      color: #666666;
      div{
        width: 100px;
        height: 100px;
        margin-bottom: 10px;
        cursor: pointer;
        background-repeat: no-repeat;
        background-position: center center;
        background-color: #F7F9FE;
        border-radius: 5px;
        border: 1px solid #E5EAEE;
        margin-right: 60px;
      }
      p{
        width: 102px;
        text-align: center;
      }
      .sz-shyjwh{
        background-image: url('./../../../assets/img/sz-shyjwh.png');
      }
      .sz-pcsl{
        background-image: url('./../../../assets/img/sz-pcsl.png');
      }
      .sz-mbtj{
        background-image: url('./../../../assets/img/sz-mbtj.png');
      }
    }
  }
}

</style>