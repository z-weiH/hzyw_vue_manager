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

          <el-form :inline="true" :model="searchItem" style="padding: 0;">
            <el-form-item label="" style="margin: 0;">
              <el-input v-model="searchItem.keyWords" placeholder="权限表达式与按钮名称搜索" ></el-input>
            </el-form-item>
            <el-button type="warning" @click="doQuery">查询</el-button>
          </el-form>

          <el-table
            ref="table"
            :data="tableData"
            tooltip-effect="dark"
            border
            @select="handleSelectionChange"
            @select-all="handleSelectionChange"
          >
            <el-table-column
              show-overflow-tooltip
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              label="权限表达式"
              width="238">
              <template slot-scope="scope">
                  <el-tooltip :content="scope.row.btnExpression" placement="top-start">
                    <span class="ellipsis">
                                      {{ scope.row.btnExpression }}
                    </span>
                  </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column
              label="按钮名称"
              show-overflow-tooltip
              width="153">
              <template slot-scope="scope">
                <div style="overflow: hidden;white-space: nowrap;
    text-overflow: ellipsis;">
                  <el-tooltip :content="scope.row.btnName" placement="top-start">
                    <span class="ellipsis">
                                          {{ scope.row.btnName }}
                    </span>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pager.currentNum"
            :page-size="pager.pageSize"
            layout="total, prev, pager, next, jumper"
            :total="pager.count">
          </el-pagination>

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
              {{rule.btnName}}
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
  },
  data(){
    return{
      addRuleFlag: false,
      checkedNodes: [],
      tableData: [],
      pager:{
        currentNum: 1,
        pageSize: 5,
        count: 1
      },
      queryUrl: '/btnInfo/queryBtnListByBaseQuery.htm',
      searchItem : {keyWords: ''},
      selectedItems: []
    }
  },
  methods:{
    show(){
      this.addRuleFlag = true;
      this.doQuery();

    },
    doQuery(){
      this.$http.post('/btnInfo/queryBtnListByBaseQuery.htm',Object.assign(this.searchItem, this.pager)).then(res => {
        this.tableData = res.result.list;
        this.pager.count = res.result.count;
      })
    },
    handleCurrentChange(){
      this.refreshTable();
    },

    handleSelectionChange(selection, row){
      // console.error(selection,row);
      this.selectedItems[this.pager.currentNum-1] = selection;
      this.initcheckedNodes();
    },

    initcheckedNodes(){
      this.checkedNodes = [];
      this.selectedItems.forEach( it => {
        it.forEach(i => {
          this.checkedNodes. push(i);
        })
      })
    },


    //确定选择
    confirmHandle(){


    },
    //删除选中
    deleteLevelId(idx){
      this.checkedNodes.splice(idx,1);
      this.refreshTable()
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
