<template>
 <div class="caseDetail body_container">
  <div class="case_header_warper">
    <div class="case_header">
      {{bsqrInfo.name}}与{{sqrInfo.name}}的借款合同纠纷
    </div>
  </div>
   <div class="case_body" v-for="(item,idx) in items" :key="idx">
     <div class="case_card">
       <div class="card_title">
         <span>被申请人身份证</span>
       </div>
       <div class="card_body">
         <div class="card-img fl zhen">
           <img-zoom :src="bsqrInfo.img02+'?x-oss-process=image/resize,h_250/auto-orient,1/rotate,0'" width="400" height="250" :bigsrc="bsqrInfo.img02+'?x-oss-process=image/resize,h_1250/auto-orient,1/rotate,0'" :configs="configs"></img-zoom>
         </div>
         <div class="card-img fl fan">
           <img-zoom :src="bsqrInfo.img01+'?x-oss-process=image/resize,h_250/auto-orient,1/rotate,0'" width="400" height="250" :bigsrc="bsqrInfo.img01+'?x-oss-process=image/resize,h_1250/auto-orient,1/rotate,0'" :configs="configs"></img-zoom>
         </div>
         <div class="card-info">
           <p>{{bsqrInfo.name}}</p>
           <p>{{bsqrInfo.sex == 0 ? '女' : '男'}}</p>
           <p>{{bsqrInfo.nation}}</p>
           <p>{{bsqrInfo.idaddress}}</p>
           <p>{{bsqrInfo.idcard}}</p>
           <p>借款协议签订日期：{{item.signedDate}}</p>
         </div>
       </div>
     </div>

     <div class="case_sign">
       <div class="sign_title">
         <span>电子签名</span>
       </div>
       <div class="sign_body">
         <p style="line-height: 30px;color: #193b8c;font-size: 17px;">借款合同</p>
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
             <li class="fl evi_bar" :class="{active:currentUrl.indexOf(eviDetail.eviUrl) ==0 }" v-for="(eviDetail,idx) in item.evidences" :index="idx" @click="scrollbarClick(eviDetail)">{{eviDetail.eviName}}</li>
           </ul>
         </div>
         <p style="line-height: 30px;color: #193b8c;font-size: 17px;">仲裁申请书</p>
        <div class="pdf fl clear">
          <iframe  :src="applicationUrl" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>
        </div>
         <div ref="evidenceWarper"  class="pdf fr" >
           <iframe v-if="checkPdf(currentUrl)" :src="currentUrl.replace(/http:|https:/g,'')" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>
           <div ref="imgEvi" style="overflow: auto;width:100%;height:100%;" v-else><img style="cursor: move;position: relative;width:100%;" :src="currentUrl" alt=""></div>
         </div>
         <div class="clear"></div>
       </div>
     </div>
     <div class="case_card">
       <div class="card_title">
         <span>申请人{{sqrInfo.type ===0 ? '身份证' : '营业执照'}}</span>
       </div>
       <div class="card_body">
         <template v-if="sqrInfo.type === 0">
           <div class="card-img fl zhen">
             <img-zoom :src="sqrInfo.img02+'?x-oss-process=image/resize,h_250/auto-orient,1/rotate,0'" width="400" height="250" :bigsrc="sqrInfo.img02+'?x-oss-process=image/resize,h_1250/auto-orient,1/rotate,0'" :configs="configs1"></img-zoom>
           </div>
           <div class="card-img fl fan">
             <img-zoom :src="sqrInfo.img01+'?x-oss-process=image/resize,h_250/auto-orient,1/rotate,0'" width="400" height="250" :bigsrc="sqrInfo.img01+'?x-oss-process=image/resize,h_1250/auto-orient,1/rotate,0'" :configs="configs1"></img-zoom>
           </div>
           <div class="card-info">
             <p>{{sqrInfo.name}}</p>
             <p>{{sqrInfo.sex == 0 ? '女' : '男'}}</p>
             <p>{{sqrInfo.nation}}</p>
             <p>{{sqrInfo.idaddress}}</p>
             <p>{{sqrInfo.idcard}}</p>
           </div>
         </template>
         <template v-if="sqrInfo.type === 1">
           <div class="license">
             <img :src="licenseUrl" alt="" style="width:100%;">
             <div class="edit-wrap">
               <span class="rotate-left" @click="rotate('left')"></span>
               <span class="rotate-right" @click="rotate('right')"></span>
             </div>
           </div>
           <div class="license_desc">
             <p>{{sqrInfo.idcard}}</p>
             <p>{{sqrInfo.name}}</p>
             <p>{{sqrInfo.idaddress}}</p>
             <p>{{sqrInfo.legaler}}</p>
           </div>
         </template>

       </div>
     </div>


   </div>


 </div>
</template>

<script>

import imgZoom from "@/components/v-zoom"
import imgEvi from '@/components/script/imgEvi';

