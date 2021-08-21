import axios from 'axios'

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
  }
)

api.interceptors.response.use(
  function (response) {
    return response
  },
  function (error) {
    if (error.response.status === 401) {
      // window.location.href = "/login";
    }
    return Promise.reject(error)
  }
)

export default api
