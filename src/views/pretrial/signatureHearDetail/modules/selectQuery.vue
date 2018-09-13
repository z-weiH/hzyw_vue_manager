<template>
  <div class="select_parent" >
          <span class="select_box" @click="showQueryHandle">
          <b style="padding-right: 20px;">筛选案件({{queryConfig.count}})</b>
           <i :class="{'el-icon-arrow-down': !showQuery,'el-icon-arrow-up': showQuery}"></i>
          </span>
    <div class="query_box" v-if="showQuery">
      <div class="form" style="padding: 10px;">
        <div style="line-height: 30px;" v-if="!disabled">
          <span class="form_desc">必要审核</span>
          <el-radio-group v-model="auditStatus" >
            <el-radio :label="1">必须审核({{queryConfig.mustAuditCaseCount}})</el-radio>
            <el-radio :label="0">全部案件({{queryConfig.totalCaseCount}})</el-radio>
          </el-radio-group>


        </div>

          <div style="line-height: 30px;">
            <span class="form_desc">审核结果</span>
            <el-radio-group v-model="passStatus">
              <el-radio  :label="1">已通过({{queryConfig.passCaseCount}})</el-radio>
              <el-radio  :label="2">未通过({{queryConfig.notPassCaseCount}})</el-radio>
              <el-radio  :label="0">全部案件({{queryConfig.totalCaseCount}})</el-radio>
            </el-radio-group>
          </div>
        <div style="line-height: 30px;">
            <span class="form_desc">信息修正</span>
            <el-radio-group v-model="correctionStatus">
              <el-radio  :label="0">已修正({{queryConfig.passCaseCount}})</el-radio>
              <el-radio  :label="1">全部案件({{queryConfig.totalCaseCount}})</el-radio>
            </el-radio-group>
          </div>
        <div style="line-height: 30px;margin-top:10px;">
          <span class="form_desc" >案件搜索</span>
          <el-input style="display: inline-block;width: 330px" v-model="keyWords" placeholder="请输入案件编号或被申请人姓名进行搜索"></el-input>
        </div>
      </div>
      <div style="padding: 10px;overflow: hidden;text-align: center;">
        <el-button   type="primary" @click="HandleQuery">确定</el-button>
      </div>





      <!--<el-checkbox v-if="!disabled" class="header_checkbox" v-model="auditStatus">显示全部案件</el-checkbox>-->
      <!--<template v-if="disabled">-->
      <!--<el-radio v-model="passStatus" :label="0">全部</el-radio>-->
      <!--<el-radio v-model="passStatus" :label="1">已通过</el-radio>-->
      <!--<el-radio v-model="passStatus" :label="2">未通过</el-radio>-->
      <!--</template>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: 'slectQuery',
    props:{
      /**
       * count 表示帅选出的案件数量
       * mustAuditCaseCount 必要审核案件数
       * notPassCaseCount 未通过案件数
       * passCaseCount 通过案件数
       * totalCaseCount 总案件数
       * */
      queryConfig:{
        type: Object
      },
      disabled:{
        type: Boolean
      }
    },
    data(){
      return {
        showQuery: false,
        auditStatus: 0,
        passStatus: 0,
        keyWords: '',
        correctionStatus: 1
      }
    },
    methods:{
      showQueryHandle(){
        this.showQuery = !this.showQuery;
      },
      HandleQuery(){
        this.$parent.auditStatus = this.auditStatus;
        this.$parent.passStatus = this.passStatus;
        this.$parent.keyWords = this.keyWords;
        this.$parent.correctionStatus = this.correctionStatus;
        this.showQuery = false;
        if(this.$parent.HandleQuery && this.$parent.HandleQuery instanceof Function){
          this.$parent.HandleQuery();
        }
      },
      checkClick(elm){
        if(elm.className ==='select_parent'){
          return true;
        }
        if(elm.parentElement){
          return this.checkClick(elm.parentElement);
        }else{
          return false;
        }
      },
    },
    mounted(){
      document.addEventListener('click',(e) => {
        if(this.showQuery){
          if(!this.checkClick(e.target)){
            this.showQuery = false;
          }
        }
      })
    }
  }
</script>

<style scoped lang="scss">

  .select_parent{
    position: relative;
    display: inline-block;
    margin-left: 45px;
    z-index: 999;
    width: 180px;
  }
  .select_box{
    font-size: 14px;
    color: #999999;
    padding: 5px 8px;
    cursor: pointer;
    border: 1px solid #EBEFF2;
  }
  .query_box{
    position: absolute;
    top: 21px;
    width: 500px;
    border: 1px solid #E5EAEE;
    background: #fff;
    .form_desc{
      font-weight: bold;
      display: inline-block;
      padding-right: 10px;
    }
  }
</style>
