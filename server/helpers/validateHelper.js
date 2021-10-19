/**
 * Check whether the given password is valid or not.
 * @param {*} password the password to validate
 * @returns true if the password is valid, false otherwise
 */
function validatePassword(password) {
  const validationMap = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})"
  );
  return validationMap.test(password);
}

module.exports = { validatePassword };
