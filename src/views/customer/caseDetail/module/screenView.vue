<template>
    <div class="screenView" v-if="flag">
      <div class="applybook_body">
        <div class="applybook_title of-hidden">
          <div class="tit fl part_tit f_18">仲裁申请书</div>
          <div class="scroll_toolbar fr">
            <ul>
              <li class="fl evi_bar" :class="{active: currentUrl.indexOf(eviDetail.fileUrl) == 0,disabled: eviDetail.eviStatus == 0}" v-for="(eviDetail,idx) in evidence.eviList" :index="idx" @click="scrollbarClick(eviDetail)">{{eviDetail.eviTitle}}</li>
            </ul>
            <!-- <scroll-y label="eviTitle" @handleClick="scrollbarClick" :options="evidence.eviDetailList" :defaultWidth="520"></scroll-y> -->
          </div>
        </div>
        <div class="applybook_content of-hidden">
          <div class="article_left fl">
            <!--<pdf :src="evidence.applicationUrl"></pdf>-->
            <iframe  :src="applicationUrl" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>
          </div>
          <div  ref="evidenceWarper" class="article_right fr">
            <iframe ref="evidence" v-if="checkPdf(currentUrl)"  :src="currentUrl.replace(/http:|https:/g,'')" width="100%" height="100%" frameborder="0" scrolling="yes"></iframe>
            <div ref="imgEvi" style="overflow: auto;width:100%;height:100%;" v-else><img style="cursor: move;position: relative;" :src="currentUrl" alt=""></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
      name: 'screenView',
      data(){
        return {
          flag : false,
          evidence: {},
          applicationUrl : '',
          currentUrl: ''
        }
      },
      methods: {
        scrollbarClick(e) {
          if(e.eviStatus == 0){
            return
          }
          console.log(e);
          this.currentUrl = e.fileUrl;
          if(this.currentUrl.substr(this.currentUrl.length-3) == 'png' || this.currentUrl.substr(this.currentUrl.length-3) == 'jpg' || this.currentUrl.substr(this.currentUrl.length-4) == 'jpeg' ){
            const img = document.createElement('img');
            img.onload=(e)=>{
              console.log(e.path[0].width);
              let bl = (660/e.path[0].width) * 100;
              console.log(bl.toFixed(0));
              this.currentUrl += `?x-oss-process=image/resize,p_${bl.toFixed(0)}`;
            }
            img.src=e.fileUrl;
          }
        },
        //判斷是否是視頻
        checkMovie(url){
          let idx = url.lastIndexOf('.');
          let str = url.substr(idx+1);
          let arr = ["avi","mkv","mov","mp4","rmvb"];
          return arr.indexOf(str) != -1;
        },
        //判断文件是否是pdf
        checkPdf(url){
          if(url.substr(url.length-3) == 'pdf' || this.checkMovie(url)){
            return true;
          }
          return false;
        },
        toggleShow(obj){
          this.flag = !this.flag;
          if(obj){
            console.log(obj);
            this.applicationUrl = obj.applicationUrl;
            this.evidence = obj;
            console.log(obj);
            let evi = this.evidence.eviList.find(it  => it.eviTitle  == '证据目录' || it.eviStatus == 1);
            if(evi){
              this.scrollbarClick(evi);

            }
          }
        }
      }
    }
</script>

<style lang="scss">
  $themeColor: #193b8c;
.screenView{
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: #fff;
  .applybook_body {
    width: 1366px;
    margin:  20px auto;
    .applybook_title {
      font-size: 17px;
      color: $themeColor;
      padding-bottom: 13px;
      .scroll_toolbar {
        font-size: 14px;
        width: 645px;
        overflow: auto;
        max-height: 150px;
        .evi_bar{
          cursor: pointer;
          line-height: 24px;
          margin-right: 10px;
          border-bottom: 2px solid transparent;
        }
        .active {
          border-bottom: 2px solid $themeColor;
        }
        .disabled{
          color: #aaa;
        }
        position: relative;
        .ac_left {
          position: absolute;
          left: -20px;
          top: 0;
          bottom: 0;
          margin: auto;
          width: 8px;
          height: 13px;
          background: url(/../../assets/img/ic20_004.png) no-repeat center;

        }
        .ac_right {
          position: absolute;
          right: -20px;
          top: 0;
          bottom: 0;
          margin: auto;
          width: 8px;
          height: 13px;
          background: url(/../../assets/img/ic20_005.png) no-repeat center;
        }

      }
    }

    .applybook_content {
      .article_left,
      .article_right {
        width: 645px;
        height: 780px;
        border: 1px solid #9b9b9b;
        overflow: hidden;
      }
    }

  }
}

</style>
