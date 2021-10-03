import ServerConfig from "../config/server.config";

function getRawResourceUrl(id) {
  return (
    `${ServerConfig.SERVER_API_URL}/resources/resource/raw/${id}`
  );
}

function gertBase64ResourceUrl(id) {
  return (
    `${ServerConfig.SERVER_API_URL}/resources/resource/base64/${id}`
  );
}

const imageHelper = {
  getRawResourceUrl,
  gertBase64ResourceUrl
};

export default imageHelper;
