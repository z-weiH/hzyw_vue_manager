<template>
    <div>
      <div class="item-title">
        <el-button type="primary" @click="saveBtn" class="fr" style="margin-top: -10px;">保存配置</el-button>
        权限分配
      </div>

      <div class="content">
        <div class="content_left">
          <p class="content_title">
            权限列表
          </p>
          <div class="innerContent">



            <el-tree
            :data="treeList"
            node-key="id"
            ref="tree"
            :props="defaultProps"
            @node-click="showDailog"
            >
            <div class="custom-tree-node" style="width: 100%;" slot-scope="{ node, data }" >
            <span>{{ node.label }} </span>

            </div>
            </el-tree>
            <!--<el-pagination-->
              <!--@current-change="handleCurrentChange"-->
              <!--:current-page="pager.currentNum"-->
              <!--:page-size="pager.pageSize"-->
              <!--layout="total, prev, pager, next, jumper"-->
              <!--:total="pager.count">-->
            <!--</el-pagination>-->

          </div>
        </div>
        <div class="content_right" v-if="showTable">
          <p class="content_title">
            权限列表
          </p>
          <div class="innerContent">
            <el-form :inline="true" :model="searchItem" style="padding: 10px 0;">
            <el-form-item label="" style="margin: 0;">
            <el-input v-model="searchItem.keyWords" placeholder="权限表达式与按钮名称搜索" ></el-input>
            </el-form-item>
            <el-button type="warning" @click="doQueryBtn">查询</el-button>
            </el-form>

            <el-table
            ref="table"
            :data="tableData"
            tooltip-effect="dark"
            border
            >

            <el-table-column
            label="权限表达式"
            width="338">
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
            width="175">
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
              <el-table-column
                label="操作"
                width="65">
                <template slot-scope="scope">
                  <div style="overflow: hidden;white-space: nowrap;
            text-overflow: ellipsis;">

                <el-button size="mini" v-if="!scope.row.isHave" @click="changeBtn(1,scope.row)">+</el-button>
                <el-button size="mini" v-else @click="changeBtn(0,scope.row)">-</el-button>
                  </div>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
            :current-page="pager.currentNum"
            :page-size="pager.pageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes ,prev, pager, next, jumper"
            :total="pager.count">
            </el-pagination>
          </div>
        </div>
      </div>

      <!--<div class="item-table">-->
        <!--<el-tree-->
          <!--:data="treeList"-->
          <!--node-key="id"-->
          <!--ref="tree"-->
          <!--:props="defaultProps">-->
            <!--<div class="custom-tree-node" style="width: 100%;" slot-scope="{ node, data }" @click="showDailog(data)">-->
              <!--<span>{{ node.label }}</span>-->

            <!--</div>-->
        <!--</el-tree>-->
      <!--</div>-->
      <!--<allot ref="allot"></allot>-->
    </div>
</template>

<script>
  import allot from './module/allot'
export default {
  name: 'index',
  data(){
    return {

      treeList: [],
      showTable: false,
      defaultProps: {
        label: 'name'
      },
      currentNode: {children: []},
      tableData: [],
      pager:{
        currentNum: 1,
        pageSize: 10,
        count: 1
      },
      queryUrl: '/btnInfo/queryBtnListByBaseQuery.htm',
      searchItem : {keyWords: ''},
      roleBtnList: []
    }
  },
  components:{
    allot
  },
  methods:{
    changeBtn(num,row){
      if(num === 1){
        this.currentNode.children.push(row);
        row.isHave = true;
      }else{
        let idx = this.currentNode.children.findIndex(it => it.btnId === row.btnId);
        this.currentNode.children.splice(idx,1);
        row.isHave = false;
      }
      this.addRoleBtnList();
    },

    saveBtn(){
      //保存
      this.$http.post("/btnInfo/saveRoleBtnInfo.htm",{roleBtnList:this.roleBtnList},{mheaders: true}).then(res => {
        this.$message.success("按钮权限配置成功");
      })
    },
    refreshTable(){
      this.$refs.table.clearSelection();
      let arr =this.tableData.filter(it => this.currentNode.children.find(i => i.btnId === it.btnId));
      arr.forEach(it => {
        this.$refs.table.toggleRowSelection(it,true);
      })
    },
    showDailog(data){
      if(data.type !== 2)
        this.showTable = false;
      else{
        this.showTable = true;
        this.currentNode = data;
        this.$nextTick(() => {
          this.pager.currentNum = 1;
          this.doQueryBtn();
        })
      }
    },
    doQuery(){
      this.$http.post("/menu/queryRoleZTree.htm").then(res => {
        let list = res.result;
        this.treeList = this.initTreeList(list);

        console.log(this.treeList);
      })
    },
    doQueryBtn(){
      this.$http.post('/btnInfo/queryBtnListByBaseQuery.htm',Object.assign(this.searchItem, this.pager)).then(res => {
        this.tableData = res.result.list;
        this.tableData.forEach(it => {
          it.name = it.btnName;
          if(this.currentNode.children.find(i => i.btnId === it.btnId)){
            this.$set(it,'isHave',true)
          }else{
            this.$set(it,'isHave',false)
          }
        })
        this.pager.count = res.result.count;
        this.$nextTick(() => {
          this.refreshTable();
        })
      })
    },
    initTreeList(list){
      let arr = [];
      arr= list.filter(it => it.type === 1);
      arr.forEach(i => {
        i.children = list.filter(it => it.type === 2 && it.pId === i.id);
        i.children.forEach(ii => {
          ii.children = list.filter(it => it.type === 3 && ii.id === it.pId);
        })
      })
      return arr;
    },

    handleCurrentChange(num){
      this.pager.currentNum = num;
      this.doQueryBtn();
      this.refreshTable();
    },
    handleSizeChange(num){
      this.pager.pageSize = num;
      this.doQueryBtn();
      this.refreshTable();
    },
    addRoleBtnList(){
      console.log(this.currentNode);
      let item = this.roleBtnList.find(it => it.menuId === this.currentNode.id);
      if(item){
        item.btnList = [];
        this.currentNode.children.forEach(it => {
          item.btnList.push(it.btnId);
        })
      }else{
        let item = {menuId: this.currentNode.id};
        item.btnList = [];
        this.currentNode.children.forEach(it => {
          item.btnList.push(it.btnId);
        })
        this.roleBtnList.push(item);
      }
    }
  },
  created() {
    this.doQuery();
  }

}
</script>

<style scoped lang="scss">
  .content{
    width: 100%;
    background: #fff;
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
      .innerUl{
        margin: 10px;
        li{
          line-height: 30px;
          span{
            float: right;
            width: 20px;
            height: 20px;
            background-image: url("../../../assets/img/error.png");
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
      width: 580px;
    }

  }
</style>
