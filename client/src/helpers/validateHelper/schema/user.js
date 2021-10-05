import Joi from "joi";

const createUserSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Tên đăng nhập không được để trống",
    "string.empty": "Tên đăng nhập không được để trống",
  }),
  display: Joi.string().required().messages({
    "any.required": "Tên hiển thị không được để trống",
    "string.empty": "Tên hiển thị không được để trống",
  }),
  email: Joi.string().required().messages({
    "any.required": "Email không được để trống",
    "string.empty": "Email không được để trống",
  }),
  password: Joi.string().required().messages({
    "any.required": "Mật khẩu không được để trống",
    "string.empty": "Mật khẩu không được để trống",
  }),
}).unknown(true);

const modifyUserSchema = Joi.object({
  username: Joi.string().required().messages({
    "any.required": "Tên đăng nhập không được để trống",
    "string.empty": "Tên đăng nhập không được để trống",
  }),
  display: Joi.string().required().messages({
    "any.required": "Tên hiển thị không được để trống",
    "string.empty": "Tên hiển thị không được để trống",
  }),
  email: Joi.string().required().messages({
    "any.required": "Email không được để trống",
    "string.empty": "Email không được để trống",
  }),
}).unknown(true);

export { createUserSchema, modifyUserSchema };
