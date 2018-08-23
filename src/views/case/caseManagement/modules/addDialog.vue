<template>
  <div class="case-management-add-dialog">
    <el-dialog
      title="案件新增"
      :visible.sync="dialogVisible"
      width="800px"
      @close="handleClose"
      ref="dialog"
      :close-on-click-modal="false"
    >
      <div class="m-content">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules">
          
          <!-- 案件信息 -->
          <table
            class="m-primordial-table 
              el-table el-table--fit el-table--border 
              el-table--enable-row-hover"
          >
            <tr>
              <td colspan="4">案件信息</td>
            </tr>

            <tr>
              <td colspan="1">申请人：</td>
              <td colspan="1">
                <el-form-item label=" " prop="userId">
                  <el-select filterable v-model="ruleForm.userId" placeholder="请选择">
                    <template v-for="(item,index) in userOptions">
                      <el-option :key="item.userId + index" :label="item.name" :value="item.userId"></el-option>
                    </template>
                  </el-select>
                </el-form-item>
              </td>
              <td colspan="1">案件标的：</td>
              <td colspan="1">
                <el-form-item label=" " prop="amtBorrow">
                  <el-input placeholder="请输入案件标的" v-model="ruleForm.amtBorrow"></el-input>
                </el-form-item>
              </td>
            </tr>

            <tr>
              <td colspan="1">诉讼请求：</td>
              <td colspan="3">
                <el-form-item label=" " prop="requireItem">
                  <el-input :autosize="{ minRows: 3}" type="textarea" placeholder="请输入诉讼请求" v-model="ruleForm.requireItem"></el-input>
                </el-form-item>
              </td>
            </tr>

            <tr>
              <td colspan="1">事实与理由：</td>
              <td colspan="3">
                <el-form-item label=" " prop="factsReason">
                  <el-input :autosize="{ minRows: 3}" type="textarea" placeholder="请输入事实与理由" v-model="ruleForm.factsReason"></el-input>
                </el-form-item>
              </td>
            </tr>

            <tr>
              <td colspan="1">案件受理费：</td>
              <td colspan="1">
                <el-form-item label=" " prop="caseAmt">
                  <el-input placeholder="请输入案件受理费" v-model="ruleForm.caseAmt"></el-input>
                </el-form-item>
              </td>
              <td colspan="1">案件仲券：</td>
              <td colspan="1">
                <el-form-item label=" " prop="caseTicket">
                  <el-input placeholder="请输入案件仲券" v-model="ruleForm.caseTicket"></el-input>
                </el-form-item>
              </td>
            </tr>

          </table>

          <!-- 被申请人信息 -->
          <table
            class="m-primordial-table mt-10
              el-table el-table--fit el-table--border 
              el-table--enable-row-hover"
          >
            <!-- 企业 -->
            <template v-if="ruleForm.type === 1">

              <tr>
                <td colspan="1">被申请人性质：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="type">
                    <el-select @change="handleTypeChange" v-model="ruleForm.type" placeholder="请选择">
                      <el-option label="自然人" :value="0"></el-option>
                      <el-option label="企业" :value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td colspan="2"></td>
              </tr>

              <tr>
                <td colspan="1">企业名称：</td>
                  <td colspan="3">
                  <el-form-item label=" " prop="name">
                    <el-input :autosize="{ minRows: 1}" type="textarea" placeholder="请输入企业名称" v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">证件类型：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="idtype">
                    <el-select @change="handleTypeChange" v-model="ruleForm.idtype" placeholder="请选择">
                      <el-option key="1" v-if="ruleForm.type === 0" label="身份证" :value="0"></el-option>
                      <el-option key="2" v-else label="营业执照" :value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td colspan="1">社会唯一信用代码：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="idcard">
                    <el-input placeholder="请输入信用代码" v-model="ruleForm.idcard"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">营业执照：</td>
                <td colspan="3">
                  <el-form-item  label=" " prop="img01">
                    <el-upload
                      class="upload-demo"
                      :action="`${$host}/file/upload.htm`"
                      :show-file-list="false"
                      :before-upload="businessLicenseBefore"
                      :on-success="businessLicenseSuccess"
                      :on-error="fileError"
                      :data="{
                        path : 'hzuser/idcard',
                        token : token,
                      }"
                    >
                      <el-button size="mini" icon='el-icon-upload'>
                        点击这里上传文件
                      </el-button>
                      {{ruleForm.img01FileName}}
                    </el-upload>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">注册地址：</td>
                  <td colspan="3">
                  <el-form-item label=" " prop="idaddress">
                    <el-input :autosize="{ minRows: 1}" type="textarea" placeholder="请输入注册地址" v-model="ruleForm.idaddress"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">法定代表人：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="legaller">
                    <el-input placeholder="请输入法定代表人" v-model="ruleForm.legaller"></el-input>
                  </el-form-item>
                </td>
                <td colspan="1">法定代表人职务：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="position">
                    <el-input placeholder="请输入法定代表人职务" v-model="ruleForm.position"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">手机号：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="phone">
                    <el-input placeholder="请输入手机号" v-model="ruleForm.phone"></el-input>
                  </el-form-item>
                </td>
                <td colspan="1">电子邮箱：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="email">
                    <el-input placeholder="请输入电子邮箱" v-model="ruleForm.email"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">通讯地址：</td>
                  <td colspan="3">
                  <el-form-item label=" " prop="address">
                    <el-input :autosize="{ minRows: 1}" type="textarea" placeholder="请输入通讯地址" v-model="ruleForm.address"></el-input>
                  </el-form-item>
                </td>
              </tr>

            </template>
            <!-- 个人 -->
            <template v-else>
              <tr>
                <td colspan="1">被申请人性质：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="type">
                    <el-select @change="handleTypeChange" v-model="ruleForm.type" placeholder="请选择">
                      <el-option label="自然人" :value="0"></el-option>
                      <el-option label="企业" :value="1"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td colspan="2"></td>
              </tr>

              <tr>
                <td colspan="1">姓名：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="name">
                    <el-input placeholder="请输入姓名" v-model="ruleForm.name"></el-input>
                  </el-form-item>
                </td>
                <td colspan="1">民族：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="nation">
                    <el-input placeholder="请输入民族" v-model="ruleForm.nation"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">手机号：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="phone">
                    <el-input placeholder="请输入手机号" v-model="ruleForm.phone"></el-input>
                  </el-form-item>
                </td>
                <td colspan="1">电子邮箱：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="email">
                    <el-input placeholder="请输入电子邮箱" v-model="ruleForm.email"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">证件类型：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="idtype">
                    <el-select @change="handleTypeChange" v-model="ruleForm.idtype" placeholder="请选择">
                      <el-option key="1" v-if="ruleForm.type === 0" label="身份证" :value="0"></el-option>
                      <el-option key="2" v-else label="营业执照" :value="3"></el-option>
                    </el-select>
                  </el-form-item>
                </td>
                <td colspan="1">身份证号：</td>
                <td colspan="1">
                  <el-form-item label=" " prop="idcard"
                    :rules="[
                      {required : true , message : '请输入' , trigger : 'blur'},
                      {pattern : reg.certificate , message : '身份证号格式有误', trigger : 'blur'},
                    ]"
                  >
                    <el-input placeholder="请输入身份证号" v-model="ruleForm.idcard"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">身份证正面照：</td>
                <td colspan="3">
                  <el-form-item  label=" " prop="img01">
                    <el-upload
                      class="upload-demo"
                      :action="`${$host}/file/upload.htm`"
                      :show-file-list="false"
                      :before-upload="facadeOfIDCardBefore"
                      :on-success="facadeOfIDCardSuccess"
                      :on-error="fileError"
                      :data="{
                        path : 'hzuser/idcard',
                        token : token,
                      }"
                    >
                      <el-button size="mini" icon='el-icon-upload'>
                        点击这里上传文件
                      </el-button>
                      {{ruleForm.img01FileName}}
                    </el-upload>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">身份证背面照：</td>
                <td colspan="3">
                  <el-form-item  label=" " prop="img02">
                    <el-upload
                      class="upload-demo"
                      :action="`${$host}/file/upload.htm`"
                      :show-file-list="false"
                      :before-upload="backsidePhotoOfIDCardBefore"
                      :on-success="backsidePhotoOfIDCardSuccess"
                      :on-error="fileError"
                      :data="{
                        path : 'hzuser/idcard',
                        token : token,
                      }"
                    >
                      <el-button size="mini" icon='el-icon-upload'>
                        点击这里上传文件
                      </el-button>
                      {{ruleForm.img02FileName}}
                    </el-upload>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">证件地址：</td>
                  <td colspan="3">
                  <el-form-item label=" " prop="idaddress">
                    <el-input :autosize="{ minRows: 1}" type="textarea" placeholder="请输入证件地址" v-model="ruleForm.idaddress"></el-input>
                  </el-form-item>
                </td>
              </tr>

              <tr>
                <td colspan="1">通讯地址：</td>
                  <td colspan="3">
                  <el-form-item label=" " prop="address">
                    <el-input :autosize="{ minRows: 1}" type="textarea" placeholder="请输入通讯地址" v-model="ruleForm.address"></el-input>
                  </el-form-item>
                </td>
              </tr>

            </template>
          </table>

          <!-- 证据信息 -->
          <div class="evidence-information-box mt-10">
            <p class="fl">证据信息</p>
            <div class="fr">
              <el-button @click="handleAddEvidence" size="mini" type="primary">新增证据</el-button>
            </div>
          </div>
          <table
            class="m-primordial-table el-table el-table--fit el-table--border el-table--enable-row-hover"
          >
            <tr>
              <td colspan="1">序号</td>
              <td colspan="1">证据名称</td>
              <td colspan="1">证据来源</td>
              <td colspan="1">格式</td>
              <td colspan="1">页数</td>
              <td colspan="1">证明对象</td>
              <td colspan="1">操作</td>
            </tr>

            <template v-for="(item,index) in ruleForm.evidences" >
              <!-- 循环 证据list -->
              <template v-for="(details,index2) in item.details">
                <tr :key="index + '' + index2">
                  <td v-if="index2 === 0" colspan="1" :rowspan="item.details.length">{{item.sortNum}}</td>
                  <td colspan="1">{{details.eviTitle}}</td>
                  <td colspan="1">{{details.eviSource}}</td>
                  <td colspan="1">
                    {{
                      details.eviFormat === 'PNG' ? '图片':
                      details.eviFormat === 'PDF' ? 'PDF':
                      details.eviFormat === 'DOC' ? '文档': ''
                    }}
                  </td>
                  <td colspan="1">{{details.eviPage}}</td>
                  <td v-if="index2 === 0" colspan="1" :rowspan="item.details.length">{{item.eviObject}}</td>
                  <td colspan="1">
                    <a class="underline" target="_blank" :href="details.eviFileurl">详情</a>
                  </td>
                </tr>
              </template>
            </template>
            <tr v-if="ruleForm.evidences.length === 0">
              <td colspan="7">暂无数据</td>
            </tr>
          </table>

          <el-form-item class="evidences-item" label=" " prop="evidences">
          </el-form-item>
          <div class="mt-20">
            <el-form-item  label=" " prop="file">
              <el-button class="file-inut-box" size="mini" icon='el-icon-upload'>
                上传仲裁申请书
                <input ref="file" @change="applicationForUploadingArbitrationSuccess" class="m-file-input" type="file" />
              </el-button>
              {{ruleForm.fileFileName}}
            </el-form-item>
          </div>
          <div class="mt-20">
            <el-form-item prop="evidenceIndex">
              <el-upload
                class="upload-demo"
                :action="`${$host}/file/upload.htm`"
                :show-file-list="false"
                :before-upload="evidenceCatalogueBefore"
                :on-success="evidenceCatalogueSuccess"
                :on-error="fileError"
                :data="{
                  path : 'hzuser/idcard',
                  token : token,
                }"
              >
                <el-button size="mini" icon='el-icon-upload'>
                  上传证据目录
                </el-button>
                {{ruleForm.evidenceIndexFileName}}
              </el-upload>
            </el-form-item>
          </div>

          <el-form-item class="hidden"  label=" " prop="img01FileName"></el-form-item>
          <el-form-item class="hidden"  label=" " prop="img02FileName"></el-form-item>
          <el-form-item class="hidden"  label=" " prop="fileFileName"></el-form-item>
          <el-form-item class="hidden"  label=" " prop="evidenceIndexFileName"></el-form-item>

        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

    <!-- 新增证据 dialog -->
    <addEvidenceDialog @successCBK="successCBK" ref="addEvidenceDialog"></addEvidenceDialog>
  </div>
