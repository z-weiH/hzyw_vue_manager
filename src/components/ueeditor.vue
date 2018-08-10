<template>
  <div class="ueeditor-box">
    <div class="ueeditor-content-box">
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
    watch : {
      height() {
        if(typeof this.height === 'number') {
          UE.getEditor(this.id).setHeight(this.height);
        }
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
        this.um = UE.getEditor(this.id);
      });
    },
    methods : {
      // 获得整个html的内容
      getAllHtml() {
        return UE.getEditor(this.id).getAllHtml();
      },
      // 写入内容
      setContent(value) {
        UE.getEditor(this.id).setContent(value);
      },
      // 获得内容
      getContent() {
        return UE.getEditor(this.id).getContent();
      },
      // 插入内容
      insertHtml(value) {
        this.um.execCommand('insertHtml',value);
      },
    },
    destroyed() {
      UE.getEditor(this.id).destroy();
    },
  }
</script>

<style lang="scss">

.ueeditor-box{
  .edui-toolbar{
    position: relative!important;
  }
  .edui-container >div[style*=height]{
    display: none;
  }
  
  // 隐藏无用数据
  .edui-editor-bottomContainer{
    display: none!important;
  }
  .edui-for-help{
    display: none!important;
  }
  .edui-for-drafts{
    display: none!important;
  }
  .edui-for-searchreplace{
    display: none!important;
  }
  .edui-for-preview{
    display: none!important;
  }
  .edui-for-print{
    display: none!important;
  }
  .edui-for-wordimage{
    display: none!important;
  }
  .edui-for-snapscreen{
    display: none!important;
  }
  .edui-for-spechars{
    display: none!important;
  }
  .edui-for-background{
    display: none!important;
  }
  .edui-for-template{
    display: none!important;
  }
  .edui-editor-messageholder{
    display: none!important;
  }
  .edui-for-webapp{
    display: none!important;
  }
  .edui-for-insertcode{
    display: none!important;
  }
  .edui-for-insertframe{
    display: none!important;
  }
  .edui-for-gmap{
    display: none!important;
  }
  .edui-for-map{
    display: none!important;
  }
  .edui-for-attachment{
    display: none!important;
  }
  .edui-for-music{
    display: none!important;
  }
  .edui-for-insertvideo{
    display: none!important;
  }
  .edui-for-scrawl{
    display: none!important;
  }
  .edui-for-emotion{
    display: none!important;
  }
  .edui-for-insertimage{
    display: none!important;
  }
  .edui-for-simpleupload{
    display: none!important;
  }
}

</style>