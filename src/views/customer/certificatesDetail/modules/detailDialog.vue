<template>
  <div class="certificates-detail-detail-dialog">
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">

      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,
      }
    },
    mounted() {

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
        });
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        
        setTimeout(() => {
				},500);
				
      },
    },
  }
</script>

<style scoped lang="scss">

.certificates-detail-detail-dialog{

}

</style>
