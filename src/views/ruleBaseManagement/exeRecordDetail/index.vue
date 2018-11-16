<template>
    <div>
      <div class='wsbodyhead'>
        <a >所在位置</a>
        <a class="aside_tit">规则库管理 </a>
        <router-link :to='$options.name' class='aside_tit'>执行记录</router-link>
      </div>
      <div class="item-title part_tit">
        <el-button class="fr" style="margin-top: -10px;" type="primary" @click="goBack">返回</el-button>
        执行概况
      </div>
      <div >
        <el-row class="message" >
          <el-col :span="12">
            <span class="label">案件总数</span>
            <span>{{exe.currentCount}}件</span>
          </el-col>
          <el-col :span="12">
            <span class="label">规则总数</span>
            <span>{{exe.ruleCount}}</span>
          </el-col>
          <el-col :span="12">
            <span class="label">检出错误</span>
            <span>{{exe.checkErrorCount}}件</span>
          </el-col>
          <el-col :span="12">
            <span class="label">执行错误</span>
            <span>{{exe.performErrorCount ? exe.performErrorCount : 0 }}件</span>
          </el-col>
          <el-col :span="12">
            <span class="label">执行开始时间</span>
            <span>{{exe.createTime}}</span>
          </el-col>
          <el-col :span="12">
            <span class="label">耗时</span>
            <span>{{exe.timeConsuming ? exe.timeConsuming : 1}}秒</span>
          </el-col>
          <el-col :span="12">
            <span class="label">产品模板</span>
            <span>{{exe.firstAuditorName}}</span>
          </el-col>
          <el-col :span="12">
            <span class="label">执行状态</span>
            <span></span>
          </el-col>
        </el-row>
      </div>
        <div class="item-title part_tit">
          <el-button class="fr" style="margin-top: -10px;" type="primary" @click="openView">查看详情</el-button>
          执行概况
        </div>

        <el-table  :data="list" style="width: 100%" row-key="id"
                   :expand-row-keys="expands" @expand-change="showDetails"

        >


          <el-table-column type="index" label="序号" width="50">
          </el-table-column>
          <el-table-column label="案件编号" prop="loanBillNo">
          </el-table-column>
          <el-table-column label="被申请人姓名" prop="respondents">
          </el-table-column>
          <el-table-column label="被申请人手机号" prop="phones">
          </el-table-column>
          <el-table-column label="案件状态" prop="caseStatus" :render-header="headerRender">
          </el-table-column>

          <el-table-column label="执行结果" prop="exeStatus" :render-header="headerRender">
            <template slot-scope="scope">
              <div style="text-align: center;">
              <span>
               <img class="mr-10" v-if="scope.row.exeStatus === 0"  src="@/assets/img/error_tag_01.png" alt="">
              <img class="mr-5" v-if="scope.row.exeStatus === 1" src="@/assets/img/success_tag.png" alt="">
              <img class="mr-5" v-if="scope.row.exeStatus === 2" src="@/assets/img/warning_tag_01.png" alt="">
                <b v-if="scope.row.exeStatus === 2">检出错误</b>
                <b v-if="scope.row.exeStatus === 0">执行错误</b>
                <b v-if="scope.row.exeStatus === 1">未检出错误</b>
              </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" >
            <template slot-scope="scope">
              <div style="text-align: center;">
                <span class="colLink mr-20" @click="showDetails(scope.row)">{{expands.indexOf(scope.row.id) != -1 ? '收起' : '展开'}}</span>
                <span class="colLink" @click="signalDetail(scope.$index)">查看</span>
              </div>

            </template>
          </el-table-column>

          <el-table-column  type="expand">
            <template slot-scope="props">
              <ul>
                <li v-for="(item,idx) in props.row.results" style="margin:10px 0;">
                  <p class="result-content">{{item.ruleDesc}}</p>
                  <p class="result-content">{{item.exeResult}}</p>
                  <p class="result-content">{{item.returnResult ? item.returnResult : '--'}}</p>

                </li>
              </ul>
            </template>
          </el-table-column>


        </el-table>
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pager.currentNum"
            :page-sizes="[10, 20, 50]"
            :page-size="pager.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pager.total">
          </el-pagination>
        </div>


    </div>

</template>

<script>
    export default {
      name: 'index',
      data(){
        return {
          expands:[],
          exe: {},
          list: [],
          pager:{
            currentNum: 1,
            total: 1,
            pageSize:10
          },
          exeId: 0

        }
      },
      methods:{
        signalDetail(idx){

        },
        showDialog(col){
          console.log(col);
        },
        headerRender(createElement,{$index,column}){
            let ele = createElement(
              "i",
              {
                on: {
                  click: () => this.showDialog(column)
                },
                style: {
                  width: '12px',
                  background: '#469FFC',
                  padding: "3px 3px",
                  cursor:'pointer',
                  left: '75%'
                },
                class: 'el-color-picker__icon el-icon-arrow-down'
              },
              ""
            );

          return createElement("div", [
            createElement("span", {}, column.label),
            ele
          ]);

        },

        openView(){
          let routeData = this.$router.resolve({
            path: '/ruleExeDetail',
            query: { exeId: this.exeId },
          })
          window.open(routeData.href, '_blank')
        },


        //展开 收起 详细信息
        showDetails(row){
          if(this.expands.indexOf(row.id) == -1){

            this.$http.post('/ruleExe/queryRuleExeResultDetail.htm',{exeCaseId: row.id}).then(res => {
              if(res.code === '0000'){
                row.results = res.result;
                this.expands=[row.id];
              }
            })

          }
          else{
            this.expands=[];

          }
        },

        goBack(){
          this.$router.push({
            path: '/main/exeRecord',
          })
        },
        initData(){
          this.$http.post("/ruleExe/queryRuleExeResultCount.htm",{exeId: this.exeId}).then(res => {
            if(res.code === '0000'){
              this.exe = res.result;
            }
          });
          this.doQuery();

        },
        doQuery(){
          this.$http.post('/ruleExe/queryRuleExeResult.htm',{exeId: this.exeId, ...this.pager}).then(res => {
            if(res.code === '0000'){
              this.pager.total = res.result.count,

                this.list = res.result.list;

            }
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
      },
      created(){
        this.exeId = this.$route.query.exeId;
        this.initData();
      }
    }
</script>

<style scoped lang="scss">
  $themeColor: #193b8c;
  .part_tit {
    color: $themeColor;
    padding-bottom: 20px;
  &:before {
     content: "|";
     display: inline-block;
     font-weight: bold;
     font-size: 16px;
     vertical-align: baseline;
     margin-right: 1px;
     position: relative;
     top: -2px;
   }
  }
  .message{
    padding: 10px 20px;
    background: #fff;
    font-size: 15px;
    span {
      display: inline-block;
      line-height: 30px;
    }
    .label{
      width: 100px;
      text-align: left;
      color: #7A7A7A;
    }
  }
  .result-content{
    word-wrap: break-word;
    word-break: break-all;
    display: inline-block;
    width: 30%;
    box-sizing: border-box;
    padding: 0 5px;
    vertical-align: middle;
  }


</style>
