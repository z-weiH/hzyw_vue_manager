<template>
  <div>
    <el-dialog
      :visible.sync="addRuleFlag"
      v-dialogDrag
      title="选择案件"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      width="1000px"
    >

      <div class="content_header">
        <span class="fr">已选 <b style="margin: 0 2px;">{{selectedNum}}</b>件</span>
        <span :class="{'tab': true,'active': currentTab === 0}" @click="HandleTabChange(0)">案件样例</span>
        <span :class="{'tab':true,'active': currentTab === 1}" @click="HandleTabChange(1)">线上案例</span>
      </div>

      <div class="content_table">
        <div v-if="currentTab === 0">
          <el-table key="1" ref="table1" border :data="list1" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column label="案件编号" prop="loanBillNo">
            </el-table-column>
            <el-table-column label="被申请人姓名" prop="respondents">
            </el-table-column>
            <el-table-column label="被申请人手机号" prop="phones">
            </el-table-column>
            <el-table-column label="抓取时间" prop="createTime">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div style="text-align: center;">
                  <span class="colLink">查看</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="pager1.currentNum"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pager1.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pager1.count">
            </el-pagination>
          </div>

        </div><div v-if="currentTab === 1">
          <el-table key="2" ref="table2" border :data="list2" style="width: 100%" @selection-change="handleSelectionChange" >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column label="案件编号" prop="loanBillNo">
            </el-table-column>
            <el-table-column label="被申请人姓名" prop="respondents">
            </el-table-column>
            <el-table-column label="被申请人手机号" prop="phones">
            </el-table-column>
            <el-table-column label="状态" prop="caseStatus">
              <template slot-scope="scope">
                <span>{{caseStatusName(scope.row.caseStatus)}}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <div style="text-align: center;">
                  <span class="colLink">查看</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="pager2.currentNum"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pager2.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pager2.count">
            </el-pagination>
          </div>

        </div>

        <div class="content_footer">
          <el-button style="margin-right: 20px;" type="primary" @click="HandleVerify" :disabled="canVerify">立即验证</el-button>
          <el-button  @click="addRuleFlag = false;">取消</el-button>
        </div>
      </div>

    </el-dialog>
    <executeResult ref="executeResult" :exeId="exeId"></executeResult>
  </div>

</template>

