<template>
  <div class="rule-base">
    <!-- <div class="m-bar">
      <m-progress :width="progress" :height="20">执行中</m-progress>
    </div> -->
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
          active-text-color="#435F9A">
          <el-submenu :index="menu.levelId"  v-for="(menu,ii) in treeData" :key="ii">
            <template slot="title">
              <div @click="handleNodeClick(menu)">{{menu.labelName}}</div>
            </template>
            <el-menu-item-group v-for="(sub,index) in menu.children" :key="index">
              <el-submenu :index="sub.levelId">
                <template slot="title" >
                  <div @click="handleNodeClick(sub)">
                    {{sub.labelName}}
                  </div>
                </template>
                <el-menu-item-group v-for="(group,idx) in sub.children" :key="idx">
                  <el-submenu :index="group.levelId">
                    <template slot="title" >
                      <div @click="handleNodeClick(group)">
                      {{group.labelName}}
                      </div>
                    </template>
                  <el-menu-item :index="item.levelId" v-for="(item,i) in group.children" :key="i" @click="handleNodeClick(item)">{{item.labelName}}</el-menu-item>
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
        <div class="rule_body">
          <div class="rule_desc">
            <el-button style="margin-top: 5px;" class="fr" icon="el-icon-plus"  type="primary" plain @click="handleCreate">添加规则</el-button>
            <span>规则列表</span>
            （共{{pager.count}}条)
          </div>
          <ul class="rule_list">
            <li class="rule_item" v-for="(rule,index) in ruleList" :key="index">
              <div class="ruleDesc">
                <div class="btns fr">
                  <span class="edit_btn colLink" @click="handleEdit">编辑</span>
                  <span class="delete_btn colLink" @click="handleDelete">删除</span>
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

          <div class="pagination clear">
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="pager.currentNum"
              :page-size="1"
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
      @open="resetForm"
      width="495px"
      center>
      <!--<edits ref="edits" :edit-items="createItems" :item="item" :label-width="'120px'"></edits>-->
      <el-form  ref="edits" :model="form" label-width="100px">
        <el-form-item label="规则描述：" >
          <el-input v-model="form.ruleDesc" placeholder="请填写规则描述,如“标的金额是否正确”"></el-input>
        </el-form-item>
        <el-form-item label="层级：">
          <el-input v-model="form.cengji" disabled></el-input>
        </el-form-item>
        <el-form-item label="审核意见：" >
          <el-input v-model="form.auditOpinion" placeholder="请填写审核意见,如“被申请人姓名与身份证不一致”"></el-input>
        </el-form-item>
        <el-form-item label="模块：">
          <!--1-身份证，2-签名，3-证据链-->
          <el-select v-model="form.modularType" placeholder="请选择模块">
            <el-option label="身份证审核" value="1"></el-option>
            <el-option label="签名审核" value="2"></el-option>
            <el-option label="证据链审核" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="机审规则：">
          <el-input type="textarea" v-model="form.ruleInfo" :rows="7" placeholder="请填写机审规则"></el-input>
          <div class="rightBtns" >
            <el-button size="mini" @click="handleAvriable">查看参数</el-button>
            <el-button size="mini" type="primary">运行</el-button>
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
        <div class="right fl">
          {{castNum}}
        </div>
      </div>
      <div class="form-item">
        <div class="left fl">
          执行规则:
        </div>
        <div class="right fl">
          1
        </div>
      </div>


      <div slot="footer" class="dialog-footer clear" >
          <el-button type="primary"  @click="castNumQuery">确 定</el-button>
          <el-button @click="executeflag = false;">取 消</el-button>
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

        //tree config
        defaultProps:{
          children: 'children',
          label: 'labelName'
        },

        //下拉框图标
        iconName: 'el-icon-arrow-down',

        //规则表单
        form: {},


        //执行选择参数
        selectLevel:{}, //选中层级
        treeId:"",//树id
        startDate:'',//开始时间
        endDate:'',//结束时间

        //案件数量
        castNum:'-',

        //控制弹窗
        editState: 0, // 1编辑 2新增

        //执行弹窗
        executeflag: false,

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
          // [{
          //   label : '公共规则',
          //   children : [
          //     {
          //       label : 'P2P现金贷业务',
          //       children : [
          //         {
          //           label : '奇速贷',
          //           children : [
          //             {
          //               label : '奇速贷-1001',
          //               id : 1,
          //             },
          //             {
          //               label : '奇速贷-1002',
          //               id:2,
          //             },
          //             {
          //               label : '奇速贷-1003',
          //               id: 3
          //             },
          //           ],
          //         }
          //       ],
          //     }
          //   ],
          // }],
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
    methods : {
      //查询执行规则中的可执行规则的案件数量
      castNumQuery(){
        this.ruleListQuery();
        this.$http.post('/rule/countCaseNumByBaseQuery.htm',{startDate: this.startDate,endDate: this.endDate,ruleLevel: this.selectLevel.ruleLevel,treeId:this.selectLevel.levelId}).then(res => {
        })
      },
      //执行规则接口
      ruleListQuery(){
        this.$http.post("/rule/queryAllRuleListByTreeId.htm",{ruleLevel: this.selectLevel.ruleLevel,treeId: this.selectLevel.levelId}).then(res => {

        })
      },

      resetForm(){},
      //选择范围
      handleFocus(){
        this.iconName ='el-icon-arrow-up';
      },
      handleSelect(data){
        console.log(data);
        this.selectLevel = data;
      },


      handleExecute(){
        this.executeflag = true;
      },
      //查看参数
      handleAvriable() {
        this.$router.push({path:'/parameterList'});
      },
      handleEdit() {
        this.editState = 1;
      },
      //删除规则
      handleDelete(){
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
            this.$http.post().then(r => {

            })
          }
        })
      },
      handleCreate(){
        this.editState = 2;
        this.form = {cengji: this.currentMenu.labelName , levelId: this.currentMenu.levelId, ruleLevel: this.currentMenu.ruleLevel}
      },
      HandleSave(){
        this.$http.post("/ruleBase/saveRuleInfo.htm", this.form).then(res => {
          if(res.code == '0000'){
            this.$message.success(res.description);
            this.handleNodeClick(this.currentMenu);
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
      }
    },
    created(){
      this.$http.post('/rule/queryRuleTree.htm').then(res => {
        if(res.code === '0000'){
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
