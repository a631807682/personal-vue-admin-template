import axios from 'axios'


export const getRoles = () => {
  return axios.get('/role')
}

export const getOperableRoles = () => {
  return axios.get('/role/operable')
}

export const addRole = ({ name, menus }) => {
  return axios.post('/role', { name, menus })
}

export const deleteRole = (id) => {
  return axios.delete(`/role/${id}`)
}

export const updateRole = ({ id, name, menus }) => {
  return axios.put(`/role/${id}`, { name, menus })
}
