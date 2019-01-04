<template>
    <div class="jointOpinion">
      <el-dialog title="查看联调意见" class="logDialog"  :visible.sync="outerVisible" width="735px">
        <el-dialog
          :title="title"
          :visible.sync="innerVisible"
          append-to-body width="550px">

          <el-form ref="form" :rules="rules" :model="currentItem">
            <el-form-item label="联调意见" label-width="100px" prop="opinion">
              <el-input type="textarea" style="width:400px;" v-model="currentItem.opinion" placeholder="请输入"></el-input>
            </el-form-item>
          </el-form>


          <div slot="footer" class="dialog-footer">
            <customer-button type="primary" @click="handleLogAdd">确 定</customer-button>
            <customer-button @click="innerVisible = false;">取 消</customer-button>

          </div>

        </el-dialog>


        <div class="dialog-content" v-if="logList.length > 0">
          <div class="title">
            <div class="fl">联调意见</div>
            <div class="fl">操作</div>

          </div>
          <hr >
          <div class="content">
            <el-scrollbar  :class="{'showHidden': logList.length > 10}">
              <div class="li" v-for="(item,idx) in logList" :index="idx" >
                <div class="fl">{{item.opinion}}</div>

                <div class="fl">
                  <span class="colLink mr-10" style="text-decoration: none;" @click="handleEdit(item)">修改</span>
                  <span class="colLink" style="text-decoration: none;" @click="handleDelete(item,idx)">删除</span>
                </div>
              </div>

            </el-scrollbar>
          </div>

        </div>
        <div class="dialog-content" v-else style="text-align: center;padding: 30px 0;">
          当前案件暂无已联调意见
        </div>

        <div slot="footer" class="dialog-footer">
          <customer-button type="primary" @click="innerVisible = true;title='添加联调意见';currentItem = {};">添加联调意见</customer-button>
          <customer-button @click="exportOptions">导 出</customer-button>
          <customer-button @click="outerVisible = false">关 闭</customer-button>

        </div>
      </el-dialog>
    </div>
</template>

<script>
  import exportFile from "@/assets/js/exportFile";
  export default {
        name: 'jointOpinion',
      data(){
          return {
            innerVisible: false,
            outerVisible: false,
            logList: [],
            caseOrderId: '',
            title: '',
            currentItem: {opinion: ''},
            rules : {
              opinion : [
                {required : true , message : '请输入联调意见' , trigger : 'blur'},
              ],
            },
          }
      },
      watch:{
          'innerVisible'(val,oldval){
            if(!val){
              this.$refs.form.resetFields();
            }
          }
      },
      methods:{

        handleEdit(item){
          this.title= '修改联调意见';
          this.currentItem = {...item};
          this.innerVisible = true;
        },
        handleDelete(item,idx){
          this.$confirm("确定删除该条件?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            center: true
          }).then(() => {
            this.$http.post('/caseDebugLog/deleteCaseDebugOpinion.htm',{id: item.id}).then(res => {
              this.$message.success("删除成功");
              this.logList.splice(idx,1);
            })
          })
        },

        handleLogAdd(){
          this.$refs.form.validate(r => {
            if(r){
              this.$http.post("/caseDebugLog/saveCaseDebugOpinion.htm",{...this.currentItem, caseOrderId: this.caseOrderId}).then(res => {
                this.innerVisible = false;
                this.$http.post("/caseDebugLog/queryCaseDebugOpinionList.htm",{caseOrderId: this.caseOrderId}).then(res => {
                  this.logList = res.result.result;
                })
              })
            }
          })

        },
        exportOptions(){
          exportFile({
            url: "/caseDebugLog/downloadCaseDebugOpinion.htm",
            data: {caseOrderId: this.caseOrderId}
          });
        },
          show(caseOrderId){
            this.caseOrderId = caseOrderId;
            this.$http.post("/caseDebugLog/queryCaseDebugOpinionList.htm",{caseOrderId: this.caseOrderId}).then(res => {
              this.logList = res.result.result;
              this.outerVisible = true;
            })
          }
      }
    }
</script>

<style lang="scss">
.jointOpinion{
  .title{
    overflow: hidden;
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
    width: 530px;
  }


  &:nth-child(2) {
    width: 165px;
    text-align: center;
  }
}
</style>
