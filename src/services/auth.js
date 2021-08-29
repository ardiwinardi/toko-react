import api from 'utils/api'

// synchronous
const signin2 = async (body) => {
  console.log('perintah pertama dijalankan')
  const response = await api
    .post(`auth/signin`, body)
    .catch((err) => console.log(err))

  console.log('perintah kedua dijalankan setelah pertama selesai')
  return response ? response.data.data : null
}

// asynchronous
const signin = (body) => {
  console.log('perintah pertama dijalankan')
  return api
    .post(`auth/signin`, body)
    .then((response) => {
      console.log('perintah kedua', response)
      return response.data.data
    })
    .catch((err) => console.log(err))
}

const getMe = async () => {
  const response = await api.get(`auth/me`).catch((err) => console.log(err))
  return response ? response.data.data : null
}

const authService = {
  signin2,
  signin,
  getMe,
}

export default authService
