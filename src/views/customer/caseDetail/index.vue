<template>
  <div class="template-joint-caseDetail">
    <div class="tm-head">
      <div class="fl">案件详情</div>
      <div class="fr">
        <customer-button type="primary" :plain="true">联调意见</customer-button>
        <customer-button type="primary">联调完成</customer-button>
      </div>
    </div>
    <div class="tm-body">
      <div class="fl">
        <div class="scroll-top-component">
          <ul>
            <li :class="{active : index === active}" v-for="(item,index) in text" :key="index" @click="gototitle(item)">{{item}}</li>
          </ul>
        </div>
      </div>
      <div class="fr">

      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'caseDetail',
    data(){
      return {
        text: ['基本信息','参数值','主体证明材料','文书与证据']
      }
    },
    methods: {
      gototitle(title){

      }
    }
  }
</script>

<style lang="scss" >
  .template-joint-caseDetail{
    .tm-head{
      background-color: #fff;
      height: 50px;
      box-sizing: border-box;
      border-bottom: 1px solid #e0e4e8;
      .fl{
        color: #0f357f;
        padding-left: 18px;
        line-height: 50px;
        font-size: 26px;
      }
      .fr{
        margin-top: 10px;
        margin-right: 45px;
      }
    }
    .scroll-top-component{
      box-sizing: border-box;
      height: 100%;
      border-right: 1px solid #ccc;
      background:#FAFAFA;
      width: 200px;
      position: fixed;
      li{
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-bottom: 1px solid #ccc;
        cursor: pointer;
        width: 200px;
        border-right: 1px solid transparent;
      }
      .active{
        color: #0F357F;
        border-right: none;
      }
    }
  }
</style>
