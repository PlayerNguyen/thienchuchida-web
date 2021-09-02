const chalk = require("chalk");
/**
 * Logging an error with serve level
 * @param {Error} error
 */
const fatalError = (error) => {
  console.error(`${chalk.red(`[⚙]`)} ${chalk.bgRed(error.message)}`);
  console.error(chalk.red(error.stack));
};

const middlewareError = (err, req, res, next) => {
  // Console logging out
  fatalError(err);
  // Send back to client
  res.status(err.statusCode || 500).json({
    error: {
      message: err.message,
      name: err.name,
    },
  });
};

module.exports = {
  fatalError,
  middlewareError,
};
