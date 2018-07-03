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
            res.result.forEach(it => {
              !it.passNum && (it.passNum = 0);
              !it.unpassNum && (it.unpassNum = 0);
            })
            context.commit('setItems',res.result);
          }
      })
    },
  },
}
