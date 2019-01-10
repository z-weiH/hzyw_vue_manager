<template>
    <div class="dataManagementEdit">
      <div class="wsbodyhead">
        <a>客户管理 </a>
        <a href="javascript:;" class="aside_tit">模拟数据设置 </a>
        <a href="javascript:;" class="aside_tit">数据详情</a>
      </div>
      <div class="parameter-page">
        <div class="m-c1">
          <div class="parameters " :class="{active : paramLevel === 0}">
            <span @click="setParamLevel(0)" class="cursor">案件参数</span>
          </div>
          <div class="parameters bl" :class="{active : paramLevel === 1}">
            <span @click="setParamLevel(1)" class="cursor">仲裁参数</span>
          </div>
          <div class="parameters bl" :class="{active : paramLevel === 2}">
            <span @click="setParamLevel(2)" class="cursor">个性参数</span>
          </div>
        </div>
      </div>
        <template v-if="paramLevel === 0">
          <div class="tm-content">
            <div class="fl">
              <scrollTop scrollClass=".edit-scroll .el-scrollbar__wrap" :text="text"></scrollTop>
            </div>
            <div class="fr mcont-right">
              <div class="m-scrollbar-box">
                <el-scrollbar class="edit-scroll" style="height: calc(100vh - 160px)">
                  <div>

                    <template v-for="(item,index) in list1" >

                      <div class="m-table-item" :key="index">
                        <div class="m-title">
                          <div class="fl scroll-top-item add-text">{{item.categoryText}}</div>
                          <div class="fr">
                          </div>
                        </div>

                        <div>
                          <el-table
                            :data="item.list"
                            border
                            class="mt-20 mb-20"
                          >
                            <el-table-column prop="date" label="序号" width="50px">
                              <template slot-scope="scope">
                                {{scope.$index + 1}}
                              </template>
                            </el-table-column>
                            <el-table-column prop="paramCode" label="参数"></el-table-column>
                            <el-table-column prop="paramName" label="中文"></el-table-column>
                            <el-table-column prop="paramNote" label="值">
                              <template slot-scope="scope">
                                <el-input v-model="scope.row.paramValue" ></el-input>
                              </template>
                            </el-table-column>
                          </el-table>
                        </div>
                      </div>
                    </template>

                  </div>
                </el-scrollbar>
              </div>
            </div>


          </div>




        </template>
        <template v-if="paramLevel === 1">
          <div style="padding: 10px 30px;background: #fff;height: calc(100vh - 160px)">

            <p style="font-size: 16px;line-height: 30px;">仲裁参数</p>
            <el-table
              :data="list2"
              border
              class="mb-20 mt-10"
            >
              <el-table-column prop="date" label="序号" width="50px">
                <template slot-scope="scope">
                  {{scope.$index + 1}}
                </template>
              </el-table-column>
              <el-table-column prop="paramCode" label="参数"></el-table-column>
              <el-table-column prop="paramName" label="中文"></el-table-column>
              <el-table-column prop="paramNote" label="值">
                <template slot-scope="scope">
                  <el-input v-model="scope.row.paramValue" ></el-input>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </template>
        <template v-if="paramLevel === 2">
          <div class="tm-content">
            <div class="fl">
              <scrollTop scrollClass=".edit-scroll .el-scrollbar__wrap" :text="text3"></scrollTop>
            </div>
            <div class="fr mcont-right">
              <div class="m-scrollbar-box">
                <el-scrollbar class="edit-scroll" style="height: calc(100vh - 160px)">
                  <div>

                    <template v-for="(item,index) in list3" >

                      <div class="m-table-item" :key="index">
                        <div class="m-title">
                          <div class="fl scroll-top-item add-text">{{item.categoryText}}</div>
                          <div class="fr">
                          </div>
                        </div>

                        <div>
                          <el-table
                            :data="item.list"
                            border
                            class="mt-20 mb-20"
                          >
                            <el-table-column prop="date" label="序号" width="50px">
                              <template slot-scope="scope">
                                {{scope.$index + 1}}
                              </template>
                            </el-table-column>
                            <el-table-column prop="paramCode" label="参数"></el-table-column>
                            <el-table-column prop="paramName" label="中文"></el-table-column>
                            <el-table-column prop="paramNote" label="值">
                              <template slot-scope="scope">
                                <el-input v-model="scope.row.paramValue" ></el-input>
                              </template>
                            </el-table-column>
                          </el-table>
                        </div>
                      </div>
                    </template>

                  </div>
                </el-scrollbar>
              </div>
            </div>


          </div>
        </template>


      <div class="footerBtn" >
        <div class="btns-container">
          <div class="btns">
            <customer-button type="primary" @click="saveParametersHandle" >保 存</customer-button>
            <customer-button @click="goBack">取 消</customer-button>
          </div>
        </div>

      </div>

    </div>
