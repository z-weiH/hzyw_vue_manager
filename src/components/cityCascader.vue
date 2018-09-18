<template>
  <div class="city-cascader-box">
    <el-select ref="sele1" @change="handleProvinceChange" v-model="activeProvince" clearable placeholder="请选择" style="width:130px;vertical-align:middle;">
      <el-option
        v-for="(item,index) in provinceOptions"
        :key="index"
        :label="item.province"
        :value="item.provinceCode"
      >
      </el-option>
    </el-select>

    <el-select ref="sele2" @change="handleCityChange" v-model="activeCity" clearable placeholder="请选择" style="width:130px;vertical-align:middle;">
      <el-option
        v-for="(item,index) in cityOptions"
        :key="index"
        :label="item.city"
        :value="item.cityCode"
      >
      </el-option>
    </el-select>

    <el-select ref="sele3" @change="handleAreaChange" v-model="activeArea" clearable placeholder="请选择" style="width:130px;vertical-align:middle;">
      <el-option
        v-for="(item,index) in areaOptions"
        :key="index"
        :label="item.district"
        :value="item.districtCode"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
  export default {
    props : {
      // 当前选中的 省
      provinceCode : {
        type : String,
        default : '',
      },
      // 当前选中的 市
      cityCode : {
        type : String,
        default : '',
      },
      // 当前选中的 区
      districtCode : {
        type : String,
        default : '',
      },

      _this : {},
    },
    watch : {
      // props 省
      provinceCode(val) {
        this.activeProvince = val;
      },
      // props 市
      cityCode(val) {
        this.activeCity = val;
      },
      // props 区
      districtCode(val) {
        this.activeArea = val;
      },

      // 本地 省
      activeProvince(val) {
        this.$emit('update:provinceCode',val);
        if(val === '') {
          this.cityOptions = [];
          this.areaOptions = [];
          this.activeCity = '';
          this.activeArea = '';
        }
        setTimeout(() => {
          this.$parent.validate && this.$parent.validate('');
        },0);
      },
      // 本地 市
      activeCity(val) {
        this.$emit('update:cityCode',val);
        if(val === '') {
          this.areaOptions = [];
          this.activeArea = '';
        }
        setTimeout(() => {
          this.$parent.validate && this.$parent.validate('');
        },0);
      },
      // 本地 区
      activeArea(val) {
        this.$emit('update:districtCode',val);
        setTimeout(() => {
          this.$parent.validate && this.$parent.validate('');
        },0);
      },
    },
    data() {
      return {
        // 省 options
        provinceOptions : [
          /* {
            province : '浙江省',
            provinceCode : 'zj',
          }, */
        ],
        // 市 options
        cityOptions : [
          /* {
            city : '杭州市',
            cityCode : 'hz',
          }, */
        ],
        // 区 options
        areaOptions : [
          /* {
            district : '西湖区',
            districtCode : 'xh',
          }, */
        ],

        // 当前选中的 省
        activeProvince : this.provinceCode,
        // 当前选中的 市
        activeCity : this.cityCode,
        // 当前选中的 区
        activeArea : this.districtCode,
      }
    },
    mounted() {
      // 默认加载省 数据
      this.$http({
        url : '/court/queryProvinceInfo.htm',
      }).then((res) => {
        this.provinceOptions = res.result.list;
      });
    },
    methods : {
      // 根据省 获取市 options
      handleProvinceChange(val) {
        if(val) {
          this.$http({
            url : '/court/queryCityInfoByProvinceCode.htm',
            params : {
              provinceCode : this.activeProvince,
            },
          }).then((res) => {
            this.cityOptions = res.result.list;
          });
        }
      },
      // 根据市 获取区 options
      handleCityChange(val) {
        if(val) {
          this.$http({
            url : '/court/queryDistrictInfoByCityCode.htm',
            params : {
              cityCode : this.activeCity,
            },
          }).then((res) => {
            this.areaOptions = res.result.list;
          });
        }
      },

      // 获取 省 市 区 中文名称
      getCN() {
        return [
          this.$refs.sele1.$el.querySelector('input').value,
          this.$refs.sele2.$el.querySelector('input').value,
          this.$refs.sele3.$el.querySelector('input').value,
        ]
      },
      // 区 change
      handleAreaChange(val) {
        if(val) {
          // 选择完成 回调
          this.$nextTick(() => {
            this.$emit('finish');
          });
        }else{
          // 选择取消 回调
          this.$nextTick(() => {
            this.$emit('cancel');
          });
        }
      },
    },
  }
</script>

<style lang="scss" scoped>

.city-cascader-box{

}

</style>