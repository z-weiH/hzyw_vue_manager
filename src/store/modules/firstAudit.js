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
      console.error(data);
    },
  },
  actions : {
    updateAuditItems(context,data) {
      console.error('updateAuditItems');
      axios.post('/firstAudit/querySubBatchList.htm', data)
      .then(res => {
        console.error('api',res);
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