<template>
    <div>
      <div>
        <div class="wsbodyhead">
          <a>所在位置</a>
          <a href="javascript:;" class="aside_tit">执行标的计算器</a>
        </div>

        <div class="flex_contianer">
          <div class="left_contianer">
            <ul class="form">
              <li>
                <div class="form-label">
                  <el-upload
                    class="upload-demo"
                    style="float: right;display: inline-block;cursor: pointer;"
                    :show-file-list="false"
                    :http-request="handleUpload"
                    accept=".xlsx,.xls"
                    action="123"
                  >
                    <el-button  size="small" type="text" >导入</el-button>
                  </el-upload>
                  仲裁案号
                </div>
                <div class="form-value">
                  <!--<el-select-->
                    <!--v-model="value"-->
                    <!--multiple-->
                    <!--filterable-->
                    <!--remote-->
                    <!--reserve-keyword-->
                    <!--placeholder="请输入或导入仲裁案号"-->
                    <!--:remote-method="remoteMethod"-->
                    <!--:loading="loading">-->
                    <!--<el-option-->
                      <!--v-for="item in options"-->
                      <!--:key="item.value"-->
                      <!--:label="item.label"-->
                      <!--:value="item.value">-->
                    <!--</el-option>-->
                  <!--</el-select>-->
                  <el-input v-model="caseNoWz" clearable :readonly="readonlyFlag" @clear="readonlyFlag = false"></el-input>
                </div>
              </li>
              <li>
                <div class="form-label">
                  日期
                </div>
                <div class="form-value">
                  <el-date-picker
                    v-model="date"
                    value-format="yyyy-MM-dd"
                    type="date"
                    placeholder="请选择执行标的计算截止日期">
                  </el-date-picker>
                </div>
              </li>

            </ul>
            <customer-button type="success" style="width: 100%;" @click="handleCalculator">计&nbsp;&nbsp;算</customer-button>
          </div>
          <div class="right_contianer">

            <div style="min-height: 500px;" v-if="!result || result.length === 0">
              <p style="margin-top: 150px;text-align: center;    font-weight: 700;
    font-style: normal;
    font-size: 18px;
    color: #CCCCCC;" >请在左侧录入仲裁案号及计算截止时间</p>
            </div>


            <div class="single" v-if="total === 1">
                <p class="title">
                  执行标的 &nbsp;&nbsp;&nbsp; {{result[0].subject}}元
                </p>
                <hr>
                <p class="desc">
                  <span>{{result[0].caseNoWz}}</span>
                  <span>{{result[0].date}}</span>
                </p>
              <div class="detail">
                <p>明细</p>
                <ul>
                  <li v-for="(item,idx) in result[0].details" :key="idx">
                    <span>{{item.feeDesc}}</span>
                    <span>{{item.feeAmount}}</span>
                  </li>
                  <!--<li>-->
                    <!--<span>剩余借款本金</span>-->
                    <!--<span></span>-->
                  <!--</li>-->
                  <!--<li>-->
                    <!--<span>利息</span>-->
                    <!--<span></span>-->
                  <!--</li>-->
                  <!--<li>-->
                    <!--<span>平台服务费</span>-->
                    <!--<span></span>-->
                  <!--</li>-->
                  <!--<li>-->
                    <!--<span>违约金</span>-->
                    <!--<span></span>-->
                  <!--</li>-->
                  <!--<li>-->
                    <!--<span>仲裁受理费</span>-->
                    <!--<span></span>-->
                  <!--</li>-->
                  <!--<li>-->
                    <!--<span>仲裁服务费</span>-->
                    <!--<span></span>-->
                  <!--</li>-->
                  <!--<li>-->
                    <!--<span>延迟履行的加倍罚息</span>-->
                    <!--<span></span>-->
                  <!--</li>-->
                </ul>

                <hr>
                <div class="amount">
                  <span>合计</span>
                  <span>{{result[0].subject}}</span>
                </div>
              </div>


            </div>

            <div class="double" style="padding: 10px; position: relative;" v-if="total > 1">
              <div class="detail_dialog" v-if="flag">
                <div class="detail">
                  <p>明细</p>
                  <ul>
                    <li v-for="(item,idx) in currentItem.details" :key="idx">
                      <span>{{item.feeDesc}}</span>
                      <span>{{item.feeAmount}}</span>
                    </li>
                    <!--<li>-->
                    <!--<span>剩余借款本金</span>-->
                    <!--<span></span>-->
                    <!--</li>-->
                    <!--<li>-->
                    <!--<span>利息</span>-->
                    <!--<span></span>-->
                    <!--</li>-->
                    <!--<li>-->
                    <!--<span>平台服务费</span>-->
                    <!--<span></span>-->
                    <!--</li>-->
                    <!--<li>-->
                    <!--<span>违约金</span>-->
                    <!--<span></span>-->
                    <!--</li>-->
                    <!--<li>-->
                    <!--<span>仲裁受理费</span>-->
                    <!--<span></span>-->
                    <!--</li>-->
                    <!--<li>-->
                    <!--<span>仲裁服务费</span>-->
                    <!--<span></span>-->
                    <!--</li>-->
                    <!--<li>-->
                    <!--<span>延迟履行的加倍罚息</span>-->
                    <!--<span></span>-->
                    <!--</li>-->
                  </ul>

                  <hr>
                  <div class="amount">
                    <span>合计</span>
                    <span>{{currentItem.subject}}</span>
                  </div>
                </div>
              </div>
              <el-table
                :data="result"

                style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="50">
                </el-table-column>

                <el-table-column
                  prop="caseNoWz"
                  label="仲裁案号"
                  >
                </el-table-column>
                <el-table-column
                  prop="date"
                  label="计算截止日期"
                  >
                </el-table-column>
                <el-table-column
                  prop="subject"
                  label="执行标的（元）"
                  >
                  <template slot-scope="scope">
                    {{scope.row.isJudged === 0 ? '案件在所选日期尚未裁决' : scope.row.subject}}
                  </template>
                </el-table-column>

                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button
                      type="text"
                      @mouseenter.native="handleShowDetail(scope.row)"
                      @mouseleave.native="handleHiddenDetail"
                      size="small">
                      查看明细
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>

              <customer-button @click="exportList" style="    position: absolute;margin-top: 2px;" type="primary">导出</customer-button>
              <el-pagination
                style="text-align: right;"
                background
                layout="total, prev, pager, next"
                :total="total">
              </el-pagination>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>

