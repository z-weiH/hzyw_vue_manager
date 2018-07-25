<template>
  <div class="product-list-product-dialog">
    <el-dialog
      :title="type === 'add' ? '新增产品' : '修改产品'"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
			ref="dialog"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          
					<el-form-item label="产品名称：" prop="prodName">
						<el-input style="width:400px;" v-model.trim="ruleForm.prodName" placeholder="请输入产品名称"></el-input>
					</el-form-item>

          <el-form-item label="产品编码：" prop="prodCode">
						<el-input style="width:400px;" v-model.trim="ruleForm.prodCode" placeholder="请输入两位产品编码"></el-input>
					</el-form-item>

					<el-form-item label="业务类型：" prop="busiName">
            <el-select clearable style="width:400px;" v-model="ruleForm.busiName" placeholder="请选择业务类型">
              <el-option :label="item.bizType" :value="item.bizCode" v-for="(item,index) in busiOptions" :key="index"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="借款平台：" prop="platName">
						<el-input style="width:400px;" v-model.trim="ruleForm.platName" placeholder="请输入借款平台"></el-input>
					</el-form-item>

          <el-form-item label="协商电话：" prop="extraPhones">
						<el-input style="width:400px;" v-model.trim="ruleForm.extraPhones" placeholder="请输入协商电话"></el-input>
            <p>多个协商电话请用，隔开</p>
          </el-form-item>

          <el-form-item label="IP白名单：" prop="productIp">
						<el-input style="width:400px;" v-model.trim="ruleForm.productIp" placeholder="请输入IP白名单"></el-input>
            <p>多个IP地址请用，隔开</p>
          </el-form-item>

          <el-form-item label="接口地址：" prop="productUrl">
						<el-input style="width:400px;" v-model.trim="ruleForm.productUrl" placeholder="请输入接口地址"></el-input>
					</el-form-item>

          <el-form-item label="服务协议：" prop="fwxyUrl">
            <el-upload
              class="upload-demo"
              :action="`${$host}/file/upload.htm`"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess1"
              :on-error="fileError"
              :data="{
                path : 'demo',
                token : token,
              }"
            >
              <el-button size="mini" icon='el-icon-upload'>
                上传
              </el-button>
              {{ruleForm.fwxyUrlFileName}}
              <template v-if="type === 'edit' && !ruleForm.fwxyUrlFileName">
                <a class="ml-10" slot="tip" target="_blank" :href="ruleForm.fwxyUrl">查看</a>
              </template>
            </el-upload>
          </el-form-item>

          <el-form-item label="合作协议：" prop="hzxyUrl">
            <el-upload
              class="upload-demo"
              :action="`${$host}/file/upload.htm`"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess2"
              :on-error="fileError"
              :data="{
                path : 'demo',
                token : token,
              }"
            >
              <el-button slot="trigger" size="mini" icon='el-icon-upload'>
                上传
              </el-button>
              {{ruleForm.hzxyUrlFileName}}
              <template v-if="type === 'edit' && !ruleForm.hzxyUrlFileName">
                <a class="ml-5" slot="tip" target="_blank" :href="ruleForm.hzxyUrl">查看</a>
              </template>
            </el-upload>
          </el-form-item>

          <el-form-item label="补充协议：" prop="bcxyUrl">
            <el-upload
              class="upload-demo"
              :action="`${$host}/file/upload.htm`"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess3"
              :on-error="fileError"
              :data="{
                path : 'demo',
                token : token,
              }"
            >
              <el-button size="mini" icon='el-icon-upload'>
                上传
              </el-button>
              {{ruleForm.bcxyUrlFileName}}
              <template v-if="type === 'edit' && !ruleForm.bcxyUrlFileName">
                <a class="ml-10" slot="tip" target="_blank" :href="ruleForm.bcxyUrl">查看</a>
              </template>
            </el-upload>
          </el-form-item>

        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button :disabled="submitDisabled" type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
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
        // 当前类型
        type : '',
        // 用户token
        token : JSON.parse(localStorage.getItem('loginInfo')).token,

        ruleForm : {
          // 产品名称
          prodName : '',
          // 产品编码
          prodCode : '',
          // 业务类型
          busiName : '',
          // 借款平台
          platName : '',
          // 协商电话
          extraPhones : '',
          // IP白名单
          productIp : '',
          // 接口地址
          productUrl : '',
          // 服务协议
          fwxyUrl : '',
          // 合作协议
          hzxyUrl : '',
          // 补充协议
          bcxyUrl : '',

          // 服务协议 文件名称
          fwxyUrlFileName : '',
          // 合作协议 文件名称
          hzxyUrlFileName : '',
          // 补充协议 文件名称
          bcxyUrlFileName : '',
        },
        rules : {
          prodName : [
            {required : true , message : '请输入产品名称' , trigger : 'blur'},
          ],
          prodCode : [
            {required : true , message : '请输入产品编码' , trigger : 'blur'},
            {pattern : /^\d{2}$/ , message : '请输入两位数字' , trigger : 'blur'},
          ],
          busiName : [
            {required : true , message : '请选择业务类型' , trigger : 'change'},
          ],
          platName : [
            {required : true , message : '请输入借款平台' , trigger : 'blur'},
          ],
          extraPhones : [
            {required : true , message : '请输入协商电话' , trigger : 'blur'},
          ],
          productIp : [
            {required : true , message : '请输入IP白名单' , trigger : 'blur'},
          ],
          productUrl : [
            {required : true , message : '请输入接口地址' , trigger : 'blur'},
          ],
        },

        // 业务类型 options
        busiOptions : [
          {bizType : '类型1' , bizCode : '1'}
        ],

      }
    },
    mounted() {
      // 获取所有 业务类型
      this.$http({
        url : '/biz/queryListBizType.htm',
        method : 'post',
      }).then((res) => {
        this.busiOptions = res.result.list;
      });
    },
    methods : {
      show(type,data) {
        this.dialogVisible = true;
        this.type = type;
        this.row = data || {};
				// dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });

        // 回显数据
        if(type === 'edit') {
          this.$http({
            url : '/merchant/queryClientInfoByProductId',
            method : 'post',
            data : {
              productId : data.productId,
            },
          }).then((res) => {
            this.ruleForm = Object.assign(this.ruleForm,res.result);
          });
        }
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        // 取消按钮禁用
        setTimeout(() => {
          this.submitDisabled = false;
				},500);
				// 重置表单数据
        this.$refs.ruleForm.resetFields();
        // 清空其他数据
        this.ruleForm.fwxyUrlFileName = '';
        this.ruleForm.hzxyUrlFileName = '';
        this.ruleForm.bcxyUrlFileName = '';
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
						// 提交数据
						this.submitDisabled = true;
						this.$http({
              method : 'post',
              url : '/preCaseLib/distributeCaseByDistributeCaseQuery.htm',
              data : {
                ...this.ruleForm,
                clientCode : this.$route.query.clientCode,
                productId : this.type === 'add' ? '' : this.row.productId,
              },
            }).then((res) => {
              this.$message.success('分配成功');
              this.$emit('successCBK');
              this.handleClose();
            }).catch(() => {
              this.submitDisabled = false;
            });
          }
        });
      },

      // 文件上传前 校验
      beforeAvatarUpload(file) {
        let fileType = file.name.split('.').pop().toLowerCase();
        let arr = ['jpg','png','gif','jpeg'];
        if(arr.indexOf(fileType) === -1){
          this.$message.error('文件格式有误');
          return false;
        }
        return true;
      },
      // 文件上传失败
      fileError() {
        this.$message.error('文件上传失败，请稍后重试');
      },

      // 服务协议 上传成功
      handleAvatarSuccess1(response, file, fileList) {
        this.ruleForm.fwxyUrl = response.result;
        this.ruleForm.fwxyUrlFileName = file.name;
      },
      // 合作协议 上传成功
      handleAvatarSuccess2(response, file, fileList) {
        this.ruleForm.hzxyUrl = response.result;
        this.ruleForm.hzxyUrlFileName = file.name;
      },
      // 补充协议 上传成功
      handleAvatarSuccess3(response, file, fileList) {
        this.ruleForm.bcxyUrl = response.result;
        this.ruleForm.bcxyUrlFileName = file.name;
      },
    },
  }
</script>

<style scoped lang="scss">

.product-list-product-dialog{

}

</style>
