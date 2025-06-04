const path = require("path");

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",    // Localhost
      port: 7545,           // Ganache default port
      network_id: "*",      // Match any network id (use * for local networks like Ganache)
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",     // You can specify the version of the Solidity compiler you are using
    },
  },
};
