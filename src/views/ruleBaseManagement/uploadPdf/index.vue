<template>
    <div class="uploadPdf">
      <iframe :src="pdfUrl" frameborder="0" width="100%" height="100%"></iframe>
      <div class="right-content">
        <el-upload
          class="upload-demo"
          :http-request="handleUpload"
          :limit="1"
          :show-file-list="false"
          >
          <el-button >点击上传</el-button>
        </el-upload>
      </div>
    </div>
</template>

<script>
export default {
  name: 'uploadPdf',
  data() {
    return {
      pdfUrl: ''
    }
  },
  methods: {
    handleUpload(obj) {
      let fileReader = new FileReader();
      fileReader.readAsDataURL(obj.file);
      fileReader.onload = (e ) => {
        // console.log(e.target.result);
        this.pdfUrl = e.target.result;
      }
    }
  }
}
</script>

<style lang="scss">
  .uploadPdf{
    position: relative;
    height: 100vh;
    .right-content{
      width: 300px;
      position: absolute;
      top: 50px;
      right: 0;
      border: 1px solid #aaa;
      min-height: 200px;
    }

  }
</style>
