<template>
  <div class="court-info-dialog">
    <el-dialog
      :title="type === 'add' ? '法院新增' : '法院修改'"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">

          <el-form-item label=" " prop="provinceCode">
            <cityCascader
              :provinceCode.sync="ruleForm.provinceCode"
              :cityCode.sync="ruleForm.cityCode"
              :districtCode.sync="ruleForm.districtCode"  
              ref="cityCascader"
              @finish="cityFinish"
            >
            </cityCascader>
          </el-form-item>

          <el-form-item label="法院类型：" prop="courtType">
            <el-select clearable style="width:400px;" v-model="ruleForm.courtType" placeholder="请选择">
              <el-option :label="item.label" :value="item.value" v-for="(item,index) in courtOptions" :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="法院名：" prop="courtName">
						<el-input style="width:400px;" v-model.trim="ruleForm.courtName" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="地址：" prop="courtAddress">
						<el-input style="width:400px;" v-model.trim="ruleForm.courtAddress" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="电话：" prop="courtPhone">
						<el-input style="width:400px;" v-model.trim="ruleForm.courtPhone" placeholder="请输入"></el-input>
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
  import cityCascader from '@/components/cityCascader.vue'
  export default {
    components : {
      cityCascader,
    },
    data() {
      // 校验 城市
      let verifyCity = (rule, value, callback) => {
        if(!this.ruleForm.provinceCode || !this.ruleForm.cityCode || !this.ruleForm.districtCode) {
          callback('请选择完整地区');
        }else{
          callback();
        }
      };
      return {
        dialogVisible : false,
        // 提交按钮禁用状态
        submitDisabled : false,

        ruleForm : {
          // 省编码
          provinceCode : '',
          // 市编码
          cityCode : '',
          // 区编码
          districtCode : '',
          // 法院类型 1:基层人民法院;2:中级人民法院;3:高级人民法院;4:最高院
          courtType : '',
          // 法院 id 修改时 需要
          courtId : '',
          // 法院名称
          courtName : '',
          // 地址
          courtAddress : '',
          // 电话
          courtPhone : '',
        },
        rules : {
          provinceCode : [
            {required : true , message : '请选择' , trigger : 'change'},
            { validator: verifyCity, trigger: 'blur' },
          ],
          courtType : [
            {required : true , message : '请选择法院类型' , trigger : 'change'},
          ],
          courtName : [
            {required : true , message : '请输入法院名称' , trigger : 'blur'},
          ],
          courtAddress : [
            {required : true , message : '请输入地址' , trigger : 'blur'},
          ],
          courtPhone : [
            {required : true , message : '请输入电话' , trigger : 'blur'},
          ],
        },
        type : '',

        // 法院类型 options
        courtOptions : [
          {label : '基础人民法院' , value : 1},
          {label : '中级人民法院' , value : 2},
          {label : '高级人民法院' , value : 3},
          {label : '最高人民法院' , value : 4},
        ],
      }
    },
    mounted() {

    },
    methods : {
      show(type,data) {
        this.dialogVisible = true;
        this.type = type;
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        if(type === 'edit') {
          this.ruleForm.courtId = data.courtId;
        }
      },

      // 地区 选择完成回调
      cityFinish() {
        
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        // 取消按钮禁用
        setTimeout(() => {
          this.submitDisabled = false;
          this.$refs.ruleForm.clearValidate();
				},500);
				// 重置表单数据
        this.$refs.ruleForm.resetFields();
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            let cn = this.$refs.cityCascader.getCN();
            let form = {...this.ruleForm};
            if(this.type === 'add') {
              delete form.courtId;
            }
						// 提交数据
						this.submitDisabled = true;
						this.$http({
              method : 'post',
              url : '/court/insertOrUpdateCourtInfo.htm',
              data : {
                ...form,
                province : cn[0],
                city : cn[1],
                district : cn[2],
              },
            }).then((res) => {
              this.$message.success(this.type === 'add' ? '新增成功' : '修改成功');
              this.handleClose();
              this.$emit('successCBK');
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

.court-info-dialog{

}

</style>
