<template>
  <div class="tinymce-container editor-container" :class="{fullscreen:fullscreen}">
    <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
    <div class="editor-custom-btn-container">
      <editorImage color="#1890ff" class="editor-upload-btn" @successCBK="imageSuccessCBK"></editorImage>
    </div>
  </div>
</template>

<script>
import editorImage from './components/editorImage'
import plugins from './plugins'
import toolbar from './toolbar'

export default {
  name: 'tinymce',
  components: { editorImage },
  props: {
    id: {
      type: String
    },
    value: {
      type: String,
      default: ''
    },
    path:{
      type: String,
      default: 'demo'
    },
    toolbar: {
      type: Array,
      required: false,
      default() {
        return []
      }
    },
    menubar: {
      default: 'file edit insert view format table'
    },
    height: {
      type: Number,
      required: false,
      default: 360
    }
  },
  data() {
    return {
      hasChange: false,
      hasInit: false,
      tinymceId: this.id || 'vue-tinymce-' + +new Date(),
      fullscreen: false
    }
  },
  watch: {
    value(val) {
      if (!this.hasChange && this.hasInit) {
        this.$nextTick(() => window.tinymce.get(this.tinymceId).setContent(val))
      }
    }
  },
  mounted() {
    this.initTinymce();
  },
  /* activated() {
    this.initTinymce()
  },
  deactivated() {
    this.destroyTinymce()
  }, */
  methods: {
    initTinymce() {
      const _this = this
      window.tinymce.init({
        language : 'zh_CN',
        selector: `#${this.tinymceId}`,
        height: this.height,
        body_class: 'panel-body ',
        object_resizing: false,
        toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
        menubar: this.menubar,
        plugins: plugins,
        end_container_on_empty_block: true,
        powerpaste_word_import: 'clean',
        code_dialog_height: 450,
        code_dialog_width: 1000,
        advlist_bullet_styles: 'square',
        advlist_number_styles: 'default',
        imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
        default_link_target: '_blank',
        link_title: false,
        images_upload_handler:(blobInfo, success, failure) => {
          let fd = new FormData();
          fd.append('file',blobInfo.blob());
          fd.append('path',this.path);
          fd.append('token',JSON.parse(localStorage.getItem('loginInfo')).token);
          this.$http.post('/file/upload.htm',fd,{mheaders: true,header: {'Content-Type': 'multipart/form-data'}})
            .then(res => {
              if(res.code == '0000'){
                success(res.result);
              }
            })
          // uploadRichImg(fd).then(res => {
          //   console.log(res);
          //   let result = res.data[0]
          //   success(result.url)
          // })
          //   .catch(err => {
          //
          //   })

        },
        /* init_instance_callback: editor => {
          if (_this.value) {
            editor.setContent(_this.value)
          }
          _this.hasInit = true
          editor.on('NodeChange Change KeyUp SetContent', () => {
            this.hasChange = true
            this.$emit('input', editor.getContent())
          })
        },
        setup(editor) {
          editor.on('FullscreenStateChanged', (e) => {
            _this.fullscreen = e.state
          })
        } */
      })
    },
    destroyTinymce() {
      if (window.tinymce.get(this.tinymceId)) {
        window.tinymce.get(this.tinymceId).destroy()
      }
    },
    setContent(value) {
      window.tinymce.get(this.tinymceId).setContent(value)
    },
    getContent() {
      //console.log(tinymce.get(this.tinymceId).getContent({format: 'html'}));
      return window.tinymce.get(this.tinymceId).getContent()
    },
    // 在光标处 设置数据
    execCommand(value) {
      window.tinymce.execCommand("mceInsertContent", false, value);
    },
    // 导入word 成功回调
    imageSuccessCBK(res) {
      this.setContent(res);
    },
  },
  destroyed() {
    this.destroyTinymce()
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
}
.tinymce-container>>>.mce-fullscreen {
  z-index: 10000;
}
.tinymce-textarea {
  visibility: hidden;
  z-index: -1;
}
.editor-custom-btn-container {
  position: absolute;
  right: 4px;
  top: 4px;
  /*z-index: 2005;*/
}
.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}
.editor-upload-btn {
  display: inline-block;
}
</style>

<style lang="scss">

.tinymce-container{
  .mce-statusbar{
    display: none!important;
  }
}

</style>


