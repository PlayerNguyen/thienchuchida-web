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
  upload: { directory: "./uploads" },
  compress: {
    quality: 50,
  },
};

module.exports = MiscConfig;
