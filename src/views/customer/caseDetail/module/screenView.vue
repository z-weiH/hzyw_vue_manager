<template>
    <div class="screenView" v-if="flag">

    </div>
</template>

<script>
    export default {
      name: 'screenView',
      data(){
        return {
          flag : false
        }
      },
      methods: {
        toggleShow(obj){
          this.flag = !this.flag;
          if(obj){
            console.log(obj);
          }
        }
      }
    }
</script>

<style lang="scss">
.screenView{
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: #fff;
}
</style>
