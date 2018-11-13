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
              <el-table-column prop="resPhone" label="被申请人手机号" width="188"> </el-table-column>
              <el-table-column prop="captureTime" label="抓取时间" width="180"> </el-table-column>
              <el-table-column prop="index" label="操作" width="180">
                <template slot-scope="scope">
                  <div style="text-align: center;">
                    <span class="colLink mr-20" @click="showDetails(scope.row)">查看</span>
                    <span class="colLink" @click="deleteCase(scope.row)">删除</span>
                  </div>
                </template>
              </el-table-column>

            </el-table>

          </div>
          <div class="pagination">
            <el-pagination
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="pager1.currentNum"
              :page-sizes="[10,20,50]"
              :page-size="pager1.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pager1.count">
            </el-pagination>
          </div>
        </div>
        <div v-else>
          <div class="m-header" style="margin-bottom: 5px;">

            <span style="line-height: 28px;">请为产品模板“{{rule.labelName}}”选择案件样例</span>
            <el-form ref="ruleForm" :inline="true" :model="form">

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
                  <el-option  label="预审未通过" :value="5"></el-option>
                  <el-option  label="立案申请成功" :value="6"></el-option>
                  <el-option  label="立案申请失败" :value="7"></el-option>
                </el-select>
              </el-form-item>

              <el-button  type="warning" @click="queryOnlineCase">查询</el-button>
            </el-form>
          </div>
          <div class="m-table">
            <el-table ref="table2" key="table2"  :data="list2" style="width: 100%" border  empty-text="暂无线上案件，无法抓取样例"  @selection-change="handleSelectionChange">


              <el-table-column type="selection"  width="55"></el-table-column>
              <el-table-column prop="loanBillNo" label="案件编号" width="230"></el-table-column>
              <el-table-column prop="respondents" label="被申请人名字" width="234"> </el-table-column>
              <el-table-column prop="phones" label="被申请人手机号" width="220"> </el-table-column>
              <el-table-column prop="caseStatus" label="状态" width="220">
                <template slot-scope="scope">
                  <span>{{caseStatusName(scope.row.caseStatus)}}</span>
                </template>
              </el-table-column>
              <!--<el-table-column prop="loanBillNo" label="操作" width="180">-->
                <!--<template slot-scope="scope">-->
                  <!--<div style="text-align: center;">-->
                    <!--<span class="colLink mr-20" @click="showDetails(scope.row)">查看</span>-->
                  <!--</div>-->
                <!--</template>-->
              <!--</el-table-column>-->

            </el-table>

          </div>
          <div class="pagination"  >
            <span class="fl">已选{{selectedNum}}件</span>
            <el-pagination
              class="fr"
              @size-change="handleSizeChange1"
              @current-change="handleCurrentChange1"
              :current-page="pager2.currentNum"
              :page-sizes="[10, 20, 50]"
              :page-size="pager2.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pager2.count">
            </el-pagination>
          </div>
        </div>

      </div>

      <span slot="footer" class="dialog-footer">
        <template v-if="tab === 1">
           <el-button :disabled="!selectedNum || disabled" type="primary" @click="handleSubmit">确 定</el-button>
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

        //控制鼠标连点
        disabled: false,

        dialogVisible : false,


        //0-查看样例 1-抓取样例
        tab: 0,

        //线上案件的查询条件
        // caseStatus: '',
        // keyWords: '',
        form: {},

        pager1:{
          pageSize:10,
          count:1,
          currentNum: 1
        },
        pager2:{
          pageSize:10,
          count:1,
          currentNum: 1
        },
        list1:[],
        list2:[],

        //选中案件
        selectedList: [],

        //选中案件
        localList:[],
        selectedNum: 0,
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
    watch:{
      'tab'(val,oldval){
        if(val === 0){
          this.localList =[];
          this.selectedNum = 0;
        }
      }
    },
    methods : {

      clacNum(){
        this.selectedNum = 0;
        this.localList.forEach(it => {
          this.selectedNum += it.length;
        })

      },
      addLocalList(val){
        this.localList[this.pager2.currentNum - 1] = val;
        this.clacNum();
        },

      toggleSelection(){
        let currentList = this.localList[this.pager2.currentNum-1];
        if(currentList && currentList.length > 0){
          currentList.forEach(row => {
            let item = this.list2.find(it => it.caseId === row.caseId)
            if(item)
              this.$refs.table2.toggleRowSelection(item,true);
          })
        }
      },
      //删除案例
      deleteCase(row){
        this.$msgbox({
          title: "提示",
          message:  "确定删除该样例？",
          center: true,
          showCancelButton: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(r => {
          if(r){
            this.$http.post("/caseSample/deleteCaseSample.htm",{sampleId:row.sampleId}).then(res => {
              if(res.code ==='0000'){
                this.$message.success('删除成功');
                this.init();
              }
            })
          }
        })
      },
      //参数列表跳转
      showDetails(row){
        window.open(this.$router.resolve({path:'/ruleParameterList',query:{sampleId:row.sampleId,levelId: this.$parent.currentMenu.levelId}}).href,'_blank');
      },
      //列表选择
      handleSelectionChange(val){
        // this.selectedList = val;
        this.$nextTick(() => {
          this.addLocalList(val);
        })
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
        else if(status === 5)
          return '预审未通过';
        else if(status === 6)
          return '立案申请成功';
        else if(status === 7)
          return '立案申请失败';
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
        this.$http.post('/rule/queryOnLineCaseListByBaseQuery.htm',{levelId: this.rule.levelId,ruleLevel: this.rule.ruleLevel,...this.form,...this.pager2}).then(res => {
          if(res.code === '0000'){
            this.list2 = res.result.list;
            this.pager2.count = res.result.count;
            this.$nextTick(() => {
              this.toggleSelection();
            })
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
        if(!this.disabled){
          this.disabled = true;
          setTimeout(() => {
            this.disabled = false;
          },1500)
          let caseIds = [];
          this.localList.forEach( it => {
            it.forEach(i => {
              caseIds.push(i.caseId);
            })
          });
          this.$http({
            method : 'get',
            url : '/caseSample/captureCaseSampleList.htm',
            params : {caseIds: (caseIds),levelId: this.rule.levelId}
          })
            .then(res => {
              if(res.code === '0000'){
                this.tab = 0;
                this.init();
              }
            })
        }
      },
    },
  }
</script>

<style scoped lang="scss">

.rule-base-case-sample-dialog{

}
  .pagination{
    margin-top: 10px;
  }

</style>