<script>
  import executeResult from './executeResultDialog'
  export default {
    name: 'addRule',
    components:{
      executeResult
    },
    data(){
      return {
        //选中数量
        selectedNum: 0,
        //当前的rule模版
        currentMenu: {},

        addRuleFlag: false,
        isExecuting: false,
        currentTab: 0,
        //验证任务的id
        exeId: '',
        //案件列表数据
        list1: [],
        //线上案件数据
        list2: [],
        pager1:{
          currentNum: 1,
          total: 1,
          pageSize: 5
        },

        pager2:{
          currentNum: 1,
          total: 1,
          pageSize: 5
        },
        selectedList1: [],
        selectedList2: [],
        //缓存的list
        localList1: [],
        localList2: []
      }

    },
    props: {
      //规则描述
      rule: Object,
    },
    computed:{

      canVerify(){
         return this.selectedNum === 0;
      }
    },

    methods: {
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
      },

      selectedNumChange(){
        this.selectedNum =  this.getArray2Length(this.localList1) + this.getArray2Length(this.localList2);
      },
      getArray2Length(arr){
        let res =0;
        arr.forEach(it => {
          res += it.length;
        })
        return res;
      },

      //验证初始化
      initVerify(list1,count1,list2,count2,menu) {
        this.list1 = list1;
        this.list2 = list2;
        this.localList1 = [];
        this.localList2 = [];
        this.selectedNum = 0;
        this.pager1= {currentNum: 1,pageSize: 5, count: count1};
        this.pager2= {currentNum: 1,pageSize: 5, count: count2};
        this.currentMenu = menu;
      },

      //立即验证
      HandleVerify(){
        console.log(this.localList1,this.localList2)
        const loading =this.$loading({
          lock: true,
          text: '正在验证...',
          fullscreen: true,
          spinner: 'el-icon-loading',
          background: "hsla(0,0%,100%,.9)"
        });
        let item = this.rule;

          item.simpleIdList = [];
          this.localList1.forEach(it => {
            it.forEach((i) => {
              item.simpleIdList.push(i.sampleId);
            })
          })
        item.caseIdList = [];
          this.localList2.forEach(it => {
            it.forEach(i => {
              item.caseIdList.push(i.caseId);
            })
          })

        this.$http.post("/rule/executeRuleByRuleInfo.htm",item,{mheaders: true}).then(res => {
          if(res.code === '0000'){
            this.execute({exeId: res.result},loading)
          }
        })

      },

      //轮训规则执行结果
      execute(item,loading){
        this.$http.post('/rule/queryRuleExecuteInfoByExeId.htm',item).then(res => {
          if(res.code === '0000'){
            // exeId		string	0:执行中，1：执行完成
            // if(res.result.status == 0 ){
            this.exeId = item.exeId;
            this.executProgress = (res.result.currentCount/res.result.totalCount) * 100;
            if(!res.result.status  ){
              //执行中
              setTimeout(() => {
                this.execute(item,loading);
              },3000);
            }
            else{
              this.$message.success("验证结束");
              loading.close();
              this.isExecuting = true;
              this.$nextTick(() => {
                this.$refs.executeResult.queryExecutRes();
              })

            }
          }
        })
      },

      addLocalList(val){
        if(this.currentTab === 0){
          this.localList1[this.pager1.currentNum-1] = val;
        }else{
            this.localList2[this.pager2.currentNum-1] = val;
        }
        this.selectedNumChange();

      },
      //切换table（刷新选中状态）
      toggleSelection(){
        if(this.currentTab === 0){
          let currentList = this.localList1[this.pager1.currentNum-1];
          console.log(123);
          if(currentList && currentList.length > 0){
            currentList.forEach(row => {
              let item = this.list1.find(it => it.sampleId === row.sampleId)
              if(item)
                this.$refs.table1.toggleRowSelection(item,true);
            })
          }
        }else{
          let currentList = this.localList2[this.pager2.currentNum-1];
          if(currentList && currentList.length > 0){
            currentList.forEach(row => {
              let item = this.list2.find(it => it.caseId === row.caseId)
              if(item)
                this.$refs.table2.toggleRowSelection(item,true);
            })
          }
        }
      },

      handleSelectionChange(val){
        console.log(val);
        this.$nextTick(() => {
          this.addLocalList(val);
          this.toggleSelection();
        })


      },


      HandleTabChange(tab){
        this.currentTab = tab;
        this.$nextTick(() => {
          this.toggleSelection();
        })
      },


      // 页数 change
      handleSizeChange1(val) {
        this.pager1.pageSize = val;
        this.doQuery();
      },
      // 页数 change
      handleSizeChange2(val) {
        this.pager2.pageSize = val;
        this.doQuery();
      },
      // 分页 change
      handleCurrentChange1(val) {
        this.pager1.currentNum = val;
        this.doQuery();
      },
      handleCurrentChange2(val) {
        this.pager2.currentNum = val;
        this.doQuery();
      },

      //查询
      doQuery(){
        if(this.currentTab === 0){
          this.$http.post("/rule/querySimpleCaseListByBaseQuery.htm",{levelId: this.currentMenu.levelId, ruleLevel: this.currentMenu.ruleLevel,keyWords: this.keyWords, ...this.pager1}).then(res =>　{
            this.list1 = res.result.list;
            this.pager1.count = res.result.count;
            this.$nextTick(() => {
              this.toggleSelection();
            })
          })
        }else{
          this.$http.post("/rule/queryOnLineCaseListByBaseQuery.htm",{levelId: this.currentMenu.levelId, ruleLevel: this.currentMenu.ruleLevel,caseStatus: this.caseStatus,keyWords: this.keyWords, ...this.pager2}).then(res =>　{
            this.list2 = res.result.list;
            this.pager2.count = res.result.count;
            this.$nextTick(() => {
              this.toggleSelection();
            })
          })
        }
      }
    }
  }
</script>

<style scoped lang="scss">
  .content_header{
    margin-bottom: 10px;
    .tab{
      margin-right: 40px;
      color: #aaa;
      font-size: 16px;
      cursor: pointer;
      &.active{
        color: #0099CC;
        font-weight: bold;
      }
    }
  }
  .content_table{
    .pagination{
      margin: 10px 0;
    }
  }
  .content_footer{
    text-align: center;
    margin-top: 15px;
  }
</style>
