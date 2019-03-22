import axios from 'axios';

export default {
  state : {
    //查询参数
    searchItem: {
      'redo': {},
      'first': {},
    },

    //当前页数
    pager: {
      'redo':{
        total: 11,
        currentPage: 1,
        pageSize: 10
      },
      'first': {
        total: 11,
        currentPage: 1,
        pageSize: 10
      }

    }


  },
  getters: {
    searchItemClone: state => state.searchItem,
    savedConfig: state => state.savedConfig,
    pagerClone: state => state.pager
  },
  mutations : {

    setSearchItem(state, data){
      state.searchItem[data.prop] = data.value;
    },
    setPager(state, data){
      state.pager[data.prop] = data.value;
    },
    setSavedConfig(state, data){
      console.error('---------------------',data);
      state.savedConfig = data;
    },

  },

}
