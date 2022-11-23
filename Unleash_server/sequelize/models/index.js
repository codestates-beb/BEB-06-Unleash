const Sequelize = require("sequelize");
const config = require(__dirname + "/../config/config.js").development;
const initModels = require("./init-models.js");

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

const db = initModels(sequelize);

module.exports = { db, sequelize };
