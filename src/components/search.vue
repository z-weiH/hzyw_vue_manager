<template>
    <div>
      <div class="clear" v-if="searchItem.newline"></div>
      <div class="fl search-label" v-if="searchItem.label">{{searchItem.label+'：'}}</div>
      <el-col class="mb-10"  :span="searchItem.colSpan ? searchItem.colSpan : 6">
        <el-input v-if="searchItem.type == 'text' || !searchItem.type" v-model="item[searchItem.property]" :placeholder="searchItem.placeholder"></el-input>
        <el-select clearable @change="valueChange" v-if="searchItem.type ==  'select'" v-model="item[searchItem.property]" :placeholder="searchItem.placeholder">
        <el-option
          v-for="(option,index) in searchItem.options"
          :key="index"
          :label="searchItem.labelfield ? option[searchItem.labelfield] : option.label"
          :value="searchItem.valuefield ? option[searchItem.valuefield] : option.value">
        </el-option>
      </el-select>
      <el-date-picker
        value-format="yyyy-MM-dd"
        v-if="searchItem.type == 'date' "
        v-model="item[searchItem.property]"
        type="date"
        :placeholder="searchItem.placeholder"
        :picker-options="pickerOptions"
        >
      </el-date-picker>

      </el-col>
    </div>
</template>

<script>
export default {
  name: 'search',
  data () {
    return {
      trueVal: ''
    }
  },
  props: {
    item: Object,
    value: {},
    searchItem: Object // 定义表单对象 type: 'text'
  },
  computed:{
    pickerOptions() {
      if(this.searchItem && this.searchItem.limit){
        return {disabledDate: this.searchItem.limit}
      }
      return null;
    }
  },
  methods: {
    valueChange() {
      let newObj = Object.create({});
      // newObj[this.searchItem.property] = val;
      this.$emit('valueChange', this.searchItem.property)
    }
  },
  watch: {
    value (val,oldval){
      console.log(val,oldval)
    },

  },
  mounted () {
    this.trueVal = this.value
  }
}
</script>

<style scoped>
.search-label{
  height: 40px;
  line-height: 40px;
  padding-left: 10px;
  color: #0F357F;
  font-size: 16px;
  font-weight: 500;
}
</style>
