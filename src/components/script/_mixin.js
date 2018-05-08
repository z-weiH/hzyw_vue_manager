/**
 * @method
 * @description 定义列表页面的基本属性和方法
 */
export default {
  data () {
    return {
      tableData: []  // 表格的数据源
    }
  },
  mounted () {
    console.log('from basePage')
  },
  methods: {
    /**
     * @method
     * @description 基本的查询操作
     * @param searchitem 从父类里传递过来的查询条件
     * @return Promise包装的查询结果,实际页面可以做其他操作
     */
    query (item) {
      console.log(item)
      this.tableData=[
        {name:'张三', sex: '男', age: '33', fiveYears: '28'},
        {name:'张三1', sex: '男', age: '33', fiveYears: '28'},
        {name:'张三2', sex: '男', age: '33', fiveYears: '28'},
        {name:'张三3', sex: '男', age: '33', fiveYears: '28'}
      ]
    },
    /**
     * @method
     * @description 实际查询操作，子组件有特殊情况用于重写
     * @param item 查询条件
     */
    doQuery (item) {
      this.query(item)
    }
  }
}
