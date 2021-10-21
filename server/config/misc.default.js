const ms = require("ms");

const MiscConfig = {
  cors: "http://localhost:3000",
  cookies: {
    refreshToken: {
      maxAge: ms("7d"),
    },
    accessToken: {
      maxAge: ms("7d"),
    },
  },
  upload: { directory: "./uploads", },
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
      secret: "$random$6739$IjjISPZxS",
      expiration: "15m",
    },
    refreshToken: {
      secret: "$random$8720$KLUicHMY",
      expiration: "7d",
    },
  },
  resource: {
    directory: './resources'
  }
};

module.exports = MiscConfig;
