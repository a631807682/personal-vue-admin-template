import axios from 'axios'

export const login = ({ username, password }) => {
  return axios.put('/user/signIn', { username, password })
}

export const getUsers = (page = 1, limit = 20, search = {}) => {
  let params = Object.assign(search, { page, limit })
  return axios.get('/admin/page', { params })
}

export const addUser = ({ username, password, roleId }) => {
  return axios.post('/admin', { username, password, roleId })
}

export const deleteUser = (id) => {
  return axios.delete(`/admin/id/${id}`)
}

export const updataUserPassword = ({ id, password }) => {
  return axios.put(`/admin/id/${id}/password`, { password })
}

export const updataUserRole = ({ id, roleId }) => {
  return axios.put(`/admin/id/${id}/role`, { roleId })
}

export const getUser = (id) => {
  return axios.get(`/admin/id/${id}`)
}
