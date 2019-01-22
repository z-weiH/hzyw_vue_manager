import axios from 'axios'
import moment from 'moment'

export default {
	namespaced: true,
	state : {
		// 菜单 当前选中
		menuActive : '',
		// 推送记录 活跃客户数量
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
				url : '/pushRecord/pushInfoList.htm',
				data : {
					startDate: moment().format('YYYY-MM-DD 00:00:00'),
          endDate: moment().format('YYYY-MM-DD hh:mm:ss'),
				},
			}).then((res) => {
				context.commit('setPushRecordUnread',res.result.clientCount);
			});
		},
	},
}