const express = require("express");
const CookieHelper = require("../helpers/cookieHelper.js");
const {
  signIn,
  doRefreshToken,
  signUp,
  getAllAccount,
  signOut,
  deleteUser,
  updateUser,
  toggleAdmin,
} = require("../controllers/userController");
const { MiddlewareError } = require("../errors/MiddlewareError");
const {
  getAdminAuthorize,
  getAuthorizeSilent,
  getAuthorize,
} = require("../middlewares/AuthMiddleware");
const router = express.Router();

/**
 * Register new account api.
 */
router.post("/signup", async (req, res, next) => {
  try {
    const { username, display, password, email } = req.body;

    if (!username || !password || !email || !display) {
      return next(
        new MiddlewareError(
          "Thiếu dữ liệu nhập vào, vui lòng nhập đủ dữ liệu cần thiết",
          500
        )
      );
    }
    
    // Invokes create new user method
    const generatedUser = await signUp(username, password, email);

    res.json({
      message: "Tạo tài khoản thành công.",
      data: {
        _id: generatedUser._id,
        username: generatedUser.username,
        email: generatedUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    // Get user agent browser information
    const userAgent = req.headers["user-agent"] || null;
    // Get user address
    const address = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    // Missing parameters
    if (!username || !password) {
      return next(new MiddlewareError("Missing parameters.", 500));
    }

    const user = await signIn(username, password, userAgent, address);

    const { response, refreshToken, accessToken } = user;

    CookieHelper.setTokenCookies(res, refreshToken, accessToken);

    res.json({
      message: "Đăng nhập thành công.",
      data: {
        username: response.username,
        email: response.email,
        _id: response._id,
        admin: response.admin,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.post("/refresh-token", async (req, res, next) => {
  try {
    const { RefreshToken } = req.cookies;
    const responseRefreshToken = await doRefreshToken(RefreshToken);
    const { accessToken, refreshToken } = responseRefreshToken;
    CookieHelper.setTokenCookies(res, refreshToken, accessToken);

    res.json({
      message: "Successfully refresh token",
    });
  } catch (error) {
    res.clearCookie("AccessToken");
    res.clearCookie("RefreshToken");

    // Don't complicate with this one, occur an error
    next(error);
  }
});

router.post("/signout", async (req, res, next) => {
  try {
    // Delete Refresh token existed in the database
    await signOut(req.cookies.RefreshToken);
    // Then clear cookies
    res.clearCookie("AccessToken");
    res.clearCookie("RefreshToken");
    // Send a header
    res.json({
      message: "Đăng xuất thành công.",
    });
  } catch (e) {
    return next(e);
  }
});

router.post("/profile", getAuthorizeSilent, (req, res, next) => {
  try {
    const { _id, username, admin, display } = req.currentUser;

    res.json({ _id, username, admin, display });
  } catch (err) {
    next(err);
  }
});

/**
 * Return all users account except password
 */
router.get("/", getAdminAuthorize, async (req, res, next) => {
  try {
    const accounts = await getAllAccount();
    res.json({ data: accounts });
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", getAdminAuthorize, async (req, res, next) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.json({ message: "Đã xoá người dùng này." });
  } catch (err) {
    next(err);
  }
});

router.put("/", getAuthorize, async (req, res, next) => {
  try {
    const { _id, password, avatar, email } = req.body;
    // Not found a user
    if (_id == null) {
      throw new MiddlewareError(`Không tìm thấy giá trị id trong body.`);
    }

    // If current user are not match with id or not an admin
    const { currentUser } = req;

    if (currentUser._id !== _id) {
      if (!currentUser.admin) {
        throw new MiddlewareError(
          "Bạn không có quyền chỉnh sửa thông tin của người khác!"
        );
      }
    }

    let user = await updateUser(_id, { password, avatar, email });
    res.json({ message: "Cập nhật thành công người dùng.", data: user });
  } catch (err) {
    next(err);
  }
});

router.post("/admin", getAdminAuthorize, async (req, res, next) => {
  try {
    const { id } = req.body;
    // Toggle admin permissions
    const account = await toggleAdmin(id);
    // response to user
    res.json({
      message: account.admin
        ? "Đã gán quyền quản trị cho người dùng này."
        : "Đã từ bỏ quyền quản trị của người dùng này.",
      data: account._id,
    });
  } catch (er) {
    next(er);
  }
});

module.exports = router;
