<template>
  <el-dialog
    :visible.sync="flag"
    v-dialogDrag
    :title="title"
    width="495px"
    center>

    <el-form ref="form" :rules="rules" :model="item" label-width="80px">
      <el-form-item label="类型" prop="channelType">
        <el-radio-group v-model="item.channelType" :disabled="item.mandatoryId">
          <!--1：自营渠道：2：律所代理：3：线下代理-->
          <el-radio :label="1">内部员工</el-radio>
          <el-radio :label="2">律所代理</el-radio>
          <el-radio :label="3">线下代理</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="item.channelType != 2">
        <el-form-item label="受委托人" prop="mandatoryName">
          <el-input v-model="item.mandatoryName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="item.gender">
            <el-option label="女" :value="0"></el-option>
            <el-option label="男" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份证号" prop="identityCard">
          <el-input v-model="item.identityCard"></el-input>
        </el-form-item>
        <el-form-item label="工作单位" prop="channelId">
          <!--<el-input v-model="item.channelName"></el-input>-->
          <el-select v-model="item.channelId">
            <el-option
              v-for="item in channerList"
              :key="item.channelId"
              :label="item.channelName"
              :value="item.channelId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="职务" prop="jobPosition">
          <el-input v-model="item.jobPosition"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="item.phone"></el-input>
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="律所名称" prop="channelId">
          <!--<el-input v-model="item.channelName"></el-input>-->
          <el-select v-model="item.channelId">
            <el-option
              v-for="item in channerList"
              :key="item.channelId"
              :label="item.channelName"
              :value="item.channelId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="受委托人" prop="mandatoryName">
          <el-input v-model="item.mandatoryName"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="item.gender">
            <el-option label="女" :value="0"></el-option>
            <el-option label="男" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="item.phone"></el-input>
        </el-form-item>
      </template>


    </el-form>


    <span slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="save">确 定</el-button>
          <el-button @click="flag = false">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'ClientEdit',
    data(){
      return {
        flag: false,
        title: '',
        item: {},
        rules : {
          mandatoryName: [
            { required : true , message : '请输入受委托人姓名' , trigger : 'blur'},
          ],
          channelType : [
            { required : true , message : '请选择类型' , trigger : 'blur'},
          ],
          channelId : [
            { required : true , message : '请选择' , trigger : 'blur'},
          ],
        },
        channerList: []
      }
    },
    watch:{
      'flag'(val,oldval){
        if(!val){
          this.$refs.form.resetFields();
        }
      },
      'item.channelType'(val,oldval){
        this.item.channelId = '';
        this.$http.post("/channel/queryChannelByList.htm",{channelType: val}).then(res => {
          this.channerList = res.result;
        })
      }
    },
    methods:{
      show(mandatoryId){
        console.log(mandatoryId)
        if(mandatoryId){
          this.$http.post('/mandatory/queryCourtmandatorInfoDetails.htm',{mandatoryId: mandatoryId}).then(res => {
            this.item= res.result;
            this.title = '修改受委托人';
            this.flag =true;
          })
        }else{
          this.item = {channelType: 1,channelId: ''};
          this.title = '添加受委托人';
          this.flag = true;
        }
      },
      save(){
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.$http.post('/mandatory/insertOrUpdateCourtMandatoryInfo.htm',this.item).then(res => {
              this.$message.success(this.item.mandatoryId ? '修改成功' : '添加成功');
              this.flag = false;
              this.$parent.doQuery();
            })
          }
        });
      },

    }
  }
</script>

<style scoped>

</style>
