<template>
  <div class="contract-add-new-default">
    合同加款【财务人员】
    <el-button @click="handleExport">导出</el-button>
  </div>
</template>

<script>
  import exportFile from '@/assets/js/exportFile'
  export default {
    methods : {
      handleExport() {
        exportFile({
          url : 'http://118.31.39.65:8888/contractOrder/exportExcel.htm',
          data : {
            keyWords : '',
            startTime : '',
            endTime : '',
            orderStatus : '',
          },
        });
      },
    },
  }
</script>

<style lang="scss" scoped>

.contract-add-new-default{

}

</style>