<template>
  <div class="case-upload-view">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <router-link to="/main/caseUploadRecord">案件上传记录</router-link>
      <a class="aside_tit">案件上传</a>
    </div>

    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="searchForm">
        <el-form-item label="互金企业：" prop="clientCode" label-width="90px">
          <el-select ref="client" @change="handleClientChange" clearable v-model="searchForm.clientCode" placeholder="请选择" style="width:197px;" filterable>
            <el-option :label="item.merchantName" :value="item.code" v-for="(item , index) in clientOptions" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品名称：" prop="productCode" label-width="90px">
          <el-select ref="product" @change="handleProductChange" clearable v-model="searchForm.productCode" placeholder="请选择" style="width:197px;" filterable>
            <el-option :label="item.prodName" :value="item.prodCode" v-for="(item , index) in productOptions" :key="index"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="模板编码：" prop="templateId" label-width="90px">
          <el-select clearable v-model="searchForm.templateId" placeholder="请选择" style="width:197px;" filterable>
            <el-option :label="item" :value="item" v-for="(item , index) in templateOptions" :key="index"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">案件上传操作</span>
    </div>

    <div class="item-table num-detection-cont">
      <div class="upload-wrap">
        <el-upload
          class="upload-box"
          :action="`${$host}/caseupload/caseUpload.htm`"
          :show-file-list="false"
          accept=".zip"
          :disabled="(searchForm.clientCode && searchForm.productCode && searchForm.templateId) ? false : true"
          :http-request="handleUpload"
        >
          <el-button type="primary" :disabled="(searchForm.clientCode && searchForm.productCode && searchForm.templateId) ? false : true">
            <i class="el-icon-upload el-icon--left"></i>批量上传案件
          </el-button>
        </el-upload>
        <p class="mt-20 color-666">请上传符合规范格式的模板文件，支持文件格式.zip</p>
      </div>
    </div>

    <progressDialog :width="speed" ref="progressDialog">
      <div>正在上传中({{speed}}%)<span class="loading"></span></div>
    </progressDialog>
  </div>
</template>

<script>
  import progressDialog from '@/components/progressDialog.vue'
  export default {
    components : {
      progressDialog,
    },
    data() {
      return {
        searchForm : {
          // 	客户号
          clientCode : '',
          // 	客户名称
          clientName : '',
          // 	文件
          file : '',
          // 	产品编码
          productCode : '',
          // 	产品名称
          productName : '',
          // 	模板号
          templateId : '',

          token : (() => {
            try {
              return JSON.parse(localStorage.getItem('loginInfo')).token;
            }catch(err) {
              return '';
            }
          })(),
        },

        // 客户options
        clientOptions : [],
        // 产品options
        productOptions : [],
        // 模板options
        templateOptions : [],
        
        // 进度
        speed : 0,
      }
    },
    mounted() {
      this.queryClientOptions();
    },
    methods : {
      // 获取客户 options
      queryClientOptions() {
        this.$http({
          url : '/merchant/queryMerchants.htm',
          method : 'post',
        }).then(res => {
          this.clientOptions = res.result.list;
        });
      },
      // 获取产品 options
      queryProductOptions() {
        this.$http({
          url : '/case/queryProducts.htm',
          method : 'post',
          data : {
            merchantCode : this.searchForm.clientCode,
          },
        }).then(res => {
          this.productOptions = res.result;
        });
      },
      // 获取模板 options
      queryTemplateOptions() {
        this.$http({
          url : '/case/queryTemplatesByProductCode.htm',
          method : 'post',
          data : {
            merchantCode : this.searchForm.clientCode,
            prodCode : this.searchForm.productCode,
          },
        }).then(res => {
          this.templateOptions = res.result;
        });
      },

      handleClientChange(val) {
        if(val) {
          this.queryProductOptions();
        }else{
          this.productOptions = [];
          this.templateOptions = [];
          this.searchForm.productCode = '';
          this.searchForm.templateId = '';
        }
      },
      handleProductChange(val) {
        if(val) {
          this.queryTemplateOptions();
        }else{
          this.templateOptions = [];
          this.searchForm.templateId = '';
        }
      },

      handleUpload(data) {
        let file = data.file;
        this.searchForm.clientName = this.$refs.client.$el.querySelector('input').value;
        this.searchForm.productName = this.$refs.product.$el.querySelector('input').value;
        this.searchForm.file = file;

        let formData = new FormData();
        for(let key in this.searchForm) {
          formData.append(key,this.searchForm[key]);
        }
        // 打开进度条
        this.speed = 0;
        this.$refs.progressDialog.show();
        // 文件上传
        this.$http({
          url : '/caseupload/upload.htm',
          method : 'post',
          data : formData,
          mheaders : true,
        }).then(res => {
          let timer;
          // 进度条 请求
          let fn = () => {
            this.$http({
              url : '/caseupload/queryUploadSpeed.htm',
              method : 'post',
              data : {
                recordId : res.result,
              },
            }).then(res => {
              let {speed , status} = res.result;
              // 上传完成
              if(status === 1) {
                this.$message.success('批量上传案件成功');
                window.clearInterval(timer);
                this.$refs.progressDialog.hide();
              }else{
                this.speed = speed;
              }
            }).catch(() => {
              window.clearInterval(timer);
              this.$refs.progressDialog.hide();
            });
          }
          fn();
          timer = window.setInterval(fn,1000);
        }).catch(() => {
          this.$refs.progressDialog.hide();
        });
      },
    },
  }
</script>

<style lang="scss">

.case-upload-view{
  .el-form-item{
    margin-bottom: 0;
  }
  .num-detection-cont{
    height: 300px;
  }
  .upload-wrap{
    text-align: center;
    padding-top: 100px;
  }

  .loading {
    min-width: 2px;
    min-height: 2px;
    display: inline-block;
    box-shadow: 2px 0 currentColor, 6px 0 currentColor, 10px 0 currentColor;
    animation: dot 2.4s infinite steps(1, start);
  }
  @keyframes dot {
    25% {
      box-shadow: none;
    }
    50% {
      box-shadow: 2px 0 currentColor;
    }
    75% {
      box-shadow: 2px 0 currentColor, 6px 0 currentColor;
    }
  }
}

</style>