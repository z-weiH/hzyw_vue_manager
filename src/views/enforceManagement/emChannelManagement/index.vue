<template>
  <div>
    <div class="wsbodyhead">
      <a>所在位置</a>
      <a href="javascript:;" class="aside_tit">渠道管理</a>
    </div>

    <div class="item-search">
      <el-form :inline="true" ref="ruleForm" :model="searchItem" >
        <el-form-item label="" prop="keyWords" >
          <el-input style="width: 240px;" v-model.trim="searchItem.keyWords" placeholder="渠道名称、联系电话、联系人"></el-input>
        </el-form-item>

        <el-button @click="doQuery" type="warning">查询</el-button>
      </el-form>
    </div>

    <div class="item-title of-hidden" style="position: relative;">
      <el-button style="position: absolute;top: 6px;right: 10px;" type="primary" @click="addChannel">添加</el-button>
      <span class="item-title-sign">渠道管理</span>
    </div>

    <div class="item-table" >
      <el-table
        :data="tableData"
        border
        style="width: 100%;">
        <el-table-column
          type="index"
          width="70"
          label="序号"
        >
        </el-table-column>

        <el-table-column
          prop="channelType"
          label="渠道类型"
          >
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.channelType === 1 ? '自营渠道' : scope.row.channelType === 2 ? '律所代理' : scope.row.channelType === 3 ?  '线下代理' : '个人代理'}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="channelName"
          label="渠道名称"
         >
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.channelName}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="channelLinkman"
          label="联系人"
         >
          <template slot-scope="scope">
            {{scope.row.channelLinkman}}
          </template>
        </el-table-column>
        <el-table-column
          prop="channelPhone"
          label="联系电话"
          >
          <template slot-scope="scope">
            {{scope.row.channelPhone}}
          </template>
        </el-table-column>
        <el-table-column
          prop="channelAddress"
          label="详细地址"
          >
          <template slot-scope="scope">
            {{scope.row.channelAddress}}
          </template>
        </el-table-column>
        <el-table-column
          prop="courtSettingStatus"
          label="员工管理"
          width="156">
          <template slot-scope="scope">
            <el-button type="text" @click="handleManageClick(scope.row)" size="small">管理</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="courtSettingStatus"
          label="操作"
          >
          <template slot-scope="scope">
            <el-button type="text" @click="handleDelClick(scope.row)" size="small">删除</el-button>
            <el-button type="text" @click="handleEditClick(scope.row)" size="small">修改</el-button>
          </template>
        </el-table-column>



      </el-table>


      <el-pagination
        class="mt-10 mb-10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pager.currentNum"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pager.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pager.count">
      </el-pagination>
    </div>

    <channelEdit ref="channelEdit"/>
  </div>
</template>

<script>
  import channelEdit from './module/channelEdit'
  export default {
    name: 'emChannelManagement',
    components:{
      channelEdit
    },
    data(){
      return {
        tableData: [],
        searchItem: {},
        pager:{
          currentNum: 1,
          count: 1,
          pageSize: 10
        }
      }
    },
    methods:{
      // <!--1：自营渠道：2：律所代理：3：线下代理-->

      doQuery(){
        console.log(this.searchItem);
        this.$http.post("/channel/queryCourtMandatoryChannelInfo.htm",{...this.searchItem,...this.pager}).then(res => {
          this.tableData = res.result.list;
          this.pager.count = res.result.count;
        })
      },
      handleSizeChange(val){
        this.pager.pageSize = val;
        this.pager.currentNum = 1;
        this.doQuery();
      },
      handleCurrentChange(val){
        this.pager.currentNum = val;
        this.doQuery();
      },
      handleDelClick(item){
        this.$confirm('确定要删除该渠道吗?', '提示', {
          center: true,
        }).then(res => {
          this.$http.post("/channel/deleteCourtMandatoryChannelInfo.htm",{channelId: item.channelId}).then(res => {
            this.$message.success("渠道删除成功");
            this.doQuery();
          })
        }).catch(err => {
        })
      },
      handleEditClick(item){
        this.$refs.channelEdit.show(item.channelId);
      },
      handleManageClick(item){
        this.$router.push({path: '/main/staffMangement', query:{channelName: item.channelName,channelId: item.channelId, channelType: item.channelType}})
      },


      addChannel(){
        this.$refs.channelEdit.show();
      }
    },
    created(){
      this.doQuery();
    }
  }
</script>

<style scoped>

</style>
