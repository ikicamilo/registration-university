const fs = require("fs");
const path = require("path");

module.exports = {
  development: {
    username: "root",
    password: "hola1234",
    database: "universidad_espaniola",
    host: "localhost",
    port: 3306,
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        ca: fs.readFileSync(path.resolve(__dirname, "certs/ca.pem")),
      },
    },
  },
};
