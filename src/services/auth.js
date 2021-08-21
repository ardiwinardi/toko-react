import api from 'utils/api'

const signin = async (body) => {
  const response = await api
    .post(`auth/signin`, body)
    .catch((err) => console.log(err))

  return response ? response.data.data : null
}

const getMe = async () => {
  const response = await api.get(`auth/me`).catch((err) => console.log(err))
  return response ? response.data.data : null
}

const authService = {
  signin,
  getMe,
}

export default authService
