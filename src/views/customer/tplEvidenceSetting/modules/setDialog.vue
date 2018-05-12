<template>
  <div class="tpl-evidence-setting-set-dialog">
    <el-dialog
      title="产品证据模板设置"
      :visible.sync="dialogVisible"
      width="860px"
      @close="handleClose"
    >
      <div class="m-content">
        <el-form ref="ruleForm" :model="ruleForm">
          <el-table
            :data="ruleForm.tableData"
            border
          >
            <el-table-column label="序号" width="50px">
              <template slot-scope="scope">
                {{scope.$index + 1}}
              </template>
            </el-table-column>
            <el-table-column label="证据序号">
              <template slot-scope="scope">
                <el-form-item label=" " 
                  :prop="`tableData[${scope.$index}].sortNo`"
                  :rules="[
                    {required : true , message : '请输入证据序号' , trigger : 'blur'}
                  ]"
                >
                  <el-input v-model.trim="scope.row.sortNo" placeholder="请输入证据序号"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="证明对象">
              <template slot-scope="scope">
                <el-form-item label=" " 
                  :prop="`tableData[${scope.$index}].eviObject`"
                  :rules="[
                    {required : true , message : '请输入证明对象' , trigger : 'blur'}
                  ]"
                >
                  <el-input v-model.trim="scope.row.eviObject" placeholder="请输入证据序号"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="证明对象详情">
              <template slot-scope="scope">
                <el-form-item label=" " 
                  :prop="`tableData[${scope.$index}].eviList`"
                  :rules="[
                    {required : true , message : '请输入证明对象详情' , trigger : 'blur'}
                  ]"
                >
                  <el-input v-model.trim="scope.row.eviList" placeholder="请输入证明对象详情"></el-input>
                </el-form-item>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="handleEdit(scope.row,scope.$index)" type="text">修改</el-button>
                <el-button @click="handleDelete(scope.row)" type="text">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        dialogVisible : false,
        
        ruleForm : {
          tableData : [{
            // 证据序号
            sortNo : '',
            // 证明对象
            eviObject : '',
            // 证明对象详情
            eviList : '',
          }],
        },
      }
    },
    methods : {
      show() {
        this.dialogVisible = true;
      },
      // 关闭浮层 调用
      handleClose() {
        this.dialogVisible = false;
        this.$nextTick(() => {
          this.$refs.ruleForm.resetFields();
        });
      },
      // 点击修改
      handleEdit(row,index) {
        // 校验 数据
        let verifyArr = [
          `tableData[${index}].sortNo`,
          `tableData[${index}].eviObject`,
          `tableData[${index}].eviList`,
        ];
        let verifySuccessLength = 0;
        verifyArr.map((v,k) => {
          this.$refs.ruleForm.validateField(v,(valid) => {
            if(!valid){
              verifySuccessLength ++;
            }
          });
        });
        // 如果全部 校验通过
        if(verifySuccessLength === 3){
          this.$http({
            method : '',
            url : '',
          }).then((res) => {
            console.log(res,'修改 接口');
          });
        }
      },
      // 点击删除
      handleDelete(row) {
        console.log(row,'删除');
        this.$confirm('确认删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message.success('删除成功');
        })
      },
    },
  }
</script>

<style lang="scss">

.tpl-evidence-setting-set-dialog{
  .el-form-item__label:before{
    display: none;
  }
  .el-form-item{
    padding: 20px 0;
  }
  .el-table td{
    padding: 0;
  }
}

</style>