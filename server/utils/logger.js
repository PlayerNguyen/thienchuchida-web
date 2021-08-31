const chalk = require("chalk");

/**
 *  Logging out as info level.
 *
 * @param {*} object  an object to log out
 */
const info = (object) => {
  console.log("");
  console.log(chalk.gray(`------ INFO ------`));
  console.debug(object);
  console.log("");
  console.log("");
};

module.exports = {
  info,
};
