<template>
  <div class="rule-base-case-sample-dialog">
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="1000px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <div v-if="tab === 0">
          <div class="m-header" style="margin-bottom: 5px;">
            <el-button class="fr" @click="changeTab" type="primary" size="mini">抓取案例</el-button>
            <span style="line-height: 28px;">共{{pager1.count}}件样例</span>

          </div>
          <div class="m-table">
            <el-table  key="table1" :data="list1" style="width: 100%" border empty-text="暂无案件样例">


              <el-table-column type="index" label="序号" width="50"> </el-table-column>
              <el-table-column prop="caseNo" label="案件编号" width="180"> </el-table-column>
              <el-table-column prop="resName" label="被申请人名字" width="180"> </el-table-column>
              <el-table-column prop="resPhone" label="被申请人手机号" width="180"> </el-table-column>
              <el-table-column prop="captureTime" label="抓取时间" width="180"> </el-table-column>
              <el-table-column prop="index" label="操作" width="180">
                <div style="text-align: center;">
                  <span class="colLink mr-20" @click="showDetails(scope.row)">查看</span>
                  <span class="colLink" @click="openView(scope.row)">删除</span>

                </div>
              </el-table-column>

            </el-table>

          </div>
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
        <div v-else>
          <div class="m-header" style="margin-bottom: 5px;">

            <span style="line-height: 28px;">共{{pager1.count}}件样例</span>
            <el-form :inline="true" :model="form">

              <el-form-item style="margin: 0;margin-left: -12px;" label=" " prop="keyWords">
                <el-input v-model.trim="form.keyWords" placeholder="请输入客户名称、账号"></el-input>
              </el-form-item>

              <el-form-item style="margin: 0;" label=" " prop="caseStatus">
                <el-select clearable v-model="form.caseStatus" placeholder="状态">
                  <!--0-待分配，1-待初审，2-待复审，3-退回重审，4-预审通过-->
                    <el-option label="待分配"  :value="0" > </el-option>
                    <el-option label="待初审"  :value="1" > </el-option>
                    <el-option label="待复审"  :value="2" > </el-option>
                    <el-option label="退回重审"  :value="3" > </el-option>
                    <el-option label="预审通过"  :value="4" > </el-option>
                </el-select>
              </el-form-item>

              <el-button  type="warning" @click="queryOnlineCase">查询</el-button>
            </el-form>
          </div>
          <div class="m-table">
            <el-table  key="table2"  :data="list2" style="width: 100%" border  empty-text="暂无线上案件，无法抓取样例"  @selection-change="handleSelectionChange">


              <el-table-column type="selection"  width="55"></el-table-column>
              <el-table-column prop="loanBillNo" label="案件编号" width="190"></el-table-column>
              <el-table-column prop="respondents" label="被申请人名字" width="190"> </el-table-column>
              <el-table-column prop="phones" label="被申请人手机号" width="190"> </el-table-column>
              <el-table-column prop="caseStatus" label="状态" width="190">
                <template slot-scope="scope">
                  <span>{{caseStatusName(scope.row.caseStatus)}}</span>
                </template>
              </el-table-column>
              <el-table-column prop="loanBillNo" label="操作" width="180">
                <template slot-scope="scope">
                  <div style="text-align: center;">
                    <span class="colLink mr-20" @click="showDetails(scope.row)">查看</span>
                  </div>
                </template>
              </el-table-column>

            </el-table>

          </div>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="pager2.currentNum"
              :page-sizes="[5, 10, 15, 20]"
              :page-size="pager2.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pager2.count">
            </el-pagination>
          </div>
        </div>

      </div>

      <span slot="footer" class="dialog-footer">
        <template v-if="tab === 1">
           <el-button :disabled="!selectedList.length" type="primary" @click="handleSubmit">确 定</el-button>
           <el-button @click="tab = 0;">取 消</el-button>
        </template>
        <template v-else>
          <el-button @click="dialogVisible = false;">关 闭</el-button>
        </template>

      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,


        //0-查看样例 1-抓取样例
        tab: 0,

        //线上案件的查询条件
        // caseStatus: '',
        // keyWords: '',
        form: {},

        pager1:{
          pageSize:5,
          count:1,
          currentNum: 1
        },
        pager2:{
          pageSize:5,
          count:1,
          currentNum: 1
        },
        list1:[],
        list2:[],

        //选中案件
        selectedList: []
      }
    },
    computed:{
      title(){
        return this.tab === 0 ? '查看样例' : '抓取样例';
      }
    },
    props:{
      //当前rule
      rule: Object
    },
    mounted() {

    },
    methods : {
      //列表选择
      handleSelectionChange(val){
        this.selectedList = val;
      },

      //取消按钮
      handleCancel(){
        if(this.tab === 0){
          this.dialogVisible = false;
        }else{
          this.tab = 0;
        }
      },


      //返回案件状态中文
      // 0-待分配，1-待初审，2-待复审，3-退回重审，4-预审通过
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


      //初始化案件样例
      init(){
        this.$http.post("/caseSample/queryCaseSampleList.htm",{levelId: this.rule.levelId, ...this.pager1}).then(res => {
          if(res.code === '0000'){
            this.list1 = res.result.list;
            this.pager1.count = res.result.count;
          }
        })
      },
      //在线样例查询
      queryOnlineCase(){
        this.$http.post(' /rule/queryOnLineCaseListByBaseQuery.htm',{levelId: this.rule.levelId,ruleLevel: this.rule.ruleLevel,...this.form,...this.pager2}).then(res => {
          if(res.code === '0000'){
            this.list2 = res.result.list;
            this.pager2.count = res.result.count;
          }
        })
      },

      changeTab(){
        this.tab = 1;
        this.queryOnlineCase();
      },
      handleSizeChange1(val){
        if(this.tab === 0){
          this.pager1.pageSize = val;
          this.init();
        }else{
          this.pager2.pageSize = val;
          this.queryOnlineCase();
        }

      },

      handleCurrentChange1(val){
        if(this.tab === 0){
          this.pager1.currentNum = val;
          this.init();
        }else{
          this.pager2.currentNum = val;
          this.queryOnlineCase();
        }

      },

      show() {
				this.dialogVisible = true;
				this.tab = 0;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });
        this.init();


      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        // 取消按钮禁用
        setTimeout(() => {
          this.submitDisabled = false;
				},500);
				// 重置表单数据
        this.$refs.ruleForm.resetFields();
      },
      // 点击提交
      handleSubmit() {

        console.log(123);
          let caseIds = [];
          this.selectedList.forEach( it => {
            caseIds.push(it.caseId);
          });
          this.$http.post('/caseSample/captureCaseSampleList.htm',{caseIds: caseIds,levelId: this.rule.levelId}).then(res => {
            if(res.code === 0){
              this.tab = 0;
              this.init();
            }
          })

      },
    },
  }
</script>

<style scoped lang="scss">

.rule-base-case-sample-dialog{

}

</style>
