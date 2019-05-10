import Vue from 'vue'
import Vuex from 'vuex'

import menu from './modules/menu'
import keepAlive from './modules/keepAlive'
import audit from './modules/firstAudit'
import  redoHear from './modules/redoHear'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		menu,
    audit,
		redoHear,
		keepAlive,
	},
})
