<template>
  <div class="rule-base">

    <div class="title-box">
      <div>
        <span class="m-title">规则库</span>
        <div class="fr">
          <el-button type="primary" class="mt-20" @click="handleExecute">执行规则</el-button>
        </div>
      </div>
    </div>
    <div class="content-box">
      <div class="fl m-left">
        <!--<el-tree -->
          <!--:data="treeData" -->
          <!--:props="{children : 'children' , label : 'label'}"-->
          <!--:highlight-current="true"-->
          <!--:expand-on-click-node="false"-->
          <!--@node-click="handleNodeClick"-->
        <!--&gt;-->
        <!--</el-tree>-->
        <el-menu
          background-color="#fff"
          text-color="#7C7C7C"
          active-text-color="#7C7C7C">
          <el-submenu :index="menu.levelId"  v-for="(menu,ii) in treeData" :key="ii">
            <template slot="title">
              <div @click="handleNodeClick(menu)" :class="{'currentMenu': currentMenu.levelId === menu.levelId}">{{menu.labelName}}</div>
            </template>
            <el-menu-item-group v-for="(sub,index) in menu.children" :key="index">
              <el-submenu :index="sub.levelId">
                <template slot="title" >
                  <div @click="handleNodeClick(sub)" :class="{'currentMenu': currentMenu.levelId === sub.levelId}">
                    {{sub.labelName}}
                  </div>
                </template>
                <el-menu-item-group v-for="(group,idx) in sub.children" :key="idx">
                  <el-submenu :index="group.levelId">
                    <template slot="title" >
                      <div @click="handleNodeClick(group)" :class="{'currentMenu': currentMenu.levelId === group.levelId}">
                      {{group.labelName}}
                      </div>
                    </template>
                  <el-menu-item :index="item.levelId" v-for="(item,i) in group.children" :key="i" @click="handleNodeClick(item)" :class="{'currentMenu': currentMenu.levelId === item.levelId}">{{item.labelName}}</el-menu-item>
                  </el-submenu>

                </el-menu-item-group>
              </el-submenu>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="fl m-right" style="height: 100%;">
          <div class="rule_title">
            {{currentRule}}
          </div>

        <div class="rule_body" >
            <div class="rule_desc">
              <el-button style="margin-top: 5px;" class="fr" icon="el-icon-plus"  type="primary" plain @click="handleCreate">添加规则</el-button>
              <span>规则列表</span>
              （共{{pager.count}}条)
            </div>
          <img src="@/assets/img/no_rule.png" style="width:100%;" alt="" v-if="pager.count === 0">
            <ul class="rule_list" v-if="pager.count > 0">
              <li class="rule_item" v-for="(rule,index) in ruleList" :key="index">
                <div class="ruleDesc">
                  <div class="btns fr">
                    <span class="edit_btn colLink" @click="handleEdit(rule)">编辑</span>
                    <span class="delete_btn colLink" @click="handleDelete(rule)">删除</span>
                  </div>
                  <b >{{(pager.currentNum-1) * 5 + index + 1}}.</b>
                  <span>{{rule.ruleDesc}}</span>
                </div>
                <div class="auditOpinion">
                  <span class="rule_title_desc">审核意见</span>
                  <span>{{rule.auditOpinion}}</span>
                </div>
                <div class="modularType">
                  <span class="rule_title_desc">所属模块</span>
                  <!--1-身份证，2-签名，3-证据链-->
                  <span>{{rule.modularType == 1 ? "身份证" : rule.modularType == 2 ? "签名" : "证据链"}}模块</span>
                </div>
                <div class="ruleInfo">
                  <span class="rule_title_desc">规则代码</span>
                  <span>{{rule.ruleInfo}}</span>
                </div>


              </li>
            </ul>

            <div class="pagination clear" v-if="pager.count > 0">
              <el-pagination
                @current-change="handleCurrentChange"
                :current-page="pager.currentNum"
                :page-size="5"
                layout="prev, pager, next, jumper, total"
                :total="pager.count">
              </el-pagination>
            </div>

          </div>



      </div>
    </div>

    <el-dialog
      :visible.sync="show"
      v-dialogDrag
      :title="title"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @open="resetForm"
      width="495px"
      center>
      <!--<edits ref="edits" :edit-items="createItems" :item="item" :label-width="'120px'"></edits>-->
      <el-form  ref="createForm" :model="form" label-width="100px" :rules="rules">
        <el-form-item label="规则描述：" prop="ruleDesc">
          <el-input v-model="form.ruleDesc" placeholder="请填写规则描述,如“标的金额是否正确”"></el-input>
        </el-form-item>
        <el-form-item label="层级：">
          <el-input v-model="form.cengji" disabled></el-input>
        </el-form-item>
        <el-form-item label="审核意见：" prop="auditOpinion">
          <el-input v-model="form.auditOpinion" placeholder="请填写审核意见,如“被申请人姓名与身份证不一致”"></el-input>
        </el-form-item>
        <el-form-item label="模块：" prop="modularType">
          <!--1-身份证，2-签名，3-证据链-->
          <el-select v-model="form.modularType" placeholder="请选择模块">
            <el-option label="身份证审核" :value="1"></el-option>
            <el-option label="签名审核" :value="2"></el-option>
            <el-option label="证据链审核" :value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机审规则：" prop="ruleInfo">
          <el-input type="textarea" ref="textarea_rule" v-model="form.ruleInfo" @focus="handleFocus1" @keyup.native.13="changeLine"  :rows="7" placeholder="请填写机审规则"></el-input>
          <div class="textarea_warpar" ref="textarea_warpar" style="width: 100%;height: 100%;position: absolute;visibility: hidden;padding: 5px 15px;line-height:24px;" v-html="ruleInfo_html" ></div>
          <ul class="textarea_select" v-if="showSelect" ref="textarea_select">
            <li v-for="(name,index) in ruleNames" :key="index" :class="{'active': index == ruleIndex}">{{name}}</li>
          </ul>
          <div class="rightBtns" >
            <el-button size="mini" @click="handleAvriable">查看参数</el-button>
            <el-button size="mini" type="primary" @click="handleRun">运行</el-button>
          </div>
          <div class="runRes" v-if="runRes != 0">
            <i :class="runRes == 1 ? 'error' : 'succ'"></i>
            <span>{{runRes == 2? '可用' : '不可用'}}</span>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="HandleSave">确 定</el-button>
          <el-button @click="editState = 0">取 消</el-button>
        </span>
    </el-dialog>

    <el-dialog
      :visible.sync="executeflag"
      v-dialogDrag
      title="执行规则"
      @open="resetForm"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="495px"
      center>
      <!--<edits ref="edits" :edit-items="createItems" :item="item" :label-width="'120px'"></edits>-->
        <div class="form-item">
          <div class="left fl " >
            执行范围:
          </div>
          <div class="right fl slect_tree_warpar">
            <el-input
              placeholder="请选择范围"
              :suffix-icon="iconName"
              @focus="handleFocus"
              readonly
              v-model="selectLevel.labelName">
            </el-input>
            <div class="ruleLevel_select" v-if="iconName == 'el-icon-arrow-up'">
              <el-tree :data="treeData" :props="defaultProps" @node-click="handleSelect"></el-tree>
            </div>
          </div>
        </div>
        <div class="form-item">
          <div class="left fl " >
            推送日期:
          </div>
          <div class="right fl">
            <el-date-picker
              style="width: 135px; display: inline-block"
              v-model="startDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
            -
            <el-date-picker
              style="width: 135px; display: inline-block"
              v-model="endDate"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </div>
        </div>
      <div class="form-item">
        <div class="left fl " >
          案件数量:
        </div>
        <div class="right fl" style="color:#F1B543;">
          {{castNum}}
        </div>
      </div>
      <div class="form-item">
        <div class="left fl">
          执行规则:
        </div>
        <div class="right fl">
          <el-checkbox-group v-model="ruleIdList">
            <el-checkbox label="0000">全部规则</el-checkbox><br>
            <p v-for="(rule,index) in allruleList" :key="index">
              <el-checkbox   :label="rule.ruleId" name="type">{{rule.ruleDesc}}</el-checkbox>
            </p>
          </el-checkbox-group>
        </div>
      </div>


      <div slot="footer" class="dialog-footer clear" >
          <el-button type="primary"  @click="executeRule">确 定</el-button>
          <el-button @click="executeflag = false;">取 消</el-button>
        </div>
    </el-dialog>



    <el-dialog
      :visible.sync="executing"
      v-dialogDrag
      :show-close="false"
      title="提示"
      @open="resetForm"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="495px"
      center>
      <div class="m-bar" style="width: 300px; margin: 20px auto;text-align: center;">
        <m-progress :width="100" :height="20" v-if="isExecuting">执行中</m-progress>
        <template v-if="!isExecuting">
          <p>机审执行完毕！</p>
          <p>本次机审共对365件案件执行了4条规则，检出错误34处</p>
          <el-button type="primary"  @click="executing = false;">确 定</el-button>
        </template>

      </div>
    </el-dialog>



  </div>
