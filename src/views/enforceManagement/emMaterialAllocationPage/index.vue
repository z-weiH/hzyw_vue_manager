<template>
  <div>
    <div class="item-title">
      <el-button style="margin-top: -14px;" class="fr" @click="goBack">返回<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      法院材料配置:
      <span style="font-size: 16px; color: #333;">{{$route.query.courtName}}</span>
    </div>
    <div class="content">
      <div class="swtr li">
        <div class="title">
          <el-button style="margin-top: 10px;color: #0F357F;" class="fr" @click="addswtr">添加</el-button>
          1.受委托人
        </div>
        <div class="table">
          <el-table
            :data="swtrList"
            :header-cell-style="getRowStyle"
            border
            style="width: 100%;">
            <el-table-column
              type="index"
              width="50"
              label="序号"
            >
            </el-table-column>

            <el-table-column
              prop="mandatoryName"
              label="受委托人姓名"
              >
              <template slot-scope="scope">
                <span v-ellipsis.20>{{scope.row.mandatoryName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="identityCard"
              label="身份证号"
              >
              <template slot-scope="scope">
                <span v-ellipsis.20>{{scope.row.identityCard}}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="channelName"
              label="工作单位"
              >
              <template slot-scope="scope">
                {{scope.row.channelName}}
              </template>
            </el-table-column>
            <el-table-column
              prop="jobPosition"
              label="职务"
              >
              <template slot-scope="scope">
                {{scope.row.jobPosition}}
              </template>
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系电话"
              >
              <template slot-scope="scope">
                {{scope.row.phone}}
              </template>
            </el-table-column>
            <el-table-column
              prop="courtSettingStatus"
              label="操作"
              >
              <template slot-scope="scope">
                <el-button type="text" @click="delswtr(scope.row,scope.$index)" size="small">刪除</el-button>
              </template>
            </el-table-column>



          </el-table>
        </div>
      </div>
      <div class="yhzh li">
        <div class="title">
          <el-button style="margin-top: 10px;color: #0F357F;" class="fr" @click="addyhzh" :disabled="yhzhList.length === 1">添加</el-button>
          2.申请执行人银行账户
        </div>
        <div class="table">
          <el-table
            :data="yhzhList"
            :header-cell-style="getRowStyle"
            border
            style="width: 100%;">
            <el-table-column
              type="index"
              width="50"
              label="序号"
            >
            </el-table-column>

            <el-table-column
              prop="accountName"
              label="户名"
              >
              <template slot-scope="scope">
                <span v-ellipsis.20>{{scope.row.accountName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="depositBank"
              label="开户银行"
              >
              <template slot-scope="scope">
                <span v-ellipsis.20>{{scope.row.depositBank}}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="accountNumber"
              label="账号"
              >
              <template slot-scope="scope">
                {{scope.row.accountNumber}}
              </template>
            </el-table-column>
            <el-table-column
              prop="branchName"
              label="支行名称"
              >
              <template slot-scope="scope">
                {{scope.row.branchName}}
              </template>
            </el-table-column>
            <el-table-column
              prop="subbranch"
              label="联行号"
             >
              <template slot-scope="scope">
                {{scope.row.subbranch}}
              </template>
            </el-table-column>
            <el-table-column
              prop="bankAddress"
              label="银行地址"
              >
              <template slot-scope="scope">
                {{scope.row.bankAddress}}
              </template>
            </el-table-column>
            <el-table-column
              prop="courtSettingStatus"
              label="操作"
              >
              <template slot-scope="scope">
                <el-button type="text" @click="delyhzh(scope.row)" size="small">刪除</el-button>
              </template>
            </el-table-column>



          </el-table>
        </div>
      </div>
      <div class="clfs li">
        <div class="title">
          <el-button style="margin-top: 10px;color: #0F357F;" class="fr" @click="configclfs">配置</el-button>
          3.下载材料份数设置
        </div>
        <div class="table">
          <el-table
            ref="clfsTable"
            :data="clfsList"
            border
            style="width: 100%;">
            <el-table-column
              type="index"
              width="50"
              label="序号"
            >
            </el-table-column>

            <el-table-column
              prop="materialType"
              label="文书材料"
              >
              <template slot-scope="scope">
                <span v-ellipsis.20>{{getmaterialName(scope.row.materialType)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="materialNum"
              label="默认下载份数"
              >
              <template slot-scope="scope">
                <span v-ellipsis.20>{{scope.row.materialNum}}</span>
              </template>
            </el-table-column>


          </el-table>
        </div>
      </div>

    </div>

    <el-dialog
      :visible.sync="swtrFlag"
      v-dialogDrag
      title="添加配置受委托人"
      width="555px"
      center>
      <div class="dialog-content">
        <p class="detail">《授权委托书》和《受委托人在仲裁代理中不收取报酬的承诺书》</p>
        <p style="text-align: right;">
          <span @click="setswtr" class='colLink'>无选项去设置</span>
        </p>
        <div class="form">
          <el-form :model="swtrObj" ref="swtrform" :rules="rules2" label-width="100px" class="demo-ruleForm">
            <!--1：自营渠道：2：律所代理：3：公司代理-->
            <el-form-item label="受托人类型" prop="channelType">
              <el-select style="width: 100%;" v-model="swtrObj.channelType" placeholder="请选择受托人类型">
                <el-option label="内部员工" value="1"></el-option>
                <el-option label="律所代理" value="2"></el-option>
                <el-option label="公司代理" value="3"></el-option>
                <el-option label="个人代理" value="4"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="渠道选择" prop="channelId">
              <el-select style="width: 100%;" v-model="swtrObj.channelId" placeholder="请选择渠道">
                <el-option v-for="(item,idx) in channelIdList" :value="item.channelId" :label="item.channelName" :key="idx"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="受委托人" prop="mandatoryId">
              <el-select style="width: 100%;" v-model="swtrObj.mandatoryId" placeholder="请选择受托人">
                <el-option value="0000" label="受托人为空"></el-option>
                <el-option v-for="(item,idx) in mandatoryIdList" :value="item.mandatoryId" :label="item.mandatoryName" :key="idx"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="swtrFlag = false">取 消</el-button>
          <el-button type="primary"  @click="saveswtr">确 定</el-button>
        </span>
    </el-dialog>


    <el-dialog
      :visible.sync="clfsFlag"
      v-dialogDrag
      title="下载材料份数设置"
      width="655px"
      center>
      <div class="dialog-content" style="width: 600px;">
        <ul style="overflow: hidden;">
          <li>
            <div class="left title">文书材料</div>
            <div class="right title">份数</div>
          </li>
          <li v-for="(item) in clfsListClone">
            <div class="left ">{{getmaterialName(item.materialType)}}</div>
            <div class="right ">
              <input type="text" v-model="item.materialNum"/>
            </div>
          </li>
        </ul>

      </div>
      <hr style="clear:both;margin-top: 20px;">
      <span slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="clfsSave">确 定</el-button>
          <el-button @click="clfsFlag = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="yhzhFlag"
      v-dialogDrag
      title="添加配置申请执行人银行账户"
      width="555px"
      center>
      <div class="dialog-content">
        <p style="text-align: right;">
          <span @click="setyhzh" class='colLink'>无选项去设置</span>
        </p>
        <div class="form">
          <el-form :rules="rules" ref="yhzhform" :model="yhzhObj" label-width="130px" class="demo-ruleForm">
            <!--1：自营渠道：2：律所代理：3：公司代理-->
            <el-form-item label="执行款账户户名" prop="accountName">
              <el-select style="width: 100%;" v-model="yhzhObj.accountName" placeholder="请选择执行款账户户名">
                <el-option  v-for="(item,idx) in bankNameList" :key="idx" :value="item">{{item}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开户银行" prop="applicantCardId">
              <el-select style="width: 100%;" v-model="yhzhObj.applicantCardId" placeholder="请选择开户银行">
                <el-option  v-for="(item,idx) in bankInfoList" :key="idx" :value="item.applicantCardId" :label="item.depositBank"></el-option>

              </el-select>
            </el-form-item>
          </el-form>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="yhzhFlag = false">取 消</el-button>
          <el-button type="primary"  @click="saveyhzh">确 定</el-button>
        </span>
    </el-dialog>


  </div>
</template>

<script>
  export default {
    name: 'emMaterialAllocationPage',
    data(){
      return {
        swtrList: [],
        channelIdList: [],
        mandatoryIdList: [],
        swtrFlag: false,
        swtrObj: {channelId: ''},
        yhzhFlag: false,
        yhzhObj: {applicantCardId:'',accountName: ''},
        yhzhList: [],
        bankNameList: [],
        bankInfoList: [],
        clfsList: [
          {materialType: 1,materialNum: 0 },
          {materialType: 2,materialNum: 0 },
          // {materialType: 3,materialNum: 0 },
          {materialType: 4,materialNum: 0 },
          {materialType: 7,materialNum: 0 },
          {materialType: 8,materialNum: 0 },
          {materialType: 5,materialNum: 0 },
          {materialType: 6,materialNum: 0 },
          {materialType: 11,materialNum: 0 },
          {materialType: 10,materialNum: 0 },
          ],
        clfsFlag: false,
        clfsObj: {},
        clfsListClone: [],
        channelList: [],
        mandatoryList: [],
        rules : {
          accountName : [
            { required : true , message : '请选择执行款账户户名' , trigger : 'blur'},
          ],
          applicantCardId : [
            { required : true , message : '请选择开户银行' , trigger : 'blur'},
          ],
        },
        rules2:{
          channelType : [
            { required : true , message : '请选择受托人类型' , trigger : 'blur'},
          ],
          channelId : [
            { required : true , message : '请选择渠道' , trigger : 'blur'},
          ],
          mandatoryId:[
            { required : true , message : '请选择受托人' , trigger : 'blur'},

          ]
        }
      }
    },
    watch:{
      'swtrObj.channelType'(val,oldval){
        this.swtrObj.channelId = '';
        this.swtrObj.mandatoryId = '';
        this.$http.post('/mandatory/queryChannelInfoByChannelId.htm',{channelType: val}).then(res => {
          this.channelIdList = res.result;
        })
      },
      'swtrObj.channelId'(val,oldval){
        if(val){
          this.$http.post('/mandatory/queryCourtMandatoryInfo.htm',{channelId: val,pageSize: 100,currentNum: 1}).then(res => {
            this.mandatoryIdList = res.result.list;
            if(this.swtrObj.mandatoryId){
              this.swtrObj.mandatoryId = '';
            }
          })

        }
      },
      'yhzhObj.accountName'(val,oldval){
        this.yhzhObj.applicantCardId = '';
        this.$http.post("/forceManager/queryApplicateBankInfoByAccountName.htm",{accountName: val}).then(res => {
          this.bankInfoList = res.result;
        })
      }
    },
    methods:{

      saveswtr(){
        this.$refs.swtrform.validate(res => {
          console.log(res);
          if(res){
            let obj ={channelId: this.swtrObj.channelId  ,mandatoryId: this.swtrObj.mandatoryId};
            if(this.swtrObj.mandatoryId === '0000'){
              obj ={channelId: this.swtrObj.channelId};
            }
            this.$http.post('/court/addMandatory.htm',{...obj,courtId: this.$route.query.courtId}).then(res => {
              // console.log()
              this.$message.success("配置受委托人成功");
              this.swtrFlag = false;
              this.initPage();
            })
          }

        })
      },

      saveyhzh(){
        this.$refs.yhzhform.validate(res => {
          console.log(res);
          if(res){
            this.$http.post('/court/addApplicateCardInfo.htm',{applicantCardId: this.yhzhObj.applicantCardId,courtId: this.$route.query.courtId}).then(res => {
              // console.log()
              this.$message.success("配置申请执行人银行账户成功");
              this.yhzhFlag = false;
              this.initPage();
            })
          }

        })
      },

      getRowStyle(){
        return {'background':'#EEF3FF','font-weight':'bold'};
      },
      goBack(){
        this.$router.push({path: 'emMaterialAllocation'})
      },
      setswtr(){
        window.open(`//${window.location.host}/#/main/emClientManagement`,'_blank');
      },
      setyhzh(){
        window.open(`//${window.location.host}/#/main/emBankAccount`,'_blank')
      },

      addswtr(){
        this.swtrObj = {channelType: '', channelId: '', mandatoryId: ''};
        this.swtrFlag = true;
        this.$nextTick(() => {
          this.$refs.swtrform.resetFields();
        });
      },
      delswtr(row,idx){
        this.$confirm('确定要删除该条记录吗?', '提示', {
          center: true,
        }).then( () => {
          this.$http.post("/court/deleteMandatoryInfo.htm",{courtId: this.$route.query.courtId, mandatoryId: row.mandatoryId,id: row.id}).then(res => {
            // let idx = this.swtrList.findIndex(it => it.mandatoryId === row.mandatoryId);
            this.swtrList.splice(idx,1);
          })
        })

      },
      addyhzh(){
        this.yhzhObj= {accountName: '',applicantCardId: ''};
        this.yhzhFlag = true;
        this.$nextTick(() => {
          this.$refs.yhzhform.resetFields();
        });
        this.$http.post('/forceManager/queryDistinctApplicateBank.htm').then(res => {
          this.bankNameList= res.result;
          console.log(this.bankNameList)
        })
      },
      delyhzh(row){

        this.$confirm('确定要删除该条记录吗?', '提示', {
          center: true,
        }).then( () => {
          this.$http.post("/court/deleteApplicantCardInfo.htm",{courtId: this.$route.query.courtId, applicantCardId: row.applicantCardId}).then(res => {
            let idx = this.yhzhList.findIndex(it => it.applicantCardId === row.applicantCardId);
            this.yhzhList.splice(idx,1);
          })
        })


      },
      configclfs(){
        this.clfsListClone = this.arrClone(this.clfsList);
        this.clfsFlag =true;
      },
      //保存设置
      clfsSave(){
        let obj = {
          courtId: this.$route.query.courtId,
          // bsqbccns: this.clfsListClone[2].materialNum,
          cczksm: this.clfsListClone[6].materialNum,
          fwxy: this.clfsListClone[4].materialNum,
          jkxy: this.clfsListClone[3].materialNum,
          qzzxsqs: this.clfsListClone[0].materialNum,
          sfzzfm: this.clfsListClone[5].materialNum,
          sqwts: this.clfsListClone[1].materialNum,
          xzgxfsms: this.clfsListClone[8].materialNum,
          zxkyhzhqds: this.clfsListClone[2].materialNum,
          cjs : this.clfsListClone[7].materialNum,
        };
        let obj1 = {};
        for(let key in obj){
          if(obj[key] != 0){
            obj1[key] = obj[key];
          }
        }

        this.$http.post("/court/addMaterialNum.htm",obj1
          ).then(res => {
            console.log(res);
            this.$message.success("配置修改成功");
            this.initPage();
            this.clfsFlag = false;
        })
      },
      arrClone(arr){
        let newArr =[];
        if(arr.length != 0){
          arr.forEach(it => {
            newArr.push({...it});
          })
        }
        return newArr;
      },
      getmaterialName(type){
        // 1：强制执行申请书；2：授权委托书；3：受委托人在仲裁代理中不收取报酬的承诺书；4：收取执行款银行账户确认书；5：被执行人身份证正反面：6：关于被执行人财产状况说明7：《借款协议》8:《服务协议》9：债权转让协议：10：限制高消费及纳入失信被执行人名单申请书'
        if(type === 1)
          return '强制执行申请书';
        else if(type === 2)
          return '授权委托书';
        else if(type === 3)
          return '受委托人在仲裁代理中不收取报酬的承诺书';
        else if(type === 4)
          return '收取执行款银行账户确认书';
        else if(type === 5)
          return '被执行人身份证正反面';
        else if(type === 6)
          return '关于被执行人财产状况说明';
        else if(type === 7)
          return '借款协议';
        else if(type === 8)
          return '服务协议';
        else if(type === 9)
          return '债权转让协议';
        else if(type === 10)
          return '限制高消费及纳入失信被执行人名单申请书';
        else if(type === 11)
          return '裁决书';

      },
      initPage(){
        this.$http.post('/court/materialsettingdetail.htm',{courtId: this.$route.query.courtId}).then(res => {
          console.log('init',res);
          if(res.result.mandatoryList){
            this.swtrList = res.result.mandatoryList;
          }
          if(res.result.bankList){
            this.yhzhList = res.result.bankList;
          }
          if(res.result.materialNumSetting){
            res.result.materialNumSetting.forEach(it => {
              if(it.materialType !== 3){
                let item = this.clfsList.find(i => i.materialType === it.materialType);
                if(item)
                item.materialNum = it.materialNum;
              }
            })
            console.log(this.clfsList);
          }


        })
      }
    },
    created(){
      this.initPage();
    }
  }
</script>

<style scoped lang="scss">

  .content{
    clear:both;
    padding: 0 30px 20px;
    background: #fff;
    .li{
      .title{
        height: 60px;
        line-height: 60px;
        font-size: 17px;
        font-weight: bold;
      }
    }
  }
  .dialog-content{
    text-align: center;
    p.detail{
      color: #aaa;
    }
    .form{
      width: 400px;
      margin: 20px auto;
    }
    li{
      .left,.right{
        float: left;
        line-height: 38px;
        font-size: 16px;
        height: 38px;
        &.title{
          font-size: 17px;
          font-weight: bold;
          line-height: 44px;
        }
      }
      .left{
        width: 480px;
        text-align: left;
      }
      .right{
        width: 120px;
        input{
          width: 30px;
          border: 1px solid #aaa;
          height: 22px;
          line-height: 30px;
        }
      }
    }
  }
</style>
