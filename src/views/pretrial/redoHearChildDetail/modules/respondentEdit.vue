<template>
  <el-dialog
    :visible.sync="show"
    v-dialogDrag
    title="信息修正"
    width="545px"
    center>
    <div style="text-align: center;">
      <!--<img style="width:400px;height: 250px;" :src="currentRespodent.imgUrl" alt="">-->
      <div style="position: relative;width:400px;height:250px;margin-left: 44px;">
        <img-zoom :src="currentRespodent.imgUrl+ '?x-oss-process=image/resize,h_250/auto-orient,1/rotate,0'" width="400" height="250" :bigsrc="currentRespodent.imgUrl+'?x-oss-process=image/resize,h_1227/auto-orient,1/rotate,0'" :configs="configs"></img-zoom>
      </div>

      <div class="edit" style="margin: 20px 0;width:400px;margin-left:44px;">
        <edits ref="edits" :edit-items="respondentEditItems" :item="respondentItem" :label-width="'60px'"></edits>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="handleRespondentEdit">确 定</el-button>
          <el-button @click="$parent.respondentEditFlag = false">取 消</el-button>
        </span>
  </el-dialog>
</template>

<script>
  import imgZoom from "@/components/v-zoom"
  import Edits from '@/components/edits'
    export default {
      name: 'respondentEdit',
      props:{
        currentRespodent:Object,
        respondentItem:Object,

      },
      data(){
        return {


          //放大鏡涉案hi之
          configs: {
            width:400,
            height:250,
            maskWidth:133.5,
            maskHeight:83.5,
            maskColor:'#fff',
            maskOpacity:0.2
          },


          respondentEditItems:[
            {type: 'text', property:'resName', label: '姓名',rule:'require', hidden:() => this.$parent.respondentEidtConfig.nameStatus === 1},
            {type: 'select', property:'resSex', label: '性别', rule:'require',options: [{label:'女',value: 0},{label:'男',value: 1}],hidden:() => this.$parent.respondentEidtConfig.sexStatus === 1},
            {type: 'select', property:'resNation', label: '民族', options: [],rule:'require',hidden:() => this.$parent.respondentEidtConfig.nationStatus === 1},
            {type: 'text', property:'resIdaddress', label: '住址', rule:'require',hidden:() => this.$parent.respondentEidtConfig.idaddressStatus === 1},
            {type: 'text', property:'resIdcard', label: '证号',rule:'require,certificate',hidden:() => this.$parent.respondentEidtConfig.idcardStatus === 1},
          ],
        }
      },
      methods:{
        handleRespondentEdit(){

          this.$refs.edits.$refs.editsform.validate((valid) => {
            if(valid){
              this.$http.post("/firstAudit/respondentModified.htm",{cardList:[this.respondentItem],caseId:this.currentRespodent.caseId,resId:this.currentRespodent.resId},{mheaders: true}).then(res => {
                if(res.code === '0000'){
                  this.$message.success("修改成功");
                  this.$parent.queryCountAgainAuditCase();
                  this.$parent.respondentEditFlag = false;
                  if(this.$parent.HandleQuery && this.$parent.HandleQuery instanceof Function){
                    this.$parent.HandleQuery();
                  }
                  if(this.$parent.getRecheckDetail && this.$parent.getRecheckDetail instanceof Function){
                    this.$parent.getRecheckDetail();
                  }
                }
              })
            }
          })

        },
      },
      components:{
        Edits,
        imgZoom
      },
      computed:{
        show :{
          get: function () {
            return this.$parent.respondentEditFlag;
          },
          set: function (v) {
            if(!v)
              this.$parent.respondentEditFlag = false;
          }
        }
      },
      created(){
        // this.getRespodent();
        let arr = ["汉","蒙古","回","藏","维吾尔","苗","彝","壮","布依","朝鲜","满","侗","瑶","白","土家",
          "哈尼","哈萨克","傣","黎","傈僳","佤","畲","高山","拉祜","水","东乡","纳西","景颇","柯尔克孜",
          "土","达斡尔","仫佬","羌","布朗","撒拉","毛南","仡佬","锡伯","阿昌","普米","塔吉克","怒", "乌孜别克",
          "俄罗斯","鄂温克","德昂","保安","裕固","京","塔塔尔","独龙","鄂伦春","赫哲","门巴","珞巴","基诺"];
        let item = this.respondentEditItems.find(it => it.property === 'resNation');
        if(item){
          item.options = [];
          arr.forEach( it => {
            item.options.push({label: it ,value: it});
          })
        }
      }
    }
</script>

<style scoped>

</style>
