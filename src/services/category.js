import api from 'utils/api'

const getAll = async () => {
  const response = await api.get(`categories`).catch((err) => console.log(err))
  return response ? response.data.data : []
}

const categoryService = {
  getAll,
}

export default categoryService
