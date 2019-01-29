<template>
  <div class="case-statistics-workbench">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">案件统计工作台</a>
    </div>

    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm" label-width="120px">

        <el-form-item label="申请人：" prop="applicants">
          <el-input @keyup.native.enter="initTableList" v-model.trim="ruleForm.applicants" placeholder="申请人"></el-input>
        </el-form-item>

        <el-form-item label="案件状态：" prop="statusThree">
          <el-input @keyup.native.enter="initTableList" v-model.trim="ruleForm.statusThree" placeholder="案件状态" style="200px"></el-input>
        </el-form-item>

        <el-form-item label="提交日期：" prop="submitDate">
          <el-date-picker
            v-model="ruleForm.submitDate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>

        <div class="mt-10"></div>

        <el-form-item label="申请书模版：" prop="templateName">
          <el-input @keyup.native.enter="initTableList" v-model.trim="ruleForm.templateName" placeholder="申请书模版" style="200px"></el-input>
        </el-form-item>

        <el-button @click="initTableList" type="warning">查询</el-button>
        <el-button @click="handleExport" type="primary">导出</el-button>
      </el-form>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">案件情况统计表 - {{date}}（案件总数量：{{total}}笔）</span>
    </div>

    <div class="item-table mb-20">
      <table
        class="m-primordial-table mt-10
          el-table el-table--fit el-table--border 
          el-table--enable-row-hover"
      >
        <colgroup>
          <col width="12%">
          <col width="8%">
          <col width="8%">
          <col width="12%">
          <col width="8%">
          <col width="12%">
          <col width="8%">
          <col width="8%">
          <col width="12%">
        </colgroup>
        <tr class="th">
          <th colspan="1">
            <div class="mth-title">
              申请人
              <!-- <i 
                @click="applicantsVisible = !applicantsVisible" 
                class="cursor" 
                :class="[applicantsVisible ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"
              >
              </i>
              <el-collapse-transition>
                <div class="mth-dialog" v-show="applicantsVisible">
                  <el-checkbox-group v-model="applicantsCheck">
                    <template v-for="(item,index) in applicantsList">
                      <el-checkbox :label="item" :key="index + '' + item" class="mb-10">{{item}}</el-checkbox>
                      <br :key="index" />
                    </template>
                  </el-checkbox-group>
                </div>
              </el-collapse-transition> -->
            </div>
          </th>
          <th colspan="1">
            <div class="mth-title">
              案件状态
              <!-- <i 
                @click="statusThreeVisible = !statusThreeVisible" 
                class="cursor" 
                :class="[statusThreeVisible ? 'el-icon-arrow-up' : 'el-icon-arrow-down']"
              >
              </i>
              <el-collapse-transition>
                <div class="mth-dialog" v-show="statusThreeVisible">
                  <el-checkbox-group v-model="statusThreeCheck">
                    <template v-for="(item,index) in statusThreeList">
                      <el-checkbox :label="item" :key="index + '' + item" class="mb-10">{{item}}</el-checkbox>
                      <br :key="index" />
                    </template>
                  </el-checkbox-group>
                </div>
              </el-collapse-transition> -->
            </div>
          </th>
          <th colspan="1">案件状态数量</th>
          <th colspan="1">提交日期</th>
          <th colspan="1">处理天数</th>
          <th colspan="1">申请书模版</th>
          <th colspan="1">案件数量</th>
          <th colspan="1">是否有裁决书模版</th>
          <th colspan="1">应裁情况</th>
        </tr>
        <template v-for="(item,index) in tableData">
          <template v-for="(item2,index2) in item">
            <template v-for="(item3,index3) in item2">
              <template v-for="(item4,index4) in item3">
                <tr :Key="index + '' + index2 + index3 + index4" v-if="trIsShow(item4,index,index2,index3,index4)">
                  <td v-if="item4.rowspan1" :rowspan="item4.rowspan1">{{item4.applicants}}</td>
                  <td v-if="item4.rowspan2" :rowspan="item4.rowspan2">{{item4.statusThree}}</td>
                  <td v-if="item4.rowspan2" :rowspan="item4.rowspan2">{{item4.statusCount}}</td>
                  <td v-if="item4.rowspan3" :rowspan="item4.rowspan3">{{item4.submitDate}}</td>
                  <td v-if="item4.rowspan3" :rowspan="item4.rowspan3">{{item4.processDays}}</td>
                  <td rowspan="1">{{item4.templateName}}</td>
                  <td rowspan="1">{{item4.templateCount}}</td>
                  <td rowspan="1">{{item4.awardTemplate}}</td>
                  <td rowspan="1">
                    {{item4.opinionCount ? `应裁有意见${item4.opinionCount}笔` : '--'}}
                  </td>
                </tr>
              </template>
            </template>  
          </template>  
        </template>  

        <template v-if="tableData.length === 0">
          <tr>
            <th style="text-align:center;" colspan="9">
              <div>暂无数据</div>
            </th>
          </tr>
        </template>
      </table>  
    </div> 
  </div>
