import axiosInstance from "../helpers/axiosInstance";

async function createTag(name) {
  return axiosInstance.post(`/tags/`, { name });
}
const TagService = { createTag };
export default TagService;
