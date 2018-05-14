<template>
  <form action="">
  <div class="search">
    <el-row :gutter="10">
      <div v-for="(search, index) in searchItems" :key="index">
        <search-item  v-bind:value="item[search.property]" v-bind:search-item="search" @valueChange="valueChange"></search-item>
      </div>

      <el-button class="fl" type="warning" @click="btnClickHandle">查询</el-button>
      <slot name="moreBtn"></slot>
    </el-row>
  </div>
  </form>
</template>

<script>
/**
 * @description 查询条件组件
 * @props item 类型 Object  以对象形式存放查询条件数据
 * @props searchItems 类型 Object[]  每个object定义一个查询条件
 *        属性： label //string 搜索组件的label字段说明
 *        属性： colSpan  //number  div被等分成24分，columns表示占几分 ，从1到24
 *        属性： property //string  表示该查询条件绑定到 item上的属性名
 *        属性： placeholder //string  placeholder
 *        属性： type //string 查询框类型 text表示文本输入,select表示下拉框,date表示日期
 *        属性： defaultValue //any  给该查询条件定义默认值
 */
import SearchItem from './search.vue'
export default {
  name: 'search',
  props: {
    searchItems: {
      type: Array,
      default: () => {
        return []
      },
    }, // 定义显示的表单
    item: {
      type: Object,
      default: () => {
        return {}
      }
    }, // 关联表单的数据
    queryUrl: String
  },
  methods: {
    btnClickHandle () {
      console.log(this.queryUrl)
      this.$parent.doQuery(this.queryUrl,this.item)
    },
    valueChange (newVal) {
      Object.keys(newVal).forEach(key => {
        this.item[key] = newVal[key];
      })
      // Object.assign(this.item, newVal)
      // console.log(this.item)
    }
  },
  components: {
    SearchItem
  }

}
</script>

<style >
  .el-date-editor.el-input,.el-select,.el-date-editor.el-input__inner{
    width: 100%;
  }

</style>
