import axios from 'axios'
import { localStore } from 'src/lib/utils'


export const getRefreshToken = () => {
  let refresh_token = localStore.getRefreshToken();
  return axios.put('/token/refresh', null, { headers: { refresh_token }, }).then(data => {
    localStore.saveUser(data);
  })
}
