<template>
  <div class="tpl-setting-template-setting-dialog">
    <el-dialog
      :close-on-click-modal="false"
      :title="title"
      :visible.sync="dialogVisible"
      width="800px"
      @close="handleClose"
      ref="dialog"
    >
      <div class="m-content">
        <tinymce :height="300" ref="tinymce"></tinymce>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button type="primary" @click="handleClose">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import tinymce from '@/components/Tinymce/index.vue'
  export default {
    components : {
      tinymce,
    },
    data() {
      return {
        title : '模板设置',
        dialogVisible : false,
      }
    },
    mounted() {
      this.$refs.dialog.rendered = true;
    },
    methods : {
      show(data) {
        this.dialogVisible = true;
        this.data = data;
        this.title = data.title;
        console.log(data,'富文本 dialog data');
        this.$http({
          method : 'post',
          url : '/tplsetting/getTemplateTextByDetailIdAndType.htm',
          data : {
            detailId : data.detailId,
            templateType : data.templateType,
          },
        }).then((res) => {
          this.$refs.tinymce.setContent(res.result);
        });
      },
      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        this.$refs.tinymce.setContent('');  
      },
      // 点击确定
      handleSubmit() {
        let template = this.$refs.tinymce.getContent();
        if(!template){
          this.$message.waning('请填写模板内容');
          return;
        }
        this.$message.success(template);
        this.$http({
          method : 'post',
          url : '/tplsetting/saveTemplateTextByDetailIdAndType.htm',
          data : {
            detailId : this.data.detailId,
            templateText : template,
            templateType : this.data.templateType,
          },
        }).then((res) => {
          this.$message.success('模板设置成功');
          this.$emit('successCBK');
          this.handleClose();
        });
      },
    },
  }
</script>

<style lang="scss" scoped>

.tpl-setting-template-setting-dialog{
  
}

</style>