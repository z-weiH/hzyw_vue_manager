<template>
  <el-table
    :data="tableData"
    :span-method="spanMethod"
    stripe
    border
   >
    <el-table-column v-for="(col, index) of columns" :v-key="index"
      :prop="col.property"
      :label="col.label"
      :render-header="defineHeader"
      v-if="!col.hidden"
      width="180">
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'table',
  props: {
    tableData: Array,
    columnDefine: Array,
    spanMethod: Function
  },
  computed:{
    columns () {
      let arr = []
      this.columnDefine.forEach(it => {
        arr.push(it)
        if(it.childs){
          if(it.status)
            it.childs.forEach(it => it.hidden = false)
          else
            it.childs.forEach(it => it.hidden = true)
          arr.push(...it.childs)
        }
      })
      return arr
    }
  },
  methods: {
    refresh () {
      let arr = []
      this.columnDefine.forEach(it => {
        arr.push(it)
        if(it.childs){
          arr.push(...it.childs)
        }
      })
      console.log(arr)
      return arr
    },
    defineHeader (createElement, column) {
      console.log(column, 'column')
      let col = this.columns.find(it => it.property == column.column.property)
      if (col && col.childs && col.childs.length) {
        let ele= createElement('i',{
          on: {
            click: () => this.toggleTable(col,ele)
          },
          style: {
            border: '1px solid #666',
            padding: '0 3px',
            marginLeft: '5px'
          }
        },'+')
        return createElement('div',[
          createElement('span',{},col.label),
          ele
        ])
      }else{
        return col.label
      }
    },
    toggleTable(col,ele) {
      col.status =  !col.status
      console.log(ele)
      ele.elm.innerHTML = col.status ? '-' : '+'
      this.$set(this.columnDefine,this.columnDefine.findIndex(it => it.property == col.property),col)
    }
  },
  mounted () {
    console.log(this.tableData)
  }
}
</script>

<style scoped>

</style>
