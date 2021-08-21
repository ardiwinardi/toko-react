import api from 'utils/api'

const getAll = async () => {
  try {
    const res = await api.get(`orders`)
    return res.data.data
  } catch (err) {
    console.log(err)
  }

  return []
}

const add = async () => {
  await api.post(`orders`)
}

const orderService = {
  getAll,
  add,
}

export default orderService
