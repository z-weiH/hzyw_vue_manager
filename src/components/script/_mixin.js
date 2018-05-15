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
        currentPage: 1,
        pageSize: 10,
        total: 500
      }
    }
  },
  // 待解决
  // mounted () {
  //   console.log(this)
  //   this.doQuery(this.queryUrl,this.searchitem)
  // },
  methods: {
    /**
     * @method
     * @description 基本的查询操作
     * @param searchitem 从父类里传递过来的查询条件
     * @return Promise包装的查询结果,实际页面可以做其他操作
     */
    query(url, item) {
      Object.assign(item, this.pager, this.fixedSearchItrems);
      return this.$http.post(url, item)
        .then(res => {
          res = Mock.mock(res);
          console.log(res);
          if(res.code){
            this.tableData = res.result.list;
            this.pager.total = res.result.count;
          }
          return res
        })
    },
    /**
     * @method
     * @description 实际查询操作，子组件有特殊情况用于重写
     * @param item 查询条件
     */
    doQuery(url, item) {
      this.query(url, item)
    },
    edit(url, item) {
      return this.$http.get(url, {
        params: item
      }).then(res => {
        return res;
      })
    },
    async showConfirm(){
      let promise = new Promise((resolve,reject)=>{
        this.$confirm('是否确认删除？', '提示', {
          cancelButtonText: '确定',
          confirmButtonText: '取消',
          cancelButtonClass: 'cancel',
          confirmButtonClass: 'confirm',
          center: true
        }).then(res => {
          //点取消
          resolve(false)
        }).catch(err => {
          //点确定
          resolve(true)
        })
      });
      return promise;
    }


  }
}
