import axios from 'axios'
import { localStore } from 'src/lib/utils'

export const getRefreshToken = () => {
  let refreshToken = localStore.getRefreshToken()
  return axios.put('/token/refresh', null, { headers: { refresh_token: refreshToken } }).then(data => {
    localStore.saveUser(data)
  })
}
