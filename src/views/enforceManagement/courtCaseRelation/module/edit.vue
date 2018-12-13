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
      <el-form-item label="中级法院" prop="courtId">
        <el-select clearable v-model="form.courtId"
                   filterable
                   remote
                   reserve-keyword placeholder="请选择"
                   :remote-method="remoteMethod"
                   :loading="loading"
                   @change="remoteMethod2"
        >
          <el-option
            v-for="item in courtlist"
            :key="item.courtId"
            :label="item.courtName"
            :value="item.courtId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="基层法院" prop="basicCourtId">
        <el-select clearable v-model="form.basicCourtId"
        >
          <el-option
            v-for="item in basicCourtlist"
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
        basicCourtId: ''
      },
      courtlist: [],
      rules: {
        courtId: [
          { required: true, message: '请选择要关联的法院', trigger: 'blur' },
        ]},
      loading: false,
      basicCourtlist: []

    }
  },
  watch:{

    'show'(val,oldval){
      if(!val){
        this.$refs.form.resetFields();
        this.form = {
          localtionLabel: '',
          caseNo: '',
          courtId: '',
          basicCourtId: ''
        }
      }
    }
  },
  methods:{

    remoteMethod2(val){
      this.getlocaltionLabel();
      this.$set( this.form, 'basicCourtId','' );
      if(val){
        this.remoteMethod1(val);
      }
    },

    remoteMethod1(parentId,init){
      this.$http.post('/court/queryCourtInfosByBasicQuery.htm',{parentId: parentId}).then(res => {
        console.log(res);
        this.basicCourtlist = res.result;
        if(init){
          this.$nextTick(() => {
            let item = this.basicCourtlist.find(it => it.courtName === this.form.basicCourtName);
            if(item){
              // this.form.basicCourtId = item.courtId;
              this.$set( this.form, 'basicCourtId',item.courtId );
              console.log(item);

            }
          })
        }
      })
    },

    remoteMethod(keyWords,init){
      console.log(keyWords)
      if(keyWords){
        this.loading = true;
        this.$http.post('/court/queryCourtInfosByBasicQuery.htm',{keyWords: keyWords,courtType: 2}).then(res => {
          this.courtlist = res.result;

          this.$nextTick(() => {
            this.loading = false;
            if(init){
              this.show = true;

              this.form = {...this.row};
              if(this.courtlist.length === 1){
                this.$set( this.form, 'courtId',this.courtlist[0].courtId );
                this.getlocaltionLabel();
                this.remoteMethod1(this.form.courtId,true);

              }
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
        this.form.localtionLabel = this.currentCourt.province + '-' + this.currentCourt.city ;
      }
    },
    save(){
      this.$refs.form.validate((valid) => {
        if(valid){
          console.log(this.form)
          let basicCourtName;
          if(this.form.basicCourtId){
            let item = this.basicCourtlist.find(it => it.courtId === this.form.basicCourtId);
            if(item){
              basicCourtName= item.courtName;
            }
          }
          this.$http.post("/court/updateCaseRelativeCourtInfo.htm",{
            partyId: this.form.partyId,
            caseId: this.form.caseId,
            province: this.currentCourt.province,
            city: this.currentCourt.city,
            courtId: this.form.courtId,
            courtName: this.currentCourt.courtName,
            basicCourtId: this.form.basicCourtId,
            basicCourtName: basicCourtName
          }).then(res => {
            this.$message.success("关联法院修改成功");
            // this.$parent.doQuery();

            //刷新表格中的记录项
            this.$parent.doQuery();
            // Object.assign(this.row,{courtId: this.form.courtId,province: this.currentCourt.province, city: this.currentCourt.city,courtName: this.currentCourt.courtName});
            // let idx = this.$parent.tableData.findIndex(it => it.courtId === this.row.courtId);
            // if(idx !== -1){
            //   this.$parent.tableData.splice(idx,1,this.row);
            //
            // }
            // console.log(this.row);
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
