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
              <img v-if="imgUrl" class="m-img" :src="imgUrl" />
              <span v-else>暂无图片</span>
            </td>
            <td colspan="1">上传签章：</td>
            <td colspan="1">
              <el-button class="file-inut-box" size="mini" icon='el-icon-upload'>
                点击这里上传文件
                <input ref="file" @change="handleSuccess" class="m-file-input" type="file" />
              </el-button>
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
        
        // 清空数据
        this.imgUrl = '';
        this.sendImgUrl = '';
      },
      // 点击修改
      handleSubmit() {
        if(!this.sendImgUrl){
          this.$message.warning('未上传文件');
          return;
        }

        let formDate = new FormData();
        formDate.append('file',this.sendImgUrl);
        formDate.append('userId',this.userId);
        this.$http({
          method : 'post',
          url : '/hzuser/saveSign.htm',
          data : formDate,
          mheaders : true,
        }).then((res) => {
          this.$message.success('修改成功');
          this.handleClose();
          this.$emit('successCBK');
        });
      },

      /* 上传成功 */
      handleSuccess(event) {
        let file = event.target.files[0];
        event.target.value = '';
        let fileType = file.name.split('.').pop().toLowerCase();
        let arr = ['jpg','png','gif','jpeg'];
        if(arr.indexOf(fileType) === -1){
          this.$message.warning('文件格式有误');
          return;
        }
        this.sendImgUrl = file;
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (data) => {
            let base64 = data.target.result;
            this.imgUrl = base64;
        }
      },
    },
  }
</script>

<style lang="scss" scoped>

.arbitrament-users-manage-signature-management{
  .m-img{
    max-width: 150px;
  }
  /* 上传 样式 */
  .file-inut-box{
    position: relative;
    overflow: hidden;
    .m-file-input{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
}

</style>