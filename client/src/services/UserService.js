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

const putAdminModifyUser = (data) => {
  return axiosInstance.put(`/users`, data);
};

const deleteAdminDeleteUser = (id) => {
  return axiosInstance.delete(`/users/${id}`);
};

const postAdminToggleUserPermission = (id) => {
  return axiosInstance.post("/users/admin", { id });
};

const getGeneralProfile = (id) => {
  return axiosInstance.get(`/users/general/${id}`)
}

const UserService = {
  getProfile,
  postSignIn,
  getRefreshToken,
  postSignOut,
  getAllUsers,
  postSignUp,
  putAdminModifyUser,
  deleteAdminDeleteUser,
  postAdminToggleUserPermission,
  getGeneralProfile,
};
export default UserService;
