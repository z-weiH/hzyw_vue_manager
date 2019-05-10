<template>
  <div class="template-history-wrap">
    <div class="template-history-content">
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        content : ''
      }
    },
    mounted() {
      this.$http({
        method : 'post',
        url : '/document/queryTemplateDocumentLogByDocumentLogId.htm',
        data : {
          documentLogId : this.$route.query.documentLogId,
        },
      }).then(res => {
        this.content = res.result.documentContent;
      });
    },
  }
</script>

<style lang="scss" scoped>

.template-history-wrap{
  height: 100vh;
  overflow: auto;
  .template-history-content{
    width: 1200px;
    margin: 0 auto;
    margin-top: 50px;
    word-wrap: break-word;
  }
}

</style>