</template>

<script>
  // 滚动插件
  import scrollTop from '@/components/scrollTop'
    export default {
        name: 'dataManagementEdit',
        components:{
          scrollTop
        },
        data(){
          return {
            paramLevel : 0,
            dataId: '',
            text: [],
            text3: [],
            list1: [],
            list2: [],
            list3: [],
            productList: [],
            oldParamsList: []
          }
        },
        methods:{


          goBack(){
            this.$router.push(`/main/dataManagement`);
          },

          saveParametersHandle(){

              this.$http.post('/templateData/saveTemplateDataById.htm', {list: this.oldParamsList}, {mheaders: true})
                .then(res => {
                  if (res.code === '0000') {
                    this.$message.success("修改成功");
                  }
                })
          },


          setParamLevel(paramLevel){
            this.$router.push(`/main/dataManagementDetail?dataId=${this.dataId}&paramLevel=${paramLevel}`);
            this.paramLevel = paramLevel;
            this.queryTemplateDataByDataId();
          },

          queryTemplateDataByDataId(){
            this.$http.post("/templateData/queryTemplateDataByDataId.htm",{dataId: this.dataId, paramBizType: this.paramLevel}).then(res => {
              this.oldParamsList = res.result;
              if(this.paramLevel === 0){
                this.list1 = [];
                const typeObj = {1:'基础信息', 2:'金额信息', 3:'当事人信息', 4:'日期信息', 5:'证据信息', 6:'还款信息', 7:'借款人银行卡信息' ,8:'分期贷信息', 9:'代偿信息'};
                res.result.list.forEach(it => {
                  let obj = this.list1.find(i => i.categoryCode === it.categoryCode);
                  if(obj){
                    obj.list.push(it);
                  }else{
                    this.list1.push({categoryCode: it.categoryCode, categoryText: typeObj[it.categoryCode],list: [it]});
                  }
                })
                this.text= this.list1.map(v => v.categoryText);
              }else if(this.paramLevel === 1){
                this.list2 = res.result.list;
              }else if(this.paramLevel === 2){
                this.list3 = [];
                res.result.list.forEach(it => {
                  let obj = this.list3.find(i => i.productId === it.productId);
                  if(obj){
                    obj.list.push(it);
                  }else{
                    this.list3.push({productId: it.productId,list: [it]});
                  }
                })
                this.list3.forEach(it => {
                  let item = this.productList.find(i => i.productId == it.productId);
                  console.log(this.productList); 
                  if(item){
                    it.categoryText = item.productName;
                  }
                })
                console.error(this.list3)
                this.text3= this.list3.map(v => v.categoryText);
              }
            })
          },

          initProduct(){
            return this.$http({
              method : 'post',
              url : '/param/queryProductList.htm',
              data : {
                // 1 查询全部 0 查询没有选择的产品
                hasPersonalParam : 1,
              },
            }).then((res) => {
              this.productList = res.result;
              return Promise.resolve(true);
            });
          }
        },
      created(){
          this.dataId = this.$route.query.dataId;
          this.paramLevel = +this.$route.query.paramLevel;
          this.initProduct().then(() => {
            this.queryTemplateDataByDataId();
          });
      }
    }
</script>

<style lang="scss">

  .dataManagementEdit{
    .tm-content{
      overflow: hidden;
      background: #fff;

      .mcont-right{
        width: calc(100% - 160px);
        box-sizing: border-box;
        padding-left: 60px;
      }
      .cp-title{
        font-size: 20px;
        padding: 30px 0;
        font-weight: bold;
      }
      .m-table-item{
        .m-title{
          line-height: 32px;
          overflow: hidden;
          .add-text{
            font-size: 16px;
          }
        }
      }
    }

    .parameter-page{
      .m-c1{
        display: flex;
        position: relative;
        height: 50px;
        background-color: #EEF3FF;
        line-height: 50px;
        font-size: 16px;
        border: 1px solid #ddd;
        .active{
          color: #0f357f;
        }
        .parameters{
          box-sizing: border-box;
          flex: 1;
          text-align: center;
        }
        .bl{
          border-left: 1px solid #ddd;
        }
      }
      .m-c2{
        border: 1px solid #ddd;
        border-top: none;
        padding: 10px;
        background-color: #fff;
      }
      .el-table td{
        cursor: pointer;
      }
    }

    .footerBtn{
      position: fixed;
      bottom: 30px;
      width: 100%;
      left: 0;
      height: 70px;
      .btns-container{
        width:1200px;
        margin: 0 auto;
        height: 100%;
      }
      .btns{
        margin-left: 240px;
        height: 100%;
        text-align: center;

      }
    }
  }
</style>
