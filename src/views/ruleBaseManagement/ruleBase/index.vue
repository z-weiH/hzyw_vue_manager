<template>
  <div class="rule-base">

    <div class="title-box">
      <div>
        <span class="m-title">
          <span>规则库</span>
          <a title="查看帮助文档" class="el-icon-question" target="_blank" href="http://file.arbexpress.cn/zct/document/rule/rule_document.pdf"></a>
        </span>
        <div class="fr">
          <div class="fl mt-20" style="line-height: 21px;" v-if="exeResult != null">
            <p class="fl" style="color: #999; text-align: center">
              上次执行完成时间<br>
              {{exeResult.overTime | TimeMomentChina }}
            </p>
            <span @click="showList" class="colLink fl" style="margin: 0 20px;font-size: 16px;line-height: 37px;">
            查看
            </span>

          </div>
          <el-button v-if="!executing" type="primary" class="mt-20" @click="handleExecute">执行规则</el-button>
          <div class="fl mt-20" style="line-height: 21px;" v-if="executing">
            <span v-if="executing" @click="cancelList" class="colLink fl" style="margin: 0 20px;font-size: 16px;line-height: 37px;">
              取消
            </span>
          </div>
          <span class="exe_span" v-if="executing">
          正在执行 {{exeItem.currentCount}} / {{exeItem.totalCount}}
          </span>
        </div>
      </div>
    </div>
    <div class="content-box">
      <div class="fl m-left">

        <div class="fl" style="padding: 5px 8px 0;background: #fff;width: calc(100% - 16px);">
          <el-input v-model="filterText" placeholder="按业务、产品、模版筛选"></el-input>
        </div>
        <div style="clear: both;"></div>
        <el-tree ref="tree" node-key="levelId" :filter-node-method="filterNode" class="self-tree" :data="treeData" :default-expanded-keys="keys" :props="defaultProps" @node-click="handleNodeClickPlus"></el-tree>
      </div>
      <div class="fl m-right" style="height: 100%;">
        <div class="rule_title">
          {{currentRule}}
        </div>
        <div class="rule_body" >
          <div v-if="contentFlag">
            <div class="rule_desc">
              <div style="margin-top: 5px; color:#aaa;" class="fr">
                <el-button plain @click="copyRules">复制规则</el-button>
                <el-button plain @click="handleAvriable">参数列表</el-button>
                <!--<el-button plain @click="runSet">执行集合</el-button>-->
                <el-button plain @click="showCaseSample">案件样例</el-button>
                <el-button  icon="el-icon-plus"  type="primary" plain @click="handleCreate">添加规则</el-button>
              </div>
              <span>规则列表</span>
              （共{{pager.count}}条)
            </div>
            <img src="@/assets/img/no_rule.png" style="width:100%;" alt="" v-if="pager.count === 0">
            <ul class="rule_list" v-if="pager.count > 0">
              <li :class="{'active': rule.selected,'rule_item': true}" v-for="(rule,index) in ruleList" :key="index" @click="ruleSelect(rule)">
                <div class="ruleDesc">
                  <div class="btns fr">
                    <span class="edit_btn colLink" @click="handleEdit(rule,$event)">编辑</span>
                    <span class="edit_btn colLink" @click="handleDelete(rule,$event)">删除</span>
                    <span class="edit_btn colLink" @click="handleEnable(rule,$event)">{{rule.ruleStatus === 1 ? '停用' : '启用'}}</span>
                  </div>
                  <b >{{(pager.currentNum-1) * pager.pageSize + index + 1}}.</b>
                  <span>{{rule.ruleDesc}}</span>
                  <span class="mark" v-if="rule.ruleStatus === 1">已启用</span>
                </div>
                <div>{{rule.ruleInfo}}</div>
              </li>
            </ul>

            <div class="pagination clear" v-if="pager.count > 0">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="pager.currentNum"
                :page-size="pager.pageSize"
                :page-sizes="[10,  20, 50]"
                layout="prev,sizes, pager, next, jumper, total"
                :total="pager.count">
              </el-pagination>
            </div>
          </div>
          <div v-else>
            <div class="text-content">
              <p class="content-title">{{currentRule}}</p>
              <p class="content-desc">
                <b v-if="currentMenu.ruleLevel <= 1">{{numObj.bizNum}}个业务、</b>
                <b v-if="currentMenu.ruleLevel <= 2">{{numObj.productNum}}个产品、</b>
                <b v-if="currentMenu.ruleLevel <= 3">{{numObj.templateNum}}个模版、</b>
                <b v-if="currentMenu.ruleLevel <= 4">{{numObj.ruleNum}}条已启用规则</b>
              </p>
            </div>

          </div>
        </div>
      </div>
      <div class="clear"></div>
    </div>

    <el-dialog
      :visible.sync="show"
      v-dialogDrag
      :title="title"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @open="resetForm"
      width="800px"
      center>
      <!--<edits ref="edits" :edit-items="createItems" :item="item" :label-width="'120px'"></edits>-->
      <el-form  ref="createForm" :model="form"  label-width="100px" :rules="rules">
        <el-form-item label="规则描述：" prop="ruleDesc" >
          <el-input v-model="form.ruleDesc"  placeholder="请填写规则描述,如“标的金额是否正确”"></el-input>
        </el-form-item>


        <el-form-item label="机审规则：" prop="ruleInfo">
          <el-input type="textarea" class="rule_textarea" ref="textarea_rule" v-model="form.ruleInfo" @focus="handleFocus1" @keyup.native.13="changeLine"  :rows="12" placeholder="请填写机审规则"></el-input>
          <div class="textarea_warpar" ref="textarea_warpar" style="width: 100%;height: 100%;position: absolute;visibility: hidden;padding: 5px 15px;line-height:21px;box-sizing: border-box;"  v-html="ruleInfo_html" ></div>
          <!--<div class="textarea_warpar" ref="textarea_warpar1" style="width: 100%;height: 100%;position: absolute;visibility: hidden;padding: 5px 15px;line-height:21px;box-sizing: border-box;"  v-html="ruleInfo_html1" ></div>-->
          <!--<ul class="textarea_select" v-if="showSelect" ref="textarea_select">-->
          <!--<li v-for="(name,index) in ruleNames" :key="index" :class="{'active': index == ruleIndex}">{{name}}</li>-->
          <!--</ul>-->
          <span class="showPdf_btn"  v-if="showSelect"  ref="textarea_select" @click="pdfFlagChange">获取字段</span>
          <div class="rightBtns" >
            <el-button size="mini" @click="handleInputTemplate" v-if="editState === 2">导入模版</el-button>

            <el-button size="mini" @click="handleAvriable">查看参数</el-button>

            <el-button size="mini" type="primary" @click="handleRun" :disabled="canYanZheng">验证</el-button>
          </div>
          <!--<div class="runRes" v-if="runRes != 0">-->
          <!--<i :class="runRes == 1 ? 'error' : 'succ'"></i>-->
          <!--<span>{{runRes == 2? '可用' : '不可用'}}</span>-->
          <!--</div>-->
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <customer-button type="primary"  @click="HandleSave" :disabled="disabled">保存并关闭</customer-button>
          <el-button @click="editState = 0">取 消</el-button>
        </span>
    </el-dialog>


    <pdfSelector ref="pdfSelector" ></pdfSelector>

    <executeResult ref="executeResult"></executeResult>

    <addRule ref="addRule" :rule="form" > </addRule>
    <executionSet ref="executionSetDialog"></executionSet>
    <caseSample ref="caseSampleDialog" :rule="currentMenu"></caseSample>
    <copyRule ref="copyRule"/>
    <inputTemplate ref="inputTemplate"></inputTemplate>
    <pdfHtml ref="pdfHtml"></pdfHtml>
    <executeRuleDialog ref="executeRule" @progressCancel="exeCancel" @hiddenDialog="executing = true;" @progress="setExeItem" @progressDown="exeOver"></executeRuleDialog>
    <pdf-switch ref="pdfSwitch" @over="completeTextarea"></pdf-switch>
  </div>
