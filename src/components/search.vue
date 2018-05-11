<template>
    <div>
      <div class="clear" v-if="searchItem.newline"></div>
      <div class="fl search-label" v-if="searchItem.label">{{searchItem.label+'：'}}</div>
      <el-col class="mb-10"git  :span="searchItem.colSpan ? searchItem.colSpan : 6">
        <el-input v-if="searchItem.type == 'text' || !searchItem.type" v-model="trueVal" :placeholder="searchItem.placeholder"></el-input>
        <el-select v-if="searchItem.type ==  'select'" v-model="trueVal" :placeholder="searchItem.placeholder">
        <el-option
          v-for="option in searchItem.options"
          :key="option.value"
          :label="option.label"
          :value="option.value">
        </el-option>
      </el-select>
      <el-date-picker
        v-if="searchItem.type == 'date' "
        v-model="trueVal"
        type="date"
        :placeholder="searchItem.placeholder">
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
    value: String,
    searchItem: Object // 定义表单对象 type: 'text'
  },
  watch: {
    trueVal (val, oldval) {
      let newObj = Object.create({})
      newObj[this.searchItem.property] = val
      this.$emit('valueChange', newObj)
    }
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
