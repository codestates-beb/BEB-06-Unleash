var DataTypes = require("sequelize").DataTypes;
var _marketplace = require("./marketplace");
var _nftvoucher = require("./nftvoucher");
var _ticket = require("./ticket");
var _token_holder = require("./token_holder");
var _transactionHistory = require("./transactionHistory");
var _user = require("./user");
var _vc_list = require("./vc_list");

function initModels(sequelize) {
  var marketplace = _marketplace(sequelize, DataTypes);
  var nftvoucher = _nftvoucher(sequelize, DataTypes);
  var ticket = _ticket(sequelize, DataTypes);
  var token_holder = _token_holder(sequelize, DataTypes);
  var transactionHistory = _transactionHistory(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);
  var vc_list = _vc_list(sequelize, DataTypes);

  transactionHistory.belongsTo(marketplace, { as: "offer", foreignKey: "offer_id"});
  marketplace.hasMany(transactionHistory, { as: "transactionHistories", foreignKey: "offer_id"});
  marketplace.belongsTo(ticket, { as: "token", foreignKey: "token_id"});
  ticket.hasMany(marketplace, { as: "marketplaces", foreignKey: "token_id"});
  nftvoucher.belongsTo(ticket, { as: "token", foreignKey: "token_id"});
  ticket.hasOne(nftvoucher, { as: "nftvoucher", foreignKey: "token_id"});
  token_holder.belongsTo(ticket, { as: "token", foreignKey: "token_id"});
  ticket.hasMany(token_holder, { as: "token_holders", foreignKey: "token_id"});
  transactionHistory.belongsTo(ticket, { as: "token", foreignKey: "token_id"});
  ticket.hasMany(transactionHistory, { as: "transactionHistories", foreignKey: "token_id"});
  token_holder.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(token_holder, { as: "token_holders", foreignKey: "user_id"});

  return {
    marketplace,
    nftvoucher,
    ticket,
    token_holder,
    transactionHistory,
    user,
    vc_list,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
