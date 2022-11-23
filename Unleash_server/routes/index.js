const marketplace = require("./marketplace.route");
const user = require("./user.route");

module.exports = (app) => {
  app.use("/marketplace", marketplace);
  app.use("/user", user);
};
