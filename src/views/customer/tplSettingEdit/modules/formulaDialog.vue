<template>
  <div class="formula-dialog">
    <el-dialog
      :title="`公式${type === 'add' ? '新增' : '修改'}`"
      :visible.sync="dialogVisible"
      width="900px"
      @close="handleClose"
			ref="dialog"
      :close-on-click-modal="false"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          
					<el-form-item label="费用名称" prop="paramName">
						<el-input style="width:100%" v-model.trim="ruleForm.paramName" placeholder="请输入"></el-input>
					</el-form-item>

					<el-form-item label="费用类型" prop="feeType">
            <el-select @change="handleFeeType" clearable style="width:100%" v-model="ruleForm.feeType" placeholder="请选择">
              <el-option label="费用明细" :value="1"></el-option>
              <el-option label="标的金额" :value="2"></el-option>
              <el-option label="预测仲裁金额" :value="3"></el-option>
              <el-option label="执行标的" :value="4"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="关联费用" prop="feeDetails" v-if="(ruleForm.feeType === 2 || ruleForm.feeType === 3 || ruleForm.feeType === 4)">
            <el-select multiple clearable style="width:100%" v-model="ruleForm.feeDetails" placeholder="请选择">
              <el-option v-for="(item,index) in glfyOptions" :key="index" :label="item.paramName" :value="item.calcId"></el-option>
            </el-select>
          </el-form-item>

					<el-form-item label="公式" prop="expression" class="expression-wrap">
            <!-- <div class="operation-box">
              <img  @click.stop="operationStatus = true" v-show="imgShow === true" src="@/assets/img/webpageEditorCircular.png" />
              <transition name="fade" mode="out-in">
                <div @click.stop="() => {}" class="operation" v-show="operationStatus === true">
                  <span @click="operationStatus = false">x</span>
                  <el-button @click="aaaaa">插入参数</el-button>
                  <el-button @click="aaaaa">插入参数</el-button>
                  <el-button @click="aaaaa">插入参数</el-button>
                </div>
              </transition>
            </div> -->

						<el-input ref="expression" type="textarea" :autosize="{ minRows: 20, maxRows: 20}" style="width:100%" v-model="ruleForm.expression" placeholder="请输入"></el-input>
					</el-form-item>

        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button :disabled="submitDisabled" type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
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
        type : '',
        row : '',
        imgShow : true,

        ruleForm : {
          // 费用名称
          paramName : '',
          // 费用类型 金额类型:1-费用明细；2-标的金额；3-预测仲裁金额；4-执行标的
          feeType : '',
          // 关联费用
          feeDetails : [],
          // 费用公式
          expression : '',
        },
        rules : {
          paramName : [
            {required : true , message : '请输入费用名称' , trigger : 'blur'},
          ],
          feeType : [
            {required : true , message : '请选择费用类型' , trigger : 'change'},
          ],
          expression : [
            {required : true , message : '请输入费用公式' , trigger : 'blur'},
          ],
          feeDetails : [
            {required : true , message : '请选择关联费用' , trigger : 'change' , type : 'array'},
          ],
        },

        operationStatus : false,
        // 关联费用 options
        glfyOptions : [],
      }
    },
    watch : {
      operationStatus(val) {
        if(val === true) {
          this.imgShow = false;
        }else{
          window.setTimeout(() => {
            this.imgShow = true;
          },648);
        }
      },
    },
    mounted() {
      document.body.addEventListener('click',this.bodyClick);
    },
    methods : {
      show(type,data) {
        this.dialogVisible = true;
        this.type = type;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        this.$nextTick(() => {
          // 处理逻辑 写在nextTick中 ， 防止dialog没有加载数据问题
          if(this.type === 'edit') {
            this.row = data;
            // 获取详情
            this.$http({
              method : 'post',
              url : '/execution/queryDetail.htm',
              data : {
                calcId : data.calcId,
              },
            }).then(res => {
              res.result.details = res.result.details || [];
              this.glfyOptions = res.result.details;
              this.ruleForm.paramName = res.result.paramName;
              this.ruleForm.feeType = res.result.feeType;
              this.ruleForm.feeDetails = res.result.details.map(v => v.calcId);
              this.ruleForm.expression = res.result.expression;

              this.handleFeeType(2,false);
            });
          }
        });
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        
        setTimeout(() => {
          // 取消按钮禁用
          this.submitDisabled = false;
          // 重置表单数据
          this.$refs.ruleForm.resetFields();
          this.$nextTick(() => {
            this.$refs.ruleForm.clearValidate();
          });
				},500);
				
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
						// 提交数据
            this.submitDisabled = true;
            let form = {...this.ruleForm};
            if(this.type === 'edit') {
              form.calcId = this.row.calcId;
            }
            form.feeDetails = form.feeDetails.join(',');
            form.prodTempId = this.$route.query.prodTempId;
						this.$http({
              method : 'post',
              url : '/execution/saveFeeCalculation.htm',
              data : form,
            }).then((res) => {
              this.$message.success('操作成功');
              this.handleClose();
              this.$parent.reseting();
            }).catch(() => {
              this.submitDisabled = false;
            });
          }
        });
      },
      // 费用类型 change
      handleFeeType(val,type) {
        if(type !== false) {
          this.ruleForm.feeDetails = [];
        }
        if(val !== 1) {
          this.$http({
            method : 'post',
            url : '/execution/queryCalclations.htm',
            data : {
              feeType : 1,
              prodTempId : this.$route.query.prodTempId,
            },
          }).then(res => {
            this.glfyOptions =  res.result.list;
          });
        }
      },
      bodyClick() {
        this.operationStatus = false;
      },
      //输入框获取光标
      getPosition(element) {
        let cursorPos = 0;
        if (document.selection) {//IE
          var selectRange = document.selection.createRange();
          selectRange.moveStart('character', -element.value.length);
          cursorPos = selectRange.text.length;
        } else if (element.selectionStart || element.selectionStart == '0') {
          cursorPos = element.selectionStart;
        }
        return cursorPos;
      },
      // 公式输入框光标插入数据
      insertData(text) {
        let cursorPos = this.getPosition(this.$refs.expression.$el.querySelector('textarea'));
        this.ruleForm.expression = this.ruleForm.expression.splice(cursorPos,0,text)
      },
      aaaaa() {
        this.insertData('我是新内容');
      },
    },
    beforeDestroy() {
      document.body.removeEventListener('click',this.bodyClick);
    },
  }
</script>

<style scoped lang="scss">

.formula-dialog{

}

</style>

<style lang="scss">

.formula-dialog{
  .fade-enter-active, .fade-leave-active {
    transition: all .6s;
  }
  .fade-enter, .fade-leave-to {
    transform: translateX(-150px);
    opacity: 0;
  }
  .expression-wrap{
    position: relative;
  }
  .operation-box{
    position: absolute;
    top: 50%;
    left: 10px;
    transform: translate(0, -50%);
    img{
      float: left;
      cursor: pointer;
    }
    .operation{
      width: 150px;
      border-radius: 5px;
      border: 1px solid #ccc;
      text-align: center;
      padding: 20px 10px;
      background-color: rgba(255,255,255,.8);
      button{
        width: 100%;
      }
      >button{
        width: 100%;
        margin-left: 0;
        margin-bottom: 20px;
      }
      >button:last-child{
        margin-bottom: 0;
      }
      >div{
        margin-bottom: 20px;
      }
      >div:last-child{
        margin-bottom: 0;
      }
      >span{
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 1px solid #ccc;
        line-height: 20px;
        text-align: center;
        right: -10px;
        top: -10px;
        background-color: #fff;
        cursor: pointer;
      }
    }
  }
}

</style> 
