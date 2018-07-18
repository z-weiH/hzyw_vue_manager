<template>
  <div class="umeditor-box">
    <div class="umeditor-content-box">
      <div :id="id" :style="{width,height}"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props : {
      width : {
        default : '100%',
      },
      height : {
        default : '240px',
      },
    },
    data() {
      return {
        um : '',
        id : `myEditor${ + new Date() }`
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.um = UM.getEditor(this.id);
      });
    },
    methods : {
      // 获得整个html的内容
      getAllHtml() {
        return UM.getEditor(this.id).getAllHtml();
      },
      // 写入内容
      setContent(value) {
        UM.getEditor(this.id).setContent(value);
      },
      // 获得内容
      getContent() {
        return UM.getEditor(this.id).getContent();
      },
      // 插入内容
      insertHtml(value) {
        this.um.execCommand('insertHtml',value);
      },
    },
    destroyed() {
      UM.getEditor(this.id).destroy();
    },
  }
</script>

<style lang="scss">

.umeditor-box{
  .edui-btn-image{
    display: none;
  }
}

</style>