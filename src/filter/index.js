import Vue from 'vue'
import './dateFormat'

Vue.filter('TimeMoment', function(time) {
	let getTime = (time, type = 'all') => {
		let myDate = new Date(time);
		let year = myDate.getFullYear();
		let month = myDate.getMonth() + 1 >= 10 ? myDate.getMonth() + 1 : '0' + (myDate.getMonth() + 1);
		let day = myDate.getDate() >= 10 ? myDate.getDate() : '0' + myDate.getDate();
		let hours = myDate.getHours() >= 10 ? myDate.getHours() : '0' + myDate.getHours();
		let minutes = myDate.getMinutes() >= 10 ? myDate.getMinutes() : '0' + myDate.getMinutes();
		let seconds = myDate.getSeconds() >= 10 ? myDate.getSeconds() : '0' + myDate.getSeconds();
		if (type === 'year') {
			return year;
		} else if (type === 'month') {
			return year + '-' + month;
		} else if (type === 'day') {
			return year + '-' + month + '-' + day;
		} else if (type === 'hours') {
			return hours;
		} else if (type === 'minutes') {
			return hours + '-' + minutes;
		} else if (type === 'seconds') {
			return hours + '-' + minutes + '-' + seconds;
		} else if (type === 'all') {
			return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
		}
	}
	return getTime(time);
	})

	Vue.filter('TimeMomentChina',function(time) {
		let myDate = new Date(time);
		let year = myDate.getFullYear();
		let month = myDate.getMonth() + 1 >= 10 ? myDate.getMonth() + 1 : '0' + (myDate.getMonth() + 1);
		let day = myDate.getDate() >= 10 ? myDate.getDate() : '0' + myDate.getDate();
		let weekIndex = myDate.getDay();
		let week = ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
		return year + '年' + month + '月' + day + '日 ' + week[weekIndex];
	});
