<template>
  <div class="tpl-setting-set-dialog">
    <el-dialog
      title="客户信息修改"
      :visible.sync="dialogVisible"
      width="880px"
      @close="handleClose"
    >
      <div class="m-content">
        <table
          class="m-primordial-table 
            el-table el-table--fit el-table--border 
            el-table--enable-row-hover"
        >
          <tbody>
            <tr>
              <td colspan="4">
                <div
                  :style="{
                    textAlign : 'left',
                    paddingLeft : '10px',
                  }"
                >
                  客户基本信息
                </div>
              </td>
            </tr>

            <tr>
              <td>企业名称：</td>
              <td>{{custInfo.merchantName}}</td>
              <td>法定代表人：</td>
              <td>{{custInfo.legalPerson}}</td>
            </tr>

            <tr>
              <td>社会唯一信用号：</td>
              <td>{{custInfo.merchantCode}}</td>
              <td>帐户：</td>
              <td>{{custInfo.accountNo}}</td>
            </tr>
          </tbody>
        </table>

        <!-- 循环 产品 list -->
        <template v-for="(item,index) in productList">
          <table
            :key="item.id"
            class="m-primordial-table 
              el-table el-table--fit el-table--border 
              el-table--enable-row-hover mt-20"
          >
            <tr>
              <td colspan="1">产品名称</td>
              <td colspan="1">内容</td>
              <td colspan="1">操作</td>
              <td colspan="1">内容</td>
              <td colspan="1">操作</td>
            </tr>

            <tr>
              <td rowspan="4">{{item.productName}}</td>
            </tr>

            <tr>
              <td>仲裁申请书模板</td>
              <td>
                <el-button @click="handleSet(1,index)" type="text">设置</el-button>
              </td>
              <td>裁决书模板</td>
              <td>
                <el-button @click="handleSet(2,index)" type="text">设置</el-button>
              </td>
            </tr>

            <tr>
              <td>请求事项模板</td>
              <td>
                <el-button @click="handleSet(3,index)" type="text">设置</el-button>
              </td>
              <td>事实与理由模板</td>
              <td>
                <el-button @click="handleSet(4,index)" type="text">设置</el-button>
              </td>
            </tr>

            <tr>
              <td>强制执行模版</td>
              <td>
                <el-button @click="handleSet(5,index)" type="text">设置</el-button>
              </td>
            </tr>

            <tr>
              <td colspan="5">
                <el-button @click="handleEnable(index)" type="success">
                  {{item.status === 1 ? '启用' : '停用'}}
                </el-button>
              </td>
            </tr>
          </table>
        </template>
        
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleNewProduct">添加新产品</el-button>
      </span>
    </el-dialog>

    <!-- 设置模板 dialog -->
    <templateSettingDialog @successCBK="templateSuccessCBK" ref="templateSettingDialog"></templateSettingDialog>
    <!-- 添加新产品 dialog -->
    <addProduct @successCBK="addProductSuccessCBK" ref="addProduct"></addProduct>
  </div>
</template>

<script>
  import templateSettingDialog from './templateSettingDialog.vue'
  import addProduct from './addProduct.vue'
  export default {
    components : {
      templateSettingDialog,
      addProduct,
    },
    data() {
      return {
        dialogVisible : false,
        // 客户基本信息
        custInfo : {
          // 企业名称
          merchantName : '',
          // 法定代表人
          legalPerson : '',
          // 社会唯一信用号
          merchantCode : '',
          // 帐户
          accountNo : '',
        },
        // 产品 list
        productList : [{productName : '产品1'},{productName : '产品2'}],
      }
    },
    methods : {
      show(row) {
        console.log(row);
        this.templateId = row.templateId;
        this.dialogVisible = true;
        this.init();
      },
      // 初始化 数据
      init() {
        this.$http({
          method : 'post',
          url : '/tplsetting/modifyTemplate.htm',
          data : {
            template_id : this.templateId,
          },
        }).then((res) => {
          // 客户基本信息
          this.custInfo = res.result.data.custInfo;
          // 产品 list
          this.productList = res.result.data.list;
        });
      },
      // 关闭浮层
      handleClose() {},
      // 点击启用 or 禁用
      handleEnable(index) {
        this.$http({
          method : 'post',
          url : '/tplsetting/changeTemplateStatus.htm',
          data : {
            productId : this.productList[index].productId,
            status : this.productList[index].status === 1 ? 2 : 1,
            templateId : this.templateId,
          },
        }).then((res) => {
          this.$message.success('设置成功');
          this.init();
        });
      },
      // 点击设置
      handleSet(templateType,index) {
        let title = '';
        if(templateType === 1){
          title = '仲裁申请书模板';
        }else if(templateType === 2) {
          title = '裁决书模板';
        }else if(templateType === 3) {
          title = '请求事项模板';
        }else if(templateType === 4) {
          title = '事实与理由模板';
        }else if(templateType === 5) {
          title = '强制执行模版';
        }
        let data = {
          title : title,
          productId : this.productList[index].productId,
          templateType : templateType,
          templateId : this.templateId,
        };
        this.$refs.templateSettingDialog.show(data);
      },
      // 模板提交成功 回调
      templateSuccessCBK() {
        
      },
      // 点击 添加新产品
      handleNewProduct() {
        this.$refs.addProduct.show({
          merchantCode : this.custInfo.merchantCode,
          templateId : this.templateId,
        });
      },
      // 添加新产品成功 回调
      addProductSuccessCBK() {
        this.init();
      },
    },
  }
</script>

<style lang="scss" scoped>

.tpl-setting-set-dialog{
  .m-content{

  }
}

</style>