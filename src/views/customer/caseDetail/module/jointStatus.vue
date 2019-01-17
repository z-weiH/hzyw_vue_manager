<template>
    <div class="jointStatus">
      <el-dialog
        :title="title"
        :visible.sync="innerVisible"
        append-to-body width="550px">

        <p class="warning" v-if="type === 0">即将对当前模板进行联调不通过操作，请填写原因（必填）。</p>
        <p class="warning" v-if="type === 1">即将对当前模板进行联调通过操作，请填写备注（如有）。</p>
        <p class="warning" v-if="type === 2">即将对当前模板进行完成联调操作，请填写备注（如有）。</p>


          <el-input type="textarea"  v-model.trim="remark" placeholder="请输入"></el-input>


        <div slot="footer" class="dialog-footer">
          <customer-button type="primary" @click="handleStatusChange">确 定</customer-button>
          <customer-button @click="innerVisible = false;">取 消</customer-button>

        </div>

      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: 'jointStatus',
        data(){
          return {
            remark: '',
            title: '',
            innerVisible: false,
            type: 0,  //0 不通过 1 通过 2 完成
            prodTempId: '',
            rules : {

            },

          }
        },

        methods: {
          show(type,prodTempId){
            this.type =type;
            this.innerVisible = true;
            this.prodTempId = prodTempId;
            this.rules = {};
            if(type === 0){
              this.title = '联调不通过';

            }else if(type === 1){
              this.title = "联调通过";
            }else {
              this.title = "联调完成";
            }
          },
          handleStatusChange(){
            if(this.type === 0 && !this.remark){
              return this.$message.error('请输入内容');
            }
                if(this.type === 2){
                  this.$http.post("/productTemplate/finishDebugByProdTempId.htm",{prodTempId: this.prodTempId,remark: this.remark}).then(res => {
                    this.innerVisible = false;
                    this.$emit("close",2)
                  })
                }else {
                  this.$http.post("/productTemplate/passOrNotTemplateInterface.htm",{passStatus: this.type,prodTempId: this.prodTempId,remark: this.remark}).then(res => {
                    this.innerVisible = false;
                    this.$emit("close", this.type);
                  })
                }
              }

        },
    }
</script>

<style lang="scss">
  .jointStatus{
    .warning{
      margin-bottom: 20px;
    }
    .el-dialog__body{
      padding-bottom: 5px;
    }
  }
</style>
