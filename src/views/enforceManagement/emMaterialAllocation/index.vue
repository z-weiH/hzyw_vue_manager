<template>
  <div>
    <el-form :inline="true" class="searchs item-search" >


      <el-form-item label="所在地区">
        <!--<el-input style="width: 320px;" v-model="searchItem.user" placeholder="案号、申请人、被申请人、手机号、法院名称"></el-input>-->
        <el-select style="width: 100px;"  clearable v-model="searchItem.provinceCode" placeholder="省">
          <el-option
            v-for="item in provinceOptions"
            :key="item.provinceCode"
            :label="item.province"
            :value="item.provinceCode">
          </el-option>
        </el-select>
        <el-select style="width: 100px;" clearable v-model="searchItem.cityCode" placeholder="市">
          <el-option
            v-for="item in cityOptions"
            :key="item.cityCode"
            :label="item.city"
            :value="item.cityCode">
          </el-option>
        </el-select>
        <el-select style="width: 100px;" clearable v-model="searchItem.districtCode" placeholder="区">
          <el-option
            v-for="item in districtOptions"
            :key="item.districtCode"
            :label="item.district"
            :value="item.districtCode">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="法院">
        <!--<el-input style="width: 320px;" v-model="searchItem.user" placeholder="案号、申请人、被申请人、手机号、法院名称"></el-input>-->
        <el-select style="width: 170px;" clearable v-model="searchItem.courtId" placeholder="请选择法院">
          <el-option
            v-for="item in courtOptions"
            :key="item.courtId"
            :label="item.courtName"
            :value="item.courtId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <el-input style="width: 230px;" v-model="searchItem.keyWords" placeholder="法院名、受委托人"></el-input>
      </el-form-item>
      <el-button  type="warning"  @click="doQuery">查询</el-button>
    </el-form>

    <div class="item-title">
      法院材料配置
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
          prop="courtName"
          label="法院名称"
          width="200">
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.courtName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mandatory"
          label="受委托人"
          width="200">
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.mandatory}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="executionStatus"
          label="申请执行人银行账户"
          width="180">
          <template slot-scope="scope">
            {{scope.row.executionStatus === 0 ? '未设置' : '已设置'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="courtSettingStatus"
          label="强制执行文书材料下载份数"
          width="200">
          <template slot-scope="scope">
            {{scope.row.courtSettingStatus === 0 ? '未设置' : '已设置'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="courtSettingStatus"
          label="操作"
          width="106">
          <template slot-scope="scope">
            <el-button type="text" @click="handleClick(scope.row)" size="small">配置</el-button>
          </template>
        </el-table-column>



      </el-table>
    </div>

    <el-pagination style="background: #fff"
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
</template>

<script>
  export default {
    name: 'emMaterialAllocation',
    data() {
      return {
        searchItem: {
          cityCode: '',
          courtId: '',
          districtCode: '',
          keyWords: '',
          provinceCode: ''
        },
        provinceOptions: [],
        cityOptions: [],
        districtOptions: [],
        courtOptions: [],
        tableData: [],
        pager: {
          count: 1,
          pageSize: 10,
          currentNum: 1
        }
      }
    },
    methods:{
      handleClick(row){
        this.$router.push({path: 'emMaterialAllocationPage',query:{courtId: row.courtId,courtName: row.courtName}});
      },

      handleCurrentChange(val){
        this.pager.currentNum = val;
        this.doQuery();
      },

      handleSizeChange(val){
        this.pager.pageSize = val;
        this.doQuery();
      },
      doQuery(){
        this.$http.get("/court/materialsettinglist.htm",{...this.searchItem,...this.pager}).then(res  => {
          this.tableData = res.result.list;
          this.pager.count = res.result.count;
        })
      }
    },
    created(){
      this.doQuery();
    }
  }
</script>

<style scoped>

</style>
