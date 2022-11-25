var DataTypes = require("sequelize").DataTypes;
var _marketplace = require("./marketplace");
var _nftvoucher = require("./nftvoucher");
var _ticket = require("./ticket");
var _token_holder = require("./token_holder");
var _user = require("./user");

function initModels(sequelize) {
  var marketplace = _marketplace(sequelize, DataTypes);
  var nftvoucher = _nftvoucher(sequelize, DataTypes);
  var ticket = _ticket(sequelize, DataTypes);
  var token_holder = _token_holder(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  marketplace.belongsTo(ticket, { as: "token", foreignKey: "token_id"});
  ticket.hasMany(marketplace, { as: "marketplaces", foreignKey: "token_id"});
  nftvoucher.belongsTo(ticket, { as: "token", foreignKey: "token_id"});
  ticket.hasOne(nftvoucher, { as: "nftvoucher", foreignKey: "token_id"});
  token_holder.belongsTo(ticket, { as: "token", foreignKey: "token_id"});
  ticket.hasMany(token_holder, { as: "token_holders", foreignKey: "token_id"});
  token_holder.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(token_holder, { as: "token_holders", foreignKey: "user_id"});

  return {
    marketplace,
    nftvoucher,
    ticket,
    token_holder,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