</template>

<script>
  import executeRuleDialog from './modules/executeRuleDialog'
  import progress from './modules/progress.vue'
  import pdfSelector from './modules/pdf_selector'
  import executeResult from './modules/executeResultDialog'
  import addRule from './modules/addRuleDialog'
  import executionSet from './modules/executionSetDialog'
  import caseSample from './modules/caseSampleDialog'
  import copyRule from './modules/copyRuleDialog'
  import inputTemplate from './modules/inputTemplate'
  import pdfHtml from './modules/pdf_html'
  import pdfSwitch from './modules/pdfSwitch'
  export default {
    components : {
      'm-progress' : progress,
      pdfSelector,
      executeResult,
      addRule,
      executionSet,
      caseSample,
      copyRule,
      inputTemplate,
      pdfHtml,
      executeRuleDialog,
      pdfSwitch
    },
    data() {
      return {

        filterText: '',
        currentFunction: {},
        //證據鏈參數
        pdfParam: '',

        //規則類型
        ruleType: 0,

        //pdf获取字段的方法
        pdfFuctionName: ['getnum','get'],

        //控制鼠标连点
        disabled: false,

        //已配置规则
        // configurationRules: [],

        //默认展开的规则
        keys: [],
        //当前规则结果
        ruleRes: '--',
        //控制内容显示
        contentFlag: false,

        //统计的业务、产品、模版、规则
        numObj: {},

        // //控制运行结果
        // runRes : 2, //0 未运行，1 失败， 2 成功

        //規則函數列表
        ruleNames:[          "f1","f2","f3","f4"
        ],
        allNames:[
          "f1","f2","f3","f4"
        ],
        ruleIndex: 0,




        showSelect: false,

        //html内容
        ruleInfo_html: '',
        ruleInfo_html1: '',


        //tree config
        defaultProps:{
          children: 'children',
          label: 'labelName'
        },

        //下拉框图标
        iconName: 'el-icon-arrow-down',

        //规则表单
        form: {ruleDesc: '',ruleInfo: ''},

        //表單規則
        rules: {
          'ruleDesc': [
            { required: true, message: '请输入规则描述', trigger: 'blur' },
            {  max: 100, message: '规则描述最多100字', trigger: 'blur' }
          ],
          'ruleInfo': [
            { required: true, message: '请输入机审规则', trigger: 'blur' },
          ],


        },


        //执行选择参数
        selectLevel:{}, //选中层级
        treeId:"",//树id
        startDate: null,//开始时间
        endDate:'',//结束时间

        //案件数量
        castNum:'--',

        //可执行规则
        allruleList: [],

        //选中的执行规则id列表
        ruleIdList: [],

        //控制弹窗
        editState: 0, // 1编辑 2新增



        //执行中弹窗
        executing: false,

        exeItem: {currentCount: 0, totalCount: 0},

        //執行結果
        exeResult: null,


        //执行结果
        exeId: '',

        //title
        title: '',

        //执行进度
        executProgress: 0,
        progressWidth: 0,

        currentRule:'',
        currentMenu: {},
        progress : 80,
        treeData : [],
        ruleList: [],
        pager: {
          currentNum: 1,
          pageSize: 10,
          count: 0,
        },
        // canYanZheng: true

      }
    },


    computed: {

      canYanZheng(){
        return !this.form.ruleInfo || !this.form.ruleDesc;
      },
      canExecute(){
        if(!this.selectLevel.levelId )
          return true;
        if(this.castNum <= 0)
          return true;
        if(this.ruleIdList.length === 0)
          return true;
        else
          return false;
      },
      show :{
        get: function () {
          return this.editState != 0;
        },
        set: function (v) {
          if(!v)
            this.editState = 0
        }
      }
    },

    watch: {

      filterText(val) {
        this.$refs.tree.filter(val);
      },
      'editState'(val,oldVal){
        if(val == 1 || val == 2){
          this.showSelect = false;
          console.log(this.showSelect);
          if(val == 1)
            this.title = '编辑规则';
          if(val == 2)
            this.title = '添加规则';
          this.$nextTick(() => {
            this.$refs.textarea_rule.$el.querySelector("textarea").onscroll =() => {
              console.log('what');
              this.textareaValueChange(this.form.ruleInfo);
              // this.textareaValueChange1(this.form.ruleInfo);
            }
          })
        }

      },
      //控制全部规则，选中全部
      'ruleIdList'(val,oldVal){
        console.log(val);
        let arr = ["0000"];
        this.allruleList.forEach(it => {arr.push(it.ruleId);});
        if(val.indexOf("0000") != -1 && val.length != arr.length){
          this.ruleIdList = arr;
        }
      },
      'iconName'(val,oldval){
        if(val === 'el-icon-arrow-down' && this.selectLevel.levelId){

          this.castNumQuery();
          this.ruleListQuery();
        }
      },
      'startDate'(val,oldval){
        if(this.selectLevel && this.selectLevel.levelId){
          this.castNumQuery();
        }
      },
      'endDate'(){
        if(this.selectLevel && this.selectLevel.levelId){
          this.castNumQuery();
        }
      },

      'showSelect'(val,oldval){
        if(val){
          document.addEventListener("keydown",this.InputHelper);
        }else{
          this.ruleNames = this.allNames;
          document.removeEventListener("keydown",this.InputHelper);
        }
      },

      'form.ruleInfo'(val,oldVal){

        console.error(val,'valueChange');
        this.textareaValueChange(val);
        // this.textareaValueChange1(val);



      }
    },
    methods : {

      completeTextarea(text){
        this.form.ruleInfo = this.form.ruleInfo.splice(this.currentFunction.idx+ 1, 0,text);
        this.$refs.textarea_rule.focus();
        setTimeout(() => {
          this.showSelect = false;
        },300)
      },


      filterNode(value, data){
        if (!value) return true;
        return data.labelName.indexOf(value) !== -1;
      },

      exeCancel(){
        this.executing = false;
      },
      showList(){
        this.$refs.executeResult.show(this.exeResult.exeId,true);
      },
      cancelList(){
        this.$refs.executeRule.cancelExe();
      },
      setExeItem(item){
        this.exeItem = item;
      },

      exeOver(item){
        this.executing = false;
        this.exeResult = item;
        if(item.openResult){
          this.$refs.executeResult.show(this.exeResult.exeId,true);
        }
      },




      textareaValueChange(val){
        //规则输入的交互逻辑
        console.log(this.$refs.textarea_warpar.offsetHeight);
        let lastVal = val.substring(this.getCursorPos(this.$refs.textarea_rule.$el.querySelector("textarea"))).trim();
        val = val.substring(0, this.getCursorPos(this.$refs.textarea_rule.$el.querySelector("textarea")));
        this.ruleInfo_html = val;
        this.ruleInfo_html = this.ruleInfo_html.replace(/\n/g,'<br/>')
          .replace(/\s/g,'&nbsp;');

        console.log(this.ruleInfo_html,val);
        if(val){
          // console.error(',出现');
          this.currentFunction.idx = val.length-1;

          const functions = [
            {
              //取前后值
              type: 1,
              names: ['getPdfNum', 'getPdfDate', 'getPdfIdCard', 'getPdfString']
            },
            {
              //取前后值和小数位数
              type: 2,
              names: ['getPdfNumByDigits']
            },
            {
              //选框选择范围
              type: 3,
              names: ['getnum', 'getContent', 'getDate','getTableStingByPosition', 'getNumAnAnnual']
            },
            {
              //id选取操作
              type: 4,
              names: ['takeId','takeNumId','getDateId']
            },
            {
              type: 5,
              names: ['getZeroWidthValueString', 'getZeroWidthNum']
            }
          ]


          let strcopy = val.replace(/\s+/g, "");
          let type = -1;



          outer:
          for(let i = 0; i< functions.length; i ++){
            inner:
            for(let j = 0; j< functions[i].names.length ; j++){
              const reg = new RegExp(`^${functions[i].names[j]}\\([A-Z_0-9]+$`);
              const idx = strcopy.lastIndexOf(`${functions[i].names[j]}(`);
              if(idx !== -1 && reg.test(strcopy.substring(idx).trim())){
                type = functions[i].type;
                this.currentFunction.affix = strcopy.substring(idx);
                this.currentFunction.name = functions[i].names[j];
                break outer;
              }
            }
          }



          if(type != -1){
            this.ruleType = type;
            let idx = val.lastIndexOf('(');
            this.pdfParam = val.substring(idx+1).trim();
            this.ruleInfo_html += `<span style='font-size: 10px;padding: 2px 3px;'>获取字段</span>`
            this.showSelect = true;
            this.$nextTick(() => {
              let scrollTop = this.$refs.textarea_rule.$el.querySelector('textarea').scrollTop;
              let elms = this.$refs.textarea_warpar.querySelectorAll('span');
              let elm = elms[elms.length - 1];
              this.$refs.textarea_select.style.left = elm.offsetLeft+6 + 'px';
              this.$refs.textarea_select.style.top = elm.offsetTop - scrollTop + 'px';
            });
          }else{
            console.log(type,strcopy);
            this.showSelect && (this.showSelect = false);
          }

        }
      },


      //导入模版
      handleInputTemplate() {
        console.log(this.$refs.inputTemplate);
        this.$refs.inputTemplate.init();
      },
      //复制规则
      copyRules(){
        let  arr = this.ruleList.filter(it => it.selected);
        if(arr.length === 0){
          this.$message({
            message: '请先选择规则',
            type:'error'
          });
        }else{
          this.manageArr(this.treeData);
          console.log({treeData: this.treeData, keys: [this.currentMenu.parentId],rules: this.ruleList.filter(it => it.selected)});
          this.$refs.copyRule.show({treeData: this.treeData, keys: [this.currentMenu.parentId],rules: this.ruleList.filter(it => it.selected)});
        }
      },


      manageArr(arr){

        arr.forEach((it,idx) => {
          this.$set(it, 'disabled', false);
          if(it.ruleLevel !== 4){
            this.$set(it, 'disabled', true);
            // it.disabled = true;
            if(it.children){
              this.manageArr(it.children);
            }
          }else{
            if( it.levelId === this.currentMenu.levelId){
              this.$set(it, 'disabled', true);
              // it.disabled = true;
            }
          }
        })
      },

      ruleSelect(rule){
        rule.selected = !rule.selected;
      },
      checkcomma(str){
        if(str.indexOf(',') === -1){
          return true;
        }
        if(str.indexOf(',') > 5){
          return true;
        }
        return false;
      },
      getCursorPos(pTextArea) {
        var cursurPosition= this.form.ruleInfo.length;
        if(pTextArea.selectionStart){//非IE浏览器
          cursurPosition= pTextArea.selectionStart;
        }else{//IE
          try{
            var range = document.selection.createRange();
            range.moveStart("character",-pTextArea.value.length);
            cursurPosition=range.text.length;
          }catch (e) {

          }

        }
        return cursurPosition;
      },

      checkBracket(){
        let str = this.form.ruleInfo.substring(this.currentFunction.idx+1).trim();
        if(!str)
          return ')';
        else
          return  this.form.ruleInfo.substring(this.currentFunction.idx+1).trim()[0] === ')' ? '' : ')';
      },

      refreshRuleInfo(val) {
        console.log(val);
        let idx = val.indexOf('],');
        if(idx != -1){
          if(this.ruleType === 0){
            this.form.ruleInfo = this.form.ruleInfo.splice(this.currentFunction.idx + 1, 0 , ',' + val.substring(1,idx) + ')' + ' +' + this.currentFunction.affix+ ',' + val.substring(idx+3,val.length -1) );
          }else{
            this.form.ruleInfo = this.form.ruleInfo.splice(this.currentFunction.idx + 1, 0 ,',' + val.substring(1,idx) +')' + ' +' +this.currentFunction.affix+ ',' + val.substring(idx+3,val.length - 1) );
          }
        }else{
          this.form.ruleInfo = this.form.ruleInfo.splice(this.currentFunction.idx+ 1, 0,',' + val.substring(1,val.length - 1));
          console.log(this.form.ruleInfo);
        }
        this.$refs.textarea_rule.focus();
        setTimeout(() => {
          this.showSelect = false;
        },300)

      },
      setPid(val){
        this.form.ruleInfo = this.form.ruleInfo.splice(this.currentFunction.idx+ 1, 0,',' + val) +this.checkBracket();
        this.$refs.textarea_rule.focus();
        setTimeout(() => {
          this.showSelect = false;
        },300)
      },

      //pdf展开
      pdfFlagChange(){
        console.error(this.ruleType);

        if(this.ruleType === 1 || this.ruleType === 2){
          //获取前后文
          this.$http.post("/ruleBase/queryPdfUrlAndWithHigh.htm",{levelId: this.currentMenu.levelId, pdfParam: this.pdfParam}).then(res => {
            this.$refs.pdfSwitch.init({levelId: this.currentMenu.levelId, pdfParam: this.pdfParam, ruleType: this.ruleType, functionName: this.currentFunction.name});
            // const router = this.$router.resolve({path: '/rulePdfSwitch',query: }).href;
            // window.open(router,'_blank');
          })


        }
        else if(this.ruleType === 3){
          let type = 3;
          if(['getContent', 'getDate'].indexOf(this.currentFunction.name) !== -1){
            type = 1;
          }
          //选框选择
          this.$refs.pdfSelector.show({levelId: this.currentMenu.levelId, pdfParam: this.pdfParam, type: type});
        }
        else if(this.ruleType === 4){
          //takeId
          const loading =this.$loading({
            lock: true,
            text: '正在加载...',
            fullscreen: true,
            spinner: 'el-icon-loading',
            background: "hsla(0,0%,100%,.9)"
          });
          this.$http.post("/ruleBase/queryPdfUrlAndWithHigh.htm",{levelId: this.currentMenu.levelId, pdfParam: this.pdfParam}).then(res => {
            loading.close();
            this.$refs.pdfHtml.show(res.result);
          }).catch(() => {
            loading.close()
          })
        }

      },


      //案件样例
      showCaseSample(){
        this.$refs.caseSampleDialog.show();
      },

      //执行集合
      // runSet(){
      //   this.$refs.executionSetDialog.show({levelId : this.currentMenu.levelId})
      // },

      //运行按钮
      handleRun(){
        // this.form.ruleInfo
        // this.$http.post('/ruleBase/ruleInfoByRuleInfo.htm',{ruleInfo: this.form.ruleInfo})
        //   .then(res => {
        //     if(res.code === '0000'){
        //
        //     }
        //   })

        // 线上案件
        this.$http.post('/rule/queryOnLineCaseListByBaseQuery.htm',{levelId: this.currentMenu.levelId, ruleLevel: this.currentMenu.ruleLevel, pagerNum: 1,pageSize: 10}).then(res => {
          if(res.code === '0000'){
            let arr1 = res.result.list;
            //案件样例
            this.$http.post("/rule/querySimpleCaseListByBaseQuery.htm",{levelId: this.currentMenu.levelId, ruleLevel: this.currentMenu.ruleLevel,pagerNum: 1,pageSize: 10}).then(re => {
              if(re.code === '0000'){
                let arr2 = re.result.list;
                //都没有案件
                if(arr1.length === 0 && arr2.length === 0){
                  const h = this.$createElement;
                  this.$msgbox({
                    title: "提示",
                    message: h("div", null, [
                      h("p", null, "当前无案件样例或线上案件可供验证规则的正确性。"),
                      h("p", null, "建议您将规则暂时保存。")
                    ]),
                    center: true,
                    confirmButtonText: "确定",
                  })
                }else{
                  this.$refs.addRule.addRuleFlag = true;
                  //初始化验证规则的内容
                  this.$refs.addRule.initVerify(arr2,re.result.count,arr1,res.result.count,this.currentMenu, this.form.ruleInfo);
                }
              }
            })
          }
        })

      },




      //textarea换行
      changeLine(){
        this.ruleInfo_html += '<br/>';
      },
      //textarea的輸入補全
      InputHelper(event){
        // this.$refs.textarea_rule.blur();
        //下
        if(event.keyCode === 40){
          if(this.ruleIndex  === this.ruleNames.length -1){
            this.ruleIndex = 0;
          }
          else{
            this.ruleIndex ++;
          }
        }
        //上
        if(event.keyCode === 38){
          if(this.ruleIndex === 0){
            this.ruleIndex = this.ruleNames.length -1;
          }else{
            this.ruleIndex --;
          }
        }
        //確定
        if(event.keyCode === 13){
          event.preventDefault();
          let str = this.form.ruleInfo.substr(0,this.form.ruleInfo.lastIndexOf("$")+1);
          let fName = this.ruleNames[this.ruleIndex];
          this.form.ruleInfo = str +fName;
          this.showSelect = false;

        }
      },


      //查询执行规则中的可执行规则的案件数量
      castNumQuery(){
        // this.ruleListQuery();
        this.$http.post('/rule/countCaseNumByBaseQuery.htm',{startDate: this.startDate,endDate: this.endDate,ruleLevel: this.selectLevel.ruleLevel,levelId:this.selectLevel.levelId}).then(res => {
          if(res.code === '0000'){
            this.castNum = res.result;
          }
        })
      },
      //执行规则接口
      ruleListQuery(){
        this.$http.post("/rule/queryAllRuleListByLevelId.htm",{ruleLevel: this.selectLevel.ruleLevel,levelId: this.selectLevel.levelId}).then(res => {
          if(res.code === '0000'){
            this.allruleList = res.result;
            if(this.allruleList.length === 0){
              this.ruleRes = '此模版下无可执行规则';
            }

          }
        })
      },

      resetForm(){

      },
      //选择范围
      handleFocus(){
        this.iconName ='el-icon-arrow-up';
      },
      handleFocus1(){
        let textarea = document.querySelector("textarea");
        console.log(textarea)
        textarea.setAttribute("spellcheck",false);

      },
      handleSelect(data){
        console.log(data);
        if(data.ruleLevel !== 4){
          return;
        }
        this.iconName = 'el-icon-arrow-down';
        this.selectLevel = data;
      },


      handleExecute(){
        this.$refs.executeRule.show({treeData: this.treeData});
        // this.executeflag = true;
        // //执行选择参数初始化
        // this.selectLevel={}; //选中层级
        // // let myDate = new Date();
        // // let year = myDate.getFullYear();
        // // let month = myDate.getMonth() + 1 >= 10 ? myDate.getMonth() + 1 : '0' + (myDate.getMonth() + 1);
        // // let day = myDate.getDate() >= 10 ? myDate.getDate() : '0' + myDate.getDate();
        // // this.startDate=year + '-' + month + '-' + day;//开始时间
        //
        // this.startDate='';//结束时间
        // this.endDate='';//结束时间
        // this.ruleIdList = [];
        // this.castNum = '--';
        // this.allruleList = [];
        // this.ruleRes = '--';


      },

      //查看参数
      handleAvriable() {
        this.$http.post("/caseSample/queryCaseSampleList.htm",{levelId: this.currentMenu.levelId}).then(res => {
          if(res.result.count === 0){
            return this.$message.error("当前暂无案例")
          }
          window.open(this.$router.resolve({path:'/ruleParameterList',query:{levelId: this.currentMenu.levelId}}).href,'_blank');
        })

      },
      //編輯規則
      handleEdit(rule,e) {
        e.stopPropagation();
        this.$http.post("/ruleBase/queryRuleInfoDetailsByRuleId.htm",{ruleId: rule.ruleId}).then(res => {
          if(res.code ==='0000'){
            this.editState = 1;
            this.$nextTick(()=> {
              this.$refs.createForm.resetFields();
              this.$refs.textarea_rule.select();
              console.log(this.$refs.textarea_warpar);
              this.form = res.result;
              // this.ruleInfo_html = this.form.ruleInfo;

              // for(let key in res.result){
              //   this.$set(this.form,key,res.result[key]);
              // }
            });
          }
        })
      },


      handleEnable(rule, e){
        e.stopPropagation();
        this.$http.post("/rule/updateRuleStatusByRuleId.htm",{ruleId: rule.ruleId}).then(res => {
          this.$set(rule, 'ruleStatus', 1- rule.ruleStatus);
          this.$message.success(`规则已${rule.ruleStatus === 1 ? '启用' : '停用'}`)
        })
      },

      //删除规则
      handleDelete(rule,e){
        e.stopPropagation();
        let h = this.$createElement;
        this.$msgbox({
          title: "提示",
          message: h("div", null, [
            h("p", null, "确定删除这条规则？"),
            h("p", null, "(删除后，机审时将不再运行该规则。)")
          ]),
          center: true,
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(res => {
          if(res){
            //刪除接口
            this.$http.post("/ruleBase/deletedByRuleId.htm",{ruleId: rule.ruleId,reasonId: rule.reasonId}).then(r => {
              console.log(r);
              if(r.code === '0000'){
                this.handleNodeClick(this.currentMenu);
              }
            })
          }
        })
      },
      //添加规则
      handleCreate(){
        this.editState = 2;
        //刷新form表单验证
        this.$nextTick(()=> {
          this.$refs.createForm.resetFields();
          console.log(this.$refs.textarea_warpar);
          this.ruleInfo_html = this.form.ruleInfo;

        });
        this.form = { levelId: this.currentMenu.levelId, ruleLevel: this.currentMenu.ruleLevel};
        this.$set(this.form,'ruleInfo','');
        this.$set(this.form,'ruleDesc','');
      },
      // 保存
      HandleSave(){
        if(!this.disabled){
          this.disabled = true;
          setTimeout(() => {
            this.disabled = false;
          },2000)
          this.$refs['createForm'].validate((valid) => {
            if(valid){
              this.$http.post("/ruleBase/saveRuleInfo.htm", {levelId: this.currentMenu.levelId, ruleLevel: this.currentMenu.ruleLevel,parentId: this.currentMenu.parentId, ...this.form}).then(res => {
                if(res.code == '0000'){
                  this.$message.success(res.description);
                  this.editState = 0;


                  this.handleNodeClick(this.currentMenu);
                }
              })
            }
          })

        }

      },
      handleCurrentChange(val){
        this.pager.currentNum = val;
        this.handleNodeClick(this.currentMenu);
      },

      handleSizeChange(val){
        this.pager.pageSize = val;
        this.handleNodeClick(this.currentMenu);
      },

      //刷新规则
      // refreshRules(item){
      //   this.$http.post('/collection/queryRuleCollectionList.htm',{levelId: item.levelId}).then(res => {
      //     this.configurationRules = [];
      //     res.result.exeCollectionList.forEach(it => {
      //       this.configurationRules.push(it.ruleId);
      //     })
      //   })
      // },

      //判断规则是否被配置
      // checkRuleConfiged(ruleId){
      //   return this.configurationRules.indexOf(ruleId) != -1;
      // },

      handleNodeClickPlus(item){
        this.handleNodeClick(item, true);
        // this.refreshRules(item);
      },


      handleNodeClick(item, flag){
        let obj = Object.assign({},item);
        obj.children = null;
        this.currentMenu = obj;
        this.currentRule = obj.labelName;

        if(item.ruleLevel != 4){
          this.contentFlag = false;
          this.$http.post("/rule/queryRuleNumberByLevelIdAndRuleLevel.htm",item).then(res => {
            console.log(res);
            if(res.code === '0000'){
              this.numObj = res.result;
            }
          });
          return ;
        }

        this.contentFlag = true;
        //模版需要去查询列表
        if(this.currentMenu.ruleLevel === 4){
          if(flag){
            this.pager.currentNum = 1;
          }
          this.$http.post("/ruleBase/queryRuleInfoByBaseQuery.htm",Object.assign(obj,this.pager)).then(res => {
            if(res.code === '0000'){
              this.ruleList = res.result.list;
              this.ruleList.forEach(it => {
                this.$set(it,'selected',false);
              })
              this.pager.count = res.result.count;
            }
          })
        }

      },
      checkClick(elm){
        if(elm.className ==='right fl slect_tree_warpar'){
          return true;
        }
        if(elm.parentElement){
          return this.checkClick(elm.parentElement);
        }else{
          return false;
        }
      },
      //树状结构去掉空的children属性
      deleteProperty(arr,property){
        if(arr && arr instanceof Array){
          arr.forEach(it => {
            if(it[property].length == 0){
              it[property] = null;
            }else{
              it[property].forEach(i => {
                i.parentId = it.levelId;
              });
              this.deleteProperty(it[property],property);
            }

          })
        }

        // if(arr.property){
        //   if(arr.property.Constructor == Array && arr.property.length == 0){
        //     arr.property = null;
        //   }else{
        //     arr.property.forEach(it => this.deleteProperty(it,property));
        //   }
        // }

      }
    },

    mounted(){
      // this.$refs.executeResult.show(921);

    },
    created(){




      this.$http.post('/rule/queryRuleTree.htm').then(res => {
        if(res.code === '0000'){
          // this.deleteProperty([res.result],"children");
          this.treeData = [res.result];
          this.deleteProperty(this.treeData,"children");
          this.keys = [this.treeData[0].levelId];
          // this.treeData = res.result;
          console.log(this.treeData)
          this.handleNodeClick(Object.assign({},this.treeData[0]));
        }
      })
      // document.addEventListener("click",(e) => {
      //   if(this.executeflag && !this.checkClick(e.target)){
      //     if(this.iconName == 'el-icon-arrow-up'){
      //       this.iconName = 'el-icon-arrow-down';
      //     }
      //   }
      // })
    }
  }
</script>

<style lang="scss" scoped>

  .edit_btn{
    text-decoration: none;
  }

  .showPdf_btn{
    font-size: 10px;
    padding: 2px 3px;
    background: #66CC33;
    color: #fff;
    border-radius: 5px;
    position: absolute;
    outline: none;
    border: none;
    line-height: 14px;
    cursor: pointer;
  }
  .mark{
    font-size: 12px;
    padding: 2px 3px;
    background: #EAB468;
    color: #fff;
    border-radius:8px;
    white-space: nowrap;
  }

  .textarea_select{
    position: absolute;
    left: 0;
    top: 0;
    width: 220px;
    background: #3C3F41;
    li{
      padding-left: 5px;
      height: 20px;
      line-height: 20px;
      color: #fff;
      border-bottom: 1px solid transparent;
      &.active{
        background: #0052A4;
      }
    }
  }


  .currentMenu{
    color: #435F9A !important;
  }
  .form-item{
    margin-bottom: 15px;
    overflow: hidden;
    line-height: 40px;
    .left{

      width: 100px;
      text-align: right;
      padding-right: 20px;
    }

  }
  .ruleLevel_select{
    overflow-y: auto;
    z-index:999;
    width: 300px;
    height: 210px;
    border: 1px solid #dcdfe6;
    position: absolute;
    background: #fff;
  }
  //textarea 的 按钮
  .rightBtns{
    position: absolute;
    right: 10px;
    bottom: 0;
  }
  /*.runRes{*/
  /*font-size:12px;*/
  /*line-height: 12px;*/
  /*i{*/
  /*height:0px;*/
  /*width:0px;*/
  /*display: inline-block;*/
  /*border: 6px solid #3A3A3A;*/
  /*border-radius: 50%;*/
  /*&.succ{*/
  /*border-color: #66CC33;*/
  /*}*/
  /*&.error{*/
  /*border-color:#CC0000;*/
  /*}*/
  /*}*/
  /*position: absolute;*/
  /*left: 10px;*/
  /*bottom: 10px;*/

  /*}*/

  .rule-base{
    height: 100%;
    overflow: auto;
    background-color: #F1F2F7;
    .title-box{
      height: 75px;
      background-color: #fff;
      >div{
        width: 1200px;
        margin: 0 auto;
      }
      .m-title{
        color: #0f357f;
        display: inline-block;
        margin-top: 21px;
        >span{
          font-size: 30px;
        }
      }
    }
    .content-box{
      width: 1200px;
      margin: 0 auto;
      margin-top: 10px;
      .m-left{
        width: 300px;
        overflow-x:hidden;
        min-height: calc(100vh - 100px);
        background: transparent;
      }
      .m-right{
        width: 890px;
        margin-left: 10px;
        background-color: #fff;

        height: 300px;
      }
    }
  }
  .rule_title{
    height: 56px;
    background: #EEF3FF;
    font-size: 16px;
    color:#46629C;
    line-height: 56px;
    padding-left: 20px;
  }
  .rule_body{
    padding: 10px 20px 50px 20px;
    .rule_desc{
      height: 50px;
      color:#A0A0A0;
      span{
        color:#46629C;
        font-size:17px;
        line-height: 50px;
        padding-left:10px;
        border-left: 5px solid #46629C;
      }
    }
    .rule_list{

      .rule_item{
        border:1px solid #F3F5F7;
        cursor: pointer;
        margin: 20px 0;
        padding: 10px;
        &.active{
          border: 1px solid #46629C;
        }
        div{
          padding-left: 20px;
          color: #aaa;
          line-height: 20px;
          margin: 10px 0;
          .rule_title_desc{
            padding-right: 15px;
          }
          &.ruleDesc{
            margin: 0;
            padding-left: 0;
            color: #505050;
            font-size: 16px;
            line-height: 30px;
            b{
              padding-right: 10px;
            }
            .btns{
              margin-right: 5px;
              font-size: 14px;
              span{
                padding:0 10px;
                &.delete_btn{
                  color: #656565;
                }
              }
            }
          }
        }

      }
    }
  }
  .text-content{
    text-align: center;
    margin-top: 30px;
    min-height: 800px;
    .content-title{
      font-size: 24px;
      color:#666666;
      margin: 18px 0;
    }
    .content-desc{
      color: #7F7F7F;
      font-size: 18px;
    }
  }


  .exe_span{
    float: right;
    font-size: 16px;
    color: #999;
    margin-top: 20px;
    line-height: 38px;
  }
</style>
