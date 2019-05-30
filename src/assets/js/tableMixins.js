export default ({url = '' , method = 'post' , render = '' , init = true}) => {
  return {
    data() {
      return {
        // 表格数据
        tableData : [],
        // 数据总数
        total : 0,
        // 当前页数
        currentPage : 1,
        // 每页数量
        pageSize : 10,
      }
    },
    mounted() {
      init === true && this.initTableList();
    },
    methods: {
      // 表格相关 start

      // 初始化 表格数据
      initTableList() {
        this.$http({
          url : url,
          method : method,
          data : {
            pageSize : this.pageSize,
            currentNum : this.currentPage,

            ...this.searchForm,
          },
        }).then((res) => {
          if(render) {
            render(res);
          }else{
            this.total = res.result.count;
            this.tableData = res.result.list;
          }
        });
      },
      // 页数 change
      handleSizeChange(val) {
        this.pageSize = val;
        this.currentPage = 1;
        this.initTableList();
      },
      // 分页 change
      handleCurrentChange(val) {
        this.currentPage = val; 
        this.initTableList();
      },

      // 表格相关 end

      // 查询 重置为第一页
      handleSearch() {
        this.currentPage = 1;
        this.initTableList();
      },
      // 重置
      reset() {
        this.currentPage = 1;
        this.pageSize = 10;
        if(this.$refs.pagination) {
          this.$refs.pagination.$children[0].internalPageSize = 10;
        }
      },
      // 重置 并搜索
      reseting() {
        this.reset();
        this.initTableList();
      },
    },
  }
}