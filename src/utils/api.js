import axios from 'axios'
import { NotificationManager } from 'react-notifications'
const api = axios.create({
  baseURL: `http://localhost:3200/`,
})

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      // window.location.href = "/login";
    } else {
      NotificationManager.error(error.response.data.messages, 'Gagal')
    }
    return Promise.reject(error)
  },
)

export default api
