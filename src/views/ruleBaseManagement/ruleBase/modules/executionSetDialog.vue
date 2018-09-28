<template>
  <div class="rule-base-execution-set-dialog">
    <el-dialog
      title="执行集合"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <!-- 列表状态 -->
          <template v-if="type === 1">
            <div class="m-list">
              {{
                list.length === 0 ? '当前暂未配置可执行规则，请点击右侧按钮进行配置。' : `当前共配置了 ${list.length} 条可执行规则：`
              }}
              <div class="fr">
                <el-button @click="handleConfig" type="primary" size="mini">配置</el-button>
              </div>
              <ul class="list-box">
                <li v-for="(item,index) in list" :key="index">
                  {{index + 1}}.{{item.ruleDesc}}
                </li>
              </ul>
            </div>
          </template>
          <!-- 配置状态 -->
          <template v-else>
            <div class="m-config-list">
              <div class="list-box">
                <div class="m-li">
                  <el-checkbox :indeterminate="isIndeterminate" @change="handleCheckAllChange" v-model="checkAll">全部</el-checkbox>
                </div>
                <el-checkbox-group v-model="checkList" @change="handleChange">
                  <div v-for="(item,index) in configList" :key="index" class="m-li">
                    <el-checkbox :label="item.ruleId">{{item.ruleDesc}}</el-checkbox>
                  </div>
                </el-checkbox-group>
              </div>
            </div>
          </template>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button :disabled="submitDisabled" type="primary" @click="handleSubmit" v-if="type === 2">确 定</el-button>
        <el-button v-if="type === 1" @click="dialogVisible = false">关闭</el-button>
        <el-button v-if="type === 2" @click="handleCancel">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,
        // 状态  1 列表状态 2 配置状态
        type : 1,

        ruleForm : {

        },
        // 模板规则id
        levelId : '',

        // 列表 list
        list : [],
        // 配置 list
        configList : [],
        // 配置 list 选中
        checkList : [],
        // 全选 选中状态
        checkAll : false,
        // 全选 不确定状态
        isIndeterminate : false,

        rules : {
          demo : [
            {required : true , message : '请选择互金企业' , trigger : 'change'},
          ],
        },
      }
    },
    mounted() {

    },
    methods : {
      init() {
        this.$http({
          url : '/collection/queryRuleCollectionList.htm',
          method : 'post',
          data : {
            levelId : this.levelId,
          },
        }).then((res) => {
          if(res.result.configFlag === false) {
            this.irregularity();
          }else{
            this.dialogVisible = true;
            this.list = res.result.exeCollectionList;
          }
        });
      },

      show(data) {
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });
        this.levelId = data.levelId;

        // 执行集合 状态 以及当前执行结果
        this.init();

        // 获取所有规则列表
        this.$http({
          url : '/collection/queryAllRuleListByLevelId.htm',
          method : 'post',
          data : {
            levelId : data.levelId,
          },
        }).then((res) => {
          this.configList = res.result;
        });

      },

      // 无规则 提示
      irregularity() {
        this.$alert('当前暂无可配置的规则。请先添加规则。', '提示', {
          confirmButtonText: '确定',
          cancelButtonClass: 'cancel',
          confirmButtonClass: 'confirm',
          callback: () => {

          },
        });
      },

      // 点击配置
      handleConfig() {
        this.type = 2;
        this.checkList = this.list.map((v) => v.ruleId);
        this.handleChange(this.checkList);
      },
      // 全选 change
      handleCheckAllChange(val) {
        this.checkList = val ? this.configList.map(v => v.ruleId) : [];
        this.isIndeterminate = false;
      },
      // 单选 change
      handleChange(val) {
        let checkedCount  = val.length;
        this.checkAll = checkedCount === this.configList.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.configList.length;
      },
      // 点击取消
      handleCancel() {
        this.type = 1;
        this.checkList = [];
        this.checkAll = false;
        this.isIndeterminate = false;
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        this.type = 1;
        // 取消按钮禁用
        setTimeout(() => {
          this.submitDisabled = false;
				},500);
				// 重置表单数据
        this.$refs.ruleForm.resetFields();
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
						// 提交数据
            this.submitDisabled = true;
						this.$http({
              method : 'get',
              url : '/collection/configRuleCollectionList.htm',
              params : {
                levelId : this.levelId,
                ruleIds : (this.checkList),
              },
            }).then((res) => {
              this.$parent.refreshRules({levelId: this.levelId});
              this.submitDisabled = false;

              this.handleCancel();
              this.init();
            }).catch(() => {
              this.submitDisabled = false;
            });
          }
        });
      },
    },
  }
</script>

<style scoped lang="scss">

.rule-base-execution-set-dialog{
  .list-box{
    padding-left: 20px;
    margin-top: 15px;
    li{
      margin-bottom: 15px;
    }
    .m-li{
      margin-bottom: 15px;
    }
  }
}

</style>

<style lang="scss">

.rule-base-execution-set-dialog{
  .el-checkbox-group{
    font-size: 14px;
  }
}

</style>

