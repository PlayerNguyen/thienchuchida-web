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
  authentication: {
    bcrypt: {
      rounds: 16,
    },
  },
  tokens: {
    accessToken: {
      secret: "",
      expiration: "15m",
    },
    refreshToken: {
      secret: "",
      expiration: "7d",
    },
  },
};

module.exports = MiscConfig;
