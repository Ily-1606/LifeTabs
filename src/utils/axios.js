import axios from "axios";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

axiosApi.interceptors.request.use((config) => {
  let token = localStorage.getItem("userToken");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

const axiosWeatherAPI = axios.create({
  baseURL: "https://api.weatherapi.com/v1",
});

axiosWeatherAPI.interceptors.request.use((config) => {
  const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
  config.params.key = API_KEY;
  return config;
});

export default axiosApi;
export { axiosApi, axiosWeatherAPI };
