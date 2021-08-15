import api from "utils/api";

const getAll = async () => {
  try {
    const res = await api.get(`categories`);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }

  return [];
};

const categoryService = {
  getAll,
};

export default categoryService;
