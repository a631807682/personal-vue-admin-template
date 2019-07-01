import axios from 'axios'

export const login = ({ username, password }) => {
  return axios.put('/user/signIn', { username, password })
}

export const getUsers = (page = 1, limit = 20) => {
  return axios.get('/admin', { params: { page, limit } })
}

export const addUser = ({ username, password, roleId }) => {
  return axios.post('/admin', { username, password, roleId })
}

export const deleteUser = (id) => {
  return axios.delete(`/admin/${id}`)
}

export const updataUserPassword = ({ id, password }) => {
  return axios.put(`/admin/${id}/password`, { password })
}

export const updataUserRole = ({ id, roleId }) => {
  return axios.put(`/admin/${id}/role`, { roleId })
}
