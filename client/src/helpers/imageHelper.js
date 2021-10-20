import ServerConfig from "../config/server.config";

function getRawResourceUrl(id) {
  return (
    `${ServerConfig.SERVER_API_URL}/resources/resource/raw/${id}`
  );
}

function getBase64ResourceUrl(id) {
  return (
    `${ServerConfig.SERVER_API_URL}/resources/resource/base64/${id}`
  );
}

const imageHelper = {
  getRawResourceUrl,
  getBase64ResourceUrl
};

export default imageHelper;
