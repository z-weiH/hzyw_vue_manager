<template>
  <div class="acontract-deduction-detail-dialog">
    <el-dialog
      title="详情"
      :visible.sync="dialogVisible"
      width="580px"
			ref="dialog"
      @close="handleClose"
    >
      <div class="m-conetnt">
        <div class="item">
          <span class="item-label">客户名称：</span>
          <span class="item-value">{{ruleForm.clientName}}</span>
        </div>

        <div class="item">
          <span class="item-label">类型：</span>
          <span class="item-value">{{ruleForm.deductionType === 0 ? '扣除仲券' : '扣除仲裁费'}}</span>
        </div>

        <div class="item">
          <span class="item-label">扣除数目：</span>
          <span class="item-value">
            {{
              ruleForm.deductionType === 0 ? ruleForm.deductionTicket : ruleForm.deductionAmt
            }}
          </span>
        </div>

        <div class="item">
          <span class="item-label">扣除说明：</span>
          <span class="item-value">{{ruleForm.deductionDesc}}</span>
        </div>

        <div class="bar"></div>

        <div class="item">
          <span class="item-label">审核状态：</span>
          <span class="item-value">{{ruleForm.deductionStatus === 1 ? '已扣款' : '未通过'}}</span>
        </div>

        <div class="item">
          <span class="item-label">审核结果：</span>
          <span class="item-value">{{ruleForm.verifyDesc}}</span>
        </div>

        <div class="item">
          <span class="item-label">审核人：</span>
          <span class="item-value">{{ruleForm.userName}}</span>
        </div>

        <div class="item">
          <span class="item-label">审核时间：</span>
          <span class="item-value">{{ruleForm.verifyTime}}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,
        ruleForm : {
        },
      }
    },
    mounted() {
    },
    methods : {
      handleClose() {
        this.ruleForm = {};
      },
      show(data) {
        this.dialogVisible = true;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        this.$nextTick(() => {
          // 处理逻辑 写在nextTick中 ， 防止dialog没有加载数据问题
          this.$http({
            url : '/dedution/queryContractDedutionDetail.htm',
            method : 'post',
            data : {
              deductionId : data.deductionId,
            },
          }).then(res => {
            let obj = Object.assign(this.ruleForm,(
              res.result.contractDeduction || {}
            ),(
              res.result.verifyInfo || {}
            ));
            this.$set(this.ruleForm,obj);
          });
        });
      },
    },
  }
</script>

<style scoped lang="scss">

.acontract-deduction-detail-dialog{
  .item{
    margin-bottom: 10px;
    .item-label{
      width: 80px;
      display: inline-block;
      text-align: right;
    }
    .item-value{
      width: 450px;
      display: inline-block;
      word-wrap: break-word; 
      word-break: normal; 
      word-break:break-all;
      vertical-align: top;
    }
  }
  .bar{
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
  }
}

</style>
