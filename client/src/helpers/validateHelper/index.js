import toast from "../toastHelper";
// schemas
import { createUserSchema, modifyUserSchema } from "./schema/user";

export { createUserSchema, modifyUserSchema };

/**
 * Validate data with Joi Schema - package 'joi'
 * @param {Joi.object} schema
 * @param {Object} data
 * @return {Boolean}
 */
function validate(schema, data) {
  let isValid = true;
  const result = schema.validate(data);
  if (result.error) {
    isValid = false;
    toast.error(result.error.details[0].message);
  }
  return isValid;
}

/**
 * Async validate data with Joi Schema - package 'joi'
 * @param {Joi.object} schema
 * @param {Object} data
 * @return {Promise<any>}
 * @throws {ErrorMessage}
 */
async function validateAsync(schema, data) {
  try {
    await schema.validateAsync(data);
  } catch (e) {
    throw e.details[0].message;
  }
}

const validateHelper = { validate, validateAsync };

export default validateHelper;
