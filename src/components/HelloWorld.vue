<template>
  <div class="hello">
    <el-button @click="handleClick" type="primary">
      store-{{ $store.state.demo.city | TimeMoment}}
    </el-button>
    <p class="ellipsis">费大幅费大幅度发费大幅度发费大幅度发度发</p>
    <i class="icon-sousuo iconfont"></i>
  </div>
</template>

<script>
import {cutString} from '@/assets/js/tool'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    this.$axios({
      method : 'post',
      url : '/api',
      data : {
        city : 'xy',
      },
    });
  },
  methods : {
    handleClick() {
      this.$store.commit('demo/setCity',new Date());
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>


</style>
