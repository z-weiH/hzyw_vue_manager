<template>
  <div class="ct-parameter-list">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">参数列表</a>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">参数类型</span>
    </div>

    <div class="item-table">
      <ul>
        <li>
          <div @click="handleGo('0')" class="img-01"></div>
          <p>
            <span>案件参数</span>
          </p>
        </li>

        <li>
          <div @click="handleGo('1')" class="img-02"></div>
          <p>
            <span>仲裁参数</span>
          </p>
        </li>

        <li>
          <div @click="handleGo('2')" class="img-03"></div>
          <p>
            <span>个性参数</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    methods : {
      handleGo(type) {
        this.$router.open({
          path : '/tmParameterDetail',
          query : {
            type : type,
          },
        });
      },
    },
  }
</script>

<style lang="scss" scoped>

.ct-parameter-list{
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
      .img-01{
        background-image: url('./../../../assets/img/cslb_1.png');
      }
      .img-02{
        background-image: url('./../../../assets/img/cslb_2.png');
      }
      .img-03{
        background-image: url('./../../../assets/img/cslb_3.png');
      }
    }
  }
}

</style>