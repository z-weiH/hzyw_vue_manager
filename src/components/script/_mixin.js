/**
 * @method
 * @description 定义列表页面的基本属性和方法
 */
import Mock from 'mockjs'
export default {
  data() {
    return {
      tableData: [], // 表格的数据源
      fixedSearchItrems: {}, // 放置固定的查询条件
      editState: 0, // 页面的编辑状态 0 未操作 1 编辑 2 新增
      queryUrl: '', // 查询api的路径 必写
      searchitem: {},
      pager: {
        currentNum: 1,
        pageSize: 10,
        count: 0,
      },
      _createElement: null,
    }
  },
  // 待解决
  // mounted () {
  //   console.log(this)
  //   this.doQuery(this.queryUrl,this.searchitem)
  // },
  methods: {
    // 该方法和query一直-配置是mock的规则，调试模拟数据用
    query_mock(url, item) {
      Object.assign(item, this.pager, this.fixedSearchItrems)
      let promise = this.$http.post(url, item).then(res => {
        console.log('query::数据')
        // mock格式转换成正规json格式
        res = Mock.mock(res)
        console.log(res)
        if (res.code === '0000') {
          this.tableData = res.result.list
          this.pager.count = res.result.count
        } else {
          this.$message.error(res.description)
        }
        return res
      })
      return promise
    },
    /**
     * @method
     * @description 基本的查询操作
     * @param searchitem 从父类里传递过来的查询条件
     * @return Promise包装的查询结果,实际页面可以做其他操作
     */
    query(url, item) {
      Object.assign(item, this.pager, this.fixedSearchItrems)
      let promise = this.$http.post(url, item).then(res => {
        console.log('query::数据')
        // mock格式转换成正规json格式
        // res = Mock.mock(res)
        console.log(res)
        if (res.code === '0000') {
          this.tableData = res.result.list
          this.pager.count = res.result.count
        } else {
          this.$message.error(res.description)
        }
        return res
      })
      return promise
    },
    /**
     * @method
     * @description 实际查询操作，子组件有特殊情况用于重写
     * @param item 查询条件
     */
    doQuery(url, item) {
      this.query_mock ?
       this.query_mock(url, item)
       :this.query(url, item)
    },
    queryDetail(url, item) {
      return this.$http.post(url, item).then(res => {
        res = Mock.mock(res)
        return res
      })
    },
    beforeClose(action, instance, done) {
      console.log(action, instance, done)
    },
    async showConfirm(msg) {
      let promise = new Promise((resolve, reject) => {
        this.$confirm(msg ? msg : '是否确认删除？', '提示', {
          center: true,
        })
          .then(res => {
            //点取消
            resolve(true)
          })
          .catch(err => {
            //点确定
            resolve(false)
          })
      })
      return promise
    },
    /**
     * @method
     * @description 刷新表格
     */
    refresh() {
      this.editState = 0
      this.doQuery(this.queryUrl, this.searchItem)
    },
  },
}
