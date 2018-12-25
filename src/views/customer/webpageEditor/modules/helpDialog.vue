<template>
  <div class="webpage-editor-help-dialog">
    <el-dialog
      title="帮助"
      :visible.sync="dialogVisible"
      width="900px"
      @close="handleClose"
			ref="dialog"
      top="0"
    >
      <div class="m-conetnt">
        <iframe ref="aaa" :src="src" :style="{height : height + 'px'}"></iframe>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        src : 'http://file.arbexpress.cn/zct/document/template/template_dynamic_document.pdf',
        height : 2380,
        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,
      }
    },
    mounted() {
      /* this.$nextTick(() => {
        this.$refs.aaa.onload = () => {
          console.log('iframe 初始化');
        };
      }); */
    },
    methods : {
      show(type,data) {
				this.dialogVisible = true;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        this.$nextTick(() => {
          // 处理逻辑 写在nextTick中 ， 防止dialog没有加载数据问题
          this.$refs.aaa.onload = () => {
            console.dir(this.$refs.aaa.contentWindow);
          };
        });
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        
        setTimeout(() => {
          // 取消按钮禁用
          this.submitDisabled = false;
				},500);
				
      },
    },
  }
</script>

<style scoped lang="scss">

.webpage-editor-help-dialog{
  iframe{
    width: 100%;
  }
}

</style>
