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

const postAdminCreateUser = (data) => {
  return axiosInstance.post("/users", data);
};

const putAdminModifyUser = (data) => {
  return axiosInstance.put(`/users/${data.id}`, data);
};

const UserService = {
  getProfile,
  postSignIn,
  getRefreshToken,
  postSignOut,
  getAllUsers,
  postSignUp,
  postAdminCreateUser,
  putAdminModifyUser,
};
export default UserService;
