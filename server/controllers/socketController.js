const socket = require("socket.io");
/**
 * Controller of the socket.io server
 * @param {socket.Socket} io an io to handle
 */
async function socketController(io) {
  /**
   * On socket connect to server
   * @param {socket.Socket} socket a socket on connected
   */
  io.on("connection", function (socket) {
    /**
     * Handle things here
     */
    // console.log(`[socket] reiceive from ${socket.handshake}`);
  });
}
module.exports = socketController;
