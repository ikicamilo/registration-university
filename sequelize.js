const { Sequelize } = require("sequelize");
const config = require("./config/config"); // Make sure to require the config file

// Select the correct environment configuration
const sequelize = new Sequelize(
  process.env.NODE_ENV === "development"
    ? config.development
    : config.production
);

module.exports = sequelize;
