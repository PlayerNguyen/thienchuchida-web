const mongoose = require("mongoose");
const userController = require("../controllers/userController");
const chalk = require("chalk");
/**
 * Database initialize
 */
const DATABASE_URL =
  process.env.NODE_ENV === "production"
    ? process.env.DATABASE_URL
    : process.env.DATABASE_DEV_URL;
console.log(DATABASE_URL);
mongoose.connect(DATABASE_URL);
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});

mongoose.connection.on("connected", async () => {
  try {
    console.log(`💾  ${chalk.greenBright(`Mongoose is connected`)}`);
    console.log("⚙ Thiết lập tài khoản quản trị viên...");
    const adminUser = await userController.signUp(
      "admin",
      "Quản trị viên",
      "123456789",
      "quantrivien@gmail.com"
    );
    console.log(adminUser);
    console.log("⚙  Thêm quyền admin cho tài khoản vừa tạo...");
    await userController.toggleAdmin(adminUser._id);
  } catch (err) {
    console.error(`${chalk.red(err.message)}`);
  } finally {
    console.log(`${chalk.red(`Đóng ứng dụng...`)}`);
    process.exit(0);
  }
});
