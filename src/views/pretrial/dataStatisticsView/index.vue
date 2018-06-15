<template>
  <div class="data-statistics-view">
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">数据统计</a>
    </div>

    <div class="item-title of-hidden">
      <span class="item-title-sign">数据统计</span>
    </div>

    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm">
        <el-form-item label="互金企业：" prop="merchantCode">
          <el-select
            style="width:320px;"
            v-model="ruleForm.merchantCode"
            clearable
            filterable
            remote
            reserve-keyword
            placeholder="请输入关键词进行检索"
            :remote-method="remoteMethod"
            @change="handleMerchantCodeChange"
          >
            <el-option
              v-for="(item,index) in merchantOptions"
              :key="item.code + '' + index "
              :label="item.merchantName"
              :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="产品名称：" prop="productId">
          <el-select
            style="width:200px"
            v-model="ruleForm.productId"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="(item,index) in productOptions"
              :key="item.prodCode + '' + index "
              :label="item.prodName"
              :value="item.prodCode">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="推送日期：">
          <timeFrame
            :startDate.sync="ruleForm.pushStartDate"
            :endDate.sync="ruleForm.pushEndDate"
            startPlaceholder="推送开始"
            endPlaceholder="推送结束"
          >
          </timeFrame>
        </el-form-item>

        <el-form-item label="初审人：" prop="operateId">
          <el-select
            style="width:200px"
            v-model="ruleForm.operateId"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="(item,index) in operateOptions"
              :key="item.userId + '' + index "
              :label="item.userName"
              :value="item.userId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-button @click="handleSearch" type="warning">查询</el-button>

      </el-form>
    </div>

    <div class="item-search">
      <div class="m-tit">
        数据概况
      </div>

      <div class="data-content">
        <el-row class="data-list">
          <el-col :span="8">
            预审案件数
            <span class="pd">{{ruleForm.totalNum}}</span>
          </el-col>
          <el-col :span="8">
            通过案件
            <span class="pd">{{ruleForm.pass}}&nbsp;/&nbsp;{{ruleForm.passPercent}}%</span>
          </el-col>
          <el-col :span="8">
            未通过案件
            <span class="pd">{{ruleForm.fail}}&nbsp;/&nbsp;{{ruleForm.failPrecent}}%</span>
          </el-col>
        </el-row>

        <el-row class="data-list">
          <el-col :span="8">
            身份证有误
            <span class="pd">{{ruleForm.idFail}}&nbsp;/&nbsp;{{ruleForm.idFailPercent}}%</span>
          </el-col>
          <el-col :span="8">
            签名有误
            <span class="pd">{{ruleForm.signFail}}&nbsp;/&nbsp;{{ruleForm.signFailPercent}}%</span>
          </el-col>
          <el-col :span="8">
            证据链有误
            <span class="pd">{{ruleForm.eviFail}}&nbsp;/&nbsp;{{ruleForm.eviFailPercent}}%</span>
          </el-col>
        </el-row>
      </div>

    </div>

    <div class="item-search">
      <div class="m-tit">
        原因分布
      </div>

      <ul class="m-ul">
        <template v-for="(item,index) in ruleForm.list">
          <li :key="index">
            <span class="m-name ellipsis" :title="item.name">{{item.name}}</span>
            <span>{{item.num}}&nbsp;/&nbsp;{{item.percent}}%</span>
          </li>
        </template>
      </ul>
    </div>

  </div>
</template>

<script>
  import timeFrame from '@/components/timeFrame.vue'
  export default {
    components : {
      timeFrame,
    },
    data() {
      return {
        ruleForm : {
          // 互金企业 
          merchantCode : '',
          // 模板
          productId : '',
          // 推送开始日期
          pushStartDate : '',
          // 推送结束日期
          pushEndDate : '',
          // 初审人
          operateId : '',

          // 原因分布 list
          list : [
            /* {
              // 内容
              name : '',
              // 数量
              num : '',
              // 占比
              percent : '',
            } */
          ],
        },

        rules : {},

        // 互金企业 options
        merchantOptions : [
          /* {merchantName : '张三' , code : '张三'} */
        ], 
        // 模板 options
        productOptions : [
          /* {prodName : '模板1' , prodCode : '模板1'} */
        ],
        // 初审人 options
        operateOptions : [
          /* {userName : '初审人a' , userId : '初审人a'} */
        ],
      }
    },
    mounted() {
      this.handleSearch();
      // 获取初审人 options
      this.$http({
        method : 'post',
        url : '/user/queryUserListByRoleType.htm',
        data : {
          type : 'OPERATOR',
        },
      }).then((res) => {
        this.operateOptions = res.result;
      });
    },
    methods : {
      // 点击查询
      handleSearch() {
        this.$http({
          method : 'post',
          url : '/statistics/queryStatisticsByCondition.htm',
          data : {
            merchantCode : this.ruleForm.merchantCode,
            operateId : this.ruleForm.operateId,
            productId : this.ruleForm.productId,
            pushStartDate : this.ruleForm.pushStartDate,
            pushEndDate : this.ruleForm.pushEndDate,
          },
        }).then((res) => {
          this.ruleForm = Object.assign(this.ruleForm,res.result);
        });
      },

      // 互金企业搜索
      remoteMethod(query) {
        this.$http({
          method : 'post',
          url : '/merchant/queryPreMerchantName.htm',
          data : {
            keyWords : query,
          },
        }).then((res) => {
          this.merchantOptions = res.result;
        });
      },
      // 互金企业change
      handleMerchantCodeChange(val) {
        if(!val){
          this.ruleForm.productId = '';
          this.productOptions = [];
          return;
        }
        // 根据互金企业 查询产品名称
        this.$http({
          method : 'post',
          url : '/merchant/selectMerchantProductByMerchantCode.htm',
          data : {
            merchantCode : this.ruleForm.merchantCode,
          },
        }).then((res) => {
          this.productOptions = res.result;
        });
      },
    },
  }
</script>

<style lang="scss">

.data-statistics-view{
  .m-tit{
    font-size: 17px;
    color: #0F357F;
    padding-left: 15px;
    margin-bottom: 15px;
  }
  .item-search{
    border: none;
    border-bottom: 1px solid #ddd;
    margin-bottom: 0;
  }
  .time-frame{
    .m-span{
      margin-top: 0!important;
    }
  }
  .data-content{
    color: #aaa;
    width: 90%;
    padding-left: 15px;
    .data-list{
      margin-bottom: 15px;
    }
    .pd{
      padding-left: 10px;
    }
  }
  .m-ul{
    color: #aaa;
    padding-left: 15px;
    .m-name{
      display: inline-block;
      width: 280px;
      margin-right: 20px;
    }
    li{
      margin-bottom: 10px;
    }
  }
}

</style>