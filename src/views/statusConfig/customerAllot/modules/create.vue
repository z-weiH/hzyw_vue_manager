<template>
  <div>
    <el-dialog :visible.sync="show" :title="title" width="495px" center>
      <edits :edit-items="createItems" :item="item" :label-width="'90px'"></edits>
      <span slot="footer" class="dialog-footer">
            <el-button type="primary">确 定</el-button>
            <el-button @click="$parent.editState = 0">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script type="text/ecmascript-6">
import Edits from "@/components/edits";
export default {
  name: "customerAllotCreate",
  props: {
    item: Object,
    editState: Number
  },
  data() {
    return {
      createItems: [
        {
          type: "select",
          property: "merchantName",
          label: "互金企业",
        },
        {
          type: "select",
          property: "operatorName",
          label: "运营人员"
        }
      ]
    };
  },
  computed:{
    title () {
      // return this.editState == 1 ? '修改仲裁委' : this.editState == 2 ? '新增仲裁委' : ''
    },
    show: {
      get(){
        return this.editState == 2 || this.editState == 1;
      },
      set(v){
        if(!v){
          this.$parent.editState = 0;
        }
      }
    }
  },
  methods: {

  },
  created () {
    console.info('*******item');
    console.info(this.item);
  },
  components: {
    Edits
  }
};
</script>

<style scoped lang="scss">
</style>
