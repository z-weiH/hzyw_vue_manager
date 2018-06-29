import Vue from 'vue'
import Vuex from 'vuex'

import menu from './modules/menu'
import audit from './modules/firstAudit'
Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		menu,
    audit
	}
})
