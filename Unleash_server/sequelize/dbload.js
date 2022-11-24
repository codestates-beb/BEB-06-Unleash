require("dotenv").config();
const SequelizeAuto = require("sequelize-auto");
const auto = new SequelizeAuto(
  process.env.DB_NAME,
  process.env.USER_NAME,
  process.env.USER_PASSWD,
  {
    host: process.env.DB_HOST, // DB Host 주소
    port: process.env.DB_PORT, // 포트 번호
    dialect: "mysql", // 사용하는 DBMS 종류
  }
);

auto.run();
