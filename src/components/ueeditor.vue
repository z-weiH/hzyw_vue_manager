<template>
  <div class="ueeditor-box">
    <div class="ueeditor-content-box">
      <div :id="id" :style="{width,height}"></div>
    </div>
  </div>
</template>

<script>
import { readyIntoPreAboutCtrl,codeFormat } from '@/assets/js/FmkCodeFormat'
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
        id : `myEditor${ + new Date() }`,
        single:null,
        multi:null
      }
    },
    mounted() {
      this.$nextTick(() => {
        this.um = UE.getEditor(this.id);
        // 等ueditor的数据全部渲染完成后执行
        /* readyIntoPreAboutCtrl(this.um);
        this.single = new codeFormat('single',this.um);
			  this.multi = new codeFormat('multi',this.um); */
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
      getContentTxt() {
        return UE.getEditor(this.id).getContentTxt();
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
