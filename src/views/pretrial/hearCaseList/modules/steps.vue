<template>
    <div class="steps">
      <ul>
        <li v-for="(item,idx) in data" :key="idx">
          <div class="date">
            {{item.date}}
          </div>
          <div class="step">
            <div class="circle" :class="{'active': currentIdx === idx}" @click="currentIdx = idx">

            </div>
            <div class="line">

            </div>
          </div>
          <div class="desc" >
            <span @click="currentIdx = idx">
            {{item.desc}}
            </span>
          </div>
          <div style="clear: both;"></div>
        </li>
      </ul>



    </div>
</template>

<script>
  export default {
    name: 'steps',
    data() {
      return {
        currentIdx: null,
        data: [
          {date: "2018-08-09  周三",desc: '推送完成'},
          {date: "2018-08-09  周三",desc: '推送完成'},
          {date: "2018-08-09  周三",desc: '推送完成'},
          {date: "2018-08-09  周三",desc: '推送完成'},
          {date: "2018-08-09  周三",desc: '推送完成'},
          {date: "2018-08-09  周三",desc: '推送完成'}
        ]
      }
    },
    methods: {
      calc(price, times){
        let res = price;
        let money = 0;
        for(let idx = 0; idx <= times; idx ++){
          if(idx > 0){
            res -= 1/times * price;
          }
          for(let i = 0; i < 30 ; i ++){
            money += res  * (0.68/10000);
            res *=(1+0.68/10000);
            // console.log(res  * (0.68/10000),money);
          }
          console.error(`第${idx + 1}个月最后一天本金${res}赚: ${money}元`)
        }
        return money;
      }
    },
    created(){
      console.error(`6999元24期分期能赚：${this.calc(6999,24)}元`)
    }
  }
</script>

<style lang="scss">
  .steps{
    .date, .step , .desc{
      float: left;
      line-height: 60px;
    }

    .desc{
      cursor: pointer;
    }
    .step{
      width:36px;
      height: 60px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      .circle{
        width: 12px;
        height: 12px;
        border-radius: 12px;
        background: #666;
        cursor: pointer;
        z-index: 10;
        &.active{
          background: #0000cc;
        }
      }
      .line{
        height: 100%;
        width: 2px;
        position: absolute;
        background: #666;
      }
    }
    /*.flex_box{*/
      /*display: flex;*/
      /*align-items: flex-start;*/
      /*height: 500px;*/
      /*border: 1px solid #000;*/
      /*width: 700px;*/
      /*flex-wrap: wrap-reverse;*/

      /*li{*/
        /*flex-basis: 120px;*/
        /*height:100px;*/
        /*&:nth-child(2n+1){*/
          /*background: green;*/
        /*}*/
        /*&:nth-child(2n+2){*/
          /*background: red;*/
        /*}*/
      /*}*/
    /*}*/
  }
</style>
