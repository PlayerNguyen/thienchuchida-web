import ServerConfig from "../config/server.config";

function getRawResourceUrl(id) {
  return (
    `${ServerConfig.SERVER_API_URL}/resources/resource/raw/${id}`
  );
}

const imageHelper = {
  getRawResourceUrl,
};

export default imageHelper;
