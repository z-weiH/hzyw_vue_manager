<template>
  <div class="tpl-term-option-dialog">
    <el-dialog
      :title="type === 'add' ? '添加条件' : '修改条件'"
      :visible.sync="dialogVisible"
      width="580px"
      @close="handleClose"
    >
      <div class="m-conetnt">
        <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px">
          <el-form-item label="互金企业" prop="code">
            <el-select
              style="width:100%"
              v-model="ruleForm.code"
              clearable
              filterable
              remote
              reserve-keyword
              placeholder="请输入关键词进行检索"
              :remote-method="remoteMethod"
              @change="handleMerchantCodeChange"
            >
              <el-option
                v-for="(item,index) in merchantOptions"
                :key="item.code + '' + index "
                :label="item.merchantName"
                :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="模板" prop="productId">
            <el-select
              style="width:100%"
              v-model="ruleForm.productId"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="(item,index) in productOptions"
                :key="item.prodCode + '' + index "
                :label="item.prodName"
                :value="item.prodCode">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="禁用期限" prop="demo">
            <timeFrame
              :startDate.sync="ruleForm.startDate"
              :endDate.sync="ruleForm.endDate"
              startPlaceholder="禁用开始"
              endPlaceholder="禁用结束"
              required="single"
            >

            </timeFrame>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  export default {
    components : {
      timeFrame,
    },
    data() {
      return {
        dialogVisible : false,
        
        ruleForm : {
          // 互金企业 id
          code : '',
          // 开始时间
          startDate : '',
          // 结束时间
          endDate : '',
          // 模板id
          productId : '',
          // demo
          demo : '1',
        },
        rules : {
          code : [
            {required : true , message : '请选择互金企业' , trigger : 'change'},
          ],
          productId : [
            {required : true , message : '请选择模板' , trigger : 'change'},
          ],
          startDate : [
            {required : true , message : '请选择开始时间' , trigger : 'change'},
          ],
          endDate : [
            {required : true , message : '请选择结束时间' , trigger : 'change'},
          ],
          demo : [
            {required : true},
          ],
        },

        // 互金企业 options
        merchantOptions : [
          /* {merchantName : '张三' , code : '张三'} */
        ], 
        // 产品 options
        productOptions : [
          /* {prodName : '产品' , prodCode : '产品'} */
        ],
        type : '',
      }
    },
    mounted() {

    },
    methods : {
      show(type,row) {
        this.dialogVisible = true;
        this.type = type;

        if(type === 'edit'){
          this.conditionId = row.conditionId;

          // 回显数据
          this.$http({
            method : 'post',
            url : '/reason/templateDetails.htm',
            data : {
              conditionId : row.conditionId,
            },
          }).then((res) => {
            this.ruleForm = Object.assign(this.ruleForm,res.result);
            // 设置默认回显的互金企业 以及 模板
            this.merchantOptions = [
              { merchantName : res.result.merchantName , code : res.result.code }
            ];
            this.productOptions = [
              { prodName : res.result.prodName , prodCode : res.result.productId }
            ];
          });
        }
      },

      // 互金企业搜索
      remoteMethod(query) {
        this.$http({
          method : 'post',
          url : '/merchant/queryPreMerchantName.htm',
          data : {
            keyWords : query,
          },
        }).then((res) => {
          this.merchantOptions = res.result;
        });
      },
      // 互金企业change
      handleMerchantCodeChange(val) {
        // 清空 产品options ro 保存的产品 id
        this.productOptions = [];
        this.ruleForm.productId = '';

        if(!val) {
          this.$refs.ruleForm.validateField(`productId`);
          return;
        }

        // 根据互金企业 查询 产品
        this.$http({
          method : 'post',
          url : '/merchant/selectMerchantProductByMerchantCode.htm',
          data : {
            merchantCode : val,
          },
        }).then((res) => {
          this.productOptions = res.result;
        });
      },

      // 关闭浮层
      handleClose() {
        this.dialogVisible = false;
        this.$refs.ruleForm.resetFields();
        // 清空下拉框数据
        this.merchantOptions = [];
        this.productOptions = [];
      },
      // 点击提交
      handleSubmit(submitType) {
        this.$refs.ruleForm.validate((valid) => {
          if(valid) {
            this.$http({
              method : 'post',
              url : '/reason/updateTemplate.htm',
              data : {
                code : this.ruleForm.code,
                conditionId : this.type === 'edit' ? this.conditionId : '',
                endDate : this.ruleForm.endDate,
                startDate : this.ruleForm.startDate,
                productId : this.ruleForm.productId,
              },
            }).then((res) => {
              this.$message.success('操作成功');
              this.handleClose();
              this.$emit('successCBK');
            });
          }
        });
      },
    },
  }
</script>

<style lang="scss">

.tpl-term-option-dialog{
  .time-frame{
    .el-form-item{
      display: inline-block;
    }
    .m-span{
      margin-top: 0;
      margin-left: 5px;
    }
  }
}

</style>