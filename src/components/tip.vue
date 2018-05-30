<template>
  <div class="tip_w300" @click="handler">
    {{msg}}
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  props: {
    msg: String,
    handler: Function
  },
  created() {
    this.$emit("created");
  }
};
</script>

<style scoped lang="scss">
.tip_w300 {
  max-width: 300px;
  width: auto;
  line-height: 1.5;
  white-space: normal;
  word-break: break-all;
}
</style>
