/**
 * Using to validate the display name
 * @param {String} display validate name
 */
function validateDisplayName(display) {
  return /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/.test(display);
}

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

const validateHelper = {
  validateDisplayName,
  validatePassword,
};
export default validateHelper;
