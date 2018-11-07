import api from "../api"
import * as types from './mutation-types'


/**
 * 清楚错误信息
 * @param  {[type]} options.commit [description]
 * @return {[type]}                [description]
 */
export const clearError = ({ commit }) => {
	commit(types.CLEAR_ERROR)
}

/**
 * 本地组件数据存储
 * @param  {[type]} options.commit [description]
 * @param  {[type]} key            [description]
 * @param  {[type]} val            [description]
 * @return {[type]}                [description]
 */
export const local = ({ commit }, { field, val }) => {
	commit(types.SET_LOCAL, { field, val })
}

