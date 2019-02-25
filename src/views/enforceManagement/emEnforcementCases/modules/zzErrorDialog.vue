<template>
  <div class="em-enforcement-cases-zz-error-dialog">
    <el-dialog
      title="材料设置提示"
      :visible.sync="dialogVisible"
      width="500px"
			ref="dialog"
    >
      <div class="m-conetnt">
        <div v-if="errorDateFormatList.length > 0">转时间格式错误</div>
        <div class="error" v-for="(item,index) in errorDateFormatList" :key="index + '0'">
           {{item}}
        </div> 

        <div v-if="unexistCaseList.length > 0">不存在的案件</div>
        <div class="error" v-for="(item,index) in unexistCaseList" :key="index + '1'">
           {{item}}
        </div>

        <div v-if="unsettingDateList.length > 0">未设置债转时间</div>
        <div class="error" v-for="(item,index) in unsettingDateList" :key="index + '3'">
           {{item}}
        </div>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" type="primary">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,
        // 债转时间格式错误的案号列表
        errorDateFormatList : [],
        // 不存在的案件列表
        unexistCaseList : [],
        // 未设置债转时间的列表
        unsettingDateList : [],
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
          this.unSettingTemplateList = data.errorDateFormatList || [];
          this.unSettingBankCardList = data.unexistCaseList || [];
          this.unSettingCourtNameList = data.unsettingDateList || [];
        });
      },
    },
  }
</script>

<style lang="scss">

.em-enforcement-cases-zz-error-dialog{
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
