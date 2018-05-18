<template>
  <div class="arbitrament-users-manage-signature-management">
    <el-dialog
      title="签章管理"
      :visible.sync="dialogVisible"
      width="700px"
      @close="handleClose"
    >
      <div class="m-content">
        <table
          class="m-primordial-table 
            el-table el-table--fit el-table--border 
            el-table--enable-row-hover"
        >
          <tr>
            <td colspan="4">电子签章</td>
          </tr>

          <tr>
            <td colspan="1">签章图片：</td>
            <td colspan="1">
              <img class="m-img" :src="imgUrl" />
            </td>
            <td colspan="1">上传签章：</td>
            <td colspan="1">
              <el-upload
                class="upload-demo"
                action="/img/upload"
                :show-file-list="false"
                :before-upload="handleBefore"
                :on-success="handleSuccess"
                :on-error="fileError"
              >
                <el-button size="mini" icon='el-icon-upload'>
                  点击这里上传文件
                </el-button>
              </el-upload>
            </td>
          </tr>
        </table>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">修 改</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,

        imgUrl : '',
      }
    },
    methods: {
      show(row) {
        this.dialogVisible = true;
        this.userId = row.userId;
        // 获取数据
        this.$http({
          method : 'post',
          url : '/hzuser/selectSign.htm',
          data : {
            userId : row.userId,
          },
        }).then((res) => {
          this.imgUrl = res.result.imgUrl;
        });
      },
      // 关闭 浮层
      handleClose() {
        this.dialogVisible = false;
      },
      // 点击修改
      handleSubmit() {
        this.$http({
          method : 'post',
          url : '/hzuser/saveSign.htm',
          data : {
            file : this.imgUrl,
            userId : this.userId,
          },
        }).then((res) => {
          this.handleClose();
          this.$emit('successCBK');
        });
      },

      /* 上传前 */
      handleBefore(file) {
        let fileType = file.name.split('.').pop();
        let arr = ['jpg','png','gif','jpeg'];
        if(arr.indexOf(fileType) === -1){
          this.$message.error('文件格式有误');
          return false;
        }
        return true;
      },
      /* 上传成功 */
      handleSuccess(response, file, fileList) {
        this.imgUrl = response.result.imgUrl;
      },
      /* 文件上传失败 回调 */
      fileError() {
        this.$message.error('文件上传失败，请稍后重试');
      },
    },
  }
</script>

<style lang="scss" scoped>

.arbitrament-users-manage-signature-management{
  .m-img{
    width: 100px;
    height: 100px;
  }
}

</style>