import api from 'utils/api'

const getAll = async () => {
  const response = await api.get(`orders`).catch((err) => console.log(err))
  return response ? response.data.data : []
}

const add = async () => {
  await api.post(`orders`)
}

const orderService = {
  getAll,
  add,
}

export default orderService
