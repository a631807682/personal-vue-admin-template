import { SET_HTTP_ERROR, CLEAR_ERROR, SET_BUSINESS_ERROR } from '../mutation-types'

const state = {
    error: false,
    type: '',
    message: '',
    // timestamp: ''
}

// mutations
const mutations = {
    [SET_HTTP_ERROR](state, error) {
        state.error = true;
        state.type = 'HTTP_ERROR';
        state.message = error;
        // state.timestamp = new Date().getTime();
    },
    [SET_BUSINESS_ERROR](state, error) {
        state.error = true;
        state.type = 'BUSINESS_ERROR';
        state.message = error;
        // state.timestamp = new Date().getTime();
    },
    [CLEAR_ERROR](state) {
        state.error = false;
        state.type = '';
        state.message = '';
        // state.timestamp = '';
    }
}


export default {
    state,
    mutations
}
