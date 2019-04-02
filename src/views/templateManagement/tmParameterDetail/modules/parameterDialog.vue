<template>
  <div class="tm-parameter-detail-parameter-dialog">
    <el-dialog
      :title="type === 'add' ? '新增参数' : '编辑参数'"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="120px">
          
					<el-form-item label="参数名：" prop="paramCode">
						<el-input :disabled="type === 'edit'" style="width:400px;" v-model.trim="ruleForm.paramCode" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="参数中文名：" prop="paramName">
						<el-input style="width:400px;" v-model.trim="ruleForm.paramName" placeholder="请输入"></el-input>
					</el-form-item>

					<el-form-item label="类型1：" prop="valueType">
            <el-select clearable style="width:400px;" v-model="ruleForm.valueType" placeholder="请选择类型1">
              <el-option label="Integer" :value="1"></el-option>
              <el-option label="String" :value="2"></el-option>
              <el-option label="Date" :value="3"></el-option>
              <el-option label="Decimal" :value="4"></el-option>
              <el-option label="JSON" :value="5"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="类型2：" prop="paramType">
            <el-select clearable style="width:400px;" v-model="ruleForm.paramType" placeholder="请选择类型2">
              <el-option label="普通参数" :value="0"></el-option>
              <el-option label="数组参数" :value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="默认值：" prop="paramValue">
						<el-input style="width:400px;" v-model.trim="ruleForm.paramValue" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item v-if="$route.query.type === '0'" label="属性：" prop="isCommon">
            <el-select clearable style="width:400px;" v-model="ruleForm.isCommon" placeholder="请选择属性">
              <el-option label="通用" :value="1"></el-option>
              <el-option label="非通用" :value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="说明：" prop="paramNote">
						<el-input style="width:400px;" v-model.trim="ruleForm.paramNote" type="textarea" placeholder="请输入"></el-input>
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
      let validatePass = (rule, value, callback) => {
        if(this.type === 'edit') {
          return callback();
        }
        value && this.$http({
          method : 'post',
          url : '/param/queryTemplateParamList.htm',
          data : {
            paramCode : value,
          },
        }).then((res) => {
          if(!res.result) {
            callback();
          }else{
            callback('参数名已存在');
          }
        });
      };
      return {
        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,
        type : '',
        itemData : '',

        // 以下参数 提交时也需要
        // 参数业务类型：0-案件参数；1-仲裁参数；2-个性参数
        paramBizType : '',
        // 产品id 个性参数必传
        productId : '',
        // id 修改时必传
        paramId : '',
        // 案件参数必传 参数分类的编码值: 1-基础信息 2-金额信息 3-当事人信息 4-日期信息 5-证据信息 6-还款信息 7-借款人银行卡信息 8-分期贷信息 9-代偿信息
        categoryCode : '',

        ruleForm : {
          // 参数名
          paramCode : '',
          // 参数中文名
          paramName : '',
          // 类型1 1-数字,2-字符串,3-日期,4-金额
          valueType : '',
          // 属性 0 否 1 是 是否为通用参数 
          isCommon : '',
          // 类型2 0-普通参数；1-数组参数
          paramType : '',
          // 说明
          paramNote : '',
          // 默认值
          paramValue : '',
        },
        rules : {
          paramCode : [
            {required : true , message : '请输入参数名' , trigger : 'blur'},
            { validator: validatePass, trigger: 'blur' }
          ],
          paramName : [
            {required : true , message : '请输入参数中文名' , trigger : 'blur'},
          ],
          valueType : [
            {required : true , message : '请选择类型1' , trigger : 'change'},
          ],
          paramType : [
            {required : true , message : '请选择类型2' , trigger : 'change'},
          ],
          isCommon : [
            {required : true , message : '请选择属性' , trigger : 'change'},
          ],
          paramValue : [
            {required : true , message : '请输入默认值' , trigger : 'blur'},
          ],
        },
      }
    },
    mounted() {

    },
    methods : {
      show(type,data) {
        this.dialogVisible = true;
        this.type = type;
        this.itemData = data;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        this.$nextTick(() => {
          // 处理逻辑 写在nextTick中 ， 防止dialog没有加载数据问题
          this.ruleForm = Object.assign(this.ruleForm,data);
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
            // 处理数据
            let form = {...this.ruleForm};
            form.paramBizType = this.$route.query.type;
            if(this.type === 'edit') {
              form.paramId = this.itemData.paramId;
            }else{
              delete form.paramId;
            }
            if(this.$route.query.type === '2') {
              form.productId = this.itemData.productId;
            }
            if(this.$route.query.type === '0') {
              form.categoryCode = this.itemData.categoryCode;
            }else{
              delete form.isCommon;
            }
						this.$http({
              method : 'post',
              url : '/param/saveParam.htm',
              data : form,
            }).then((res) => {
              this.$message.success('操作成功');
              this.submitDisabled = false;
              this.handleClose();
              this.$emit('successCBK');
            }).catch(() => {
              
            });
          }
        });
      },
    },
  }
</script>

<style scoped lang="scss">

.tm-parameter-detail-parameter-dialog{

}

</style>
