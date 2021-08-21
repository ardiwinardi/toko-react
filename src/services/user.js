import api from 'utils/api'

const update = async (body) => {
  await api.put(`users`, body)
}

const userService = {
  update,
}

export default userService
