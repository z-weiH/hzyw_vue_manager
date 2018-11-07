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
              width="150">
              <template slot-scope="scope">
                <span v-ellipsis.20>{{scope.row.mandatoryName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="identityCard"
              label="身份证号"
              width="150">
              <template slot-scope="scope">
                <span v-ellipsis.20>{{scope.row.identityCard}}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="channelName"
              label="工作单位"
              width="148">
              <template slot-scope="scope">
                {{scope.row.channelName}}
              </template>
            </el-table-column>
            <el-table-column
              prop="jobPosition"
              label="职务"
              width="145">
              <template slot-scope="scope">
                {{scope.row.jobPosition}}
              </template>
            </el-table-column>
            <el-table-column
              prop="phone"
              label="联系电话"
              width="150">
              <template slot-scope="scope">
                {{scope.row.phone}}
              </template>
            </el-table-column>
            <el-table-column
              prop="courtSettingStatus"
              label="操作"
              width="106">
              <template slot-scope="scope">
                <el-button type="text" @click="delswtr(scope.row)" size="small">刪除</el-button>
              </template>
            </el-table-column>



          </el-table>
        </div>
      </div>
      <div class="yhzh li">
        <div class="title">
          <el-button style="margin-top: 10px;color: #0F357F;" class="fr" @click="addyhzh">添加</el-button>
          2.申请执行人银行账户
        </div>
        <div class="table">
          <el-table
            :data="yhzhList"
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
              width="120">
              <template slot-scope="scope">
                <span v-ellipsis.20>{{scope.row.accountName}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="depositBank"
              label="开户银行"
              width="130">
              <template slot-scope="scope">
                <span v-ellipsis.20>{{scope.row.depositBank}}</span>
              </template>
            </el-table-column>

            <el-table-column
              prop="accountNumber"
              label="账号"
              width="148">
              <template slot-scope="scope">
                {{scope.row.accountNumber}}
              </template>
            </el-table-column>
            <el-table-column
              prop="branchName"
              label="支行名称"
              width="135">
              <template slot-scope="scope">
                {{scope.row.branchName}}
              </template>
            </el-table-column>
            <el-table-column
              prop="subbranch"
              label="联行号"
              width="120">
              <template slot-scope="scope">
                {{scope.row.subbranch}}
              </template>
            </el-table-column>
            <el-table-column
              prop="bankAddress"
              label="银行地址"
              width="120">
              <template slot-scope="scope">
                {{scope.row.bankAddress}}
              </template>
            </el-table-column>
            <el-table-column
              prop="courtSettingStatus"
              label="操作"
              width="76">
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
              width="548">
              <template slot-scope="scope">
                <span v-ellipsis.20>{{getmaterialName(scope.row.materialType)}}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="materialNum"
              label="默认下载份数"
              width="300">
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
          <el-form :model="swtrObj" label-width="100px" class="demo-ruleForm">
            <!--1：自营渠道：2：律所代理：3：线下代理-->
            <el-form-item label="受托人类型" prop="region">
              <el-select v-model="swtrObj.channelType" placeholder="请选择受托人类型">
                <el-option label="自营渠道" value="1"></el-option>
                <el-option label="律所代理" value="2"></el-option>
                <el-option label="线下代理" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </div>

      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="swtrFlag = false">取 消</el-button>
          <el-button type="primary"  @click="save">确 定</el-button>
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
          <el-button @click="clfsFlag = false">取 消</el-button>
          <el-button type="primary"  @click="clfsSave">确 定</el-button>
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
        swtrFlag: false,
        swtrObj: {},
        yhzhList: [],
        clfsList: [],
        clfsFlag: false,
        clfsObj: {},
        clfsListClone: []

      }
    },
    methods:{
      goBack(){
        this.$router.push({path: 'emMaterialAllocation'})
      },
      setswtr(){
        window.open(`//${window.location.host}/#/main/emClientManagement`,'_blank');
      },
      addswtr(){
        this.swtrFlag = true;
      },
      delswtr(row){
        this.$http.get("/court/deleteMandatoryInfo.htm",{courtId: this.$route.query.courtId, mandatoryId: row.mandatoryId}).then(res => {
          let idx = this.swtrList.findIndex(it => it.mandatoryId === row.mandatoryId);
          this.swtrList.splice(idx,1);
        })
      },
      addyhzh(){

      },
      delyhzh(row){
        this.$http.get("/court/deleteApplicantCardInfo.htm",{courtId: this.$route.query.courtId, applicantCardId: row.applicantCardId}).then(res => {
          let idx = this.yhzhList.findIndex(it => it.applicantCardId === row.applicantCardId);
          this.yhzhList.splice(idx,1);
        })
      },
      configclfs(){
        this.clfsFlag =true;
      },
      //保存设置
      clfsSave(){
        
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

      },
      initPage(){
        this.$http.get('/court/materialsettingdetail.htm',{courtId: this.$route.query.courtId}).then(res => {
          this.swtrList = res.result.mandatoryList;
          this.yhzhList = res.result.bankList;
          this.clfsList = res.result.materialNumSetting;
          this.clfsListClone = this.arrClone(this.clfsList);
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