<script>
  import XLSX from 'xlsx';
  import moment from 'moment'
export default {
  name: 'index',
  data() {
    return {
      file: null,
      loading: false,
      options: [],
      caseNoWz: '',
      date: moment(new Date()).format("YYYY-MM-DD"),
      pager: {
        currentNum: 1,
        pageSize: 10,
      },
      readonlyFlag: false,
      flag: false,
      result: [],
      total: 0,
      currentItem: {},
      formdata: null
    }
  },
  methods:{
    exportList(){
      this.$http({
        method: 'post',
        url: '/execution/calcSubjectExport.htm',
        data: this.formdata,
        mheaders: true,
        header: {'Content-Type': 'multipart/form-data'},
        responseType: 'blob'
      }).then(res => {
        this.download(res)
      })
    },
    download (data) {
      if (!data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', '导出.xlsx')

      document.body.appendChild(link)
      link.click()
    },
    handleCalculator(){
      let formdata = new FormData();
      formdata.append("date", this.date);
      formdata.append("currentNum", 1);
      formdata.append("pageSize", 10);
      if(this.readonlyFlag){
        formdata.append("file", this.file);
      }else{
        formdata.append("caseNoWz", this.caseNoWz);
      }
      this.formdata = formdata;
      this.$http({
        method: 'post',
        url: '/execution/calcSubject.htm',
        data: formdata,
        mheaders: true,
        header: {'Content-Type': 'multipart/form-data'}
      }).then(res => {
        console.log(res);
        this.result = res.result.list;
        this.total = res.result.total;
      })
    },
    handleUpload(obj) {
      // let fileReader = new FileReader();
      // fileReader.readAsDataURL(obj.file);
      this.file = obj.file;
      const reader = new FileReader();
      reader.onload = (e) => {
        //7.获取文件二进制数据流
        let data = e.currentTarget.result;
        //8.利用XLSX解析二进制文件为xlsx对象
        let wb = XLSX.read(data,{type:'binary'})
        //9.利用XLSX把wb第一个sheet转换成JSON对象
        //wb.SheetNames[0]是获取Sheets中第一个Sheet的名字
        //wb.Sheets[Sheet名]获取第一个Sheet的数据
        let j_data = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
        //10.在终端输出查看结果
        console.log(j_data)
        this.caseNoWz = `共计${j_data.length}个`;
        this.readonlyFlag = true;

      }
      //6.使用reader对象以二进制读取文件对象f，
      reader.readAsBinaryString(this.file)
    },
    handleShowDetail(row){
      this.currentItem = row;
      console.log('mouseenter');
      this.flag= true;
    },
    handleHiddenDetail(){
      console.log('mouseleave')
      this.flag = false;
    }


  }
}
</script>

<style scoped lang="scss">
  .flex_contianer{
    display: flex;
    >div{
      border: 1px solid #CCCCCC;
      background: #fff;
      line-height: 30px;
      &.left_contianer{
        width: 270px;
        padding: 10px;
        margin-right: 10px;
        ul>li{
          margin-bottom: 15px;
        }
        height: 220px;
      }
      &.right_contianer{
        flex: 1;

      }
    }
    .single{
      padding: 0 120px 60px;
      p.title{
        font-size: 28px;
        font-weight: bold;
        text-align: center;
        line-height: 120px;
      }
      p.desc{
        padding: 0 50px;
        line-height: 32px;
        color: #999;
        font-size: 14px;
        display: flex;
        justify-content: space-between;
      }
    }
    div.detail_dialog{
      position: absolute;
      border: 1px solid #EBEEF5;
      width: 300px;
      height: auto;
      z-index: 99;
      right: 200px;
      top: 64px;
      background: #fff;
    }
    div.detail{
      margin: 0 auto;
      width: 280px;
      text-align: center;
      p{
        margin-top: 16px;
        line-height: 40px;
        font-weight: bold;
      }
      ul>li{
        display: flex;
        justify-content: space-between;
        color: #333;
        line-height: 42px;
      }
      div.amount{
        display: flex;
        justify-content: space-between;
        padding: 0 5px;
        line-height: 50px;
      }
    }

  }
</style>
