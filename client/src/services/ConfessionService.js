import axiosInstance from "../helpers/axiosInstance";

async function createConfession(content, secret) {
  return axiosInstance.post(`/confession`, { content, secret });
}

async function getConfession(id) {
  return axiosInstance.get(`/confession/${id}`);
}

async function deleteConfession(id) {
  return axiosInstance.delete(`/confession/${id}`);
}

async function updateConfession(id, content, secret) {
  return axiosInstance.put(`/confession/${id}`, { content, secret });
}

async function fetchConfession(limit, offset, sort) {
  return axiosInstance.get(
    `/confession/?limit=${limit}&sort=${sort}&offset=${offset}`
  );
}

const ConfessionService = {
  createConfession,
  getConfession,
  deleteConfession,
  updateConfession,
  fetchConfession,
};
export default ConfessionService;
