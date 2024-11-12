const { Sequelize } = require("sequelize");
const config = require("./config/config");

const sequelize = new Sequelize(
  process.env.NODE_ENV === "development"
    ? config.development
    : config.production
);

module.exports = sequelize;
