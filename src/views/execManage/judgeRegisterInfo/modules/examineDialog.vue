<template>
  <div class="judge-register-info-examine-dialog">
    <el-dialog
      title="审核"
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
              @cancel="cityCancel"
            >
            </cityCascader>
          </el-form-item>

          <el-form-item label="法院：" prop="courtId">
            <el-select @change="handleCourt" ref="Court" style="width:400px;" v-model="ruleForm.courtId" placeholder="请选择">
              <el-option :label="item.courtName" :value="item.courtId" v-for="(item,index) in courtOptions" :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="地址：" prop="courtAddress">
						<span>{{ruleForm.courtAddress}}</span>
					</el-form-item>
          
					<el-form-item label="角色：" prop="role">
            <el-select clearable v-model="ruleForm.role" placeholder="请选择角色" style="width:400px;">
              <el-option 
                v-for="(item,index) in roleOptions" 
                :key="index" 
                :label="item.label" 
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="姓名：" prop="judgeName">
						<el-input style="width:400px;" v-model.trim="ruleForm.judgeName" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="手机号：" prop="cellphone">
						<el-input style="width:400px;" v-model.trim="ruleForm.cellphone" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="工作座机：" prop="landlineTelephone">
						<el-input style="width:400px;" v-model.trim="ruleForm.landlineTelephone" placeholder="请输入"></el-input>
					</el-form-item>

          <el-form-item label="备注：" prop="remark">
						<el-input style="width:400px;" v-model.trim="ruleForm.remark" placeholder="请输入"></el-input>
					</el-form-item>

        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button :disabled="submitDisabled" type="primary" @click="handleSubmit(1)">通 过</el-button>
        <el-button :disabled="submitDisabled" @click="handleSubmit(2)">拒 绝</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import cityCascader from '@/components/cityCascader.vue'
  import regexp from '@/assets/js/regexp'
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

          // 法院 id
          courtId : '',
          // 地址
          courtAddress : '',

          // 角色 1：立案法官;2：执行法官;3：立案庭庭长;4: 执行庭庭长;5：法院院长
          role : '',
          // 姓名
          judgeName : '',
          // 手机号
          cellphone : '',
          // 工作座机
          landlineTelephone : '',
          // 备注
          remark : '',
        },
        rules : {
          provinceCode : [
            {required : true , message : '请选择' , trigger : 'change'},
            { validator: verifyCity, trigger: 'blur' },
          ],
          courtId : [
            {required : true , message : '请选择法院' , trigger : 'change'},
          ],
          role : [
            {required : true , message : '请选择角色' , trigger : 'change'},
          ],
          judgeName : [
            {required : true , message : '请输入姓名' , trigger : 'blur'},
          ],
          cellphone : [
            {required : true , message : '请输入手机号' , trigger : 'blur'},
            {pattern : regexp.tel, message : '格式有误' , trigger : 'blur'},
          ],
          /* landlineTelephone : [
            {required : true , message : '请输入工作座机' , trigger : 'blur'},
          ],
          remark : [
            {required : true , message : '请输入备注' , trigger : 'blur'},
          ], */
        },

        // 法院 options
        courtOptions : [
          /* {courtName : '法院1' , courtId : '1'},
          {courtName : '法院2' , courtId : '2'},
          {courtName : '法院3' , courtId : '3'},
          {courtName : '法院4' , courtId : '4'}, */
        ],
        // 角色 options
        roleOptions : [
          {label : '立案法官' , value : 1},
          {label : '执行法官' , value : 2},
          {label : '立案庭庭长' , value : 3},
          {label : '执行庭庭长' , value : 4},
          {label : '法院院长' , value : 5},
        ],
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

        // 审核 id
        this.ruleForm.id = data.id;
        // 当前数据 是否存在法院 id
        this.isCourtId = !!data.courtId
        // 根据法院 id 回显数据
        if(data.courtId) {
          this.$http({
            url : '/court/queryCourtInfoById.htm',
            method : 'post',
            data : {
              courtId : data.courtId,
            },
          }).then((res) => {
            // 省市区相关
            this.ruleForm.provinceCode = res.result.provinceCode;
            this.ruleForm.cityCode = res.result.cityCode;
            this.ruleForm.districtCode = res.result.districtCode;

            this.$refs.cityCascader.cityOptions = [{city : res.result.city , cityCode : res.result.cityCode}];
            this.$refs.cityCascader.areaOptions = [{district : res.result.district , districtCode : res.result.districtCode}];
            // 法院相关
            this.ruleForm.courtId = res.result.courtId;
            this.courtOptions = [{courtName : res.result.courtName , courtId : res.result.courtId}];
            // 地址
            this.ruleForm.courtAddress = res.result.courtAddress;
          });
        }else{
          this.courtOptions = [{courtName : data.courtName , courtId : data.courtName}];
          this.ruleForm.courtId = data.courtName;
        }
        // 回显其他数据
        this.ruleForm.role = data.role || '';
        this.ruleForm.judgeName = data.judgeName || '';
        this.ruleForm.cellphone = data.cellphone || '';
        this.ruleForm.landlineTelephone = data.landlineTelephone || '';
        this.ruleForm.remark = data.remark || '';
        this.ruleForm.courtAddress = data.courtAddress || '';
      },

      // 地区 选择完成回调
      cityFinish() {
        console.log('选择成功');
        this.$http({
          url : '/court/queryCourtInfoByDistrictCode.htm',
          method : 'post',
          data : {
            districtCode : this.ruleForm.districtCode,
          },
        }).then((res) => {
          this.courtOptions = res.result;
          this.ruleForm.courtId = '';
        });
      },
      // 地区 取消回调
      cityCancel() {
        this.courtOptions = [];
        this.ruleForm.courtId = '';
        this.ruleForm.courtAddress = '';
      },
      // 法院 cahnge
      handleCourt(val) {
        this.ruleForm.courtAddress = this.courtOptions.filter(v => v.courtId === val)[0].courtAddress;
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
        let submitFn = () => {
          this.$confirm(`确认${submitType === 1 ? '通过' : '拒绝'}（${this.ruleForm.judgeName}）的注册吗?`, "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            center: true
          }).then(() => {
            let cn = this.$refs.cityCascader.getCN();
            // 提交数据
            this.submitDisabled = true;
            let form = {...this.ruleForm};
            if(submitType === 2 && this.isCourtId === false) {
              form.courtId = '';
            }
            this.$http({
              method : 'post',
              url : '/judge/auditing.htm',
              data : {
                ...form,
                province : cn[0],
                city : cn[1],
                district : cn[2],
                courtName : this.$refs.Court.$el.querySelector('input').value,
                status : submitType,
              },
            }).then((res) => {
              this.$message.success('审核成功');
              this.handleClose();
              this.$emit('successCBK');
            }).catch(() => {
              this.submitDisabled = false;
            });
          }).catch(() => {});
        };

        if(submitType === 2) {
          submitFn();
        }else{
          this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            submitFn();
          }
        });
        }
      },
    },
  }
</script>

<style scoped lang="scss">

.judge-register-info-examine-dialog{

}

</style>

