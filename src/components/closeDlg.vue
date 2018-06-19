<template>
  <div class="dlgBg">
    <div class="closeDlg">
        <div class="dlgText">
          <p>{{message}}</p>
          <p>{{minNum}}s后自动关闭</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'closeDlg',
  props: {
    message: {
      type: String,
      default(){
        return '已完成签名审核，请关闭本页'
      }
    },
  },
  data() {
    return {
      minNum: 3,
      timer: null
    }
  },
  mounted() {
    this.minNum =3;
    if(this.timer){
      clearInterval(this.timer);
    }
    this.timer = setInterval(() => {
      this.minNum --;
      console.log(this.minNum);
      if(this.minNum === 0){
        clearInterval(this.timer);
        setTimeout(() => {
          window.close();
        },700)
      }
    },1000)
  }
}
</script>

<style scoped lang="scss">
  .closeDlg{
    width: 500px;
    height: 305px;
    border: 2px solid #EEF0F2;
    border-radius: 5px;
    margin: 200px auto;
    background:#fff;
    font-size: 16px;
    text-align: center;
    color: #666;
    .dlgText{
      p{
        line-height: 24px;
      }
      margin-top:120px;
    }
  }
  .dlgBg{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: #F7F7F7;
    z-index: 99999;
  }
</style>
