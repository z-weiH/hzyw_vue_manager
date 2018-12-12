<template>
  <el-dialog
    :visible.sync="show"
    v-dialogDrag
    title="更改关联法院"

    width="405px"
    center>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="案号" prop="caseNo">
        <el-input v-model="form.caseNo" disabled></el-input>
      </el-form-item>
      <el-form-item label="法院选择" prop="courtId">
        <el-select clearable v-model="form.courtId"
                   filterable
                   remote
                   reserve-keyword placeholder="请选择"
                   :remote-method="remoteMethod"
                   :loading="loading"
        >
          <el-option
            v-for="item in courtlist"
            :key="item.courtId"
            :label="item.courtName"
            :value="item.courtId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在地区" prop="localtionLabel">
        <el-input v-model="form.localtionLabel" disabled></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="save">确 定</el-button>
          <el-button @click="show = false;">取 消</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    name: 'edit',
    data() {
      return {
        row:{},
        currentCourt: {},
        show: false,
        form: {
          localtionLabel: '',
          caseNo: '',
          courtId: '',
        },
        courtlist: [],
        rules: {
          courtId: [
            { required: true, message: '请选择要关联的法院', trigger: 'blur' },
          ]},
        loading: false

      }
    },
    watch:{
      'form.courtId'(val,oldval){
        this.getlocaltionLabel();
      },
      'show'(val,oldval){
        if(!val){
          this.$refs.form.resetFields();
          this.form = {
            localtionLabel: '',
            caseNo: '',
            courtId: ''
          }
        }
      }
    },
    methods:{

      remoteMethod(keyWords,init){
        console.log(keyWords)
        if(keyWords){
          this.loading = true;
          this.$http.post('/court/queryCourtInfosByBasicQuery.htm',{keyWords: keyWords}).then(res => {
            this.courtlist = res.result;
            this.$nextTick(() => {
              this.loading = false;
              if(init){
                this.form = {...this.row};
                this.show = true;
              }
            })
          })
        }else{
          this.loading = false;
          if(init){
            this.courtlist = [];
            this.form = {...this.row};
            this.show = true;
          }
        }

      },

      init(row){
        this.row = row;

        this.remoteMethod(row.courtName,true);

      },

      getlocaltionLabel(){
        this.currentCourt = this.courtlist.find(it => it.courtId === this.form.courtId);
        if(this.currentCourt){
          this.form.localtionLabel = this.currentCourt.province + '-' + this.currentCourt.city + '-' + this.currentCourt.district;
        }
      },
      save(){
        this.$refs.form.validate((valid) => {
          if(valid){
            this.$http.post("/court/updateCaseRelativeCourtInfo.htm",{caseId: this.form.caseId,courtId: this.form.courtId, respondents: this.form.respondents}).then(res => {
              this.$message.success("关联法院修改成功");
              // this.$parent.doQuery();

              //刷新表格中的记录项
              Object.assign(this.row,{courtId: this.form.courtId,province: this.currentCourt.province, city: this.currentCourt.city, district: this.currentCourt.district,courtName: this.currentCourt.courtName});
              let idx = this.$parent.tableData.findIndex(it => it.courtId === this.row.courtId);
              if(idx !== -1){
                this.$parent.tableData.splice(idx,1,this.row);

              }
              console.log(this.row);
              this.show = false;
            })
          }
        })

      }
    },
    created(){
      // this.$http.post("/court/queryCourtlist.htm").then(res => {
      //   console.log(res);
      //   this.courtlist = res.result.list;
      // })
    }
  }
</script>

<style scoped>

</style>
