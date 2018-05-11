<template>
  <div class="upload-container">
  
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :before-upload="beforeAvatarUpload"
      :on-success="fileSuccess"
      :on-error="fileError"
    >
      <el-button size="mini" icon='el-icon-upload' type="primary">
        导入 word
      </el-button>
    </el-upload>
  </div>
</template>

<script>
// import { getToken } from 'api/qiniu'

export default {
  name: 'editorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data() {
    return {

    }
  },
  methods: {
    handleFile() {
      alert('文件上传');
    },
    // 校验文件 格式
    beforeAvatarUpload(file) {
      let fileType = file.name.split('.').pop();
      const isWord = fileType === 'doc' || fileType === 'docx';
      const isSize = file.size / 1024 / 1024 < 1;

      if (!isWord) {
        this.$message.error('文件只支持doc/docx格式');
        return;
      }
      if (!isSize) {
        this.$message.error('文件大小不能超过1M');
      }
      return isWord && isSize;
    },
    // 文件上传成功
    fileSuccess(response, file, fileList) {
      console.log(response,'response');
      // this.$parent.setContent
    },
    // 文件上传失败
    fileError(err, file, fileList) {

    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.upload-container {
  .editor-slide-upload {
    margin-bottom: 20px;
  }
}
</style>
