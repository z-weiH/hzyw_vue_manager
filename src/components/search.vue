<template>
  <div>
    <div class="clear" v-if="searchItem.newline"></div>
    <div class="fl search-label" v-if="searchItem.label">{{searchItem.label+'：'}}</div>
    <el-col class="mb-10" :span="searchItem.colSpan ? searchItem.colSpan : 6" :style="{width : searchItem.width + 'px'}">
      <div v-if="searchItem.type == 'rangeText'" class="group_labels">
        <label :for="searchItem.labTid && searchItem.labTid()" class="groupIpt_lab">
          <el-input :id="searchItem.labTid && searchItem.labTid()" v-if="searchItem.type == 'rangeText' || !searchItem.type" v-model="item[searchItem.property]" :placeholder="searchItem.placeholder" @keyup.native="valueChange" @keyup.native.enter="doQuery"></el-input>
          <span class="unit">{{searchItem.unit}}</span>
        </label>
        <label v-if="searchItem.connectIco" class="cc_Ico">{{searchItem.connectIco}}</label>
      </div>
      <el-input @keyup.native.enter="doQuery" v-if="searchItem.type == 'text' || !searchItem.type" v-model="item[searchItem.property]" :placeholder="searchItem.placeholder" @keyup.native="valueChange"></el-input>
      <el-select style="width: 100%;" clearable :filterable="searchItem.filterable" :remote="searchItem.remote" :reserve-keyword="searchItem.reserveKey" @change="valueChange" v-if="searchItem.type ==  'select'" v-model="item[searchItem.property]" :placeholder="searchItem.placeholder"
        :remote-method="searchItem.remoteMethod">
        <el-option v-for="(option,index) in searchItem.options" :key="index" :label="searchItem.labelfield ? option[searchItem.labelfield] : option.label" :value="searchItem.valuefield ? option[searchItem.valuefield] : option.value">
        </el-option>
      </el-select>
      <!--BEGIN 级联select -->
      <el-cascader :change-on-select="searchItem.changeOnSelect || false" :data-hk="searchItem.cusClass" clearable v-if="searchItem.type == 'cascader'" :options="searchItem.options" v-model="item[searchItem.property]" @change="valueChange">
      </el-cascader>
      <!--END 级联select -->
      <el-date-picker :format="baseFmat" :value-format="baseFmat" v-if="searchItem.type == 'date' | searchItem.type == 'moment' | searchItem.type == 'month'  " v-model="item[searchItem.property]" :type="searchItem.type" :placeholder="searchItem.placeholder"
        :picker-options="pickerOptions">
      </el-date-picker>


    </el-col>
  </div>
</template>

<script>
  export default {
    name: 'search',
    data() {
      return {
        trueVal: '',
      }
    },
    props: {
      item: Object,
      value: {},
      searchItem: Object, // 定义表单对象 type: 'text'
      btnClickHandle : Function,
    },
    computed: {
      baseFmat() {
        return this.searchItem.type == 'date' ? 'yyyy-MM-dd' : 'yyyyMM'
      },
      pickerOptions() {
        if (this.searchItem && this.searchItem.lt) {
          return {
            disabledDate: time => {
              if (!this.item[this.searchItem.lt]) return false
              else if (new Date(time).getTime() > new Date(this.item[this.searchItem.lt]).getTime()) {
                return true
              } else {
                return false
              }
            },
          }
        }
        if (this.searchItem && this.searchItem.lte) {
          return {
            disabledDate: time => {
              if (!this.item[this.searchItem.lte]) return false
              else if (new Date(time).getTime() >= new Date(this.item[this.searchItem.lte]).getTime()) {
                return true
              } else {
                return false
              }
            },
          }
        }
        if (this.searchItem && this.searchItem.gt) {
          return {
            disabledDate: time => {
              if (!this.item[this.searchItem.gt]) return false
              else if (new Date(this.$moment(new Date(time)).format("YYYY-MM-DD")).getTime() <= new Date(this.item[this.searchItem.gt]).getTime()) {
                return true
              } else {
                return false
              }
            },
          }
        }if (this.searchItem && this.searchItem.gte) {
          return {
            disabledDate: time => {
              if (!this.item[this.searchItem.gte]) return false
              else if (new Date(this.$moment(new Date(time)).format("YYYY-MM-DD")).getTime() < new Date(this.item[this.searchItem.gte]).getTime()) {
                return true
              } else {
                return false
              }
            },
          }
        }
        return null
      },
    },
    methods: {
      doQuery () {
        console.log('keyup');
        this.$emit('doQuery');
        if(this.btnClickHandle)
          return this.btnClickHandle();
      },
      valueChange() {
        let newObj = Object.create({})
        // newObj[this.searchItem.property] = val;
        this.$nextTick(() => {
          // console.log(this);
          if (this.searchItem.format) {
            if (this.item[this.searchItem.property])
              this.item[this.searchItem.property] = this.item[this.searchItem.property].replace(
                this.searchItem.format,
                ''
              )
          }
          this.$emit('valueChange', this.searchItem.property)
        })
      },
    },
    watch: {
      value(val, oldval) {
        console.log(val, oldval);
      },
    },
    mounted() {
      this.trueVal = this.value
    },
  }
</script>

<style lang="scss" scoped>
  $themeColor: #0f357f;
  .search-label {
    height: 40px;
    line-height: 40px;
    padding-left: 10px;
    color: $themeColor;
    font-size: 16px;
    font-weight: 500;
  }


  /* input范围组件样式 */

  .group_labels {
    display: table;
    color: $themeColor;
    label {
      display: table-cell;
      vertical-align: middle;
    }
    .cc_Ico {
      position: relative;
      left: 7px;
      font-weight: bold;
    }
  }

  .groupIpt_lab {
    position: relative;
    .unit {
      display: block;
      background-color: #fff;
      width: 28px;
      height: 10px;
      margin: auto;
      top: 0;
      bottom: 0;
      right: 1px;
      position: absolute;
      font-size: 13px;
      text-align: center;
    }
  }


  /* end */
</style>
