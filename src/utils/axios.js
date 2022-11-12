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
    try {
      const { response } = error;
      const { status } = response;
      /**
       * //TODO Redirect to welcome page if server return status 401
       */
      if (status === 401) {
        router.push({ name: "welcome" });
      }
    } catch (e) {
      // Some thing went wrong
    }
    return Promise.reject(error);
  }
);

export default axiosApi;
export { axiosApi };
