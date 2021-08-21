import api from 'utils/api'

const getAll = async () => {
  const response = await api.get(`carts`).catch((err) => console.log(err))
  return response ? response.data.data : []
}

const add = async (product) => {
  await api.post(`carts`, { product_id: product.id, quantity: 1 })
}

const remove = async (cart) => {
  await api.delete(`carts/${cart.id}`).catch((err) => console.log(err))
}

const update = async (body, id) => {
  await api.put(`carts/${id}`, body).catch((err) => console.log(err))
}

const cartService = {
  getAll,
  add,
  remove,
  update,
}

export default cartService
