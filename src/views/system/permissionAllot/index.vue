<template>
    <div>
      <div class="item-title">
        权限分配
      </div>
      <div class="item-table self-tree">
        <el-tree
          :data="treeList"
          node-key="id"
          ref="tree"
          :props="defaultProps">
            <div class="custom-tree-node" style="width: 100%;" slot-scope="{ node, data }" @click="showDailog(data)">
              <span>{{ node.label }}</span>

            </div>
        </el-tree>
      </div>
      <allot ref="allot"></allot>
    </div>
</template>

<script>
  import allot from './module/allot'
export default {
  name: 'index',
  data(){
    return {
      treeList: [],
      defaultProps: {
        label: 'name'
      }
    }
  },
  components:{
    allot
  },
  methods:{
    showDailog(data){
      if(data.type === 1)
        return;
      this.$refs.allot.show();
    },
    doQuery(){
      this.$http.post("/menu/queryRoleZTree.htm").then(res => {
        let list = res.result;
        this.treeList = this.initTreeList(list);
        console.log(this.treeList);
      })
    },
    initTreeList(list){
      let arr = [];
      arr= list.filter(it => it.type === 1);
      arr.forEach(i => {
        i.children = list.filter(it => it.type === 2 && it.pId === i.id);
      })
      return arr;
    }
  },
  created() {
    this.doQuery();
  }

}
</script>

<style scoped>

</style>
