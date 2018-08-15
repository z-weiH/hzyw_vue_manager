import axios from 'axios';

export default {
  state : {
    //案件列表
    searchItem: {},
  },
  getters: {
    searchItem: state => state.searchItem,
  },
  mutations : {

    setSearchItem(state, data){
      state.searchItem = data;
    },

  },

}
