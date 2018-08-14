<template>
  <div class="rule-base">
    <div class="m-bar">
      <m-progress></m-progress>
    </div>
  </div>
</template>

<script>
  import progress from './modules/progress.vue'
  export default {
    components : {
      'm-progress' : progress,
    },
    mounted() {

    },
  }
</script>

<style lang="scss" scoped>

.rule-base{
  height: 100%;
  overflow: auto;
  .m-bar{
    height: 40px;
    .progress-bar{
      width: 42px;
    }
  }
}

</style>