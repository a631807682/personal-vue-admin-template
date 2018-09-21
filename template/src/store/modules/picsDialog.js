import { SET_PICS_DIALOG_VISIBLE, SET_PICS_DIALOG_CHOOSE } from '../mutation-types'

const state = {
	visible: false,
	picture: null
}

// mutations
const mutations = {
	[SET_PICS_DIALOG_VISIBLE](state, { visible }) {
		state.visible = visible;
	},
	[SET_PICS_DIALOG_CHOOSE](state, { picture }) {
		state.picture = picture;
	}

}


export default {
	state,
	mutations
}
