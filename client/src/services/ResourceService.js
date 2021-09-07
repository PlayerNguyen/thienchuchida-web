import axiosInstance from "../helpers/axiosInstance";

async function getAllResources() {
  return axiosInstance.get("/resources/");
}

async function uploadResources(formData) {
  return axiosInstance.post(`/resources/`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}

const ResourceService = { getAllResources, uploadResources };

export default ResourceService;
