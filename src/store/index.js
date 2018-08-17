import Vue from 'vue'
import Vuex from 'vuex'

import menu from './modules/menu'
import audit from './modules/firstAudit'
import  redoHear from './modules/redoHear'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		menu,
    audit,
    redoHear
	}
})
