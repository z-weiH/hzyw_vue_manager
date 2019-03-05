export default ({url = '' , method = 'post' , render = ''}) => {
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

            ...this.ruleForm,
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
    },
  }
}