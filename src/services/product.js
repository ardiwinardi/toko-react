import api from "utils/api";

const getAll = async ({ offset = 0, limit = 10, category = "" }) => {
  try {
    const queries = [];

    if (limit) {
      queries.push(`offset=${offset}&limit=${limit}`);
    }
    if (category) {
      queries.push(`category_id=${category}`);
    }

    const res = await api.get(`products?${queries.join("&")}`);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }

  return [];
};

const getBySlug = async (slug) => {
  try {
    const res = await api.get(`products/${slug}`);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }

  return null;
};

const productService = {
  getAll,
  getBySlug,
};

export default productService;
