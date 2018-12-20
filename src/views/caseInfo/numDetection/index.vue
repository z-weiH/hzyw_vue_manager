<template>
  <div class="num-detection">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">号码检测</a>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">号码检测</span>
    </div>

    <div class="item-table num-detection-cont">
      <template v-if="type === 1">
        <div class="font-center" style="padding-top: 100px;">
          <el-upload
            class="upload-box"
            :action="`${$host}/phoneDetect/uploadExcel.htm`"
            :show-file-list="false"
            :before-upload="uploadBefore"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :data="{
              token : token,
            }"
          >
            <el-button type="primary"><i class="el-icon-upload el-icon--right"></i>上传表格</el-button>
          </el-upload>
          <p class="mt-20">请上传由“案件列表”页导出的xlsx文件</p>
          <p class="mt-10">同时请确保未对表格中的“被申请人手机号”列作任何修改</p>
        </div>
      </template>

      <template v-if="type === 2">
        <div class="font-center" style="padding-top: 100px;">
          <p class="m-tit">正在检测...</p>
          <p class="m-num">{{progress.processed}}&nbsp;/&nbsp;{{progress.total}}</p>
          <mprogress :width="progress.processed / progress.total * 100" :height="20" class="mprogress"></mprogress>
        </div>
      </template>

      <template v-if="type === 3">
        <div class="m-table">
          <p class="m-tit mb-20">检测完成！表格已自动下载</p>
          <table
            class="m-primordial-table mt-10
              el-table el-table--fit el-table--border 
              el-table--enable-row-hover"
          >
            <tr>
              <td class="m-table-title">检测号码</td>
              <td>{{ruleForm.total || 0}}</td>
              <td class="m-table-title">耗时</td>
              <td>{{ruleForm.duration || 0}}秒</td>
              <td class="m-table-title">正常</td>
              <td>{{ruleForm.normal || 0}}</td>
            </tr>

            <tr>
              <td class="m-table-title">通话中</td>
              <td>{{ruleForm.calling || 0}}</td>
              <td class="m-table-title">关机</td>
              <td>{{ruleForm.poweroff || 0}}</td>
              <td class="m-table-title">长时间关机</td>
              <td>{{ruleForm.shutdown || 0}}</td>
            </tr>

            <tr>
              <td class="m-table-title">欠费</td>
              <td>{{ruleForm.owned || 0}}</td>
              <td class="m-table-title">无短信能力</td>
              <td>{{ruleForm.noSms || 0}}</td>
              <td class="m-table-title">空号</td>
              <td>{{ruleForm.dead || 0}}</td>
            </tr>

            <tr>
              <td class="m-table-title">不在网（空号）</td>
              <td>{{ruleForm.notInNet || 0}}</td>
              <td class="m-table-title">查询失败</td>
              <td>{{ruleForm.queryFail || 0}}</td>
              <td class="m-table-title">接口错误</td>
              <td>{{ruleForm.interfaceErr || 0}}</td>
            </tr>
          </table>

          <div class="mt-20">
            <el-upload
            class="upload-box"
            style="display:inline-block;"
            :action="`${$host}/phoneDetect/uploadExcel.htm`"
            :show-file-list="false"
            :before-upload="uploadBefore"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :data="{
              token : token,
            }"
          >
            <el-button type="primary">继续上传</el-button>
          </el-upload>

          <el-button @click="handleGoBack" style="margin-left: 60px;">返回</el-button>
          </div>
        </div>
      </template>
    </div>

    <div class="item-title of-hidden mt-10">
      <span class="item-title-sign">检测记录</span>
    </div>

    <div class="item-table">
      <el-table
        :data="tableData"
        border
      >
        <el-table-column prop="date" label="序号" width="50px">
          <template slot-scope="scope">
            {{scope.$index + 1}}
          </template>
        </el-table-column>
				<el-table-column prop="detecStartTime" label="检测时间"></el-table-column>
        <el-table-column prop="totalCount" label="检测总数"></el-table-column>
        <el-table-column prop="succCount" label="号码可用"></el-table-column>
        <el-table-column prop="failedCount" label="号码不可用"></el-table-column>
        <el-table-column prop="errorCount" label="检测错误"></el-table-column>
        <el-table-column prop="respondents" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleDownload(scope.row)" type="text">下载</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        class="mt-10 mb-10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>

    </div>
  </div>
</template>

