<template>
  <div class="rule-base-navigation">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">规则库</a>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">规则库</span>
    </div>

    <div class="item-table">
      <ul>
        <li>
          <div @click="handleGo" class="gz-img"></div>
          <p>
            <span>规则库</span>
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
        window.open(`//${window.location.host}/#/ruleBase`,'_blank');
      },
    },
  }
</script>

<style lang="scss" scoped>

.rule-base-navigation{
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
      .gz-img{
        background-image: url('./../../../assets/img/sz-shyjwh.png');
      }
    }
  }
}

</style>