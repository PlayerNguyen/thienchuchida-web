import axiosInstance from "../helpers/axiosInstance";

function getSetting(key) {
  return axiosInstance.get(`/settings/${key}`);
}

function setSetting(key, value) {
  return axiosInstance.put(`/settings/${key}`, { value });
}

const SettingService = { getSetting, setSetting };
export default SettingService;
