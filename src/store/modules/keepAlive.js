export default {
	namespaced: true,
	state : {
    // 是否缓存 keep-alive true-缓存 false-不缓存
		keepAliveStatus : false,
	},
	mutations : {
		setkeepAliveStatus(state, data) {
			state.keepAliveStatus = data;
		},
	},
	actions : {

	},
}