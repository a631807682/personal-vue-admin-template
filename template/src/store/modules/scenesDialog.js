import { SET_SCENES_DIALOG_VISIBLE, SET_SCENES_DIALOG_CHOOSE, SET_SCENES_DIALOG_INIT } from '../mutation-types'

const state = {
	visible: false,
	scenes: [],
	scene: null
}

// mutations
const mutations = {
	[SET_SCENES_DIALOG_VISIBLE](state, { visible }) {
		state.visible = visible;
	},
	[SET_SCENES_DIALOG_CHOOSE](state, { scene }) {
		state.scene = scene;
	},
	[SET_SCENES_DIALOG_INIT](state, { scenes }) {
		state.scenes = scenes;
	}
}


export default {
	state,
	mutations
}
