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
          <el-table ref="table1" border :data="list1" style="width: 100%" @selection-change="handleSelectionChange">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column label="案件编号" prop="caseNo">
            </el-table-column>
            <el-table-column label="被申请人姓名" prop="resName">
            </el-table-column>
            <el-table-column label="被申请人手机号" prop="resPhone">
            </el-table-column>
            <el-table-column label="抓取时间" prop="captureTime">
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

        </div>

        <div class="content_footer">
          <el-button style="margin-right: 20px;" type="primary" @click="HandleVerify">立即验证</el-button>
          <el-button  @click="create">取消</el-button>
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
      }

    },
    props: {
      //规则描述
      ruleInfo: String,
    },
    computed:{
        selectedNum(){
          if(this.currentTab === 0){
            return this.selectedList1.length;
          }
          return 0;
        }
    },
    mounted(){
      this.queryList1();
    },
    watch:{
      'currentTab'(val,oldVal){
        if(val === 0){
          this.queryList1();
        }
      }
    },
    methods: {

      //验证初始化
      initVerify() {

      },

      //立即验证
      HandleVerify(){
        const loading =this.$loading({
          lock: true,
          text: '正在验证...',
          fullscreen: true,
          spinner: 'el-icon-loading',
          background: "hsla(0,0%,100%,.9)"
        });
        let item = {ruleInfo: this.ruleInfo};
        if(this.currentTab === 0){
          let arr = [];
          this.list1.forEach(it => {
            arr.push(it.caseId);
          })
          item.simpleIdList = arr;
        }else{
          item.caseIdList = this.list2;
        }
        this.$http.post("/rule/executeRuleByRuleInfo.htm",item).then(res => {
          if(res.code === '0000'){
            this.execute({exeId: res.result.exeId},loading)
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

      handleSelectionChange(val){
        if(this.currentTab === 0){
          this.selectedList1 = val;
        }
      },


      HandleTabChange(tab){
        this.currentTab = tab;
      },
      queryList1(){
        this.$http.post("/ruleBase/caseSample/queryCaseSampleList",this.pager1).then(res => {
          if(res.code === '0000'){
            this.pager1.count = res.result.count;
            this.list1 = res.result.caseSampleList;
          }
        })
      },
      // 页数 change
      handleSizeChange1(val) {
        this.pager1.pageSize = val;
        this.queryList1();
      },
      // 分页 change
      handleCurrentChange1(val) {
        this.pager1.currentNum = val;
        this.doQuery();
      },

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
