<template>
  <div class="parameter-page">
    <div class="m-c1">
      <div class="fl global-parameters" :class="{active : paramLevel === 0}">
        <span @click="handleActive(0)" class="cursor">全局参数</span>
      </div>
      <div class="fl business-parameters" :class="{active : paramLevel === 1}">
        <span @click="handleActive(1)" class="cursor">业务参数</span>
      </div>
    </div>

    <div v-if="paramLevel === 1" class="m-c2">
      <el-select @change="initList" style="width:268px;" v-model="bizType" placeholder="请选择账龄">
        <el-option label="现金贷" value="10"></el-option>
        <el-option label="消费分期" value="20"></el-option>
        <el-option label="融资租赁" value="30"></el-option>
      </el-select>
    </div>

    <div class="m-c3 mt-10">
      <el-table @cell-click="handleRow" :data="tableData" border>
        <el-table-column prop="respondents" label="参数">
          <template slot-scope="scope">
            <span class="parameter-text">{{scope.row.paramCode}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="paramName" label="中文"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import copy from '@/assets/js/copy.js'

  export default {
    data() {
      return {
        paramLevel : 0,
        bizType : '',
        tableData : [],
      }
    },
    mounted() {
      this.initList();
    },
    methods : {
      initList() {
        this.$http({
          url : '/templateSetting/queryAllParamList.htm',
          method : 'post',
          data : {
            bizType : this.bizType,
            paramLevel : this.paramLevel,
          },
        }).then((res) => {
          this.tableData = res.result
        });
      },
      handleActive(type) {
        this.paramLevel = type;
        if(type === 1) {
          this.bizType = '10';
        }else{
          this.bizType = '10';
        }
        this.initList();
      },
      // 表格 col 点击
      handleRow(row, column, cell, event) {
        // 左侧
        if(cell.querySelector('.parameter-text')) {
          if(this.$parent.handleCopy) {
            let money = '';
            // money 类型特殊 处理 凭借 money()字段
            if(row.valueType === 4) {
              money = '${money('+ row.paramCode +')}';
            }
            this.$parent.handleCopy(money || '${'+ row.paramCode +'}');
          }else if(this.$route.query.fromRule) {
            copy(row.paramCode,() => {
              this.$message.success('已复制'+ row.paramCode +'');
            });
          }else{
            copy('${'+ row.paramCode +'}',() => {
              this.$message.success('已复制${'+ row.paramCode +'}');
            });
          }
        // 右侧
        }else{
          if(this.$parent.handleCopy) {
            this.$parent.handleCopy(row.paramCode);
          }else{
            copy(row.paramCode,() => {
              this.$message.success('已复制'+ row.paramCode +'');
            });
          }
        }
      },
    },
  }
</script>

<style lang="scss">

.parameter-page{
  .m-c1{
    position: relative;
    height: 50px;
    background-color: #EEF3FF;
    line-height: 50px;
    font-size: 16px;
    border: 1px solid #ddd;
    .active{
      color: #0f357f;
    }
    .global-parameters{
      width: 50%;
      box-sizing: border-box;
      text-align: center;
    }
    .business-parameters{
      border-left: 1px solid #ddd;
      width: 50%;
      box-sizing: border-box;
      text-align: center;
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

</style>
