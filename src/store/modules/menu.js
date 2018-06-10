import axios from 'axios'

export default {
	namespaced: true,
	state : {
		// 菜单 当前选中
		menuActive : '',
		// 推送记录 未读数量
		pushRecordUnread : 0,
	},
	mutations : {
		setMenuActive(state, data) {
			state.menuActive = data;
		},
		setPushRecordUnread(state, data) {
			state.pushRecordUnread = data;
		},
	},
	actions : {
		upDataPushRecordUnread(context) {
			axios({
				method : 'post',
				url : '/pushRecord/queryUnReadMsgNum.htm',
			}).then((res) => {
				context.commit('setPushRecordUnread',res.result.unReadMsgNum);
			});
		},
	},
}