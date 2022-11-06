import axios from "axios";
import router from "~/router";

const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
});

axiosApi.interceptors.request.use((config) => {
  let token = "";
  try {
    const jsonToken = JSON.parse(localStorage.getItem("userToken"));
    token = jsonToken.value;
  } catch (e) {}
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    const { response } = error;
    const { status } = response;
    /**
     * //TODO Redirect to welcome page if server return status 401
     */
    if (status === 401) {
      router.push({ name: "welcome" });
    }
    return Promise.reject(error);
  }
);

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
