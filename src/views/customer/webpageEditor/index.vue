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
        <div class="fl ueeditor-b">
          <ueeditor ref="ueeditor" :height="ueeditorHeight"></ueeditor>
        </div>
        <!-- 参数 -->
        <div class="fl parameter-box" :style="{height : ueeditorHeight + 80 + 'px'}">
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
              <el-button @click="handleInsertGrammar(3)">插入多判断条件</el-button>
              <el-button @click="handleInsertGrammar(4)">分页符</el-button>
              <el-dropdown @command="handleInsertGrammar" style="width:100%;">
                <el-button>插入表格<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="5">普通表格</el-dropdown-item>
                  <el-dropdown-item :command="6">普通表格+标题</el-dropdown-item>
                  <el-dropdown-item :command="7">带说明</el-dropdown-item>
                  <el-dropdown-item :command="8">带说明+标题</el-dropdown-item>
                  <el-dropdown-item :command="9">带合计</el-dropdown-item>
                  <el-dropdown-item :command="10">带合计+标题</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </transition>
        </div>

        <div class="clear"></div>
        <div class="mt-20 btn-box mb-20">
          <el-button @click="handlePreview" class="mr-30">预览</el-button>
          <el-button @click="handleSubmit" type="primary" class="mr-30">保存</el-button>
          <el-button @click="handleCancel" class="mr-30">返回</el-button>
        </div>
      </div>
    </div>

    <!-- 预览 dialog -->
    <previewDialog ref="previewDialog"></previewDialog>
  </div>
</template>

<script>
  /* 
    let value = this.$refs.ueeditor.getContent();
    let $content = $('<div></div>').append($(value));
    $content.find('*').each((k,v) => {
      let $v = $(v);
      $v.css({
        'font-family' : 'FangSong'
      });
    });
    let FangSongValue = $content[0].innerHTML;
  */
  import ueeditor from '@/components/ueeditor'
  import previewDialog from './modules/previewDialog.vue'
  import parameter from '../parameterList/modules/parameter.vue'
  
  export default {
    components : {
      ueeditor,
      previewDialog,
      parameter,
    },
    data() {
      return {
        imgShow : true,
        boxShow : false,
        // 符文本编辑器 height
        ueeditorHeight : '780px',
      }
    },
    mounted() {
      let close = this.$loading({
        text : '加载中'
      });
      // 防止富文本没有加载完成；
      let fn = (data) => {
        try{
          this.$refs.ueeditor.setContent(data);
          this.ueeditorHeight = document.body.clientHeight - 75 - 75 - 40 - 50;
          close.close();
        }catch(err){
          setTimeout(() => {
            fn(data)
          },1000);
        }
      }
      // 回显数据
      this.$http({
        url : '/templateSetting/queryRichTextContentByIdAndType.htm',
        method : 'post',
        data : {
          prodTempId : this.$route.query.prodTempId,
          type : (
            this.$route.query.type === 'applyContent' ? 1 :
            this.$route.query.type === 'judgeContent' ? 2 :
            this.$route.query.type === 'enforceContent' ? 3 : ''
          ),
        },
      }).then((res) => {
        fn(res.result[this.$route.query.type] || '');
      }).catch(() => {
        close.close();
      });

    },
    methods : {
      // copy 参数
      handleCopy(data) {
        this.$refs.ueeditor.insertHtml(data);
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
          message = '${参数}';
        }else if(type === 2) {
          message = '&lt;#if 参数 &lt;= 0>第一结果&lt;#else&gt;第二结果&lt;/#if&gt;';
        }else if(type === 3) {
          message = '&lt;#if x == 1&gt;x is 1&lt;#elseif x == 2&gt;x is 2&lt;#else&gt;x is not 1 nor 2&lt;/#if&gt;';
        }else if(type === 4) {
          message = '&lt;@myPage&gt;&lt;/@myPage&gt;';
        }else if(type === 5) {
          message = '&lt;@tableCol colNames=["列名1","列名2","列名3","列名4"] colProperties=[参数1,参数2,参数3,参数4]&gt;&lt;/@tableCol&gt;';
        }else if(type === 6) {
          message = '&lt;@tableCol title="标题" colNames=["列名1","列名2","列名3","列名4"] colProperties=[参数1,参数2,参数3,参数4]&gt;&lt;/@tableCol&gt;';
        }else if(type === 7) {
          message = '&lt;@tableCol lastLine="说明"  colNames=["列名1","列名2","列名3","列名4"] colProperties=[参数1,参数2,参数3,参数4]&gt;&lt;/@tableCol&gt;';
        }else if(type === 8) {
          message = '&lt;@tableCol lastLine="说明" title="标题"  colNames=["列名1","列名2","列名3","列名4"] colProperties=[参数1,参数2,参数3,参数4]&gt;&lt;/@tableCol&gt;';
        }else if(type === 9) {
          message = '&lt;@tableCol stat=true colNames=["列名1","列名2","列名3","列名4"] colProperties=[参数1,参数2,参数3,参数4]&gt;&lt;/@tableCol&gt;';
        }else if(type === 10) {
          message = '&lt;@tableCol stat=true title="标题" colNames=["列名1","列名2","列名3","列名4"] colProperties=[参数1,参数2,参数3,参数4]&gt;&lt;/@tableCol&gt;';
        }
        this.$refs.ueeditor.insertHtml(message);
        this.handleBox();
      },
      // 校验 富文本所填数据
      verify(callback) {
        let content = this.$refs.ueeditor.getContent();
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
            this.$http({
              url : '/templateSetting/updateTemplateDetailByProdTempId.htm',
              method : 'post',
              data : {
                [this.$route.query.type] : content,
                prodTempId : this.$route.query.prodTempId,
              },
            }).then((res) => {
              this.$message.success('保存成功');
            });
          }
        });
      },
      // 取消
      handleCancel() {
        this.$confirm('确认返回吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          cancelButtonClass: 'cancel',
          confirmButtonClass: 'confirm',
          center: true,
        }).then(() => {
          this.$router.push(`/main/tplSettingEdit?clientCode=${this.$route.query.clientCode}&prodTempId=${this.$route.query.prodTempId}&templateId=${this.$route.query.templateId}`);
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
  .ueeditor-b{
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
      height: 284px;
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