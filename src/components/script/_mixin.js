/**
 * @method
 * @description 定义列表页面的基本属性和方法
 */
import Mock from 'mockjs'
export default {
  data () {
    return {
      tableData: [],  // 表格的数据源
      fixedSearchItrems: {},
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
    query (url, item) {
      Object.assign(item,this.fixedSearchItrems)
     return this.$http.post(url, item)
       .then(res => {
         res = Mock.mock(res)
         if(res instanceof Object)
           this.tableData = [res]
         else
           this.tableData = res
         return res
       })
    },
    /**
     * @method
     * @description 实际查询操作，子组件有特殊情况用于重写
     * @param item 查询条件
     */
    doQuery (url, item) {
      this.query(url, item)
    },
    edit (url, item) {
      return this.$http.get(url, {
        params:item
      }).then(res => {
        return res;
      })
    }
  }
}
