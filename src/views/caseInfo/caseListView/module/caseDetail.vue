<template>
 <div class="caseDetail body_container">
  <div class="case_header_warper">
    <div class="case_header">
      王二小与张三风的借款合同纠纷
    </div>
  </div>
   <div class="case_body">
     <div class="case_card">
       <div class="card_title">
         <span>被申请人身份证</span>
       </div>
       <div class="card_body">
         <div class="card-img fl zhen">
           <img-zoom :src="item.respondentInfo.img02" width="400" height="250" :bigsrc="item.respondentInfo.img02" :configs="configs"></img-zoom>
         </div>
         <div class="card-img fl fan">
           <img-zoom :src="item.respondentInfo.img01" width="400" height="250" :bigsrc="item.respondentInfo.img01" :configs="configs"></img-zoom>
         </div>
         <div class="card-info">
           <p>{{item.respondentInfo.name}}</p>
           <p>{{item.respondentInfo.sex == 0 ? '女' : '男'}}</p>
           <p>{{item.respondentInfo.nation}}</p>
           <p>{{item.respondentInfo.idaddress}}</p>
           <p>{{item.respondentInfo.idcard}}</p>
           <p>借款协议签订日期：{{item.respondentInfo.signedDate}}</p>
         </div>
       </div>
     </div>

     <div class="case_sign">
       <div class="sign_title">
         <span>电子签名</span>
       </div>
       <div class="sign_body">
         <table
           class="m-primordial-table mt-10
            el-table el-table--fit el-table--border
            el-table--enable-row-hover" style="width: 1000px;"
         >
           <thead class="t_header">
           <tr>
             <td colspan="1">序号</td>
             <td colspan="2">签名时间</td>
             <td colspan="4">签名实体</td>
             <td colspan="1">有效性</td>
           </tr>
           </thead>
           <tr v-for="(sign ,index) in item.signList" :key="index">
             <td  colspan="1">{{index+1}}</td>
             <td  colspan="2">{{sign.signTime | TimeMoment}}</td>
             <td  colspan="4">{{sign.signObject}}</td>
             <td  colspan="1">{{sign.signValidity == 1 ? "签名有效" : '签名无效'}}</td>
           </tr>
         </table>
       </div>
     </div>
     <div class="case_evi">
       <div class="evi_title">
         <span>事实与证据</span>
       </div>
       <div class="evi_body">
         <div class="scroll_toolbar fr">
           <ul>
             <li class="fl evi_bar" :class="{active: eviDetail.eviUrl == currentUrl}" v-for="(eviDetail,idx) in item.evidences" :index="idx" @click="scrollbarClick(eviDetail)">{{eviDetail.eviName}}</li>
           </ul>

         </div>
        <div class="pdf fl clear">
          <iframe  :src="item.applicationUrl" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>
        </div>
         <div class="pdf fr">
           <iframe  :src="currentUrl" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>
         </div>
         <div class="clear"></div>
       </div>

     </div>

   </div>


 </div>
</template>

<script>

import imgZoom from "@/components/v-zoom"
export default {
  name: 'caseDetail',
  data(){
    return {
      //当前选中pdf
      currentUrl:'',
      item: {
        respondentInfo:{img01:'',img02:''}
      },
      configs: {
        width:400,
        height:250,
        maskWidth:133.3,
        maskHeight:83.3,
        maskColor:'#fff',
        maskOpacity:0.2
      },
    }
  },
  components:{
    imgZoom
  },
  methods:{
    //初始化方法
    init(){
      console.log(this.$route.query);
      this.$http.post('/case/queryCaseDetailByCaseId.htm',{caseId: this.$route.query.caseId}).then(res => {
        if(res.code === '0000'){
          this.item = res.result;
          res.result.evidences.unshift({eviName:'证据目录',eviUrl:res.result.eviCatalog});
          this.currentUrl = res.result.eviCatalog;
        }
      })
    },

    //pdf切换
    scrollbarClick(evi){
      this.currentUrl = evi.eviUrl;
    }
  },
  created(){
    this.init();
  }
}
</script>

<style scoped lang="scss">


  .scroll_toolbar {
    width: 660px;
    font-size: 14px;
    .evi_bar {
      cursor: pointer;
      line-height: 24px;
      margin-right: 10px;
      border-bottom: 2px solid transparent;
    }
    .active {
      border-bottom: 2px solid #0f357f;
    }
  }

  .caseDetail{

  }
.case_header_warper{
  width: 100%;
  height: 76px;
  background: #fff;
  .case_header{
    width: 1366px;
    margin:0 auto;
    font-size: 28px;
    color: #193B8C;
    line-height: 76px;
    font-weight: 500;
  }
}
  .case_body {
    background: #F7F7F7;
    padding-top: 15px;
    .case_card {
      width: 1366px;
      margin: 15px auto;

      .card_body {
        padding: 30px 15px 25px 15px;
        background: #fff;
        .card-img {
          &.zhen {
            margin-left: 18px;
          }
          width: 400px;
          height: 250px;
          border: 1px solid #aaa;
          margin-right: 40px;
        }
        .card-info {
          padding: 20px 0;
          p {
            line-height: 35px;
            font-size: 15px;
            color: #757575;
          }
        }
      }
    }
    .case_evi {
      width: 1366px;
      margin: 15px auto;

      .evi_body {
        background: #fff;
        padding: 30px 15px 25px 15px;
        .pdf {
          width: 660px;
          height: 820px;
          border: 1px solid #aaa;
        }
      }
    }
  }
  .case_sign{
    width: 1366px;
    margin: 15px auto;
    .sign_body{
      padding: 30px 15px 25px 15px;
      background: #fff;

    }
  }

  .sign_title,.evi_title,.card_title {
    height: 30px;
    background: #EEF3FF;
    padding: 10px 0;
    padding-left: 18px;
    span {
      line-height: 30px;
      color: #193b8c;
      font-size: 17px;
      border-left: 5px solid #193b8c;
      padding-left: 8px;
      margin-top: 10px;
    }
  }
  .t_header tr{
    background: #EEF3FF;
  }
</style>
