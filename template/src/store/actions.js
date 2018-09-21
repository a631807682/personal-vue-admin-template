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

/**
 * 打开关闭图库
 * @param  {[type]} options.commit  [description]
 * @param  {[type]} options.visible [description]
 * @return {[type]}                 [description]
 */
export const picturesDialogVisible = ({ commit }, { visible }) => {
	commit(types.SET_PICS_DIALOG_VISIBLE, { visible })
}

/**
 * 选中图库的图片
 * @param  {[type]} options.commit  [description]
 * @param  {[type]} options.picture [description]
 * @return {[type]}                 [description]
 */
export const picturesDialogChoosePic =  ({ commit }, { picture }) => {
	commit(types.SET_PICS_DIALOG_CHOOSE, { picture })
}

/**
 * 打开关闭场景库
 * @param  {[type]} options.commit  [description]
 * @param  {[type]} options.visible [description]
 * @return {[type]}                 [description]
 */
export const scenesDialogVisible = ({ commit }, { visible }) => {
	commit(types.SET_SCENES_DIALOG_VISIBLE, { visible })
}


/**
 * 选中场景库的场景
 * @param  {[type]} options.commit  [description]
 * @param  {[type]} options.picture [description]
 * @return {[type]}                 [description]
 */
export const scenesDialogChooseScene =  ({ commit }, { scene }) => {
	commit(types.SET_SCENES_DIALOG_CHOOSE, { scene })
}


/**
 * 选中场景库的场景
 * @param  {[type]} options.commit  [description]
 * @param  {[type]} options.picture [description]
 * @return {[type]}                 [description]
 */
export const scenesDialogInit =  ({ commit }, { scenes }) => {
	commit(types.SET_SCENES_DIALOG_INIT, { scenes })
}



