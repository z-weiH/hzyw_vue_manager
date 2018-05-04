<template>
  <div class="hello">
    <el-button @click="handleClick" type="primary">
      store-{{$store.state.demo.city}}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted() {
    console.log(this.$store.state.demo);
    this.$axios.get('/api',{
      params: {
        ID: 12345
      },
    }).then((res) => {
      console.log(res);
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
<style lang="scss">

</style>
