import axiosInstance from "../helpers/axiosInstance";

const getProfile = () => {
  return axiosInstance.post("/users/profile");
};

const postSignIn = (data) => {
  return axiosInstance.post("/users/signin", data);
};

const getRefreshToken = () => {
  return axiosInstance.post("/users/refresh-token");
};

const postSignOut = () => {
  return axiosInstance.post("/users/signout");
};

const postSignUp = (data) => {
  return axiosInstance.post("/users/signup", data);
};

const getAllUsers = () => {
  return axiosInstance.get("/users/");
};

const UserService = {
  getProfile,
  postSignIn,
  getRefreshToken,
  postSignOut,
  getAllUsers,
  postSignUp,
};
export default UserService;
