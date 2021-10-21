const RoleModel = require("../models/RoleModel");

/**
 * Create a new role
 * @param {*} roleName a role name
 * @param {*} rolePermissions a role permission list
 */
function createRole(roleName, rolePermissions) {
  return new RoleModel({ name: roleName, permissions: rolePermissions });
}

/**
 * Get a full role
 * @returns a role list
 */
function getRoles() {
  return RoleModel.find({}).populate("permissions");
}

/**
 * Update a current role
 * @param {*} id an id of the role
 * @param {*} name a name of the role
 * @param {*} permissions  a permissions of the role
 * @returns a new updated role
 */
function updateRole(id, name, permissions) {
  const role = RoleModel.findOne({ _id: id });
  // Role not found
  if (!role) {
    throw new Error("Không tìm thấy vai trò này");
  }
  // Parameter not exists

  role.name = name || role.name;
  role.permissions = permissions || role.permissions;
  return role.save();
}

/**
 * Delete a current role
 * @param {*} id a role id
 * @returns  delete status of the role
 */
function deleteRole(id) {
  const role = RoleModel.findOne({ _id: id });
  // Role not found
  if (!role) {
    throw new Error("Không tìm thấy vai trò này");
  }
  return RoleModel.deleteOne({ _id: id });
}

const RoleController = {
  createRole,
  getRoles,
  updateRole,
  deleteRole,
};

module.exports = RoleController;
