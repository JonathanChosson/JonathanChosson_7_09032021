require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "pkoipa",
    database: "database_development_test",
    host: process.env.DB_HOST || "mysql",
    dialect: 'mysql'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "database_test_test",
    host: process.env.DB_HOST,
    dialect: 'mysql'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: "database_production_test",
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
}
