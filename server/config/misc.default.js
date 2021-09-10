const ms = require("ms");
const MiscConfig = {
  cors: {
    whitelist: ["http://localhost:3000/"],
  },
  cookies: {
    refreshToken: {
      maxAge: ms("7d"),
    },
    accessToken: {
      maxAge: ms("7d"),
    },
  },
};

module.exports = MiscConfig;
