import { SET_LOCAL } from '../mutation-types'

const state = {
	collapsed: false

}

// mutations
const mutations = {
	[SET_LOCAL](state, { field, val }) {
		state[field] = val;
	}
	// [SET_LEFTMEUS_COLLAPSED](state, val) {
	//     state.leftMenu.collapsed = true;
	// }
}


export default {
	state,
	mutations
}