export default {
  name: 'caseDetail',
  mixins:[imgEvi],
  data(){
    return {

      applicationUrl: '',
      //当前选中pdf
      currentUrl:'',


      //营业执照url
      licenseUrl:'',


      items: [{
        respondentInfo:{img01:'',img02:''}
      }],
      // 申请人信息
      sqrInfo:{},
      // 被申请人信息
      bsqrInfo:{},
      configs: {
        width:400,
        height:250,
        maskWidth:133.3,
        maskHeight:83.3,
        maskColor:'#fff',
        maskOpacity:0.2
      },
      configs1:{
        width:400,
        height:250,
        maskWidth:133.3,
        maskHeight:83.3,
        maskColor:'#fff',
        maskOpacity:0.2,
        top:true
      }
    }
  },
  components:{
    imgZoom
  },
  methods:{
    //判断文件是否是pdf
    checkPdf(url){
      if(url.substr(url.length-3).toLowerCase() == 'pdf'){
        return true;
      }
      return false;
    },
    //旋转营业执照
      rotate(direction){
        let idx = this.licenseUrl.lastIndexOf(',');
        if(direction == 'left'){
          let deg = +this.licenseUrl.substr(idx+1)-90;
          if(deg <　0){
            deg += 360;
          }
          this.licenseUrl = this.licenseUrl.substring(0,idx + 1)+deg;
        }else{
          let deg = +this.licenseUrl.substr(idx+1)+90;
          if(deg > 360){
            deg -= 360;
          }
          this.licenseUrl = this.licenseUrl.substring(0,idx + 1)+deg;
        }
      },
    //初始化方法
    init(){
      console.log(this.$route.query);
      this.$http.post('/case/queryCaseDetailByCaseId.htm',{caseId: this.$route.query.caseId}).then(res => {
        if(res.code === '0000'){
          res.result.evidences.unshift({eviName:'证据目录',eviUrl:res.result.eviCatalog});
          this.applicationUrl = res.result.applicationUrl.replace(/http:|https:/g,'')+'?timestamp='+ new Date().getTime();
          this.currentUrl = res.result.eviCatalog;
          this.sqrInfo = res.result.partyInfo.find(it =>it.litigantType == 0);
          this.bsqrInfo = res.result.partyInfo.find(it =>it.litigantType == 1);
          console.log(this.sqrInfo,this.bsqrInfo)
          if(this.sqrInfo.type === 1){
            this.licenseUrl = this.sqrInfo.img01 + '?x-oss-process=image/resize,h_929/auto-orient,1/rotate,0';
          }
          this.items = [res.result];


          this.queryRespondentInfoByCaseId(this.$route.query.caseId).then(res => {
            res.result.forEach(it => {
              //当事人类型：0申请人1被申请人 private Integer resLtype;
              //证件类型 0身份证 1营业执照 private Integer resType;
              if(it.resLtype === 0){
                if(it.resType === 0){
                  this.items[0].evidences.push(...[{eviTitle: '申请人身份证正面', eviFileurl: it.img02}, {eviTitle: '申请人身份证反面', eviFileurl: it.img01}])
                }else{
                  this.items[0].evidences.push({eviTitle: '申请人营业执照', eviFileurl: it.img01});
                }
              }else{
                // if(it.resType)
                const flag = res.result.filter(i => i.resLtype === 1).length > 1;
                if(it.resType === 0){
                  this.items[0].evidences.push(...[{eviTitle: `被申请人${flag ? '（' + it.resName + '）': ''}身份证正面`, eviFileurl: it.img02}, {eviTitle: `被申请人${flag ? '（' + it.resName + '）': ''}身份证反面`, eviFileurl: it.img01}])
                }else {
                  this.items[0].evidences.push({eviTitle: `被申请人${flag ? '（' + it.resName + '）': ''}营业执照`, eviFileurl: it.img01});
                }
              }
            })
            console.log(this.items[0].evidences);

          });

        }
      })
    },

    //pdf切换
    scrollbarClick(evi){
      this.currentUrl = evi.eviUrl;

      if(this.currentUrl.substr(this.currentUrl.length-3) == 'png' || this.currentUrl.substr(this.currentUrl.length-3) == 'jpg' || this.currentUrl.substr(this.currentUrl.length-4) == 'jpeg' ){
            const img = document.createElement('img');
            img.onload=(e)=>{
              console.log(e.path[0].width);
              let bl = (660/e.path[0].width) * 100;
              console.log(bl.toFixed(0));
              this.currentUrl += `?x-oss-process=image/auto-orient,1`;
            }
            img.src=evi.eviUrl;
      }

    }
  },
  created(){
    this.init();
  },
  mounted(){

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
      color: #193b8c;
      border-bottom: 2px solid #193b8c;
    }
  }

  .caseDetail{

  }
.case_header_warper{
  width: 100%;
  height: 76px;
  background: #fff;
  .case_header{
    box-sizing: border-box;
    padding-left:18px;
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
        overflow: hidden;

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
      padding: 10px 15px 25px 15px;
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
  .license{
    float: left;
    width: 660px;
    height:929px;
    text-align: center;
    position: relative;
  }
  .license_desc{
    height: 929px;
    box-sizing: border-box;
    padding: 350px 0;
    float: left;
    margin-left: 20px;
    p{
      font-size:16px;
      line-height: 40px;
    }
  }
  .edit-wrap{
    position: absolute;
    top: 5px;
    right: 5px;
    height:20px;
    z-index: 9999999;
    background: rgba(0,0,0,0.4);
    padding: 5px 15px 0 15px;
    border-radius: 15px;
    .rotate-left{
      display: inline-block;
      cursor: pointer;
      width: 16px;
      height: 16px;
      background: url(../../../../assets/img/rotate.png);
      background-size: 100% 100%;
      -moz-transform:scaleX(-1);
      -webkit-transform:scaleX(-1);
      -o-transform:scaleX(-1);
      transform:scaleX(-1);
    }
    .rotate-right{
      margin-left: 10px;
      cursor: pointer;
      display: inline-block;
      width: 16px;
      height: 16px;
      background: url(../../../../assets/img/rotate.png);
      background-size: 100% 100%;
    }
  }
</style>
