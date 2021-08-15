import api from "utils/api";

const signin = async (body) => {
  try {
    const res = await api.post(`auth/signin`, body);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }

  return null;
};

const getMe = async () => {
  try {
    const res = await api.get(`auth/me`);
    return res.data.data;
  } catch (err) {
    console.log(err);
  }

  return null;
};

const authService = {
  signin,
  getMe,
};

export default authService;
