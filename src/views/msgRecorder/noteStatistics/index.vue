<template>
  <div class="note-statistics">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">短信统计</a>
    </div>

    <div class="item-search">
      <el-form :inline="true" ref="searchForm" :model="searchForm" label-width="0px">
        
        <el-row>
          <el-form-item label="发送日期：" label-width="100px">
            <timeFrame
              :startDate.sync="searchForm.beginSendTime"
              :endDate.sync="searchForm.endSendTime"
            >
            </timeFrame>

          </el-form-item>
          <el-form-item>
            <el-input style="width:200px;" v-model.trim="searchForm.keyWords" placeholder="手机号码"></el-input>
          </el-form-item>
        </el-row>

        <el-row>
          <el-form-item label="短信类型：" label-width="100px">
            <el-select clearable style="width:144px;" v-model="searchForm.messageType" placeholder="请选择">
              <el-option label="提交短信" :value="1"></el-option>
              <el-option label="应裁通知" :value="2"></el-option>
              <el-option label="组庭通知" :value="3"></el-option>
              <el-option label="裁决通知" :value="4"></el-option>
              <el-option label="验证码" :value="5"></el-option>
              <el-option label="生成账号" :value="6"></el-option>
              <el-option label="调解短信" :value="7"></el-option>
              <el-option label="仲裁闪信" :value="8"></el-option>
              <el-option label="调解闪信" :value="9"></el-option>
              <el-option label="补充证据" :value="10"></el-option>
              <el-option label="受理通知" :value="11"></el-option>
              <el-option label="其他" :value="0"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="运营商：" label-width="100px">
            <el-select clearable style="width:144px;" v-model="searchForm.carrier" placeholder="请选择">
              <el-option label="中国移动" value="中国移动"></el-option>
              <el-option label="中国电信" value="中国电信"></el-option>
              <el-option label="中国联通" value="中国联通"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="发送状态：" label-width="100px">
            <el-select clearable style="width:144px;" v-model="searchForm.sendResult" placeholder="请选择">
              <el-option label="待发送" :value="2"></el-option>
              <el-option label="成功" :value="0"></el-option>
              <el-option label="失败" :value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="接收状态：" label-width="100px">
            <el-select clearable style="width:144px;" v-model="searchForm.receiveResult" placeholder="请选择">
              <el-option label="待发送" :value="2"></el-option>
              <el-option label="成功" :value="0"></el-option>
              <el-option label="失败" :value="1"></el-option>
            </el-select>
          </el-form-item>

          <el-button @click="search" type="warning">查询</el-button>
        </el-row>
      </el-form>
    </div>

    <div class="item-table">
      <div class="change-wrap">
        <div :class="{active : active === true}" @click="handleStatus(true)" class="fl note-list cursor">短信统计</div>
        <div :class="{active : active === false}" @click="handleStatus(false)" class="statistics cursor">短信列表</div>
      </div>

      <!-- 短信列表 -->
      <div v-if="active === false" key="1">
        <el-table
          :data="tableData"
          border
        >
          <el-table-column prop="sendTime" label="发送日期"></el-table-column>
          <el-table-column prop="sendPhone" label="发送号码"></el-table-column>
          <el-table-column prop="carrier" label="所属运营商">
            <template v-slot="scope">{{scope.row.carrier || '--'}}</template>
          </el-table-column>
          <el-table-column prop="province" label="所属省份">
            <template v-slot="scope">{{scope.row.province || '--'}}</template>
          </el-table-column>
          <el-table-column prop="messageTypeDesc" label="短信类型"></el-table-column>
          <el-table-column prop="sendResultDesc" label="发送状态"></el-table-column>
          <el-table-column prop="receiveResultDesc" label="接收状态"></el-table-column>
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
      <!-- 短信统计 -->
      <div v-else key="2">
        <div class="statistics-wrap">
          <p class="color-blue mb-20">短信接收成功统计情况：</p>
          <!-- 成功 -->
          <el-table
            :data="tableSuccessData"
            border
            class="mb-20"
          >
            <el-table-column prop="carrier" label="运营商"></el-table-column>
            <el-table-column prop="allCount" label="短信数量"></el-table-column>
            <el-table-column prop="successCount" label="接收成功数量"></el-table-column>
            <el-table-column prop="failCount" label="接收失败数量"></el-table-column>
            <el-table-column label="成功率">
              <template v-slot="scope">
                {{computeSuccess(scope.row.successCount)}}%
              </template>
            </el-table-column>
            <el-table-column label="失败率">
              <template v-slot="scope">
                {{computeError(scope.row.failCount)}}%
              </template>
            </el-table-column>
          </el-table>
          <p class="color-blue mb-20">短信接收失败统计情况：</p>
          <!-- 失败 -->
          <el-table
            :data="tableErrorData"
            border
            class="mb-20"
            :span-method="arraySpanMethod"
          >
            <el-table-column prop="carrier" label="所属运营商">
              <template v-slot="scope">{{scope.row.carrier || '其他'}}</template>
            </el-table-column>
            <el-table-column prop="returnDetails" label="失败原因"></el-table-column>
            <el-table-column prop="count" label="失败数量"></el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  import tableMixins from '@/assets/js/tableMixins.js'
  export default {
    mixins : [tableMixins({url : '/send/queryMessageSendCountPage.htm' , init : false})],
    components : {
			timeFrame,
		},
    data() {
      return {
        active : true,

        searchForm : {
          // 开始日期
          beginSendTime : '',
          // 结束日期
          endSendTime : '',
          // 手机号码
          keyWords : '',
          // 短信类型
          messageType : '',
          // 运营商
          carrier : '',
          // 发送状态
          sendResult : '',
          // 接收状态
          receiveResult : '',
        },

        tableSuccessData : [
          /* {
            carrier : '中国移动',
          },
          {
            carrier : '中国电信',
          },
          {
            carrier : '中国联通',
          },
          {
            carrier : '其他',
          },
          {
            carrier : '汇总：',
          }, */
        ],
        tableErrorData : [
          /* {
            carrier : '中国移动',
          },
          {
            carrier : '中国移动',
          },
          {
            carrier : '中国电信',
          },
          {
            carrier : '中国电信',
          },
          {
            carrier : '中国联通',
          },
          {
            carrier : '中国联通',
          },
          {
            carrier : '其他',
          },
          {
            carrier : '其他',
          }, */
        ],
      }
    },
    mounted() {
      this.search();
    },
    methods : {
      handleStatus(val) {
        // 点击相同 tabs
        if(val === this.active) {
          return;
        }
        this.active = !this.active;
        this.search();
      },
      // 获取统计数据
      queryStatisticsDate() {
        // 成功
        let success = () => {
          return this.$http({
            url : '/send/queryMessageSendSuccCount.htm',
            method : 'post',
            data : this.searchForm,
          }).then((res) => {
            let arr = [];
            let hj = res.result.reduce((n,v) => {
              // 其他
              if(!v.carrier) {
                v.carrier = '其他';
              }
              arr.push(v);
              return {
                allCount : n.allCount += v.allCount,
                successCount : n.successCount += v.successCount,
                failCount : n.failCount += v.failCount,
              }
            },{allCount : 0 , successCount : 0 , failCount : 0});
            arr.length > 0 && arr.push({
              carrier : '汇总：',
              ...hj,
            });
            this.tableSuccessData = arr;
          });
        };
        // 失败
        let error = () => {
          return this.$http({
            url : '/send/queryMessageReceiveFailure.htm',
            method : 'post',
            data : this.searchForm,
          }).then((res) => {
            let hj = res.result.reduce((n,v) => {
              return n + v.count
            },0);
            res.result.length > 0 && res.result.push({
              carrier : '汇总：',
              count : hj,
            });
            this.tableErrorData = res.result;
          });
        };

        Promise.all([success(),error()]).then(() => {

        }).catch(() => {

        });
      },
      // 计算成功率
      computeSuccess(successCount) {
        return ((successCount / this.tableSuccessData[this.tableSuccessData.length - 1].allCount).toFixed(4) * 100).toFixed(2);
      },
      // 计算失败率
      computeError(errorCount) {
        return ((errorCount / this.tableSuccessData[this.tableSuccessData.length - 1].allCount).toFixed(4) * 100).toFixed(2);
      },
      // 点击搜索
      search() {
        if(this.active === false) {
          this.handleSearch();
        }else{
          this.queryStatisticsDate();
        }
      },
      // 表格 合并逻辑
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        return this.mergeFn({ row, column, rowIndex, columnIndex,
          colList : [0],
          attr : 'carrier',
          table : this.tableErrorData,
        });
      },
      mergeFn({ row, column, rowIndex, columnIndex,colList,attr,table}) {
        // colList - 需要执行的列
        // attr - 比较相等的属性
        // table - 对应的表格
        if(!row[attr]) {
          return;
        }

        if(colList.indexOf(columnIndex) !== -1) {
          if(rowIndex === 0 || (row[attr] !== table[rowIndex-1][attr]) ) {
            let index = 0;
            for(let i = rowIndex + 1 ; i < table.length ; i ++) {
              let v = table[i];
              if(row[attr] === v[attr]) {
                index ++;
              }
            }
            if(index > 0) {
              return {
                rowspan: index + 1,
                colspan: 1,
              }
            }else{
              return {
                rowspan: 1,
                colspan: 1,
              };
            }
          }else{
            return {
              rowspan: 1,
              colspan: 0,
            };
          }
        }
      },
    },
  }
</script>

<style lang="scss">

.note-statistics{
  .color-blue{
    color: #0F357F;
  }
  .time-frame .m-span{
    margin-top: 0;
  }
  .change-wrap{
    height: 50px;
    line-height: 50px;
    color: #0F357F;
    text-align: center;
    margin-bottom: 20px;
    >div{
      background-color: #E6ECFF;
    }
    .note-list{
      width: 50%;
    }
    .statistics{
      overflow: hidden;
    }
    .active{
      background-color: #fff;
    }
  }

  .statistics-wrap{
    padding: 0 100px;
  }
}

</style>