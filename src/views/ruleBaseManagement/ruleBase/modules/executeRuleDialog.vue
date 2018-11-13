<template>
    <div class="executeRuleDialog">
      <!--step1-> 选择案件-->
      <el-dialog
        :visible.sync="flag1"
        v-dialogDrag
        title="第一步-选择案件"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="860px"
      >
        <div class="search">
          <el-form ref="ruleForm" :inline="true" :model="form">

            <el-form-item style="margin: 0;" label="案件搜索" prop="keyWords">
              <el-input style="width: 300px;" v-model.trim="form.keyWords" placeholder="请输入案件编号、被申请人姓名"></el-input>
            </el-form-item>

            <el-form-item style="margin: 0;" label="案件模板" prop="keyWords">
              <el-input
                style="width:300px;"
                placeholder="请选择范围"
                :suffix-icon="iconName"
                @focus="handleFocus"

                readonly
                v-model="form.labelName">
              </el-input>
              <div class="ruleLevel_select" v-if="iconName == 'el-icon-arrow-up'">
                <el-tree :data="treeData" :props="defaultProps" @node-click="handleSelect"></el-tree>
              </div>
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

            <!--<el-button  type="warning" @click="queryOnlineCase">查询</el-button>-->
          </el-form>
        </div>

        <!--<span slot="footer" class="dialog-footer">-->
           <!--<el-button style="margin-right: 20px;" type="primary" @click="confirmHandle" :disabled="checkedNodes.length === 0">确定</el-button>-->
            <!--<el-button  @click="addRuleFlag = false;">取消</el-button>-->
        <!--</span>-->
      </el-dialog>
    </div>
</template>

<script>
export default {
    name: 'executeRuleDialog',
    data(){
      return {
        flag1: true,
        form: {},
        //下拉框图标
        iconName: 'el-icon-arrow-down',
        //tree config
        defaultProps:{
          children: 'children',
          label: 'labelName'
        },
        treeData : [],
      }
    },
  methods:{
    //选择范围
    handleFocus(){
      this.iconName ='el-icon-arrow-up';
    },
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
      }
    })
    document.addEventListener("click",(e) => {
      if(this.executeflag && !this.checkClick(e.target)){
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
