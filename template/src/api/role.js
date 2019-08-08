import axios from 'axios'

export const getRoles = () => {
  return axios.get('/role')
}

export const getOperableRoles = () => {
  return axios.get('/role/operable')
}

export const getPageOperableRoles = (page = 1, limit = 20, search = {}) => {
  let params = Object.assign({ page, limit }, search)
  return axios.get('/role/page/operable', { params })
}

export const getRole = (id) => {
  return axios.get(`/role/id/${id}`)
}

export const addRole = ({ name, menus }) => {
  return axios.post('/role', { name, menus })
}

export const deleteRole = (id) => {
  return axios.delete(`/role/id/${id}`)
}

export const updateRole = ({ id, name, menus }) => {
  return axios.put(`/role/id/${id}`, { name, menus })
}
