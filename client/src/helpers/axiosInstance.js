import axios from "axios";
import Config from "../config/server.config";
import UserService from "../services/UserService";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: Config.SERVER_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    if (error.response && error.response.data.error) {
      const { message } = error.response.data.error;
      toast.error(message);
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    // console.log(error.response);
    if (error.response && error.response.data.error) {
      const { message, name } = error.response.data.error;
      if (name === "TokenExpiredError") {
        UserService.getRefreshToken().then((response) => {
          window.location.reload()
        });
        return Promise.reject(error);
      }
      if (name === "TokenNotFoundError") {
        return Promise.reject(error);
      } else toast.error(message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
