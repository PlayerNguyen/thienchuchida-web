import axiosInstance from "../helpers/axiosInstance";

async function getAllResources() {
  return axiosInstance.get(`/resources/?sort=createdAt`);
}

async function uploadResources(formData) {
  return axiosInstance.post(`/resources/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

async function removeResource(id) {
  return axiosInstance.delete(`/resources/${id}`);
}

async function getResourceMetadata(id) {
  return axiosInstance.get(`/resources/${id}`);
}

const ResourceService = {
  getAllResources,
  uploadResources,
  removeResource,
  getResourceMetadata,
};

export default ResourceService;
