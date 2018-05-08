<template>
  <div class="search">
    <el-row :gutter="3">
      <div v-for="(search, index) in searchItems" :key="index">
        <search-item  v-bind:value="item[search.propname]" v-bind:search-item="search" @valueChange="valueChange"></search-item>
      </div>
      <el-col :span="3">
        <el-button type="success" @click="btnClickHandle">查询</el-button>
      </el-col>
      <slot name="moreBtn"></slot>
    </el-row>
  </div>
</template>

<script>
import SearchItem from './search.vue'
export default {
  name: 'search',
  props: {
    searchItems: {
      type: Array,
      default: () => {
        return []
      }
    }, // 定义显示的表单
    item: {
      type: Object,
      default: () => {
        return {}
      }
    } // 关联表单的数据
  },
  methods: {
    btnClickHandle () {
      console.log(this.searchItems, this.item)
      this.$parent.doQuery(this.item)
    },
    valueChange (newVal) {
      Object.assign(this.item, newVal)
    }
  },
  components: {
    SearchItem
  },
  mounted () {
    console.log(this.searchItems, this.item)
  }
}
</script>

<style >
  .el-date-editor.el-input,.el-select,.el-date-editor.el-input__inner{
    width: 100%;
  }

</style>
