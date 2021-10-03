import axiosInstance from "../helpers/axiosInstance";

async function getAllResources() {
  return axiosInstance.get(`/resources/?sort=-createdAt`);
}

async function searchResourceByName(name) {
  return axiosInstance.get(`/resources/search/?originalName=${name}`)
}

async function uploadResources(formData) {
  return axiosInstance.post(`/resources/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

async function removeResource(id) {
  return axiosInstance.delete(`/resources/resource/${id}`);
}

async function getResourceMetadata(id) {
  return axiosInstance.get(`/resources/resource/metadata/${id}`);
}

async function uploadSingleResource(formData) {
  return axiosInstance.post(`/resources/single`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

const ResourceService = {
  getAllResources,
  uploadResources,
  removeResource,
  getResourceMetadata,
  searchResourceByName,
  uploadSingleResource
};

export default ResourceService;
