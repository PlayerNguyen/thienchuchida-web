const app = require("./app");
const PORT = process.env.PORT || 30154;

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT} -> http://localhost:${PORT}`);
});
