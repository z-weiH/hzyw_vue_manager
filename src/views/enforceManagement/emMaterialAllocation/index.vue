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
          >
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.courtName}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="mandatoryName"
          label="受委托人"
          >
          <template slot-scope="scope">
            <span v-ellipsis.20>{{scope.row.mandatoryName ? scope.row.mandatoryName : scope.row.mandatoryName === '' ? '空委托人' : '-'}}</span>
          </template>
        </el-table-column>

        <el-table-column
          prop="executionStatus"
          label="申请执行人银行账户"
          >
          <template slot-scope="scope">
            {{scope.row.executionStatus === 1 ? '已设置' : '未设置'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="courtSettingStatus"
          label="强制执行文书材料下载份数"
         >
          <template slot-scope="scope">
            {{scope.row.courtSettingStatus === 1 ? '已设置' : '未设置'}}
          </template>
        </el-table-column>
        <el-table-column
          prop="courtSettingStatus"
          label="操作"
         >
          <template slot-scope="scope">
            <el-button type="text" @click="handleClick(scope.row)" size="small">配置</el-button>
          </template>
        </el-table-column>



      </el-table>

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
    watch:{
      'searchItem.provinceCode'(val,oldval){
        this.citySearch(val);
        this.searchItem.cityCode = '';

      },
      'searchItem.cityCode'(val,oldval){
        this.districtSearch(val);
        this.courtSearchByCityCode(val);
        this.searchItem.districtCode = '';
        this.searchItem.courtId = '';
      },
      'searchItem.districtCode'(val,oldval){
        this.courtSearch(val);
        this.searchItem.courtId = '';
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
        this.$http.post("/court/materialsettinglist.htm",{...this.searchItem,...this.pager}).then(res  => {
          this.tableData = res.result.list;
          this.tableData.forEach(it => {
            it.mandatoryName = it.mandatoryName.replace(/null/g,'空委托人');
          })
          this.pager.count = res.result.count;
        })
      },


      provinceSearch(){
        this.$http.post("/court/queryProvinceInfo.htm").then(res => {
          this.provinceOptions = res.result;
        })
      },
      citySearch(provinceCode){
        this.$http.post("/court/queryCityInfoByProvinceCode.htm",{provinceCode:provinceCode}).then(res => {
          this.cityOptions = res.result;
        })
      },
      districtSearch(cityCode){
        this.$http.post("/court/queryDistrictInfoByCityCode.htm",{cityCode: cityCode}).then(res => {
          this.districtOptions = res.result;
        })
      },
      courtSearch(districtCode){
        this.$http.post("/court/queryCourtInfoByDistrictCode.htm",{districtCode: districtCode}).then(res => {
          this.courtOptions = res.result;
        })
      },
      courtSearchByCityCode(cityCode){
        this.$http.post("/court/queryCourtInfoByCityCode.htm",{cityCode: cityCode}).then(res => {
          this.courtOptions = res.result;
        })
      }

    },
    created(){
      this.doQuery();
      this.provinceSearch();
    }
  }
</script>

<style scoped>

</style>
