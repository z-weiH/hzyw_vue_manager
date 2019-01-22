<template>
  <div class="webpage-editor-box">
    <div class="webpage-editor-title">
      <div class="width-1200">
        <span>{{title}}</span>
        <i @click="handleHelp" title="查看帮助文档" class="el-icon-question"></i>

        <div class="fr">
          <el-button @click="handleCancel" size="small" icon="el-icon-back"></el-button>
          <el-button @click="handlePreview" size="small">预览</el-button>
          <el-button @click="handleSubmit" type="primary" size="small">保存</el-button>
        </div>
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
          <parameter @copy="handleCopy" :uEditor="true"></parameter>
        </div>
        <!-- 悬浮操作 -->
        <div class="operation-box" @click.stop="() => {}">
          <img v-if="imgShow" @click="handleImg" src="@/assets/img/webpageEditorCircular.png" />
          <transition name="fade" mode="out-in">
            <div class="operation" v-if="boxShow">
              <span @click="handleBox">x</span>
              <el-button @click="handleInsertGrammar(1)">插入参数</el-button>
              <el-button @click="handleInsertGrammar(23)">插入注释</el-button>
              <el-dropdown @command="handleInsertGrammar" style="width:100%;" class="mb-20">
                <el-button>日期计算<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="26">日期格式</el-dropdown-item>
                  <el-dropdown-item :command="24">数字格式（加）</el-dropdown-item>
                  <el-dropdown-item :command="25">数字格式（减）</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <!-- <el-dropdown @command="handleInsertGrammar" style="width:100%;" class="mb-20">
                <el-button>当事人<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="18">申请人</el-dropdown-item>
                  <el-dropdown-item :command="20">申请人名字</el-dropdown-item>
                  <el-dropdown-item :command="19">被申请人</el-dropdown-item>
                  <el-dropdown-item :command="21">被申请人名字</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->
              <el-dropdown @command="handleInsertGrammar" style="width:100%;" class="mb-20">
                <el-button>判断<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="2">插入判断条件</el-dropdown-item>
                  <el-dropdown-item :command="3">插入多判断条件</el-dropdown-item>
                  <el-dropdown-item :command="22">日期判断</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-dropdown @command="handleInsertGrammar" style="width:100%;" class="mb-20">
                <el-button>分页<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="4">分页符</el-dropdown-item>
                  <el-dropdown-item :command="11">事实与理由-开始</el-dropdown-item>
                  <el-dropdown-item :command="12">事实与理由-结束</el-dropdown-item>
                  <el-dropdown-item :command="13">仲裁请求-开始</el-dropdown-item>
                  <el-dropdown-item :command="14">仲裁请求-结束</el-dropdown-item>
                  <el-dropdown-item :command="15">表格-开始</el-dropdown-item>
                  <el-dropdown-item :command="16">表格-结束</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>

              <el-dropdown @command="handleInsertGrammar" style="width:100%;" class="mb-20">
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

              <!-- <el-dropdown style="width:100%;" class="mb-20">
                <el-button>表格模板<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item :command="5">
                    <el-dropdown @command="handleTableTemplateHXXC" style="width:100%;">
                      <el-button style="border:none;">华夏信财<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                      <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item :command="1">应还款详情表</el-dropdown-item>
                        <el-dropdown-item :command="2">尚欠利息及服务费用计算表</el-dropdown-item>
                        <el-dropdown-item :command="3">尚欠罚息计算表</el-dropdown-item>
                        <el-dropdown-item :command="4">被申请人还款详情</el-dropdown-item>
                      </el-dropdown-menu>
                    </el-dropdown>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown> -->

              <p>
                复制样式
                <el-switch
                  @change="handleCopyChange"
                  v-model="copyStyle"
                >
                </el-switch>
              </p>
            </div>
          </transition>
        </div>

        <div class="clear"></div>
        <!-- <div class="mt-20 btn-box mb-20">
          <el-button @click="handlePreview" class="mr-30">预览</el-button>
          <el-button @click="handleSubmit" type="primary" class="mr-30">保存</el-button>
          <el-button @click="handleCancel" class="mr-30">返回</el-button>
        </div> -->
      </div>
    </div>

    <!-- 预览 dialog -->
    <previewDialog ref="previewDialog"></previewDialog>
    <!-- 帮助 dialog -->
    <helpDialog ref="helpDialog"></helpDialog>
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
  import parameter from './modules/parameter.vue'
  import helpDialog from './modules/helpDialog.vue'

  export default {
    components : {
      ueeditor,
      previewDialog,
      parameter,
      helpDialog,
    },
    data() {
      return {
        title : '',
        imgShow : true,
        boxShow : false,
        // 符文本编辑器 height
        ueeditorHeight : '780px',
        // 保存 全局点击 事件
        globalClickFn : () => {
          this.handleBox();
        },
        // 保存 全局复制 事件
        globalCopyFn : (event) => {
          if(this.copyStyle === false) {
            event.preventDefault(); // 取消默认的复制事件
            let sel = document.querySelector('iframe').contentDocument.getSelection();
            if(sel && sel.rangeCount > 0) {
              let copyFont = sel.getRangeAt(0).toString();
              return event.clipboardData.setData('text', copyFont); // 将信息写入粘贴板
            }
          }
        },
        // 当前复制是否 携带样式 false - 不带样式 ， true 带样式
        copyStyle : false,
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
          this.ueeditorHeight = document.body.clientHeight - 75 - 75 - 20;
          close.close();
          document.querySelector('iframe').contentDocument.addEventListener('click',this.globalClickFn);
          document.addEventListener('click',this.globalClickFn);
          document.querySelector('iframe').contentDocument.body.oncopy = this.globalCopyFn;
          // 增加富文本样式
          let style = document.createElement('style');
          style.innerHTML = 'pre{white-space: pre-wrap;word-wrap: break-word;word-break: break-all;}';
          document.querySelector('iframe').contentDocument.head.appendChild(style);
          // 初始化 title
          this.$http({
            url : '/templateSetting/queryTemplateInfoByProdTempId.htm',
            method : 'post',
            data : {
              prodTempId : this.$route.query.prodTempId,
            },
          }).then((res) => {
            this.title = (
              this.$route.query.type === 'applyContent' ? '申请书' :
              this.$route.query.type === 'judgeContent' ? '裁决书' :
              this.$route.query.type === 'enforceContent' ? '强制申请书' : ''
            ) + ' - ' + res.result.prodTempName
          });
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
      // 复制 开关 change
      handleCopyChange(val) {

      },
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
        let tabContFn = (text = '') => {
          return `<pre class="brush:js;toolbar:false;">&lt;@tableCol <br>  colNames=[<br>    "列名1",<br>    "列名2"<br>  ]<br>  colProperties=[<br>    参数1,<br>    参数2<br>  ]${text}<br>/&gt;</pre>`
        }
        if(type === 1) {
          message = '${参数}';
        }else if(type === 2) {
          // message = '&lt;#if 参数 &lt;= 0&gt;第一结果&lt;#else&gt;第二结果&lt;/#if&gt;';
          message = ["&lt;#if 参数 &lt;= 0&gt;","第一结果","&lt;#else&gt;","第二结果","&lt;/#if&gt;"];
          // message = `<pre class="brush:js;toolbar:false;">&lt;#if 参数 &lt;= 0&gt;<br>  第一结果<br>&lt;#else&gt;<br>  第二结果<br>&lt;/#if&gt;<br></pre>`;
        }else if(type === 3) {
          message = '&lt;#if x == 1&gt;x is 1&lt;#elseif x == 2&gt;x is 2&lt;#else&gt;x is not 1 nor 2&lt;/#if&gt;';
          // message = `<pre class="brush:js;toolbar:false;">&lt;#if x == 1&gt;<br>  x is 1<br>&lt;#elseif x == 2&gt;<br>  x is 2<br>&lt;#else&gt;<br>  x is not 1 nor 2<br>&lt;/#if&gt;<br></pre>`;
        }else if(type === 22) {
          message = '&lt;#if dateCompare("2018-11-10", "2018-11-10") == 1&gt;第一结果&lt;#else&gt;第二结果&lt;/#if&gt;';
          //message = `<pre class="brush:js;toolbar:false;">&lt;#if  dateCompare('2018-11-10', '2018-11-10') == 1&gt;<br>  第一结果<br>&lt;#else&gt;<br>  第二结果<br>&lt;/#if&gt;<br></pre>`;
        }else if(type === 4) {
          message = '&lt;@myPage /&gt;';
        }else if(type === 5) {
          message = '&lt;@tableCol colNames=["列名1","列名2","列名3","列名4"] colProperties=[参数1,参数2,参数3,参数4] /&gt;';
          // message = tabContFn();
        }else if(type === 6) {
          message = '&lt;@tableCol title="标题" colNames=["列名1","列名2","列名3","列名4"] colProperties=[参数1,参数2,参数3,参数4] /&gt;';
          // message = tabContFn('<br>  title="标题"');
        }else if(type === 7) {
          message = '&lt;@tableCol lastLine="说明"  colNames=["列名1","列名2","列名3","列名4"] colProperties=[参数1,参数2,参数3,参数4] /&gt;';
          // message = tabContFn('<br>  lastLine="说明"');
        }else if(type === 8) {
          message = '&lt;@tableCol lastLine="说明" title="标题"  colNames=["列名1","列名2","列名3","列名4"] colProperties=[参数1,参数2,参数3,参数4] /&gt;';
          // message = tabContFn('<br>  lastLine="说明"<br>  title="标题"');
        }else if(type === 9) {
          message = '&lt;@tableCol stat=true colNames=["列名1","列名2","列名3","列名4"] colProperties=[参数1,参数2,参数3,参数4] /&gt;';
          // message = tabContFn('<br>  stat=true');
        }else if(type === 10) {
          message = '&lt;@tableCol stat=true title="标题" colNames=["列名1","列名2","列名3","列名4"] colProperties=[参数1,参数2,参数3,参数4] /&gt;';
          // message = tabContFn('<br>  stat=true<br>  title="标题"');
        }else if(type === 11) {
          message = '<span class="asdf">startFact</span>';
        }else if(type === 12) {
          message = '<span class="asdf">endFact</span>';
        }else if(type === 13) {
          message = '<span class="asdf">startRequest</span>';
        }else if(type === 14) {
          message = '<span class="asdf">endRequest</span>';
        }else if(type === 15) {
          message = '<span class="asdf">startTable</span>';
        }else if(type === 16) {
          message = '<span class="asdf">endTable</span>';
        }else if(type === 17) {
          message = '&lt;@dateOffsetCalc date=myDate days=1 /&gt;';
        }else if(type === 18) {
          message = '&lt;@multiApp /&gt;';
        }else if(type === 19) {
          message = '&lt;@multiRes /&gt;';
        }else if(type === 20) {
          message = '&lt;@multiPartyInfo list="multiApps" index=1 field="appAddress" /&gt;';
        }else if(type === 21) {
          message = '&lt;@multiPartyInfo list="multiReses" index=1 field="appAddress" /&gt;';
        }else if(type === 23) {
          message = '&lt;!-- 注释 --&gt;';
        }else if(type === 24) {
          message = '&lt;@dateDiffCalc date1=nowDate （当日）date2=violateStartDate（裁决日期） days=-6 /&gt;';
        }else if(type === 25) {
          message = '&lt;@dateDiffCalc date1=nowDate （当日）date2=violateStartDate（裁决日期） days=6 /&gt;';
        }else if(type === 26) {
          message = '&lt;@dateOffsetCalc date=violateStartDate days=1 /&gt;';
        }
        this.$refs.ueeditor.insertHtml(message);
        this.handleBox();
      },
      // 表格模板 - 华夏信财
      handleTableTemplateHXXC(type) {
        let message = '';
        if(type === 1) {
          message = `<pre class="brush:js;toolbar:false;">&lt;@tableHXXC<br>  colNames=["期数","当期应还时间","应还本金","应还利息","应还服务费","已还本金","已还利息","已还服务费","尚欠本金","尚欠利息","尚欠服务费","剩余本金"]<br>  colProperties=[instalmentCredit_borrowEndDate, instalmentCredit_amtCapital, instalmentCredit_amtRate, instalmentCredit_amtOther, instalmentCredit_amtCapitalRefund, instalmentCredit_amtRateRefund, instalmentCredit_amtOtherRefund]<br>  title="应还款详情表"<br>  lastLine="被申请人尚欠本金{remainingAmtCapital}元、按年利率24%标准调整后的尚欠利息及服务费用{calcStillOwnAmtRateAndOther}元（详见尚欠利息及服务费用计算表）、罚息{calcPenalty}元（详见罚息计算表）。"<br>  colIndexList=[0, 8, 9, 10, 11]<br>  calcMethods=["getDaysInstalment", "stillOwnAmtCapital", "stillOwnAmtRate", "stillOwnAmtOther", "remainingAmtCapital"]<br>/&gt;<br></pre>`;
        }else if(type === 2) {
          message = `<pre class="brush:js;toolbar:false;">&lt;@tableHXXC <br>  colNames=["开始时间","结束时间","天数","本金基数","产生利息及服务费用","已还利息及服务费用","尚欠利息及服务费用"]<br>  colProperties=[]<br>  title="尚欠利息及服务费用计算表（计算标准调整为以剩余借款本金为基数，按年利率24%标准计算）"<br>  colIndexList=[0, 1, 2, 3, 4, 5, 6]<br>  calcMethods=["stillOwnRateAndOtherBeginDate", "stillOwnRateAndOtherEndDate", "stillOwnRateAndOtherDiffDays", "stillOwnRateAndOtherAmtCapital", "stillOwnAmtRateAndOtherAmtRateAndOther", "stillOwnAmtRateAndOtherRefund", "stillOwnAmtRateAndOtherAmtRateAndOther"]<br>/&gt;<br></pre>`;
        }else if(type === 3) {
          message = `<pre class="brush:js;toolbar:false;">&lt;@tableHXXC <br>  colNames=["开始时间","结束时间","逾期天数","本金基数","产生罚息","已还罚息","尚欠罚息"]<br>  colProperties=[]<br>  title="尚欠罚息计算表（计算标准：0.05%/日）"<br>  colIndexList=[0, 1, 2, 3, 4, 5, 6]<br>  calcMethods=["stillOwnPenaltyBeginDate", "stillOwnPenaltyEndDate", "stillOwnPenaltyOverdueDays", "stillOwnPenaltyAmtCapital", "stillOwnPenaltyCalcPenalty", "stillOwnPenaltyRefundPenalty", "stillOwnPenaltyLeftPenalty"]<br>/&gt;<br></pre>`;
        }else if(type === 4) {
          message = `<pre class="brush:js;toolbar:false;">&lt;@tableHXXC <br>  colNames=["还款次数","还款时间","还款总额","已还本金","已还利息","已还服务费用","已还罚息"]<br>  colProperties=[refundInfo_refundDate, refundInfo_amtActural, instalmentCredit_amtOverdue] title="被申请人还款详情" colIndexList=[0, 3, 4, 5]<br>  calcMethods=["getDaysInstalment", "refundDetailAmtCapital", "refundDetailAmtRate", "refundDetailAmtOther"]<br>  stat=true<br>  statColIndexList=[2, 3, 4, 5, 6]<br>  statCalcMethods=["refundDetailSumRefund", "refundDetailSumRefundAmtCapital", "refundDetailSumRefundAmtRate", "refundDetailSumRefundAmtOther", "refundDetailSumRefundAmtOverdue"] <br>/&gt;<br></pre>`;
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
      // 查看帮助文档
      handleHelp() {
        window.open('http://file.arbexpress.cn/zct/document/template/template_dynamic_document.pdf');
      },
    },
    destroyed() {
      document.querySelector('iframe').contentDocument.removeEventListener('click',this.globalClickFn);
      document.removeEventListener('click',this.globalClickFn);
      document.querySelector('iframe').contentDocument.body.removeEventListener('copy',this.globalCopyFn);
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
    width: 1300px;
    margin: 0 auto;
    color: #0f357f;
    padding-top: 21px;
    >span{
      font-size: 30px;
    }
    .el-icon-question{
      cursor: pointer;
    }
  }
}
.webpage-editor-content{
  background-color: #F1F2F7;
  min-height: calc(100% - 75px);
}
.webpage-editor{
  width: 1300px;
  margin: 0 auto;
  overflow: hidden;
  .ueeditor-b{
    width: 940px;
  }
  .parameter-box{
    box-sizing: border-box;
    width: 350px;
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
      background-color: rgba(255,255,255,.8);
      button{
        width: 100%;
      }
      >button{
        width: 100%;
        margin-left: 0;
        margin-bottom: 20px;
      }
      >button:last-child{
        margin-bottom: 0;
      }
      >div{
        margin-bottom: 20px;
      }
      >div:last-child{
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
