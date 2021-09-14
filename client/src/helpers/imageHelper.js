import ServerConfig from "../config/server.config";

function getRawResourceUrl(id) {
  return (
    // ServerConfig.SERVER_API_URL + path.join("/resources", "resource", id, "raw")
    `${ServerConfig.SERVER_API_URL}/resources/resource/${id}/raw`
  );
}

const imageHelper = {
  getRawResourceUrl,
};

export default imageHelper;
