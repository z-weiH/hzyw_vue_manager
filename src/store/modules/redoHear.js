import axios from 'axios';

export default {
  state : {
    //案件列表
    searchItem: {},
    //复审当前的currentNUm和查询条件
    savedConfig: null

  },
  getters: {
    searchItem: state => state.searchItem,
    savedConfig: state => state.savedConfig,
  },
  mutations : {

    setSearchItem(state, data){
      state.searchItem = data;
    },
    setSavedConfig(state, data){
      console.error('---------------------',data);
      state.savedConfig = data;
    },

  },

}
