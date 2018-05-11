<template>
  <div class="tpl-setting">
    <tinymce :height="400" ref="tinymce"></tinymce>
    <el-button @click="handleClick">获取</el-button>
  </div>
</template>

<script>
  import tinymce from '@/components/Tinymce/index.vue'
  export default {
    components : {
      tinymce,
    },
    methods : {
      handleClick() {
        console.log(this.$refs.tinymce.getContent());
      },
    },
  }
</script>

<style lang="scss" scoped>

.tpl-setting{

}

</style>