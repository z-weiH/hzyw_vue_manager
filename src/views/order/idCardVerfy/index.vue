<template>
  <div class="id-card-verfy fn-hide">
    <div class="item-search">
      <span>Excel文件(最多查100条)：</span>
      <el-button class="file-inut-box"  icon='el-icon-upload'>
        点击这里上传文件
        <input ref="file" @change="handleSuccess" class="m-file-input" type="file" />
      </el-button>
      {{fileName}}

      <el-button @click="handleSearch" type="warning">查询</el-button>
    </div>

    <div class="item-title">身份证校验</div>

    <div class="item-table">
      <ul>
        <template v-for="(item,index) in tableList">
          <li class="m-list" :key="item.id">
            <div class="left m-bg">
              <a target="_blank" :href="item.img01">
                <img :src="item.img01" />
              </a>
            </div>
            <div class="m-center">
              <ul>
                <li>序号:{{index + 1}}</li>
                <li>被申请人信息</li>
                <li>{{item.name}}</li>
                <li>{{item.sex === 0 ? '女' : '男'}}</li>
                <li>{{item.idaddress}}</li>
                <li>{{item.idcard}}</li>
                <li>{{item.loanbillno}}</li>
              </ul>
              <div class="mt-20">
                <el-button size="small" type="primary" @click="handleExamine(item)">审核意见</el-button>
              </div>
            </div>
            <div class="right m-bg">
              <a target="_blank" :href="item.img02">
                <img :src="item.img02" />
              </a>
            </div>
          </li>
        </template>
      </ul>
    </div>
  
    <c-dialog @successCBK="successCBK" ref="dialog"></c-dialog>
  </div>
</template>

<script>
  import dialog from './modules/dialog.vue'
  export default {
    components : {
      'c-dialog' : dialog,
    }, 
    data() {
      return {
        // 文件流
        file : '',
        // 文件名称
        fileName : '',
        // 表格数据
        tableList : [],
      }
    },
    methods: {
      initList() {
        let formDate = new FormData();
        formDate.append('file',this.file);
        this.$http({
          method : 'post',
          url : '/order/getList.htm',
          data : formDate,
          mheaders : true,
        }).then((res) => {
          this.tableList = res.result.list;
        });
      },
      // 文件上传
      handleSuccess(event) {
        let file = event.target.files[0];
        event.target.value = '';
        let fileType = file.name.split('.').pop().toLowerCase();
        let arr = ['xlsx'];
        if(arr.indexOf(fileType) === -1){
          this.$message.warning('文件格式有误');
          return;
        }
        this.file = file;
        this.fileName = file.name;
      },
      // 点击搜索
      handleSearch() {
        if(!this.file){
          this.$message.warning('请上传文件');
          return;
        }
        this.initList();
      },
      // 点击审核
      handleExamine(row) {
        this.$refs.dialog.show(row);
      },
      // 审核成功 回调
      successCBK() {
        this.initList();
      },
    },
  }
</script>

<style lang="scss" scoped>

.id-card-verfy{
  .item-table{
    padding-top: 20px;
  }
  .m-list{
    height: 250px;
    overflow: hidden;
    margin-bottom: 20px;
    border: 1px solid #DEDEDE;
    .m-bg{
      background-color: #EEF3FF;
    }
    >div{
      float: left;
      height: 100%;
    }
    .left , .right{
      width: 350px;
      text-align: center;
      img{
        width: 325px;
        height: 200px;
        margin-top: 25px;
      }
    }
    .m-center{
      width: calc(100% - 700px);
      text-align: center;
      border: 1px solid #DEDEDE;
      box-sizing: border-box;
      border-bottom: none;
      border-top: none;
      >ul{

        li{
          border-bottom: 1px solid #DEDEDE;
          line-height: 22px;
          min-height: 22px;
        }
      }
    }
    .right{
      width: 350px;
    }
  }
  /* 上传 样式 */
  .file-inut-box{
    position: relative;
    overflow: hidden;
    .m-file-input{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }
}

</style>