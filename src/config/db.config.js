require("dotenv").config();

module.exports = {
  development: {
    DB: process.env.DEV_DATABASE_NAME,
    USER: process.env.DEV_DATABASE_USERNAME,
    PASSWORD: "",
    HOST: process.env.DEV_DATABASE_HOST,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
};
