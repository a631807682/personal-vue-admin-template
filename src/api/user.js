import axios from 'axios'

export const login = ({ username, password }) => {
	return axios.put('/user/signIn', { username, password })
}

export const getUsers = (page = 1, limit = 20) => {
	return axios.get('/admin', { params: { page, limit } })
}

export const addUser = ({ username, password }) => {
	return axios.post('/admin', { username, password })
}

export const deleteUser = (id) => {
	return axios.delete('/admin/' + id)
}

export const updataUser = ({ id, password }) => {
	return axios.put('/admin/' + id + '/password', { password })
}
