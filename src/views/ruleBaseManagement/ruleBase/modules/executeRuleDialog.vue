<template>
    <div class="executeRuleDialog">
      <!--step1-> 选择案件-->
      <el-dialog
        :visible.sync="flag1"
        v-dialogDrag
        title="第一步-选择案件"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="890px"
      >
        <div class="search">
          <el-form ref="ruleForm" :inline="true" :model="form">



            <el-form-item

              :rules="[
                    {required : true  , trigger : 'change'}
                  ]"
              class="slect_tree_warpar"  style="margin-right: 5px;margin-bottom: 5px;" label="案件模板" prop="labelName">
              <el-input
                clearable
                style="width:200px;"
                placeholder="请选择范围"
                :suffix-icon="iconName"
                @focus="handleFocus"
                :readonly="true"
                v-model="form.labelName">
              </el-input>
              <div class="ruleLevel_select" v-if="iconName == 'el-icon-arrow-up'">
                <el-tree node-key="levelId" ref="tree" :data="treeData" :props="defaultProps" @node-click="handleSelect" :default-expanded-keys="keys"></el-tree>
              </div>
            </el-form-item>


            <el-form-item style="margin-right: 5px;margin-bottom: 5px;" label="案件搜索" prop="keyWords">
              <el-input style="width: 230px;" v-model.trim="form.keyWords" placeholder="请输入案件编号、被申请人姓名"></el-input>
            </el-form-item>



            <el-form-item style="margin-right: 0;margin-bottom: 5px;" label="案件状态" prop="caseStatus">
              <el-select style="width: 170px;" clearable v-model="form.caseStatus" placeholder="状态">
                <!--0-待分配，1-待初审，2-待复审，3-退回重审，4-预审通过-->

                <el-option label="待分配"  :value="0" > </el-option>
                <el-option label="待初审"  :value="1" > </el-option>
                <el-option label="待复审"  :value="2" > </el-option>
                <el-option label="退回重审"  :value="3" > </el-option>
                <el-option label="预审通过"  :value="4" > </el-option>
                <el-option  label="预审未通过" :value="5"></el-option>
                <el-option  label="立案申请成功" :value="6"></el-option>
                <el-option  label="立案申请失败" :value="7"></el-option>
              </el-select>
            </el-form-item>


            <timeFrame
              :startDate.sync="form.pushStartDate"
              :endDate.sync="form.pushEndDate"
              label="推送日期"
            >
            </timeFrame>
            <timeFrame
              :startDate.sync="form.startApplyTime"
              :endDate.sync="form.endApplyTime"
              label="提交立案日期"
              :disabled="form.caseStatus !== 6"
            >
            </timeFrame>

            <!--<el-button  type="warning" @click="queryOnlineCase">查询</el-button>-->
          </el-form>
        </div>
        <div class="table" ref="table_warper"  >
          <!--<el-table v-loading="tableLoading" ref="caseTable" max-height="400" border :data="caseList" @selection-change="handleSelectionChange" :empty-text="emptyText">-->
            <!--<el-table-column type="selection"  width="55"></el-table-column>-->
            <!--<el-table-column prop="loanBillNo"  label="案件编号" width="174">-->
              <!--<template slot-scope="scope">-->
                <!--<span v-ellipsis.20>{{scope.row.loanBillNo}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="respondents" label="被申请人名字" width="153"> </el-table-column>-->
            <!--<el-table-column prop="caseStatus" label="案件状态" width="130">-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{caseStatusName(scope.row.caseStatus)}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column prop="pushTime" label="案件推送时间" width="160"> </el-table-column>-->
            <!--<el-table-column prop="applyTime" label="提交立案日期" width="160">-->
              <!--<template slot-scope="scope">-->
                <!--<span>{{scope.row.applyTime ? scope.row.applyTime : '&#45;&#45;'}}</span>-->
              <!--</template>-->
            <!--</el-table-column>-->

          <!--</el-table>-->


            <table
              class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover mt-10"
              style="max-height: 440px;"
            >
            <tr>
              <td colspan="1">
                <el-checkbox v-model="slelectedAll"></el-checkbox>
              </td>
              <td colspan="2">案件编号</td>
              <td colspan="2">被申请人姓名</td>
              <td colspan="2">案件状态</td>
              <td colspan="2">案件推送时间</td>
              <td colspan="2">提交立案日期</td>
            </tr>
              <tr  v-if="caseList.length === 0">
                <td colspan="11">{{emptyText}}</td>
              </tr>
            </table>



          <el-scrollbar style="height: 400px;" v-if="caseList.length > 0" v-loading="tableLoading">
            <table
              class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover "
              style="max-height: 440px;">
              <tr v-for="(item,index) in caseList" :key="index">
                <td colspan="1">
                  <el-checkbox @change="handleSelectionChange" v-model="item.selected"></el-checkbox>
                </td>
                <td colspan="2">{{item.loanBillNo}}</td>
                <td colspan="2">{{item.respondents}}</td>
                <td colspan="2">{{caseStatusName(item.caseStatus)}}</td>
                <td colspan="2">{{item.pushTime}}</td>
                <td colspan="2">{{item.applyTime ? item.applyTime : '--'}}</td>
              </tr>
            </table>
          </el-scrollbar>







        </div>

        <div>
           <span class="fl mt-10 mb-10 mr-35" style="line-height: 32px;">
            已选择{{selectedList.length}}件
          </span>
          <el-pagination style="background: #fff"
                         class="mt-10 mb-10 fl"
                         @size-change="handleSizeChange"
                         @current-change="handleCurrentChange"
                         :current-page="pager.currentNum"
                         :page-sizes="[200,500,1000,2000]"
                         :page-size="pager.pageSize"
                         layout="total, sizes, prev, pager, next, jumper"
                         :total="pager.count">
          </el-pagination>
        </div>



        <div class="dialog-footer" style="clear: both;text-align: center;">
           <el-button style="margin-right: 20px;" type="primary" @click="step1" :disabled="canstep1 || !form.levelId">下一步</el-button>
            <el-button  @click="flag1 = false;">取消</el-button>
        </div>
      </el-dialog>


      <!--step1-> 选择案件-->
      <el-dialog
        :visible.sync="flag2"
        v-dialogDrag
        title="第二步-选择规则"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="700"
      >

        <div class="content" style="overflow: hidden;">
          <div class="desc fl" style="width: 140px;font-size: 14px;font-weight: bold">
            {{this.form.labelName}}
          </div>
          <div class="rule fl" style="width: calc( 100% - 170px);">
            <el-checkbox-group v-model="ruleIdList">
              <el-checkbox label="0000" v-if="allruleList.length > 0" @change="selectAll">全部规则</el-checkbox><br>
              <p class="self-checkbox" style="width: 400px;" v-for="(rule,index) in allruleList" :key="index">
                <el-checkbox   :label="rule.ruleId" name="type">{{rule.ruleDesc}}</el-checkbox>
              </p>
            </el-checkbox-group>
          </div>
        </div>
        <div class="dialog-footer" style="clear: both;text-align: center;">
          <el-button style="margin-right: 20px;"  @click="flag2 = false; flag1 = true;" >上一步</el-button>
          <el-button style="margin-right: 20px;" type="primary" @click="step2" :disabled="ruleIdList.length === 0 ">执  行</el-button>
          <el-button  @click="flag2 = false;flag1 = true;">取  消</el-button>
        </div>
      </el-dialog>




      <el-dialog
        :visible="flag3"
        :show-close="false"
        custom-class="move-top-left"
        title="提示"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="495px"
        center>
        <div class="m-bar" style="width: 300px; margin: 20px auto;text-align: center;" >
          <p style="margin: 20px 0;font-size: 18px;" v-if="progressWidth != 0">正在执行规则...</p>
          <p style="margin: 20px 0;font-size: 18px;" v-else>准备执行中...</p>
          <m-progress :width="executProgress" :px="progressWidth" :height="20"></m-progress>
        </div>
        <div class="dialog-footer" style="clear: both;text-align: center;">
          <el-button style="margin-right: 20px;" type="primary" @click="step3"  >在后台执行</el-button>
          <el-button  @click="cancelExe">取  消</el-button>
        </div>
      </el-dialog>


    </div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import mProgress from './progress'
  import $ from 'jquery'
   export default {
    name: 'executeRuleDialog',
    components:{
      timeFrame,
      mProgress
    },
    data(){
      return {
        //全选
        slelectedAll: false,
        emptyText: '请先选择案件模版',
        flag1: false,
        flag2: false,
        flag3: false,
        form: {caseStatus: '',keyWords:''},
        //下拉框图标
        iconName: 'el-icon-arrow-down',
        //tree config
        defaultProps:{
          children: 'children',
          label: 'labelName'
        },
        caseList : [],
        selectedList: [],
        pager:{
          pageSize: 200,
          currentNum: 1,
          count: 1
        },
        keys: [],
        canstep1: false,
        allruleList: [],
        ruleIdList: [],
        caseIdList: [],

        timer: null,
        stopExe: true,
        //执行进度
        executProgress: 0,
        progressWidth: 0,
        exeId: '',//当前执行任务
        tableLoading : false,
      }
    },
    watch:{

      'slelectedAll'(val,oldval){
        if(val){
          this.caseList.forEach(it => {
            this.$set(it,'selected', true);
          })
        }else{
          this.caseList.forEach(it => {
            this.$set(it,'selected', false);
          })
        }
        this.handleSelectionChange();
      },

      'form.keyWords'(){
        if(this.form.levelId){
          this.doQuery();
        }
      },
      'form.caseStatus'(){
        this.form.startApplyTime &&(this.form.startApplyTime = '');
        this.form.endApplyTime &&(this.form.endApplyTime = '');
        if(this.form.levelId){
          this.doQuery();
        }
      },
      'form.pushStartDate'(){
        if(this.form.levelId){
          this.doQuery();
        }
      },
      'form.pushEndDate'(){
        if(this.form.levelId){
          this.doQuery();
        }
      },
      'form.startApplyTime'(){
        if(this.form.levelId){
          this.doQuery();
        }
      },
      'form.endApplyTime'(){
        if(this.form.levelId){
          this.doQuery();
        }
      }
    },
  methods:{
    refreshData(){
      this.form = {caseStatus: '',keyWords:''};
      this.slelectedAll = false;
      //下拉框图标
      this.iconName ='el-icon-arrow-down';
      this.caseList= [];
        this.selectedList= [];
      this.pager= {
        pageSize: 100,
          currentNum: 1,
          count: 1
      };
      this.canstep1=false;
        this.allruleList= [];
        this.ruleIdList= [];
        this.caseIdList= [];
        this.stopExe = false;
        this.emptyText = '请先选择案件模版',

        //执行进度
      this.executProgress= 0;
        this.progressWidth= 0;
        this.exeId= '';//当前执行任务
    } ,

    cancelExe(){

      const h = this.$createElement;
      this.$msgbox({
        title: '提示',
        message: h('div',null,[
          h('p',null,'确定取消执行？'),
        ]),
        center: true,
        showCancelButton: true,
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(() => {
        this.$http.post('/ruleCase/cancelTaskByExeId.htm',{exeId: this.exeId}).then(res => {
          this.stopExe= true;
          if(this.timer){
            clearTimeout(this.timer);
          }
          this.flag3 = false;
          this.$emit("progressCancel");
        })
      }).catch(() => {})

    },

    selectAll(val){
      console.log(val);
      if(val){
        this.ruleIdList = ['0000'];
        this.allruleList.forEach(it => {
          this.ruleIdList.push(it.ruleId);
        })
      }else{
        this.ruleIdList = [];
      }
      console.log(this.ruleIdList);

    },


    caseStatusName(status){
      if(status === 0)
        return '待分配';
      else if(status === 1)
        return '待初审';
      else if(status === 2)
        return '待复审';
      else if(status === 3)
        return '退回重审';
      else if(status === 4)
        return '预审通过';
      else if(status === 5)
        return '预审未通过';
      else if(status === 6)
        return '立案申请成功';
      else if(status === 7)
        return '立案申请失败';
    },

    //选择范围
    handleFocus(){
      this.iconName ='el-icon-arrow-up';
      this.$nextTick(() => {
        console.log(this.$refs.tree)
        // this.$refs.tree.setCurrentKey()
      })
    },
    handleSelect(data){
      if(data.ruleLevel !== 4){
        return;
      }
      this.iconName = 'el-icon-arrow-down';
      this.form.levelId = data.levelId;
      this.form.labelName = data.labelName;
      this.$set(this.form, 'labelName', data.labelName);
      this.doQuery();
    },
    show(item){

        this.refreshData()
        this.treeData = item.treeData;
        this.keys = [this.treeData[0].levelId];
        this.flag1= true;
        // this.doQuery();
        this.$nextTick(() => {
          this.$refs.ruleForm.resetFields();
        })
    },

    doQuery(){
      this.slelectedAll = false;
      this.tableLoading = true;
      setTimeout(() => {
        this.tableLoading = false;
      },800)
      this.$http.post("/rule/queryCaseInfoListByBaseQuery.htm",{...this.form, ...this.pager}).then(res => {
        if(res.result.list.length === 0){
          this.emptyText = "暂无数据";
        }
        this.caseList = res.result.list;
        this.pager.count = res.result.count;
        this.$nextTick(() => {
          // this.$refs.caseTable.$el.querySelector('.el-table__body-wrapper').scrollTo(0,0);
          //   this.caseList.forEach( it => {
          //     this.$refs.caseTable.toggleRowSelection(it , true);
          //   });
            this.slelectedAll = true;
        })
        // caseTable
      }).catch(() => {
        this.tableLoading = false;
      });
    },

    handleSizeChange(val){
      this.pager.pageSize = val;
      this.doQuery();
    },
    handleCurrentChange(val){
      this.pager.currentNum = val;
      this.doQuery();
    },


    step1(){
        this.flag1 = false;
      this.flag2 =true;
      this.caseIdList = [];
      this.selectedList.forEach(it => {
        this.caseIdList.push(it.caseId);
      })
      this.$http.post("/rule/queryAllRuleListByLevelId.htm",{levelId: this.form.levelId,ruleLevel: 4}).then(res => {
        this.allruleList = res.result;
      })
    },

    step2(){

      this.executProgress = 0 + '/' +this.caseIdList.length;
      this.$emit("progress",{currentCount:0, totalCount: this.caseIdList.length})
        // console.log(JSON.stringify(){levelId: this.form.levelId,ruleIdList: this.ruleIdList, caseIdList: this.caseIdList});
        this.flag3 = true;
        this.flag2 = false;
        let arr = [];
        this.ruleIdList.forEach(it => {
          if(it !==  '0000'){
            arr.push(it);
          }
        })
      this.$http.post("/rule/executeRuleByBaseQuery.htm",{levelId: this.form.levelId,ruleIdList: arr, caseIdList: this.caseIdList},{mheaders: true}).then(res => {
        this.exeId = res.result;
        this.execute({exeId: res.result});
      })
    },

    step3(){
      document.getElementsByClassName('move-top-left')[0].className += ' active';
      setTimeout(() => {
        $('.move-top-left').removeClass('active');
        this.flag3 = false;
        this.$emit("hiddenDialog");
      },1000)
    },


    //轮训规则执行结果
    execute(item){
          this.$http.post('/rule/queryRuleExecuteInfoByExeId.htm',item).then(res => {
            if(res.code === '0000'){
              // exeId		string	0:执行中，1：执行完成
              // if(res.result.status == 0 ){
              this.exeId = item.exeId;
              this.executProgress = res.result.currentCount+ '/' +res.result.totalCount;
              this.progressWidth = (res.result.currentCount/res.result.totalCount)*100;
              this.$emit("progress",{currentCount:res.result.currentCount, totalCount: res.result.totalCount})
              if(res.result.status == 0){
                //执行中

                // this.progressWidth ++;


                this.timer = setTimeout( () => {
                  if(!this.stopExe){
                    this.execute(item)
                  }
                },2000);
              }
              else{
               this.$emit("progressDown",{exeId: item.exeId,overTime: new Date()});
               this.flag3 = false;
              }
            }
          })

    },




    handleSelectionChange(){
      this.selectedList = this.caseList.filter(it => it.selected);
      if(this.selectedList.length === 0){
        this.canstep1 = true;
      }else{
        this.canstep1 = false;
      }
    },
    checkClick(elm){
      if(elm.className.indexOf('slect_tree_warpar') !== -1){
        return true;
      }
      if(elm.parentElement){
        return this.checkClick(elm.parentElement);
      }else{
        return false;
      }
    },

  },

  created(){
    document.addEventListener("click",(e) => {
      if(this.flag1 && !this.checkClick(e.target)){
        if(this.iconName == 'el-icon-arrow-up'){
          this.iconName = 'el-icon-arrow-down';
        }
      }
    })
  },
}
</script>

<style scoped lang="scss">
  .ruleLevel_select{
    overflow-y: auto;
    z-index:999;
    width: 300px;
    height: 210px;
    border: 1px solid #dcdfe6;
    position: absolute;
    background: #fff;
  }


</style>
