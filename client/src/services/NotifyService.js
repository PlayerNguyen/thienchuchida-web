import axiosInstance from "../helpers/axiosInstance";

async function createNotify(title, context) {
  return axiosInstance.post("/notify", { title, context });
}

async function updateNotify(id, title, context) {
  return axiosInstance.put(`/notify/${id}`, { title, context });
}

async function getNotify(id) {
  return axiosInstance.get(`/notify/${id}`);
}

async function deleteNotify(id) {
  return axiosInstance.delete(`/notify/${id}`)
}

async function fetchNotify() {
  return axiosInstance.get(`/notify/`);
}

const NotifyService = {
  createNotify,
  updateNotify,
  getNotify,
  deleteNotify,
  fetchNotify
};
export default NotifyService;
