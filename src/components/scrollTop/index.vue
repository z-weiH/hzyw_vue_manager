<template>
  <div class="scroll-top-component">
    <ul>
      <li @click="handleClick(index)" :class="{active : index === active}" v-for="(item,index) in text" :key="index">{{item}}</li>
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
      scrollClass: {
        type: String,
        default: '.el-scrollbar .el-scrollbar__wrap'
      }
    },
    data() {
      return {
        active : 0,
      }
    },
    watch:{
      'text'(val,oldval){
        console.error(val);
        scroll.init((i) => {
          this.setActive(i);
        },this.scrollClass);
      }
    },
    mounted() {
      scroll.init((i) => {
        this.setActive(i);
      },this.scrollClass);
    },
    methods : {
      // 手动设置 高亮状态
      setActive(index) {
        this.active = index;
      },
      handleClick(index) {
        let item = document.querySelectorAll('.scroll-top-item')[index];
        document.querySelector(this.scrollClass).scrollTop = item.offsetTop;
        
        setTimeout(() => {
          this.setActive(index);
        },100);
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
    cursor: pointer;
  }
  .active{
    color: #0F357F;
    border-right: none;
  }
}

</style>
