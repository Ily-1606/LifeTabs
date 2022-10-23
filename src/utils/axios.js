import axios from "axios";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

axiosApi.interceptors.request.use((config) => {
  let token = localStorage.getItem("userToken");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default axiosApi;
