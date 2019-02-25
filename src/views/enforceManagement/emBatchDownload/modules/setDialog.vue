<template>
  <div class="emBatch-download-set-dialog">
    <el-dialog
      title="材料设置提示"
      :visible.sync="dialogVisible"
      width="500px"
			ref="dialog"
    >
      <div class="m-conetnt">
        <div v-if="unSettingTemplateList.length > 0">强制执行申请书模板未配置</div>
        <div class="error" v-for="(item,index) in unSettingTemplateList" :key="index + '0'">
           {{item}}
        </div> 

        <div v-if="unSettingBankCardList.length > 0">被执行人银行卡未配置</div>
        <div class="error" v-for="(item,index) in unSettingBankCardList" :key="index + '1'">
           {{item}}
        </div>

        <div v-if="unSettingCourtNameList.length > 0">{{unSettingCourtNameList.length}}个法院材料未配置</div>
        <div class="error" v-for="(item,index) in unSettingCourtNameList" :key="index + '2'">
           {{item}}
        </div>

        <div v-if="unSettingClienteleList.length > 0">未配置委托人</div>
        <div class="error" v-for="(item,index) in unSettingClienteleList" :key="index + '3'">
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
        // 强制执行申请书模板未配置
        unSettingTemplateList : [],
        // 被执行人银行卡未配置
        unSettingBankCardList : [],
        // 法院材料未配置
        unSettingCourtNameList : [],
        // 未配置委托人
        unSettingClienteleList : [],
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
          this.unSettingTemplateList = data.unSettingTemplateList;
          this.unSettingBankCardList = data.unSettingBankCardList;
          this.unSettingCourtNameList = data.unSettingCourtNameList;
          this.unSettingClienteleList = data.unSettingClienteleList;
        });
      },
    },
  }
</script>

<style lang="scss">

.emBatch-download-set-dialog{
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
