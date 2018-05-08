<template>
  <div class="mailSendLog">
    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="ruleForm">

        <el-form-item label=" " prop="zcw">
          <el-input v-model.trim="ruleForm.zcw" placeholder="请输入仲裁委"></el-input>
        </el-form-item>

        <el-form-item prop="startTime">
          <el-date-picker type="date" class="w-133" placeholder="请选择开始时间" v-model="ruleForm.startTime"></el-date-picker>
        </el-form-item>

        <el-form-item prop="endTime">
          <el-date-picker type="date" class="w-133" placeholder="请选择结束时间" v-model="ruleForm.endTime"></el-date-picker>
        </el-form-item>

        <el-button @click="handleSearch" type="primary">查询</el-button>

      </el-form>
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
        <el-table-column prop="date" label="所属仲裁委"></el-table-column>
        <el-table-column prop="date" label="收件人邮箱"></el-table-column>
        <el-table-column prop="date" label="收件人名称"></el-table-column>
        <el-table-column prop="date" label="邮件标题"></el-table-column>
        <el-table-column prop="date" label="结果"></el-table-column>
        <el-table-column prop="date" label="发送时间"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        ruleForm : {
          // 仲裁委
          zcw : '',
          // 开始时间
          startTime : new Date(),
          // 结束时间
          endTime : new Date(),
        },
        rules : {},
        tableData : [{},{}],
      }
    },
    mounted() {

    },
    methods : {
      // 点击搜索
      handleSearch() {
      },
    },
  }
</script>

<style lang="scss" scoped>

</style>

<style lang="scss">

.mailSendLog{
  .el-form-item{
    margin-bottom: 0;
  }
}

</style>