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
  /**
   * @method
   * @description 表格组件
   * @prop tableData // Object[] 表格显示的源数据
   * @prop columnDefine // Object[] 定义表格的列 label表示列头 property 表示列绑定的属性名，width 表示宽度
                    例子： [
                             {label: '序号',property: 'index'，width:180},
                             {label: '用户名',property: 'name',width:180},
                             {label: '真实姓名',property: 'truename',width:180},
                             {label: '手机号码',property: 'phonenumber',width:180},
                           ]
   @prop spanMethod //Function  用来定义单元格合并  
   */
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
        if(it.children){
          if(it.status)
            it.children.forEach(it => it.hidden = false)
          else
            it.children.forEach(it => it.hidden = true)
          arr.push(...it.children)
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
        if(it.children){
          arr.push(...it.children)
        }
      })
      console.log(arr)
      return arr
    },
    defineHeader (createElement, column) {
      console.log(column, 'column')
      let col = this.columns.find(it => it.property == column.column.property)
      if (col && col.children && col.children.length) {
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