</template>

<script>
  import exportFile from '@/assets/js/exportFile.js'
  export default {
    data() {
      return {
        loading : '',
        ruleForm : {
          applicants : '', // 申请人
          statusThree : '', // 案件状态
          submitDate : '', // 提交日期
          templateName : '', // 申请书模版
        },
        rules : {

        },

        tableData2 : [
          {
            applicants : '曾诚', // 申请人
            statusThree : '仲裁员选择', // 案件状态
            submitDate : '2018-12-01', // 提交日期
            id : 1,
            statusCount : '25', // 案件状态数量
            processDays : '10', // 处理天数
            templateName : '奇速贷1009', // 申请书模板
            templateCount : '6', // 案件数量
            awardTemplate : '已配置', // 是否有裁决书模版
            opinionCount : 0, // 应裁情况
          },
          {
            applicants : '曾诚',
            statusThree : '仲裁员选择',
            submitDate : '2018-12-01',
            id : 2,
            statusCount : '1',
            processDays : '2',
            templateName : '3',
            templateCount : '4',
            awardTemplate : '5',
            opinionCount : '6',
          },
          {
            applicants : '曾诚',
            statusThree : '仲裁员选择',
            submitDate : '2018-12-02',
            id : 3,
            statusCount : '11',
            processDays : '22',
            templateName : '33',
            templateCount : '44',
            awardTemplate : '55',
            opinionCount : '66',
          },
          {
            applicants : '曾诚',
            statusThree : '仲裁员选择',
            submitDate : '2018-12-03',
            id : 4,
            statusCount : '111',
            processDays : '222',
            templateName : '333',
            templateCount : '444',
            awardTemplate : '555',
            opinionCount : '666',
          },
          {
            applicants : '曾诚',
            statusThree : '已组庭',
            submitDate : '2019-01-03',
            id : 5,
            statusCount : '-1',
            processDays : '-2',
            templateName : '-3',
            templateCount : '-4',
            awardTemplate : '-5',
            opinionCount : '-6',
          },
          {
            applicants : '曾诚',
            statusThree : '已组庭',
            submitDate : '2019-01-03',
            id : 6,
            statusCount : '12',
            processDays : '22',
            templateName : '32',
            templateCount : '42',
            awardTemplate : '52',
            opinionCount : '62',
          },
          {
            applicants : '曾诚',
            statusThree : '啦啦啦',
            submitDate : '2019-01-03',
            id : 66,
            statusCount : '12',
            processDays : '22',
            templateName : '32',
            templateCount : '42',
            awardTemplate : '52',
            opinionCount : '62',
          },
          {
            applicants : '大同果壳',
            statusThree : '调解中',
            submitDate : '2018-12-01',
            id : 7,
            statusCount : '13',
            processDays : '23',
            templateName : '33',
            templateCount : '43',
            awardTemplate : '53',
            opinionCount : '63',
          },
        ],
        tableData : [],
        // 数据总数
        total : 0,
        // 当前日期
        date : this.$moment().format('YYYY.MM.DD'),
        // 申请人 list 用于表格过滤
        applicantsList : [],
        applicantsCheck : [],
        applicantsVisible : false,
        // 案件状态 list 用于表格过滤
        statusThreeList : [],
        statusThreeCheck : [],
        statusThreeVisible : false,
      }
    },
    mounted() {
      // 测试数据
      /* this.tableData = this.tableFormat(this.tableData2);
      this.tableScreen(this.tableData2); */

      this.initTableList();
    },
    methods : {
      // 处理数据格式
      tableFormat(tableData) {
        // 申请人 过滤
        let arr = [];
        for(let i1 = 0 ; i1 < tableData.length ; i1 ++) {
          let v1 = tableData[i1];
          let children = [];
          for (let i2 = i1 + 1 ; i2 < tableData.length ; i2 ++) {
            let next = tableData[i2];
            if(v1.applicants === next.applicants) {
              children.push(next);
              i1 = i2;
            }else{
              break;
            }
          }
          arr.push([v1,...children]);
          v1.rowspan1 = [v1,...children].length;
        }
        console.log(JSON.parse(JSON.stringify(arr)),'arr-for1');
        // 案件状态 过滤
        for(let i1 = 0 ; i1 < arr.length ; i1 ++) {
          let v1 = arr[i1];
          let arr2 = [];
          for(let i2 = 0 ; i2 < v1.length ; i2 ++) {
            let v2 = v1[i2];
            let children = [];
            for(let i3 = i2 + 1 ; i3 < v1.length ; i3 ++) {
              let v3 = v1[i3];
              if(v2.statusThree === v3.statusThree) {
                i2 = i3;
                children.push(v3);
              }else{
                break;
              }
            }
            arr2.push([v2,...children]);
            v2.rowspan2 = [v2,...children].length;
          }
          arr[i1] = arr2;
        }
        console.log(JSON.parse(JSON.stringify(arr)),'arr-for2');
        // 提交日期 过滤
        for(let i1 = 0 ; i1 < arr.length ; i1 ++) {
          let v1 = arr[i1];
          for(let i2 = 0 ; i2 < v1.length ; i2 ++) {
            let v2 = v1[i2];
            let arr3 = [];
            for(let i3 = 0 ; i3 < v2.length ; i3 ++) {
              let v3 = v2[i3];
              let children = [];
              for(let i4 = i3 + 1 ; i4 < v2.length ; i4 ++) {
                let v4 = v2[i4];
                if(v3.submitDate === v4.submitDate) {
                  i3 = i4;
                  children.push(v4);
                }else{
                  break;
                }
              }
              arr3.push([v3,...children]);
              v3.rowspan3 = [v3,...children].length;
            }
            arr[i1][i2] = arr3;
          }
        }
        console.log(JSON.parse(JSON.stringify(arr)),'arr-for3');
        return JSON.parse(JSON.stringify(arr));
      },
      // 表格数据 筛选出 申请人list 案件状态list
      tableScreen(tableData) {
        let obj1 = {};
        let obj2 = {};
        let arr1 = [];
        let arr2 = [];
        tableData.map((v,k) => {
          if(!obj1[v.applicants]) {
            arr1.push(v.applicants);
            obj1[v.applicants] = true;
          }
          if(!obj2[v.statusThree]) {
            arr2.push(v.statusThree);
            obj2[v.statusThree] = true;
          }
        });

        this.applicantsList = arr1;
        this.applicantsCheck = arr1;
        this.statusThreeList = arr2;
        this.statusThreeCheck = arr2;
      },

      // 初始化 表格数据
      initTableList() {
        this.loading = this.$loading();
        return this.$http({
          url : '/case/queryStatsClientCaseInfo.htm',
          method : 'post',
          data : {
            pageSize : 10000,
            currentNum : 1,

            ...this.ruleForm,
          },
        }).then((res) => {
          this.loading.close();
          // 计算案件数量
          let total = 0;
          res.result.map(v => total += v.templateCount);
          this.total = total;

          this.tableData = this.tableFormat(res.result);
          this.tableScreen(res.result);
        }).catch(() => {
          this.loading.close();
        });
      },
      // 点击导出
      handleExport() {
        exportFile({
          url : '/case/excelStatClientCaseInfo.htm',
          data : {
            ...this.ruleForm,
          },
        });
      },
      trIsShow(item4,index,index2,index3,index4) {
        let applicantsType = this.applicantsCheck.indexOf(item4.applicants) !== -1;
        return applicantsType;
      },
    },
  }
</script>

<style lang="scss">

.case-statistics-workbench{
  .search-span{
    display: inline-block;
    margin-top: 15px;
    text-align: right;
  }
  .el-form-item{
    margin-bottom: 0;
  }

  .mth-title{
    position: relative;
    .mth-dialog{
      position: absolute;
      z-index: 100;
      border: 1px solid #ebeef5;
      border-radius: 2px;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      text-align: left;
    }
  }
  .el-table th,.el-table th div{
    overflow: initial;
  }
  .el-table th div{
    line-height: initial;
  }
  .m-primordial-table{
    overflow: initial;
  }
}

</style>