import * as Vuex from 'vuex'
import main from './modules/default'

export default new Vuex.Store({
	modules: {
		main: main,
	},
})
