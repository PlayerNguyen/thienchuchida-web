import axios from "axios";
import Config from "../config/Config";
import UserService from "../services/UserService";

const axiosInstance = axios.create({
  baseURL: Config.SERVER_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    const { name } = error.response.data.error;
    console.log(name);
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response.data.error) {
      const { name } = error.response.data.error;
      // console.log(name)
      if (name === "TokenExpiredError") {
        UserService.getRefreshToken().then((response) => {
          console.log(response.data.message);
        });
        return;
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