</template>

<script>
  import progress from './modules/progress.vue'
  export default {
    components : {
      'm-progress' : progress,
    },
    data() {
      return {

        //控制运行结果
        runRes : 2, //0 未运行，1 失败， 2 成功

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


        //tree config
        defaultProps:{
          children: 'children',
          label: 'labelName'
        },

        //下拉框图标
        iconName: 'el-icon-arrow-down',

        //规则表单
        form: {},

        //表單規則
        rules: {
          ruleDesc: [
            { required: true, message: '请输入规则描述', trigger: 'blur' },
          ],
          auditOpinion: [
            { required: true, message: '请输入审核意见', trigger: 'blur' },
          ],
          modularType: [
            { required: true, message: '请选择模块', trigger: 'blur' },
          ],
          ruleInfo: [
            { required: true, message: '请输入机审规则', trigger: 'blur' },
          ],


        },


        //执行选择参数
        selectLevel:{}, //选中层级
        treeId:"",//树id
        startDate:'',//开始时间
        endDate:'',//结束时间

        //案件数量
        castNum:'-',

        //可执行规则
        allruleList: [],

        //选中的执行规则id列表
        ruleIdList: [],

        //控制弹窗
        editState: 0, // 1编辑 2新增

        //执行弹窗
        executeflag: false,

        //执行中弹窗
        executing: false,

        //是否执行完成
        isExecuting: true,

        currentRule:'',
        currentMenu: {},
        progress : 80,
        treeData : [],
        ruleList: [],
        pager: {
          currentNum: 1,
          pageSize: 5,
          count: 0,
        }

      }
    },
    mounted() {


    },
    computed: {

      title(){
        return this.editState == 1 ? "编辑规则" : "添加规则";
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
        //规则输入的交互逻辑
        if(val){
          if(val.indexOf("$") == -1 && this.showSelect){
            this.showSelect = false;
          }
          if(this.showSelect){
            let index = val.lastIndexOf("$");
            let find = val.substr(index+1);
            this.ruleNames = this.allNames.filter(it => it.indexOf(find) != -1);
            this.ruleIndex = 0;
          }
          if(val[val.length - 1] === '$'){
            let str = val;
            this.ruleInfo_html = str.substr(0,val.length -1 ).replace(/\n/g,'<br/>') + "<span>$</span>";
            !this.showSelect && (this.showSelect = true);
            this.$nextTick(() => {
              let elms = this.$refs.textarea_warpar.querySelectorAll('span');
              let elm = elms[elms.length - 1];
              this.$refs.textarea_select.style.left = elm.offsetLeft+6 + 'px';
              this.$refs.textarea_select.style.top = elm.offsetTop+12 + 'px';
            });

          }else{
            this.ruleInfo_html = val;
            console.log(this.ruleInfo_html.indexOf('\n'))
            this.ruleInfo_html = this.ruleInfo_html.replace(/\n/g,'<br/>');
            console.log(this.ruleInfo_html);
          }
        }else{
          this.showSelect = false;
        }



      }
    },
    methods : {

      //运行按钮
      handleRun(){
        // this.form.ruleInfo
        this.$http.post('/ruleBase/ruleInfoByRuleInfo.htm',{ruleInfo: this.form.ruleInfo})
          .then(res => {
            if(res.code === '0000'){

            }
          })
      },

      //执行规则
      executeRule() {
        let arr = [].concat(this.ruleIdList);
        let idx = arr.findIndex(it => it === '0000');
        if(idx != -1){
          arr.splice(idx,1);
        }
        console.log(this.ruleIdList)

        this.execute({endDate: this.endDate,levelId: this.selectLevel.levelId,ruleIdList:arr,ruleLevel: this.selectLevel.ruleLevel,startDate: this.startDate});
      },
      //执行规则实现函数
      execute(item){
        this.$http.post('/rule/executeRuleByBaseQuery.htm',item,{mheaders: true}).then(res => {

          if(res.code === '0000'){
            if(res.result.progressId === 0 ){
              //执行中
              if(!this.executing){
                this.executing = true;
              }
              this.execute(item);
            }
            else{
              this.$message.success("执行成功");
              this.isExecuting = false;
            }
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
        this.$http.post('/rule/countCaseNumByBaseQuery.htm',{startDate: this.startDate,endDate: this.endDate,ruleLevel: this.selectLevel.ruleLevel,treeId:this.selectLevel.levelId}).then(res => {
          if(res.code === '0000'){
            this.castNum = res.result;
          }
        })
      },
      //执行规则接口
      ruleListQuery(){
        this.$http.post("/rule/queryAllRuleListByTreeId.htm",{ruleLevel: this.selectLevel.ruleLevel,treeId: this.selectLevel.levelId}).then(res => {
          if(res.code === '0000'){
            this.allruleList = res.result;
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
        this.selectLevel = data;
      },


      handleExecute(){
        this.executeflag = true;
        //执行选择参数初始化
        this.selectLevel={}; //选中层级
        this.startDate='';//开始时间
        this.endDate=''//结束时间
      },
      //查看参数
      handleAvriable() {

        window.open(this.$router.resolve({path:'/parameterList', query: {fromRule:true}}).href,'_blank');

      },
      //編輯規則
      handleEdit(rule) {
        this.$http.post("/ruleBase/ruleInfoDetailsByRuleId.htm",{ruleId: rule.ruleId}).then(res => {
          if(res.code ==='0000'){
            this.editState = 1;
            this.form.cengji = this.currentMenu.labelName;
            this.$nextTick(()=> {
              this.$refs.createForm.resetFields();
              console.log(this.$refs.textarea_warpar);
              this.ruleInfo_html = this.form.ruleInfo;
              this.form = res.result;
            });
          }
        })
      },
      //删除规则
      handleDelete(rule){
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
        this.form = {cengji: this.currentMenu.labelName , levelId: this.currentMenu.levelId, ruleLevel: this.currentMenu.ruleLevel,modularType:null};
        this.$set(this.form,'ruleInfo','');
      },
      // 保存
      HandleSave(){
        this.$refs['createForm'].validate((valid) => {
          if(valid){
            this.$http.post("/ruleBase/saveRuleInfo.htm", this.form).then(res => {
              if(res.code == '0000'){
                this.$message.success(res.description);
                this.editState = 0;

                this.handleNodeClick(this.currentMenu);
              }
            })
          }
        })

      },
      handleCurrentChange(val){
        this.pager.currentNum = val;
        this.handleNodeClick(this.currentMenu);
      },

      handleNodeClick(item){
        let obj = Object.assign({},item);
        obj.children = null;
        this.currentMenu = obj;
        this.currentRule = obj.labelName;
        this.$http.post("/ruleBase/ruleInfoByBaseQuery.htm",Object.assign(obj,this.pager)).then(res => {
          if(res.code === '0000'){
            this.ruleList = res.result.list;
            this.pager.count = res.result.count;
          }
        })
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
        arr.forEach(it => {
            if(it[property].length == 0){
              it[property] = null;
            }else{
              this.deleteProperty(it[property],property);
            }

        })
        // if(arr.property){
        //   if(arr.property.Constructor == Array && arr.property.length == 0){
        //     arr.property = null;
        //   }else{
        //     arr.property.forEach(it => this.deleteProperty(it,property));
        //   }
        // }

      }
    },
    created(){

      this.$http.post('/rule/queryRuleTree.htm').then(res => {
        if(res.code === '0000'){
          this.deleteProperty([res.result],"children");
          this.treeData = [res.result];

          console.log(this.treeData)
          this.handleNodeClick(Object.assign({},this.treeData[0]));
        }
      })
      document.addEventListener("click",(e) => {
        if(this.executeflag && !this.checkClick(e.target)){
          if(this.iconName == 'el-icon-arrow-up'){
            this.iconName = 'el-icon-arrow-down';
          }
        }
      })
    }
  }
</script>

<style lang="scss" scoped>

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
    height: 130px;
    border: 1px solid #aaa;
    position: absolute;
    background: #fff;
  }
  //textarea 的 按钮
  .rightBtns{
    position: absolute;
    right: 10px;
    bottom: 0;
  }
  .runRes{
    font-size:12px;
    line-height: 12px;
    i{
      height:0px;
      width:0px;
      display: inline-block;
      border: 6px solid #3A3A3A;
      border-radius: 50%;
      &.succ{
        border-color: #66CC33;
      }
      &.error{
        border-color:#CC0000;
      }
    }
    position: absolute;
    left: 10px;
    bottom: 10px;

  }

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
      font-size: 30px;
      color: #0f357f;
      display: inline-block;
      margin-top: 21px;
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
        margin: 20px 0;
        padding: 10px;
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


</style>
