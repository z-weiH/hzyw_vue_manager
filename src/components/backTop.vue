<template>
  <div>
    <div @click="backTop()" class="backTop" v-if="btopstat"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  import $ from "jquery";
  import {
    throttle
  } from "@/assets/js/tool";
  export default {
    props : ['className'],
    data() {
      return {
        btopstat: false
      };
    },
    mounted() {
      try{
        $(`${this.className || '.page-content .el-scrollbar__wrap'}`)[0].addEventListener("scroll", throttle(this.handleScroll, 50));
      }catch(err) {

      }
    },
    methods: {
      handleScroll() {
        // let scrollTop =
        //   window.pageYOffset ||
        //   document.documentElement.scrollTop ||
        //   document.body.scrollTop;
        let scrollTop = $(`${this.className || '.page-content .el-scrollbar__wrap'}`).scrollTop();
        // console.log($(".page-content .el-scrollbar__wrap").scrollTop());
        if (scrollTop > 20) {
          this.btopstat = true;
        } else if (scrollTop === 0) {
          this.btopstat = false;
        }
      },
      backTop() {
        // console.log($(".page-content .el-scrollbar__wrap").scrollTop());
        // html,body
        $(`${this.className || '.page-content .el-scrollbar__wrap'}`).animate({
          scrollTop: 0
        }, 400);
      }
    }
  };
</script>

<style scoped lang="scss">
  .main {
    position: relative;
  }

  .backTop {
    z-index: 1000;
    display: block;
    cursor: pointer;
    position: fixed;
    text-decoration: none;
    right: 20px;
    bottom: 122px;
    width: 37px;
    height: 38px;
    background: url(./../assets/img/result-huge-bg.png) no-repeat 1px 0;
    z-index: 999;
    &:hover {
      background-position: -37px 0;
    }
  }
</style>
