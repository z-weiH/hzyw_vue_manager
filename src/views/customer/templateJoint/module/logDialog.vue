<template>
  <el-dialog title="联调日志" class="logDialog"  :visible.sync="outerVisible" width="735px">
    <el-dialog
      title="添加日志"
      :visible.sync="innerVisible"
      append-to-body width="550px">

      <p>请填写日志内容。</p>
      <el-input type="textarea" v-model="remark" placeholder="请输入"></el-input>

      <div slot="footer" class="dialog-footer">
        <customer-button type="primary" @click="handleLogAdd">确 定</customer-button>
        <customer-button @click="innerVisible = false">取 消</customer-button>

      </div>

    </el-dialog>


    <div class="dialog-content" v-if="logList.length > 0">
      <div class="title">
        <div class="fl">时间</div>
        <div class="fl">操作人</div>
        <div class="fl">操作</div>
        <div class="fl">状态更新</div>
        <div class="fl">备注</div>

      </div>
      <hr>
      <div class="content">
        <el-scrollbar  :class="{'showHidden': logList.length > 10}">
          <div class="li" v-for="(item,idx) in logList" :index="idx" >
            <div class="fl">{{item.createTime}}</div>
            <div class="fl ellipsis">{{item.userName}}</div>
            <div class="fl">
             {{item.operInfo}}

            </div>
            <div class="fl">
                {{debugStatusObject[item.debugStatus] ? debugStatusObject[item.debugStatus] : '-' }}
            </div>
            <div class="fl">{{item.remark ? item.remark : '（无）'}}</div>
          </div>

        </el-scrollbar>
      </div>

    </div>
    <div class="dialog-content" v-else style="text-align: center;padding: 30px 0;">
      当前案件暂无已联调日志
    </div>

    <div slot="footer" class="dialog-footer">
      <customer-button type="primary" @click="innerVisible = true;remark= '';">添加日志</customer-button>
      <customer-button @click="outerVisible = false">取 消</customer-button>

    </div>
  </el-dialog>
</template>

<script>
    export default {
        name: 'logDialog',
        data(){
          return {
            // 1-待设置 2-联调中 3-待法务确认 4-联调通过
            debugStatusObject: {1: '待设置', 2: '联调中', 3: '待法务确认' , 4: '联调通过' },
            outerVisible: false,
            innerVisible: false,
            logList: [],
            prodTempId: '',
            remark: ''
          }
        },
      methods:{
        show(prodTempId){
          this.prodTempId = prodTempId;
          this.doQuery();
        },
        doQuery(){
          this.$http.post("/templateDebugLog/queryTemplateDebugLogList.htm",{prodTempId: this.prodTempId}).then(res => {
            this.logList = res.result;
            this.outerVisible = true;
          })
        },
        handleLogAdd(){
          this.$http.post("/templateDebugLog/saveTemplateDebugLog.htm",{prodTempId: this.prodTempId,remark: this.remark}).then(res => {
            this.innerVisible = false;
            this.doQuery();
          })
        }
      }
    }
</script>

<style lang="scss" scoped >
  .dialog-content{
  .title{
  .fl{
    font-size: 16px;
    font-weight: bold;

  }


  }
  hr{
    margin: 10px 0;
    clear: both;
  }
  }
  .content .li{
    margin: 10px 0;
  }
  .content .li::after{
    content: '';
    display: block;
    clear: both;
  }

  .title .fl, .content .li .fl {
    &:nth-child(1) {
      width: 160px;
    }
    &:nth-child(2) {
      width: 120px;
    }
    &:nth-child(3), &:nth-child(4) {
      width: 120px;
    }
    &:nth-child(5) {
      width: 165px;
    }
  }
</style>
