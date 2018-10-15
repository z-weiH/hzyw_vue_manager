<template>
  <el-dialog
    :visible.sync="addRuleFlag"
    v-dialogDrag
    title="分配权限"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    width="900px"
  >
    <div class="content">
      <div class="content_left">
        <p class="content_title">
          权限列表
        </p>
        <div class="innerContent">

          <div class="item-table">
          </div>

        </div>
      </div>
      <div class="content_right">
        <p class="content_title">
          已选择
        </p>
        <div class="innerContent">
          <ul class="innerUl">
            <li v-for="(rule, idx) in checkedNodes" :key="idx">
              <span @click="deleteLevelId(idx)"></span>
              {{rule.labelName}}
            </li>
          </ul>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
           <el-button style="margin-right: 20px;" type="primary" @click="confirmHandle" :disabled="checkedNodes.length === 0">确定</el-button>
            <el-button  @click="addRuleFlag = false;">取消</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import Searchs from '@/components/searchs'
export default {
  name: 'allot',
  components:{
    Searchs,
    TableComponent,
  },
  data(){
    return{
      addRuleFlag: false,
      checkedNodes: [],
      tableData: [],
      pager:{

      },
      columnDefine:[
        {label: '权限表达式',property: 'btnExpression',width: 214},
        {label: '按钮名称',property: 'btnName',width: 180}
      ]
    }
  },
  methods:{
    show(){
      this.addRuleFlag = true;
    },
    //确定选择
    confirmHandle(){

    },
    //删除选中
    deleteLevelId(){

    }
  }
}
</script>

<style scoped lang="scss">
  .content{
    width: 700px;
    height: 400px;
    margin: 0 auto;
    overflow: hidden;
  >div{
    height: 100%;
  }
  .content_title{
    font-size: 16px;
    line-height: 24px;
    font-weight: bold;
    color: #0052A4;
  }
  .innerContent{
    overflow-y:auto;
    height: 350px;
    border: 1px solid #aaa;
  .innerUl{
    margin: 10px;
  li{
    line-height: 30px;
  span{
    float: right;
    width: 20px;
    height: 20px;
    background-image: url("../../../../assets/img/error.png");
    background-size: 100%;
    background-repeat: no-repeat;
    margin-top: 5px;
    cursor: pointer;
    border-radius: 10px;
  }
  }
  }
  }
  .content_left{
    float: left;
    width: 450px;

  }
  .content_right{
    float: right;
    width: 230px;
  }

  }
</style>
