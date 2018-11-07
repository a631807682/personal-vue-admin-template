import axios from 'axios'

export const updataPassword = ({ oldPassword, newPassword }) => {
  return axios.put('/personal/password', { oldPassword, newPassword })
}
