import api from 'utils/api'

const getAll = async ({ offset = 0, limit = 10, category = '' }) => {
  const queries = []

  if (limit) {
    queries.push(`offset=${offset}&limit=${limit}`)
  }
  if (category) {
    queries.push(`category_id=${category}`)
  }

  const response = await api
    .get(`products?${queries.join('&')}`)
    .catch((err) => console.log(err))
  return response ? response.data.data : []
}

const getBySlug = async (slug) => {
  const response = await api
    .get(`products/${slug}`)
    .catch((err) => console.log(err))

  return response ? response.data.data : null
}

const productService = {
  getAll,
  getBySlug,
}

export default productService