<script>
  import mprogress from './modules/progress.vue'
  import exportFile from '@/assets/js/exportFile.js'
  export default {
    components : {
      mprogress,
    },
    data() {
      return {
        // 用户token
        token : (() => {
          try{
            return JSON.parse(localStorage.getItem('loginInfo')).token;
          }catch(err) {
            return '';
          }
        })(),
        // 当前状态： 1 - 上传表格 2 - 正在检测 3 - 检测完成
        type : 1,
        // 文件上传 loading
        pageLoading : '',
        ruleForm : {
          // 检测号码
          total : '',
          // 耗时
          duration : '',
          // 正常
          normal : '',
          // 通话中
          calling : '',
          // 关机
          poweroff : '',
          // 长时间关机
          shutdown : '',
          // 欠费
          owned : '',
          // 无短信能力
          noSms : '',
          // 空号
          dead : '',
          // 不在网（空号）
          notInNet : '',
          // 查询失败
          queryFail : '',
          // 接口错误
          interfaceErr : '',
        },
        progress : {
          // 当前检测的数量
          processed : 0,
          // 进度条总数
          total : 0,
        },

        // 表格数据
        tableData : [{}],
        // 数据总数
        total : 11,
        // 当前页数
        currentPage : 1,
        // 每页数量
				pageSize : 10,
      }
    },
    mounted() {
      this.initTableList();
    },
    methods : {
      // 点击返回
      handleGoBack() {
        this.type = 1;
      },
      // 点击下载
      handleDownload(row) {
        exportFile({
          url : '/phoneDetect/exportResult.htm',
          data : {
            detectId : row.detectId,
          },
        });
      },
      // 定时器 轮询逻辑
      timerFn(detectId) {
        this.$http({
          method : 'post',
          url : '/phoneDetect/detectNum.htm',
          data : {
            detectId,
          },
        }).then((res) => {
          this.progress = {
            processed : res.result.processed,
            total : res.result.total,
          };

          // 进度100%
          if(res.result.processed === res.result.total) {
            let loading = this.$loading({
              text : '下载准备中...'
            });
            setTimeout(() => {
              this.type = 3;
              this.uploadDetail(detectId);
              loading.close();
            },3000);
          }else{
            setTimeout(() => {
              this.timerFn(detectId);
            },1000);
          }
        });
      },
      // 轮询结束 获取详情
      uploadDetail(detectId) {
        this.$http({
          method : 'post',
          url : '/phoneDetect/statistics.htm',
          data : {
            detectId,
          },
        }).then((res) => {
          let ruleForm = {
            duration : res.result.duration,
            total : res.result.total,
          };
          // 数据处理
          res.result.list.map((v,k) => {
            let key;
            if(v.statusCode === 0) {
              key = 'queryFail';
            }else if(v.statusCode === 1) {
              key = 'normal';
            }else if(v.statusCode === 2) {
              key = 'dead';
            }else if(v.statusCode === 3) {
              key = 'calling';
            }else if(v.statusCode === 4) {
              key = 'notInNet';
            }else if(v.statusCode === 5) {
              key = 'poweroff';
            }else if(v.statusCode === 11) {
              key = 'noSms';
            }else if(v.statusCode === 13) {
              key = 'owned';
            }else if(v.statusCode === 27) {
              key = 'shutdown';
            }else if(v.statusCode === 999) {
              key = 'interfaceErr';
            }
            ruleForm[key] = v.num;
          });

          this.ruleForm = Object.assign(this.ruleForm,ruleForm);
        });

        // 执行下载逻辑
        this.handleDownload({detectId});
        // 刷新表格数据
        this.currentPage = 1;
        this.initTableList();
      },


      // 文件上传前回调
      uploadBefore(file) {
        let fileType = file.name.split('.').pop();
        let arr = ['xlsx'];
        if(arr.indexOf(fileType) === -1){
          this.$message.warning('文件格式有误');
          return false;
        }
        this.pageLoading = this.$loading();
        return true;
      },
      // 文件上传成功
      uploadSuccess(res, file, fileList) {
        this.pageLoading.close();
        this.type = 2;
        // 清空进度条
        this.progress = {
          processed : 0,
          total : 0,
        };
        this.timerFn(res.result);
      },
      // 文件上传失败
      uploadError() {
        this.pageLoading.close();
        this.$message.error('文件上传失败，请稍后重试');
      },



      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : '/phoneDetect/phoneDetectionStatisticsBaseQuery.htm',
          method : 'post',
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,
          },
        }).then((res) => {
          this.total = res.result.count;
          this.tableData = res.result.list;
        });
      },
      // 页数 change
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.initTableList();
      },
      // 分页 change
      handleCurrentChange(val) {
        this.currentPage = val; 
        this.initTableList();
      },

      // 表格相关 end
    },
  }
</script>

<style lang="scss" scoped>

.num-detection{
  .font-center{
    text-align: center;
  }
  .m-tit{
    font-size: 16px;
    font-weight: bold;
  }

  .num-detection-cont{
    height: 300px;
    .mprogress{
      width: 600px;
      margin: 0 auto;
    }
    .m-num{
      width: 600px;
      text-align: right;
      margin: 0 auto;
      margin-top: 30px;
      margin-bottom: 10px;
    }
  }

  .m-primordial-table tr:hover{
    background-color: #fff;
  }
  .m-table{
    width: 800px;
    margin: 0 auto;
    text-align: center;
    padding-top: 40px;
  }
  .m-table-title{
    background-color: #f5f7fa;
  }

}

</style>