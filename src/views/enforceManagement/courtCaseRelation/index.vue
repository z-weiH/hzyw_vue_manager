<template>
    <div class="courtCaseRelation">
      <div class='wsbodyhead'>
        <a>所在位置</a>
        <router-link :to='$options.name' class='aside_tit'>法院案件关联</router-link>
      </div>
      <el-form :inline="true" class="searchs item-search" >

            <el-form-item label="案件查询">
              <el-input style="width: 230px;" v-model="searchItem.keyWords" placeholder="案号、申请人、被申请人、法院名称"></el-input>
            </el-form-item>
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
        <el-form-item label="提交时间">
          <el-date-picker
            v-model="searchItem.closeTimeBegin"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions1"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="">
          <el-date-picker
            v-model="searchItem.closeTimeEnd"
            type="date"
            placeholder="选择日期"
            :picker-options="pickerOptions2"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>



        <el-button  type="warning"  @click="doQuery">查询</el-button>
      </el-form>
      <div class="item-title">
        <el-button type="primary" class="fr" style="margin-top: -14px;" @click="exportExcel">导出</el-button>
        法院案件关联
      </div>

      <div class="item-table" >

        <el-table
          :data="tableData"
          border
          :max-height="650"
          style="width: 100%;">
          <el-table-column
            type="index"
            width="70"
            label="序号"
          >
          </el-table-column>
          <el-table-column
            prop="caseNo"
            label="案号"
            width="280"
          >
            <template slot-scope="scope">
              {{scope.row.caseNo}}
            </template>
          </el-table-column>
          <el-table-column
            prop="applicants"
            label="申请人姓名"
          >
            <template slot-scope="scope">
              {{scope.row.applicants}}
            </template>
          </el-table-column>
          <el-table-column
            prop="respondents"
            label="被申请人姓名"
            width="120"
          >
            <template slot-scope="scope">
              {{scope.row.respondents}}
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            label="被申请人地址"
            width="200"
          >
            <template slot-scope="scope">
              {{scope.row.address}}
            </template>
          </el-table-column>
          <el-table-column
            prop="closeTime"
            label="提交时间"
          >
            <template slot-scope="scope">
             {{scope.row.closeTime}}
            </template>
          </el-table-column>
          <el-table-column
            prop="province"
            label="省"
          >
            <template slot-scope="scope">
              {{scope.row.province}}
            </template>
          </el-table-column>
          <el-table-column
            prop="city"
            label="市"
          >
            <template slot-scope="scope">
             {{scope.row.city}}
            </template>
          </el-table-column>

          <el-table-column
            prop="courtName"
            label="中级法院"
          >
            <template slot-scope="scope">
             {{scope.row.courtName}}
            </template>
          </el-table-column>
          <el-table-column
            prop="basicCourtName"
            label="基层法院"
          >
            <template slot-scope="scope">
             {{scope.row.basicCourtName}}
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            header-align="center">
            <template slot-scope="scope">
              <!--<el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>-->
              <el-button type="text" @click="handleClick(scope.row)" size="small">修改</el-button>
            </template>
          </el-table-column>
        </el-table>



      </div>
      <el-pagination style="background: #fff"
        class="mt-10 mb-10"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pager.currentNum"
        :page-sizes="[10, 20, 30, 50, 100, 200]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pager.total">
      </el-pagination>

      <edit ref="edit"></edit>

    </div>
</template>

<script>

import Edit from './module/edit'
import Mixins from "@/components/script/_mixin";
import TableComponent from "@/components/table";
import exportFile from "@/assets/js/exportFile";
export default {
  name: 'courtCaseRelation',
  extends: Mixins,
  components:{
    TableComponent,
    Edit
  },
  data() {
    return {
      searchItem: {
        keyWords: '',
        provinceCode: '',
        cityCode: '',
        districtCode: '',
        courtId:'',
        closeTimeBegin: '',
        closeTimeEnd: ''
      },
      searchItemTemp: {},
      provinceOptions: [],
      cityOptions: [],
      districtOptions: [],
      courtOptions: [],
      pickerOptions1: {
        disabledDate: time => {
          if (!this.searchItem.closeTimeEnd) return false
          else if (new Date(time).getTime() > new Date(this.searchItem.closeTimeEnd).getTime()) {
            return true
          } else {
            return false
          }
        },
      },
      pickerOptions2:{
        disabledDate: time => {
          if (!this.searchItem.closeTimeBegin) return false
          else if (new Date(time).getTime() < new Date(this.searchItem.closeTimeBegin).getTime()) {
            return true
          } else {
            return false
          }
        },
      }

    }
  },
  watch:{
    'searchItem.provinceCode'(val,oldval){
      if(val){
        this.searchItem.province = this.provinceOptions.find(it => it.provinceCode === val).province;
      }else{
        this.searchItem.province = '';
      }
      this.citySearch(val);
      this.searchItem.cityCode = '';
      this.searchItem.city = '';

    },
    'searchItem.cityCode'(val,oldval){
      if(val){
        this.searchItem.city = this.cityOptions.find(it => it.cityCode === val).city;
      }else{
        this.searchItem.city = '';
      }
      this.districtSearch(val);
      this.courtSearchByCityCode(val);
      this.searchItem.districtCode = '';
      this.searchItem.district = '';

      this.searchItem.courtId = '';
    },
    'searchItem.districtCode'(val,oldval){
      if(val){
        this.searchItem.district = this.districtOptions.find(it => it.districtCode === val).district;
      }else{
        this.searchItem.district = '';
      }
      this.courtSearch(val);
      this.searchItem.courtId = '';
    }
  },
  methods: {

    handleClick(row){
      console.log(this.$refs.edit);
      this.$refs.edit.init(row);
    },

    //导出
    exportExcel(){
      exportFile(
        {
          url: '/court/excelCourtCaseInfos.htm',
          data: this.searchItemTemp
        }
      );
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
    },

    handleSizeChange(val){
      this.pager.pageSize = val;
      this.doQuery();
    },
    handleCurrentChange(val){
      this.pager.currentNum = val;
      this.doQuery();
    },
    doQuery(){
      let obj = {
        keyWords: this.searchItem.keyWords,
        province: this.searchItem.province,
        city: this.searchItem.city,
        district: this.searchItem.district,
        courtId:this.searchItem.courtId,
        closeTimeBegin: this.searchItem.closeTimeBegin,
        closeTimeEnd: this.searchItem.closeTimeEnd
      }
      this.$http.post("/court/caseList.htm",{...obj,...this.pager}).then(res => {
        this.searchItemTemp = {...this.searchItem};
        this.tableData = res.result.list;
        this.pager.total = res.result.count;
      })
    }

  },
  created(){
    this.provinceSearch();
    this.doQuery();
  }
}
</script>

<style scoped>

</style>
