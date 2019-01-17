<template>
    <div class="loanBillNoCopy">
        <span>{{loanBillNo}}</span>
        <customer-button class="copy_button" @click="copyContent" size="mini" >复制</customer-button>
    </div>
</template>

<script>
  import copy from '@/assets/js/copy.js'
  export default {
    name: 'loanBillNoCopy',
    props:{
      loanBillNo: {
        type: String,
        required: true
      }
    },
    methods:{
      copyContent(){
        copy(this.loanBillNo, () => {this.$message.success("复制成功")});
      }
    }
  }
</script>

<style lang="scss">
  .loanBillNoCopy{
    position: relative;
    display: inline-block;
    padding: 5px 10px;
    color: #666;
    text-align: center;
    .copy_button{
      display: none;
    }
    &:hover{
      .copy_button{
        display: block;
        position: absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%,-50%);
      }
    }

  }
</style>
