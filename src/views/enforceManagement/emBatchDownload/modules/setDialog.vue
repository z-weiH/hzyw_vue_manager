<template>
  <div class="emBatch-download-set-dialog">
    <el-dialog
      title="材料设置提示"
      :visible.sync="dialogVisible"
      width="500px"
			ref="dialog"
    >
      <div class="m-conetnt">
        <div>强制执行申请书模板未配置</div>
        <div class="error">
          浙江阿拉丁电子商务股份有限公司-51返呗10-01  
        </div> 
        <div>被执行人银行卡未配置</div>
        <div>3个法院材料未配置</div>
        <div class="error">xxxxxxxxxxx法院</div>
        <div class="error">xxxxxxxxxxx法院</div>
        <div class="error">xxxxxxxxxxx法院</div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="primary">确 定</el-button>
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
    },
  }
</script>

<style lang="scss">

.emBatch-download-set-dialog{
  .error{
    color: red;
    padding-left: 15px;
  }
  .m-conetnt{
    >div{
      margin-bottom: 10px;
    }
  }
}

</style>
