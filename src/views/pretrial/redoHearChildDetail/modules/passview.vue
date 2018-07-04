<template>
 <el-dialog @open="queryCaseNum" :visible.sync="show" :title="'提示'" width="560px" center @close="closeFoo">
     <el-row class="ps_panel">
       <el-col :span="24">
         <div>您即将对本批案件执行复审通过操作。</div>
         <div>操作执行后，客户将接收到本批案件的预审结果。</div>
         <div>其中，预审通过<span class="f_orange">{{item.passCount}}</span>件，未通过<span class="f_orange">{{item.passCount}}</span>件，共计<span class="f_orange">{{item.totalCount}}</span>件。</div>
          <div>确定通过？</div>
       </el-col>
     </el-row>
    <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="passAllCase">确 认</el-button>
            <el-button @click="$parent.pview_state = 0" >取 消</el-button>
        </span>
  </el-dialog>
</template>

<script type="text/ecmascript-6">
import { URL_JSON } from "../../../../components/script/url_json";
export default {
  name: "passview",
  props: {
    subBatchNo: String
  },
  data() {
    return {
      item:{}
    };
  },
  methods: {
    passAllCase() {
      this.$http
        .post(URL_JSON["savePassBatchId"], {
          subBatchId: this.subBatchNo
        })
        .then(res => {
          if(res.code === "0000"){
            this.$parent.pview_state = 0;
            this.$message.success('批量通过完成');
            this.$parent.FooPassCheckCBK && this.$parent.FooPassCheckCBK();
          }
        });
    },
    queryCaseNum() {
      this.$http
        .post(URL_JSON["queryNumberBatchList1"], {
          subBatchNo: this.subBatchNo
        })
        .then(res => {
          console.log(res.result);
          this.item = res.result;
        });
    },
    closeFoo() {}
  },
  created() {

  },
  mounted() {},
  computed: {
    show: {
      get: function() {
        return this.$parent.pview_state === 1;
      },
      set: function(v) {
        console.log(v);
        if (!v) {
          this.$parent.pview_state = 0;
        }
      }
    }
  },
  components: {}
};
</script>

<style scoped lang="scss">
.ps_panel {
  font-size: 16px;
  text-align: center;
  line-height: 2;
}
</style>
