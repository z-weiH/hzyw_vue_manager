<template>
  <div class="client-management-edit-dialog">
    <el-dialog
      title="客户信息修改"
      :visible.sync="dialogVisible"
      width="860px"
      @close="handleClose"
      ref="dialog"
    >
      <div class="content-body-box">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
        >
          <table
            class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover"
          >
            <tbody>
              <tr>
                <td colspan="4">第一部分：客户基本信息</td>
              </tr>

              <tr>
                <td class="w-205">客户名称：</td>
                <td colspan="3">
                  <el-form-item label=" " prop="merchantName">
                    <el-input v-model.trim="ruleForm.merchantName" placeholder="请输入客户名称"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td class="w-205">年营业额（万元）：</td>
                <td class="w-205">
                  <el-form-item label=" " prop="busiAmount">
                    <el-input v-model.trim="ruleForm.busiAmount" placeholder="请输入年营业额"></el-input>
                  </el-form-item>
                </td>
                <td class="w-205">开户时间：</td>
                <td class="w-205">
                  {{ruleForm.createTime}}
                </td>
              </tr>

              <tr>
                <td class="w-205">登录账号：</td>
                <td class="w-205">
                  {{ruleForm.loginName}}
                </td>
                <td class="w-205">所属仲裁委：</td>
                <td class="w-205">
                  <el-form-item label=" " prop="arbId">
                    <el-select v-model="ruleForm.arbId" placeholder="所属仲裁委">
                      <el-option label="请选择" value=""></el-option>
                      <template v-for="(item,index) in arbIdOptions">
                        <el-option :key="item.arbId + '' + index" :label="item.arbName" :value="item.arbId"></el-option>
                      </template>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td class="w-205">固定电话：</td>
                <td class="w-205">
                  <el-form-item label=" " prop="telephone">
                    <el-input v-model.trim="ruleForm.telephone" placeholder="请输入固定电话"></el-input>
                  </el-form-item>
                </td>
                <td class="w-205">传真号码：</td>
                <td class="w-205">
                  <el-form-item label=" " prop="fax">
                    <el-input v-model.trim="ruleForm.fax" placeholder="请输入传真号码"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td class="w-205">所属市场人员：</td>
                <td class="w-205">
                  <el-form-item label=" " prop="hzmngUserId">
                    <el-select v-model="ruleForm.hzmngUserId" placeholder="所属仲裁委">
                      <el-option label="请选择" value=""></el-option>
                      <template v-for="(item,index) in hzmngUserIdOptions">
                        <el-option :key="item.userId + '' + index" :label="item.userName" :value="item.userId"></el-option>
                      </template>
                    </el-select>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td class="w-205">企业注册地址：</td>
                <td colspan="3">
                  <el-form-item label=" " prop="idaddress">
                    <el-input v-model.trim="ruleForm.idaddress" placeholder="请输入企业注册地址"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr class="division"></tr>

              <tr>
                <td colspan="4">第二部分：法定代表人信息</td>
              </tr>

              <tr>
                <td class="w-205">法定代表人姓名：</td>
                <td class="w-205">
                  <el-form-item label=" " prop="name">
                    <el-input v-model.trim="ruleForm.name" placeholder="请输入法定代表人姓名"></el-input>
                  </el-form-item>
                </td>
                <td class="w-205">法定代表人职务：</td>
                <td class="w-205">
                  <el-form-item label=" " prop="position">
                    <el-input v-model.trim="ruleForm.position" placeholder="请输入法定代表人职务"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td class="w-205">法定代表人手机：</td>
                <td class="w-205">{{ruleForm.phone}}</td>
                <td class="w-205">法定代表人邮箱：</td>
                <td class="w-205">{{ruleForm.email}}</td>
              </tr>

              <tr>
                <td class="w-205">通讯地址：</td>
                <td colspan="3">
                  <el-form-item label=" " prop="address">
                    <el-input v-model.trim="ruleForm.address" placeholder="请输入通讯地址"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr class="division"></tr>

              <tr>
                <td colspan="4">第三部分：证件信息</td>
              </tr>

              <tr>
                <td class="w-205">证件类型：</td>
                <td class="w-205">
                  <el-form-item label=" " prop="idtype">
                    <el-select v-model="ruleForm.idtype" placeholder="证件类型">
                      <el-option label="请选择" value=""></el-option>
                      <el-option label="身份证" :value="1"></el-option>
                      <el-option label="营业执照" :value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td class="w-205">证件号码：</td>
                <td class="w-205">
                  <el-form-item label=" " prop="idcard">
                    <el-input v-model.trim="ruleForm.idcard" placeholder="请输入证件号码"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr class="division"></tr>

              <!-- <tr>
                <td colspan="4">第四部分：对接接口信息</td>
              </tr>

              <tr>
                <td class="w-205">IP白名单：</td>
                <td colspan="3">
                  <el-form-item label=" " prop="ip">
                    <el-input v-model.trim="ruleForm.ip" placeholder="请输入IP白名单"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td class="w-205">接口地址：</td>
                <td colspan="3">
                  <el-form-item label=" " prop="url">
                    <el-input v-model.trim="ruleForm.url" placeholder="请输入接口地址"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td class="w-205">是否预审：</td>
                <td class="w-205">
                  <el-form-item label=" " prop="isGuarded">
                    <el-select v-model="ruleForm.isGuarded" placeholder="证件类型">
                      <el-option label="请选择" value=""></el-option>
                      <el-option label="预审" :value="0"></el-option>
                      <el-option label="不预审" :value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td class="w-205">是否计算：</td>
                <td class="w-205">
                  <el-form-item label=" " prop="isComputed">
                    <el-select v-model="ruleForm.isComputed" placeholder="证件类型">
                      <el-option label="请选择" value=""></el-option>
                      <el-option label="否" :value="0"></el-option>
                      <el-option label="是" :value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
              </tr> -->

            </tbody>
          </table>
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
        tableData : [{},{}],
        // 提交按钮禁用状态
        submitDisabled : false,

        ruleForm : {
          // 客户名称
          merchantName : '',
          // 年营业额（万元）
          busiAmount : '',
          // 开户时间
          createTime : '',
          // 登录账号
          loginName : '',
          // 所属仲裁委
          arbId : '',
          // 固定电话
          telephone : '',
          // 传真号码
          fax : '',
          // 所属市场人员
          hzmngUserId : '',
          // 企业注册地址
          idaddress : '',
          // 法定代表人姓名
          name : '',
          // 法定代表人职务
          position : '',
          // 法定代表人手机
          phone : '',
          // 法定代表人邮箱
          email : '',
          // 通讯地址
          address : '',
          // 证件类型 1身份证3证件照
          idtype : '',
          // 证件号码
          idcard : '',
          // IP白名单
          ip : '',
          // 接口地址
          url : '',
          // 是否预审 0预审1不预审
          isGuarded : '',
          // 是否计算 0否1是
          isComputed : '',
        },
        rules : {
          merchantName : [
            { required : true , message : '请输入客户名称' , trigger : 'blur'},
          ],
          busiAmount : [
            { required : true , message : '请输入年营业额' , trigger : 'blur'},
          ],
          createTime : [
            { required : true , message : '请输入开户时间' , trigger : 'blur'},
          ],
          loginName : [
            { required : true , message : '请输入登录账号' , trigger : 'blur'},
          ],
          arbId : [
            { required : true , message : '请选择所属仲裁委' , trigger : 'change'},
          ],
          telephone : [
            { required : true , message : '请输入固定电话' , trigger : 'blur'},
          ],
          loginName : [
            { required : true , message : '请输入登录账号' , trigger : 'blur'},
          ],
          fax : [
            { required : false , message : '请输入传真号码' , trigger : 'blur'},
          ],
          hzmngUserId : [
            { required : true , message : '请选择所属市场人员' , trigger : 'change'},
          ],
          idaddress : [
            { required : true , message : '请输入企业注册地址' , trigger : 'blur'},
          ],
          name : [
            { required : true , message : '请输入法定代表人姓名' , trigger : 'blur'},
          ],
          position : [
            { required : true , message : '请输入法定代表人职务' , trigger : 'blur'},
          ],
          phone : [
            { required : true , message : '请输入法定代表人手机' , trigger : 'blur'},
          ],
          email : [
            { required : true , message : '请输入法定代表人邮箱' , trigger : 'blur'},
          ],
          address : [
            { required : true , message : '请输入通讯地址' , trigger : 'blur'},
          ],
          idtype : [
            { required : true , message : '请选择证件类型' , trigger : 'change'},
          ],
          idcard : [
            { required : true , message : '请输入证件号码' , trigger : 'blur'},
          ],
          ip : [
            { required : true , message : '请输入IP白名单' , trigger : 'blur'},
          ],
          url : [
            { required : true , message : '请输入接口地址' , trigger : 'blur'},
          ],
          isGuarded : [
            { required : true , message : '请选择是否预审' , trigger : 'change'},
          ],
          isComputed : [
            { required : true , message : '请选择是否计算' , trigger : 'change'},
          ],
        },

        // 所属仲裁委
        arbIdOptions : [
        ],
        // 所属市场人员
        hzmngUserIdOptions : [
        ],
      }
    },
    mounted() {
      // 获取所属仲裁委 options
      this.$http({
        method : 'post',
        url : '/arb/queryAllArbList.htm',
      }).then((res) => {
        this.arbIdOptions = res.result;
      });
      // 所属市场人员 options
      this.$http({
        method : 'post',
        url : '/user/queryUserListByRoleType.htm',
        data : {
          type : 'MARKETER',
        },
      }).then((res) => {
        this.hzmngUserIdOptions = res.result;
      });
    },
    methods : {
      show(data) {
        this.dialogVisible = true;
        this.ruleForm = data;
        // dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });
      },
      // 关闭浮层 调用
      handleClose() {
        this.dialogVisible = false;
        // 取消按钮禁用
        setTimeout(() => {
          this.submitDisabled = false;
        },500);
        this.$nextTick(() => {
          this.$refs.ruleForm.resetFields();
        });
      },
      // 点击 保存
      handleSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            this.submitDisabled = true;
            this.$http({
              method : 'post',
              url : '/merchant/saveMerchantInfo.htm',
              data : this.ruleForm,
            }).then((res) => {
              this.$message.success('修改成功');
              this.$emit('successCBK');
              this.handleClose();
            }).catch(() => {
              this.submitDisabled = false;
            });
          }
        });
      },
    },
  }
</script>

<style lang="scss" scoped>

.client-management-edit-dialog{
   /* .content-body-box{
     height: 350px;
     overflow-y: auto;
   }  */
}

</style>

<style lang="scss">

.client-management-edit-dialog{
  .el-dialog__body{
    padding: 0 20px;
  }
  /* 重写 表格样式 */
  .el-table--border, .el-table--group{
    border: none;
    border-left: 1px solid #ebeef5;
  }
  td{
    border: 1px solid #ebeef5;
    word-wrap: break-word;
    word-break: normal;
  }
}

</style>