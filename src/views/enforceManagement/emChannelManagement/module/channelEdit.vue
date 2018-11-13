<template>
  <el-dialog
    :visible.sync="flag"
    v-dialogDrag
    :title="title"
    width="495px"
    center>

    <el-form ref="form" :rules="rules" :model="item" label-width="80px">
      <el-form-item label="渠道类型" prop="channelType" v-if="title === '添加渠道'">
        <el-radio-group v-model="item.channelType">
          <!--1：自营渠道：2：律所代理：3：线下代理-->
          <el-radio :label="1">自营渠道</el-radio>
          <el-radio :label="2">律所代理</el-radio>
          <el-radio :label="3">线下代理</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-else label="渠道类型" prop="channelName">
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
        item: {},
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
      }
    },
    methods:{
      show(channelId){
        if(channelId){
          this.$http.post('/channel/queryCourtMandatoryChannelInfoDetails.htm',{channelId: channelId}).then(res => {
            this.item= {...res.result,channelId: channelId};
            // <!--1：自营渠道：2：律所代理：3：线下代理-->

            this.item.channelTypeCN = this.item.channelType === 1 ? '自营渠道' : this.item.channelType === 2 ? '律所代理' : '线下代理';
            this.title = '修改渠道';
            this.flag =true;
          })
        }else{
          this.item = {};
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