</template>

<script>
  import addEvidenceDialog from './addEvidenceDialog.vue'
  import reg from '@/assets/js/regexp'

  export default {
    components : {addEvidenceDialog},
    data() {
      return {
        dialogVisible : false,
        reg : reg,
        // 用户token
        token : JSON.parse(localStorage.getItem('loginInfo')).token,

        ruleForm : {
          // 申请人
          userId : '',
          // 案件标的
          amtBorrow : '',
          // 诉讼请求
          requireItem : '',
          // 事实与理由
          factsReason : '',
          // 案件受理费
          caseAmt : '',
          // 案件仲券
          caseTicket : '',
          // 被申请人性质 0自然人 1企业
          type : 0,
          // 姓名 or 企业名称
          name : '',
          // 民族
          nation : '',
          // 手机号
          phone : '',
          // 电子邮箱
          email : '',
          // 证件类型 	0身份证 3营业执照
          idtype : 0,
          // 身份证号 or 社会唯一信用代码
          idcard : '',
          // 身份证正面照 or 营业执照
          img01 : '',
          // 身份证反面照
          img02 : '',
          // 证件地址 or 注册地址
          idaddress : '',
          // 通讯地址
          address : '',
          // 证据列表
          evidences : [
            /* {
              // 证据名称
              eviTitle : '',
              // 证据来源
              eviSource : '',
              // 形式
              eviFormat : '',
              // 页数
              eviPage : '',
              // 证明对象
              eviObject : '',
              // 证据链接
              eviFileurl : '',
            } */
          ],
          // 仲裁申请书 pdf 格式
          file : '',
          // 证据目录
          evidenceIndex : '',

          // 法定代表人
          legaller : '',
          // 法定代表人职务
          position : '',

          // 身份证正面照 or 营业执照 文件名
          img01FileName : '',
          // 身份证背面照 文件名
          img02FileName : '',
          // 仲裁申请书 文件名
          fileFileName : '',
          // 证据目录 文件名
          evidenceIndexFileName : '',
        },
        rules : {
          // 申请人
          userId : [
            {required : true , message : '请选择申请人' , trigger : 'change'},
          ],
          // 案件标的
          amtBorrow : [
            {required : true , message : '请输入案件标的' , trigger : 'blur'},
          ],
          // 诉讼请求
          requireItem : [
            {required : true , message : '请输入诉讼请求' , trigger : 'blur'},
          ],
          // 事实与理由
          factsReason : [
            {required : true , message : '请输入事实与理由' , trigger : 'blur'},
          ],
          // 案件受理费
          caseAmt : [
            {required : true , message : '请输入案件受理费' , trigger : 'blur'},
          ],
          // 案件仲券
          caseTicket : [
            {required : true , message : '请输入案件仲券' , trigger : 'blur'},
          ],
          // 姓名 or 企业名称
          name : [
            {required : true , message : '请输入' , trigger : 'blur'},
          ],
          // 民族
          nation : [
            {required : true , message : '请输入民族' , trigger : 'blur'},
          ],
          // 手机号
          phone : [
            {required : true , message : '请输入手机号' , trigger : 'blur'},
            {pattern : reg.tel , message : '手机号格式有误' , trigger : 'blur'},
          ],
          // 电子邮箱
          email : [
            {required : true , message : '请输入电子邮箱' , trigger : 'blur'},
            {pattern : reg.email , message : '电子邮箱格式有误' , trigger : 'blur'},
          ],
          // 身份证号 or 社会唯一信用代码
          idcard : [
            {required : true , message : '请输入' , trigger : 'blur'},
          ],
          // 身份证正面照 or 营业执照
          img01 : [
            {required : true , message : '请上传文件' , trigger : 'change'},
          ],
          // 身份证反面照
          img02 : [
            {required : true , message : '请上传文件' , trigger : 'change'},
          ],
          // 证件地址 or 注册地址
          idaddress : [
            {required : true , message : '请输入' , trigger : 'blur'},
          ],
          // 通讯地址
          address : [
            {required : true , message : '请输入通讯地址' , trigger : 'blur'},
          ],
          // 证据列表
          evidences : [
            {type : 'array' , required : true , message : '请添加证据' , trigger : 'blur'},
          ],
          // 仲裁申请书 pdf 格式
          file : [
            {required : true , message : '请上传仲裁申请书' , trigger : 'change'},
          ],
          // 法定代表人
          legaller : [
            {required : true , message : '请输入法定代表人' , trigger : 'blur'},
          ],
          // 法定代表人职务
          position : [
            {required : true , message : '请输入法定代表人职务' , trigger : 'blur'},
          ],
          evidenceIndex : [
            {required : true , message : '请上传证据目录' , trigger : 'change'},
          ],
        },

        // 申请人 options
        userOptions : [
          {name : '张三' , userId : '张三'}
        ],
      }
    },
    mounted() {
      // 获取申请人 列表
      this.$http({
        method : 'post',
        url : '/casemanage/queryUsers.htm',
      }).then((res) => {
        this.userOptions = res.result;
      });
    },
    methods : {
      show(row) {
        this.dialogVisible = true;
        // dialog 返回顶部
        this.$nextTick(() => {
          this.$refs.dialog.$el.scrollTop = 0;
        });
      },
      // 被申请人 change
      handleTypeChange(val) {
        // 重置相关数据
        let arr = [
          'name' , 'nation' , 'phone' , 'email' , 'idcard' , 'img01' , 'img02' , 'idaddress' , 'address' ,
          'legaller' , 'position' , 'img01FileName' , 'img02FileName' ,
        ];
        arr.map((v,k) => {
          this.ruleForm[v] = '';
        });
        // 移除校验
        this.$refs.ruleForm.clearValidate();

        // 设置 证据类型 选中
        if(val === 0){
          this.ruleForm.idtype = 0;
        }else{
          this.ruleForm.idtype = 3;
        }
      },
      // 点击新增证据
      handleAddEvidence() {
        this.$refs.addEvidenceDialog.show();
      },
      // 新增证据 成功回调
      successCBK(row) {
        row.sortNum = this.ruleForm.evidences.length + 1;
        this.ruleForm.evidences.push(row);
        // 重新校验
        this.$refs.ruleForm.validateField('evidences');
      },
      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        this.$nextTick(() => {
          this.$refs.ruleForm.resetFields();
        });
      },
      // 点击提交
      handleSubmit() {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            let formData = new FormData();
            let form = {...this.ruleForm};
            form.evidences = JSON.stringify(form.evidences);
            for(let key in form) {
              formData.append(key,form[key]);
            }
            let loading = this.$loading({
              text : '提交中',
              lock : true,
            });
            this.$http({
              method : 'post',
              url : '/casemanage/saveCase.htm',
              data : formData,
              mheaders : true,
            }).then((res) => {
              loading.close();
              this.$message.success('新增成功');
              this.handleClose();
              this.$emit('upload');
            },(err) => {
              loading.close();
            });
          }
        });
        
      },

      /* 营业执照 上传前 */
      businessLicenseBefore(file) {
        let fileType = file.name.split('.').pop();
        let arr = ['jpg','png','gif','jpeg'];
        if(arr.indexOf(fileType) === -1){
          this.$message.error('文件格式有误');
          return false;
        }
        return true;
      },
      /* 营业执照 上传成功 */
      businessLicenseSuccess(response, file, fileList) {
        this.ruleForm.img01 = response.result; 
        this.ruleForm.img01FileName = file.name;
        /* 重新校验 */
        this.$refs.ruleForm.validateField('img01');
      },
      /* 身份证正面照 上传前 */
      facadeOfIDCardBefore(file) {
        let fileType = file.name.split('.').pop();
        let arr = ['jpg','png','gif','jpeg'];
        if(arr.indexOf(fileType) === -1){
          this.$message.error('文件格式有误');
          return false;
        }
        return true;
      },
      /* 身份证正面照 上传成功 */
      facadeOfIDCardSuccess(response, file, fileList) {
        this.ruleForm.img01 = response.result;
        this.ruleForm.img01FileName = file.name;
        /* 重新校验 */
        this.$refs.ruleForm.validateField('img01');
      },
      /* 身份证背面照 上传前 */
      backsidePhotoOfIDCardBefore(file) {
        let fileType = file.name.split('.').pop();
        let arr = ['jpg','png','gif','jpeg'];
        if(arr.indexOf(fileType) === -1){
          this.$message.error('文件格式有误');
          return false;
        }
        return true;
      },
      /* 身份证背面照 上传成功 */
      backsidePhotoOfIDCardSuccess(response, file, fileList) {
        this.ruleForm.img02 = response.result;
        this.ruleForm.img02FileName = file.name;
        /* 重新校验 */
        this.$refs.ruleForm.validateField('img02');
      },

      /* 上传仲裁申请书 上传成功 */
      applicationForUploadingArbitrationSuccess(event) {
        let file = event.target.files[0];
        event.target.value = '';
        let fileType = file.name.split('.').pop().toLowerCase();
        if(fileType !== 'pdf'){
          this.$message.warning('文件格式必须为PDF格式');
          return;
        }
        this.ruleForm.file = file;
        this.ruleForm.fileFileName = file.name;
        // 重新校验
        this.$refs.ruleForm.validateField('file');
        
      },
      // 证据目录上传前
      evidenceCatalogueBefore(file) {
        let fileType = file.name.split('.').pop();
        let arr = ['jpg','png','gif','jpeg','pdf'];
        if(arr.indexOf(fileType) === -1){
          this.$message.error('文件格式有误');
          return false;
        }
        return true;
      },
      evidenceCatalogueSuccess(response, file, fileList) {
        this.ruleForm.evidenceIndex = response.result;
        this.ruleForm.evidenceIndexFileName = file.name;
        /* 重新校验 */
        this.$refs.ruleForm.validateField('evidenceIndex');
      },
      /* 文件上传失败 回调 */
      fileError() {
        this.$message.error('文件上传失败，请稍后重试');
      },
    },
  }
</script>

<style lang="scss">

.case-management-add-dialog{
  .evidence-information-box{
    padding: 10px;
    background-color: #f6f6f7;
    overflow: hidden;
    border: 1px solid #e5eaee;
    border-bottom: none;
  }
  .el-form-item.is-required .el-form-item__label:before{
    opacity: 0;
  }
  .evidences-item{
    .el-form-item__label{
      display: none;
    }
  }

  /* 上传仲裁申请书 样式 */
  .file-inut-box{
    position: relative;
    overflow: hidden;
    margin-left: -22px;
    .m-file-input{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
}

</style>