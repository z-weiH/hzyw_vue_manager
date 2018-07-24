<template>
  <div class="webpage-editor-box">
    <div class="webpage-editor-title">
      <div class="width-1200">
        <span>网页版编辑模板</span>
      </div>
    </div>
    <div class="webpage-editor-content">
      <div class="webpage-editor">
        <!-- 富文本编辑器 -->
        <div class="fl umeditor-b">
          <umeditor ref="umeditor" height="800px"></umeditor>
        </div>
        <!-- 参数 -->
        <div class="fl parameter-box">
          <parameter @copy="handleCopy"></parameter>
        </div>
        <!-- 悬浮操作 -->
        <div class="operation-box">
          <img v-if="imgShow" @click="handleImg" src="@/assets/img/webpageEditorCircular.png" />
          <transition name="fade" mode="out-in">
            <div class="operation" v-if="boxShow">
              <span @click="handleBox">x</span>
              <el-button @click="handleInsertGrammar(1)">插入参数</el-button>
              <el-button @click="handleInsertGrammar(2)">插入判断条件</el-button>
              <el-button @click="handleInsertGrammar(3)">插入表格</el-button>
            </div>
          </transition>
        </div>

        <div class="clear"></div>
        <div class="mt-20 btn-box mb-20">
          <el-button @click="handlePreview" class="mr-30">预览</el-button>
          <el-button @click="handleSubmit" type="primary" class="mr-30">保存</el-button>
          <el-button @click="handleCancel" class="mr-30">取消</el-button>
        </div>
      </div>
    </div>

    <!-- 预览 dialog -->
    <previewDialog ref="previewDialog"></previewDialog>
  </div>
</template>

<script>
  /* 
    let value = this.$refs.umeditor.getContent();
    let $content = $('<div></div>').append($(value));
    $content.find('*').each((k,v) => {
      let $v = $(v);
      $v.css({
        'font-family' : 'FangSong'
      });
    });
    let FangSongValue = $content[0].innerHTML;
  */
  import umeditor from '@/components/umeditor'
  import previewDialog from './modules/previewDialog.vue'
  import parameter from '../parameterList/modules/parameter.vue'
  
  export default {
    components : {
      umeditor,
      previewDialog,
      parameter,
    },
    data() {
      return {
        imgShow : true,
        boxShow : false,
      }
    },
    mounted() {
    },
    methods : {
      // copy 参数
      handleCopy(data) {
        this.$refs.umeditor.insertHtml(data);
      },
      // 点击叶子 图片
      handleImg() {
        this.imgShow = false;
        this.boxShow = true;
      },
      // 关闭左侧 操作栏
      handleBox() {
        this.boxShow = false;
        setTimeout(() => {
          this.imgShow = true;
        },624);
      },
      // 插入demo 语法
      handleInsertGrammar(type) {
        let message = '';
        if(type === 1) {
          message = '${userName}';
        }else if(type === 2) {
          message = '&lt;#if userName=admin&gt;a&lt;#else&gt;b&lt;/#if&gt;';
        }else if(type === 3) {
          message = '&lt;@tableCol3 colNames=[用户名,昵称] colProperties=[${userName},${nickName}]&gt;&lt;/@tableCol3&gt;';
        }
        this.$refs.umeditor.insertHtml(message);
      },
      // 校验 富文本所填数据
      verify(callback) {
        let content = this.$refs.umeditor.getContent();
        if(!content) {
          this.$message.warning('模板内容不能为空');
          callback(false);
        }else{
          callback(content);
        }
      },
      // 预览
      handlePreview() {
        this.verify((content) => {
          if(content) {
            this.$refs.previewDialog.show(content);
          }
        });
      },
      // 保存
      handleSubmit() {
        this.verify((content) => {
          if(content) {
            // 提交数据
          }
        });
      },
      // 取消
      handleCancel() {
        this.$confirm('确认退出吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel',
          confirmButtonClass: 'confirm',
          center: true,
        }).then(() => {
          this.$router.push(`/main/tplSettingEdit?clientCode=${this.$route.query.clientCode}&prodTempId=${this.$route.query.prodTempId}`);
        },() => {
        });
      },
    },
  }
</script>

<style lang="scss" scoped>


.webpage-editor-box{
  overflow: auto;
  height: 100%;
}
.webpage-editor-title{
  height: 75px;
  background-color: #fff;
  box-sizing: border-box;
  .width-1200{
    width: 1200px;
    margin: 0 auto;
    font-size: 30px;
    color: #0f357f;
    padding-top: 21px;
  }
}
.webpage-editor-content{
  background-color: #F1F2F7;
  min-height: calc(100% - 75px);
}
.webpage-editor{
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  .umeditor-b{
    width: 900px;
  }
  .parameter-box{
    box-sizing: border-box;
    width: 290px;
    border: 1px solid #ddd;
    height: 860px;
    margin-left: 10px;
    overflow: auto;
  }
  .operation-box{
    position: fixed;
    top: 50%;
    transform: translate(0, -50%);
    z-index: 1000;
    img{
      cursor: pointer;
      position: absolute;
      left: -30px;
      top: -15px;
    }
    .operation{
      width: 150px;
      border-radius: 5px;
      border: 1px solid #ccc;
      text-align: center;
      padding: 20px 10px;
      position: relative;
      background-color: rgba(255,255,255,.5);
      button{
        width: 100%;
        margin-left: 0;
        margin-bottom: 20px;
      }
      button:last-child{
        margin-bottom: 0;
      }
      span{
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid #ccc;
        line-height: 20px;
        text-align: center;
        right: -10px;
        top: -10px;
        background-color: #fff;
        cursor: pointer;
      }
    }
  }
  .btn-box{
    text-align: center;
  }
}

</style>

<style lang="scss">

.webpage-editor-box{
  .fade-enter-active, .fade-leave-active {
    transition: all .6s;
  }
  .fade-enter, .fade-leave-to {
    transform: translateX(-150px);
    opacity: 0;
  }

  .edui-body-container{
    height: 800px;
  }
  .edui-btn-fullscreen{
    display: none;
  }
}


</style> 