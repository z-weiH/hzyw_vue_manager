<template>
  <div style="overflow:hidden;">
    <div class="fl" style="position:fixed;">
      <div :class="{active : item.active}" :key="index" v-for="(item,index) in list">{{item.text}}</div>
    </div>
    <div class="fr">
      <div>
        <div class="scroll-top-item" style="height:300px;">
          <h1>11111111111111111</h1>
        </div>
        <div class="scroll-top-item" style="height:800px;">
          <h1>22222222222222222</h1>
        </div>
        <div class="scroll-top-item" style="height:400px;">
          <h1>33333333333333333</h1>
        </div>
        <div class="scroll-top-item" style="height:100px;">
          <h1>44444444444444444</h1>
        </div>
        <div class="scroll-top-item" style="height:500px;">
          <h1>55555555555555555</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import scroll from './scrollTop.js'
  export default {
    data() {
      return {
        list : [
          {
            text : 3.1,
            active : true,
          },
          {
            text : 3.2,
            active : false,
          },
          {
            text : 3.3,
            active : false,
          },
          {
            text : 3.4,
            active : false,
          },
          {
            text : 3.5,
            active : false,
          },
        ]
      }
    },
    beforeDestroy() {
      scroll.unbind();
    },
    mounted() {
      let _this = this;
      scroll.init((i) => {
        _this.list = _this.list.map(v => {
          v.active = false;
          return v;
        });
        _this.list[i].active = true;
      });
    },
  }
</script>

<style scoped>

.active{
  color: red;
}

</style>