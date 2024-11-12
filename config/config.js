module.exports = {
  development: {
    username: "root",
    password: "hola1234",
    database: "universidad_espaniola",
    host: "localhost",
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  },
};
