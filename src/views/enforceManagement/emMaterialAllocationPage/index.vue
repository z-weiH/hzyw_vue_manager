<template>
  <div>
    <div class="item-title">
      <el-button style="margin-top: -14px;" class="fr" @click="goBack">返回<i class="el-icon-arrow-right el-icon--right"></i></el-button>
      法院材料配置:
      <span style="font-size: 16px; color: #333;">{{$route.query.courtName}}</span>
    </div>
    <div class="content">
      <!-- 委托人 -->
      <div class="wtr li">
        <div class="title">
          1.委托人
          <div class="fr">
            <el-button @click="handleWtrAdd">添加</el-button>
          </div>
        </div>
        <el-table
          :data="wtrList"
          :header-cell-style="getRowStyle"
          border
          style="width: 100%;"
        >
          <el-table-column
            type="index"
            width="50"
            label="序号"
          >
          </el-table-column>

          <el-table-column prop="clienteleName" label="委托人名称"></el-table-column>
          <el-table-column prop="corporationName" label="法人"></el-table-column>
          <el-table-column prop="corporationPhone" label="联系电话"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-checkbox @click.native.prevent="handleWtrCheck(scope.row,$event)" v-model="scope.row.useStatus" class="mr-10">启用</el-checkbox>
              <el-button type="text" @click="handleWtrDelete(scope.row,scope.$index)" size="small">刪除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="swtr li">
        <div class="title">
          <el-button style="margin-top: 10px;color: #0F357F;" class="fr" @click="addswtr">添加</el-button>
          2.受委托人
          <el-tooltip effect="dark" placement="right">
            <div slot="content">
              律所授权委托书模板：支持配置1-2个受委托人
              <br />
              公司授权委托书模板：只支持配置1个受委托人
            </div>
            <i class="el-icon-question" style="font-size:14px;"></i>
          </el-tooltip>
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
                <el-checkbox @click.native.prevent="handleSwtrCheck(scope.row,$event)" v-model="scope.row.useStatus" class="mr-10">启用</el-checkbox>
                <el-button type="text" @click="delswtr(scope.row,scope.$index)" size="small">刪除</el-button>
              </template>
            </el-table-column>



          </el-table>
        </div>
      </div>
      <div class="yhzh li">
        <div class="title">
          <el-button style="margin-top: 10px;color: #0F357F;" class="fr" @click="addyhzh" :disabled="yhzhList.length === 1">添加</el-button>
          3.申请执行人银行账户
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

      <div class="bz li">
        <div class="title">
          <customer-button style="margin-top: 10px;color: #0F357F;" class="fr" v-if="!remarkFlag" @click="remarkFlag = true;">编辑</customer-button>
          <customer-button style="margin-top: 10px;" class="fr" type="primary" v-if="remarkFlag" @click="handleRemarkSave">保存</customer-button>
          4.备注
        </div>
        <div class="input">
          <el-input type="textarea" v-model="remark" :disabled="!remarkFlag" rows="6"></el-input>
        </div>
      </div>

      <div class="clfs li">
        <div class="title">
          <el-button style="margin-top: 10px;color: #0F357F;" class="fr" @click="configclfs">配置</el-button>
          5.下载材料份数设置
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
        <p class="detail">《授权委托书》</p>
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
              <el-select ref="swtrQd" style="width: 100%;" v-model="swtrObj.channelId" placeholder="请选择渠道">
                <el-option v-for="(item,idx) in channelIdList" :value="item.channelId" :label="item.channelName" :key="item.channelId + '' + idx"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="受委托人" prop="mandatoryId">
              <el-select style="width: 100%;" v-model="swtrObj.mandatoryId" placeholder="请选择受托人">
                <el-option value="0000" label="受托人为空"></el-option>
                <el-option v-for="(item,idx) in mandatoryIdList" :value="item.mandatoryId" :label="item.mandatoryName" :key="item.mandatoryId + '' + idx"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="是否启用" prop="useStatus" style="text-align: left;">
              <el-radio-group v-model="swtrObj.useStatus">
                <el-radio :label="0">是</el-radio>
                <el-radio :label="1">否</el-radio>
              </el-radio-group>
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
          <li v-for="(item,index) in clfsListClone" :key="index">
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
                <el-option  v-for="(item,idx) in bankNameList" :key="item + '' + idx" :value="item">{{item}}</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="开户银行" prop="applicantCardId">
              <el-select style="width: 100%;" v-model="yhzhObj.applicantCardId" placeholder="请选择开户银行">
                <el-option  v-for="(item,idx) in bankInfoList" :key="item.applicantCardId + '' + idx" :value="item.applicantCardId" :label="item.depositBank"></el-option>

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

    <wtrDialog @successCBK="wtrSuccessCBK" ref="wtrDialog"></wtrDialog>
  </div>
