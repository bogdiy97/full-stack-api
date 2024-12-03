const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DATABASE, // Database name
  process.env.DB_USERNAME, // Username
  process.env.DB_PASSWORD, // Password
  {
    host: process.env.DB_HOST, // Host
    port: process.env.DB_PORT, // Port
    dialect: "mysql",
    ssl: true, // For Clever Cloud
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // For self-signed certificates
      },
    },
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;
