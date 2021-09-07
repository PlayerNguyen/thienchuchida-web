const MiscConfig = require("../config/misc.config");

function fetchCors(origin, callback) {
  if (MiscConfig.cors.whitelist.indexOf(origin) !== -1) {
    callback(null, true);
  } else {
    callback(new Error("Not allowed by CORS"));
  }
}

module.exports = { fetchCors };
