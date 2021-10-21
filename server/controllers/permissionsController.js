const PermissionModel = require("../models/PermissionModel");

/**
 * Create a new permission.
 * @param {*} name name of the permission
 * @returns a created permission
 */
function createPermission(name) {
  return PermissionModel.create({ name });
}

/**
 * Check whether the permission is exist
 * @param {*} name name of permission
 * @returns true whether the permission is exist, false otherwise.
 */
function existPermission(name) {
  return PermissionModel.findOne({ name });
}

/**
 * Check whether a permission is exist. If is not exist, create a new permission.
 * @param {*} name the name of the permission
 */
async function generatePermission(name) {
  const permission = await PermissionModel.findOne({ name });
  if (!permission) {
    await PermissionModel.create({ name });
  }
}

const PermissionsController = {
  createPermission,
  existPermission,
  generatePermission,
};

module.exports = PermissionsController;
