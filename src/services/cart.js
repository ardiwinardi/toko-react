import api from 'utils/api'

const getAll = async () => {
  try {
    const res = await api.get(`carts`)
    return res.data.data
  } catch (err) {
    console.log(err)
  }

  return []
}

const add = async (product) => {
  await api.post(`carts`, { product_id: product.id, quantity: 1 })
}

const remove = async (cart) => {
  try {
    await api.delete(`carts/${cart.id}`)
  } catch (err) {
    console.log(err)
  }
}

const update = async (body, id) => {
  try {
    await api.put(`carts/${id}`, body)
  } catch (err) {
    console.log(err)
  }
}

const cartService = {
  getAll,
  add,
  remove,
  update,
}

export default cartService
