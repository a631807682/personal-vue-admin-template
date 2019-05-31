import Vue from 'vue'
import axios from 'axios'
import router from 'src/router'

import store from 'src/store'
import { SET_HTTP_ERROR, SET_BUSINESS_ERROR } from 'src/store/mutation-types'
import { localStore } from 'src/lib/utils'

//api
import * as user from 'src/api/user'
import * as role from 'src/api/role'
import * as personal from 'src/api/personal'
import * as tokenService from 'src/api/token'

import * as upload from 'src/api/upload'

// 服务地址
const backendHost = process.env.API_HOST + process.env.BACKEND;

// 登陆接口正则
const loginRegex = new RegExp(/^\/user\/signIn/);

axios.defaults.baseURL = backendHost;

axios.interceptors.request.use(config => {
  if (!loginRegex.test(config.url)) {
    config.headers.token = localStore.getToken();
  }

  return config
}, error => {
  return Promise.reject(error)
})


axios.interceptors.response.use(response => {
  // console.log('success')
  return response.data.result
}, error => {
  let { response } = error;
  if (!response) {
    //network error
    store.commit(SET_HTTP_ERROR, 'Network Error');
    return Promise.reject(error)
  }
  let { status, data, config } = response;

  let errorMsg = data.error;
  if (status === 400) {
    store.commit(SET_BUSINESS_ERROR, errorMsg)
    //触发catch 不在then中执行
    return Promise.reject(errorMsg);
  } else if (status === 401) { // 跳转登陆
    let sysCode = response.data.sysCode;
    console.log('sysCode', response.data.sysCode)
    if (sysCode === 10002) {
      // refresh续签后重试
      return tokenService.getRefreshToken().then(() => {
        return axios.request(config);
      });

    } else if (sysCode === 10003) {
      router.replace({
        path: '/login',
        query: { redirect: router.currentRoute.fullPath }
      })
      return Promise.reject(errorMsg);
    }
  } else {
    // 其他接口及错误
    store.commit(SET_HTTP_ERROR, { status, data })
    return Promise.reject(error.response)
  }
})

//api
export const userService = user;
export const roleService = role;
export const personalService = personal;

export const uploadPath = backendHost + upload.uploadPath;
export const apkUploadPath = backendHost + upload.apkUploadPath;
