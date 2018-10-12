<template>
    <div>
      <el-dialog
        :visible.sync="addRuleFlag"
        v-dialogDrag
        title="复制规则"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="800px"
      >
        <div class="content">
          <div class="content_left">
            <p class="content_title">
              模板树
            </p>
            <div class="innerContent">
              <el-tree ref="tree" class="self_checked_tree" @check="getCheckedList" show-checkbox node-key="levelId" :data="treeData" :default-expanded-keys="keys" :props="defaultProps" ></el-tree>

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


    </div>
</template>

<script>
export default {
    name: 'copyRuleDialog',
    data() {
      return {
        addRuleFlag: false,
        treeData: [],
        checkedNodes: [],
        //tree展开项
        keys: [],

        //当前规则
        rules: [],
        //tree config
        defaultProps:{
          children: 'children',
          label: 'labelName'
        },
      }
    },
    methods: {
      confirmHandle(){
        let arr = [];
        this.rules.forEach(it => {
          this.checkedNodes.forEach(i => {
            arr.push({ruleId: it.ruleId, parentId: i.parentId, levelId: i.levelId});
          })
        });
        this.$http.post("/ruleBase/saveRuleInfoCopy.htm",{ruleInfoSOList: arr},{mheaders: true}).then(res => {
          this.$message({
            type: 'success',
            message: '规则复制成功',
          })
          this.addRuleFlag = false;

          //是否需要去掉选中
          // this.$parent.ruleList.forEach(it => {
          //   it.selected = false;
          // })
        })
      },
      deleteLevelId(idx){
        this.checkedNodes.splice(idx,1);
        this.$refs.tree.setCheckedNodes(this.checkedNodes);

      },
      getCheckedList(obj1,obj2){
        console.log(obj1,obj2);
        this.checkedNodes = obj2.checkedNodes;
      },
      show(item){

        this.addRuleFlag =true;
        this.$nextTick(() => {
          this.checkedNodes = [];
          this.$refs.tree.setCheckedNodes(this.checkedNodes);
          this.keys = item.keys;
          this.treeData = item.treeData;
          this.rules = item.rules;
        })



      }
    }
}
</script>

<style scoped lang="scss">
  .content{
    width: 600px;
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
      width: 350px;

    }
    .content_right{
      float: right;
      width: 230px;
    }

  }
</style>
