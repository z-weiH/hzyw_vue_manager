<template>
  <el-dialog
    :visible.sync="flag"
    v-dialogDrag
    :title="title"
    width="540px"
    center>

    <el-form ref="form" :rules="rules" :model="item" label-width="80px">
      <el-form-item label="渠道类型" prop="channelType" v-if="title === '添加渠道'">
        <el-radio-group v-model="item.channelType">
          <!--1：自营渠道：2：律所代理：3：公司代理-->
          <el-radio :label="1">自营渠道</el-radio>
          <el-radio :label="2">律所代理</el-radio>
          <el-radio :label="3">公司代理</el-radio>
          <el-radio :label="4">个人代理</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-else label="渠道类型" prop="channelTypeCN">
        <el-input disabled v-model="item.channelTypeCN"></el-input>
      </el-form-item>

      <el-form-item label="渠道名称" prop="channelName">
        <el-input v-model="item.channelName"></el-input>
      </el-form-item>
      <el-form-item label="联 系 人" prop="channelLinkman">
        <el-input v-model="item.channelLinkman"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="channelPhone">
        <el-input v-model="item.channelPhone"></el-input>
      </el-form-item>
      <el-form-item label="详细地址" prop="channelAddress">
        <el-input v-model="item.channelAddress"></el-input>
      </el-form-item>


      <template v-if="item.channelType === 1">
        <el-form-item label="签约人"  prop="signEmp">
          <el-input v-model="item.signEmp"></el-input>
        </el-form-item>
        <el-form-item label="合同编号"  prop="contractNo">
          <el-input v-model="item.contractNo"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"  prop="email">
          <el-input v-model="item.email"></el-input>
        </el-form-item>
        <el-form-item label="合作区域"  prop="area">
          <el-input v-model="item.area"></el-input>
        </el-form-item>
        <el-form-item label="生命周期"  prop="lifeCyclic">
          <el-input v-model="item.lifeCyclic"></el-input>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="签约人" :rules="[{required : true , message : '请输入签约人' , trigger : 'blur'}]" prop="signEmp">
          <el-input v-model="item.signEmp"></el-input>
        </el-form-item>
        <el-form-item label="合同编号" :rules="[{required : true , message : '请输入合同编号' , trigger : 'blur'}]" prop="contractNo">
          <el-input v-model="item.contractNo"></el-input>
        </el-form-item>
        <el-form-item label="邮箱"  prop="email" :rules="[{required : true , message : '请输入邮箱' , trigger : 'blur'}]">
          <el-input v-model="item.email"></el-input>
        </el-form-item>
        <el-form-item label="合作区域" :rules="[{required : true , message : '请输入合作区域' , trigger : 'blur'}]" prop="area">
          <el-input v-model="item.area"></el-input>
        </el-form-item>
        <el-form-item label="生命周期" :rules="[{required : true , message : '请输入生命周期' , trigger : 'blur'}]" prop="lifeCyclic">
          <el-input v-model="item.lifeCyclic"></el-input>
        </el-form-item>
      </template>


      <el-form-item label="备注" prop="remark">
        <el-input type="textarea" v-model="item.remark"></el-input>
      </el-form-item>


    </el-form>


    <span slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="save">确 定</el-button>
          <el-button @click="flag = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'channelEdit',
    data(){
      return {
        flag: false,
        title: '',
        item: {
          channelType: ''
        },
        rules : {
          channelType : [
            { required : true , message : '请选择渠道类型' , trigger : 'blur'},
          ],
          channelName : [
            { required : true , message : '请输入渠道名称' , trigger : 'blur'},
          ],
        },
      }
    },
    watch:{
      'flag'(val,oldval){
        if(!val){
          this.$refs.form.resetFields();
        }
      },
      'item.channelType'(val,oldval){
        // this.item.channelType = val;
        this.$nextTick(() => {
          this.$refs.form.clearValidate();
        })

      }
    },
    methods:{
      show(channelId){
        if(channelId){
          this.$http.post('/channel/queryCourtMandatoryChannelInfoDetails.htm',{channelId: channelId}).then(res => {
            this.item= {...res.result,channelId: channelId};
            // <!--1：自营渠道：2：律所代理：3：公司代理-->

            this.item.channelTypeCN = this.item.channelType === 1 ? '自营渠道' : this.item.channelType === 2 ? '律所代理' : this.item.channelType === 3 ?  '公司代理' : this.item.channelType === 4 ? '个人代理' : '-';
            this.title = '修改渠道';
            this.flag =true;
          })
        }else{
          this.item = {channelType: 1};
          this.title = '添加渠道';
          this.flag = true;
        }
      },
      save(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$http.post('/channel/saveOrUpdateCourtMandatoryChannelInfo.htm',this.item).then(res => {
              this.$message.success(this.item.channelId ? '修改成功' : '添加成功');
              this.flag = false;
              this.$parent.doQuery();
            })
          }
        });
      }
    }
  }
</script>

<style scoped>

</style>
