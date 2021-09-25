import axiosInstance from "../helpers/axiosInstance";

async function createTag(name) {
  return axiosInstance.post(`/tags/`, { name });
}

async function findTag(query) {
  return axiosInstance.get(`/tags/${query}`);
}

const TagService = { createTag, findTag };
export default TagService;