</template>

<script>
  import wtrDialog from './modules/wtrDialog.vue'
  export default {
    name: 'emMaterialAllocationPage',
    components : {
      wtrDialog,
    },
    data(){
      return {

        remark: '',
        remarkFlag: false,
        swtrList: [],
        wtrList : [],
        channelIdList: [],
        mandatoryIdList: [],
        swtrFlag: false,
        swtrObj: {
          channelId: '',
          // 是否启用
          useStatus : 0,
        },
        yhzhFlag: false,
        yhzhObj: {applicantCardId:'',accountName: ''},
        yhzhList: [],
        bankNameList: [],
        bankInfoList: [],

        //位置在授权委托书前, 营业执照、法人身份证正反面、法人代表人身份证明书

        //文书新增一份《债权转让确认书》，位置在《债权转让协议》后边，具体见附件1

        //文书在《限制高消费及纳入失信被执行人名单申请书》后，依次需要增加《限高名单申请书》（附件2）、《失信名单申请书-盖公章》（附件3）

        // 1：强制执行申请书；2：授权委托书；3：受委托人在仲裁代理中不收取报酬的承诺书；4：收取执行款银行账户确认书；5：被执行人身份证正反面：6：关于被执行人财产状况说明7：《借款协议》8:《服务协议》9：债权转让协议：10：限制高消费及纳入失信被执行人名单申请书'

      //   private Boolean qzzxsqs=false;/制执行申请书数量 1
      // private Boolean cczksm=false;//关于被执行人财产状况说明 2
      // private Boolean yyzz=false;//营业执照 3
      // private Boolean frsfzzfm=false;//法人身份证正反面 4
      // private Boolean frdbrsfzms=false;//法定代表人身份证明书 5
      // private Boolean sqwts=false;//授权委托书 6
      // private Boolean ldhtsmj = false ;//劳动合同扫描件 7
      // private Boolean sfzzfm=false;//被执行人身份证正反面  8
      // private Boolean cjsfm=false;//裁决书封面 18
      // private Boolean cjs=false;//裁决书 9
      // private Boolean zqzrxy=false;//债权转让协议 10
      // private Boolean zqzrqrs=false;//债权转让确认书  11
      // private Boolean zxkyhzhqds=false;//收取执行款银行账户确认书  12
      // private Boolean  jkxy=false;//借款协议 13
      // private Boolean fwxy=false;//服务协议 14
      //
      // private Boolean xzgxfsms=false;//限制高消费及纳入失信被执行人名单申请书 15
      // private Boolean xgmdsqs=false;//限高名单申请书 16
      // private Boolean sxmdsqs=false;//失信名单申请书 17
    //     else if(type === 11)
    //   return '裁决书';
    // else if(type === 12)
    //     return '营业执照';
    //   else if(type === 13)
    //     return '法人身份证正反面';
    //   else if(type === 14)
    //     return '法人代表人身份证明书';
    //   else if(type === 15)
    //     return '债权转让确认书';
    //   else if(type === 16)
    //     return '限高名单申请书';
    //   else if(type === 17)
    //     return '失信名单申请书';
    //   else if(type === 18)
    //     return '劳动合同扫描';
        clfsList: [
          {materialType: 1,materialNum: 0 , value: 'qzzxsqs'},
          {materialType: 2,materialNum: 0 ,value: 'cczksm' },


          {materialType: 3,materialNum: 0 , value: 'yyzz'},//营业执照
          {materialType: 4,materialNum: 0 ,value: 'frsfzzfm' },//法人身份证正反面
          {materialType: 5,materialNum: 0 , value: 'frdbrsfzms' },//法人代表人身份证明书




          {materialType: 6,materialNum: 0 ,value: 'sqwts'},
          {materialType: 7,materialNum: 0 , value: 'ldhtsmj'},
          {materialType: 8,materialNum: 0 , value: 'sfzzfm' },


          {materialType: 18,materialNum: 0 , value: 'cjsfm'},
          {materialType: 9,materialNum: 0 , value: 'cjs'},
          {materialType: 10,materialNum: 0 , value: 'zqzrxy'},
          {materialType: 11,materialNum: 0 , value: 'zqzrqrs'}, //债权转让确认书



          // {materialType: 3,materialNum: 0 },
          {materialType: 12,materialNum: 0 , value: 'zxkyhzhqds'},
          {materialType: 13,materialNum: 0 , value: 'jkxy'},
          {materialType: 14,materialNum: 0 , value: 'fwxy'},






          {materialType: 15,materialNum: 0 , value: 'xzgxfsms'},

          {materialType: 16,materialNum: 0 , value: 'xgmdsqs'}, //限高名单申请书
          {materialType: 17,materialNum: 0 , value: 'sxmdsqs' }, //失信名单申请书-盖公章
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

          ],
          useStatus : [
            { required : true , message : '请选择是否启用' , trigger : 'change'},
          ],
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

      handleRemarkSave(){
        if(this.remark.length > 200){
          return this.$message.error("内容必须小于200字");
        }
          this.$http.post("/court/addRemark.htm",{courtId: this.$route.query.courtId, remark: this.remark}).then(res => {
            this.$message.success("操作成功");
            this.remarkFlag = false;
          })
      },

      saveswtr(){
        this.$refs.swtrform.validate(res => {
          console.log(res);
          if(res){
            // 添加受委托人 启用时校验
            if(!this.swtrVerify()) {
              return;
            }
            let obj ={channelId: this.swtrObj.channelId  ,mandatoryId: this.swtrObj.mandatoryId,useStatus : this.swtrObj.useStatus};
            if(this.swtrObj.mandatoryId === '0000'){
              obj ={channelId: this.swtrObj.channelId , useStatus : this.swtrObj.useStatus};
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
        this.swtrObj = {channelType: '', channelId: '', mandatoryId: '' , useStatus : 0};
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
          // cczksm: this.clfsListClone[6+3+1].materialNum,
          // fwxy: this.clfsListClone[4+3+1].materialNum,
          // jkxy: this.clfsListClone[3+3+1].materialNum,
          // qzzxsqs: this.clfsListClone[0].materialNum,
          // sfzzfm: this.clfsListClone[5+3+1].materialNum,
          // sqwts: this.clfsListClone[1+3].materialNum,
          // xzgxfsms: this.clfsListClone[8+3+2+1].materialNum,
          // zxkyhzhqds: this.clfsListClone[2+3+1].materialNum,
          // cjs : this.clfsListClone[7+3+2+1].materialNum,
          // yyzz : this.clfsListClone[1].materialNum,
          // frsfzzfm : this.clfsListClone[2].materialNum,
          // frdbrsfzms : this.clfsListClone[3].materialNum,
          // zqzrxy: this.clfsListClone[10+1].materialNum,
          // zqzrqrs: this.clfsListClone[11+1].materialNum,
          // xgmdsqs: this.clfsListClone[14+1].materialNum,
          // sxmdsqs: this.clfsListClone[15+1].materialNum,
          // ldhtsmj: this.clfsListClone[5].materialNum,
        };
        for(let i =0 ;i < this.clfsListClone.length ; i++){
          obj[this.clfsList[i].value] = this.clfsListClone[i].materialNum;
        }

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
        // private Boolean qzzxsqs=false;/制执行申请书数量 1
        // private Boolean cczksm=false;//关于被执行人财产状况说明 2
        // private Boolean yyzz=false;//营业执照 3
        // private Boolean frsfzzfm=false;//法人身份证正反面 4
        // private Boolean frdbrsfzms=false;//法定代表人身份证明书 5
        // private Boolean sqwts=false;//授权委托书 6
        // private Boolean ldhtsmj = false ;//劳动合同扫描件 7
        // private Boolean sfzzfm=false;//被执行人身份证正反面  8
        // private Boolean cjsfm=false;//裁决书封面 18
        // private Boolean cjs=false;//裁决书 9
        // private Boolean zqzrxy=false;//债权转让协议 10
        // private Boolean zqzrqrs=false;//债权转让确认书  11
        // private Boolean zxkyhzhqds=false;//收取执行款银行账户确认书  12
        // private Boolean  jkxy=false;//借款协议 13
        // private Boolean fwxy=false;//服务协议 14
        //
        // private Boolean xzgxfsms=false;//限制高消费及纳入失信被执行人名单申请书 15
        // private Boolean xgmdsqs=false;//限高名单申请书 16
        // private Boolean sxmdsqs=false;//失信名单申请书 17
        if(type === 1)
          return '强制执行申请书';
        else if(type === 2)
          return '关于被执行人财产状况说明';
        else if(type === 3)
          return '营业执照';
        else if(type === 4)
          return '法人身份证正反面';
        else if(type === 5)
          return '法定代表人身份证明书';
        else if(type === 6)
          return '授权委托书';
        else if(type === 7)
          return '劳动合同扫描件';
        else if(type === 8)
          return '被执行人身份证正反面';
        else if(type === 9)
          return '裁决书';
        else if(type === 10)
          return '债权转让协议';
        else if(type === 11)
          return '债权转让确认书';
        else if(type === 12)
          return '收取执行款银行账户确认书';
        else if(type === 13)
          return '借款协议';
        else if(type === 14)
          return '服务协议';
        else if(type === 15)
          return '限制高消费及纳入失信被执行人名单申请书';
        else if(type === 16)
          return '限高名单申请书';
        else if(type === 17)
          return '失信名单申请书';
        else if(type === 18)
          return '裁决书封面';

      },
      initPage(){
        this.$http.post('/court/materialsettingdetail.htm',{courtId: this.$route.query.courtId}).then(res => {
          console.log('init',res);
          this.remark = res.result.remark;
          if(res.result.mandatoryList){
            this.swtrList = res.result.mandatoryList.map(v => {
              v.useStatus = v.useStatus === 0 ? true : false;
              return v;
            });
          }
          if(res.result.bankList){
            this.yhzhList = res.result.bankList;
          }
          if(res.result.clienteleInfoList) {
            this.wtrList = res.result.clienteleInfoList.map(v => {
              v.useStatus = v.useStatus === 0 ? true : false;
              return v;
            });
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
      },

      // 受委托人 新增 校验
      swtrVerify() {
        if(this.swtrObj.useStatus === 0) {
          let check = this.swtrList.filter(v => v.useStatus === true);
          let channelName = this.$refs.swtrQd.$el.querySelector('.el-input__inner').value;
          let type = true;
          check.map(v => {
            if(channelName !== v.channelName) {
              type = false;
            }
          });
          if(type === false) {
            this.$message.warning('已经启用了其他渠道，不能启用当前渠道');
            return false;
          }else{
            return true;
          }
        }else{
          return true;
        }
      },
      // 受委托人 启用
      handleSwtrCheck(row,e) {
        // 只判断当前是未选中状态的数据
        if(row.useStatus === false) {
          let check = this.swtrList.filter(v => v.useStatus === true);
          let channelName = row.channelName;
          let type = true;
          check.map(v => {
            if(channelName !== v.channelName) {
              e.preventDefault();
              type = false;
            }
          });
          if(type === false) {
            this.$message.warning('已经启用了其他渠道，不能启用当前渠道');
            return;
          }
        }
        this.$http({
          method : 'post',
          url : '/court/useOrUnuseMandatory.htm',
          data : {
            courtId : this.$route.query.courtId,
            id : row.id,
            useStatus : row.useStatus === true ? 1 : 0,
            channelId : row.channelId,
          },
        }).then(() => {
          row.useStatus = !row.useStatus;
        }).catch(() => {
        });
      },
      // 委托人 启用
      handleWtrCheck(row,e) {
        // 只判断当前是未选中状态的数据
        if(row.useStatus === false) {
          let check = this.wtrList.filter(v => v.useStatus === true);
          if(check.length > 0) {
            e.preventDefault();
            this.$message.warning('只能启用一个委托人');
            return;
          }
        }
        this.$http({
          method : 'post',
          url : '/court/useOrUnuseClientele.htm',
          data : {
            courtId : this.$route.query.courtId,
            id : row.id,
            useStatus : row.useStatus === true ? 1 : 0,
          },
        }).then(() => {
          row.useStatus = !row.useStatus;
        }).catch(() => {
        });
      },
      // 委托人 添加
      handleWtrAdd() {
        this.$refs.wtrDialog.show('add',this.wtrList);
      },
      // 委托人 删除
      handleWtrDelete(row,index) {
        this.$confirm('确定要删除该条记录吗?', '提示', {
          center: true,
        }).then(() => {
          this.$http({
            method : 'post',
            url : '/court/deleteClienteleInfo.htm',
            data : {
              clienteleId : row.clienteleId,
              courtId : this.$route.query.courtId,
            },
          }).then(() => {
            this.$message.success('删除成功');
            this.initPage();
          });
        }).catch(() => {});
      },
      // 委托人 成功回调
      wtrSuccessCBK() {
        this.initPage();
      },
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
