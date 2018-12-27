<template>
  <div class="scroll-top-component">
    <ul>
      <li :class="{active : index === active}" v-for="(item,index) in text" :key="index">{{item}}</li>
    </ul>
  </div>
</template>

<script>
  import scroll from './scrollTop.js'
  export default {
    props : {
      text : {
        type : Array,
        default : () => {
          return ['基础信息','金额信息','日期信息','当事人信息','证据信息','借款人银行卡信息','还款信息','分期贷信息','代偿信息'];
        },
      },
      className : {
        type : String,
        default : 'scroll-top-item',
      },
    },
    data() {
      return {
        active : 0,
      }
    },
    mounted() {
      scroll.init((i) => {
        this.setActive(i);
      });
    },
    methods : {
      // 手动设置 高亮状态
      setActive(index) {
        this.active = index;
      },
    },
    beforeDestroy() {
      scroll.unbind();
    },
  }
</script>

<style lang="scss" scoped>

.scroll-top-component{
  width: 200px;
  position: fixed;
  li{
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  .active{
    color: #0F357F;
    border-right: none;
  }
}

</style>