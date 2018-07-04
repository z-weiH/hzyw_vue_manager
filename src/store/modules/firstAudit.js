import axios from 'axios';

export default {
  state : {
    //审核列表
   items: []
  },
  getters: {
    items: state => state.items
  },
  mutations : {
    setItems(state, data) {
      state.items = data;
    },
  },
  actions : {
    updateAuditItems(context,data) {
      axios.post('/firstAudit/querySubBatchList.htm', data)
      .then(res => {
          if(res.code === '0000'){
            context.commit('setItems',res.result);
          }else{
            context.commit('setItems',[]);
          }
      })
    },
  },
}
