<template>
  <div class="em-nnforcement-cases-batch-dialog">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="500px"
			ref="dialog"
    >
      <div class="m-conetnt">
        <div>共{{total}}个案件，已成功查询{{data.length}}个</div>
        <div>{{errorList.length}}个案号查询无结果</div>
        <div v-for="(item,index) in errorList" :key="index" class="error">
          {{item}}
        </div>
        <div v-if="duplicateCaseList.length > 0">{{duplicateCaseList.length}}个案号查询重复</div>
        <div v-for="(item,index) in duplicateCaseList" :key="index + '1'" class="error">
          {{item}}
        </div>
        <div v-if="execCaseList.length > 0">{{execCaseList.length}}个案号正在执行中</div>
        <div v-for="(item,index) in execCaseList" :key="index + '1'" class="error">
          {{item}}
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false" type="primary">确 定</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,
        total : 0,
        errorList : [{}],
        // 重复数量
        duplicateNum : 0,
        // 重复 list
        duplicateCaseList : [],
        data : [],
        execCaseList:[]
      }
    },
    mounted() {

    },
    methods : {
      show(data) {
				this.dialogVisible = true;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        this.$nextTick(() => {
          // 处理逻辑 写在nextTick中 ， 防止dialog没有加载数据问题
          this.total = data.total;
          this.errorList = data.errorList;
          this.duplicateNum = data.duplicateNum;
          this.data = data.data;
          this.duplicateCaseList = data.duplicateCaseList;
          this.execCaseList = data.execCaseList;
        });
      },
    },
  }
</script>

<style lang="scss">

.em-nnforcement-cases-batch-dialog{
  .error{
    color: red;
    padding-left: 15px;
  }
  .m-conetnt{
    >div{
      margin-bottom: 10px;
    }
  }
}

</style>
